const { WebSocketServer } = require('ws');

const activeDMSockets = new Map(); // Key: userName, Value: WebSocket instance

function peerProxy(httpServer) {
    const socketServer = new WebSocketServer({ server: httpServer });

    socketServer.on('connection', (socket, request) => {
        socket.isAlive = true;

        const path = request.url;
        const urlParts = path.split('/');
        const type = urlParts[1]; // 'ws'

        if (urlParts[2] === 'dm') {
            console.log("DM client connected.");

            socket.on('message', function message(data) {
                const messagePayload = JSON.parse(data);

                if (messagePayload.type === 'register' && messagePayload.user) {
                    activeDMSockets.set(messagePayload.user, socket);
                    console.log(`Registered DM user: ${messagePayload.user}`);
                    return; // handled registration, dont forward a message
                }

                // DM Message Handling
                const targetSocket = activeDMSockets.get(messagePayload.to);
                if (targetSocket && targetSocket.readyState === 1) {
                    // send message to the target user only
                    const messageToSend = JSON.stringify({
                        from: messagePayload.from,
                        msg: messagePayload.msg
                    });
                    targetSocket.send(messageToSend);
                } else {
                    console.log(`Target user ${messagePayload.to} not found or offline.`);
                }
            });
            socket.on('close', () => {
                activeDMSockets.forEach((s, user) => {
                    if (s === socket) {
                        activeDMSockets.delete(user);
                        console.log(`De-registered DM user: ${user}`);
                    }
                });
            });
        } else if (urlParts[2]) {
            // Group chat handling
            const groupId = urlParts.pop(); // Get the last part as groupId
            socket.groupId = groupId; //store the group Id on the socket object
            console.log(`Client connected to group: ${groupId}`);

            socket.on('message', function message(data) {
                const messagePayload = JSON.parse(data);
                
                // If this is a register message, store the user name on the socket
                if (messagePayload.type === 'register' && messagePayload.name) {
                    socket.userName = messagePayload.name;
                    console.log(`User ${messagePayload.name} joined group ${groupId}`);
                    
                    //send the current list of users to the newly joined user
                    const currentUsers = [];
                    socketServer.clients.forEach(function each(client) {
                        if (client.userName && client.groupId === socket.groupId && client !== socket) {
                            currentUsers.push(client.userName);
                        }
                    });
                    socket.send(JSON.stringify({
                        type: 'userList',
                        users: currentUsers
                    }));
                    
                    // broadcast user join to all clients in the group
                    socketServer.clients.forEach(function each(client) {
                        if (client.readyState === 1 && client.groupId === socket.groupId) {
                            client.send(JSON.stringify({
                                type: 'userPresence',
                                event: 'joined',
                                user: messagePayload.name
                            }));
                        }
                    });
                    return; // Don't forward registration message
                }

                // Forward regular messages to everyone except the sender
                socketServer.clients.forEach(function each(client) {
                    if (
                        client !== socket && 
                        client.readyState === 1 &&
                        client.groupId === socket.groupId 
                    ) {
                        client.send(data)
                    }
                });
            });

            //Handle user leaving
            socket.on('close', () => {
                if (socket.userName) {
                    console.log(`User ${socket.userName} left group ${socket.groupId}`);
                    // Broadcast user left to all remaining clients in the group
                    socketServer.clients.forEach(function each(client) {
                        if (client.readyState === 1 && client.groupId === socket.groupId) {
                            client.send(JSON.stringify({
                                type: 'userPresence',
                                event: 'left',
                                user: socket.userName
                            }));
                        }
                    });
                }
            });

        }
        

        // Respond to pong messages by marking the connection alive
        socket.on('pong', () => {
            socket.isAlive = true;
        });
    });

    // Periodically send out a ping message to make sure clients are alive
    setInterval(() => {
        socketServer.clients.forEach(function each(client) {
            if (client.isAlive === false) return client.terminate();

            client.isAlive = false;
            client.ping();
        });
    }, 10000);

}

module.exports = { peerProxy };
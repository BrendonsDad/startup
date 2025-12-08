const { WebSocketServer } = require('ws');
const DB = require('./database.js');

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

            socket.on('message', async function message(data) {
                let messagePayload;
                try {
                    messagePayload = JSON.parse(data);
                } catch (err) {
                    console.error('Invalid JSON from DM websocket message', err, data);
                    return;
                }

                if (messagePayload.type === 'register' && messagePayload.user) {
                    activeDMSockets.set(messagePayload.user, socket);
                    socket.userEmail = messagePayload.user;
                    console.log(`Registered DM user: ${messagePayload.user}`);
                    return; // handled registration, dont forward a message
                }

                // DM Message Handling - persist and forward
                if (messagePayload.type === 'dm' && messagePayload.to && messagePayload.from && messagePayload.msg) {
                    const fromEmail = messagePayload.from;
                    const toEmail = messagePayload.to;
                    const msgContent = messagePayload.msg;
                    const ts = messagePayload.ts || new Date().toISOString();

                    // Create or get the conversation
                    try {
                        const conversation = await DB.getOrCreateConversation(fromEmail, toEmail);
                        
                        // Add message to conversation
                        const messageObj = {
                            from: fromEmail,
                            msg: msgContent,
                            ts: ts
                        };
                        
                        // Mark as unread for the recipient only
                        await DB.markConversationAsRead(conversation._id, fromEmail);
                        // Add recipient to unreadBy list
                        const { ObjectId } = require('mongodb');
                        await DB.addDMMessage(conversation._id, messageObj);
                        
                        // Send to target user if online
                        const targetSocket = activeDMSockets.get(toEmail);
                        if (targetSocket && targetSocket.readyState === 1) {
                            const messageToSend = JSON.stringify({
                                type: 'dm',
                                from: fromEmail,
                                msg: msgContent,
                                ts: ts,
                                conversationId: conversation._id
                            });
                            targetSocket.send(messageToSend);
                            console.log(`DM delivered from ${fromEmail} to ${toEmail}`);
                        } else {
                            console.log(`Target user ${toEmail} not found or offline. Message stored in conversation.`);
                        }
                    } catch (ex) {
                        console.error('Error persisting DM message:', ex);
                    }
                    return;
                }

                // Typing Indicator Handling - forward to target user
                if (messagePayload.type === 'typing' && messagePayload.to && messagePayload.from) {
                    const toEmail = messagePayload.to;
                    const fromEmail = messagePayload.from;

                    const targetSocket = activeDMSockets.get(toEmail);
                    if (targetSocket && targetSocket.readyState === 1) {
                        const typingToSend = JSON.stringify({
                            type: 'typing',
                            from: fromEmail,
                            to: toEmail
                        });
                        targetSocket.send(typingToSend);
                    }
                    return;
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

            socket.on('message', async function message(data) {
                let messagePayload;
                try {
                    messagePayload = JSON.parse(data);
                } catch (err) {
                    console.error('Invalid JSON from websocket message', err, data);
                    return;
                }

                // If this is a register message, store the user name on the socket
                if (messagePayload.type === 'register' && messagePayload.name) {
                    socket.userName = messagePayload.name;
                    console.log(`User ${messagePayload.name} joined group ${groupId}`);

                    // send the current list of users to the newly joined user
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

                    // fetch and send chat history from DB
                    try {
                        const history = await DB.getGroupChats(groupId, 200);
                        socket.send(JSON.stringify({ type: 'chatHistory', chats: history }));
                    } catch (ex) {
                        console.error('Failed to fetch chat history for group', groupId, ex);
                    }

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

                // Chat message handling (persist then forward)
                if (messagePayload.type === 'chat') {
                    const messageObj = {
                        from: messagePayload.name || messagePayload.from || socket.userName || 'Unknown',
                        msg: messagePayload.msg,
                        ts: messagePayload.ts || new Date().toISOString()
                    };

                    // Persist to database (fire-and-forget but log failures)
                    try {
                        await DB.addGroupMessage(groupId, messageObj);
                    } catch (ex) {
                        console.error('Failed to persist chat message', ex);
                    }

                    // Forward to everyone in group (including sender)
                    const frame = JSON.stringify({ type: 'chat', from: messageObj.from, msg: messageObj.msg, ts: messageObj.ts });
                    // Forward to everyone in group except the sender (sender already echoes locally)
                    socketServer.clients.forEach(function each(client) {
                        if (client !== socket && client.readyState === 1 && client.groupId === socket.groupId) {
                            client.send(frame);
                        }
                    });

                    return;
                }

                // Forward legacy/other messages to everyone except the sender
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
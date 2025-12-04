const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
    // Create a websocket object
    const socketServer = new WebSocketServer({ server: httpServer });

    socketServer.on('connection', (socket, request) => {
        socket.isAlive = true;

        // Extract the group Id from the connection URL path
        // request.url will be something like '/ws/GroupA'
        const groupId = request.url.split('/').pop();
        socket.groupId = groupId; // Store the group ID on the socket object

        console.log(`Client connected to group: ${groupId}`);

        // Forward message to everyone except the sender
        socket.on('message', function message(data) {
            socketServer.clients.forEach(function each(client) {
                if (
                    client !== socket && 
                    client.readyState === WebSocket.OPEN &&
                    client.groupId === socket.groupId 
                ) {
                    client.send(data)
                }
            });
        });

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
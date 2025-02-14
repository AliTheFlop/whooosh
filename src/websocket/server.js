const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 2372, perMessageDeflate: false });

server.on("connection", (ws) => {
    console.log("New client connected! ");

    ws.on("message", (message) => {
        const messageString = message.toString();

        server.clients.forEach((client) => {
            if (client != ws && client.readyState === WebSocket.OPEN) {
                client.send(messageString);
            }
        });
    });
});

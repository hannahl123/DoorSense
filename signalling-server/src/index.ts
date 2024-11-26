import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    let data;
    try {
      data = JSON.parse(message.toString());
      console.log("Received data: ", data);
    } catch (error) {
      console.error("Invalid JSON: ", message.toString());
      return;
    }

    // relay data to all other peers
    for (const client of wss.clients)
      if (client !== ws && client.readyState === WebSocket.OPEN)
        client.send(JSON.stringify(data));
  });

  ws.on("close", () => {
    console.log(`Connection from ${ws.url} closed`);
  });
});

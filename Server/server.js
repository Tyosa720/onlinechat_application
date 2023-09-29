import { v4 as uuidv4 } from "uuid";
import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 9999 });

let clients = [];

wss.on("connection", function connection(ws) {
  ws.id = uuidv4();
  clients.push(ws);
  ws.on("message", function incoming(data) {
    broadCast(data.toString());
    console.log("received: ", data.toString());
  });
});

function broadCast(message) {
  clients.forEach((client) => {
    client.send(message);
  });
}

console.log("Server started on port 9999");

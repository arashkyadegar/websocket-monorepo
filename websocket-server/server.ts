import express from "express";
import validator from "validator";
require("dotenv").config();
import { Messages } from "./constants";
import { getUploadDir, saveFile } from "./file/fileHelper";
import { initialFolder } from "./folder/folderHelper";
import { Message } from "./message/message";
import { MessageCreator } from "./message/messageCreator";

const ws = require("ws");
const url = require("url");

const app = express();
console.log(process.env.WS_PORT);
const server = new ws.Server({ port: process.env.WS_PORT || 3000 });

initialFolder();

function informAllSockets(data: any) {
  server.clients.forEach((client: any) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

function fetchUserEmail(req: any) {
  const queryParams = url.parse(req.url, true).query;
  const email = validator.escape(queryParams.email);
  return email;
}

server.on("connection", (socket: any, req: any) => {
  socket.on("error", console.error);

  const email = fetchUserEmail(req);
  socket.on("message", (payload: any) => {
    let result;
    const buffer = Buffer.from(payload);
    try {
      // check if payload is json
      result = JSON.parse(buffer.toString());
      let message = new Message(
        Messages.RECIEVED_JSON,
        `${validator.escape(result)}`,
        email
      );
      const mcreateor = new MessageCreator(message);

      informAllSockets(mcreateor.getMessage());
    } catch (ex: any) {
      try {
        //so payload is file buffer
        const fileName = saveFile(payload);
        const fileUrl = `/upload/${validator.escape(fileName)}`;
        let message = new Message(Messages.RECIEVED_FILE, `${fileUrl}`, email);
        const mcreateor = new MessageCreator(message);
        informAllSockets(mcreateor.getMessage());
      } catch (err: any) {
        let message = new Message(Messages.RECIEVED_ERROR, err.message, email);
        const mcreateor = new MessageCreator(message);
        socket.send(mcreateor.getMessage());
      }
    }
  });
});

// Serve the upload directory as static files
app.use("/upload", express.static(getUploadDir()));

app.listen(process.env.HTTP_PORT || 3001, () => {
  console.log(
    `HTTP server is running on port ${process.env.HTTP_PORT || 3001}`
  );
});

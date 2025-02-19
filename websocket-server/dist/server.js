"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("validator"));
require("dotenv").config();
const constants_1 = require("./constants");
const fileHelper_1 = require("./file/fileHelper");
const folderHelper_1 = require("./folder/folderHelper");
const message_1 = require("./message/message");
const messageCreator_1 = require("./message/messageCreator");
const ws = require("ws");
const url = require("url");
const app = (0, express_1.default)();
console.log(process.env.WS_PORT);
const server = new ws.Server({ port: process.env.WS_PORT || 3000 });
(0, folderHelper_1.initialFolder)();
function informAllSockets(data) {
    server.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}
function fetchUserEmail(req) {
    const queryParams = url.parse(req.url, true).query;
    const email = validator_1.default.escape(queryParams.email);
    return email;
}
server.on("connection", (socket, req) => {
    socket.on("error", console.error);
    const email = fetchUserEmail(req);
    socket.on("message", (payload) => {
        let result;
        const buffer = Buffer.from(payload);
        try {
            // check if payload is json
            result = JSON.parse(buffer.toString());
            let message = new message_1.Message(constants_1.Messages.RECIEVED_JSON, `${validator_1.default.escape(result)}`, email);
            const mcreateor = new messageCreator_1.MessageCreator(message);
            informAllSockets(mcreateor.getMessage());
        }
        catch (ex) {
            try {
                //so payload is file buffer
                const fileName = (0, fileHelper_1.saveFile)(payload);
                const fileUrl = `/upload/${validator_1.default.escape(fileName)}`;
                let message = new message_1.Message(constants_1.Messages.RECIEVED_FILE, `${fileUrl}`, email);
                const mcreateor = new messageCreator_1.MessageCreator(message);
                informAllSockets(mcreateor.getMessage());
            }
            catch (err) {
                let message = new message_1.Message(constants_1.Messages.RECIEVED_ERROR, err.message, email);
                const mcreateor = new messageCreator_1.MessageCreator(message);
                socket.send(mcreateor.getMessage());
            }
        }
    });
});
// Serve the upload directory as static files
app.use("/upload", express_1.default.static((0, fileHelper_1.getUploadDir)()));
app.listen(process.env.HTTP_PORT || 3001, () => {
    console.log(`HTTP server is running on port ${process.env.HTTP_PORT || 3001}`);
});

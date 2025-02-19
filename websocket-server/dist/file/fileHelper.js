"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = saveFile;
exports.isValidFile = isValidFile;
exports.getUploadDir = getUploadDir;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const fs = require("fs");
const uploadDir = path_1.default.resolve(__dirname, "../../public", "upload");
function saveFile(payload) {
    // Decode the base64 payload
    let buffer = Buffer.from(payload, "base64");
    // Check if the buffer is valid
    if (!buffer || buffer.length === 0) {
        throw new Error("Invalid buffer");
    }
    if (!isValidFile(buffer)) {
        throw new Error("Invalid File");
    }
    const fileName = `${(0, uuid_1.v4)()}.png`;
    const address = path_1.default.join(uploadDir, fileName);
    fs.writeFile(address, buffer, (err) => {
        if (err)
            throw err;
        console.log(`The file has been saved at ${address}`);
    });
    return fileName;
}
function isValidFile(buffer) {
    const PNG_MgNumber = "89504e47";
    const JPG_MgNumber = "ffd8ffe0";
    let b = buffer.subarray(0, 4).toString("hex");
    if (b === PNG_MgNumber || b === JPG_MgNumber)
        return true;
    return false;
}
function getUploadDir() {
    return uploadDir;
}

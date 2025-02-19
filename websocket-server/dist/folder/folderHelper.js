"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialFolder = initialFolder;
const fs = require("fs");
const path_1 = __importDefault(require("path"));
const uploadDir = path_1.default.resolve(__dirname, "public", "upload");
function initialFolder() {
    // Create the upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log(`Created directory: ${uploadDir}`);
    }
    else {
        console.log(`Directory exists: ${uploadDir}`);
    }
}

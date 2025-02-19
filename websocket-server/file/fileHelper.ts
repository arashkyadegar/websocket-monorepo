import path from "path";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");

const uploadDir = path.resolve(__dirname, "../../public", "upload");

export function saveFile(payload: any): string {
  // Decode the base64 payload
  let buffer = Buffer.from(payload, "base64");

  // Check if the buffer is valid
  if (!buffer || buffer.length === 0) {
    throw new Error("Invalid buffer");
  }

  if (!isValidFile(buffer)) {
    throw new Error("Invalid File");
  }
  const fileName = `${uuidv4()}.png`;
  const address = path.join(uploadDir, fileName);

  fs.writeFile(address, buffer, (err: any) => {
    if (err) throw err;
    console.log(`The file has been saved at ${address}`);
  });

  return fileName;
}

export function isValidFile(buffer: Buffer): Boolean {
  const PNG_MgNumber = "89504e47";
  const JPG_MgNumber = "ffd8ffe0";
  let b = buffer.subarray(0, 4).toString("hex");

  if (b === PNG_MgNumber || b === JPG_MgNumber) return true;
  return false;
}


export function getUploadDir() {
  return uploadDir;
}


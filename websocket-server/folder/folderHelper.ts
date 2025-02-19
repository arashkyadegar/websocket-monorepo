const fs = require("fs");
import path from "path";
const uploadDir = path.resolve(__dirname, "public", "upload");
export function initialFolder() {
  // Create the upload directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created directory: ${uploadDir}`);
  } else {
    console.log(`Directory exists: ${uploadDir}`);
  }
}

const fs = require("fs");

function imageToBase64(filePath) {
  // Read the image file as a buffer
  const imageBuffer = fs.readFileSync(filePath);

  // Convert the buffer to base64 encoding
  const base64Image = Buffer.from(imageBuffer).toString("base64");

  // Create a data URI with the appropriate MIME type (e.g., "image/png")
  const mimeType = "image/png";
  const dataURI = `data:${mimeType};base64,${base64Image}`;

  return dataURI;
}

// Example usage
const filePath = "static/images/eco-system.png";
const base64Image = imageToBase64(filePath);

console.log(base64Image);

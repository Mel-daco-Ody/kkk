const fs = require('fs-extra');

async function base64ToImage(base64String, filename) {
  const filePath = `./uploads/${filename}`;
  await fs.outputFile(filePath, base64String, { encoding: 'base64' });
  return filePath;
}

module.exports = base64ToImage;

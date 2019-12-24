const fs = require('fs');
const path = require('path');

module.exports = (directory) => {
  const directoryPath = path.resolve(__dirname, '../', directory);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
}
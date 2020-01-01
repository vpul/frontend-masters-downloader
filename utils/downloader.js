const ProgressBar = require('progress');
const path = require('path');
const fs = require('fs');

module.exports = async (url, filePath, throttledAxios) => {
  const { data, headers } = await throttledAxios(url, 'stream');
  const totalLength = headers['content-length'];

  console.log('Starting download');
  const progressBar = new ProgressBar('-> downloading [:bar] :percent :etas', {
    width: 40,
    complete: '=',
    incomplete: ' ',
    renderThrottle: 1,
    total: parseInt(totalLength)
  });

  const writer = fs.createWriteStream(
    path.resolve(__dirname, '..', filePath)
  );

  data.on('data', (chunk) => progressBar.tick(chunk.length))
  data.pipe(writer)
};

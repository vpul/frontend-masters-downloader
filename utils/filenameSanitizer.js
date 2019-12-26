module.exports = (filename) => {
  return filename.replace(/\//g, "-"); // replace character '/' with '-'
};

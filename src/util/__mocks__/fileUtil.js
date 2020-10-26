const readFromFileSync = jest.fn((fileName) => {
  if (fileName === '.jrnlrc.json') {
    return `{
      "default": true,
      "entriesPath": "C:/entries.json"
    }`;
  }
  return null;
});

module.exports = { readFromFileSync };

const os = require('os');
const path = require('path');

const homeDir = os.homedir();
const entriesPath = path.join(homeDir, 'jrnl.json');

module.exports = {
  tagCharacter: '~',
  timeStampFormat: 'YYYY-MM-DD HH:mm',
  tagColor: 'green',
  timeStampColor: 'green',
  entriesPath
};

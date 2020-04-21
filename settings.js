const os = require('os');
const path = require('path');
const { readFromFileSync } = require('./src/util/fileUtil');

const homeDir = os.homedir();
const entriesPath = path.join(homeDir, 'jrnl.json');
const settingsPath = path.join(homeDir, 'jrnlrc.json');

let settings = JSON.parse(readFromFileSync(settingsPath));

settings = settings || {
  encrypt: false,
  tagCharacter: '~',
  timeStampFormat: 'YYYY-MM-DD HH:mm',
  tagColor: 'green',
  timeStampColor: 'green',
  entriesPath
};

module.exports = settings;

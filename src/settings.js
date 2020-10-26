const os = require('os');
const path = require('path');
const { readFromFileSync } = require('./util/fileUtil');

const homeDir = os.homedir();
const settingsPath = path.join(homeDir, '.jrnlrc.json');

const defaultSettings = JSON.parse(readFromFileSync('.jrnlrc.json'));
let settings;

try {
  settings = JSON.parse(readFromFileSync(settingsPath));
} catch (error) {
  settings = null;
}

settings = settings || defaultSettings;

settings.entriesPath = settings.entriesPath.replace(/~/, os.homedir());

module.exports = settings;

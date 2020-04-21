const os = require('os');
const path = require('path');

const homeDir = os.homedir();
const settingsPath = path.join(homeDir, 'jrnlrc.json');

module.exports = {
  promises: {
    readFile: () => { },
    writeFile: () => { }
  },
  readFileSync: (filePath) => {
    if (filePath === settingsPath) {
      return {};
    }
    return null;
  }
};

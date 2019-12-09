const fs = require('fs');

module.exports = () => {
  const e = fs.existsSync('./../krumpli.js');

  if (!e) {
    return 2;
  }
  return 3;
};

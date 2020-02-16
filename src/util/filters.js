const moment = require('moment');

const beforeFilter = timeStamp => entry => entry.timeStamp < moment(timeStamp);

const afterFilter = timeStamp => entry => entry.timeStamp > moment(timeStamp);

const grepFilter = filterText => entry => RegExp(filterText, 'i').test(entry.title) || RegExp(filterText, 'i').test(entry.text);

const entryFilter = filters => entry => filters.reduce((acc, curr) => acc && curr(entry), true);

module.exports = {
  beforeFilter,
  afterFilter,
  grepFilter,
  entryFilter
};

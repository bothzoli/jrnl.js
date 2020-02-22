const moment = require('moment');

const beforeFilter = timeStamp => entry => (timeStamp ? entry.timeStamp < moment(timeStamp) : true);

const afterFilter = timeStamp => entry => (timeStamp ? entry.timeStamp > moment(timeStamp) : true);

const entryContainsText = filterText => entry => RegExp(filterText, 'i').test(entry.title) || RegExp(filterText, 'i').test(entry.text);
const grepFilter = filterText => entry => (filterText ? entryContainsText(filterText)(entry) : true);

const entryFilter = filters => entry => filters.reduce((acc, curr) => acc && curr(entry), true);

const combineFilters = (before, after, grep) => [
  beforeFilter(before),
  afterFilter(after),
  grepFilter(grep)
];

module.exports = {
  beforeFilter,
  afterFilter,
  grepFilter,
  entryFilter,
  combineFilters
};

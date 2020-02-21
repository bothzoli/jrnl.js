const moment = require('moment');

const beforeFilter = timeStamp => entry => entry.timeStamp < moment(timeStamp);

const afterFilter = timeStamp => entry => entry.timeStamp > moment(timeStamp);

const grepFilter = filterText => entry => RegExp(filterText, 'i').test(entry.title) || RegExp(filterText, 'i').test(entry.text);

const entryFilter = filters => entry => filters.reduce((acc, curr) => acc && curr(entry), true);

const combineFilters = (before, after, grep) => {
  let filters = [];
  filters = before ? filters.concat(beforeFilter(before)) : filters;
  filters = after ? filters.concat(afterFilter(after)) : filters;
  filters = grep ? filters.concat(grepFilter(grep)) : filters;
  return filters;
};

module.exports = {
  beforeFilter,
  afterFilter,
  grepFilter,
  entryFilter,
  combineFilters
};

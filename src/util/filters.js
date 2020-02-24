const moment = require('moment');

const beforeFilter = timeStamp => entry => (timeStamp ? entry.timeStamp < moment(timeStamp) : true);

const afterFilter = timeStamp => entry => (timeStamp ? entry.timeStamp > moment(timeStamp) : true);

const regexpTest = filterText => searchText => RegExp(filterText, 'i').test(searchText);

const entryContainsText = filterText => entry => regexpTest(filterText)(entry.title)
  || regexpTest(filterText)(entry.text);
const grepFilter = filterText => entry => (filterText
  ? entryContainsText(filterText)(entry)
  : true);

const tagsMatchText = filterText => entry => entry.tags
  .filter(tag => regexpTest(filterText)(tag)).length > 0;
const tagFilter = filterText => entry => (filterText ? tagsMatchText(filterText)(entry) : true);

const entryFilter = filters => entry => filters.reduce((acc, curr) => acc && curr(entry), true);

const combineFilters = (before, after, grep, tag) => [
  beforeFilter(before),
  afterFilter(after),
  grepFilter(grep),
  tagFilter(tag)
];

module.exports = {
  beforeFilter,
  afterFilter,
  grepFilter,
  entryFilter,
  tagFilter,
  combineFilters
};

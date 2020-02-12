const chalk = require('chalk');
const moment = require('moment');

const { readEntries } = require('./util/util');

const tagCharacter = '~';
const timeStampFormat = 'YYYY-MM-DD HH:mm:ss';

const entryMatcher = /(^.*?[.!?])(?:\s|$)(.*)|(.*)/s;
const tagMatcher = new RegExp(`(?<=\\s|^)${tagCharacter}(\\w+)\\b`, 'g');

const stripTagChar = tag => tag.substring(1);
const tagToLowercase = tag => tag.toLowerCase();
const tagFormatter = tag => tagToLowercase(stripTagChar(tag));
const removeDuplicateTags = (unique, item) => (unique.includes(item) ? unique : [...unique, item]);

const colorTags = (str) => str.replace(tagMatcher, chalk.blue('$1'));

const Entry = (entryText) => {
  const entry = entryMatcher.exec(entryText);
  const newEntry = {};

  newEntry.title = entry[1] ? entry[1] : entryText;
  newEntry.text = entry[2] ? entry[2] : '';
  newEntry.tags = (entryText.match(tagMatcher) || [])
    .map(tagFormatter)
    .reduce(removeDuplicateTags, [])
    .sort();
  newEntry.timeStamp = Date.now();

  return newEntry;
};

const entryToString = (entry) => {
  const timeStamp = moment(entry.timeStamp).format(timeStampFormat);
  return `${chalk.blue(timeStamp)} - ${colorTags(entry.title)}\n\n${colorTags(entry.text)}`;
};

const beforeFilter = timeStamp => entry => entry.timeStamp < moment(timeStamp);

const afterFilter = timeStamp => entry => entry.timeStamp > moment(timeStamp);

const grepFilter = filterText => entry => RegExp(filterText, 'i').test(entry.title) || RegExp(filterText, 'i').test(entry.text);

const entryFilter = filters => entry => filters.reduce((acc, curr) => acc && curr(entry), true);

const listEntries = async (writer, numberOfEntries, before, after, grep) => {
  let filters = [];
  filters = before ? filters.concat(beforeFilter(before)) : filters;
  filters = after ? filters.concat(afterFilter(after)) : filters;
  filters = grep ? filters.concat(grepFilter(grep)) : filters;

  (await readEntries()).Entries
    .sort((x, y) => y.timeStamp - x.timeStamp)
    .filter(entryFilter(filters))
    .slice(0, numberOfEntries)
    .map(entry => writer(entryToString(entry)));
};

module.exports = {
  Entry,
  entryToString,
  listEntries
};

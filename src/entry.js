const chalk = require('chalk');
const moment = require('moment');

const { readEntries } = require('./util/util');
const {
  beforeFilter,
  afterFilter,
  grepFilter,
  entryFilter
} = require('./util/filters');

const tagCharacter = '~';
const timeStampFormat = 'YYYY-MM-DD HH:mm:ss';

const entryMatcher = /(^.*?[.!?])(?:\s|$)(.*)|(.*)/s;
const tagMatcher = new RegExp(`(?<=\\s|^)${tagCharacter}(\\w+)\\b`, 'g');

const stripTagChar = tag => tag.substring(1);
const tagToLowercase = tag => tag.toLowerCase();
const tagFormatter = tag => tagToLowercase(stripTagChar(tag));
const removeDuplicateTags = (unique, item) => (unique.includes(item) ? unique : [...unique, item]);

const colorTags = (str) => str.replace(tagMatcher, chalk.blue('$1'));
const boldTags = (str) => str.replace(tagMatcher, '__$1__');

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

const entryToMarkDown = (entry) => {
  const timeStamp = moment(entry.timeStamp).format(timeStampFormat);
  return `## ${timeStamp} - ${boldTags(entry.title)}\n\n${boldTags(entry.text)}`;
};

const listEntries = async (writer, numberOfEntries, before, after, grep, toMD) => {
  let filters = [];
  filters = before ? filters.concat(beforeFilter(before)) : filters;
  filters = after ? filters.concat(afterFilter(after)) : filters;
  filters = grep ? filters.concat(grepFilter(grep)) : filters;

  const converter = toMD ? entryToMarkDown : entryToString;

  (await readEntries()).Entries
    .sort((x, y) => y.timeStamp - x.timeStamp)
    .filter(entryFilter(filters))
    .slice(0, numberOfEntries)
    .map(entry => writer(converter(entry)));
};

module.exports = {
  Entry,
  entryToString,
  listEntries
};

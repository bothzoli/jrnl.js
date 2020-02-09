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

const listEntries = async (writer, numberOfEntries) => {
  (await readEntries()).Entries
    .sort((x, y) => y.timeStamp - x.timeStamp)
    .slice(0, numberOfEntries)
    .map(entry => writer(entryToString(entry)));
};

module.exports = {
  Entry,
  entryToString,
  listEntries
};

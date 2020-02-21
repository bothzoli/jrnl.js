const compose = require('./fp');
const { entryToString, entryToMarkDown } = require('./util/printer');
const { entryFilter } = require('./util/filters');

const tagCharacter = '~';

const entryMatcher = /(^.*?[.!?])(?:\s|$)(.*)|(.*)/s;
const tagMatcher = new RegExp(`(?<=\\s|^)${tagCharacter}(\\w+)\\b`, 'g');

const stripTagChar = tag => tag.substring(1);
const tagToLowercase = tag => tag.toLowerCase();
const tagFormatter = tag => compose(tagToLowercase, stripTagChar)(tag);
const removeDuplicateTags = (unique, item) => (unique.includes(item) ? unique : [...unique, item]);

const Entry = entryText => {
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

const listEntries = (writer, numberOfEntries, filters, toMD) => entries => {
  const converter = toMD ? entryToMarkDown : entryToString;

  entries
    .filter(entryFilter(filters))
    .slice(0, numberOfEntries)
    .map(entry => writer(converter(entry)));
};

module.exports = {
  Entry,
  entryToString,
  listEntries
};

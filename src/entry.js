const compose = require('./fp');
const { entryToString, entryToMarkDown } = require('./util/printer');
const { entryFilter } = require('./util/filters');

const tagCharacter = '~';

const entryMatcher = /(^.*?[.!?])(?:\s|$)(.*)|(.*)/s;

const tagMatcher = new RegExp(`(?<=\\s|^)${tagCharacter}(\\w+)\\b`, 'g');
const getTags = entryText => entryText.match(tagMatcher) || [];

const stripTagChar = tag => tag.substring(1);
const tagToLowercase = tag => tag.toLowerCase();
const tagFormatter = tag => compose(tagToLowercase, stripTagChar)(tag);
const removeDuplicateTags = (unique, item) => (unique.includes(item) ? unique : [...unique, item]);

const Entry = entryText => {
  const entry = entryMatcher.exec(entryText);
  return {
    title: entry[1] ? entry[1] : entryText,
    text: entry[2] ? entry[2] : '',
    tags: getTags(entryText)
      .map(tagFormatter)
      .reduce(removeDuplicateTags, [])
      .sort(),
    timeStamp: Date.now()
  };
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

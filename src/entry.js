const compose = require('./fp');
const { entryToString, entryToMarkDown } = require('./util/printer');
const { entryFilter } = require('./util/filters');

const settings = require('../settings');

const slice = text => {
  const split = text.match(/((?<=(\.|!|\?)) |\n)/);
  if (split) {
    return [text.slice(0, split.index), text.slice(split.index + 1)];
  }
  return [text, ''];
};

const tagMatcher = new RegExp(`(?<=\\s|^)${settings.tagCharacter}(\\w+)\\b`, 'g');
const getTags = entryText => entryText.match(tagMatcher) || [];

const stripTagChar = tag => tag.substring(1);
const tagToLowercase = tag => tag.toLowerCase();
const tagFormatter = tag => compose(tagToLowercase, stripTagChar)(tag);
const removeDuplicateTags = (unique, item) => (unique.includes(item) ? unique : [...unique, item]);

const Entry = entryText => {
  const strippedEntryText = entryText.slice(-1) === '\n' ? entryText.slice(0, -1) : entryText;
  const entry = slice(strippedEntryText);
  return {
    title: entry[0],
    text: entry[1],
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

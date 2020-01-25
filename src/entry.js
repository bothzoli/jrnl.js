const chalk = require('chalk');
const moment = require('moment');

const tagCharacter = '~';
const timeStampFormat = 'YYYY-MM-DD HH:mm';

const entryMatcher = /(^.*?[.!?])(?:\s|$)(.*)|(.*)/s;
const tagMatcher = new RegExp(`(?<=\\s|^)${tagCharacter}(\\w+)\\b`, 'g');

const stripTagChar = tag => tag.substring(1);
const tagToLowercase = tag => tag.toLowerCase();
const tagFormatter = tag => tagToLowercase(stripTagChar(tag));
const removeDuplicateTags = (unique, item) => (unique.includes(item) ? unique : [...unique, item]);

const colorTags = (str) => str.replace(tagMatcher, chalk.blue('$1'));

class Entry {
  constructor(entryText) {
    const entry = entryMatcher.exec(entryText);

    this.title = entry[1] ? entry[1] : entryText;
    this.text = entry[2] ? entry[2] : '';
    this.tags = (entryText.match(tagMatcher) || [])
      .map(tagFormatter)
      .reduce(removeDuplicateTags, [])
      .sort();
    this.timeStamp = Date.now();
  }

  toString() {
    const timeStamp = moment(this.timeStamp).format(timeStampFormat);
    return `${chalk.blue(timeStamp.toLocaleString())} - ${colorTags(this.title)}\n\n${colorTags(this.text)}`;
  }
}

module.exports = {
  Entry
};

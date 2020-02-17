const { blue } = require('chalk');
const moment = require('moment');

const tagCharacter = '~';
const timeStampFormat = 'YYYY-MM-DD HH:mm:ss';
const tagMatcher = new RegExp(`(?<=\\s|^)${tagCharacter}(\\w+)\\b`, 'g');

const colorTags = str => str.replace(tagMatcher, blue('$1'));
const boldTags = str => str.replace(tagMatcher, '__$1__');

const entryToString = entry => {
  const timeStamp = moment(entry.timeStamp).format(timeStampFormat);
  return `${blue(timeStamp)} - ${colorTags(entry.title)}\n\n${colorTags(entry.text)}`;
};

const entryToMarkDown = entry => {
  const timeStamp = moment(entry.timeStamp).format(timeStampFormat);
  return `## ${timeStamp} - ${boldTags(entry.title)}\n\n${boldTags(entry.text)}`;
};

module.exports = {
  entryToString,
  entryToMarkDown
};

const { green } = require('chalk');
const moment = require('moment');

const tagCharacter = '~';
const timeStampFormat = 'YYYY-MM-DD HH:mm:ss';
const tagMatcher = new RegExp(`(?<=\\s|^)${tagCharacter}(\\w+)\\b`, 'g');

const boldText = str => `__${str}__`;
const highlightTagsWith = highlighter => str => str.replace(tagMatcher, highlighter('$1'));

const colorTags = highlightTagsWith(green);
const boldTags = highlightTagsWith(boldText);

const entryToString = entry => {
  const timeStamp = moment(entry.timeStamp).format(timeStampFormat);
  return `${green(timeStamp)} - ${colorTags(entry.title)}\n\n${colorTags(entry.text)}`;
};

const entryToMarkDown = entry => {
  const timeStamp = moment(entry.timeStamp).format(timeStampFormat);
  return `## ${timeStamp} - ${boldTags(entry.title)}\n\n${boldTags(entry.text)}`;
};

module.exports = {
  entryToString,
  entryToMarkDown
};

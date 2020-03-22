const chalk = require('chalk');
const moment = require('moment');
const settings = require('../../settings');

const tagMatcher = new RegExp(`(?<=\\s|^)${settings.tagCharacter}(\\w+)\\b`, 'g');

const boldText = str => `__${str}__`;
const highlightTagsWith = highlighter => str => str.replace(tagMatcher, highlighter('$1'));

const colorTags = highlightTagsWith(chalk[settings.tagColor]);
const boldTags = highlightTagsWith(boldText);

const entryToString = entry => {
  const timeStamp = moment(entry.timeStamp).format(settings.timeStampFormat);
  const text = entry.text ? `\n| ${colorTags(entry.text.replace(/\n/g, '\n| '))}\n` : '\n';
  return `${chalk[settings.timeStampColor](timeStamp)} - ${colorTags(entry.title)}${text}`;
};

const entryToMarkDown = entry => {
  const timeStamp = moment(entry.timeStamp).format(settings.timeStampFormat);
  return `## ${timeStamp} - ${boldTags(entry.title)}\n\n${boldTags(entry.text)}\n`;
};

module.exports = {
  entryToString,
  entryToMarkDown
};

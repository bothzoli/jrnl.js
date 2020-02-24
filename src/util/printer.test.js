const chalk = require('chalk');
const moment = require('moment');
const settings = require('./../../settings');

const { entryToString, entryToMarkDown } = require('./printer');

const testEntry = {
  title: `Title with ${settings.tagCharacter}tag.`,
  text: `Text with ${settings.tagCharacter}another.`,
  timeStamp: moment('2018-02-03 12:34:56')
};

describe('Print utilities', () => {
  test('MarkDown converter', () => {
    expect(entryToMarkDown(testEntry))
      .toBe(`## ${testEntry.timeStamp.format(settings.timeStampFormat)} - Title with __tag__.\n\nText with __another__.`);
  });
  test('Entry to string converter', () => {
    expect(entryToString(testEntry))
      .toBe(`${chalk[settings.timeStampColor](testEntry.timeStamp.format(settings.timeStampFormat))} - Title with ${chalk[settings.tagColor]('tag')}.\n\nText with ${chalk[settings.tagColor]('another')}.`);
  });
});

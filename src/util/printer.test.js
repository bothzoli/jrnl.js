const { green } = require('chalk');
const moment = require('moment');

const { entryToString, entryToMarkDown } = require('./printer');

const testEntry = {
  title: 'Title with ~tag.',
  text: 'Text with ~another.',
  timeStamp: moment('2018-02-03 12:34:56')
};

describe('Print utilities', () => {
  test('MarkDown converter', () => {
    expect(entryToMarkDown(testEntry))
      .toBe('## 2018-02-03 12:34:56 - Title with __tag__.\n\nText with __another__.');
  });
  test('Entry to string converter', () => {
    expect(entryToString(testEntry))
      .toBe(`${green('2018-02-03 12:34:56')} - Title with ${green('tag')}.\n\nText with ${green('another')}.`);
  });
});

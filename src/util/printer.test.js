const { blue } = require('chalk');
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
  test('MarkDown converter', () => {
    expect(entryToString(testEntry))
      .toBe(`${blue('2018-02-03 12:34:56')} - Title with ${blue('tag')}.\n\nText with ${blue('another')}.`);
  });
});

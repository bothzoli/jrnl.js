const printer = require('./util/printer');

const settings = require('../settings');

printer.entryToString = jest.fn(x => x);
printer.entryToMarkDown = jest.fn(x => x);

const { Entry, listEntries } = require('./entry');

const now = new Date('2018-01-01T12:23:34');
Date.now = jest.fn(() => now);

describe('Entry creation', () => {
  test('Single line entry', () => {
    const text = 'Test';

    const entry = Entry(text);

    expect(entry.title).toBe(text);
    expect(entry.text).toBe('');
    expect(entry.tags).toEqual([]);
    expect(entry.timeStamp).toBe(now);
  });

  test('Mutli line entry', () => {
    const title = 'this is the title.';
    const text = `and this is the body. this should not be in the title.

    this is the next line? and a next sentence that is not a title anymore?
    neither is this! although it's a new line!`;
    const fullText = `${title} ${text}`;

    const entry = Entry(fullText);

    expect(entry.title).toBe(title);
    expect(entry.text).toBe(text);
    expect(entry.tags).toEqual([]);
    expect(entry.timeStamp).toBe(now);
  });

  test.each([
    ['fullstop', '.'],
    ['exclamation mark', '!'],
    ['question mark', '?']
  ])('Simple entry - Title with %s', (name, character) => {
    const title = `This is the title${character}`;
    const text = 'This is the text';
    const fullText = `${title} ${text}`;

    const entry = Entry(fullText);

    expect(entry.title).toBe(title);
    expect(entry.text).toBe(text);
    expect(entry.tags).toEqual([]);
    expect(entry.timeStamp).toBe(now);
  });

  test('Simple entry - Title with new line', () => {
    const title = 'This is the title';
    const text = 'This is the text';
    const fullText = `${title}\n${text}`;

    const entry = Entry(fullText);

    expect(entry.title).toBe(title);
    expect(entry.text).toBe(text);
    expect(entry.tags).toEqual([]);
    expect(entry.timeStamp).toBe(now);
  });

  test('Tags', () => {
    const text = `${settings.tagCharacter}Test to see if it caputers ${settings.tagCharacter}tags as expected`;
    const tags = ['test', 'tags'];

    const entry = Entry(text);

    expect(entry.tags).toEqual(expect.arrayContaining(tags));
  });

  test('Duplicate tags', () => {
    const text = `this is the ${settings.tagCharacter}title. and this is the ${settings.tagCharacter}body. this should not be in the ${settings.tagCharacter}title.`;
    const tags = ['title', 'body'];

    const entry = Entry(text);

    expect(entry.tags).toEqual(expect.arrayContaining(tags));
    expect(entry.tags.length).toBe(2);
  });
});

describe('List entries', () => {
  beforeEach(() => {
    printer.entryToMarkDown.mockClear();
    printer.entryToString.mockClear();
  });

  test('Entry to string', () => {
    const text = 'Test!\nEntryText\n';

    const entry = Entry(text);

    const writer = jest.fn(x => x);
    listEntries(writer, 1, [], false)([entry]);

    expect(printer.entryToMarkDown.mock.calls.length).toBe(0);
    expect(printer.entryToString.mock.calls.length).toBe(1);
    expect(printer.entryToString.mock.calls[0][0]).toEqual(entry);

    expect(writer.mock.calls.length).toBe(1);
    expect(writer.mock.calls[0][0]).toEqual(entry);
  });

  test('Entry to markdown', () => {
    const text = 'Test!\nEntryText\n';

    const entry = Entry(text);

    const writer = jest.fn(x => x);
    listEntries(writer, 1, [], true)([entry]);

    expect(printer.entryToString.mock.calls.length).toBe(0);
    expect(printer.entryToMarkDown.mock.calls.length).toBe(1);
    expect(printer.entryToMarkDown.mock.calls[0][0]).toEqual(entry);

    expect(writer.mock.calls.length).toBe(1);
    expect(writer.mock.calls[0][0]).toEqual(entry);
  });
});

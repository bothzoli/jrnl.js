const moment = require('moment');

const {
  beforeFilter,
  afterFilter,
  grepFilter,
  entryFilter,
  tagFilter,
  combineFilters
} = require('./filters');


const pastString = '2018-02-04';
const now = '2018-02-05';
const futureString = '2018-02-06';

const past = {
  timeStamp: moment(pastString)
};

const future = {
  timeStamp: moment(futureString)
};

const matchString = 'match';
const tagMatchString = 'tag';

const titleMatch = {
  title: matchString.toUpperCase(),
  text: 'something else'
};

const textMatch = {
  title: 'something',
  text: matchString.toUpperCase()
};

const noMatch = {
  title: 'something',
  text: 'something else',
  tags: ['anything']
};

const fullMatch = {
  title: matchString.toUpperCase(),
  timeStamp: moment(now),
  tags: ['tag', 'another']
};

describe('Entry filters', () => {
  test('beforeFilter', () => {
    expect(beforeFilter()(past)).toBe(true);
    expect(beforeFilter(now)(past)).toBe(true);
    expect(beforeFilter(now)(future)).toBe(false);
  });

  test('afterFilter', () => {
    expect(afterFilter()(past)).toBe(true);
    expect(afterFilter(now)(past)).toBe(false);
    expect(afterFilter(now)(future)).toBe(true);
  });

  test('grepFilter', () => {
    expect(grepFilter()(titleMatch)).toBe(true);
    expect(grepFilter(matchString)(titleMatch)).toBe(true);
    expect(grepFilter(matchString)(textMatch)).toBe(true);
    expect(grepFilter(matchString)(noMatch)).toBe(false);
  });

  test('tagFilter', () => {
    expect(tagFilter()(noMatch)).toBe(true);
    expect(tagFilter(tagMatchString)(noMatch)).toBe(false);
    expect(tagFilter(tagMatchString)(fullMatch)).toBe(true);
  });

  test('entryFilter', () => {
    expect(entryFilter([
      beforeFilter(futureString),
      afterFilter(pastString),
      grepFilter(matchString)
    ])(fullMatch)).toBe(true);
  });
});

describe('Combine filters', () => {
  test('Combine all filters', () => {
    const combinedFilters = combineFilters(futureString, pastString, matchString, tagMatchString);

    expect(combinedFilters.length).toBe(4);
    expect(combinedFilters[0].toString())
      .toEqual(beforeFilter(futureString).toString());
    expect(combinedFilters[1].toString())
      .toEqual(afterFilter(pastString).toString());
    expect(combinedFilters[2].toString())
      .toEqual(grepFilter(matchString).toString());
    expect(combinedFilters[3].toString())
      .toEqual(tagFilter(tagMatchString).toString());
  });
});

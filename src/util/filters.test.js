const moment = require('moment');

const {
  beforeFilter,
  afterFilter,
  grepFilter,
  entryFilter,
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
  text: 'something else'
};

const fullMatch = {
  title: matchString.toUpperCase(),
  timeStamp: moment(now)
};

describe('Entry filters', () => {
  test('beforeFilter', () => {
    expect(beforeFilter(now)(past)).toBe(true);
    expect(beforeFilter(now)(future)).toBe(false);
  });

  test('afterFilter', () => {
    expect(afterFilter(now)(past)).toBe(false);
    expect(afterFilter(now)(future)).toBe(true);
  });

  test('grepFilter', () => {
    expect(grepFilter(matchString)(titleMatch)).toBe(true);
    expect(grepFilter(matchString)(textMatch)).toBe(true);
    expect(grepFilter(matchString)(noMatch)).toBe(false);
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
  test('Only after filter', () => {
    const combinedFilters = combineFilters(futureString, undefined, undefined);

    expect(combinedFilters.length).toBe(1);
    expect(combinedFilters[0].toString())
      .toEqual(beforeFilter(futureString).toString());
  });

  test('Only before filter', () => {
    const combinedFilters = combineFilters(undefined, pastString, undefined);

    expect(combinedFilters.length).toBe(1);
    expect(combinedFilters[0].toString())
      .toEqual(afterFilter(pastString).toString());
  });

  test('Only grep filter', () => {
    const combinedFilters = combineFilters(undefined, undefined, matchString);

    expect(combinedFilters.length).toBe(1);
    expect(combinedFilters[0].toString())
      .toEqual(grepFilter(matchString).toString());
  });

  test('Combine all filters', () => {
    const combinedFilters = combineFilters(futureString, pastString, matchString);

    expect(combinedFilters.length).toBe(3);
    expect(combinedFilters[0].toString())
      .toEqual(beforeFilter(futureString).toString());
    expect(combinedFilters[1].toString())
      .toEqual(afterFilter(pastString).toString());
    expect(combinedFilters[2].toString())
      .toEqual(grepFilter(matchString).toString());
  });
});

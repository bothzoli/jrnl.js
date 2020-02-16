const compose = (...functions) => x => functions
  .slice()
  .reverse()
  .reduce((acc, curr) => curr(acc), x);

module.exports = compose;

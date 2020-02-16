const fs = require('fs');

const entriesJSON = './entries.json';

const readFromFile = async fileName => (await fs.promises.readFile(fileName, 'utf8').catch(() => null)) || '[]';

const writeToFile = fileName => async entries => {
  await fs.promises.writeFile(fileName, JSON.stringify(entries));
};

const addNewEntry = async entry => {
  const entries = (await fs.promises.readFile(entriesJSON, 'utf8').catch(() => null)) || '[]';

  await writeToFile(entriesJSON)([entry, ...JSON.parse(entries)]);
};

const readEntries = async () => JSON.parse(await readFromFile(entriesJSON));

module.exports = {
  addNewEntry,
  readEntries
};

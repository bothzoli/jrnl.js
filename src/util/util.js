const fs = require('fs');

const entriesJSON = './entries.json';

const addNewEntry = async (data) => {
  const entries = (await fs.promises.readFile(entriesJSON, 'utf8').catch(() => null)) || '{"Entries":[]}';

  const jsonEntries = JSON.parse(entries);
  jsonEntries.Entries.push(data);

  await fs.promises.writeFile(entriesJSON, JSON.stringify(jsonEntries));
};

const readEntries = async () => {
  const entries = (await fs.promises.readFile(entriesJSON, 'utf8').catch(() => null)) || '{"Entries":[]}';

  return JSON.parse(entries);
};

module.exports = {
  addNewEntry,
  readEntries
};

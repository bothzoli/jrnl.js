const fs = require('fs');

const entriesJSON = './entries.json';

const addNewEntry = async data => {
  const entries = (await fs.promises.readFile(entriesJSON, 'utf8').catch(() => null)) || '{"Entries":[]}';

  await fs.promises.writeFile(
    entriesJSON,
    JSON.stringify({
      Entries: [data, ...(JSON.parse(entries)).Entries]
    })
  );
};

const readEntries = async () => {
  const entries = (await fs.promises.readFile(entriesJSON, 'utf8').catch(() => null)) || '{"Entries":[]}';

  return JSON.parse(entries);
};

module.exports = {
  addNewEntry,
  readEntries
};

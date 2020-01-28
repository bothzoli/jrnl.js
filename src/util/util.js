const fs = require('fs');

module.exports = async (data) => {
  const entries = (await fs.promises.readFile('./entries.json', 'utf8').catch(() => null)) || '{"Entries":[]}';

  const jsonEntries = JSON.parse(entries);
  jsonEntries.Entries.push(data);

  await fs.promises.writeFile('./entries.json', JSON.stringify(jsonEntries));
};

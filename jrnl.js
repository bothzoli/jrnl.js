const readline = require('readline');
const { Entry, entryToString } = require('./src/entry');
const { addNewEntry, readEntries } = require('./src/util/util');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '',
});

rl.write('Please write your jrnl entry!\n');
rl.prompt();

let jrnlEntry = '';

(async () => {
  rl.on('line', (line) => {
    jrnlEntry += `${line}\n`;
    rl.prompt();
  }).on('close', async () => {
    const newEntry = Entry(jrnlEntry);

    entryToString(newEntry);
    await addNewEntry(newEntry);

    const entryFile = await readEntries();
    entryFile.Entries.map(entry => console.log(entryToString(entry)));
  });
})();

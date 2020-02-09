const readline = require('readline');
const { Entry, entryToString, listEntries } = require('./src/entry');
const { addNewEntry } = require('./src/util/util');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '',
});

listEntries(console.log, 3);

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

    listEntries(console.log, 3);
  });
})();

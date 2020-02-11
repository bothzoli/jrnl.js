#!/usr/bin/env node

const readline = require('readline');
const yargs = require('yargs');
const { Entry, listEntries } = require('./src/entry');
const { addNewEntry } = require('./src/util/util');

const { argv } = yargs;

if (argv.l >= 0) {
  listEntries(console.log, argv.l);
} else if (argv._.length === 0) {
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

      await addNewEntry(newEntry);

      listEntries(console.log, 1);
    });
  })();
}

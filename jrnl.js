#!/usr/bin/env node

const readline = require('readline');
const yargs = require('yargs');
const { Entry, listEntries } = require('./src/entry');
const { addNewEntry } = require('./src/util/util');

const { argv } = yargs
  .usage('Usage: $0 -l [options]')
  .usage('Usage: $0 --list [options]')
  .alias('l', 'list')
  .describe('l', 'List jrnl.js entries')
  .alias('b', 'before')
  .describe('b', 'Only list entries created before a given date')
  .alias('a', 'after')
  .describe('a', 'Only list entries created after a given date')
  .alias('g', 'grep')
  .describe('g', 'RegExp search in entries')
  .example('$0 -l -a 2010-01-12 -g "beers?"', 'List entries created after 2010-01-12 that contain "beer" or "beers"')
  .alias('m', 'markdown')
  .describe('m', 'List entries in MarkDown format')
  .boolean('m')
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help');

if (argv.list) {
  const numberOfEntries = argv.list === true ? Number.MAX_VALUE : argv.list;
  listEntries(console.log, numberOfEntries, argv.before, argv.after, argv.grep, argv.markdown);
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
    rl.on('line', line => {
      jrnlEntry += `${line}\n`;
      rl.prompt();
    }).on('close', async () => {
      const newEntry = Entry(jrnlEntry);

      await addNewEntry(newEntry);

      listEntries(console.log, 1);
    });
  })();
}

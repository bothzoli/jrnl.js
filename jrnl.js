#!/usr/bin/env node

const readline = require('readline');
const yargs = require('yargs');
const chalk = require('chalk');
const settings = require('./settings');
const { Entry, listEntries } = require('./src/entry');
const { readEntries, writeEntries } = require('./src/util/util');
const { combineFilters } = require('./src/util/filters');

const { argv } = yargs
  .usage(`Usage: ${chalk.blue('$0')} - to start creating new journal entries`)
  .usage(`Usage: ${chalk.blue('$0 -l [options]')} - to list existing journal entries`)
  .usage(`Usage: ${chalk.blue('$0 --list [options]')} - to list existing journal entries`)
  .alias('l', 'list')
  .describe('l', 'List only the last n jrnl.js entries (number can be skipped)')
  .alias('b', 'before')
  .describe('b', 'Only list entries created before a given date (YYYY-MM-DD)')
  .alias('a', 'after')
  .describe('a', 'Only list entries created after a given date (YYYY-MM-DD)')
  .alias('g', 'grep')
  .describe('g', 'RegExp search in entries')
  .alias('t', 'tag')
  .describe('t', 'RegExp search in tags')
  .example(`${chalk.blue('$0 -l 3 -a 2010-01-12 -g "beers?"')}`, 'List the last 3 entries created after 2010-01-12 that contain "beer" or "beers"')
  .alias('m', 'markdown')
  .describe('m', 'List entries in MarkDown format')
  .boolean('m')
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help');

if (argv.list) {
  const numberOfEntries = argv.list === true ? Number.MAX_VALUE : argv.list;
  (async () => {
    const entries = await readEntries(settings.entriesPath);
    listEntries(
      console.log,
      numberOfEntries,
      combineFilters(argv.before, argv.after, argv.grep, argv.tag),
      argv.markdown
    )(entries);
  })();
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

      await writeEntries(settings.entriesPath)(newEntry);

      listEntries(console.log, 1);
    });
  })();
}

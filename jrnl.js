const readline = require('readline');
const { Entry } = require('./src/entry');
const util = require('./src/util/util');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '',
});

rl.write('Please write your jrnl entry!\n');
rl.prompt();

let jrnlEntry = '';

rl.on('line', (line) => {
  jrnlEntry += `${line}\n`;
  rl.prompt();
}).on('close', () => {
  const newEntry = new Entry(jrnlEntry);
  console.log(newEntry.toString());
  util(newEntry).then(() => process.exit(0));
});

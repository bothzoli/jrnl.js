const readline = require('readline');
const entry = require('./src/entry');

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
  const newEntry = new entry.Entry(jrnlEntry);
  console.log(newEntry.toString());
  console.log(`tags: ${newEntry.tags}`);
  process.exit(0);
});

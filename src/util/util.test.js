// const fs = require('fs');
// const util = require('./util');

// test('Add 1 entry to non-existing entries', async () => {
//   fs.promises.readFile = jest.fn(() => Promise.reject());
//   expect.assertions(2);
//   const exists = await util('asdf');
//   expect(exists.Entries.length).toBe(1);
//   expect(exists.Entries[0]).toBe('asdf');
// });

// test('Add 1 entry to already existing entries', async () => {
//   fs.promises.readFile = jest.fn(() => Promise.resolve('{"Entries":["qwer"]}'));
//   expect.assertions(2);
//   const exists = await util('asdf');
//   expect(exists.Entries.length).toBe(2);
//   expect(exists.Entries[1]).toBe('asdf');
// });

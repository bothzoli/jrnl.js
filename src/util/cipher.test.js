const settings = require('../../settings');

const { encrypt, decrypt } = require('./cipher');

const password = 'Pas$w0Rd1!';
const inputText = 'My very secret text';

describe('Cipher utilities', () => {
  test('Encrypt and decrypt a text', () => {
    settings.encrypt = true;

    const ciphertext = encrypt(password)(inputText);
    const decryptedText = decrypt(password)(ciphertext);

    expect(ciphertext).not.toBe(inputText);
    expect(decryptedText).toBe(inputText);
  });

  test('Encrypt text twice and have different ciphertext', () => {
    settings.encrypt = true;

    const ciphertext1 = encrypt(password)(inputText);
    const ciphertext2 = encrypt(password)(inputText);

    const decryptedText1 = decrypt(password)(ciphertext1);
    const decryptedText2 = decrypt(password)(ciphertext2);

    expect(ciphertext1).not.toBe(ciphertext2);
    expect(decryptedText1).toBe(inputText);
    expect(decryptedText2).toBe(inputText);
  });

  test('Decrypt returns empty string for empty string input', () => {
    settings.encrypt = true;

    const decryptedText = decrypt(password)('');

    expect(decryptedText).toBe('');
  });

  test('Decrypt returns empty string for null input', () => {
    settings.encrypt = true;

    const decryptedText = decrypt(password)(null);

    expect(decryptedText).toBe('');
  });
});

describe('Cipher utilities', () => {
  test('Encryption switched off', () => {
    settings.encrypt = false;

    const ciphertext = encrypt(password)(inputText);
    const decryptedText = decrypt(password)(ciphertext);

    expect(ciphertext).toBe(inputText);
    expect(decryptedText).toBe(inputText);
  });
});

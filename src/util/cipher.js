const crypto = require('crypto');
const settings = require('../../settings');

const algorithm = 'aes-256-cbc';

const encrypt = password => textToCipher => {
  if (!settings.encrypt) {
    return textToCipher;
  }

  const base64Text = Buffer.from(textToCipher).toString('base64');
  const salt = crypto.randomBytes(32);
  const key = crypto.scryptSync(password, salt, 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(base64Text, 'base64', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}.${salt.toString('hex')}.${encrypted}`;
};

const decrypt = password => textToDecipher => {
  if (!settings.encrypt) {
    return textToDecipher;
  }
  if (textToDecipher === '' || textToDecipher === null) {
    return '';
  }

  const [iv, salt, encrypted] = textToDecipher.split('.');
  const key = crypto.scryptSync(password, Buffer.from(salt, 'hex'), 32);

  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));

  let decrypted = decipher.update(encrypted, 'hex', 'base64');
  decrypted += decipher.final('base64');

  return Buffer.from(decrypted, 'base64').toString();
};


module.exports = {
  encrypt,
  decrypt
};

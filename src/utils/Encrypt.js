const Crypto = require('crypto');

const Encrypt = {
  deAES128CBC(messageBase64, key, iv) {
    let keyBuffer = Buffer.alloc(16, 0x00);
    let ivBuffer = Buffer.alloc(16, 0x00);
    Buffer.from(key, 'ascii').copy(keyBuffer);
    Buffer.from(iv, 'ascii').copy(ivBuffer);
    let decipher = Crypto.createDecipheriv('aes-128-cbc', keyBuffer, ivBuffer);
    return (decipher.update(messageBase64, 'base64', 'utf8') + decipher.final('utf8')).toString();
  },
  enAES128CBC(plainText, key, iv) {
    let keyBuffer = Buffer.alloc(16, 0x00);
    let ivBuffer = Buffer.alloc(16, 0x00);
    Buffer.from(key, 'ascii').copy(keyBuffer);
    Buffer.from(iv, 'ascii').copy(ivBuffer);
    let cipher = Crypto.createCipheriv('aes-128-cbc', keyBuffer, ivBuffer);
    return cipher.update(plainText, 'utf8', 'base64') + cipher.final('base64');
  },
};
module.exports = Encrypt;

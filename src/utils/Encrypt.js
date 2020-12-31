const Crypto = require('crypto');
const Compression = require('./Compression');

const Encrypt = {
  enAES128CBC(plainText, key, iv) {
    return Encrypt.aes128.cbc.en({
      data: plainText, key, iv
    })
  },
  deAES128CBC(messageBase64, key, iv) {
    return Encrypt.aes128.cbc.de({
      data: messageBase64, key, iv
    })
  },
  aes128: {
    cbc: {
      /**
       *
       * @param {string | BinaryLike | InputType} data
       * @param {string} key
       * @param {string} iv
       * @param {Utf8AsciiBinaryEncoding} inputEncoding
       * @param {HexBase64BinaryEncoding | "buffer"} outputEncoding
       * @param {boolean} compression
       * @return {string | Buffer}
       */
      en({data, key, iv, inputEncoding = 'utf8', outputEncoding = 'base64', compression = false}) {
        let d = data;
        if (compression) {
          d = Compression.compression(data);
          inputEncoding = undefined;
        } else if (typeof d !== "string") {
          inputEncoding = undefined;
        }
        let keyBuffer = Buffer.alloc(16, 0x00);
        let ivBuffer = Buffer.alloc(16, 0x00);
        Buffer.from(key, 'ascii').copy(keyBuffer);
        Buffer.from(iv, 'ascii').copy(ivBuffer);
        let cipher = Crypto.createCipheriv('aes-128-cbc', keyBuffer, ivBuffer);
        if (outputEncoding === 'buffer') {
          const rs = [];
          rs.push(cipher.update(d, inputEncoding));
          rs.push(cipher.final());
          return Buffer.concat(rs, rs[0].length + rs[1].length);
        } else {
          return cipher.update(d, inputEncoding, outputEncoding) + cipher.final(outputEncoding);
        }
      },
      
      /**
       *
       * @param data {string | NodeJS.ArrayBufferView}
       * @param key {string}
       * @param iv {string}
       * @param inputEncoding {HexBase64BinaryEncoding}
       * @param outputEncoding {"buffer" | "binary" | BufferEncoding}
       * @param decompression {boolean}
       * @returns {string | Buffer}
       */
      de({data, key, iv, inputEncoding = 'base64', outputEncoding = 'utf8', decompression = false}) {
        if (typeof data !== "string") {
          inputEncoding = undefined;
        }
        let keyBuffer = Buffer.alloc(16, 0x00);
        let ivBuffer = Buffer.alloc(16, 0x00);
        Buffer.from(key, 'ascii').copy(keyBuffer);
        Buffer.from(iv, 'ascii').copy(ivBuffer);
        let decipher = Crypto.createDecipheriv('aes-128-cbc', keyBuffer, ivBuffer);
        const rs = [];
        rs.push(decipher.update(data, inputEncoding));
        rs.push(decipher.final());
        let rb = Buffer.concat(rs, rs[0].length + rs[1].length);
        if (decompression) {
          rb = Compression.decompression(rb);
        }
        switch (outputEncoding) {
          case "buffer":
            return rb;
          case "binary":
            return Compression.buf2binString(rb);
          default:
            return Buffer.from(rb).toString(outputEncoding);
        }
      },
    }
  },
  hash: {
    /**
     *
     * @param {string | BinaryLike} data
     * @param {Utf8AsciiLatin1Encoding | undefined} inputEncoding
     * @param {'buffer' | HexBase64Latin1Encoding} encoding
     */
    sha512({data, inputEncoding, encoding = 'hex'}) {
      const hash = Crypto.createHash('sha512');
      hash.update(data, inputEncoding);
      return encoding === 'buffer' ? hash.digest() : hash.digest(encoding);
    }
  }
};
module.exports = Encrypt;
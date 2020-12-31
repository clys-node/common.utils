const zlib = require('zlib');
const Compression = {
  /**
   *
   * @param {NodeJS.ArrayBufferView} buf
   * @param {number} len
   * @return {string}
   */
  buf2binString(buf, len = buf.length) {
    if (len < 65534) {
      if (buf.subarray) {
        return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
      }
    }
    let result = '';
    for (let i = 0; i < len; i++) {
      result += String.fromCharCode(buf[i]);
    }
    return result;
  },
  /**
   *
   * @param {string} str
   * @return {Uint8Array}
   */
  binString2buf(str) {
    const buf = new Uint8Array(str.length);
    for (let i = 0, len = buf.length; i < len; i++) {
      buf[i] = str.charCodeAt(i);
    }
    return buf;
  },
  /**
   *
   * @param {InputType} data
   * @return {Buffer}
   */
  compression: (data) => zlib.deflateSync(data),
  /**
   *
   * @param {InputType} data
   * @return {Buffer}
   */
  decompression: (data) => zlib.inflateSync(data),
  /**
   *
   * @param {string} text
   * @return {string}
   */
  compressionString: (text) => Compression.buf2binString(zlib.deflateSync(text)),
  /**
   *
   * @param {string} binaryString
   * @param {BufferEncoding} encoding
   * @return {string}
   */
  decompressionString: (binaryString, encoding = 'utf8') =>
    Buffer.from(zlib.inflateSync(Compression.binString2buf(binaryString))).toString(encoding),
  /**
   *
   * @param {any} json
   * @return {string}
   */
  json: (json) => Compression.compressionString(JSON.stringify(json)),
  /**
   *
   * @param {string} binaryString
   * @return {any}
   */
  unJson: (binaryString) => JSON.parse(Compression.decompressionString(binaryString))
};
module.exports = Compression;
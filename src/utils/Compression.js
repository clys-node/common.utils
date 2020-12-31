const zlib = require('zlib');

const buf2binString = (buf, len = buf.length) => {
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
};


const binString2buf = function (str) {
  const buf = new Uint8Array(str.length);
  for (let i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


const CompressionBase = {
  buf2binString,
  binString2buf,
  compression: (data) => zlib.deflateSync(data),
  decompression: (data) => zlib.inflateSync(data),
  compressionString: (text) => buf2binString(zlib.deflateSync(text)),
  decompressionString: (binaryString, encoding = 'utf8') =>
    Buffer.from(zlib.inflateSync(binString2buf(binaryString))).toString(encoding),
  json: (json) => CompressionBase.compressionString(JSON.stringify(json)),
  unJson: (binaryString) => JSON.parse(CompressionBase.decompressionString(binaryString))
};
module.exports = CompressionBase;
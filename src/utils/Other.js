const Other = {
  getUUID(len, radix) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [];
    let i;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  },
  verCompared(oVer = '0.0.0', nVer = '0.0.0') {
    oVer = oVer.split('.');
    nVer = nVer.split('.');
    for (let i = 0; i < 3; i++) {
      let cnv = parseInt(nVer[i] || 0);
      let cov = parseInt(oVer[i] || 0);
      if (cnv > cov) {
        return true;
      } else if (cnv < cov) {
        break;
      }
    }
    return false;
  },
};
module.exports = Other;

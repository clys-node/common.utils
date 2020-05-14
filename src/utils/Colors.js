const Objs = require('./Objs');
const toHex = (s) => {
  return parseInt(s, 10).toString(16).replace(/^(.)$/, '0$1')
};
const Colors = {
  rgbToHex(r, g, b) {
    let rgb = '';
    if (Objs.isNull(g) || Objs.isNull(b)) {
      if ((/^rgb/).test(r.toLowerCase())) {
        r = r.replace(/[^\d,]/g, '').split(',');
        b = r[2];
        g = r[1];
        r = r[0];
        rgb = '#' + toHex(r) + toHex(g) + toHex(b);
      } else {
        rgb = '';
      }
    } else {
      rgb = '#' + toHex(r) + toHex(g) + toHex(b);
    }
    return rgb;
  },
  hexToRgb(hex) {
    hex = hex.replace(/[^0-9a-fA-F]/g, '');
    if (hex.length === 3) {
      hex = hex.replace(/(.)/g, '$1$1');
    }
    let r = parseInt(hex.substring(0, 2), 16),
      g = parseInt(hex.substring(2, 4), 16),
      b = parseInt(hex.substring(4, 6), 16);
    return {
      s: 'rgb(' + r + ', ' + g + ', ' + b + ')',
      m: {r: r, g: g, b: b}
    };
  }
};

module.exports = Colors;

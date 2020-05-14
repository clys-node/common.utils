const Strings = require('./Strings');

const Cookies = {
  get(name, cipher) {
    let arr, reg = new RegExp("(^| )" + encodeURIComponent(name) + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if (arr) {
      let val = decodeURIComponent(arr[2]);
      if (cipher) {
        let c = String.fromCharCode(val.charCodeAt(0) - val.length);
        for (let i = 1; i < val.length; i++) {
          c += String.fromCharCode(val.charCodeAt(i) - c.charCodeAt(i - 1));
        }
        val = c
      }
      return val;
    } else
      return null;
  },
  set(name, val, hours, path, cipher) {
    let _expires = '';
    if (typeof hours === 'number') {
      let expires = new Date();
      expires.setTime(expires.getTime() + hours * 3600000);
      _expires = ";expires=" + expires.toUTCString();
    }
    path = Strings.isNotBlank(path) ? ';path=' + path : '';

    if (cipher) {
      let c = String.fromCharCode(val.charCodeAt(0) + val.length);
      for (let i = 1; i < val.length; i++) {
        c += String.fromCharCode(val.charCodeAt(i) + val.charCodeAt(i - 1));
      }
      val = c;
    }
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(val) + _expires + path;
  }
};
module.exports = Cookies;

const Strings = require('./Strings');
const Maps = require('./Maps');
const Urls = {
  build(url, param) {
    let parStr = "";
    if (param) {
      const type = typeof param;
      if (type === "string") {
        parStr = param;
      } else if (type === "object") {
        parStr = this.mapToParamString(param);
      }
      parStr = (url.indexOf('?') === -1 ? "?" : "&") + parStr;

    }
    return (url + parStr).replace(/\/+/g, function (v, i, s) {
      if (i === 0) return '/';
      if (s[i - 1] === ':') return v;
      return '/';
    });
  },
  paramStringToMap(str) {
    if (Strings.isBlank(str) || str.indexOf('?') === -1) {
      return {};
    }
    let entrys = str.replace(/^[^?]*\?/, '').replace(/\+/g, ' ').split('&'), entry, map = {}, k, v;
    for (let i in entrys) {
      if (!entrys.hasOwnProperty(i)) continue;
      entry = entrys[i].split('=');
      k = decodeURIComponent(entry[0]);
      v = entry[1];
      v && (v = decodeURIComponent(v));
      map[k] = v;
    }
    return map;
  },
  mapToParamString(m) {
    if (Maps.isEmpty(m)) {
      return '';
    }
    let keys = Maps.keys(m), url = '';
    for (let i = 0, len = keys.length, key, val; i < len; i++) {
      key = keys[i];
      val = m[key];
      if (i !== 0) {
        url += '&';
      }
      url += encodeURIComponent(key);
      if (typeof val !== 'undefined') {
        url += '=' + encodeURIComponent(val);
      }
    }
    return url;
  }
};
module.exports = Urls;

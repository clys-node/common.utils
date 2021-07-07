const Objs = require('./Objs');
const Strings = require('./Strings');
const Maps = {
  isEmpty(m) {
    return Objs.isNull(m) || this.keys(m).length < 1;
  },
  isNotEmpty(m) {
    return !this.isEmpty(m);
  },
  keys(m) {
    let keys = [];
    for (let key in m) {
      if (m.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  },
  vals(m) {
    let l = [], keys = this.keys(m);
    for (let i = 0, len = keys.length; i < len; i++) {
      l.push(m[keys[i]])
    }
    return l;
  },

  mapsExtVal(maps, key) {
    let list = [];
    for (let i = 0, len = maps.length; i < len; i++) {
      list.push(maps[i][key]);
    }
    return list;
  },
  listToMaps(list, key) {
    if (Objs.isNull(list) || Strings.isEmpty(key)) {
      return null;
    }
    let map = {}, row;
    for (let i = 0, len = list.length; i < len; i++) {
      row = list[i];
      map[row[key]] = row;
    }
    return map;
  },
  isEqualForString(a, b) {
    return this.isEqual(a, b, null, true);
  },
  isEqual(a, b, isWeak, isString) {
    if (Objs.isNull(a) && Objs.isNull(b)) {
      return true;
    }
    if (Objs.isNull(a) || Objs.isNull(b)) {
      return false;
    }
    let aks = this.keys(a), bks = this.keys(b)
      , aksl = aks.length, bksl = bks.length;
    if (aksl !== bksl) {
      return false;
    }
    for (let i = 0; i < aksl; i++) {
      if (isWeak || isString ? '' + a[aks[i]] !== '' + b[aks[i]] : a[aks[i]] !== b[aks[i]]) {
        return false;
      }
    }
    return true;
  },
};
module.exports = Maps;

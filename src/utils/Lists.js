const Objs = require('./Objs');
const Maps = require('./Maps');

const Lists = {
  /**
   *
   * @param {Array} list
   * @returns {boolean}
   */
  isEmpty(list) {
    return Objs.isNull(list) || list.length < 1;
  },
  /**
   *
   * @param {Array} list
   * @returns {boolean}
   */
  isNotEmpty(list) {
    return !this.isEmpty(list);
  },
  /**
   *
   * @param {Array} whole
   * @param {Array} part
   * @returns {boolean}
   */
  includesAll(whole = [], part = []) {
    return part.every((v) => whole.includes(v));
  },
  /**
   *
   * @param {{}} maps
   * @param {String} keyName
   * @param {Function} sortFn
   */
  mapToList({map, keyName, sortFn}) {
    const list = [];
    if (typeof sortFn === "function") {
      let keys = Maps.keys(map);
      keys.sort((a, b) => sortFn(map[a], map[b], a, b));
      keys.forEach(k => {
        const v = map[k];
        if (keyName) {
          v[keyName] = k
        }
        list.push(v)
      })
      return list;
    }
    for (let k in map) {
      if (!map.hasOwnProperty(k)) continue
      const v = map[k];
      if (keyName) {
        v[keyName] = k
      }
      list.push(v)
    }
    return list
  }
};

module.exports = Lists;

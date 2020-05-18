const Objs = require('./Objs');

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
  }
};

module.exports = Lists;

const Objs = require('./Objs');

const Lists = {
  isEmpty(l) {
    return Objs.isNull(l) || l.length < 1;
  },
  isNotEmpty(l) {
    return !this.isEmpty(l);
  }
};

module.exports = Lists;

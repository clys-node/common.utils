const Objs = {
  isNull(obj) {
    return typeof obj === "undefined" || obj === null;
  },
  isNotNull(obj) {
    return !this.isNull(obj);
  },
  isObject(obj) {
    return this.isNotNull(obj) && obj.constructor === Object;
  },
  isArray(obj) {
    return this.isNotNull(obj) && obj.constructor === Array;
  },
  getPathVal(obj, path) {
    if (typeof path === "string") {
      path = path.split(/\?\.|[.\/>]/);
    }
    for (let i = 0, len = path.length; i < len; i++) {
      try {
        obj = obj[path[i]];
      } catch (e) {
        return null;
      }
      if (this.isNull(obj)) {
        return obj;
      }
    }
    return obj;
  },
  forEach(obj, fn) {
    if (this.isNull(obj)) return;
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      const res = fn(obj[key], key);
      if (res === false) break;
    }
  },
  merge(target, source, mergeArray = false) {
    for (let key in source) {
      if (!source.hasOwnProperty(key)) continue;
      let item = source[key];
      if (typeof item === "undefined") continue;
      if (this.isObject(target[key])) {
        if (!item['_COVER_']) {
          this .merge(target[key], item, mergeArray);
        } else {
          target[key] = {...item};
          delete target[key]['_COVER_'];
        }
      } else if (mergeArray && this.isArray(target[key])) {
        if (item[0] !== '_COVER_') {
          this.merge(target[key], item, mergeArray);
        } else {
          target[key] = [...item];
          target[key].shift();
        }
      } else {
        target[key] = item;
      }
    }
    return target
  }
};
module.exports = Objs;

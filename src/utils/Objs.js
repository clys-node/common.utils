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
    for (const key in source) {
      if (!source.hasOwnProperty(key)) continue;
      const sourceItem = source[key];

      if (typeof sourceItem === "undefined") continue;

      if (sourceItem === null) {
        target[key] = null;
        continue;
      }


      if (this.isObject(sourceItem) && this.isObject(target[key])) {
        if (!sourceItem['_COVER_']) {
          this.merge(target[key], sourceItem, mergeArray);
        } else {
          target[key] = {...sourceItem};
          delete target[key]['_COVER_'];
        }
        continue;
      }

      if (mergeArray && this.isArray(sourceItem) && this.isArray(target[key])) {
        if (sourceItem[0] !== '_COVER_') {
          this.merge(target[key], sourceItem, mergeArray);
        } else {
          target[key] = [...sourceItem];
          target[key].shift();
        }
        continue;
      }

      target[key] = sourceItem;

    }
    return target
  }
};
module.exports = Objs;

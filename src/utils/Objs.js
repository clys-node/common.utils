const toJson = function ({obj, depth = 0, ignoreEmpty = true, otherTypeToString = false, superiors = []}) {
  if (depth > 99) {
    console.warn('tooDeep');
    return undefined;
  }
  const type = typeof obj;
  if (type === "object") {
    if (obj === null) return obj;
    if (superiors.includes(obj)) return undefined;
    depth++;
    const p = {depth, ignoreEmpty, otherTypeToString, superiors: [...superiors, obj]}
    if (obj instanceof Array) {
      const res = [];
      for (let i = 0; i < obj.length; i++) {
        let v = toJson({...p, obj: obj[i]});
        if (!ignoreEmpty || Objs.isNotNull(v)) res.push(v);
      }
      return res;
    } else {
      const res = {};
      for (let objKey in obj) {
        if (!obj.hasOwnProperty(objKey)) continue;
        let v = toJson({...p, obj: obj[objKey]});
        if (!ignoreEmpty || Objs.isNotNull(v)) res[objKey] = v;
      }
      return res;
    }
  } else if (type === "string" || type === "number" || type === "boolean" || type === "undefined") {
    return obj;
  } else {
    return otherTypeToString ? String(obj) : undefined;
  }
};
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
  /**
   *
   * @param {[]} heaps
   * @param {{mergeArray:boolean=false}} options
   */
  converge(heaps, options = {}) {
    if (!(heaps instanceof Array)) return;
    const singularPoint = heaps[0];
    if (heaps.length === 1) return singularPoint;
    for (let i = 1; i < heaps.length; i++) {
      Objs.merge(singularPoint, heaps[i], options.mergeArray);
    }
    return singularPoint;
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
      
      if (sourceItem.constructor === Object) {
        if (sourceItem['_COVER_'] || !this.isObject(target[key])) {
          target[key] = {};
        }
        this.merge(target[key], sourceItem, mergeArray);
        delete target[key]['_COVER_'];
        continue;
      }
      
      if (sourceItem.constructor === Array) {
        const cover = sourceItem[0] === '_COVER_';
        if (cover || !this.isArray(target[key])) {
          target[key] = [];
        }
        this.merge(target[key], sourceItem, mergeArray);
        if (cover) {
          target[key].shift();
        }
        continue;
      }
      
      target[key] = sourceItem;
      
    }
    return target
  },
  toJson({obj, ignoreEmpty, otherTypeToString}) {
    if (typeof obj === "string") return JSON.parse(obj);
    if (typeof obj !== "object") return null;
    return toJson(arguments[0]);
  }
};
module.exports = Objs;
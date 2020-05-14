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
  getPathVal(obj, path) {
    if (typeof path === "string") {
      path = path.split(/[.\/>]/);
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
  merge(t, s, mergeArray = false) {
    for (let k in s) {
      if (!s.hasOwnProperty(k) || typeof s[k] === "undefined" || s[k] === null) continue;
      let item = s[k];
      switch (item.constructor) {
        case Object: {
          if (t[k] && t[k].constructor === Object) {
            this.merge(t[k], item, mergeArray);
          } else {
            t[k] = item;
          }
          break;
        }
        case Array: {
          if (item.length < 1) {
            break;
          }
          if (mergeArray && t[k] && t[k].constructor === Array) {
            for (let i = 0, len = Math.max(t[k].length, item.length); i < len; i++) {
              let mt = t[k][i];
              let it = item[i];
              if (this.isObject(mt) && this.isObject(it)) {
                this.merge(mt, it, mergeArray);
              } else if (this.isNotNull(it)) {
                t[k][i] = it;
              }
            }
          } else {
            t[k] = item;
          }
          break;
        }
        case String: {
          if (item.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "").length > 0) {
            t[k] = item;
          }
          break;
        }
        default: {
          t[k] = item;
        }
      }
    }
    return t
  }
};
module.exports = Objs;

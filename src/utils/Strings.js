const Objs = require('./Objs');
const Maps = require('./Maps');
const Strings = {
  trim(str) {
    return Objs.isNull(str) ? '' : String(str).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
  },
  isBlank(str) {
    return Objs.isNull(str) || this.trim(str).length === 0;
  },
  isNotBlank(str) {
    return !this.isBlank(str);
  },
  isEmpty(str) {
    return Objs.isNull(str) || ("" + str).length === 0;
  },
  isNotEmpty(str) {
    return !this.isEmpty(str)
  },
  equalsIgnoreCase(a, b) {
    if (Objs.isNull(a) || Objs.isNull(b)) {
      return false;
    }
    return ('' + a).toLowerCase() === ('' + b).toLowerCase();
  },
  buildTpl(tpl, data) {
    let re = /{%=?((?!%}).|\r|\n)*%}/g,
      code = "let r = [];",
      cursor = 0,
      match;

    const add = (str, mode) => {
      if (this.isEmpty(str)) {
        return add;
      }

      if (mode === 1) {
        code += `${str}\n`;
      } else if (mode === 2) {
        code += `r.push(${str});\n`
      } else {
        let _s = str.replace(/'/g, "\\'").replace(/\s*([\r\n])\s*/g, ' ');
        if (this.isNotBlank(_s)) {
          code += `r.push('${_s}');\n`
        }
      }
      return add;
    };

    while ((match = re.exec(tpl))) {
      add(tpl.slice(cursor, match.index))(match[0].replace(/(^{%=|^{%|%}$)/g, ""), /^[\t| ]*{%=/g.test(match[0]) ? 2 : 1);
      cursor = match.index + match[0].length;
    }
    add(tpl.substr(cursor));
    code += 'return r.join("");';
    let runFn = function (d) {
      return (new Function(Maps.keys(d).join(","), code)).apply(null, Maps.vals(d))
    };
    if (Objs.isNotNull(data)) {
      return runFn(data);
    } else {
      return runFn;
    }
  },
  verifyRules({text, objs, rulesKey = 'rules'} = {}) {
    if (Maps.isEmpty(objs)) return true;
    for (const k in objs) {
      if (!objs.hasOwnProperty(k)) continue;
      if (this.verifyRule({text, rules: objs[k][rulesKey]})) {
        return objs[k];
      }
    }
    return false;
  },
  verifyRule({text, rules} = {}) {
    if (Objs.isNull(rules)) return true;
    if (rules instanceof RegExp) {
      return rules.test(text);
    } else if (typeof rules === "string") {
      return (new RegExp(rules, 'i')).test(text);
    } else if (typeof rules === "function") {
      return rules(text);
    } else if (rules instanceof Array) {
      for (const rk in rules) {
        if (!rules.hasOwnProperty(rk)) continue;
        if (this.verifyRule({text, rules: rules[rk]})) {
          return true;
        }
      }
    }

    return false;
  }
};
module.exports = Strings;

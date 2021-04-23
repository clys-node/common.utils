const Objs = require('./Objs');

const Documents = {
  classStyle({className, style, val}) {
    const cssRules = document.all ? 'rules' : 'cssRules';
    const isReg = className.constructor === RegExp
    let t;
    let d;
    for (let i = 0, len = document.styleSheets.length; i < len; i++) {
      for (let k = 0, size = document.styleSheets[i][cssRules] ? document.styleSheets[i][cssRules].length : 0; k < size; k++) {
        d = document.styleSheets[i]['rules'][k];
        t = d.selectorText;
        if (isReg && className.test(t) || t === className) {
          return Objs.isNull(style) ? d : (Objs.isNull(val) ? d.style[style] : d.style[style] = val);
        }
      }
    }
    return null;
  },
  classAdd({styleEle, selector, rules, index}) {
    if (!styleEle || styleEle.constructor !== HTMLStyleElement) {
      styleEle = document.createElement('style');
      styleEle.setAttribute('type', 'text/css');
      (document.head || document.getElementsByTagName('head')[0]).appendChild(styleEle);
    }
    let sheet = styleEle.sheet || styleEle.styleSheet;
    index = Objs.isNull(index) ? (sheet.rules || sheet.cssRules).length : index;
    if (sheet.insertRule) {
      sheet.insertRule(selector + "{" + rules + "}", index);
    } else {
      sheet.addRule(selector, rules, index);
    }
    return styleEle;
  }
};
module.exports = Documents;

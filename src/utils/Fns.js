const Fns = {
  getParameterNames(fn, depth = false) {
    let code = fn.toString();
    if (fn.name && String(fn.name).length > 0) {
      code = code.replace(new RegExp(String(fn.name).replace(/([()\[\]{}])/g, '\\$1')), '');
    }
    code = code
      .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
      .replace(/=>.*$/mg, ' ');

    let param = code.slice(code.indexOf('(') + 1, code.indexOf(')')).replace(/\s/g, '');
    if (!param || param.length < 1) return [];
    param = param.replace(/=('.*?'|".*?"|`.*?`|{.*?}|\[.*?])/g, '').replace(/=[^,}]+/g, '');

    if (depth) {
      const ps = param.replace(/(?<={[^}]*),(?=[^{]*})/g, () => '<oxo>').split(",");
      const res = [];
      for (let i = 0, len = ps.length; i < len; i++) {
        let pss = ps[i];
        if (pss.indexOf('{') !== -1) {
          pss = pss.replace(/[{}]/g, '');
          if (pss.length < 1) {
            res.push([]);
          } else {
            res.push(pss.split('<oxo>'))
          }
        } else {
          res.push(pss)
        }
      }
      return res;
    } else {
      while ((/{[^{}]*}/).test(param)) {
        param = param.replace(/{[^{}]*}/, '_-_-_obj_-_-_')
      }
      let objSize = 0;
      param = param.replace(/_-_-_obj_-_-_/g, () => 'objArg' + objSize++);
      let matchRes = param.match(/([^\s,]+)/g);

      return matchRes === null
        ? []
        : matchRes;
    }

  }

};
module.exports = Fns;

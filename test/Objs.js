const Objs = require('../src/utils/Objs');

const Test = {
  toJsonFreeze() {
    console.log('toJsonFreeze');
    const _r = (freeze = false) => {
      const x = Objs.toJson({obj: {a: {aa: 1, ab: 2}, b: [{aa: 1, ab: 2}, 1, 2]}, freeze});
      console.dir(JSON.parse(JSON.stringify(x)));
      x.a.aa = 999;
      console.dir(JSON.parse(JSON.stringify(x)));
      x.a = 999;
      console.dir(JSON.parse(JSON.stringify(x)));
      x.b[0].aa = 999;
      console.dir(JSON.parse(JSON.stringify(x)));
      x.b[0] = 999;
      console.dir(JSON.parse(JSON.stringify(x)));
      x.b[1] = 999;
      console.dir(JSON.parse(JSON.stringify(x)));
      x.b = 999;
      console.dir(JSON.parse(JSON.stringify(x)));
      delete x.a;
      console.dir(JSON.parse(JSON.stringify(x)));
      delete x.b;
      console.dir(JSON.parse(JSON.stringify(x)));
    }
    console.log('freeze:false');
    _r();
    console.log('freeze:true');
    _r(true);
  }
}

Test.toJsonFreeze();
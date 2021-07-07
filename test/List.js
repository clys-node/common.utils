const Lists = require('../src/utils/Lists');

const Test = {
  mapToList() {
    const a = {
      a: 1,
      b: 2,
      c: 3,
      d: 5,
    }
    console.log(Lists.mapToList({map: a}))
    console.log(Lists.mapToList({map: a, sortFn: (v1, v2) => v2 - v1}))
    const b = {
      a: {a: 1},
      b: {a: 2},
      c: {a: 3},
      d: {a: 5},
    }
    console.log(Lists.mapToList({map: b}))
    console.log(Lists.mapToList({map: b, keyName: 'b', sortFn: (v1, v2) => v2.a - v1.a}))

  }
}

Test.mapToList();
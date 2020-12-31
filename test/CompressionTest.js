const Compression = require('../src/utils/Compression');

const text = 'https://www.bilibili.com/video/BV1CE411y7G7 https://space.bilibili.com/72270557/video?tid=0&page=2&keyword=&order=pubdate';
console.log(text.length, text);

const tc = Compression.compressionString(text);
const td = Compression.decompressionString(tc);
console.log(tc.length, tc);
console.log(td.length, td);
console.log(text === td);

console.log();

const json = {require: text};
console.log(json);
const jc = Compression.json(json);
const jd = Compression.unJson(jc);
console.log(jc.length, jc);
console.log(jd);
console.log(JSON.stringify(json) === JSON.stringify(jd));
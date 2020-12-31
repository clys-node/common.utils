const Encrypt = require('../src/utils/Encrypt');
const text = '文档 版本发布 博客 应用 治理 社区 搜索 中文 Black Lives Matter. Support the Equal Justice Initiative and read our statement here. Electron 文档 Docs / API Structures / ProtocolResponse Object electron@master (107859) ProtocolResponse Object error Integer（可选的） - 如果赋值，request将会失败，并返回error错误码。 更多的错误号信息，您可以查阅网络错误列表. statusCode Number （可选的） - HTTP响应码，默认是200。 charset String (可选) - 响应体的字符集, 默认值为 "utf-8". mimeType String (optional) - The MIME type of response body, default is "text/html". Setting mimeType would implicitly set the content-type header in response, but if content-type is already set in headers, the mimeType would be ignored. headers Record<string, string | string[]> (optional) - An object containing the response headers. The keys must be String, and values must be either String or Array of String. data (Buffer | String | ReadableStream) (optional) - The response body. When returning stream as response, this is a Node.js readable stream representing the response body. When returning Buffer as response, this is a Buffer. When returning String as response, this is a String. This is ignored for other types of responses. path String (optional) - Path to the file which would be sent as response body. This is only used for file responses. url String (optional) - Download the url and pipe the result as response body. This is only used for URL responses. referrer String (optional) - The referrer URL. This is only used for file and URL responses. method String (optional) - The HTTP method. This is only used for file and URL responses. session Session (optional) - The session used for requesting URL, by default the HTTP request will reuse the current session. Setting session to null would use a random independent session. This is only used for URL responses. uploadData ProtocolResponseUploadData (optional) - The data used as upload data. This is only used for URL responses when method is "POST". 改进此文档  翻译此文档  版本历史 Electron 文档 版本发布 博客 应用 治理 社区 行为准则 许可 安全 捐赠者 语言 联系我们 OpenJS Foundation Copyright OpenJS Foundation and Electron contributors. All rights reserved. The OpenJS Foundation has registered trademarks and uses trademarks. For a list of trademarks of the OpenJS Foundation, please see our Trademark Policy and Trademark List. Trademarks and logos not indicated on the list of OpenJS Foundation trademarks are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them. The OpenJS Foundation | Terms of Use | Privacy Policy | OpenJS Foundation Bylaws | Trademark Policy | Trademark List | Cookie Policy';

const ec = Encrypt.aes128.cbc.en({
  data: text, key: 'kl;xckl;kaskcakskpkpoxkokpoas', iv: 'asdasdaq', outputEncoding: 'buffer', compression: true
});
const dt = Encrypt.aes128.cbc.de({
  data: ec, key: 'kl;xckl;kaskcakskpkpoxkokpoas', iv: 'asdasdaq', decompression: true
});
console.log('text', text.length);
console.log('ec', ec.length);
console.log('dt', dt.length);
console.log(text === dt);

const txt = 'Assigned expression type Buffer is not assignable to type number';
const e = Encrypt.enAES128CBC(txt, 'kl;xckl;kaskcakskpkpoxkokpoas', 'asdasdaq');
const t = Encrypt.deAES128CBC(e, 'kl;xckl;kaskcakskpkpoxkokpoas', 'asdasdaq');
console.log();
console.log('e', e);
console.log('t', t);
console.log(txt === t);


const sha512 = Encrypt.hash.sha512({data: txt})
console.log();
console.log(sha512);
console.log(sha512 === 'b9829d8a6f778776f25adab67c1273052275ef16d3310b4a35b296c453bf100656498d2b59f727b49e62bbafdbaf66663b34425d69502c7678eac464152cb0cb');
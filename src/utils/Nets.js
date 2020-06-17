const http = require('http');
const https = require('https');
const querystring = require('querystring');

const Urls = require('./Urls');

const urlFullOptions = (url, options = {}) => {
  const _url = new URL(url);
  options.protocol = _url.protocol;
  options.hostname = _url.hostname;
  options.port = _url.port;
  options.path = _url.pathname + _url.search;

  return options;
};

const Nets = {
  json({url, data = {}, options = {}, head = {}, decoder, decoderStr, ons, rj}) {
    head = {
      ...head,
      'Content-Type': 'text/plain;charset=UTF-8'
    };
    return Nets.send({
      sendBefore: (request) => {
        request.write(JSON.stringify(data));
      }, url, method: "POST", options, head, decoder, decoderStr, ons, rj
    })
  },
  form({url, data = {}, options = {}, head = {}, decoder, decoderStr, ons, rj}) {
    let postFormData = querystring.stringify(data);
    head = {
      ...head,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postFormData)
    };

    return Nets.send({
      sendBefore: (request) => {
        request.write(postFormData);
      }, url, method: "POST", options, head, decoder, decoderStr, ons, rj
    })

  },
  get({url, data = {}, options = {}, head = {}, decoder, decoderStr, ons, rj}) {
    url = Urls.build(url, data);
    return Nets.send({url, method: 'GET', options, head, decoder, decoderStr, ons, rj})
  },
  async downToStream({url, writeStream, onData, ons = []}) {
    try {
      let length = 0;
      ons = [{
        key: 'response', fn: (res) => {
          length = (res.headers || {})['content-length'] || 0
        }
      }, ...ons]
      await this.get({
        url,
        data: {
          _v: (new Date()).getTime()
        },
        options: {
          timeout: undefined
        },
        decoder: (chunk) => {
          writeStream.write(chunk)
          onData && onData({chunk, length})
          return null;
        },
        ons
      })
      writeStream.end();
    } catch (e) {
      writeStream.destroy(e);
    }
  },
  send({url, method = 'GET', sendBefore, options = {}, head = {}, decoder, decoderStr, ons, rj = false}) {
    return new Promise((resolve, reject) => {
      method = method.toLocaleUpperCase();
      let opt = {
        timeout: 30,
        method,
        ...options
      };
      opt = urlFullOptions(url, opt);

      const request = opt.protocol === 'https:' ? https.request(opt) : http.request(opt);

      for (let k in head) {
        if (!head.hasOwnProperty(k)) continue;
        request.setHeader(k, head[k])
      }
      if (ons) for (let onsKey in ons) {
        if (!ons.hasOwnProperty(onsKey)) continue;
        request.on(ons[onsKey].key, ons[onsKey].fn)
      }
      request.on('response', (response) => {
        let res = "";
        response.on('data', (chunk) => {
          if (decoder) {
            res = decoder(chunk);
          } else if (decoderStr) {
            res += decoderStr(chunk);
          } else {
            res += chunk.toString()
          }
        });
        response.on('end', () => {
          if (rj) {
            try {
              const json = JSON.parse(res);
              if (!json || json.status !== 200) {
                reject(json);
                return;
              }
              resolve(json);
            } catch (e) {
              reject(e)
            }
          } else {
            resolve(res)
          }
        })
      });
      request.on('error', (err) => {
        reject(err);
      });
      if (sendBefore) sendBefore(request);
      request.end()
    })

  }
};
module.exports = Nets;

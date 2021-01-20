const dns = require("dns").promises;
const dns_ = ;
const dnsErrors = {};
for (const k in require('dns')) { if (/^[A-Z]+$/.test(k)) { dnsErrors[dns_[k]] = k; } }

module.exports = (function () {
  const my = new require('express').Router();
  
  my.get('/', (req, res) => {
    res.send('<meta name="viewport" content="width=device-width,initial-scale=1"><title>what is my</title><a href="./my">help</a><br><a href="./my/h">headers</a><br><a href="./my/ip">ip</a><br><a href="./my/ua">user agent</a><br><a href="/ua">domain</a><br><a href="https://glitch.com/edit/#!/wim">source</a>');
  });

  const getUserAgent = (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send(req.headers['user-agent']);
  };

  my.get('/ua', getUserAgent);
  my.get('/useragent', getUserAgent);

  const getIP = (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send(req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'].match(/[^,]+/)[0]);
  };

  my.get('/ip', getIP);
  my.get('/ipaddress', getIP);

  const getHeaders = (req, res) => {
    res.setHeader('content-type', 'text/plain');
    let s = '';
    for (const k in req.headers) {
      s += `${k}=${req.headers[k]}\n`;
    }
    res.send(s);
  };

  my.get('/h', getHeaders);
  my.get('/headers', getHeaders);
  
  const getDomain = async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'].match(/[^,]+/)[0];
    try {
      const servers = await dns.reverse(ip);
      res.send(servers.join('\n'));
    } catch (e) {
      res.status(404).send('error: ' + dnsErrors[e.code]);
    }
  }
  my.get('/d', getDomain);
  my.get('/domain', getDomain);
  
  return my;
})();

module.exports = function (app) {
  app.get('/my', (req, res) => {
    res.send('<meta name="viewport" content="width=device-width,initial-scale=1"><title>what is my</title><a href="/my">help</a><br><a href="/my/h">headers</a><br><a href="/my/ip">ip</a><br><a href="/my/ua">user agent</a><br><a href="https://glitch.com/edit/#!/wim">source</a>');
  });

  const getUserAgent = (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send(req.headers['user-agent']);
  };

  app.get('/my/ua', getUserAgent);
  app.get('/my/useragent', getUserAgent);
  app.get('/myua', getUserAgent);
  app.get('/myuseragent', getUserAgent);

  const getIP = (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send(req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'].match(/[^,]+/)[0]);
  };

  app.get('/my/ip', getIP);
  app.get('/my/ipaddress', getIP);
  app.get('/myip', getIP);
  app.get('/myipaddress', getIP);

  const getHeaders = (req, res) => {
    res.setHeader('content-type', 'text/plain');
    let s = '';
    for (const k in req.headers) {
      s += `${k}=${req.headers[k]}\n`;
    }
    res.send(s);
  };

  app.get('/my/h', getHeaders);
  app.get('/my/headers', getHeaders);
  app.get('/myh', getHeaders);
  app.get('/myheaders', getHeaders);
}

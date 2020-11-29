const app = require("express")();

app.get('/', (req, res) => {
  res.send('<meta name="viewport" content="width=device-width,initial-scale=1"><title>wtmoo is</title><a href="/">help</a><br><a href="https://glitch.com/edit/#!/wtmoo">source</a>');
});

app.get('/wtmoo', (req, res) => {
  res.send();
});

const getUserAgent = (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send(req.headers['user-agent']);
};

app.get('/my/ua', getUserAgent);
app.get('/my/useragent', getUserAgent);

const getIP = (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send(req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'].match(/[^,]+/)[0]);
};

app.get('/my/ip', getIP);
app.get('/my/ipaddress', getIP);

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

app.use((req, res, next) => {
  let a = decodeURI(req.originalUrl.slice(1));
});

app.listen(process.env.PORT);

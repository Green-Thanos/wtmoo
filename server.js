const fs = require('fs').promises,
  fetch = require('node-fetch');


const app = require('express')();

// TODO: this should return promise returning [data, cached]
function cache(url, path, age) {
  path = './data/' + path;
}

const minutes = n => n * 60000,
  hours = n => n * 3600000,
  days = n => n * 86400000;

app.get('/', (req, res) => {
  res.send('<meta name="viewport" content="width=device-width,initial-scale=1"><title>wtmoo is</title><a href="/">help</a><br><a href="https://glitch.com/edit/#!/wtmoo">source</a>');
});

app.get('/shit', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send('💩');
});

app.get('/wtmoo', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send('idk');
});

app.get('/tld', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  fetch('https://data.iana.org/TLD/tlds-alpha-by-domain.txt')
    .then(res => res.text())
    .then(body => res.send(body.slice(body.indexOf('\n') + 1).toLowerCase()));
});

app.get('/my', (req, res) => {
  res.send('<meta name="viewport" content="width=device-width,initial-scale=1"><title>what is my</title><a href="/">help</a><br><a href="/h">headers</a><br><a href="/ip">ip</a><br><a href="/ua">user agent</a><br><a href="https://glitch.com/edit/#!/wim">source</a>');
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

function lex(s) {
  return s.match(/(?:[\d_]+(?:\.[\d_]+)?)|[-+*/^()]/g).map(m => /\d/.test(m) ? +m : m);
}

function tighterThanOrEq(op, cmp) {
  let res;
  switch (op) {
    case '+': case '-': res = '+-*/^'.includes(cmp); break;
    case '*': case '/': res = '*/^'.includes(cmp); break;
    case '^': res = cmp === '^'; break;
  }
  return res;
}

function applyOp(stack, op) {
  const r = stack.pop(),
    l = stack.pop();
  let res;
  switch (op) {
    case '+': res = l + r; break;
    case '-': res = l - r; break;
    case '*': res = l * r; break;
    case '/': res = l / r; break;
    case '^': res = l ** r; break;
  }
  stack.push(res);
}

function evaluate(l, i=0) {
  const stack = [];
  const ops = [];
  let expectNumber = true;
  let negateNext = false;
  for (; i < l.length; i++) {
    const tok = l[i];
    if (expectNumber) {
      if (typeof tok === 'number') {
        stack.push(negateNext ? -tok : tok);
        expectNumber = false;
        negateNext = false;
      } else if (tok === '-') {
        negateNext = !negateNext;
      } else if (tok === '(') {
        let result = evaluate(l, ++i);
        if (typeof result === 'undefined') { return; }
        i = result[1];
        stack.push(result[0]);
      } else {
        return; // invalid.
      }
    } else {
      if (tok === ')') {
        break;
      } else if (typeof tok === 'number') {
        return; // invalid.
      } else {
        while (ops.length > 0 && tighterThanOrEq(tok, ops[ops.length - 1])) {
          applyOp(stack, ops.pop());
        }
        ops.push(tok);
        expectNumber = true;
      }
    }
  }
  while (stack.length > 1) { applyOp(stack, ops.pop()); }
  return [stack[0], ++i];
}

function isValidCalc(s) {
  return /^\s*(?:[\d_]+(?:\.[\d_]+)?)(?:(?:\s*[-+*/^()])+\s*(?:[\d_]+(?:\.[\d_]+)?))*[\s)]*$/.test(s);
}

function haskell(req, res) {
  res.redirect('https://www.haskell.org/');
}
app.get('/hs', haskell); app.get('/haskell', haskell);
const redirects = [
  [['hs', 'haskell'], 'https://www.haskell.org/'],
  [['node', 'nodejs', 'node.js'], 'https://nodejs.org/'],
];
const redirectd = {};
for (const [aliases, url] of redirects) { for (const alias of aliases) { redirectd[alias] = url; } }

app.use((req, res, next) => {
  const url = req.originalUrl.slice(1);
  if ()
  let str = decodeURIComponent(url);
  console.log(str);
  if (isValidCalc(str)) {
    const result = evaluate(lex(str));
    if (typeof result !== 'undefined') { res.send(result[0].toString()); return; }
  }
  next();
});

app.listen(process.env.PORT);

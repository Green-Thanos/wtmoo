const fs = require('fs').promises,
  fsConst = require('fs').constants,
  fetch = require('node-fetch');


const app = require('express')();

const minutes = n => n * 60000,
  hours = n => n * 3600000,
  days = n => n * 86400000;

fs.access('./data/', fsConst.R_OK | fsConst.W_OK)
  .catch(() => fs.mkdir('./data/'));

async function cache(url, path, age = days(1)) {
  path = './data/' + path;
  try {
    await fs.access(path, fsConst.R_OK | fsConst.W_OK);
    const file = await fs.open(path, 'a+');
    const stat = await file.stat();
    if (new Date() - stat.mtimeMs > age) {
      const res = await fetch(url);
      const body = await res.text();
      await file.writeFile(body);
      await file.close();
      return body;
    } else {
      const res = await file.readFile('utf8');
      await file.close();
      return res;
    }
  } catch {
    const res = await fetch(url);
    const body = await res.text();
    const file = await fs.open(path, 'w+');
    await file.writeFile(body);
    await file.close();
    return body;
  }
}

app.get('/', (req, res) => {
  res.send('<meta name="viewport" content="width=device-width,initial-scale=1"><title>wtmoo is</title><a href="/">help</a><br><a href="https://glitch.com/edit/#!/wtmoo">source</a>');
});

app.get('/shit', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send('💩');
});

app.get('/pankek', (req, res) => {
  res.setHeader('content-type','text/plain');
  res.send('lang developer of 0 languages');
});

app.get('/wtmoo', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send('idk');
});

app.get('/tld', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  cache('https://data.iana.org/TLD/tlds-alpha-by-domain.txt', 'tlds', days(1))
    .then(body => res.send(body.slice(body.indexOf('\n') + 1).toLowerCase()));
});

app.get('/tld/for/:domain', async (req, res) => {
  res.setHeader('content-type', 'text/plain');
  const tldsRaw = await cache('https://data.iana.org/TLD/tlds-alpha-by-domain.txt', 'tlds', days(1));
  const tlds = tldsRaw.toLowerCase().split('\n').slice(1, -1);
  const ret = [];
  for (let extras = 0; extras < 3; extras++) {
    const slice = req.params.domain.slice(0, req.params.domain.length - extras);
    for (const tld of tlds) {
      if (slice.endsWith(tld)) {
        console.log(slice, tld);
        ret.push(req.params.domain.replace(new RegExp(tld), '.$&/').replace(/\/$/, ''));
      }
    }
  }
  res.send(ret.join("\n"));
});

app.get('/my', (req, res) => {
  res.send('<meta name="viewport" content="width=device-width,initial-scale=1"><title>what is my</title><a href="/my">help</a><br><a href="/my/h">headers</a><br><a href="/my/ip">ip</a><br><a href="/my/ua">user agent</a><br><a href="https://glitch.com/edit/#!/wim">source</a>');
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

const redirects = [
  [['hs', 'haskell'], 'https://www.haskell.org/'],
  [['node', 'nodejs', 'node.js'], 'https://nodejs.org/'],
  [['go', 'golang'], 'https://golang.org/'],
  [['js', 'javascript'], 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
  [['c++', 'cpp'], 'https://www.cppreference.com/'],
];
const redirectd = {};
for (const [aliases, url] of redirects) { for (const alias of aliases) { redirectd[alias] = url; } }

app.use((req, res, next) => {
  const url = decodeURIComponent(req.originalUrl.slice(1));
  console.log(url);
  if (url in redirectd) { res.redirect(redirectd[url]); return; }
  if (isValidCalc(url)) {
    const result = evaluate(lex(url));
    if (typeof result !== 'undefined') { res.send(result[0].toString()); return; }
  }
  next();
});

app.listen(process.env.PORT);

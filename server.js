const app = require("express")();

app.get('/', (req, res) => {
  res.send('<meta name="viewport" content="width=device-width,initial-scale=1"><title>wtmoo is</title><a href="/">help</a><br><a href="https://glitch.com/edit/#!/wtmoo">source</a>');
});

app.get('/shit', (req, res) => {
  res.send('💩');
});

app.get('/wtmoo', (req, res) => {
  res.send('idk');
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
  return s.match(/(?:[\d_]+(?:\.[\d_]+)?)|[-+*/()]/g).map(m => /\d/.test(m) ? +m : m);
}

function tighterThan(op, cmp) {
  let res;
  switch (op) {
    case '+': res = '*/^'.includes(cmp); break;
    case '-': res = '*/^'.includes(cmp); break;
    case '*': res = cmp === '^'; break;
    case '/': res = cmp === '^'; break;
    case '^': res = false; break;
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
        while (ops.length > 0 && tighterThan(tok, ops[ops.length - 1])) {
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

app.use((req, res, next) => {
  let str = decodeURIComponent(req.originalUrl.slice(1));
  console.log(req.originalUrl, req.originalUrl.slice(1), str, isValidCalc(str));
  if (isValidCalc(str)) {
    const result = evaluate(lex(str));
    console.log(result);
    if (typeof result !== 'undefined') { res.send(result[0]); }
  }
});

app.listen(process.env.PORT);

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

const $ = new Proxy({}, { get: (o, k) => Symbol.for(k) });

function lex(s) {
  return s.match(/(?:[\d_]+(?:\.[\d_]+)?)|[-+*/()]/g).map(m => /\d/.test(m) ? +m : m);
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
        let result = stack.push(evaluate(l, i));
        if (!result) { return; }
        let num; [num, i] = result;
        stack.push(num);
      }
    } else {
      if (tok === ')') {
        while (stack.length > 1) {
          applyOp(stack, ops.pop());
        }
        return [stack[0], ++i];
      }
    }
  }
}

function isValidCalc(s) {
  return /^\s*(?:[\d_]+(?:\.[\d_]+)?)(?:(?:\s*[-+*/()])+\s*(?:[\d_]+(?:\.[\d_]+)?))*\s*$/.test(s);
}

app.use((req, res, next) => {
  let str = decodeURI(req.originalUrl.slice(1));
  if (isValidCalc(str)) {
    const result = evaluate(lex(str));
    if (result) { res.send(result[0]); }
  }
});

app.listen(process.env.PORT);

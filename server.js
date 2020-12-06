function lazy(name, fn) {
  Object.defineProperty(global, name, { get: () => { const val = fn(); Object.defineProperty(global, name, val); return val} });
}

const fs = require('fs').promises,
  fsConst = require('fs').constants,
  resolve = require('path').resolve,
  fetch = require('node-fetch'),
  cookieParser = require('cookie-parser');
/* global calc */
lazy('calc', () => require('mathjs').evaluate);

// TODO: dark theme
const app = require('express')();
app.use(cookieParser());
app.use('/ace', require('express').static('ace'));
app.use('/images', require('express').static('images'));

function redirect(endpoint, url) {
  app.get(endpoint, (req, res) => {
    res.redirect(url);
  });
}

function sendText(endpoint, text) {
  app.get(endpoint, (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send(text);
  });
}

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

app.get('/ask', (req, res) => {
  res.redirect('https://dontasktoask.com/');
});

app.get('/helpvampire', (req, res) => res.sendFile('pages/vampire.html', { root: __dirname }));

app.get('/recursion', (req, res) => {
  res.send('see <a href="/recursion">recursion</a>');
});

app.get('/shit', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send('💩');
});


redirect('/lizard', 'https://cdn.glitch.com/0cd3bfc0-6ead-44dc-a210-6a4af7171875%2Flizard.jpeg');
redirect('/yeo', 'https://cdn.glitch.com/0cd3bfc0-6ead-44dc-a210-6a4af7171875%2Fc08dbfc2-8710-43dd-8eed-e097b1296781.image.png');
redirect('/rickroll', 'https://tenor.com/view/rick-and-morty-pickle-rick-rickroll-meme-rick-astley-gif-17840768');

app.get('/guides/*', async (req, res, next) => {
  const url = decodeURIComponent(req.originalUrl.slice(8));
  const path = resolve('/', url + '.js');
  try {
    const file = await fs.open(path, 'r');
    const result = '';
    function html(...c) { return '<html>' + c.join('') + '</html>'; }
    function _text(tag) { return function (text, ...extra) { if (text instanceof Array) { text = text.reduce((p, c) => p + extra.shift().toString() + c); } return `<${tag}>${text}</${tag}>`; } }
    const header = _text('h1');
    const text = _text('p');
    eval(await file.readFile());
    res.send(result);
  } catch {
    // opening file failed
    next();
  }
});

// learn / 
redirect('/learn/js', 'https://javascript.info/');
redirect('/learn/javascript', '/learn/js');

redirect('/learn/programming', 'https://www.edx.org/course/cs50s-introduction-to-computer-science');

redirect('/learn/css', 'https://css-tricks.com/where-do-you-learn-html-css-in-2020/');
redirect('/learn/css/grid', 'https://css-tricks.com/snippets/css/complete-guide-grid/');
redirect('/learn/css/flex', '/learn/css/flexbox');
redirect('/learn/css/flexbox', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/');

app.get('/learn/ai', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send('still being determined');
});

app.get('/learn/sql', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send('still being determined');
});

// TODO: may change in the future
redirect('/learn/regex', 'https://regex101.com/');

// TODO: official guide may not always be the best tutorial
redirect('/learn/elixir', 'https://elixir-lang.org/getting-started/introduction.html');
redirect('/learn/ex', '/learn/elixir');
redirect('/learn/exs', '/learn/elixir');

redirect('/learn/haskell', 'http://learnyouahaskell.com/chapters');
redirect('/learn/hs', '/learn/haskell');

redirect('/learn/interpreter', 'http://craftinginterpreters.com/contents.html');

redirect('/learn/compiler/haskell', 'https://www.stephendiehl.com/llvm/'); // 'http://dev.stephendiehl.com/fun/');
redirect('/learn/compiler/hs', '/learn/compiler/haskell');
redirect('/learn/compiler/llvm', 'http://llvm.org/docs/tutorial/');

redirect('/learn/softwareverification', 'https://softwarefoundations.cis.upenn.edu/');
redirect('/learn/verification', '/learn/softwareverification');

redirect('/learn/pltheory', 'https://plfa.github.io/');

redirect('/learn/lean', 'https://wwwf.imperial.ac.uk/~buzzard/xena/natural_number_game/');

redirect('/learn/wat', 'https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format');
// rph / 

app.get('/rph', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}h1,h2,h3,h4,h5,h6,ul{margin:0;}</style>\
<meta content="very funny discord pls dont join" property="og:description">\
<meta content="https://wtmoo.is/images/rph/rph.webp" property="og:image">\
<meta name="theme-color" content="#7788cb">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/rph.json" />\
<h4><a href="https://discord.gg/rph">discord</a></h4>\
<h4>users</h4>\
<ul>\
<li><a href="/rph/arson">arson</a></li>\
<li><a href="/rph/neko">neko</a></li>\
<li><a href="/rph/grian">grian</a></li>\
<li><a href="/rph/pankek">pankek</a></li>\
<li><a href="/rph/phantz">phantz</a></li>\
<li><a href="/rph/rare">rare (a.k.a. neverrare)</a></li>\
<li><a href="/rph/phireh">phireh</a></li>\
</ul>');
});

app.get('/rph/rph.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "r/ProgrammerHumor discord",
  "author_url": "https://discord.gg/rph",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/rph.webp"
}`);
});

app.get('/rph/bbworld', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="godforsaken scratch shill" property="og:description">\
<meta content="https://wtmoo.is/images/rph/bbworld.png" property="og:image">\
<meta name="theme-color" content="#f6a21b">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/bbworld.json" />\
<a href="https://github.com/bbworld1">godforsaken scratch shill</a>');
});

app.get('/rph/bbworld.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "bbworld",
  "author_url": "https://github.com/bbworld1",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/bbworld.png"
}`);
});

app.get('/rph/pankek', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="lang developer of 0 languages" property="og:description">\
<meta content="https://wtmoo.is/images/rph/pankek.png" property="og:image">\
<meta name="theme-color" content="#90f3ee">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/pankek.json" />\
<a href="https://github.com/somebody1234">lang developer of 0 languages</a>');
});

app.get('/rph/pankek.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "pankek",
  "author_url": "https://github.com/somebody1234",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/pankek.png"
}`);
});

// https://cdn.discordapp.com/avatars/362198518129098752/ffc2bf2481beadc7216d6d187a91f49e.png?size=128

app.get('/rph/legendofmiracles', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="linux shill with edgy username" property="og:description">\
<meta content="https://wtmoo.is/images/rph/legendofmiracles.png" property="og:image">\
<meta name="theme-color" content="#4475ae">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/legendofmiracles.json" />\
linux shill with edgy username');
});

app.get('/rph/legendofmiracles.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "legendofmiracles",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/legendofmiracles.png"
}`);
});

app.get('/rph/grian', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="best kotlin shill" property="og:description">\
<meta content="https://wtmoo.is/images/rph/grian.png" property="og:image">\
<meta name="theme-color" content="#e6c296">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/grian.json" />\
<a href="https://github.com/grian32/">best kotlin shill</a>');
});

app.get('/rph/grian.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "grian",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/grian.png"
}`);
});

app.get('/rph/rare', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="very rare" property="og:description">\
<meta content="https://wtmoo.is/images/rph/rare.png" property="og:image">\
<meta name="theme-color" content="#ffd966">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/rare.json" />\
<a href="https://github.com/neverRare">very rare</a>');
});

app.get('/rph/rare.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "rare",
  "author_url": "https://github.com/neverRare",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/rare.png"
}`);
});

app.get('/rph/phantz', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="martian doom slayer with a super shotgun (or two)" property="og:description">\
<meta content="https://wtmoo.is/images/rph/phantz.png" property="og:image">\
<meta name="theme-color" content="#d07640">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/phantz.json" />\
<a href="https://github.com/TotallyNotChase">martian doom slayer with a super shotgun (or two)</a>');
});

app.get('/rph/phantz.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "phantz",
  "author_url": "https://github.com/TotallyNotChase",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/phantz.png"
}`);
});

app.get('/rph/aplet', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="jaba applet" property="og:description">\
<meta content="https://wtmoo.is/images/rph/aplet.png" property="og:image">\
<meta name="theme-color" content="#f1e05a">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/aplet.json" />\
<a href="https://github.com/Aplet123">jaba applet</a>');
});

app.get('/rph/aplet.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "aplet",
  "author_url": "https://github.com/Aplet123",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/aplet.png"
}`);
});

app.get('/rph/arson', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="don\'t worry he\'s not actually an arsonist" property="og:description">\
<meta content="mee42.dev" property="og:site_name">\
<meta content="https://wtmoo.is/images/rph/arson.png" property="og:image">\
<meta name="theme-color" content="#b12a0b">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/arson.json" />\
<a href="https://mee42.dev/">not actually an arsonist</a>');
});

app.get('/rph/arson.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "arson",
  "author_url": "https://mee42.dev",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/arson.png"
}`);
});

app.get('/rph/neko', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="really a cat irl" property="og:description">\
<meta content="skneko.moe" property="og:site_name">\
<meta content="https://wtmoo.is/images/rph/neko.png" property="og:image">\
<meta name="theme-color" content="#ad1457">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/neko.json" />\
<a href="https://skneko.moe">a cat</a>');
});

app.get('/rph/neko.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "neko",
  "author_url": "https://skneko.moe",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/neko.png"
}`);
});

app.get('/rph/phireh', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="neko\'s friend idk" property="og:description">\
<meta content="https://wtmoo.is/images/rph/phireh.png" property="og:image">\
<meta name="theme-color" content="#a75aa8">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/phireh.json" />\
purple slime (he says it\'s a zergling but i\'m not sure i believe him)');
});

app.get('/rph/phireh.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "phireh",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/phireh.png"
}`);
});

app.get('/rph/λ', (req, res) => {
  res.setHeader('content-type','text/plain');
  res.send('god of the stateless');
});

app.get('/wtmoo', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="heck if i know" property="og:description">\
<meta content="wtmoo.is" property="og:site_name">\
<meta content="https://wtmoo.is/wtmoo.png" property="og:image">\
<meta name="theme-color" content="#eeeeee">\
<link type="application/json+oembed" href="https://wtmoo.is/wtmoo.json" />\
heck if i know');
});

app.get('/wtmoo.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "wtmoo",
  "author_url": "https://wtmoo.is",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/wtmoo.png"
}`);
});

app.get('/wtmoo', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send('eternal confusion');
});

app.get('/run', (req, res) => res.sendFile('pages/run.html', { root: __dirname }));

app.get('/wtmoo.png', (req, res) => res.sendFile('wtmoo.png', { root: __dirname }));

app.get('/calc/:expression', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send(calc(req.params.expression).toString());
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
  for (let extras = 0; extras < req.params.domain.length; extras++) {
    const slice = req.params.domain.slice(0, req.params.domain.length - extras);
    for (const tld of tlds) {
      if (slice.length - tld.length < 3) {
        continue;
      }
      if (slice.endsWith(tld)) {
        // console.log(slice, tld);
        const d = req.params.domain;
        ret.push((d.slice(0, slice.length - tld.length) + '.' + d.slice(slice.length - tld.length, slice.length) + '/' + d.slice(slice.length)).replace(/\/$/, ''));
      }
    }
  }
  res.send(ret.join("\n"));
});

app.get('/pl/syntax', (req, res) => {
  res.redirect('http://rigaux.org/language-study/syntax-across-languages.html');
});

redirect('/personal/aoc/2020/day/4/hs/cursed', 'https://tio.run/##jVhtb5tIEP7OrxiRKgaZnGK7jm0iV0qTNI1UpdGld9L55QMGHNAR7AJu4zvfb8/NvrCzEBxXjvEw88zs7LO7M5DIy/8Ok@Tl5d@TI/hycXfzx8XNNXxKwud4kYS3aV54qR/mjlJdrtIifC5yODr5z4if1qusgPssTDZBCFEcxOkjWNbxse2Atduxa7vNruMxXq@/O@AlCV7SrQPrLE4LB/Jo9dOBB379uFqh9Vu2CXFAL8nxZ5kzTBrY5WDfN14SL@MwgJvPl78xPyPwCg@@bdchjOFjnBXRX6GXwQ5u83wTSvn6eR1nXhGvUqn4HMaPUcEEL84uV8mKo7ZhKd57ec4GvL3Cm8vVJi2y7e2VGOsOB5qg@gHuhIIljjqWOap56oafYAQ@MfDgZxRmIZ8ruC7en3yA6WXkZXMjTpfxM7yH8Vh6XH9XeEabwvMLGwhdxLKI4HziHG@AGIE4GIOpbsxzYSVW0KpuSmuNJ4RUNSVO0od2ISm9YpOZyhsVveSXxZVyadMIRyvdlXa1BsysbkxiA4mrcMHZIy50VthCnQsA0aETowFqjLwiSINKUhQ3uknxojOkD1NSo3GkmTV2KkRpECJIp0oDeLBAhdid1T10V91AE0bxxDznN9YDpDZTPIDZbltcl9oV2u@qnE94AG1gEQKvKxYoxb0Oq4M58TNVSYsfL0yE/crkuOPY5D/VrVBx50NxdxlDS477yqvMpDE3PKYZ9KHdNlhNAytyCxs2CIhcq0A1bGxhmc65elObDzvu1fn4iPLd6ZyArAp//fP69@Ti/v727oYVWeEsikXV3TQZGTP8mKUqR03LbLl8lVqQ28pDAFoybZ60UBS2Zi1DmrXcPRh/kIl4tSxwtugynascWCFsTVuuiJi8ykA4cLyW1HTOsuIBonb7lbmoWB22E2X6lKklUhXNBBa2ytlC3cKupi11mIllssXLxTRRYtGVZsE1tmmUG6AHx8cGa3BiJyEx4Il7sYO8@o7pwm5nsF5IDkwQKvLxjHRVlLtTBGCKcltyF@ydsFRsLCHCXEAoC2nk5Apwuq2BdzsQykIaOViMhW2WUcIZ8Qzst@puYRheEECxXYP1w0tYaxZrNZ1aqHSAK@35/BVMDm3pMDey3cIwstALWriwrVnacvkFtyqreFbGwrsWB@D@tQkKFVAJqIZ6C@CXVqnIEdZuT/25giAflIMts8TIC8xxi98Mv/jhs2KTpY7yrgxa4BFSfvEeP2o0zX7hHr9a62l2jtDlEb9FzVk2pf1OPn6TupPqVfszbfJTPazZbY1gRk5Qc9M6W7Ojv8eRGl7Vzwigddoa82qPYofELok9Et@T2CfxjMQBiUMSR0r0x/Lw51fxY4yPyRNRU/mR1JTluayhU4GuaWX7lC6BOPeaDx6oiOYZ0TwjmmdE84xonhHNM6J5RjTPiOYZ0TxR9EhckOiTGJIYkLgk8YLEjyReknhF4jWJn5RIXH8On2tEC02dZaatUcxUkl@/5NcX/Ao0koulKw54X2NF1pqJx3EsodZsIZ7M8YGGVVAsmAn2f1UXHDrqTu30OvJAOnTGHHVsHO0kzOHkBBza4XORTovnU2Ym@4CwoEnmzMqelgzuCxfX0MWtwmphScKb0M4vQz13Ibt4gIxgRgH2jiYHs3t6emra5VPYPkjnMKRLEGjC/KDMKRNtSfB0cDLYFHyVvN@IxfG6p03jaZjG8errrgbt7hm07oAj9xpHrgMbhy@3GV@mPlsm038y5TKdN8POfg02@DXY8CDM7IxOmX1cXW3N3Hnb3H3b3FPmBl7EZOO0TO81xOyPpHnPCIOBtIu3hwbA8BBgpAMashwczLJ59am4tI5kwyyL3jsQfyRNbBvrXZNzpZBqW1UVLNN7WjRQpAEWyeYAIEvfBjxm20OAAxGif5I3AY0cUi2WAK0xv@awwqYNP7RAqobLOHxDGvz/YOy/PPSmxRvM7VewbGkdw3pTPBTZlxR@4y8mhvHkxSnbCit8o0nCgp5swQy3mYs1ozdLZ8YseizczmDgP8E6DlDCs8D1oZ@4m8KHBQd3RxCh4ihc@v5oCLFQigj8wpx7vcHZaX/Y74OPd933I@7cGfW7wEfp97XYuBYyTGcAIqPumRhkeHY27A/YG56YXSanwN5en7y17GqZsufSXuj2lgYolGRNJ3P2yjad4GsgTOb2y8v/');

const redirects = {};

require('./tools/embed.js')(app);
require('./tools/query.js')(app);
require('./tools/my.js')(app);
require('./tools/home.js')(app, redirects);

app.use((req, res, next) => {
  const url = decodeURIComponent(req.originalUrl.slice(1));
  console.log(url);
  if (url.toLowerCase() in redirects) { res.redirect(redirects[url.toLowerCase()]); return; }
  if (url.toLowerCase().replace(/_+/g, ' ') in redirects) { res.redirect(redirects[url.toLowerCase().replace(/_+/g, ' ')]); return; }
  next();
});

app.use((req, res, next) => {
  res.status(404).sendFile("pages/404.html", { root: __dirname });
})

app.listen(process.env.PORT);

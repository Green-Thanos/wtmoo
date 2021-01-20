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
const { Router } = require('express');
const subdomain = require('express-subdomain');
app.use(cookieParser());
app.use('/ace', require('express').static('ace'));
app.use('/images', require('express').static('images'));

function redirect(endpoint, url) {
  app.get(endpoint, (req, res) => {
    res.redirect(url);
  });
}

function escapeHTML(unsafe) {
  return unsafe.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#039;' //, '\n': '&#010;'
  })[m]);
}

function text(req, res, text, status=200) {
  if (/discord/i.test(req.headers['user-agent'])) {
    res.send(`<meta content="${escapeHTML(text)}" property="og:description">`);
  } else {
    res.setHeader('content-type', 'text/plain');
    res.status(status).send(text);
  }
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
      await file.read({ length: 0, position: 0 });
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

app.get('/favicon.ico', (req, res) => res.sendFile('favicon.ico', { root: __dirname }));

redirect('/ask', 'https://dontasktoask.com/');
redirect('/help', 'https://dontasktoask.com/');
redirect('/your/question', 'https://dontasktoask.com/');
redirect('/yourquestion', 'https://dontasktoask.com/');

app.get('/downvote/:query', (req, res) => {
  res.redirect('https://idownvotedbecau.se/' + req.params.query);
});
app.get('/dv/:query', (req, res) => {
  res.redirect('https://idownvotedbecau.se/' + req.params.query);
});
app.get('/so/:query', (req, res) => {
  res.redirect('https://stackoverflow.com/help/' + req.params.query);
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
redirect('/nou', 'https://i.redd.it/enzdxesehcc11.png');


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

app.get('/gh', (req, res) => {
  res.redirect("https://github.com/");
});

app.get('/run', (req, res) => res.sendFile('pages/run.html', { root: __dirname }));

app.get('/wtmoo.png', (req, res) => res.sendFile('wtmoo.png', { root: __dirname }));

app.get('/calc/:expression', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send(calc(req.params.expression).toString());
});

app.get('/tld', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  cache('https://data.iana.org/TLD/tlds-alpha-by-domain.txt', 'tlds')
    .then(body => res.send(body.slice(body.indexOf('\n') + 1).toLowerCase()));
});

app.get('/tld/for/:domain', async (req, res) => {
  const tldsRaw = await cache('https://data.iana.org/TLD/tlds-alpha-by-domain.txt', 'tlds');
  const tlds = tldsRaw.toLowerCase().split('\n').slice(1, -1);
  const ret = [];
  for (let extras = 0; extras < req.params.domain.length; extras++) {
    const slice = req.params.domain.slice(0, req.params.domain.length - extras);
    for (const tld of tlds) {
      if (slice.length - tld.length < 1) {
        continue;
      }
      if (slice.endsWith(tld)) {
        // console.log(slice, tld);
        const d = req.params.domain;
        ret.push((d.slice(0, slice.length - tld.length) + '.' + d.slice(slice.length - tld.length, slice.length) + '/' + d.slice(slice.length)).replace(/\/$/, ''));
      }
    }
  }
  text(req, res, ret.join("\n"));
});

app.get('/pl/syntax', (req, res) => {
  res.redirect('http://rigaux.org/language-study/syntax-across-languages.html');
});

redirect('/personal/aoc/2020/day/4/hs/cursed', 'https://tio.run/##jVhtb5tIEP7OrxiRKgaZnGK7jm0iV0qTNI1UpdGld9L55QMGHNAR7AJu4zvfb8/NvrCzEBxXjvEw88zs7LO7M5DIy/8Ok@Tl5d@TI/hycXfzx8XNNXxKwud4kYS3aV54qR/mjlJdrtIifC5yODr5z4if1qusgPssTDZBCFEcxOkjWNbxse2Atduxa7vNruMxXq@/O@AlCV7SrQPrLE4LB/Jo9dOBB379uFqh9Vu2CXFAL8nxZ5kzTBrY5WDfN14SL@MwgJvPl78xPyPwCg@@bdchjOFjnBXRX6GXwQ5u83wTSvn6eR1nXhGvUqn4HMaPUcEEL84uV8mKo7ZhKd57ec4GvL3Cm8vVJi2y7e2VGOsOB5qg@gHuhIIljjqWOap56oafYAQ@MfDgZxRmIZ8ruC7en3yA6WXkZXMjTpfxM7yH8Vh6XH9XeEabwvMLGwhdxLKI4HziHG@AGIE4GIOpbsxzYSVW0KpuSmuNJ4RUNSVO0od2ISm9YpOZyhsVveSXxZVyadMIRyvdlXa1BsysbkxiA4mrcMHZIy50VthCnQsA0aETowFqjLwiSINKUhQ3uknxojOkD1NSo3GkmTV2KkRpECJIp0oDeLBAhdid1T10V91AE0bxxDznN9YDpDZTPIDZbltcl9oV2u@qnE94AG1gEQKvKxYoxb0Oq4M58TNVSYsfL0yE/crkuOPY5D/VrVBx50NxdxlDS477yqvMpDE3PKYZ9KHdNlhNAytyCxs2CIhcq0A1bGxhmc65elObDzvu1fn4iPLd6ZyArAp//fP69@Ti/v727oYVWeEsikXV3TQZGTP8mKUqR03LbLl8lVqQ28pDAFoybZ60UBS2Zi1DmrXcPRh/kIl4tSxwtugynascWCFsTVuuiJi8ykA4cLyW1HTOsuIBonb7lbmoWB22E2X6lKklUhXNBBa2ytlC3cKupi11mIllssXLxTRRYtGVZsE1tmmUG6AHx8cGa3BiJyEx4Il7sYO8@o7pwm5nsF5IDkwQKvLxjHRVlLtTBGCKcltyF@ydsFRsLCHCXEAoC2nk5Apwuq2BdzsQykIaOViMhW2WUcIZ8Qzst@puYRheEECxXYP1w0tYaxZrNZ1aqHSAK@35/BVMDm3pMDey3cIwstALWriwrVnacvkFtyqreFbGwrsWB@D@tQkKFVAJqIZ6C@CXVqnIEdZuT/25giAflIMts8TIC8xxi98Mv/jhs2KTpY7yrgxa4BFSfvEeP2o0zX7hHr9a62l2jtDlEb9FzVk2pf1OPn6TupPqVfszbfJTPazZbY1gRk5Qc9M6W7Ojv8eRGl7Vzwigddoa82qPYofELok9Et@T2CfxjMQBiUMSR0r0x/Lw51fxY4yPyRNRU/mR1JTluayhU4GuaWX7lC6BOPeaDx6oiOYZ0TwjmmdE84xonhHNM6J5RjTPiOYZ0TxR9EhckOiTGJIYkLgk8YLEjyReknhF4jWJn5RIXH8On2tEC02dZaatUcxUkl@/5NcX/Ao0koulKw54X2NF1pqJx3EsodZsIZ7M8YGGVVAsmAn2f1UXHDrqTu30OvJAOnTGHHVsHO0kzOHkBBza4XORTovnU2Ym@4CwoEnmzMqelgzuCxfX0MWtwmphScKb0M4vQz13Ibt4gIxgRgH2jiYHs3t6emra5VPYPkjnMKRLEGjC/KDMKRNtSfB0cDLYFHyVvN@IxfG6p03jaZjG8errrgbt7hm07oAj9xpHrgMbhy@3GV@mPlsm038y5TKdN8POfg02@DXY8CDM7IxOmX1cXW3N3Hnb3H3b3FPmBl7EZOO0TO81xOyPpHnPCIOBtIu3hwbA8BBgpAMashwczLJ59am4tI5kwyyL3jsQfyRNbBvrXZNzpZBqW1UVLNN7WjRQpAEWyeYAIEvfBjxm20OAAxGif5I3AY0cUi2WAK0xv@awwqYNP7RAqobLOHxDGvz/YOy/PPSmxRvM7VewbGkdw3pTPBTZlxR@4y8mhvHkxSnbCit8o0nCgp5swQy3mYs1ozdLZ8YseizczmDgP8E6DlDCs8D1oZ@4m8KHBQd3RxCh4ihc@v5oCLFQigj8wpx7vcHZaX/Y74OPd933I@7cGfW7wEfp97XYuBYyTGcAIqPumRhkeHY27A/YG56YXSanwN5en7y17GqZsufSXuj2lgYolGRNJ3P2yjad4GsgTOb2y8v/');

const redirects = {}, embeds = {};
const ctx = {app, redirects, redirect, text, escapeHTML, embeds, lazy, cache, root: __dirname, Router};
require('./tools/dns.js')(ctx);
// require('./tools/theme.js')(ctx);
app.use('/learn', require('./tools/learn.js'));
app.use('/rph', require('./tools/rph.js'));
app.use('/embed', require('./tools/embed.js'));
require('./tools/my.js')(ctx);
require('./tools/home.js')(ctx);
app.use('/badge', require('./tools/badge.js'));
app.use('/morequire('./tools/modules.js')(ctx);

const q = require('./tools/query.js');
app.use(subdomain('q', q));
app.use('/q', q);
app.use(subdomain('query', q));
app.use('/query', q);

app.use((req, res, next) => {
  let url = decodeURIComponent(req.originalUrl.slice(1));
  console.log(url);
  if (/discord/i.test(req.headers['user-agent']) && url.toLowerCase().replace(/_+/g, ' ') in embeds) { url = url.toLowerCase().replace(/_+/g, ' '); }
  if (/discord/i.test(req.headers['user-agent']) && url.toLowerCase() in embeds) {
    const {domain, site, color, image, desc} = embeds[url.toLowerCase()];
    res.send(`${desc ? `\
<meta content="${desc}" property="og:description">` : ''}${domain ? `
<meta content="${domain}" property="og:site_name">` : ''}${image ? `
<meta content="${image}" property="og:image">` : ''}${color ? `
<meta name="theme-color" content="#${color}">` : ''}
<link type="application/json+oembed" href="https://wtmoo.is/${url.toLowerCase()}.json" />`);
  }
  // if (url.toLowerCase())
  if (url.toLowerCase().replace(/_+/g, ' ') in redirects) { url = url.toLowerCase().replace(/_+/g, ' '); }
  if (url.toLowerCase() in redirects) { res.redirect(redirects[url.toLowerCase()]); return; }
  next();
});

app.use((req, res, next) => {
  res.status(404).sendFile("pages/404.html", { root: __dirname });
})

app.listen(process.env.PORT);

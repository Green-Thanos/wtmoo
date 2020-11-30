const fs = require('fs').promises,
  fsConst = require('fs').constants,
  fetch = require('node-fetch')//,
  //calc = require('mathjs').evaluate;


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

app.get('/ask', (req, res) => {
  res.redirect('https://dontasktoask.com/');
});

let vamp; fs.readFile('pages/vampire.html', 'utf8').then(text => vamp = text);
app.get('/helpvampire', (req, res) => {
  res.send(vamp);
});

app.get('/shit', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send('💩');
});

app.get('/rph/pankek', (req, res) => {
  res.setHeader('content-type','text/plain');
  res.send('lang developer of 0 languages');
});

app.get('/rph/grian', (req, res) => {
  res.setHeader('content-type','text/plain');
  res.send('best kotlin shill');
});

app.get('/rph/λ', (req, res) => {
  res.setHeader('content-type','text/plain');
  res.send('god of the stateless');
});

app.get('/wtmoo', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send('eternal confusion');
});

let wtmooPng; fs.readFile('wtmoo.png').then(bin => wtmooPng = bin);
app.get('/wtmoo.png', (req, res) => {
  res.setHeader('content-type', 'image.png');
  res.send(wtmooPng);
});

app.get('/calc/:expression', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send('');//calc(req.params.expression).toString());
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
        ret.push(req.params.domain.replace(new RegExp(tld), '.$&/').replace(/\/$/, ''));
      }
    }
  }
  res.send(ret.join("\n"));
});

const engines = [
  [['google', 'g'], 'https://www.google.com/search?q=%+q'],
  [['bing', 'b'], 'https://www.bing.com/search?q=%+q'],
  [['duckduckgo', 'ddg'], 'https://duckduckgo.com/?q=%+q'],
  [['ecosia', 'e'], 'https://www.ecosia.org/search?q=%+q'],
  [['wikipedia', 'wp', 'w'], 'https://en.wikipedia.org/w/index.php?search=%+q'],
  [['youtube', 'yt'], 'https://www.youtube.com/results?search_query=%+q'],
  [['hoogle', 'hgl'], 'https://hoogle.haskell.org/?hoogle=%q'],
  [['mercurial', 'merc', 'hg'], 'https://www.mercurial-scm.org/wiki/Mercurial?action=fullsearch&value=%+q'],
  [['github', 'gh'], 'https://github.com/search?q=%+q'],
  [['gitlab', 'gl'], 'https://gitlab.com/search?search=%+q'],
  [['archwiki', 'arch wiki', 'arch'], 'https://wiki.archlinux.org/index.php?search=%+q'],
  [['aur', 'arch user repository', 'archuserrepository'], 'https://aur.archlinux.org/packages/?K=%+q'],
];
let searchHome; fs.readFile('pages/search.html', 'utf8').then(text => searchHome = text.replace('$', JSON.stringify(engines)));
const engined = {};
const engineList = [];
for (const [aliases, url] of engines) { engineList.push(aliases[0]); for (const alias of aliases) { engined[alias] = url; } }

let favicon; fs.readFile('favicon.ico').then(bin => favicon = bin);
app.get('/favicon.ico', (req, res) => {
  res.setHeader('content-type', 'image/x-icon');
  res.send(favicon);
});

app.get('/q', (req, res) => {
  res.send(searchHome);
});

app.get('/q/list', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send(engineList.join('\n') + '\n');
});

app.get('/q/:engine/:query', (req, res) => {
  if (req.params.engine in engined) {
    res.redirect(engined[req.params.engine].replace('%q', encodeURIComponent(req.params.query)).replace('%+q', encodeURIComponent(req.params.query.replace(/ /g, '+'))));
  } else {
    res.setHeader('content-type', 'text/plain');
    res.status(404).send('invalid search engine');
  }
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

let home = '<meta name="viewport" content="width=device-width,initial-scale=1"><style>h1,h2,h3,h4,h5,h6{margin:0.5em 0;}ul{margin:0;padding-inline-start:20px;}</style><title>wtmoo is</title><a href="/">help</a><br><a href="https://glitch.com/edit/#!/wtmoo">source</a><br>';

const langs = [
  [['haskell', 'hs'], 'https://www.haskell.org/'],
  [['node.js', 'node', 'nodejs'], 'https://nodejs.org/'],
  [['go', 'golang'], 'https://golang.org/'],
  [['javascript', 'js'], 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
  [['c++', 'cpp'], 'https://www.cppreference.com/'],
];
const redirectd = {};
home += '<h5>programming languages</h5><ul>';
for (const [aliases, url] of langs) { home += `<li><a href="/${aliases[0]}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = url; } }
home += '</ul>';
const distros = [
  [['arch linux', 'archlinux', 'arch'], 'https://wiki.archlinux.org/index.php/Arch_Linux'],
  [['ubuntu'], 'https://ubuntu.com/'],
  [['opensuse', 'suse'], 'https://www.opensuse.org/'],
  [['pop!_os', 'popos', 'pop'], 'https://pop.system76.com/'],
  [['elementary os', 'elementaryos', 'elementary'], 'https://elementary.io/'],
  [['linux mint', 'linuxmint', 'mint'], 'https://linuxmint.com/'],
  [['artix linux', 'artixlinux', 'artix'], 'https://artixlinux.org/'],
];
home += '<h5>linux distros</h5><ul>';
for (const [aliases, url] of distros) { home += `<li><a href="/${aliases[0]}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = url; } }
home += '</ul>';

app.get('/', (req, res) => {
  res.send(home);
});

app.use((req, res, next) => {
  const url = decodeURIComponent(req.originalUrl.slice(1));
  console.log(url);
  if (url.toLowerCase() in redirectd) { res.redirect(redirectd[url.toLowerCase()]); return; }
  next();
});

app.listen(process.env.PORT);

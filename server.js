function lazy(name, fn) {
  Object.defineProperty(global, name, { get: () => { const val = fn(); Object.defineProperty(global, name, val); return val} });
}

const fs = require('fs').promises,
  fsConst = require('fs').constants,
  fetch = require('node-fetch'),
  cookieParser = require('cookie-parser');
/* global calc */
lazy('calc', () => require('mathjs').evaluate);


// TODO: dark theme
const app = require('express')();
app.use(cookieParser());
app.use('/ace', require('express').static('ace'));
app.use('/images', require('express').static('images'));

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

app.get('/programming', (req, res) => {
  res.redirect('https://www.edx.org/course/cs50s-introduction-to-computer-science');
});

app.get('/lizard', (req, res) => {
  res.redirect('https://cdn.glitch.com/0cd3bfc0-6ead-44dc-a210-6a4af7171875%2Flizard.jpeg?v=1606762167454');
});

app.get('/yeo', (req, res) => {
  res.redirect('https://cdn.glitch.com/0cd3bfc0-6ead-44dc-a210-6a4af7171875%2Fc08dbfc2-8710-43dd-8eed-e097b1296781.image.png?v=1606923594058');
});

app.get('/rph/pankek', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="lang developer of 0 languages" property="og:description">\
<meta content="https://wtmoo.is/images/rph/pankek.png" property="og:image">\
<meta name="theme-color" content="#90f3ee">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/pankek.json" />\
lang developer of 0 languages');
});

app.get('/rph/pankek.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "pankek",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/pankek.png"
}`);
});

app.get('/rph/grian', (req, res) => {
  res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="best kotlin shill" property="og:description">\
<meta content="https://wtmoo.is/images/rph/grian.png" property="og:image">\
<meta name="theme-color" content="#e6c296">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/grian.json" />\
best kotlin shill');
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
very rare');
});

app.get('/rph/rare.json', (req, res) => {
  res.setHeader('content-type', 'application/json+oembed');
  res.send(`{
  "author_name": "rare",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/rare.png"
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

app.get('/rph/λ', (req, res) => {
  res.setHeader('content-type','text/plain');
  res.send('god of the stateless');
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

const engines = [
  // general
  [['google', 'g'], 'https://www.google.com/search?q=%+q'],
  [['bing', 'b'], 'https://www.bing.com/search?q=%+q'],
  [['duckduckgo', 'ddg'], 'https://duckduckgo.com/?q=%+q'],
  [['ecosia', 'ec'], 'https://www.ecosia.org/search?q=%+q'],
  [['lmgtfy'], 'https://lmgtfy.app/#gsc.q=%q'],
  // non text
  [['google images', 'googleimages', 'gimages', 'gi'], 'https://www.google.com/search?q=%+q&tbm=isch'],
  [['google videos', 'googlevideos', 'gvideos', 'ggv'], 'https://www.google.com/search?q=%+q&tbm=vid'],
  [['google maps', 'googlemaps', 'gmaps', 'ggm'], 'https://www.google.com/maps/search/%+q'],
  [['google news', 'googlenews', 'gnews', 'ggn'], 'https://www.google.com/search?q=%+q&tbm=nws'],
  [['google shopping', 'googleshopping', 'gshopping', 'ggs'], 'https://www.google.com/search?q=%+q&tbm=shop'],
  [['google books', 'googlebooks', 'gbooks', 'gb'], 'https://www.google.com/search?q=%+q&tbm=bks'],
  [['google finance', 'googlefinance', 'gfinance', 'ggf'], 'https://www.google.com/search?q=%+q&tbm=fin'],
  [['lmgtfy images', 'lmgtfyi'], 'https://lmgtfy.app/#gsc.tab=1&gsc.q=%q'],
  // videos
  [['youtube', 'yt'], 'https://www.youtube.com/results?search_query=%+q'],
  [['twitch', 'twitch.tv', 'ttv'], 'https://www.twitch.tv/search?term=%q'],
  // info
  [['wikipedia', 'wp', 'w'], 'https://en.wikipedia.org/w/index.php?search=%+q'],
  [['stack overflow', 'stackoverflow', 'so'], 'https://stackoverflow.com/search?q=%+q'],
  [['super user', 'superuser', 'su'], 'https://superuser.com/search?q=%+q'],
  [['ask ubuntu', 'askubuntu', 'au'], 'https://askubuntu.com/search?q=%+q'],
  [['codegolf.se', 'codegolfse', 'cgse'], 'https://codegolf.stackexchange.com/search?q=%+q'],
  // news
  [['cnn'], 'https://edition.cnn.com/search?q=%+q'],
  [['nbc'], 'https://www.nbcnews.com/search/?q=%+q'],
  [['time'], 'https://time.com/search/?q=%+q'],
  [['slashdot', 'sd'], 'https://slashdot.org/index2.pl?fhfilter=%+q'],
  [['new scientist', 'newscientist', 'ns'], 'https://www.newscientist.com/search/?q=%+q'],
  [['hacker news', 'hackernews', 'hn'], 'https://hn.algolia.com/?q=%+q'],
  // version control
  [['github', 'gh'], 'https://github.com/search?q=%+q'],
  [['gitlab', 'gl'], 'https://gitlab.com/search?search=%+q'],
  [['glitch', 'gli'], 'https://glitch.com/search?q=%q'],
  // repositories
  [['aur', 'yay', 'pacaur', 'aura', 'pakku', 'paru', 'pikaur', 'trizen'], 'https://aur.archlinux.org/packages/?K=%+q'],
  [['pypi', 'pip'], 'https://pypi.org/search/?q=%+q'],
  [['npm'], 'https://www.npmjs.com/search?q=%q'],
  [['deno'], 'https://deno.land/x?query=%+q'],
  [['yarn'], 'https://yarnpkg.com/?q=%q'],
  [['hoogle', 'hgl'], 'https://hoogle.haskell.org/?hoogle=%q'],
  [['currygle', 'currgle', 'cgl'], 'https://www-ps.informatik.uni-kiel.de/kics2/currygle/results?query=%+q'],
  [['nuget'], 'https://www.nuget.org/packages?q=%+q'],
  [['crates.io', 'cratesio', 'cio'], 'https://crates.io/search?q=%q'],
  [['cpan'], 'https://metacpan.org/search?q=%+q'],
  [['cran'], 'https://www.google.com/search?q=%+q&domains=r-project.org&sitesearch=r-project.org'],
  [['ubuntu packages', 'up', 'apt'], 'https://packages.ubuntu.com/search?keywords=%+q'],
  [['raku modules', 'rakumodules', 'rakum'], 'https://modules.raku.org/search/?q=%+q'],
  [['chocolatey', 'choco'], 'https://chocolatey.org/search?q=%+q'],
  [['chrome web store', 'cws'], 'https://chrome.google.com/webstore/search/%q'],
  [['chrome themes', 'crt'], 'https://chrome.google.com/webstore/search/%q?_category=themes'],
  [['firefox add-ons', 'firefox addons', 'ffa'], 'https://addons.mozilla.org/en-US/firefox/search/?q=%q'],
  [['jetbrains marketplace', 'jetbrains plugins', 'jbm', 'jbp'], 'https://plugins.jetbrains.com/search?search=%q'],
  [['vscode marketplace', 'vscm'], 'https://marketplace.visualstudio.com/search?term=a%20%5E&target=VSCode'],
  [['vs marketplace', 'vsm'], 'https://marketplace.visualstudio.com/search?term=a%20%5E&target=VS'],
  [['azure devops', 'ado'], 'https://marketplace.visualstudio.com/search?term=a%20%5E&target=AzureDevOps'],
  // misc tech
  [['cpp reference', 'cppreference', 'cppr'], 'https://cppreference.com/mwiki/index.php?search=%+q'],
  [['wolfram language', 'wolframlanguage', 'mathematica'], 'https://search.wolfram.com/?query=%+q'],
  [['archwiki', 'arch wiki', 'arch'], 'https://wiki.archlinux.org/index.php?search=%+q'],
  [['python 3', 'python3', 'python', 'py3', 'py'], 'https://docs.python.org/3/search.html?q=%+q'],
  [['python 2', 'python2', 'py2'], 'https://docs.python.org/2/search.html?q=%+q'],
  [['mdn'], 'https://developer.mozilla.org/en-US/search?q=%+q'],
  [['mercurial', 'merc', 'hg'], 'https://www.mercurial-scm.org/wiki/Mercurial?action=fullsearch&value=%+q'],
  [['esolang', 'eso'], 'https://esolangs.org/w/index.php?search=%+q'],
  [['raku'], 'https://www.google.com/search?q=site%3Adocs.raku.org+%q'],
  [['caniuse', 'ciu'], 'https://caniuse.com/?search=%q'],
  [['ncatlab', 'nlab'], 'https://ncatlab.org/nlab/search?query=%+q'],
  // funding
  [['patreon', 'pat'], 'https://www.patreon.com/search?q=%+q'],
  [['gofundme', 'gfm'], 'https://gofundme.com/mvc.php?route=homepage_norma/search&term=%q'],
  [['pixiv'], 'https://www.pixiv.net/en/tags/%q/artworks?s_mode=s_tag'],
  // art
  [['deviantart', 'da'], 'https://www.deviantart.com/search?q=%q'],
  [['fantia', 'ft'], 'https://fantia.jp/fanclubs?keyword=%+q'],
  [['fanbox', 'pixiv fanbox', 'pxfb'], 'https://www.fanbox.cc/search?type=creator&q=%q'],
  [['wattpad', 'watt'], 'https://www.wattpad.com/search/%q'],
  // social networks
  [['facebook', 'fb'], 'https://www.facebook.com/search/top/?q=%q'],
  [['twitter', 'tw'], 'https://twitter.com/search?q=%q'],
  [['reddit', 'rd'], 'https://www.reddit.com/search?q=%+q'],
  [['imgur'], 'https://imgur.com/search?q=%q'],
  // gifs
  [['gfycat', 'gc'], 'https://gfycat.com/gifs/search/%+q'],
  [['giphy', 'gp'], 'https://giphy.com/search/%-q'],
  [['tenor', 'tn'], 'https://tenor.com/search/%-q'],
  // shopping
  [['amazon', 'a'], 'https://www.amazon.com/s?k=%+q'],
  [['ebay', 'e'], 'https://www.ebay.com/sch/i.html?_nkw=%+q'],
  // learning
  [['khan academy', 'ka'], 'https://www.khanacademy.org/search?page_search_query=%+q'],
  [['geogebra', 'ggb'], 'https://www.geogebra.org/search/%q'],
  [['learnxinyminutes', 'lxiym'], 'https://learnxinyminutes.com/docs/%q'],
  [['wolfram alpha', 'wolfram|alpha', 'wolframalpha', 'w|a', 'wa'], 'https://www.wolframalpha.com/input/?i=%+q'],
];
let searchHome; fs.readFile('pages/search.html', 'utf8').then(text => searchHome = text.replace('$', JSON.stringify(engines)));
const engined = {};
const engineList = [];
for (const [aliases, url] of engines) { engineList.push(aliases[0]); for (const alias of aliases) { engined[alias] = url; } }

app.get('/favicon.ico', (req, res) => res.sendFile('favicon.ico', { root: __dirname }));
app.get('/search.xml', (req, res) => res.sendFile('pages/search.xml', { root: __dirname }));

app.get('/q', (req, res) => {
  if (req.query.q) {
    const match = req.query.q.match(/^!?(.+?) (.+)$/);
    if (match === null) {
      res.setHeader('content-type', 'text/plain');
      res.status(404).send('invalid search');
    } else {
      const [_full, engine, query] = match;
      res.redirect(`/q/${engine}/${query}`);
    }
  } else {
    res.send(searchHome);
  }
});

app.get('/q/list', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send(engineList.join('\n') + '\n');
});

app.get('/q/:engine/:query', (req, res) => {
  if (req.params.engine in engined) {
    res.redirect(engined[req.params.engine]
      .replace('%q', encodeURIComponent(req.params.query))
      .replace('%+q', encodeURIComponent(req.params.query.replace(/\s+/g, '+')))
      .replace('%-q', encodeURIComponent(req.params.query.replace(/\s+/g, '-'))));
  } else {
    res.setHeader('content-type', 'text/plain');
    res.status(404).send('invalid search engine');
  }
});

app.get('/embed', (req, res) => {
  res.send(
    '<head>' +
      (req.query.title || req.query.t ? `<meta content="${req.query.title || req.query.t}" property="og:title">` : '') +
      (req.query.site || req.query.s ? `<meta content="${req.query.site || req.query.s}" property="og:site_name">` : '') +
      (req.query.description || req.query.desc || req.query.d ? `<meta content="${req.query.description || req.query.desc || req.query.d}" property="og:description">` : '') +
      (req.query.image || req.query.i ? `<meta content="${req.query.image || req.query.i}" property="og:image">` : '') +
      (req.query.imageUrl || req.query.imageurl || req.query.iu ? `<meta content="${req.query.imageurl || req.query.imageUrl || req.query.iu}" property="og:image">` : '') +
      (req.query.color || req.query.c ? `<meta name="theme-color" content="#${req.query.color || req.query.c}">` : '') + 
    '</head>'
  );
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

app.get('/pl/syntax', (req, res) => {
  res.redirect('http://rigaux.org/language-study/syntax-across-languages.html');
});

let home = '<meta content="wtmoo is wtmoo" property="og:title"><meta content="wtmoo" property="og:site_name"><meta content="https://wtmoo.is/wtmoo.png" property="og:image"><meta name="viewport" content="width=device-width,initial-scale=1"><style>h1,h2,h3,h4,h5,h6{margin:0.5em 0;}ul{margin:0;padding-inline-start:20px;}</style><title>wtmoo is</title><a href="/">help</a><br><a href="https://glitch.com/edit/#!/wtmoo">source</a><br>\
<a href="/q">metasearch</a><br>\
<a href="/q/list">list of search engines supported by metasearch</a><br>';

const langs = [
  [['haskell', 'hs'], 'https://www.haskell.org/'],
  [['go', 'golang'], 'https://golang.org/'],
  [['javascript', 'js'], 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
  [['c++', 'cpp', 'cplusplus'], 'https://www.cppreference.com/'],
  [['ada', 'adacore'], 'https://www.adacore.com/about-ada'],
  [['fortran'], 'https://gcc.gnu.org/fortran/'],
  [['scala'], 'https://www.scala-lang.org/'],
  [['kotlin'], 'https://kotlinlang.org/'],
  [['java'], 'https://www.java.com/'],
  [['python', 'py'], 'https://www.python.org/about/'],
  [['c#', 'c sharp'], 'https://docs.microsoft.com/en-us/dotnet/csharp/'],
  [['f#', 'f sharp'], 'https://fsharp.org/'],
  [['forth'], 'https://www.forth.com/forth/'],
  [['common lisp', 'clisp'], 'https://common-lisp.net/'],
  [['racket'], 'https://racket-lang.org/'],
  [['wolfram language', 'mathematica'], 'https://www.wolfram.com/language/'],
  [['processing'], 'https://processing.org/'],
  [['asm', 'x86', 'assembly'], 'https://www.felixcloutier.com/x86/'],
  [['q#', 'qsharp', 'qdk'], 'https://docs.microsoft.com/en-us/quantum/'],
  [['c#9', 'csharp9'], 'https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-9'],
  [['c#8', 'csharp8'], 'https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-8'],
  [['c#7', 'csharp7'], 'https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-7'],
  [['c#6', 'csharp6'], 'https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-6'],
  [['typescript', 'ts'], 'https://www.typescriptlang.org/'],
];
const redirectd = {};
home += '<h5>programming languages</h5><ul>';
for (const [aliases, url] of langs) { home += `<li><a href="/${encodeURIComponent(aliases[0])}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = redirectd[alias.replace(/\s+/g, '')] = url; } }
home += '</ul>';
const distros = [
  [['arch linux', 'archlinux', 'arch'], 'https://wiki.archlinux.org/index.php/Arch_Linux'],
  [['ubuntu'], 'https://ubuntu.com/'],
  [['opensuse', 'suse'], 'https://www.opensuse.org/'],
  [['pop!_os', 'popos', 'pop'], 'https://pop.system76.com/'],
  [['elementary os', 'elementaryos', 'elementary'], 'https://elementary.io/'],
  [['linux mint', 'linuxmint', 'mint'], 'https://linuxmint.com/'],
  [['artix linux', 'artixlinux', 'artix'], 'https://artixlinux.org/'],
  [['manjaro'], 'https://manjaro.org/'],
  [['nixos'], 'https://nixos.org/'],
];
home += '<h5>linux distros</h5><ul>';
for (const [aliases, url] of distros) { home += `<li><a href="/${encodeURIComponent(aliases[0])}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = redirectd[alias.replace(/\s+/g, '')] = url; } }
home += '</ul>';
const dewm = [
  [['kde'], 'https://kde.org/'],
  [['gnome'], 'https://www.gnome.org/'],
  [['mate'], 'https://mate-desktop.org/'],
  [['xmonad'], 'https://xmonad.org/'],
  [['i3'], 'https://i3wm.org/'],
];
home += '<h5>desktop environments and window managers</h5><ul>';
for (const [aliases, url] of dewm) { home += `<li><a href="/${encodeURIComponent(aliases[0])}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = redirectd[alias.replace(/\s+/g, '')] = url; } }
home += '</ul>';
const libs = [
  [['curl'], 'https://curl.se/'],
  // server related
  [['drupal'], 'https://www.drupal.org/'],
  [['laravel'], 'https://laravel.com/'],
  [['mongodb', 'mongo'], 'https://www.mongodb.com/'],
  // dbs
  [['sqlite'], 'https://www.sqlite.org/index.html'],
  [['mysql'], 'https://www.mysql.com/'],
  // build systems
  [['dune'], 'https://dune.readthedocs.io/en/stable/'],
  [['cabal'], 'https://www.haskell.org/cabal/'],
  // js libs
  [['math.js', 'mathjs'], 'https://mathjs.org/'],
  [['three.js', 'threejs'], 'https://threejs.org/'],
  [['p5.js', 'p5js', 'p5'], 'https://p5js.org/'],
  [['d3.js', 'd3js', 'd3'], 'https://d3js.org/'],
  // notebooks
  [['anaconda python', 'anaconda'], 'https://www.anaconda.com/products/individual'],
  [['jupyter', 'jupyter lab', 'jupyter notebook'], 'https://jupyter.org/'],
  // runtimes
  [['node.js', 'node', 'nodejs'], 'https://nodejs.org/'],
  [['deno'], 'https://deno.land/'],
  // server frameworks/runtimes
  [['rails', 'ruby on rails'], 'https://rubyonrails.org/'],
  [['express', 'express.js', 'expressjs'], 'https://expressjs.com/'],
  [['flask'], 'https://flask.palletsprojects.com/'],
  [['django'], 'https://www.djangoproject.com/'],
  [['yesod'], 'https://www.yesodweb.com/'],
  // static site generators
  [['jekyll'], 'https://jekyllrb.com/'],
  [['hakyll'], 'https://jaspervdj.be/hakyll/'],
  // templating engines
  [['mustache'], 'https://mustache.github.io/'],
  [['nunjucks'], 'https://mozilla.github.io/nunjucks/'],
  [['handlebars'], 'https://handlebarsjs.com/'],
  // web frameworks
  [['react'], 'https://reactjs.org/'],
  [['vue'], 'https://vuejs.org/'],
  [['angular'], 'https://angular.io/'],
  // parsers
  [['bison'], 'https://www.gnu.org/software/bison/'],
  [['jison'], 'https://zaa.ch/jison/'],
  [['lalrpop'], 'https://lalrpop.github.io/lalrpop/'],
  [['nearley'], 'https://nearley.js.org/'],
  [['yaep'], 'https://github.com/vnmakarov/yaep'],
  [['parsec'], 'https://hackage.haskell.org/package/parsec'],
  [['megaparsec'], 'https://hackage.haskell.org/package/megaparsec'],
  [['attoparsec'], 'https://hackage.haskell.org/package/attoparsec'],
];
home += '<h5>frameworks and libraries</h5><ul>';
for (const [aliases, url] of libs) { home += `<li><a href="/${encodeURIComponent(aliases[0])}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = redirectd[alias.replace(/\s+/g, '')] = url; } }
home += '</ul>';
const organizations = [
  [['gnu'], 'https://www.gnu.org/home.en.html'],
  [['apache'], 'https://www.apache.org/'],
  [['free software foundation', 'fsf'], 'https://www.fsf.org/'],
  [['jetbrains'], 'https://www.jetbrains.com/'],
  [['microsoft', 'ms'], 'https://www.microsoft.com/'],
  [['amazon'], 'https://www.aboutamazon.com/'],
  [['ibm'], 'https://www.ibm.com/'],
  // research
  [['microsoft research', 'msr'], 'https://www.microsoft.com/en-us/research/'],
  [['inria'], 'https://www.inria.fr/en'],
  [['google atap', 'atap'], 'https://atap.google.com/'],
  [['battelle'], 'https://www.battelle.org/'],
  // hardware
  [['intel'], 'http://intel.com/'],
  [['amd'], 'https://www.amd.com/'],
  [['nvidia'], 'https://www.nvidia.com/'],
  // publishers
  [['oreilly'], 'https://www.oreilly.com/'],
  [['wiley'], 'https://www.wiley.com/'],
  [['jacaranda'], 'https://www.jacaranda.com.au/'],
  // tech
  [['apple'], 'https://www.apple.com/'],
  [['tesla'], 'https://www.tesla.com/'],
  [['spacex'], 'https://www.spacex.com/'],
];
home += '<h5>organizations (and companies)</h5><ul>';
for (const [aliases, url] of organizations) { home += `<li><a href="/${encodeURIComponent(aliases[0])}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = redirectd[alias.replace(/\s+/g, '')] = url; } }
home += '</ul>';
const competitions = [
  [['project euler', 'pe'], 'https://projecteuler.net/'],
  [['advent of code', 'aoc'], 'https://adventofcode.com/'],
  [['google code jam', 'code jam', 'gcj'], 'https://codingcompetitions.withgoogle.com/codejam'],
  [['codeforces'], 'http://codeforces.com/'],
  [['codewars'], 'https://www.codewars.com/'],
  [['code.golf', 'code golf', 'code-golf.io', 'codegolf.io', 'codegolfio', 'cgio'], 'https://code.golf/'],
  [['anarchy golf', 'anagol'], 'http://golf.shinh.org/'],
  [['vimgolf', 'vimg'], 'https://www.vimgolf.com/'],
  [['cssbattle', 'cssb'], 'https://cssbattle.dev/'],
];
home += '<h5>programming competitions</h5><ul>';
for (const [aliases, url] of competitions) { home += `<li><a href="/encodeURIComponent(aliases[0])}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = redirectd[alias.replace(/\s+/g, '')] = url; } }
home += '</ul>';
const misc = [
  [['sbcl'], 'http://www.sbcl.org/'],
  [['clhs'], 'http://www.lispworks.com/documentation/lw50/CLHS/Front/Contents.htm'],
  [['vtuber', 'virtual youtuber'], 'https://virtualyoutuber.fandom.com/wiki/Virtual_YouTuber_Wiki'],
  [['monokai'], 'https://monokai.pro/'],
  [['unicode'], 'https://shapecatcher.com/'],
  [['tryitonline', 'tio'], 'https://tio.run/'],
];
home += '<h5>misc</h5><ul>';
for (const [aliases, url] of misc) { home += `<li><a href="/${encodeURIComponent(aliases[0])}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = redirectd[alias.replace(/\s+/g, '')] = url; } }
home += '</ul>';

app.get('/', (req, res) => {
  res.send(home);
});

app.use((req, res, next) => {
  const url = decodeURIComponent(req.originalUrl.slice(1));
  console.log(url);
  if (url.toLowerCase() in redirectd) { res.redirect(redirectd[url.toLowerCase()]); return; }
  if (url.toLowerCase().replace(/_+/g, ' ') in redirectd) { res.redirect(redirectd[url.toLowerCase().replace(/_+/g, ' ')]); return; }
  next();
});

app.use((req, res, next) => {
  res.status(404).sendFile("pages/404.html", { root: __dirname });
})

app.listen(process.env.PORT);

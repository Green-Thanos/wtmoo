const fs = require('fs').promises,
  fsConst = require('fs').constants,
  fetch = require('node-fetch'),
  cookieParser = require('cookie-parser')//,
  //calc = require('mathjs').evaluate;


const app = require('express')();
app.use(cookieParser());

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

app.get('/helpvampire', (req, res) => res.sendFile('pages/vampire.html'));

app.get('/recursion', (req, res) => {
  res.send('see <a href="/recursion">recursion</a>');
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

app.get('/wtmoo.png', (req, res) => res.sendFile('wtmoo.png'));

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
  [['glitch', 'gl'], 'https://glitch.com/search?q=%q'],
  // repositories
  [['aur', 'yay', 'pacaur', 'aura', 'pakku', 'paru', 'pikaur', 'trizen'], 'https://aur.archlinux.org/packages/?K=%+q'],
  [['pypi', 'pip'], 'https://pypi.org/search/?q=%+q'],
  [['npm'], 'https://www.npmjs.com/search?q=%q'],
  [['yarn'], 'https://yarnpkg.com/?q=%q'],
  [['hoogle', 'hgl'], 'https://hoogle.haskell.org/?hoogle=%q'],
  [['nuget'], 'https://www.nuget.org/packages?q=%+q'],
  [['crates.io', 'cratesio', 'cio'], 'https://crates.io/search?q=%q'],
  [['cpan'], 'https://metacpan.org/search?q=%+q'],
  [['cran'], 'https://www.google.com/search?q=%+q&domains=r-project.org&sitesearch=r-project.org'],
  [['ubuntu packages', 'up', 'apt'], 'https://packages.ubuntu.com/search?keywords=%+q'],
  [['raku modules', 'rakumodules', 'rakum'], 'https://modules.raku.org/search/?q=%+q'],
  [['chocolatey', 'choco'], 'https://chocolatey.org/search?q=%+q'],
  // misc tech
  [['cpp reference', 'cppreference', 'cppr'], 'https://cppreference.com/mwiki/index.php?search=%+q'],
  [['archwiki', 'arch wiki', 'arch'], 'https://wiki.archlinux.org/index.php?search=%+q'],
  [['python 3', 'python3', 'python', 'py3', 'py'], 'https://docs.python.org/3/search.html?q=%+q'],
  [['python 2', 'python2', 'py2'], 'https://docs.python.org/2/search.html?q=%+q'],
  [['mdn'], 'https://developer.mozilla.org/en-US/search?q=%+q'],
  [['mercurial', 'merc', 'hg'], 'https://www.mercurial-scm.org/wiki/Mercurial?action=fullsearch&value=%+q'],
  [['esolang', 'eso'], 'https://esolangs.org/w/index.php?search=%+q'],
  [['raku'], 'https://www.google.com/search?q=site%3Adocs.raku.org+%q'],
  [['caniuse', 'ciu'], 'https://caniuse.com/?search=%q'],
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
];
let searchHome; fs.readFile('pages/search.html', 'utf8').then(text => searchHome = text.replace('$', JSON.stringify(engines)));
const engined = {};
const engineList = [];
for (const [aliases, url] of engines) { engineList.push(aliases[0]); for (const alias of aliases) { engined[alias] = url; } }

app.get('/favicon.ico', (req, res) => res.sendFile('favicon.ico'));

app.get('/q', (req, res) => {
  res.send(searchHome);
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

app.get('/pl/syntax', (req, res) => {
  res.redirect('http://rigaux.org/language-study/syntax-across-languages.html');
});

let home = '<meta name="viewport" content="width=device-width,initial-scale=1"><style>h1,h2,h3,h4,h5,h6{margin:0.5em 0;}ul{margin:0;padding-inline-start:20px;}</style><title>wtmoo is</title><a href="/">help</a><br><a href="https://glitch.com/edit/#!/wtmoo">source</a><br>';

const langs = [
  [['haskell', 'hs'], 'https://www.haskell.org/'],
  [['node.js', 'node', 'nodejs'], 'https://nodejs.org/'],
  [['go', 'golang'], 'https://golang.org/'],
  [['javascript', 'js'], 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
  [['c++', 'cpp', 'cplusplus'], 'https://www.cppreference.com/'],
  [['ada', 'adacore'], 'https://www.adacore.com/about-ada'],
  [['fortran'], 'https://gcc.gnu.org/fortran/'],
  [['scala'], 'https://www.scala-lang.org/'],
  [['kotlin'], 'https://kotlinlang.org/'],
  [['java'], 'https://www.java.com/'],
  [['python', 'py'], 'https://www.python.org/about/'],
  [['c#', 'csharp'], 'https://docs.microsoft.com/en-us/dotnet/csharp/'],
  [['f#', 'fsharp'], 'https://fsharp.org/'],
  [['q#', 'qsharp', 'qdk'], 'https://docs.microsoft.com/en-us/quantum/'],
  [['c#9', 'csharp9'], 'https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-9'],
  [['c#8', 'csharp8'], 'https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-8'],
  [['c#7', 'csharp7'], 'https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-7'],
  [['c#6', 'csharp6'], 'https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-6'],
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
  [['manjaro'], 'https://manjaro.org/'],
];
home += '<h5>linux distros</h5><ul>';
for (const [aliases, url] of distros) { home += `<li><a href="/${aliases[0]}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = url; } }
home += '</ul>';
const softwares = [
  [['curl'], 'https://curl.se/'],
  [['drupal'], 'https://www.drupal.org/'],
  [['laravel'], 'https://laravel.com/'],
  [['mongodb', 'mongo'], 'https://www.mongodb.com/'],
  [['sqlite'], 'https://www.sqlite.org/index.html'],
  [['mysql'], 'https://www.mysql.com/'],
];
home += '<h5>software</h5><ul>';
for (const [aliases, url] of softwares) { home += `<li><a href="/${aliases[0]}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = url; } }
home += '</ul>';
const organizations = [
  [['gnu'], 'https://www.gnu.org/home.en.html'],
  [['apache'], 'https://www.apache.org/'],
  [['free software foundation', 'freesoftwarefoundation', 'fsf'], 'https://www.fsf.org/'],
  [['jetbrains'], 'https://www.jetbrains.com/'],
  [['microsoft', 'ms'], 'https://www.microsoft.com/'],
  [['microsoft research', 'msr'], 'https://www.microsoft.com/en-us/research/'],
  [['google atap', 'atap'], 'https://atap.google.com/'],
  [['battelle'], 'https://www.battelle.org/'],
  [['intel'], 'http://intel.com/'],
  [['amd'], 'https://www.amd.com/'],
  [['nvidia'], 'https://www.nvidia.com/'],
];
home += '<h5>organizations (and companies)</h5><ul>';
for (const [aliases, url] of organizations) { home += `<li><a href="/${aliases[0]}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = url; } }
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

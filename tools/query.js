module.exports = function ({app}) {
  const engines = [
    // general
    [['google', 'g'], 'https://www.google.com/search?q=%+q'],
    [['bing', 'b'], 'https://www.bing.com/search?q=%+q'],
    [['duckduckgo', 'ddg'], 'https://duckduckgo.com/?q=%+q'],
    [['ecosia', 'ec'], 'https://www.ecosia.org/search?q=%+q'],
    [['lmgtfy'], 'https://lmgtfy.app/#gsc.q=%q'],
    [['wtmoo', 'wtm'], 'https://wtmoo.is/%q'],
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
    [['oeis'], 'http://oeis.org/search?q=%+q'],
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
  let searchHome; require('fs').promises.readFile('pages/search.html', 'utf8').then(text => searchHome = text.replace('$', JSON.stringify(engines)));
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
}
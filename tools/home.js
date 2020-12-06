module.exports = function (app, redirectd) {
  let home = '<meta content="wtmoo is wtmoo" property="og:title"><meta content="wtmoo" property="og:site_name"><meta content="https://wtmoo.is/wtmoo.png" property="og:image"><meta name="viewport" content="width=device-width,initial-scale=1"><style>h1,h2,h3,h4,h5,h6{margin:0.5em 0;}ul{margin:0;padding-inline-start:20px;}</style><title>wtmoo is</title><a href="/">help</a><br><a href="https://glitch.com/edit/#!/wtmoo">source</a><br>\
  powered by <a href="http://vanilla-js.com/"><img src="/images/vanillajs.png" style="vertical-align: middle;"></img></a><br>\
  <a href="/q">metasearch</a><br>\
  <a href="/q/list">list of search engines supported by metasearch</a><br>';

  const langs = [
    [['c', 'mr pant fave lang'], /*'http://www.open-std.org/jtc1/sc22/wg14/www/docs/n2479.pdf'*/ 'https://en.cppreference.com/w/c/language'],
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
  for (const [aliases, url] of competitions) { home += `<li><a href="/${encodeURIComponent(aliases[0])}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = redirectd[alias.replace(/\s+/g, '')] = url; } }
  home += '</ul>';
  const misc = [
    [['sbcl'], 'http://www.sbcl.org/'],
    [['clhs'], 'http://www.lispworks.com/documentation/lw50/CLHS/Front/Contents.htm'],
    [['vtuber', 'virtual youtuber'], 'https://virtualyoutuber.fandom.com/wiki/Virtual_YouTuber_Wiki'],
    [['monokai'], 'https://monokai.pro/'],
    [['unicode'], 'https://shapecatcher.com/'],
    [['tryitonline', 'tio'], 'https://tio.run/'],
    [['codegolf.stackexchange', 'codegolf.se', 'ppcg.se', 'ppcg', 'cgse'], 'https://codegolf.stackexchange.com/'],
  ];
  home += '<h5>misc</h5><ul>';
  for (const [aliases, url] of misc) { home += `<li><a href="/${encodeURIComponent(aliases[0])}">${aliases[0]}</a></li>`; for (const alias of aliases) { redirectd[alias] = redirectd[alias.replace(/\s+/g, '')] = url; } }
  home += '</ul>';

  app.get('/', (req, res) => {
    res.send(home);
  });
}

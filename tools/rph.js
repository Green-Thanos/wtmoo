module.exports = function (app) {
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

  function rph({name, site, domain, desc, desc2, color}) {
    const page = `<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>
<meta content="${desc}" property="og:description">${domain ? `
<meta content="${domain}" property="og:site_name">` : ''}
<meta content="https://wtmoo.is/images/rph/${name}.png" property="og:image">
<meta name="theme-color" content="#${color}">
<link type="application/json+oembed" href="https://wtmoo.is/rph/${name}.json" />${site ? `
<a href="${site}">${desc2}</a>` : desc2}`;
    const json = `{
  "author_name": "${name}",${site ? `
  "author_url": "${site}",` : ''}
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/${name}.png"
}`;
    app.get('/rph/' + name, (req, res) => res.send(page));
    app.get('/rph/' + name + '.json', (req, res) => {
      res.setHeader('content-type', 'application/json+oembed');
      res.send(json);
    });
  }

  app.get('/rph/bbworld', (req, res) => {
    res.send('<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>\
<meta content="godforsaken scratch shill" property="og:description">\
<meta content="https://wtmoo.is/images/rph/bbworld.png" property="og:image">\
<meta name="theme-color" content="#f6a21b">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/bbworld.json" />\
<a href="https://github.com/bbworld1">scratch cat\'s sockpuppet</a>');
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

  rph({name: 'phantz', site: 'https://github.com/TotallyNotChase', color: 'd07640', desc: 'also known as shirt (with a z)', desc2: 'martian pro gamer with a super shotgun (or two)'});
  rph({name: 'aplet', site: 'https://github.com/Aplet123', color: 'f1e05a', desc: 'ja🅱️a applet', desc2: 'jaba applet'});
  rph({name: 'arson', site: 'https://mee42.dev', domain: 'mee42.dev', color: 'b12a0b', desc: 'don\'t worry he\'s not actually an arsonist', desc2: 'not actually an arsonist'});
  rph({name: 'neko', site: 'https://skneko.moe', domain: 'skneko.moe', color: 'ad1457', desc: 'really a cat irl', desc2: 'a cat'});
  rph({name: 'phireh', color: 'a75aa8', desc: 'neko\'s friend idk', desc2: 'purple slime (he says it\'s a zergling but i\'m not sure i believe him)'});
  rph({name: 'λ', color: '5d8623', desc: 'god of the stateless', desc2: 'nerd that plays mtg and stuff'});
}

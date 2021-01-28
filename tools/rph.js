module.exports = (function () {
  // uhoh stinkers
  const people = {
    bbworld: {site: 'https://github.com/bbworld1', color: 'f6a21b', desc: 'godforsaken scratch shill', desc2: 'scratch cat\'s sockpuppet'},
    pankek: {site: 'https://github.com/somebody1234', color: '90f3ee', desc: 'lang developer of 0 languages', desc2: 'lang developer of 0 languages'},
    legendofmiracles: {color: '4475ae', desc: 'linux shill with edgy username', desc2: 'no miracles here unfortunately'},
    grian: {site: 'https://github.com/grian32', color: 'e6c296', desc: 'best kotlin shill', desc2: 'kotlin shill (don\'t fite him)'},
    rare: {site: 'https://github.com/neverRare', color: 'ffd966', desc: 'very rare', desc2: 'extra super duper rare'},
    phantz: {site: 'https://github.com/TotallyNotChase', color: 'd07640', desc: 'also known as shirt (with a z)', desc2: 'martian pro gamer with a super shotgun (or two)'},
    aplet: {site: 'https://aplet.me/', color: 'f1e05a', desc: 'ja🅱️a applet', desc2: 'jaba applet'},
    arson: {site: 'https://mee42.dev', domain: 'mee42.dev', color: 'b12a0b', desc: 'don\'t worry he\'s not actually an arsonist', desc2: 'not actually an arsonist'},
    neko: {site: 'https://skneko.moe', domain: 'skneko.moe', color: 'ad1457', desc: 'really a cat irl', desc2: 'a cat'},
    phireh: {color: 'a75aa8', desc: 'neko\'s friend idk', desc2: 'purple slime (he says it\'s a zergling but i\'m not sure i believe him)'},
    λ: {color: '5d8623', desc: 'god of the stateless', desc2: 'nerd that plays mtg and stuff'},
    // please make the sites show up for drain and hurb and qwerrtz like they do for arson thank you @ pankek ~ grian 
    drain: {site: 'https://github.com/adrian154', color: 'fcf5c7', desc: 'is literally a cat', desc2: 'neko also has this but neko fucking died so'},
    hurb: {site: 'https://github.com/Green-Thanos/', color: '3b8c34', desc: 'green thanos', desc2: 'green thanos? really?'},
    qwertz: {site: 'https://github.com/christusdsouza', color: '00ffbb', desc: 'plays football i guess', desc2: 'soccer'}
  };
  
  const rph = new require('express').Router();
  
  rph.get('/:name', (req, res, next) => {
    const isJson = req.params.name.endsWith('.json');
    const name = isJson ? req.params.name.replace(/\.json$/, '') : req.params.name;
    if (!(name in people)) {
      next();
    }
    const {site = null, domain, desc, desc2, color, image} = people[name];
    if (!isJson) {
      res.send(`<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}</style>
<meta content="${desc}" property="og:description">${domain ? `
<meta content="${domain}" property="og:site_name">` : ''}
<meta content="https://wtmoo.is/images/rph/${name}.png" property="og:image">
<meta name="theme-color" content="#${color}">
<link type="application/json+oembed" href="https://wtmoo.is/rph/${name}.json" />${site ? `
<a href="${site}">${desc2}</a>` : desc2}`);
    } else {
      res.setHeader('content-type', 'application/json+oembed');
      res.send(`{
  "author_name": "${name}",${site ? `
  "author_url": "${site}",` : ''}
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/${image || name  + '.png'}"
}`);
    }
  })
  
  rph.get('/', (req, res) => {
    res.send(`<style>body{font-family: Whitney, "Hind Light", "Ek Mukta", Cantarell, "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;}h1,h2,h3,h4,h5,h6,ul{margin:0;}</style>\
<meta content="very funny discord pls dont join" property="og:description">\
<meta content="https://wtmoo.is/images/rph/rph.webp" property="og:image">\
<meta name="theme-color" content="#7788cb">\
<link type="application/json+oembed" href="https://wtmoo.is/rph/rph.json" />\
<h4><a href="https://discord.gg/rph">discord</a></h4>\
<h4>users</h4>\
<ul>
${Object.keys(people).map(name => '<li><a href="/rph/' + name + '">' + name + '</a></li>').join('\n')}
</ul>`);
  });

  rph.get('/rph.json', (req, res) => {
    res.setHeader('content-type', 'application/json+oembed');
    res.send(`{
  "author_name": "r/ProgrammerHumor discord",
  "author_url": "https://discord.gg/rph",
  "cache_age": 300,
  "thumbnail_url": "https://wtmoo.is/images/rph/rph.webp"
}`);
  });
  
  return rph;
})();

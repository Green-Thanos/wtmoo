function lazy(name, fn) {
  Object.defineProperty(global, name, { get: () => { const val = fn(); Object.defineProperty(global, name, val); return val} });
}

const fetch = require('node-fetch');

/* globals turndown */
lazy('turndown', () => {
  const turndownService = new require('turndown')()
  return turndownService.turndown.bind(turndownService);
});

module.exports = function ({app}) {
  async function crateInfo(crate) {
    const req = await fetch('https://crates.io/api/v1/crates/' + crate);
    return await req.json();
  }

  app.get('/m/crates/:crate', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    const readmeReq = await fetch('https://crates.io' + info.versions[0].readme_path);
    const readme = await readmeReq.text();
    let result = `\
description: ${info.crate.description}
version: ${info.crate.newest_version}
downloads: ${info.crate.downloads}
`;
    result += turndown(readme.replace(/<a[^>]+><\/a>/g, ''));
    res.send(result);
  });

  app.get('/m/crates/:crate/readme', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    const readmeReq = await fetch('https://crates.io' + info.versions[0].readme_path);
    const readme = await readmeReq.text();
    res.send(turndown(readme.replace(/<a[^>]+><\/a>/g, '')));
  });

  app.get('/m/crates/:crate/:version/readme', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    const readmeReq = await fetch('https://crates.io' + info.versions.find(version => version.num === req.params.version).readme_path);
    const readme = await readmeReq.text();
    res.send(turndown(readme.replace(/<a[^>]+><\/a>/g, '')));
  });

  app.get('/m/crates/:crate/features', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    let result = '';
    for (const key in info.versions[0].features) {
      result += `${key} = [${info.versions[0].features[key].map(s => JSON.stringify(s)).join(', ')}]\n`;
    }
    res.send(result);
  });

  app.get('/m/crates/:crate/:version/features', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    let result = '';
    const version = info.versions.find(version => version.num === req.params.version);
    for (const key in version.features) {
      result += `${key} = [${version.features[key].map(s => JSON.stringify(s)).join(', ')}]\n`;
    }
    res.send(result);
  });

  app.get('/m/crates/:crate/versions', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    res.send(info.versions.map(version => version.num).join('\t'));
  });
}

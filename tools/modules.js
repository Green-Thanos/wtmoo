function lazy(name, fn) {
  Object.defineProperty(global, name, { get: () => { const val = fn(); Object.defineProperty(global, name, val); return val} });
}

const fetch = require('node-fetch');

/* globals turndown */
lazy('turndown', () => {
  const turndownService = new require('turndown')();
  // TODO: gfm tables not working?
  // turndownService.use(require('turndown-plugin-gfm').gfm);
  return turndownService.turndown.bind(turndownService);
});

module.exports = (function () {
  async function crateInfo(crate) {
    const req = await fetch('https://crates.io/api/v1/crates/' + crate);
    return await req.json();
  }

  function timeDelta(diff) {
    diff = 0|diff/60000;
    if (diff < 60) return diff === 0 ? '<1 minute' : diff === 1 ? '1 minute' : diff + ' minutes';
    diff = 0|diff/60;
    if (diff < 60) return diff === 1 ? '1 hour' : diff + ' hours';
    diff = 0|diff/24;
    if (diff < 30) return diff === 1 ? '1 day' : diff + ' days';
    if (diff < 365) return diff < 60 ? '1 month' : (0|diff/30) + ' months';
    return (0|diff/365) + ' years';
  }
  
  const m = new require('express').Router();

  m.get('/crates/:crate', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    const readmeReq = await fetch('https://crates.io' + info.versions[0].readme_path);
    const readme = await readmeReq.text();
    let result = `\
description: ${info.crate.description}
latest version: ${info.crate.newest_version}
last updated: ${timeDelta(new Date-new Date(info.crate.updated_at))} ago
downloads: ${info.crate.downloads}
readme:
`;
    result += turndown(readme.replace(/<a[^>]+>(.*?)<\/a>/g, '$1'));
    res.send(result);
  });

  m.get('/crates/:crate/readme', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    const readmeReq = await fetch('https://crates.io' + info.versions[0].readme_path);
    const readme = await readmeReq.text();
    res.send(turndown(readme.replace(/<a[^>]+>(.*?)<\/a>/g, '$1')));
  });

  m.get('/crates/:crate/:version/readme', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    const readmeReq = await fetch('https://crates.io' + info.versions.find(version => version.num === req.params.version).readme_path);
    const readme = await readmeReq.text();
    res.send(turndown(readme.replace(/<a[^>]+>(.*?)<\/a>/g, '$1')));
  });

  m.get('/crates/:crate/features', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    let result = '';
    for (const key in info.versions[0].features) {
      result += `${key} = [${info.versions[0].features[key].map(s => JSON.stringify(s)).join(', ')}]\n`;
    }
    res.send(result);
  });

  m.get('/crates/:crate/:version/features', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    let result = '';
    const version = info.versions.find(version => version.num === req.params.version);
    for (const key in version.features) {
      result += `${key} = [${version.features[key].map(s => JSON.stringify(s)).join(', ')}]\n`;
    }
    res.send(result);
  });

  m.get('/crates/:crate/versions', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    res.send(info.versions.map(version => version.num).join('\t'));
  });

  m.get('/crates/:crate/docs', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    const docsReq = await fetch(info.crate.documentation);
    const docs = await docsReq.text();
    res.send(turndown(docs
      .replace(/^.+<section id="main" class="content">/s, '')
      .replace(/<section id="search" class="content hidden">.+$/s, '')
      .replace(/<\/td>\s*?<td.*?>/g, ';;NL;;')
      .replace(/<td.*?>(.*?)<\/td>/gs, (m, g1) => '<td>' + g1.replace(/<\/?p>/g, '') + '</td>')
      .replace(/<a.*?>(.*?)<\/a>/g, '$1')
      .replace(/<span.*?>\[.+?\]\s*?<\/span>\s*?\[src\]/g, '')
    )
      .replace(/;;NL;;/g, '\n')
      .replace(/\\_/g, '_'));
  });
  
  return m;
})();

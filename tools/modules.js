const turndown = new require('turndown')(),
  fetch = require('node-fetch');

module.exports = function ({app}) {
  async function crateInfo(crate) {
    return await fetch('https://crates.io/api/v1/crates/' + crate);
  }
  app.get('/m/crates/:crate', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
  });

  app.get('/m/crates/:crate/readme', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
  });

  app.get('/m/crates/:crate/features', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    const info = await crateInfo(req.params.crate);
    const result = '';
    for (const key in info.features) {
      result += `${key} = [${info.features[key].map(s => JSON.stringify(s)).join(', ')}]\n`;
    }
    res.send(result);
  });
}

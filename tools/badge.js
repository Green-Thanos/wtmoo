module.exports = (function () {
  const badge = new require('express').Router();
  
  function getQS(url) { return url.includes('?') ? url.slice(url.indexOf('?') + 1) : null; }
  
  badge.get('/gh/:user', (req, res) => {
    // TODO
    const qs = getQS(req.originalUrl);
    res.send(`<meta content="https://github-readme-stats.vercel.app/api?username=${req.params.user}${qs ? '&'+qs : ''}${req.query.theme ? '' : '&theme=prussian'}" property="og:image">`);
  });
  badge.get('/gh/:user/:repo', (req, res) => {
    // TODO
    const qs = getQS(req.originalUrl);
    res.send(`<meta content="https://github-readme-stats.vercel.app/api?username=${req.params.user}&repo=${req.params.repo}${qs ? '&'+qs : ''}${req.query.theme ? '' : '&theme=prussian'}" property="og:image">`);
  });
  
  badge.get('/github/*', (req, res) => {
    res.redirect(req.originalUrl.replace('github', 'gh'));
  });
  badge.get('/ghlangs/:user', (req, res) => {
    // TODO
    const qs = getQS(req.originalUrl);
    res.send(`<meta content="https://github-readme-stats.vercel.app/api/top-langs/?username=${req.params.user}${qs ? '&'+qs : ''}${req.query.theme ? '' : '&theme=prussian'}" property="og:image">`);
  });
  badge.get('/ghtrophy/:user', (req, res) => {
    // TODO
    const qs = getQS(req.originalUrl);
    res.send(`<meta content="https://github-profile-trophy.vercel.app/api?username=${req.params.user}${qs ? '&'+qs : ''}${req.query.column ? '' : '&column=7'}${req.query.theme ? '' : '&theme=prussian'}" property="og:image">`);
  });
  
  return badge;
})();

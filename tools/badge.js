module.exports = function ({app, getQS}) {
  app.get('/badge/gh/:user', (req, res) => {
    // TODO
    const qs = getQS(req.originalUrl);
    res.send(`<meta content="https://github-readme-stats.vercel.app/api?username=${req.params.user}${qs ? '&'+qs : ''}${req.query.theme ? '' : '&theme=prussian'}" property="og:image">`);
  });
  app.get('/badge/gh/:user/:repo', (req, res) => {
    // TODO
    const qs = getQS(req.originalUrl);
    res.send(`<meta content="https://github-readme-stats.vercel.app/api?username=${req.params.user}&repo=${req.params.repo}${qs ? '&'+qs : ''}${req.query.theme ? '' : '&theme=prussian'}" property="og:image">`);
  });
  
  app.get('/badge/github/*', (req, res) => {
    const url = req.originalUrl.slice('/badge/github/'.length);
    res.redirect('/badge/gh/' + url);
  });
  app.get('/badge/ghlangs/:user', (req, res) => {
    // TODO
    const qs = getQS(req.originalUrl);
    res.send(`<meta content="https://github-readme-stats.vercel.app/api/top-langs/?username=${req.params.user}${qs ? '&'+qs : ''}${req.query.theme ? '' : '&theme=prussian'}" property="og:image">`);
  });
  app.get('/badge/ghtrophy/:user', (req, res) => {
    // TODO
    const qs = getQS(req.originalUrl);
    res.send(`<meta content="https://github-profile-trophy.vercel.app/api?username=${req.params.user}${qs ? '&'+qs : ''}${req.query.column ? '' : '&column=7'}${req.query.theme ? '' : '&theme=prussian'}" property="og:image">`);
  });
}

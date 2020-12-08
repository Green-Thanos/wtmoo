module.exports = function ({app, getQS}) {
  app.get('/badge/gh/:user', (req, res) => {
    // TODO
    const qs = getQS(req.originalUrl);
    res.send(`<meta content="https://github-readme-stats.vercel.app/api?username=${req.query.user}?{qs || ''}{req.query.theme ? '' : '&theme=prussian'}" property="og:image">`);
  });
  app.get('/badge/gh/:user/:repo', (req, res) => {
    // TODO
    const qs = getQS(req.originalUrl);
    res.send(`<meta content="https://github-readme-stats.vercel.app/api?username=${req.query.user}?{qs || ''}{req.query.theme ? '' : '&theme=prussian'}" property="og:image">`);
  });
  
  app.get('/badge/github/*', (req, res) => {
    const url = req.originalUrl.slice('/badge/github/'.length);
    res.redirect('/badge/gh/' + url);
  });
  
  // https://github-profile-trophy.vercel.app/?username=somebody1234&column=7&theme=monokai
}

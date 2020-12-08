module.exports = function ({app}) {
  app.get('/embed', (req, res) => {
    res.send(
      '<head>' +
        (req.query.title || req.query.t ? `<meta content="${req.query.title || req.query.t}" property="og:title">` : '') +
        (req.query.site || req.query.s ? `<meta content="${req.query.site || req.query.s}" property="og:site_name">` : '') +
        (req.query.description || req.query.desc || req.query.d ? `<meta content="${req.query.description || req.query.desc || req.query.d}" property="og:description">` : '') +
        (req.query.image || req.query.i ? `<meta content="${req.query.image || req.query.i}" property="og:image">` : '') +
        (req.query.imageUrl || req.query.imageurl || req.query.iu ? `<meta content="${req.query.imageurl || req.query.imageUrl || req.query.iu}" property="og:image">` : '') +
        (req.query.color || req.query.c ? `<meta name="theme-color" content="#${req.query.color || req.query.c}">` : '') + 
      '</head>'
    );
  });
}

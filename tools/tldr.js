module.exports = (function () {
  const tldr = new require('express').Router();
  
  tldr.use(require('express').static('../pages/tldr/'));
  
  function http2(req, res) { res.sendFile('pages/tldr/http2.html', { root: __dirname.replace(/\/[^/]+$/, '') }); }
  tldr.get('/http2', http2);
  tldr.get('/http/2', http2);
  tldr.get('/http/2.0', http2);
  tldr.get('/rfc7540', http2);
  tldr.get('/rfc/7540', http2);
  
  return tldr;
})();

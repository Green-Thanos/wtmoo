const dns = require("dns").promises;
const dns_ = require("dns");
const dnsErrors = {};
for (const k in dns_) { if (/^[A-Z]+$/.test(k)) { dnsErrors[dns_[k]] = k; } }

module.exports = function (app) {
  async function reverseDNS(req, res) {
    res.setHeader('content-type', 'text/plain');
    try {
      const servers = await dns.reverse(req.params.ip);
      res.send(servers.join('\n'));
    } catch (e) {
      res.status(404).send('error: ' + dnsErrors[e.code]);
    }
  }
  app.get('/rdns/:ip', reverseDNS);
  app.get('/reversedns/:ip', reverseDNS);

  async function listDNS(req, res) {
    res.setHeader('content-type', 'text/plain');
    const servers = await dns.getServers();
    res.send(servers.join('\n'));
  }
  app.get('/dns', listDNS);
}

const dns = require("dns").promises;
const dnsErrors = {};
for (const k in require("dns")) { if (/^[A-Z]+$/.test(k)) { dnsErrors[require("dns")[k]] = k; } }

module.exports = function ({app, text}) {
  async function reverseDNS(req, res) {
    try {
      const servers = await dns.reverse(req.params.ip);
      text(req, res, servers.join('\n'));
    } catch (e) {
      text(req, res, 'error: ' + dnsErrors[e.code], 404);
    }
  }
  app.get('/rdns/:ip', reverseDNS);
  app.get('/reversedns/:ip', reverseDNS);

  async function forwardDNS(req, res) {
    try {
      const addresses = await dns.lookup(req.params.ip, { all: true, verbatim: true });
      text(req, res, addresses.map(a => a.address).join('\n'));
    } catch (e) {
      text(req, res, 'error: ' + dnsErrors[e.code], 404);
    }
  }
  app.get('/dns/:ip', forwardDNS);
  app.get('/fdns/:ip', forwardDNS);
  app.get('/forwarddns/:ip', forwardDNS);

  async function listDNS(req, res) {
    const servers = await dns.getServers();
    text(req, res, servers.join('\n'));
  }
  app.get('/dns', listDNS);
  app.get('/dns/list', listDNS);
  app.get('/listdns', listDNS);
}

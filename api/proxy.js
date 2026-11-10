// Vercel function: fetches Raydium LaunchLab and DexScreener data for the site
// when a browser can't call them directly (CORS). Only these two hosts are allowed.
const ALLOW = ["launch-mint-v1.raydium.io", "api.dexscreener.com"];

module.exports = async (req, res) => {
  let target;
  try { target = new URL(String((req.query && req.query.u) || "")); }
  catch (e) { res.status(400).json({ error: "bad url" }); return; }
  if (target.protocol !== "https:" || !ALLOW.includes(target.hostname)) {
    res.status(400).json({ error: "host not allowed" });
    return;
  }
  try {
    const r = await fetch(target.toString(), { headers: { accept: "application/json" } });
    const body = await r.text();
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.setHeader("cache-control", "s-maxage=20, stale-while-revalidate=60");
    res.status(r.status).send(body);
  } catch (e) {
    res.status(502).json({ error: "upstream failed" });
  }
};

const { chromium } = require('playwright');
const th = require('./themes10.cjs').ibonInicio;
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 2, serviceWorkers: 'block' }); const p = await ctx.newPage();
  await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  await p.route(/paisajes\.js/, r => r.fulfill({ body: '', contentType: 'text/javascript' })); // sin cumbres: mapa base
  await p.goto('http://localhost:8765/', { waitUntil: 'networkidle' });
  await p.evaluate(() => { localStorage.clear(); });
  await p.reload({ waitUntil: 'networkidle' });
  await p.evaluate(() => { S.welcomed = true; save(); });
  await p.reload({ waitUntil: 'networkidle' });
  await p.addStyleTag({ content: th.css }); await p.waitForTimeout(300);
  await p.evaluate("(()=>{"+th.js+"})()");
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
  await p.screenshot({ path: 'rio-ibon-inicio.png' }); await b.close();
})();

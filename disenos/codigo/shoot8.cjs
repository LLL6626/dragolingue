const { chromium } = require('playwright');
const T = require('./themes8.cjs');
(async () => {
  const b = await chromium.launch();
  for (const [name, th] of Object.entries(T)) {
    const p = await b.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 2 });
    const errs=[]; p.on('pageerror', e => errs.push(e.message));
    await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
    await p.goto('http://localhost:8765/', { waitUntil: 'networkidle' });
    await p.evaluate(() => { S.welcomed = true; S.done[lk(0,0)] = true; S.done[lk(0,1)] = true; S.done[lk(0,2)] = true; S.done[lk(1,0)] = true; save(); });
    await p.reload({ waitUntil: 'networkidle' });
    await p.addStyleTag({ content: th.css });
    await p.waitForTimeout(300);
    await p.evaluate("(()=>{"+th.js+"})()");
    await p.evaluate(() => { const h = document.querySelectorAll('.unit')[1]; window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 70); });
    await p.waitForTimeout(500);
    await p.screenshot({ path: `m8-${name}.png` });
    if (errs.length) console.log(name, errs);
    await p.close();
  }
  await b.close();
})();

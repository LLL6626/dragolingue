const { chromium } = require('playwright');
const th = require('./themes9.cjs').nacimiento;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 1180 }, deviceScaleFactor: 2 });
  await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  await p.goto('http://localhost:8765/', { waitUntil: 'networkidle' });
  await p.evaluate(() => { S.welcomed = true; UNITS.forEach((U,u)=>{ if(u<9) U.lessons.forEach((_,l)=>S.done[lk(u,l)]=true); }); S.done[lk(9,0)] = true; save(); });
  await p.reload({ waitUntil: 'networkidle' });
  await p.addStyleTag({ content: th.css }); await p.waitForTimeout(300);
  await p.evaluate("(()=>{"+th.js+"})()");

  await p.evaluate(() => {
    const last = [...document.querySelectorAll('.unit')].pop();
    const W = last.querySelector('.path').clientWidth;
    const stone = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="30" ry="22" fill="#B7B1A3" stroke="rgba(60,50,30,.2)" stroke-width="2"/><path d="M${x-6} ${y-2} h12 v8 h-12z M${x-4} ${y-2} v-4 a4 4 0 0 1 8 0 v4" fill="none" stroke="#fff" stroke-width="2.4"/>`;
    last.insertAdjacentHTML('afterend', `<section class="unit" style="opacity:.96">
      <div class="unit-head" style="background:#3D6A7D"><div><div class="num">UNIDAD 11 · PRÓXIMAMENTE</div><h2 style="margin:0">El río baja de la montaña</h2></div></div>
      <div class="path" style="height:250px;background:linear-gradient(#A9C98A,#93BA7E)">
        <svg style="position:absolute;inset:0;width:100%;height:100%;z-index:-1" viewBox="0 0 ${W} 250">
          <path d="M186 -20 C190 40 120 70 130 130 S220 200 200 270" stroke="#B8B1A0" stroke-width="64" fill="none" stroke-linecap="round"/>
          <path d="M186 -20 C190 40 120 70 130 130 S220 200 200 270" stroke="#6DB9DC" stroke-width="48" fill="none" stroke-linecap="round"/>
          <path d="M186 -20 C190 40 120 70 130 130 S220 200 200 270" stroke="#A9DAEE" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="2 18"/>
          ${stone(160, 70)}${stone(150, 185)}
          <g transform="translate(40,120)"><rect x="-2" y="6" width="4" height="8" fill="#5A3E26"/><path d="M0 -20 L12 8 H-12Z" fill="#2F6B3A"/><path d="M0 -28 L9 -6 H-9Z" fill="#3A7D45"/></g>
          <g transform="translate(300,80)"><rect x="-2" y="6" width="4" height="8" fill="#5A3E26"/><path d="M0 -20 L12 8 H-12Z" fill="#2F6B3A"/><path d="M0 -28 L9 -6 H-9Z" fill="#3A7D45"/></g>
          <g transform="translate(320,200)"><ellipse cx="0" cy="0" rx="12" ry="7" fill="#A9A49A"/></g>
        </svg></div></section>`);
  });
  await p.evaluate(() => { const h = document.querySelectorAll('.unit')[9]; window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 20); });
  await p.waitForTimeout(500); await p.screenshot({ path: 'unidad10-nace-el-rio.png' }); await b.close();
})();

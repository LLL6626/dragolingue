// Tres propuestas más. Cada una: CSS encima de la app + un pequeño script que coloca el recorrido.
const base = `
:root{--f-display:"Inter Display","Inter",sans-serif;--f-body:"Inter",sans-serif}
.proto-note{display:none}
.big-btn{text-transform:none;letter-spacing:0;font-size:1.1rem;box-shadow:none}
.card,.opt,.tile,.mbtn{box-shadow:none}
`;
module.exports = {
  // D · Río: el recorrido es un río y cada lección una piedra para cruzarlo
  rio: {
    css: base + `
:root{--ok:#2E7FA8;--ok-soft:#E1F1F8;--bg:#F4F1E8;--line:#DED8C8;--agua:#7CC3E0;--agua2:#B9E1F0}
.big-btn{background:#2E7FA8;border-radius:14px}
.selected{border-color:#2E7FA8!important;background:#E1F1F8!important;box-shadow:none!important}
.progress i{background:linear-gradient(90deg,#7CC3E0,#2E7FA8)}
.unit-head{background:#3B6E8F;border-radius:16px}
.path{gap:34px;padding-block:30px 30px;isolation:isolate}
.river{position:absolute;inset:0;width:100%;height:100%;z-index:-1;overflow:hidden}
.path{overflow:hidden}
.node{width:78px;height:62px;box-shadow:0 4px 0 rgba(60,50,30,.25),inset 0 -6px 0 rgba(0,0,0,.08);
  border-radius:52% 48% 46% 54% / 58% 52% 48% 42%;background:#B7B1A3;border:2px solid rgba(60,50,30,.15)}
.stop:nth-child(3n+2) .node{border-radius:46% 54% 58% 42% / 50% 44% 56% 50%;width:74px}
.stop:nth-child(3n) .node{border-radius:58% 42% 50% 50% / 46% 58% 42% 54%;width:82px}
.node.done{background:#D9B44A}
.node.current{background:#C8402F}
.node.current::after{border-radius:inherit;border-color:#fff;opacity:.6}
.node-label{background:rgba(244,241,232,.92);padding:2px 8px;border-radius:8px;margin-top:8px;color:#3B4A55}
.start-bubble{background:#C8402F;color:#fff;border:none}
.tab[aria-selected="true"]{color:#2E7FA8;background:#E1F1F8;border-color:transparent}
`,
    js: `document.querySelectorAll('.path').forEach(p=>{
      p.querySelectorAll('.stop').forEach((s,i)=>{const off=Math.round(Math.sin(i*1.1+0.6)*55);s.style.transform='translateX('+off+'px)';});
      const r=p.getBoundingClientRect();const pts=[...p.querySelectorAll('.node')].map(n=>{const b=n.getBoundingClientRect();return [b.left-r.left+b.width/2,b.top-r.top+b.height/2]});
      pts.unshift([pts[0][0]-30,-60]);pts.push([pts[pts.length-1][0]+30,r.height+60]);
      let d='M'+pts[0];for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],m=(a[1]+b[1])/2;d+=' C'+a[0]+','+m+' '+b[0]+','+m+' '+b[0]+','+b[1];}
      p.insertAdjacentHTML('afterbegin','<svg class="river" viewBox="0 0 '+r.width+' '+r.height+'" preserveAspectRatio="none"><path d="'+d+'" fill="none" stroke="#7CC3E0" stroke-width="96" stroke-linecap="round"/><path d="'+d+'" fill="none" stroke="#B9E1F0" stroke-width="40" stroke-linecap="round" stroke-dasharray="2 26" opacity=".9"/></svg>');
    });`
  },

  // E · Cumbres: cada unidad es una montaña; las lecciones suben por la ladera y el repaso es la cima
  cumbres: {
    css: base + `
:root{--ok:#2F5D7C;--ok-soft:#E3EEF5;--bg:#EEF3F6;--line:#D5DFE6}
.big-btn{background:#2F5D7C;border-radius:12px}
.selected{border-color:#2F5D7C!important;background:#E3EEF5!important;box-shadow:none!important}
.progress i{background:#2F5D7C}
.unit-head{background:#2F5D7C;border-radius:16px 16px 0 0}
.path{display:block;height:300px;padding:0;margin-bottom:22px;border-radius:0 0 16px 16px;overflow:hidden;
  background:linear-gradient(#DCEBF4,#F4F8FA)}
.mtn{position:absolute;inset:0;width:100%;height:100%}
.stop{position:absolute!important;transform:none!important;margin:0!important}
.node{width:56px;height:56px;box-shadow:0 3px 0 rgba(0,0,0,.2);border:3px solid #fff}
.node svg{width:24px;height:24px}
.node.current::after{inset:-8px}
.node-label{margin-top:6px;font-size:.74rem;background:rgba(255,255,255,.85);padding:1px 6px;border-radius:6px;color:#22394A}
.start-bubble{background:#C8231B;color:#fff;border:none;border-radius:8px}
.mascot-on-path{display:none}
.tab[aria-selected="true"]{color:#2F5D7C}
`,
    js: `document.querySelectorAll('.path').forEach(p=>{
      p.insertAdjacentHTML('afterbegin','<svg class="mtn" viewBox="0 0 360 300" preserveAspectRatio="none"><path d="M0 300 L0 230 L60 200 L110 215 L190 120 L230 140 L290 40 L330 75 L360 60 L360 300Z" fill="#B9CFDC"/><path d="M0 300 L0 260 L80 230 L150 245 L230 170 L300 190 L360 160 L360 300Z" fill="#8FB0C3"/><path d="M290 40 L270 72 L284 66 L292 80 L304 62 L316 70Z" fill="#fff"/><path d="M40 268 C110 250 120 210 180 196 S250 150 270 110 S290 60 292 46" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round"/></svg>');
      const S=[...p.querySelectorAll('.stop')],n=S.length;
      const spots=n===3?[[12,72],[45,48],[78,8]]:[[17,72],[40,54],[61,34],[81,8]];
      S.forEach((s,i)=>{s.style.left=spots[i][0]+'%';s.style.top=spots[i][1]+'%';s.style.translate='-50% 0';});
      S[n-1].querySelector('.node').insertAdjacentHTML('afterend','<span style="position:absolute;top:-22px;left:50%;font-size:22px">🚩</span>');
    });`
  },

  // F · Índice: cada unidad es una tarjeta con sus lecciones en fila, como los pasos de un curso
  indice: {
    css: base + `
:root{--ok:#C8231B;--ok-soft:#FBE3E0;--bg:#F6F4EE;--line:#E2DDD0}
.big-btn{background:#C8231B;border-radius:12px}
.selected{border-color:#C8231B!important;background:#FBE3E0!important;box-shadow:none!important}
.progress i{background:#F2B200}
.section-label{color:#C8231B}
.unit{background:var(--surface);border:2px solid var(--line);border-radius:20px;overflow:hidden;margin-bottom:16px}
.unit-head{border-radius:0;background:var(--surface);color:var(--ink);border-bottom:2px solid var(--line);position:relative;padding-left:72px}
.unit-head::before{content:"";position:absolute;left:14px;top:14px;width:46px;height:46px;border-radius:12px;background:url(web/img/dragolingue.jpg) center/cover,#F2B200}
.unit-head .num{color:#C8231B;opacity:1}
.unit-head .tip-btn{border-color:var(--line);color:#2F5D7C}
.path{flex-direction:row;align-items:flex-start;justify-content:space-between;gap:0;padding:18px 12px 14px}
.path::before{content:"";position:absolute;left:44px;right:44px;top:41px;height:4px;background:var(--line);border-radius:4px}
.stop{transform:none!important;margin:0!important;flex:1}
.node{width:48px;height:48px;box-shadow:none;border:3px solid var(--surface)}
.node svg{width:22px;height:22px}
.node.current::after{inset:-7px}
.node-label{margin-top:8px;font-size:.72rem;white-space:normal;text-align:center;max-width:82px;color:var(--ink)}
.start-bubble{display:none}
.mascot-on-path{display:none}
.tab[aria-selected="true"]{color:#C8231B;background:#FBE3E0;border-color:transparent}
`,
    js: ``
  },
};

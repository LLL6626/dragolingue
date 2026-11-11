const T2 = require('./themes2.cjs');
const rio = T2.rio;
// Decoración del campo: árboles, matas y flores en SVG, a los lados del río
const deco = `
function tree(x,y,s,c){return '<g transform="translate('+x+','+y+') scale('+s+')"><rect x="-3" y="0" width="6" height="16" rx="2" fill="#7A5534"/><circle cx="0" cy="-8" r="14" fill="'+c+'"/><circle cx="-9" cy="-1" r="10" fill="'+c+'"/><circle cx="9" cy="-1" r="10" fill="'+c+'"/></g>'}
function pine(x,y,s){return '<g transform="translate('+x+','+y+') scale('+s+')"><rect x="-3" y="8" width="6" height="10" fill="#6B4A2E"/><path d="M0 -26 L16 10 H-16Z" fill="#2F6B3A"/><path d="M0 -36 L12 -8 H-12Z" fill="#3A7D45"/></g>'}
function flower(x,y,c){return '<g transform="translate('+x+','+y+')"><circle r="3.2" fill="'+c+'"/><circle r="1.4" fill="#FFE27A"/></g>'}
function tuft(x,y){return '<path d="M'+(x-6)+' '+y+' q3 -10 6 0 q3 -12 6 0" stroke="#4E9A4A" stroke-width="2" fill="none"/>'}
function decorate(p,riverX,opts){
  const r=p.getBoundingClientRect(),W=r.width,H=r.height;let g='';let seed=7+H;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
  const far=(x,y)=>Math.abs(x-riverX(y))>92&&x>14&&x<W-14;
  for(let i=0;i<Math.round(H/(opts.density||55));i++){const y=30+rnd()*(H-40),x=rnd()*W;if(!far(x,y))continue;g+=rnd()<(opts.pines||.5)?pine(x,y,.8+rnd()*.5):tree(x,y,.9+rnd()*.5,(opts.trees||['#5FAE57','#4C9A4B'])[Math.floor(rnd()*(opts.trees||[1,1]).length)]);}
  for(let i=0;i<Math.round(H/12);i++){const y=rnd()*H,x=rnd()*W;if(Math.abs(x-riverX(y))<62)continue;g+=rnd()<.55?tuft(x,y):flower(x,y,opts.flowers[Math.floor(rnd()*opts.flowers.length)]);}
  return g;
}`;
function rioJs(opts){ return deco + `
document.querySelectorAll('.path').forEach(p=>{
  p.querySelectorAll('.stop').forEach((s,i)=>{const off=Math.round(Math.sin(i*1.1+0.6)*55);s.style.transform='translateX('+off+'px)';});
  const r=p.getBoundingClientRect();const pts=[...p.querySelectorAll('.node')].map(n=>{const b=n.getBoundingClientRect();return [b.left-r.left+b.width/2,b.top-r.top+b.height/2]});
  pts.unshift([pts[0][0]-30,-60]);pts.push([pts[pts.length-1][0]+30,r.height+60]);
  let d='M'+pts[0];for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],m=(a[1]+b[1])/2;d+=' C'+a[0]+','+m+' '+b[0]+','+m+' '+b[0]+','+b[1];}
  const rx=y=>{for(let i=1;i<pts.length;i++){if(y<=pts[i][1]){const a=pts[i-1],b=pts[i],t=(y-a[1])/(b[1]-a[1]||1);return a[0]+(b[0]-a[0])*(3*t*t-2*t*t*t)}}return pts[pts.length-1][0]};
  p.insertAdjacentHTML('afterbegin','<svg class="river" viewBox="0 0 '+r.width+' '+r.height+'" preserveAspectRatio="none">'
   +'<path d="'+d+'" fill="none" stroke="${opts.bank}" stroke-width="118" stroke-linecap="round"/>'
   +'<path d="'+d+'" fill="none" stroke="#6DB9DC" stroke-width="92" stroke-linecap="round"/>'
   +'<path d="'+d+'" fill="none" stroke="#A9DAEE" stroke-width="40" stroke-linecap="round" stroke-dasharray="2 26" opacity=".9"/>'
   +decorate(p,rx,${JSON.stringify(opts)})+'</svg>');
});`; }
const fieldCss = (grass1, grass2) => `
.path{margin:0 0 22px;padding-inline:0;border-radius:0 0 16px 16px!important;background:
  radial-gradient(circle at 20% 30%,rgba(255,255,255,.10) 0 2px,transparent 3px) 0 0/34px 34px,
  linear-gradient(${grass1},${grass2})}
.unit{margin-bottom:0}
.unit-head{border-radius:16px 16px 0 0;margin-bottom:0;box-shadow:0 3px 0 rgba(0,0,0,.12);position:relative;z-index:1}
.node-label{background:rgba(255,255,255,.9)}
.node{box-shadow:0 5px 0 rgba(30,50,20,.35),inset 0 -6px 0 rgba(0,0,0,.08)}
.mascot-on-path{filter:drop-shadow(0 4px 2px rgba(0,0,0,.25))}
`;
module.exports = {
  // G · Río en el prado (la D con campo verde)
  prado: { css: rio.css + fieldCss('#9FD07E', '#86C267') + `.unit-head{background:#3B6E8F}`,
           js: rioJs({ bank: '#D9C9A0', flowers: ['#fff', '#F7D04A', '#F29BB5'] }) },
  // H · Río en el prado con los colores de Aragón (Señera)
  pradoSenera: { css: rio.css + fieldCss('#A8D483', '#8CC46B') + `
:root{--ok:#B8860B;--ok-soft:#FFF4CF}
.unit-head{background:linear-gradient(90deg,var(--rojo) 0 82%,var(--oro) 82% 86%,var(--rojo) 86% 90%,var(--oro) 90% 94%,var(--rojo) 94%)}
.big-btn{background:var(--rojo)}.checkbar.ok .big-btn{background:#B8860B}
.selected{border-color:var(--rojo)!important;background:var(--rojo-soft)!important}
.progress i{background:repeating-linear-gradient(90deg,var(--oro) 0 14px,var(--rojo) 14px 28px)}
.node.done{background:#F2B200}.node.current{background:#C8231B}
.tab[aria-selected="true"]{color:var(--rojo);background:var(--rojo-soft)}`,
           js: rioJs({ bank: '#CDBB8E', flowers: ['#fff', '#F2B200', '#C8231B'] }) },
  // I · Río en otoño, al atardecer: el mismo río con otro ambiente (ocres y rojos)
  otono: { css: rio.css + fieldCss('#E7C98A', '#D9B26A') + `
:root{--bg:#FBF3E4}
.unit-head{background:#8A4B2A}
.big-btn{background:#8A4B2A}.checkbar.ok .big-btn{background:#8A4B2A}
:root{--ok:#8A4B2A;--ok-soft:#F6E5D3}
.selected{border-color:#8A4B2A!important;background:#F6E5D3!important}
.progress i{background:linear-gradient(90deg,#E39B3B,#8A4B2A)}
.tab[aria-selected="true"]{color:#8A4B2A;background:#F6E5D3}`,
           js: rioJs({ bank: '#C9A26B', flowers: ['#C8402F', '#E39B3B', '#fff'], trees: ['#E8B62C','#F2C94C','#C8402F','#D9822B','#B8502A','#6FA84F','#4C9A4B'], pines: .15, density: 16 }) },
};

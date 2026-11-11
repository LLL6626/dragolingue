// Diez paisajes alrededor del río. Misma base que G e I; cambia el fondo, las orillas, el agua y lo que hay en el campo.
const rio = require('./themes2.cjs').rio;

const fieldCss = (bg, head, btn, soft) => `
.path{margin:0 0 22px;padding-inline:0;border-radius:0 0 16px 16px!important;background:${bg}}
.unit{margin-bottom:0}
.unit-head{border-radius:16px 16px 0 0;margin-bottom:0;box-shadow:0 3px 0 rgba(0,0,0,.12);position:relative;z-index:1;background:${head}}
.node-label{background:rgba(255,255,255,.92)}
.node{box-shadow:0 5px 0 rgba(30,50,20,.35),inset 0 -6px 0 rgba(0,0,0,.08)}
.mascot-on-path{filter:drop-shadow(0 4px 2px rgba(0,0,0,.25))}
:root{--ok:${btn};--ok-soft:${soft}}
.big-btn,.checkbar.ok .big-btn{background:${btn}}
.selected{border-color:${btn}!important;background:${soft}!important}
.progress i{background:${btn}}
.tab[aria-selected="true"]{color:${btn};background:${soft};border-color:transparent}
`;

// Biblioteca de dibujos (SVG) y colocación alrededor del río
const lib = String.raw`
const G=(x,y,s,inner)=>'<g transform="translate('+x.toFixed(1)+','+y.toFixed(1)+') scale('+s.toFixed(2)+')">'+inner+'</g>';
const D={
 tree:(c)=>'<rect x="-3" y="0" width="6" height="16" rx="2" fill="#7A5534"/><circle cx="0" cy="-8" r="14" fill="'+c+'"/><circle cx="-9" cy="-1" r="10" fill="'+c+'"/><circle cx="9" cy="-1" r="10" fill="'+c+'"/>',
 pine:()=>'<rect x="-3" y="8" width="6" height="10" fill="#6B4A2E"/><path d="M0 -26 L16 10 H-16Z" fill="#2F6B3A"/><path d="M0 -36 L12 -8 H-12Z" fill="#3A7D45"/>',
 snowpine:()=>'<rect x="-3" y="8" width="6" height="10" fill="#6B4A2E"/><path d="M0 -26 L16 10 H-16Z" fill="#2F5E4A"/><path d="M0 -36 L12 -8 H-12Z" fill="#386E57"/><path d="M0 -36 L6 -22 L2 -24 L-2 -20 L-6 -22Z" fill="#fff"/><path d="M-16 10 L-9 -4 L-5 2 L0 -4 L5 2 L9 -4 L16 10Z" fill="#fff" opacity=".9"/>',
 bare:()=>'<path d="M0 18 V-6 M0 -2 L-10 -14 M0 -6 L9 -18 M-5 -8 L-12 -6 M4 -12 L12 -10" stroke="#6B4A2E" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M-12 -15 q3 -3 6 0 M6 -20 q3 -3 6 0" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>',
 bush:(c)=>'<circle cx="-7" cy="0" r="8" fill="'+c+'"/><circle cx="6" cy="-1" r="9" fill="'+c+'"/><circle cx="0" cy="-6" r="8" fill="'+c+'"/>',
 rock:()=>'<ellipse cx="0" cy="0" rx="12" ry="7" fill="#A9A49A"/><ellipse cx="-3" cy="-2" rx="6" ry="3" fill="#C4C0B6"/>',
 snowrock:()=>'<ellipse cx="0" cy="0" rx="12" ry="7" fill="#9BA3AC"/><ellipse cx="0" cy="-4" rx="10" ry="3.5" fill="#fff"/>',
 flower:(c)=>'<circle r="3.4" fill="'+c+'"/><circle r="1.4" fill="#FFE27A"/>',
 tuft:(c)=>'<path d="M-6 0 q3 -10 6 0 q3 -12 6 0" stroke="'+(c||'#4E9A4A')+'" stroke-width="2" fill="none"/>',
 sunflower:()=>'<path d="M0 0 V24" stroke="#3E7D32" stroke-width="3"/><path d="M0 14 q-8 -2 -10 -8 q7 0 10 6" fill="#4E9A3A"/><g>'+[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>'<ellipse cx="0" cy="-9" rx="3.4" ry="6.5" fill="#F7C531" transform="rotate('+a+')"/>').join('')+'</g><circle r="6" fill="#6B3E1E"/>',
 wheat:()=>'<path d="M0 10 V-12" stroke="#C99A2E" stroke-width="1.6"/>'+[-10,-6,-2].map(y=>'<ellipse cx="-2.4" cy="'+y+'" rx="2" ry="3.4" fill="#E2B64A" transform="rotate(-25 -2.4 '+y+')"/><ellipse cx="2.4" cy="'+y+'" rx="2" ry="3.4" fill="#E2B64A" transform="rotate(25 2.4 '+y+')"/>').join(''),
 poppy:()=>'<circle r="3.6" fill="#D7261E"/><circle r="1.2" fill="#2A1A14"/>',
 corn:()=>'<path d="M0 22 V-22" stroke="#4F8F2F" stroke-width="3"/><path d="M0 6 q-12 -4 -14 -14 q10 2 14 10 M0 -4 q12 -4 14 -14 q-10 2 -14 10 M0 -14 q-9 -6 -9 -14 q7 4 9 10" fill="#5FA83A"/><ellipse cx="4" cy="0" rx="3" ry="7" fill="#F2CC4B"/><path d="M0 -22 l-3 -6 M0 -22 l3 -6" stroke="#C9A64A" stroke-width="1.5"/>',
 olive:()=>'<path d="M0 16 q-3 -8 2 -14" stroke="#6E5B45" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="-8" cy="-6" r="10" fill="#8A9A5B"/><circle cx="7" cy="-8" r="11" fill="#7E8F52"/><circle cx="0" cy="-15" r="9" fill="#94A465"/><circle cx="-4" cy="-8" r="1.6" fill="#3E4A2A"/><circle cx="5" cy="-12" r="1.6" fill="#3E4A2A"/>',
 cow:()=>'<g><rect x="-14" y="2" width="3" height="9" fill="#333"/><rect x="9" y="2" width="3" height="9" fill="#333"/><ellipse cx="0" cy="0" rx="16" ry="9" fill="#fff" stroke="#333" stroke-width="1"/><path d="M-6 -6 q5 2 3 8 q-6 1 -7 -4Z M6 -2 q4 -2 6 2 q-2 5 -6 3Z" fill="#333"/><ellipse cx="17" cy="-5" rx="6" ry="5" fill="#fff" stroke="#333" stroke-width="1"/><ellipse cx="21" cy="-3" rx="3" ry="2.4" fill="#F2B8B0"/><circle cx="16" cy="-7" r="1" fill="#333"/><path d="M14 -10 l-2 -3 M19 -10 l2 -3" stroke="#B89A6A" stroke-width="1.6"/></g>',
 sheep:()=>'<g><rect x="-8" y="3" width="2.4" height="7" fill="#333"/><rect x="5" y="3" width="2.4" height="7" fill="#333"/>'+[[-7,-2],[0,-5],[7,-2],[-3,2],[4,2]].map(p=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="6" fill="#F5F2EA"/>').join('')+'<ellipse cx="12" cy="-3" rx="4" ry="5" fill="#333"/><circle cx="13" cy="-4" r=".9" fill="#fff"/></g>',
 pig:()=>'<g><rect x="-9" y="4" width="3" height="6" fill="#E58C9A"/><rect x="5" y="4" width="3" height="6" fill="#E58C9A"/><ellipse cx="0" cy="0" rx="13" ry="8" fill="#F4A9B5"/><circle cx="12" cy="-2" r="6" fill="#F4A9B5"/><ellipse cx="17" cy="-1" rx="2.6" ry="2.2" fill="#E58C9A"/><circle cx="12" cy="-4" r="1" fill="#333"/><path d="M-13 -2 q-4 -3 -2 -6" stroke="#E58C9A" stroke-width="1.6" fill="none"/><path d="M9 -7 l2 -3 l2 3Z" fill="#E58C9A"/></g>',
 hen:(c)=>'<g><path d="M-1 6 v4 M2 6 v4" stroke="#E0A030" stroke-width="1.4"/><ellipse cx="0" cy="0" rx="7" ry="6" fill="'+(c||'#fff')+'"/><path d="M-6 -2 q-5 -6 -2 -9 q2 4 4 5Z" fill="'+(c||'#fff')+'"/><circle cx="6" cy="-5" r="3.6" fill="'+(c||'#fff')+'"/><path d="M5 -9 q1 -2 2 0 q1 -2 2 0" fill="#D7261E"/><path d="M9.4 -5 l3 1 l-3 1Z" fill="#E0A030"/><circle cx="6.5" cy="-5.5" r=".7" fill="#333"/></g>',
 borda:()=>'<rect x="-18" y="-10" width="36" height="22" fill="#CFC2A8"/><path d="M-22 -10 L0 -26 L22 -10Z" fill="#4F5A63"/><rect x="-5" y="0" width="10" height="12" fill="#6B4A2E"/><rect x="9" y="-5" width="6" height="5" fill="#5D6B75"/>',
 fence:()=>'<path d="M-20 0 h40 M-20 -6 h40" stroke="#9A7650" stroke-width="2"/><path d="M-18 4 v-14 M-6 4 v-14 M6 4 v-14 M18 4 v-14" stroke="#7A5534" stroke-width="2.4"/>',
 butterfly:(c)=>'<path d="M0 0 q-6 -7 -8 -2 q1 5 8 2 q6 -7 8 -2 q-1 5 -8 2" fill="'+c+'"/>',
 snowflake:()=>'<circle r="1.6" fill="#fff"/>',
};
function place(p,rx,spec){
  const r=p.getBoundingClientRect(),W=r.width,H=r.height;let seed=13+Math.round(H)+spec.seed;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
  const pick=a=>a[Math.floor(rnd()*a.length)];
  let back='',front='';
  (spec.layers||[]).forEach(L=>{
    const items=[];
    if(L.grid){for(let y=L.grid[1]/2;y<H;y+=L.grid[1])for(let x=L.grid[0]/2;x<W;x+=L.grid[0])items.push([x+(rnd()-.5)*L.jit,y+(rnd()-.5)*L.jit]);}
    else{const n=Math.round(H*W/1000*(L.per||1));for(let i=0;i<n;i++)items.push([rnd()*W,rnd()*H]);}
    items.sort((a,b)=>a[1]-b[1]).forEach(([x,y])=>{
      if(L.only&&rnd()>L.only)return;
      if(Math.abs(x-rx(y))<(L.gap||80))return; if(x<8||x>W-8)return;
      const k=pick(L.kinds);const s=(L.size||1)*(0.85+rnd()*.35);
      const svg=G(x,y,s,D[k[0]](k[1]));if(L.front)front+=svg;else back+=svg;});
  });
  return back+front;
}`;

function rioJs(o) { return lib + `
const O=${JSON.stringify(o)};
document.querySelectorAll('.path').forEach((p,pi)=>{
  p.querySelectorAll('.stop').forEach((s,i)=>{const off=Math.round(Math.sin(i*1.1+0.6)*55);s.style.transform='translateX('+off+'px)';});
  const r=p.getBoundingClientRect();const pts=[...p.querySelectorAll('.node')].map(n=>{const b=n.getBoundingClientRect();return [b.left-r.left+b.width/2,b.top-r.top+b.height/2]});
  pts.unshift([pts[0][0]-30,-60]);pts.push([pts[pts.length-1][0]+30,r.height+60]);
  let d='M'+pts[0];for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],m=(a[1]+b[1])/2;d+=' C'+a[0]+','+m+' '+b[0]+','+m+' '+b[0]+','+b[1];}
  const rx=y=>{for(let i=1;i<pts.length;i++){if(y<=pts[i][1]){const a=pts[i-1],b=pts[i],t=(y-a[1])/(b[1]-a[1]||1);return a[0]+(b[0]-a[0])*(3*t*t-2*t*t*t)}}return pts[pts.length-1][0]};
  let lake='';
  if(O.lake){const y=(pts[2][1]+pts[3][1])/2,x=rx(y);lake='<ellipse cx="'+x+'" cy="'+y+'" rx="150" ry="78" fill="'+O.bank+'"/><ellipse cx="'+x+'" cy="'+y+'" rx="136" ry="66" fill="'+O.water+'"/><ellipse cx="'+(x-40)+'" cy="'+(y-18)+'" rx="46" ry="10" fill="#fff" opacity=".25"/>';}
  let river='<path d="'+d+'" fill="none" stroke="'+O.bank+'" stroke-width="118" stroke-linecap="round"/><path d="'+d+'" fill="none" stroke="'+O.water+'" stroke-width="92" stroke-linecap="round"/>'+lake
   +'<path d="'+d+'" fill="none" stroke="'+O.shine+'" stroke-width="40" stroke-linecap="round" stroke-dasharray="2 26" opacity=".9"/>';
  const lakeRx=O.lake?(y=>{const yy=(pts[2][1]+pts[3][1])/2;return Math.abs(y-yy)<85?rx(y)+(rx(y)<r.width/2?60:-60):rx(y)}):rx;
  p.insertAdjacentHTML('afterbegin','<svg class="river" viewBox="0 0 '+r.width+' '+r.height+'" preserveAspectRatio="none">'+(O.ground||'')+river+place(p,lakeRx,{...O,seed:pi*7})+'</svg>');
});`; }

const grass = (a, b) => `radial-gradient(circle at 20% 30%,rgba(255,255,255,.10) 0 2px,transparent 3px) 0 0/34px 34px,linear-gradient(${a},${b})`;

module.exports = {
  bosque: { title: '1 · Bosque frondoso',
    css: rio.css + fieldCss(grass('#7DBE63', '#5FA84E'), '#2E6B45', '#2E6B45', '#E1F0E4'),
    js: rioJs({ bank: '#C9B98E', water: '#5FB2D8', shine: '#A9DAEE', layers: [
      { per: 2.2, gap: 70, kinds: [['bush', '#3E8A3E'], ['bush', '#4E9A4A'], ['tuft'], ['flower', '#fff']] },
      { per: .95, gap: 88, front: 1, size: 1.1, kinds: [['tree', '#3E8A3E'], ['tree', '#57A64F'], ['tree', '#2F7A3A'], ['pine'], ['pine']] }] }) },

  invierno: { title: '2 · Invierno con nieve',
    css: rio.css + fieldCss('radial-gradient(circle,rgba(255,255,255,.9) 0 1.5px,transparent 2px) 0 0/26px 30px,linear-gradient(#F4F8FB,#E3EDF4)', '#4A6A86', '#4A6A86', '#E4EDF5') + `.node{background:#9DA6AE}.node-label{background:#fff}`,
    js: rioJs({ bank: '#FFFFFF', water: '#5E9FC4', shine: '#D6ECF7', layers: [
      { per: .9, gap: 70, kinds: [['snowrock'], ['snowrock'], ['tuft', '#9DB3A3']] },
      { per: .7, gap: 88, front: 1, size: 1.1, kinds: [['snowpine'], ['snowpine'], ['snowpine'], ['bare']] }] }) },

  ibon: { title: '3 · Ibón de alta montaña',
    css: rio.css + fieldCss(grass('#A9C98A', '#8DB47A'), '#3D6A7D', '#3D6A7D', '#E2EEF2'),
    js: rioJs({ lake: 1, bank: '#B8B1A0', water: '#3E9CC0', shine: '#9FD7EA', layers: [
      { per: 1.1, gap: 70, kinds: [['rock'], ['rock'], ['tuft', '#6E9A55'], ['flower', '#C9B6E8'], ['flower', '#fff']] },
      { per: .55, gap: 95, front: 1, size: 1.05, kinds: [['pine'], ['pine'], ['pine'], ['rock']] }] }) },

  verano: { title: '4 · Verano',
    css: rio.css + fieldCss(grass('#B9D86A', '#A2CB5A'), '#E08A1E', '#E08A1E', '#FDF0DC'),
    js: rioJs({ bank: '#F0DFA8', water: '#33B3D6', shine: '#B8ECF7', layers: [
      { per: 2.4, gap: 66, kinds: [['flower', '#F7D04A'], ['flower', '#F29BB5'], ['flower', '#fff'], ['tuft', '#6FA53A'], ['butterfly', '#F28C28'], ['butterfly', '#6FB7E8']] },
      { per: .45, gap: 90, front: 1, size: 1.1, kinds: [['tree', '#5FAE57'], ['tree', '#7BBF4F'], ['bush', '#5E9F3E']] }] }) },

  girasoles: { title: '5 · Campos de girasoles',
    css: rio.css + fieldCss('repeating-linear-gradient(0deg,#9BBE4E 0 22px,#8CB244 22px 24px)', '#B9791B', '#B9791B', '#FBEFD6'),
    js: rioJs({ bank: '#D7C38E', water: '#57AFD4', shine: '#B2DFF0', layers: [
      { grid: [34, 32], jit: 6, gap: 76, front: 1, size: .95, kinds: [['sunflower']] }] }) },

  trigo: { title: '6 · Trigales con amapolas',
    css: rio.css + fieldCss('repeating-linear-gradient(0deg,#E7C766 0 18px,#DDB955 18px 20px)', '#A8742A', '#A8742A', '#F8EEDC'),
    js: rioJs({ bank: '#C9AE6E', water: '#57AFD4', shine: '#B2DFF0', layers: [
      { grid: [14, 16], jit: 5, gap: 70, size: 1, kinds: [['wheat']] },
      { per: .9, gap: 72, front: 1, kinds: [['poppy'], ['poppy'], ['flower', '#6FA7E8']] }] }) },

  maiz: { title: '7 · Maizal',
    css: rio.css + fieldCss('repeating-linear-gradient(90deg,#9D7A52 0 4px,#B48F62 4px 30px)', '#4F8F2F', '#4F8F2F', '#E7F2DE'),
    js: rioJs({ bank: '#C2A77C', water: '#57AFD4', shine: '#B2DFF0', layers: [
      { grid: [30, 26], jit: 4, gap: 74, front: 1, size: 1, kinds: [['corn']] }] }) },

  olivar: { title: '8 · Olivar',
    css: rio.css + fieldCss('repeating-linear-gradient(0deg,#D6B98A 0 26px,#CBAC7B 26px 28px)', '#6E7A3E', '#6E7A3E', '#EEF0DE'),
    js: rioJs({ bank: '#BFA272', water: '#4FA6C9', shine: '#ADDBEC', layers: [
      { per: .8, gap: 66, kinds: [['tuft', '#8E9A56'], ['rock']] },
      { grid: [62, 58], jit: 8, gap: 92, front: 1, size: 1.05, kinds: [['olive']] }] }) },

  vacas: { title: '9 · Prado con vacas y ovejas',
    css: rio.css + fieldCss(grass('#9FD07E', '#86C267'), '#3B6E8F', '#3B6E8F', '#E1EEF5'),
    js: rioJs({ bank: '#D9C9A0', water: '#6DB9DC', shine: '#A9DAEE', layers: [
      { per: 1.6, gap: 66, kinds: [['tuft'], ['flower', '#fff'], ['flower', '#F7D04A']] },
      { per: .35, gap: 92, front: 1, size: 1.1, kinds: [['cow'], ['cow'], ['sheep'], ['sheep'], ['sheep'], ['tree', '#5FAE57'], ['fence']] }] }) },

  granja: { title: '10 · Granja con cerdos y gallinas',
    css: rio.css + fieldCss(grass('#B5D488', '#9DC672'), '#9A4A2E', '#9A4A2E', '#F6E4DA'),
    js: rioJs({ bank: '#D9C29A', water: '#6DB9DC', shine: '#A9DAEE', layers: [
      { per: 1.2, gap: 66, kinds: [['tuft'], ['flower', '#F7D04A'], ['flower', '#fff']] },
      { per: .12, gap: 110, front: 1, size: 1.15, kinds: [['borda']] },
      { per: .45, gap: 88, front: 1, size: 1.1, kinds: [['pig'], ['pig'], ['hen', '#fff'], ['hen', '#C97A3A'], ['hen', '#fff'], ['fence'], ['tree', '#5FAE57']] }] }) },
};

// Diez montañas en formato alargado: más alto, lecciones más grandes y mejor repartidas.
const H = 560, TOP = 62, K = (H - TOP) / 330;           // el relieve se dibuja a 330 de alto y se estira; los detalles no se deforman
const Y = y => (TOP + y * K).toFixed(1);
// La última lección (la de la banderita) se coloca justo en la cima: x en el dibujo, y del pico
const onPeak = (spots, peak) => spots.slice(0, -1).concat([[+(peak[0] / 3.6).toFixed(1), +((TOP + peak[1] * K - 40) / H).toFixed(3)]]);

const base = (head, btn, soft) => `
:root{--f-display:"Inter Display","Inter",sans-serif;--f-body:"Inter",sans-serif;--ok:${btn};--ok-soft:${soft}}
.proto-note{display:none}
.big-btn,.checkbar.ok .big-btn{background:${btn};text-transform:none;letter-spacing:0;font-size:1.1rem;box-shadow:none;border-radius:14px}
.card,.opt,.tile,.mbtn{box-shadow:none}
.selected{border-color:${btn}!important;background:${soft}!important;box-shadow:none!important}
.progress i{background:${btn}}
.tab[aria-selected="true"]{color:${btn};background:${soft};border-color:transparent}
.unit{margin-bottom:24px}
.unit-head{background:${head};border-radius:16px 16px 0 0;box-shadow:0 3px 0 rgba(0,0,0,.12);position:relative;z-index:1}
.path{display:block;height:${H}px;padding:0;border-radius:0 0 16px 16px;overflow:hidden;isolation:isolate}
.mtn{position:absolute;inset:0;width:100%;height:100%;z-index:-1}
.stop{position:absolute!important;transform:none!important;margin:0!important;translate:-50% 0}
.node{width:66px;height:66px;box-shadow:0 4px 0 rgba(0,0,0,.25);border:4px solid #fff}
.node svg{width:28px;height:28px}
.node.current::after{inset:-9px;border-color:#fff;opacity:.75}
.node-label{margin-top:7px;font-size:.95rem;background:rgba(255,255,255,.94);padding:3px 10px;border-radius:9px;color:#1F2A33;box-shadow:0 1px 3px rgba(0,0,0,.12)}
.start-bubble{background:#C8231B;color:#fff;border:none;border-radius:9px;margin-bottom:10px;font-size:.9rem}
.mascot-on-path{width:78px!important;top:-30px!important}
.summit-flag{position:absolute;top:-28px;left:50%;font-size:26px;line-height:1}
`;

const js = (sky, terrain, decor, spots4, spots3, trail, peak) => {
  if (peak) { spots4 = onPeak(spots4, peak); spots3 = onPeak(spots3, peak); }
  const svg = (sky + `<g transform="translate(0,${TOP}) scale(1,${K.toFixed(4)})">${terrain}</g>` + decor).replace(/'/g, "\\'").replace(/\n/g, '');
  return `
document.querySelectorAll('.path').forEach(p=>{
  const H=p.clientHeight;
  p.insertAdjacentHTML('afterbegin','<svg class="mtn" viewBox="0 0 360 ${H}" preserveAspectRatio="none">${svg}</svg>');
  const S=[...p.querySelectorAll('.stop')],n=S.length,sp=n===3?${JSON.stringify(spots3)}:${JSON.stringify(spots4)};
  const pts=[[sp[0][0]*3.6-50,H+10]];
  const g=p.querySelector('.mtn g');const paths=[...g.querySelectorAll('path')].filter(e=>e.getAttribute('fill')&&e.getAttribute('fill')!=='none');
  const PK=${JSON.stringify(peak || null)};const inF=(e,x,y)=>e.isPointInFill(new DOMPoint(x,y));
  let ri=0;if(PK){ri=paths.findIndex(e=>inF(e,PK[0],PK[1]+8));if(ri<0)ri=0;}
  const surf=x=>{for(let y=0;y<330;y+=1){if(paths.some((e,i)=>i>=ri&&inF(e,x,y)))return y;}return 300;};
  S.forEach((s,i)=>{const sy=(${TOP}+surf(sp[i][0]*3.6)*${K.toFixed(4)}+4-33)/H;let y=sp[i][1];if(y===undefined)y=sy;else if(i<n-1&&!sp[i][2])y=Math.max(y,sy);
    s.style.left=sp[i][0]+'%';s.style.top=(y*H)+'px';pts.push([sp[i][0]*3.6,y*H+33]);});
  let d='M'+pts[0];for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];d+=' C'+a[0]+','+((a[1]+b[1])/2)+' '+b[0]+','+((a[1]+b[1])/2)+' '+b[0]+','+b[1];}
  p.querySelector('.mtn').insertAdjacentHTML('beforeend','<path d="'+d+'" fill="none" stroke="${trail}" stroke-width="5" stroke-dasharray="1 11" stroke-linecap="round"/>');
  S[n-1].querySelector('.node').insertAdjacentHTML('afterend','<span class="summit-flag">🚩</span>');
  const m=p.querySelector('.mascot-on-path');if(m){const st=m.closest('.stop');const l=parseFloat(st.style.left);const right=l<45;m.style.left=right?'calc(100% + 6px)':'auto';m.style.right=right?'auto':'calc(100% + 6px)';}
});`;
};

// Recorridos: zigzag amplio de ladera (cuatro lecciones) y uno más corto (tres)
const R4a = [[22, .80], [68, .60], [30, .38], [74, .10]], R3a = [[24, .78], [70, .46], [36, .10]];
const R4b = [[74, .80], [28, .60], [66, .37], [30, .10]], R3b = [[72, .78], [30, .46], [64, .10]];

// Dibujos
const pine = (x, y, s, c1 = '#2F6B3A', c2 = '#3A7D45') => `<g transform="translate(${x},${Y(y)}) scale(${s})"><rect x="-2" y="6" width="4" height="8" fill="#5A3E26"/><path d="M0 -20 L12 8 H-12Z" fill="${c1}"/><path d="M0 -28 L9 -6 H-9Z" fill="${c2}"/></g>`;
const snowpine = (x, y, s) => `<g transform="translate(${x},${Y(y)}) scale(${s})"><rect x="-2" y="6" width="4" height="8" fill="#5A3E26"/><path d="M0 -20 L12 8 H-12Z" fill="#2F5E4A"/><path d="M0 -28 L9 -6 H-9Z" fill="#386E57"/><path d="M0 -28 L4.5 -17 L1 -18 L-2 -15 L-4.5 -17Z" fill="#fff"/></g>`;
const tree = (x, y, s, c) => `<g transform="translate(${x},${Y(y)}) scale(${s})"><rect x="-2" y="0" width="4" height="12" fill="#6B4A2E"/><circle cx="0" cy="-6" r="10" fill="${c}"/><circle cx="-7" cy="0" r="7" fill="${c}"/><circle cx="7" cy="0" r="7" fill="${c}"/></g>`;
const cloud = (x, y, s) => `<g transform="translate(${x},${Y(y)}) scale(${s})" fill="#fff" opacity=".92"><circle cx="0" cy="0" r="12"/><circle cx="14" cy="-5" r="15"/><circle cx="30" cy="0" r="11"/><rect x="0" y="0" width="30" height="11"/></g>`;
const bird = (x, y, s) => `<path d="M${x - 8 * s} ${Y(y)} q${4 * s} ${-5 * s} ${8 * s} 0 q${4 * s} ${-5 * s} ${8 * s} 0" stroke="#3B2F2A" stroke-width="1.8" fill="none"/>`;
const cow = (x, y) => `<g transform="translate(${x},${Y(y)}) scale(.75)"><rect x="-12" y="2" width="3" height="8" fill="#333"/><rect x="8" y="2" width="3" height="8" fill="#333"/><ellipse cx="0" cy="0" rx="14" ry="8" fill="#fff" stroke="#333"/><path d="M-5 -5 q4 2 3 7 q-5 1 -6 -3Z" fill="#333"/><ellipse cx="15" cy="-4" rx="5" ry="4.5" fill="#fff" stroke="#333"/></g>`;
const sky = (id, a, b, c) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/>${c ? `<stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>` : `<stop offset="1" stop-color="${b}"/>`}</linearGradient></defs><rect width="360" height="${H}" fill="url(#${id})"/>`;
const stars = () => Array.from({ length: 40 }, (_, i) => { const x = (i * 97) % 360, y = (i * 53) % 150 + 6; return `<circle cx="${x}" cy="${Y(y)}" r="${i % 5 ? 1.1 : 1.8}" fill="#fff" opacity="${i % 3 ? .7 : 1}"/>`; }).join('');

module.exports = {
  nevada: { title: '1 · Cumbre nevada', css: base('#3E5F7A', '#3E5F7A', '#E3ECF4'),
    js: js(sky('s1', '#BFDDF2', '#EEF6FB'),
      `<path d="M0 200 L50 150 L90 175 L150 95 L190 120 L230 80 L270 110 L320 70 L360 95 V330 H0Z" fill="#C3D2DE"/>
<path d="M150 95 L135 114 L148 110 L156 120 L165 106 L176 112Z M230 80 L218 96 L230 92 L238 101 L246 92Z M320 70 L306 88 L318 85 L327 94 L338 84Z" fill="#fff"/>
<path d="M0 330 V250 L60 215 L120 230 L200 150 L240 165 L295 40 L330 80 L360 70 V330Z" fill="#92A9BB"/>
<path d="M295 40 L272 82 L288 76 L298 90 L310 74 L322 84 L330 80Z" fill="#fff"/>
<path d="M0 330 V292 C70 270 130 286 200 268 S320 262 360 250 V330Z" fill="#9CC27E"/>`,
      cloud(30, 30, .9) + cloud(170, 18, .7) + snowpine(20, 300, 1.1) + snowpine(46, 308, .9) + snowpine(336, 280, 1) + snowpine(354, 292, .8),
      [[16, .82], [42, .64], [62, .46], [0, 0]], [[18, .80], [50, .54], [0, 0]], '#fff', [295, 40]) },

  atardecer: { title: '2 · Atardecer en la montaña', css: base('#6D597A', '#D9636A', '#F8E3E4'),
    js: js(sky('s2', '#8E7AB5', '#F4A26C', '#FBD38D'),
      `<path d="M0 210 L70 160 L120 185 L180 120 L230 150 L290 100 L360 140 V330 H0Z" fill="#B5768A"/>
<path d="M0 330 V255 L70 230 L140 245 L210 175 L250 190 L300 45 L360 110 V330Z" fill="#7A5574"/>
<path d="M0 330 V295 C80 275 160 300 240 280 S330 265 360 260 V330Z" fill="#4F3A5C"/>`,
      `<circle cx="80" cy="${Y(140)}" r="38" fill="#FFE08A" opacity=".95"/>` + bird(250, 50, 1.1) + bird(274, 62, .8) + pine(24, 306, 1.1, '#3B2B47', '#4A3758') + pine(50, 312, .9, '#3B2B47', '#4A3758') + pine(338, 284, 1, '#3B2B47', '#4A3758'),
      [[16, .82], [42, .64], [76, .42], [0, 0]], [[18, .80], [70, .50], [0, 0]], '#FFF3D6', [300, 45]) },

  prados: { title: '3 · Prados de verano', css: base('#3B7D4F', '#3B7D4F', '#E2F1E6'),
    js: js(sky('s3', '#9ED3F0', '#E4F4FB'),
      `<path d="M0 170 C60 120 110 140 170 90 C220 50 270 40 310 60 C340 75 350 90 360 95 V330 H0Z" fill="#B7D88F"/>
<path d="M0 240 C70 200 130 215 200 170 C250 140 300 150 360 120 V330 H0Z" fill="#9CCB75"/>
<path d="M0 330 V290 C90 260 170 290 260 255 C300 240 340 245 360 240 V330Z" fill="#83BD62"/>`,
      cloud(26, 34, 1) + cloud(210, 20, .8) + tree(330, 250, 1, '#4C9A4B') + tree(350, 264, .8, '#5FAE57') + tree(36, 312, 1.1, '#5FAE57') + cow(300, 214) + cow(140, 306),
      [[16, .82], [40, .64], [60, .46], [0, 0]], [[18, .80], [48, .54], [0, 0]], '#8A6A44', [290, 50]) },

  mallos: { title: '4 · Mallos de Riglos', css: base('#A84E2E', '#A84E2E', '#F6E1D6'),
    js: js(sky('s4', '#8CC8EE', '#E6F3FA'),
      `<path d="M120 330 V150 C120 110 150 100 160 130 C165 90 200 90 205 130 V330Z" fill="#C97B55"/>
<path d="M200 330 V110 C200 70 225 40 250 50 C268 30 300 40 300 90 V330Z" fill="#B8633E"/>
<path d="M260 330 V30 C262 10 290 4 302 24 C320 8 352 20 352 60 V330Z" fill="#A9552F"/>
<path d="M30 330 V200 C30 170 60 160 70 190 C80 170 100 180 98 210 V330Z" fill="#D18A62"/>
<path d="M210 120 q8 30 0 80 M240 90 q-8 40 4 90 M290 60 q-10 50 2 110 M320 40 q6 40 -4 100 M150 140 q6 30 -2 70" stroke="#8E4426" stroke-width="2" fill="none" opacity=".5"/>
<path d="M0 330 V285 C80 265 160 290 240 276 S330 268 360 265 V330Z" fill="#9DAF6A"/>`,
      bird(70, 40, 1.3) + bird(102, 54, .9) + bird(200, 28, 1.1) + tree(24, 302, 1, '#7E9450') + tree(52, 312, .8, '#8A9A5B') + tree(342, 290, .9, '#7E9450'),
      [[14, .82, 1], [36, .58, 1], [62, .40, 1], [0, 0]], [[16, .80, 1], [56, .48, 1], [0, 0]], '#fff', [290, 8]) },

  ordesa: { title: '5 · Ordesa en otoño', css: base('#8A4B2A', '#8A4B2A', '#F6E5D3'),
    js: js(sky('s5', '#A9D3EE', '#EAF4FA'),
      `<path d="M0 330 V120 L40 110 L60 70 L140 60 L170 90 L230 80 L260 30 L360 24 V330Z" fill="#D8C7A8"/>
<path d="M0 150 H360 M0 175 H360 M0 205 H360 M40 110 H360 M60 90 H200" stroke="#BFAA86" stroke-width="2" opacity=".7"/>
<path d="M0 330 V230 L360 210 V330Z" fill="#C9B590"/>
<path d="M0 330 V270 C60 250 120 262 180 250 S300 240 360 236 V330Z" fill="#9C8B5A"/>
<path d="M0 330 V318 C120 308 240 324 360 312 V330Z" fill="#6FB6D9"/>`,
      `<path d="M318 ${Y(34)} C314 ${Y(90)} 322 ${Y(150)} 316 ${Y(236)}" stroke="#EAF6FC" stroke-width="11" fill="none"/><path d="M318 ${Y(34)} C314 ${Y(90)} 322 ${Y(150)} 316 ${Y(236)}" stroke="#9FD2EC" stroke-width="3" stroke-dasharray="6 9" fill="none"/>`
      + tree(22, 292, 1.2, '#D9822B') + tree(50, 302, 1, '#C8402F') + tree(160, 290, 1, '#E8B62C') + tree(250, 268, 1.1, '#D9822B') + tree(340, 268, 1.1, '#B8502A') + pine(80, 300, .9) + pine(222, 284, .9),
      [[16, 0.822], [38, 0.644], [60, 0.466], [0, 0.111]], [[18, 0.804], [52, 0.555], [0, 0.111]], '#fff', [312, 26]) },

  moncayo: { title: '6 · Moncayo', css: base('#5E6E3A', '#5E6E3A', '#EDF0DF'),
    js: js(sky('s6', '#F6D9A8', '#FBEFD9', '#EAF3F7'),
      `<path d="M0 330 V230 C60 190 120 120 180 60 C200 42 220 42 240 60 C300 120 330 170 360 190 V330Z" fill="#8E9C7A"/>
<path d="M180 60 C200 42 220 42 240 60 L252 74 L238 70 L226 82 L212 70 L198 80 L186 70 L170 76Z" fill="#fff"/>
<path d="M0 330 V270 C90 240 160 250 230 230 S330 220 360 214 V330Z" fill="#6E8A4E"/>
<path d="M0 330 V305 C120 290 240 308 360 296 V330Z" fill="#9BB46A"/>`,
      `<circle cx="300" cy="${Y(40)}" r="22" fill="#FFF1C9"/>` + tree(30, 268, 1, '#557A3A') + tree(60, 262, .9, '#628A44') + tree(300, 232, 1, '#557A3A') + tree(330, 226, .9, '#628A44') + tree(130, 300, 1, '#6E9A4A'),
      [[80, .82], [30, .64], [72, .46], [0, 0]], [[78, .80], [32, .54], [0, 0]], '#fff', [210, 44]) },

  noche: { title: '7 · Noche de estrellas', css: base('#2C365E', '#3A4A8C', '#E3E7F5') + `.node.locked,.node:not(.done):not(.current){background:#8D93A8}`,
    js: js(sky('s7', '#141B36', '#2E3B6B', '#4B5A8E') + stars(),
      `<path d="M0 220 L60 170 L110 190 L170 120 L220 150 L280 90 L360 130 V330 H0Z" fill="#3A4775"/>
<path d="M170 120 L158 136 L170 132 L178 141 L186 130Z M280 90 L266 108 L280 104 L289 114 L298 102Z" fill="#DDE4F5"/>
<path d="M0 330 V260 L80 230 L150 245 L220 180 L260 196 L310 60 L360 110 V330Z" fill="#273158"/>
<path d="M310 60 L292 92 L306 88 L314 100 L324 86 L336 92Z" fill="#DDE4F5"/>
<path d="M0 330 V300 C90 280 170 300 260 284 S340 276 360 272 V330Z" fill="#1C2445"/>`,
      `<circle cx="70" cy="${Y(46)}" r="20" fill="#FFF6D5"/><circle cx="62" cy="${Y(42)}" r="17" fill="#141B36"/>`
      + `<g transform="translate(250,${Y(268)})"><rect x="-14" y="-10" width="28" height="18" fill="#3B3F55"/><path d="M-18 -10 L0 -24 L18 -10Z" fill="#2A2D40"/><rect x="-4" y="-4" width="8" height="7" fill="#FFD35A"/></g>`
      + pine(24, 306, 1.1, '#141A33', '#1C2340') + pine(52, 312, .9, '#141A33', '#1C2340') + pine(338, 288, 1, '#141A33', '#1C2340'),
      [[16, .82], [44, .62], [80, .40], [0, 0]], [[18, .80], [74, .50], [0, 0]], '#FFE9A0', [310, 60]) },

  guara: { title: '8 · Cañones de Guara', css: base('#B0682E', '#B0682E', '#F8E8D8'),
    js: js(sky('s8', '#9CD0EE', '#EAF5FB'),
      `<path d="M0 330 V40 C30 36 60 50 80 60 C110 90 120 150 130 230 C136 280 140 310 150 330Z" fill="#D9A66B"/>
<path d="M360 330 V30 C330 26 300 40 280 56 C250 90 238 150 230 230 C224 280 220 310 210 330Z" fill="#C98E54"/>
<path d="M10 80 C40 84 70 96 90 110 M14 150 C50 156 90 166 112 180 M350 90 C320 94 290 104 270 118 M346 160 C310 164 270 174 250 188" stroke="#B57A42" stroke-width="2.5" fill="none" opacity=".6"/>
<path d="M150 330 C160 300 170 280 180 270 C190 280 200 300 210 330Z" fill="#4FAFD0"/>`,
      bird(160, 50, 1.4) + bird(196, 70, 1) + bird(140, 90, .9) + tree(30, 40, .8, '#7E9450') + tree(330, 30, .8, '#7E9450') + tree(120, 300, .8, '#6E8A4E') + tree(240, 300, .8, '#6E8A4E'),
      [[50, 0.822], [24, 0.626], [76, 0.431], [0, 0.111]], [[50, 0.804], [76, 0.502], [0, 0.111]], '#fff', [40, 42]) },

  perdido: { title: '9 · Monte Perdido con ibón', css: base('#3D6A7D', '#3D6A7D', '#E2EEF2'),
    js: js(sky('s9', '#A6D4F0', '#EEF7FC'),
      `<path d="M0 330 V180 L60 140 L120 90 L170 40 L210 30 L250 50 L300 90 L360 120 V330Z" fill="#9AA9B4"/>
<path d="M120 90 L170 40 L210 30 L250 50 L300 90 L270 96 L240 84 L210 98 L180 86 L150 100Z" fill="#fff"/>
<path d="M100 150 C140 140 190 146 230 138 C260 134 290 140 320 150" stroke="#E8F1F7" stroke-width="10" fill="none"/>
<path d="M0 330 V250 C70 228 140 240 220 222 S320 210 360 206 V330Z" fill="#A9C98A"/>
<path d="M0 330 V296 C100 284 200 300 360 286 V330Z" fill="#93BA7E"/>`,
      `<ellipse cx="110" cy="${Y(280)}" rx="78" ry="22" fill="#B8B1A0"/><ellipse cx="110" cy="${Y(280)}" rx="70" ry="17" fill="#3E9CC0"/><ellipse cx="94" cy="${Y(276)}" rx="22" ry="4" fill="#fff" opacity=".3"/>`
      + pine(24, 252, 1, '#2F6B3A') + pine(330, 232, 1.1) + pine(350, 244, .9) + pine(220, 300, .9),
      [[82, .82], [30, .64], [74, .44], [0, 0]], [[80, .80], [32, .52], [0, 0]], '#fff', [210, 31]) },

  sanjuan: { title: '10 · San Juan de la Peña', css: base('#7A5A3A', '#7A5A3A', '#F2E8DC'),
    js: js(sky('s10', '#B8DDF2', '#EEF7FC'),
      `<path d="M0 330 V200 C40 170 80 160 120 150 C160 120 200 90 240 70 C280 50 330 40 360 40 V330Z" fill="#6E8A4E"/>
<path d="M150 70 C180 20 280 0 360 6 V100 C320 92 280 96 250 104 C220 112 190 112 170 100 C156 92 148 82 150 70Z" fill="#B98E64"/>
<path d="M160 80 C200 60 280 50 350 52 M170 92 C210 80 280 72 350 76" stroke="#9C7450" stroke-width="2" fill="none" opacity=".6"/>
<path d="M0 330 V270 C80 250 160 262 240 244 S330 236 360 232 V330Z" fill="#5C7A40"/>`,
      `<g transform="translate(262,${Y(106)})"><rect x="-34" y="-10" width="68" height="26" fill="#D9C6A2"/><rect x="18" y="-26" width="14" height="42" fill="#CDB892"/><path d="M14 -26 L25 -36 L36 -26Z" fill="#8E6B4A"/><path d="M-30 4 a5 5 0 0 1 10 0 v12 h-10Z M-12 4 a5 5 0 0 1 10 0 v12 h-10Z M6 4 a5 5 0 0 1 10 0 v12 h-10Z" fill="#7A5A3A"/></g>`
      + pine(30, 240, 1.1, '#2B5A32', '#356B3C') + pine(60, 250, .9, '#2B5A32', '#356B3C') + pine(110, 200, 1, '#2B5A32', '#356B3C') + pine(330, 220, 1.1, '#2B5A32', '#356B3C') + pine(200, 300, .9, '#2B5A32', '#356B3C'),
      [[24, 0.84], [70, 0.662], [32, 0.484], [0, 0.111]], [[24, 0.822], [68, 0.573], [0, 0.111]], '#F3E6C8', [222, 116]) },
};

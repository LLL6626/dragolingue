// Genera web/paisajes.js (ríos, unidades 1-10) a partir de los bocetos de themes10.cjs (ríos) y themes3 (G e I).
const fs = require('fs');
let src = fs.readFileSync('themes10.cjs', 'utf8');
const lib = src.slice(src.indexOf('const lib = String.raw`') + 'const lib = String.raw`'.length, src.indexOf('`;\n\nfunction rioJs'));
const rj = src.slice(src.indexOf('function rioJs'));
const body = rj.slice(rj.indexOf("document.querySelectorAll('.path').forEach((p,pi)=>{") + "document.querySelectorAll('.path').forEach((p,pi)=>{".length, rj.indexOf('});`; }'));
// Opciones de cada paisaje: se sustituyen rioJs y fieldCss para que devuelvan datos
src = src.replace(/function rioJs\(o\) \{ return lib \+ `[\s\S]*?\}\);`; \}/, "function rioJs(o){return o;}");
src = src.replace(/const fieldCss = \(bg, head, btn, soft\) => `[\s\S]*?`;\n/, 'const fieldCss = (bg, head, btn, soft) => "@@" + JSON.stringify({ bg, head, btn }) + "@@";\n');
fs.writeFileSync('_tmp_rios.cjs', src);
const T = require('./_tmp_rios.cjs');
const grass = (a, b) => `radial-gradient(circle at 20% 30%,rgba(255,255,255,.10) 0 2px,transparent 3px) 0 0/34px 34px,linear-gradient(${a},${b})`;
const meta = k => JSON.parse(T[k].css.match(/@@(.*?)@@/)[1]);
const mk = (k, o) => { const m = meta(k); return { bg: m.bg, head: m.head, accent: m.btn, o: T[k].js, ...o }; };
const G = { bg: grass('#9FD07E', '#86C267'), head: '#3B6E8F', accent: '#3B6E8F', o: { bank: '#D9C9A0', water: '#6DB9DC', shine: '#A9DAEE', layers: [
  { per: .45, gap: 66, kinds: [['flower', '#fff'], ['flower', '#F7D04A'], ['flower', '#F29BB5'], ['tuft']] },
  { per: .18, gap: 96, front: 1, size: 1.1, kinds: [['tree', '#5FAE57'], ['tree', '#4C9A4B'], ['pine']] }] } };
const I = { bg: grass('#E7C98A', '#D9B26A'), head: '#8A4B2A', accent: '#8A4B2A', o: { bank: '#C9A26B', water: '#6DB9DC', shine: '#A9DAEE', layers: [
  { per: .35, gap: 66, kinds: [['flower', '#C8402F'], ['flower', '#E39B3B'], ['tuft', '#B58A3A']] },
  { per: .32, gap: 96, front: 1, size: 1.1, kinds: [['tree', '#E8B62C'], ['tree', '#F2C94C'], ['tree', '#C8402F'], ['tree', '#D9822B'], ['tree', '#B8502A'], ['tree', '#6FA84F'], ['pine']] }] } };
// Orden de las unidades 1 a 10
const P = [
  { key: 'ibon', title: 'Ibón: nace el río', ...mk('ibonInicio') },
  { key: 'bosque', title: 'Bosque', ...mk('bosque') },
  { key: 'otono', title: 'Río en otoño', ...I },
  { key: 'invierno', title: 'Invierno con nieve', ...mk('invierno') },
  { key: 'prado', title: 'Río en el prado (primavera)', ...G, head: '#4E8A3E', accent: '#4E8A3E' },
  { key: 'vacas', title: 'Prado con vacas y ovejas', ...mk('vacas') },
  { key: 'granja', title: 'Granja', ...mk('granja') },
  { key: 'huerta', title: 'Huerta: girasol, trigo y maíz', ...mk('cultivos1') },
  { key: 'campina', title: 'Campiña: olivar, trigo y girasol', ...mk('cultivos2') },
  { key: 'verano', title: 'Verano', ...mk('verano') },
];
const out = `// Paisajes del mapa de lecciones (unidades 1 a 10): un río que nace en un ibón y baja hasta el llano.
// Cada lección es una piedra del río. Generado con disenos/codigo/genrios.cjs a partir de los bocetos.
// (Los paisajes de montaña para las unidades 11 a 20 están en disenos/codigo/paisajes-cumbres.js.)
(function () {
${lib}
  const PAISAJES = ${JSON.stringify(P)};

  function drawRiver(p, pi, O) {
    const old = p.querySelector('svg.river'); if (old) old.remove();
${body}
  }

  // Coloca las piedras en zigzag suave, dibuja el río por ellas y el paisaje alrededor
  function layout(root) {
    root.querySelectorAll('.scape[data-scape]').forEach(p => {
      const i = +p.dataset.scape, P = PAISAJES[i]; if (!P) return;
      const O = P.o;
      drawRiver(p, i, O);
      const m = p.querySelector('.mascot-on-path');
      if (m) { const st = m.closest('.stop'); const off = parseFloat((st.style.transform.match(/-?[\\d.]+/) || [0])[0]); m.style.left = off > 0 ? 'auto' : 'calc(100% + 4px)'; m.style.right = off > 0 ? 'calc(100% + 4px)' : 'auto'; }
    });
  }
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => layout(document), 200); });

  window.PAISAJES = PAISAJES;
  window.paisajeSVG = () => '';
  window.layoutPaisajes = layout;
})();
`;
fs.writeFileSync(process.argv[2], out);
console.log('ok', out.length);

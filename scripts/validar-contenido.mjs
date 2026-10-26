// Comprueba que src/content/contenido.json está bien formado antes de probar la app.
// Uso: npm run validar
import { readFileSync } from 'node:fs';

const file = new URL('../src/content/contenido.json', import.meta.url);
let data;
try {
  data = JSON.parse(readFileSync(file, 'utf8'));
} catch (e) {
  console.error('✗ contenido.json no es un JSON válido:\n  ' + e.message);
  process.exit(1);
}

const errors = [];
const ids = new Set();
const seen = id => {
  if (!id) return errors.push('Falta un id');
  if (ids.has(id)) errors.push(`Id repetido: ${id}`);
  ids.add(id);
};
const norm = s => String(s).toLowerCase().replace(/[¿?¡!.,]/g, '').replace(/\s+/g, ' ').trim();

const unitIds = new Set((data.unidades ?? []).map(u => u.id));
for (const s of data.secciones ?? []) {
  for (const uid of s.unidades ?? []) if (!unitIds.has(uid)) errors.push(`La sección «${s.nombre}» cita la unidad ${uid}, que no existe`);
}

let count = 0;
for (const u of data.unidades ?? []) {
  seen(u.id);
  if (!u.titulo) errors.push(`${u.id}: falta el título`);
  for (const l of u.lecciones ?? []) {
    seen(l.id);
    if (!l.repaso && !u.bloqueada && !(l.ejercicios ?? []).length) errors.push(`${l.id}: la lección no tiene ejercicios`);
    for (const ex of l.ejercicios ?? []) {
      count++;
      seen(ex.id);
      const where = `${ex.id} (${ex.t})`;
      switch (ex.t) {
        case 'pick':
          if (!(ex.options ?? []).some(o => o[0] === ex.answer)) errors.push(`${where}: la respuesta «${ex.answer}» no está entre las opciones`);
          break;
        case 'choice':
          if (!Number.isInteger(ex.answer) || ex.answer < 0 || ex.answer >= (ex.options ?? []).length)
            errors.push(`${where}: answer debe ser la posición de una opción (0 a ${(ex.options ?? []).length - 1})`);
          break;
        case 'build': {
          const pool = (ex.tiles ?? []).map(norm);
          for (const w of norm(ex.answer).split(' ')) {
            const k = pool.indexOf(w);
            if (k < 0) { errors.push(`${where}: falta la ficha «${w}» para formar «${ex.answer}»`); break; }
            pool.splice(k, 1);
          }
          break;
        }
        case 'fill':
          if (!(ex.options ?? []).includes(ex.answer)) errors.push(`${where}: la respuesta «${ex.answer}» no está entre las opciones`);
          break;
        case 'match':
          if ((ex.pairs ?? []).length < 2) errors.push(`${where}: hacen falta al menos 2 parejas`);
          break;
        default:
          errors.push(`${where}: tipo de ejercicio desconocido`);
      }
    }
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problema(s) en contenido.json:`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`✓ contenido.json correcto: ${data.unidades.length} unidades, ${count} ejercicios.`);

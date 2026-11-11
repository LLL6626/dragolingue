// Segunda ronda de huellas y escamas (24x24)
const toe = (x, y, r, rot, c) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 ${-6 * r} C${2.4 * r} ${-3 * r} ${2.6 * r} ${1.6 * r} 0 ${3.4 * r} C${-2.6 * r} ${1.6 * r} ${-2.4 * r} ${-3 * r} 0 ${-6 * r}Z" fill="${c}"/></g>`;
const track = (dx, dy, s, c) => `<g transform="translate(${dx} ${dy}) scale(${s})">` +
  toe(-5.2, -3.4, 1, -32, c) + toe(0, -6, 1.1, 0, c) + toe(5.2, -3.4, 1, 32, c) +
  `<path d="M0 8.6c-3.4 0-5.4-1.8-5.4-4.1 0-2.2 2.3-3.9 5.4-3.9s5.4 1.7 5.4 3.9c0 2.3-2 4.1-5.4 4.1Z" fill="${c}"/></g>`;
const S = 'M0 -8 C5 -8 8 -4.4 8 0 C8 4.8 3.6 8.4 0 11 C-3.6 8.4 -8 4.8 -8 0 C-8 -4.4 -5 -8 0 -8Z';
const H = {
  // H1 · Garras: tres dedos en punta (garras) y talón
  h1: `<svg viewBox="0 0 24 24">${track(12, 12.6, 1.12, '#C8402F')}</svg>`,
  // H2 · Pisadas: dos huellas en diagonal, como un camino (la racha que avanza)
  h2: `<svg viewBox="0 0 24 24">${track(7.4, 16.4, .62, '#E58B7E')}${track(16.4, 8.4, .66, '#C8402F')}</svg>`,
  // H3 · Pata gordita como la de la mascota, con garras blancas
  h3: '<svg viewBox="0 0 24 24"><path d="M3.6 13.2C3.6 8.4 7.4 5.4 12 5.4s8.4 3 8.4 7.8c0 4.8-3.8 8.6-8.4 8.6s-8.4-3.8-8.4-8.6Z" fill="#C8402F"/><path d="M7.6 6.6C7.4 9 7.8 11 8.8 12.4M16.4 6.6c.2 2.4-.2 4.4-1.2 5.8M12 5.4v6.8" stroke="#9E2E21" stroke-width="1.1" fill="none" stroke-linecap="round"/><g fill="#fff" stroke="#9E2E21" stroke-width=".7"><path d="M5.6 7.4 5.2 3.6 8 6.2Z"/><path d="M10.8 5.6 12 1.6 13.2 5.6Z"/><path d="M18.4 7.4 18.8 3.6 16 6.2Z"/></g><ellipse cx="12" cy="16.4" rx="3.6" ry="2.6" fill="#F2B200"/></svg>',
  // H4 · Garras doradas: la huella H1 en rojo con las puntas de oro
  h4: `<svg viewBox="0 0 24 24">${track(12, 12.6, 1.12, '#C8402F')}<g fill="#F2B200"><path d="M4.2 3.4 6.6 5.6 4.6 6.6Z"/><path d="M12 -.2 13.1 3 10.9 3Z"/><path d="M19.8 3.4 17.4 5.6 19.4 6.6Z"/></g></svg>`,
};
const E = {
  // E1 · Escama con nervio: forma de almendra hacia abajo, dorada con borde rojo
  e1: `<svg viewBox="0 0 24 24"><defs><linearGradient id="a1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD966"/><stop offset="1" stop-color="#E8A317"/></linearGradient></defs><g transform="translate(12 10.6) scale(1.12)"><path d="${S}" fill="url(#a1)" stroke="#C8402F" stroke-width="1.7" stroke-linejoin="round"/><path d="M0 -5.6 V8" stroke="#C8402F" stroke-width="1.2" stroke-linecap="round" opacity=".55"/><path d="M-4.4 -2.6 C-4.8 0 -3.8 2.6 -2 4" stroke="#fff" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".8"/></g></svg>`,
  // E2 · Piel de dragón: tres escamas iguales superpuestas
  e2: `<svg viewBox="0 0 24 24"><g stroke="#8A1A12" stroke-width="1.4" stroke-linejoin="round"><path d="${S}" transform="translate(6.6 7.6) scale(.72)" fill="#D94A35"/><path d="${S}" transform="translate(17.4 7.6) scale(.72)" fill="#D94A35"/><path d="${S}" transform="translate(12 13.2) scale(.8)" fill="#F2B200"/></g><path d="M9.4 11.4 C9.2 13 9.8 14.6 11 15.6" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/></svg>`,
  // E3 · Escama de la señera: la misma forma con las barras de Aragón
  e3: `<svg viewBox="0 0 24 24"><defs><clipPath id="a3"><path d="${S}" transform="translate(12 10.6) scale(1.12)"/></clipPath></defs><g clip-path="url(#a3)"><rect width="24" height="24" fill="#F2C318"/>${[6.2, 10.2, 14.2, 18.2].map(x => `<rect x="${x - 1}" y="0" width="2" height="24" fill="#C8231B"/>`).join('')}</g><path d="${S}" transform="translate(12 10.6) scale(1.12)" fill="none" stroke="#8A1A12" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  // E4 · Escama hexagonal brillante, roja con borde dorado
  e4: '<svg viewBox="0 0 24 24"><defs><linearGradient id="a4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F07A5E"/><stop offset="1" stop-color="#B02A1A"/></linearGradient></defs><path d="M12 2.2 20.2 7v9.6L12 21.8 3.8 16.6V7Z" fill="url(#a4)" stroke="#F2B200" stroke-width="2" stroke-linejoin="round"/><path d="M12 2.2V12M12 12l8.2 4.6M12 12 3.8 16.6" stroke="#8A1A12" stroke-width="1" opacity=".45"/><path d="M6.6 8.6 11 6" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/></svg>',
};
// E5 · Parche de piel de dragón: círculo con filas de escamas en arco
E.e5 = (() => {
  let rows = '';
  const r = 3.4;
  for (let row = 0; row < 5; row++) {
    const y = 3 + row * 4.2, off = row % 2 ? r : 0;
    for (let x = -r + off; x < 26; x += r * 2) rows += `<path d="M${x - r} ${y} a${r} ${r} 0 0 0 ${2 * r} 0" fill="${row % 2 ? '#E8A317' : '#F2C318'}" stroke="#9E2E21" stroke-width="1.1"/>`;
  }
  return `<svg viewBox="0 0 24 24"><defs><clipPath id="a5"><circle cx="12" cy="12" r="10"/></clipPath></defs><g clip-path="url(#a5)"><rect width="24" height="24" fill="#C8402F"/>${rows}</g><circle cx="12" cy="12" r="10" fill="none" stroke="#C8402F" stroke-width="2"/></svg>`;
})();
// E6 · Escama en abanico: arco ancho con estrías, dorada con borde rojo
E.e6 = '<svg viewBox="0 0 24 24"><defs><linearGradient id="a6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD966"/><stop offset="1" stop-color="#E8A317"/></linearGradient></defs><path d="M2.6 8.2C5 5 8.4 3.4 12 3.4s7 1.6 9.4 4.8L12 21Z" fill="url(#a6)" stroke="#C8402F" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 6v12.6M7.6 7.2 11.2 18M16.4 7.2 12.8 18" stroke="#C8402F" stroke-width="1" opacity=".55" stroke-linecap="round"/></svg>';

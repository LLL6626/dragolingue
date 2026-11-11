// Iconos propios (24x24) para la barra de arriba
const IC = {
  heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11z" fill="#C8231B"/></svg>',
  huella: '<svg viewBox="0 0 24 24"><g stroke="#C8402F" stroke-linecap="round" fill="none"><path d="M12 17.5 5.2 9.2" stroke-width="3.6"/><path d="M12 17 12 5.6" stroke-width="3.8"/><path d="M12 17.5 18.8 9.2" stroke-width="3.6"/></g><ellipse cx="12" cy="18.6" rx="4.6" ry="3.6" fill="#C8402F"/><g fill="#7E1F14"><path d="M3.4 6.9 4.1 9.4 6 8.1Z"/><path d="M10.9 4.4 12 1.6 13.1 4.4Z"/><path d="M20.6 6.9 19.9 9.4 18 8.1Z"/></g></svg>',
  escama: '<svg viewBox="0 0 24 24"><defs><linearGradient id="gE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD24A"/><stop offset="1" stop-color="#E39B1A"/></linearGradient></defs><path d="M12 2.2C7 5 4.4 9.4 5.4 14.2 6.4 18.6 12 21.8 12 21.8s5.6-3.2 6.6-7.6C19.6 9.4 17 5 12 2.2Z" fill="url(#gE)" stroke="#C8402F" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 6.5C9.6 8.4 8.6 11 9.3 13.6" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/></svg>',
  sol: '<svg viewBox="0 0 24 24"><g stroke="#F29A1A" stroke-width="2.2" stroke-linecap="round"><path d="M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6M4.8 4.8l1.8 1.8M17.4 17.4l1.8 1.8M4.8 19.2l1.8-1.8M17.4 6.6l1.8-1.8"/></g><circle cx="12" cy="12" r="5.2" fill="#FFC531"/></svg>',
  espiga: '<svg viewBox="0 0 24 24"><path d="M12 23V7" stroke="#B9851F" stroke-width="1.8" stroke-linecap="round"/><g fill="#E8B23A">' +
    [5, 9, 13, 17].map(y => `<ellipse cx="9" cy="${y}" rx="2.2" ry="3.4" transform="rotate(-28 9 ${y})"/><ellipse cx="15" cy="${y}" rx="2.2" ry="3.4" transform="rotate(28 15 ${y})"/>`).join('') +
    '<ellipse cx="12" cy="3.2" rx="1.8" ry="2.8"/></g></svg>',
  edelweiss: '<svg viewBox="0 0 24 24"><g fill="#fff" stroke="#9AA5AE" stroke-width="1.1" stroke-linejoin="round">' +
    [0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map(a => `<path d="M12 12 L10.2 4.6 Q12 1.6 13.8 4.6Z" transform="rotate(${a} 12 12)"/>`).join('') +
    '</g><circle cx="12" cy="12" r="3.2" fill="#F2C94C" stroke="#C99A1E" stroke-width=".8"/><circle cx="11" cy="11.2" r=".7" fill="#C99A1E"/><circle cx="13" cy="12.6" r=".7" fill="#C99A1E"/></svg>',
  fuego: '<svg viewBox="0 0 24 24"><path d="M12 2c1 3.5 5 5.5 5 11a5 5 0 0 1-10 0c0-2.5 1.4-4 2.6-5.2C10 10 11 11 12 11c-.5-3 0-6 0-9z" fill="#F28C28"/></svg>',
  gema: '<svg viewBox="0 0 24 24"><path d="M6 3h12l4 6-10 12L2 9z" fill="#F2B200"/></svg>',
};

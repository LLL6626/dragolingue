# Dragolingüe

App para aprender aragonés, al estilo de Duolingo, con Dragolingüe, un dragón rojo que tiene la bandera de Aragón en las alas.

Está hecha con **Expo (React Native) + TypeScript** y funciona en Android y en iPhone. Por ahora es solo local: no hay base de datos, ni cuentas, ni publicación en las tiendas. El progreso se guarda en el propio móvil.

El contenido sigue la **grafía oficial de la Academia Aragonesa de la Lengua (2023)**.

## Probarla ya: versión web instalable

**https://lll6626.github.io/dragolingue/**

Se publica sola con GitHub Pages desde la rama `main`. Para tenerla como una app:

- **Android**: ábrela en Chrome y toca ⋮ → *Instalar aplicación*.
- **iPhone**: ábrela en Safari y toca Compartir → *Añadir a pantalla de inicio*.

Funciona sin conexión después de abrirla una vez. El progreso se guarda en el navegador del móvil.

Esta versión web es el prototipo de la fase 2: `index.html`, `manifest.webmanifest`, `sw.js` y la carpeta `web/`. Lee las lecciones del mismo `src/content/contenido.json` que la app de Expo, así que una corrección en el JSON llega a las dos.

## Probarla en el móvil con Expo (la app nativa)

Solo hace falta un ordenador y el móvil conectados a la **misma wifi**.

1. Instala **Node.js 22 LTS** desde https://nodejs.org.
2. Instala **Expo Go** en el móvil, desde Google Play o la App Store.
3. Descarga el repositorio y entra en la carpeta:
   ```bash
   git clone https://github.com/<tu-usuario>/dragolingue.git
   cd dragolingue
   ```
4. Instala las dependencias (solo la primera vez):
   ```bash
   npm install
   ```
5. Arranca la app:
   ```bash
   npx expo start
   ```
6. Aparecerá un código QR en el terminal:
   - **Android**: ábrelo desde Expo Go, con «Scan QR code».
   - **iPhone**: escanéalo con la cámara y toca el aviso que sale.

Cuando cambies un archivo, la app del móvil se recarga sola.

### Si algo no va

- **El móvil no conecta.** Prueba con `npx expo start --tunnel`. Funciona aunque no estéis en la misma wifi, pero va algo más lento.
- **Expo Go dice que el proyecto usa un SDK incompatible.** La app usa el **SDK 57** de Expo. Si tu Expo Go ya está en el SDK 58, actualiza el proyecto con:
  ```bash
  npx expo install expo@^58.0.0 --fix
  ```
- **Quieres empezar de cero.** En la pestaña Perfil está la opción «Borrar progreso».

## Cambiar preguntas y respuestas

Todo el contenido está en **`src/content/contenido.json`**: unidades, consejos, vocabulario y ejercicios. Para corregir algo, edita ese archivo y comprueba que sigue bien con:

```bash
npm run validar
```

El comando avisa si falta un id o si está repetido, si una respuesta no está entre las opciones o si a una frase le faltan fichas.

Tipos de ejercicio (`t`):

| Tipo | Qué es | Campos |
|---|---|---|
| `pick` | Elegir la imagen | `es` (palabra en castellano), `answer` (en aragonés), `options` ([palabra, emoji]) |
| `choice` | Traducir | `ar` (frase en aragonés), `options` (traducciones), `answer` (posición de la correcta, empieza en 0) |
| `build` | Construir la frase | `es`, `answer` (frase en aragonés), `tiles` (fichas, incluidas las de relleno) |
| `fill` | Completar el hueco | `before`, `after`, `es` (traducción), `options`, `answer` |
| `match` | Unir parejas | `pairs` ([aragonés, castellano]) |

Las lecciones con `"repaso": true` no llevan ejercicios propios. Mezclan los del resto de la unidad y dan más peso a los que se han fallado.

## Reglas de juego

Están en `src/state/progress.ts`:

- Cada lección da 10 XP, y 5 más si se hace sin fallos.
- Hay 5 vidas. Cada fallo cuesta una y se recupera 1 cada `LIFE_MINUTES` minutos (ahora 30, pendiente de confirmar).
- Un repaso completado devuelve todas las vidas, y en los repasos fallar no cuesta vidas.
- La racha suma un día por cada día con al menos una lección.
- Las lecciones se desbloquean en orden. En Perfil se puede «Desbloquear todo» para revisar el contenido.

## Estructura

```
App.tsx                     navegación (pestañas, lección y final)
src/content/contenido.json  todo el contenido del curso
src/content/                tipos y funciones para leer el contenido
src/components/Dragon.tsx   Dragolingüe en SVG (happy, cheer, sad, think)
src/exercises/              los 5 tipos de ejercicio
src/screens/                Aprender, Vocabulario, Perfil, Lección y Final
src/state/progress.ts       progreso guardado en el móvil (expo-sqlite)
scripts/validar-contenido.mjs  comprobación del contenido
index.html, sw.js, web/     versión web instalable (GitHub Pages)
prototipo/                  prototipo HTML de la fase 2
```

## Próximos pasos

Esto corresponde a la fase 3: la app en local. La fase 4 añadirá:

- La base de datos (Supabase).
- Cuentas opcionales a partir de 14 años.
- La sincronización del progreso.
- La publicación en Google Play y la App Store con EAS.

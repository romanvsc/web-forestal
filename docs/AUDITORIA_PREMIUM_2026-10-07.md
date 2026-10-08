# Auditoría "premium" — 2026-10-07

Alcance: build local actual (rama `main`, commit `a7d2d80`), no el sitio publicado. Home completa en 1440×900 y 390×844, más Cosecha (interior tipo) en 1440. Skills aplicadas: impeccable (Persuade/Read), ui-ux-pro-max, apple-design, web-quality-audit / performance / accessibility / seo, motion-design (LottieFiles, instalada hoy en `~/.agents/skills/motion-design`).

## Lo que ya está bien (no tocar)

- Base técnica sana: 1 H1, `lang="es-AR"`, skip link, JSON-LD, canonical/OG, imágenes AVIF con dimensiones, CSS 45 KB, JS 142 KB sin comprimir, 2 fuentes variables locales.
- Tipografía Manrope/Work Sans con tracking apretado: carácter y autoridad.
- La secuencia sticky "Cómo operamos" es el mejor momento de la Home.
- Honestidad de contenido (sin cifras ni testimonios inventados): se mantiene.

## Por qué todavía no se siente premium

| # | Hallazgo | Evidencia | Impacto |
|---|---|---|---|
| 1 | **Fotografía sin una dirección de color común.** Hero/aéreas: cinematográficas y frías. Servicios, flota, galerías: cielos azules saturados tipo catálogo. | Capturas Home y Cosecha | Alto. Es lo que más "abarata" la percepción. |
| 2 | **No hay prueba cuantificada.** Tras el hero solo hay "más de tres décadas". Ninguna cifra, flota, volumen ni cliente visible en la Home. | `home/company.njk`; los logos de `clientes/` no se usan en Home | Alto. Las marcas premium B2B demuestran escala. Requiere datos reales del cliente. |
| 3 | **Sin identidad de movimiento.** Único efecto: `y:20, opacity:.7` en secciones (casi imperceptible). Sin easing/duración de marca. | `home.js` línea 145 | Alto. Todo aparece "ya puesto". |
| 4 | **Grilla de servicios genérica.** 6 tarjetas idénticas, sin hover, sin jerarquía. | `capabilities.njk` | Medio-alto. |
| 5 | **Interiores parecen otro sitio.** Cosecha pasa a fondo blanco, lista con viñetas, galería con epígrafes grises y formulario oscuro al pie. | Captura Cosecha | Alto. Rompe el clima de la Home. |
| 6 | **Desalineación header/footer vs secciones.** Logo y CTA están a x=80/1360; el contenido a x=48/1392. | Capturas 1440 | Medio. Defecto de oficio visible. |
| 7 | **Inconsistencias tipográficas.** H2 de "Cómo operamos" en peso 600 (resto 700); SGC en MAYÚSCULAS cuando la guía dice frase. | `home.css` líneas 157 y `sgc.njk` | Medio. |
| 8 | **Mapa plano y SGC solo texto.** Dos secciones sin imagen/animación propia. | `regional.njk`, `sgc.njk` | Medio. |
| 9 | **Contacto "de formulario".** Columna izquierda vacía, `select` nativo, sin confirmación memorable. | Captura 09 | Medio. |
| 10 | **Peso:** el video es 6,5 MB de 7,6 MB totales (85 %). Un solo bundle con GSAP+Lenis para todas las páginas. | Medición de red local | Medio. El video tiene que ganarse ese peso. |
| 11 | **Hero:** la barra inferior mezcla datos, botón de pausa y enlace de scroll; el poster tiene dominante cian. | Captura hero | Bajo-medio. |
| 12 | **Móvil:** el apilado de 6 servicios es largo; la secuencia sticky se desactiva (correcto) pero queda sin sustituto con ritmo. | `m-home-1.png` | Bajo-medio. |

## Dirección de movimiento (skill motion-design)

Arquetipo **Premium**: 350–600 ms, `cubic-bezier(.4,0,.2,1)`, sin overshoot; revelados dramáticos 600–1200 ms.

- Constantes de marca: easing único `--ease-fg`; tres duraciones (220 / 480 / 900 ms); entrada única = máscara/desplazamiento corto + opacidad, escalonado 60–80 ms.
- Tres capas por escena: primaria (titular y foto), secundaria (índice, líneas, caption), ambiental (grano sutil, desplazamiento lento del fondo).
- **Dónde sí Lottie** (vectores pequeños, formato `.lottie`, carga diferida, pausa fuera de pantalla, respeta reduced-motion): íconos de los 4 pilares del SGC, línea de ruta Argentina→Paraguay sobre el mapa, check de envío exitoso del formulario, indicador de carga del envío.
- **Dónde no:** hero ni fotografías. Ahí rinden más GSAP/CSS (máscaras `clip-path`, escalado lento, revelado de líneas de texto).

## Hoja de ruta propuesta

**Fase 1 — Alto impacto, bajo riesgo (sin contenido nuevo)**
1. Gradación de color unificada para todas las fotos (perfil único en el pipeline de `sharp`) y recorte coherente.
2. Sistema de movimiento: tokens, revelado de titulares por línea, máscara en imágenes, hover de tarjetas, contador de capítulo con barra de progreso en la secuencia.
3. Alinear header/footer al gutter de 48 px; unificar peso/capitalización de H2.
4. Rediseñar la grilla de servicios: una tarjeta grande + cinco compactas, o riel horizontal con snap en móvil.
5. Interiores en la misma identidad (oscuro/crema, ficha técnica en tabla, índice fijo, galería a sangre).

**Fase 2 — Lottie y detalles**
6. SGC con cuatro íconos animados; mapa con ruta animada; confirmación de formulario con check; `select` estilizado; columna izquierda de contacto con WhatsApp destacado.
7. Hero: video más liviano (objetivo ≤ 3 MB), poster sin dominante cian, barra inferior simplificada.
8. Dividir el bundle: GSAP/Lenis solo en Home.

**Fase 3 — Requiere datos del cliente**
9. Franja de cifras reales (hectáreas, toneladas/año, flota, años) con conteo animado.
10. Logos de clientes autorizados en fila continua lenta.
11. Fotos/video de personas y de operación nocturna o drone; es la mejora más grande y la única que no se resuelve con código.

## Referencias (verificadas por búsqueda; recomiendo abrirlas y juzgar el estilo)

- Kōzōwood — Awwwards Site of the Day (feb 2024), marca de madera; animaciones puntuadas 8,4/10: https://www.awwwards.com/sites/kozowood-made-of-nature
- Terminal Industries — Site of the Day (sep 2025), logística industrial; animaciones 8,8/10; narrativa por scroll: https://www.awwwards.com/sites/terminal-industries
- Q Industrial — Site of the Day + Developer Award: https://www.awwwards.com/sites/q-industrial
- Rhythm of Nature — Site of the Day (2021): https://rhythmofnature.armadillo-co.com
- Alphalogs (Red Dot): historia horizontal para logística: https://www.red-dot.org/de/project/alphalogs-55089
- Ya estudiadas en auditorías previas: Stora Enso, Ponsse, Komatsu Forest, Apple (principios).

## Límites de esta auditoría

No se ejecutó Lighthouse ni se midió LCP/INP en campo. No se revisaron en pantalla Nosotros, Consultoría, Trabaja ni Privacidad (solo Cosecha como interior tipo). Móvil: solo parte de la Home. Las referencias vienen de resúmenes de búsqueda, no de recorrerlas en navegador. Sin cambios de código ni commit.

## Fase 0 — ejecutada (sin commit)

- Tokens de movimiento en `src/css/styles.css`: `--ease-fg`, `--dur-quick/std/slow` (220/480/900 ms), reducidos a ~0 con `prefers-reduced-motion`. Aún sin consumidores: los usará la Fase 2.
- Home: header y footer comparten el gutter de las secciones. Medido en 1440, 768, 390 y 360 px: logo, contenido y pie quedan en el mismo borde (48/32/20 px), sin desbordamiento horizontal.
- `.home-process h2` pasa de peso 600 a 700. El titular del SGC pasa de mayúsculas a frase («Operar también es cuidar.»); los cuatro pilares conservan mayúsculas como rótulos. Es una decisión de voz fácil de revertir en `src/_includes/home/sgc.njk`.
- `npm test` correcto (build + comprobación de contacto).

## Fase 1 — ejecutada (sin commit)

- Gradación de color en `scripts/build.js` (`gradeFor`, `GRADE_VERSION`): las fotos de servicios, flota y galerías pasan por `modulate` (saturación 0,76, brillo 0,94); el poster del hero, algo más (0,70/0,90). Quedan fuera la aérea de consultoría, ilustraciones, logos y mapas. Afecta solo a las variantes AVIF/WebP; el `<img src>` de respaldo sigue siendo el original.
- Servicios en `home.css`: tarjeta destacada de Cosecha (7 columnas, 2 filas), Transporte y Acopio en horizontal, tres tarjetas de 4 columnas debajo. En tablet, 2 columnas; en móvil, riel horizontal con `scroll-snap` (82 % de ancho, la siguiente tarjeta asoma). Hover: zoom lento de la imagen y flecha que se desplaza (solo con puntero real; sin movimiento con `prefers-reduced-motion`).
- Hero: el botón de pausa pasa a un control circular de 48 px (el texto queda para lectores de pantalla) junto a «Ver nuestra operación».
- Verificado: `npm test` correcto; sin desbordamiento horizontal a 1440, 768 y 390 px.

## Fase 2 — ejecutada (sin commit)

- Identidad de movimiento en `src/js/home.js`: curvas `fgOut` (.05,.7,.1,1, entradas) y `fg` (.4,0,.2,1, desplazamientos) registradas con `CustomEase`, equivalentes a `--ease-fg` en CSS; escalonado de líneas de 90 ms.
- Escritorio (≥1024 px, puntero fino, sin movimiento reducido): entrada del hero por líneas con máscara; titulares de cada sección que suben por línea (se divide por `<br>`, el titular sigue siendo un solo encabezado); imágenes con máscara `clip-path` y asentamiento de escala; tarjetas de servicio escalonadas; el año 1993 cuenta hasta su valor final; la foto de la flota se descubre y se desplaza lento; contenido de cada capítulo entra al asentarse su escena. Cada revelado ocurre una sola vez.
- Secuencia «Cómo operamos»: cada escena sube sobre la anterior con máscara (antes, fundido); contador grande `01 / 03`, barra de progreso y nombre de la escena (antes, una línea de 12 px).
- Móvil/táctil: solo un fundido ascendente con `IntersectionObserver`, sin motor de scroll. Con movimiento reducido o sin JavaScript no se oculta ni se mueve nada.
- Verificado: sin errores de consola; al recorrer toda la página ningún elemento queda oculto; sin desbordamiento horizontal. CLS 0 y LCP local 164 ms en escritorio / 132 ms en móvil (lecturas locales, sin throttling; línea base anterior 120–140 ms). Bundle JS gzip 58,6 KB y CSS 10,7 KB.
- Pendiente de revisión humana: percepción real de ritmo y duración; no se probó en Safari ni en dispositivos físicos.

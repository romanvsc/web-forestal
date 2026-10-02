# Estado final de la modernización

Fecha: 2026-10-02. Estado: implementación local terminada. La comparación visual en navegador sigue pendiente porque una política administrada bloqueó el acceso al sitio local. Esta fase no publica, commitea ni sube cambios.

La línea de base permanece en el commit `d5200253457acf8b248ae92dffa8904972f22cd2`, documentado en [FASE_INICIAL.md](FASE_INICIAL.md). Las decisiones, el contrato de diseño, las referencias y las skills aplicadas están en [PROPUESTA_MODERNIZACION.md](PROPUESTA_MODERNIZACION.md).

## Comparación: antes / después / por qué

| Antes | Después | Por qué |
| --- | --- | --- |
| Eleventy y Nunjucks con Tailwind Play CDN, fuentes remotas, Swiper y recursos sin empaquetado local. | Eleventy + Nunjucks conserva las rutas; Tailwind 3 se compila y esbuild produce CSS, JavaScript, fuentes y sprite Tabler con hash. Sharp genera variantes AVIF/WebP para las imágenes raster referenciadas. | Mantener la arquitectura existente y servir recursos propios, reproducibles y optimizados. |
| Playfair Display y Work Sans cargadas desde Google Fonts; los estilos del sitio mezclaban componentes y reglas anteriores. | Manrope 600/700 para títulos y Work Sans 400/600 para lectura, ambas WOFF2 locales y precargadas. Tokens para paleta, espacios, tipografía, foco y movimiento. | Dar una identidad industrial editorial contemporánea sin modificar el logo. |
| Portada compuesta principalmente por tarjetas y secciones convencionales; el video del hero empezaba automáticamente. | Presentación, seis servicios, planificación/caminos, relato de cosecha/transporte/acopio, biomasa, empresa/SGC y contacto. Poster visible; el video se solicita con un control y conserva controles nativos. | Explicar la relación entre capacidades sin retrasar el acceso comercial. |
| Menú, galería e introducciones dependían de patrones anteriores; existían destinos sin acción útil. | Menú compacto por debajo de 1024 px, estados de teclado y foco, enlaces con destino, páginas de servicio y galerías estáticas. | Hacer que la navegación funcione con puntero, teclado y sin JavaScript. |
| Las páginas interiores compartían parte del contenido, pero sin un sistema único de lectura y consulta. | Catálogo con seis servicios; seis páginas de detalle; `/consultoria/` canónica y ruta anterior conservada; `/nosotros/`, SGC con ancla `#sgi`, políticas y términos con estilos compartidos. | Mantener el contenido útil y las URLs públicas mientras se ordenan tareas de exploración, lectura y consulta. |
| El formulario dependía de respuesta PHP tradicional; el formulario de empleo apuntaba a un destino de ejemplo. | `/enviar_mensaje.php` mantiene destinatario y campos, suma respuestas JSON y estados accesibles, conserva datos al fallar y mantiene el envío nativo. `/trabaja/` deriva a Vogel Consultoría. | Permitir que una consulta comercial se envíe y se corrija con o sin JavaScript; evitar promesas de recepción de CV no verificadas. |

## Resultado implementado

- **Sistema visual:** Manrope + Work Sans locales, paleta verde/neutra documentada, sprite local con los iconos Tabler Outline utilizados, contenedor de 1280 px, gutters 48/32/20 px, H1 40–80 px, H2 32–48 px, cuerpo 16–17 px, foco de 3 px y controles de 48 px.
- **Scrollytelling:** GSAP + ScrollTrigger son el único motor de la escena; Lenis funciona solo desde 1024 px, con puntero fino y movimiento normal. La timeline limita la escala a `1.04` y usa `scrub: 0.3`. El código propio adapta patrones documentados por React Bits, AnimmasterLib, SkiperUI, VengenceUI, AnimateUI, Uiverse, Uilora, Shaders y Anime.js; ForgeUI queda excluido. Rockstar sigue como dirección narrativa declarada por el usuario, no como comportamiento inspeccionado.
- **Fallback:** cada capítulo trae su propia fotografía, texto y enlace. Tablet, móvil, movimiento reducido, JavaScript desactivado y fallo al iniciar el motor conservan los tres capítulos en flujo vertical. La escena fijada solo se activa cuando GSAP terminó de configurarse.
- **Recursos:** se mantienen los originales; el build genera variantes para 60 recursos raster referenciados y registra dimensiones intrínsecas también para los SVG. Las 13 páginas HTML no tienen imágenes sin `alt`, `width` o `height` en la inspección estática.
- **Contacto contextual:** los seis slugs rellenan un mensaje editable al abrir `/?servicio=<slug>#contacto`. El formulario incluye enlace a privacidad, etiquetas permanentes, honeypot y anuncios de estado.
- **Build de desarrollo:** una modificación de plantilla o estilo dispara una compilación de assets esperada por el ciclo de Eleventy. Se corrigió una carrera detectada durante la prueba: el build de CSS/JS ya no borra los archivos mientras Eleventy los copia.

## Evidencia y verificaciones

### Línea de base

- La copia aislada de `d5200253457acf8b248ae92dffa8904972f22cd2` quedó limpia y produjo salida Eleventy al ejecutar `npm ci` y `npm run build`.
- Las 13 rutas comparables respondieron HTTP 200 al servir el `_site` de la copia inicial por loopback. La portada inicial generó el HTML esperado y `/trabaja/` se cargó; no se envió el formulario inicial porque `mail()` apuntaba al destinatario real.
- La lectura del PHP inicial confirmó `mail()`, validación, honeypot y respuesta por redirección. No se hicieron envíos a producción.

### Build y rutas finales

- `npm run test`: **pasó**. Ejecuta build de producción y `scripts/check-contact.mjs`; el chequeo confirmó que el WhatsApp oficial sigue consistente.
- `php -l src/enviar_mensaje.php`: **sin errores de sintaxis**.
- `node --check` para `scripts/build.js`, `scripts/dev.js` y `src/js/main.js`: **pasó**.
- `npm run start`: Eleventy sirvió la portada, CSS, JavaScript, fuentes WOFF2 e icon sprite con HTTP 200. Cambios de prueba en Nunjucks y CSS activaron el hook `eleventy.beforeWatch`, regeneraron assets y completaron ambas compilaciones sin errores.
- Servidas por el PHP local y verificadas con HTTP 200: `/`, `/servicios/`, los seis detalles, `/consultoria/`, `/nosotros/`, `/trabaja/`, `/privacidad/` y `/terminos/` (**13 de 13**). El alias `/servicios/consultoria-forestal/` declara canonical hacia `/consultoria/`.

### Contacto con Mailpit local

El proceso PHP de prueba utilizó SMTP `127.0.0.1:1025`; Mailpit escuchó solo en `127.0.0.1:8025`. Se usaron nombres, mensajes y correos sintéticos. No se modificó configuración de producción ni se habilitó reenvío externo.

| Caso | Resultado comprobado |
| --- | --- |
| JSON con datos obligatorios vacíos y correo inválido | HTTP 422 con errores de `nombre`, `email` y `mensaje`. |
| GET con `Accept: application/json` | HTTP 405. |
| Honeypot ocupado | HTTP 200 simulado; no llegó ningún mensaje adicional a Mailpit. |
| HTML nativo inválido | HTTP 422; conserva los datos y los escapa en HTML. |
| JSON válido | HTTP 200 y un mensaje capturado únicamente en Mailpit. |
| HTML nativo válido | HTTP 303 a la confirmación propia; página de confirmación HTTP 200. |
| Mailpit inaccesible | JSON y HTML devuelven HTTP 503; el formulario HTML conserva nombre, correo y mensaje. |

La bandeja local capturó exactamente dos envíos válidos de prueba, ambos dirigidos a `secretaria@forestalgaruhape.com.ar`. “Envío aceptado” indica aceptación del transporte local; no demuestra lectura ni determina un plazo comercial.

### Peso de recursos

| Recurso | Medición final | Objetivo |
| --- | ---: | ---: |
| CSS + JavaScript, comprimidos con gzip | 59,514 bytes (58.1 KiB) | ≤ 180 KB |
| Poster principal AVIF, variante 1280 px | 122,005 bytes (119.1 KiB) | ≤ 250 KB |
| Imágenes HTML sin texto alternativo o dimensiones | 0 en 13 páginas generadas | 0 |

Los presupuestos se cumplen. No se midieron LCP/CLS en un navegador real.

## Revisión de interfaz según las guías Vercel

Se consultaron las [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). La revisión del código quedó sin hallazgos pendientes en estos criterios; no sustituye una inspección visual:

- `src/_includes/components/header.njk:7`, `src/js/main.js:14` y `src/js/main.js:36` — botón nativo, `aria-expanded`, Escape y devolución del foco.
- `src/_includes/components/image.njk:8` — alternativas de texto, dimensiones, carga diferida y prioridad para el poster.
- `src/_includes/components/hero.njk:16` y `src/js/main.js:172` — controles de video, `preload="none"`, carga a demanda y estado anunciado.
- `src/_includes/components/footer.njk:17`, `src/_includes/components/footer.njk:25`, `src/_includes/components/footer.njk:30` y `src/_includes/components/footer.njk:40` — estado `aria-live`, etiquetas/autocompletado y política de privacidad.
- `src/js/main.js:112` y `src/js/main.js:139` — estado de envío, errores inline, enfoque del primer error y conservación de valores ante fallo.
- `src/css/styles.css:39`, `src/css/styles.css:51` y `src/css/styles.css:348` — interacción táctil, foco visible y variante de movimiento reducido.
- `src/js/main.js:217` y `src/js/main.js:255` — animación limitada a escritorio compatible y mejora progresiva posterior a inicializar el motor.
- `.eleventy.js:4` y `.eleventy.js:25` — assets terminados antes de las compilaciones incrementales y vigilancia de las entradas visuales.

## Límites pendientes

- **Capturas Antes/Después:** no se adjuntan capturas porque el navegador administrado denegó el acceso a `http://127.0.0.1:8010/`: “The admin-enforced policy could not be verified, so access was not granted.” La misma política impidió la inspección interactiva de Rockstar. No se intentó sortearla. Queda pendiente revisar juntos 1440 × 900, 768 × 1024 y 390 × 844, incluyendo los tres capítulos y estados visuales del formulario.
- **Interacción de navegador:** menú con teclado/Escape, movimiento al redimensionar o cambiar la preferencia, doble pulsación del formulario y pérdida de red del cliente se revisaron en el código, pero no se pudieron ejercer en navegador.
- **Reproducción multimedia:** se verificó el HTML de carga diferida y el estado de error en código; no se observó el video ni su aspecto en navegador.
- **Correo de producción:** el proceso real del hosting no se probó. El único envío aceptado durante esta fase fue local a Mailpit.
- **Carga y estabilidad visual:** el peso de assets está medido; faltan métricas de navegador para estabilidad del layout y experiencia percibida.

Los cambios permanecen locales y sin commit, push ni publicación.

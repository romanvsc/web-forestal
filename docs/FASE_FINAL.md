# Estado final de la modernización — Home V2

Fecha de trabajo: 2026-10-02 (Argentina). Estado actual: **Home V2 implementada y verificada localmente**, con revisión independiente del código y las capturas. La V1 fue publicada por instrucción del usuario en `7b1b5e5be069ce675b0f4983aab37635fba0c944`; la V2 no tiene commit, push ni publicación.

## Comparación de la segunda modernización

| V1 | V2 implementada | Por qué |
| --- | --- | --- |
| Hero dividido, fondo blanco y video manual. | Apertura de 100svh con fotografía/video a sangre, título gigante y cabecera transparente. | Introducir la operación como experiencia documental desde el primer viewport. |
| Catálogo de tarjetas inmediato y relato de tres servicios dentro de la portada. | Relato principal de seis capítulos: Cosecha → Transporte → Acopio → Caminos → Biomasa → Consultoría; catálogo como salida posterior. | Presentar las capacidades mediante su relación con la operación y conservar acceso directo a cada servicio. |
| Encuadres uniformes y escala 1.04. | Cosecha con máscara expansiva, transporte lateral, acopio horizontal a sangre sobre fondo oscuro, caminos panorámicos, biomasa a gran escala y consultoría aérea. Escala hasta 1.05 y parallax de Caminos ±1.5%; flota conserva ±3%. | Variar ritmo y composición con material real del proyecto. |
| Empresa y SGC como bloques convencionales. | Pausa crema con 1993 y flota; bosque oscuro con Seguridad, Calidad, Sostenibilidad y Mejora continua en momentos consecutivos. | Dar espacio de lectura a la trayectoria y compromisos. |
| Alcance regional incluido en texto. | Mapa SVG local con Argentina y Paraguay destacados. | Explicar el alcance institucional sin inventar emplazamientos o cobertura territorial. |
| Contacto compartido de tamaño convencional. | Cierre negro verde con titular grande y formulario real, conservando el contrato PHP y envío nativo. | Mantener la conversión comercial como destino del recorrido. |

### Archivos y comportamiento

- Home: `src/index.njk` y `src/_includes/home/`; estilos específicos en `src/css/home.css`. Los interiores conservan sus composiciones y rutas.
- Movimiento: `src/js/home.js`, un contexto `gsap.matchMedia`, una timeline principal con `scrub: .9`, seis capítulos de 140svh y un solo Lenis/ticker en escritorio compatible. Los accesos a capítulos saltan directamente; la rueda se suaviza. Al cambiar tamaño o movimiento reducido se revierte el contexto y se destruye Lenis.
- Sin JavaScript, tablet y móvil: fotos, textos y enlaces en flujo. La escena animada es una mejora progresiva. La cabecera sin JavaScript muestra los enlaces y permanece en flujo.
- Video: poster inmediato, fuentes asignadas únicamente en escritorio ≥1024 px, puntero fino, sin reducción de movimiento ni ahorro de datos. Pausa manual, pausa fuera de pantalla/con documento oculto y entrada por opacidad de 1400ms. `hero-cinematic.mp4` reemplaza los formatos anteriores en Home: montaje de fotos de 36s a 30fps, planos fijos de 8s y disoluciones de 2s. Fallo conserva el poster. La primera revisión encontró un fallo WebM y usaba recuperación MP4; esa combinación queda en el registro previo, no en Home actual.
- Contacto: guardia de petición en curso, estado ocupado, errores asociados al campo, conservación de valores ante fallo y limpieza únicamente después de HTTP 200 confirmado. La pérdida de conexión informa que no se pudo confirmar el envío, sin afirmar que el servidor no lo recibió.
- Correcciones: selección de biomasa por slug y eliminación de BOM que generaban texto fuera de la estructura HTML. Menú móvil alineado al margen y navegación nativa visible sin scripts.

### Verificaciones actuales

| Caso | Evidencia |
| --- | --- |
| Build y WhatsApp oficial | `npm run test` pasó; `git diff --check` sin errores. |
| Rutas | HTTP 200 en las 13 rutas: portada, catálogo, seis detalles, consultoría, nosotros, empleo y dos legales. |
| Responsive | Capturas reales 1440 × 900, 768 × 1024 y 390 × 844; sin desbordamiento horizontal en la inspección DOM. |
| Menú | Enter/click abre, Escape cierra y devuelve el foco al botón; foco visible en la captura móvil. |
| Recorrido reversible | La rueda avanzó de Cosecha a Transporte y regresó a Cosecha; título de escena y opacidad de las imágenes volvieron al estado correspondiente. El video estaba pausado fuera de pantalla. |
| Movimiento reducido y sin JS | Seis fotos/capítulos conservados; video sin fuentes en movimiento reducido y móvil. Envío nativo operado en navegador con scripts desactivados. |
| Validación | Vacíos y correo inválido ejercidos en navegador; HTTP 422 y errores de servidor comprobados. HTML nativo conserva y escapa `<script>`/`<b>` sintéticos. |
| Envío | JSON 200; envío nativo 303 hacia confirmación 200; doble pulsación produjo un solo correo de ese caso. |
| Error y red | SMTP inaccesible produjo 503 real; cliente offline conserva datos y recupera el botón. |
| Contexto comercial | `/?servicio=transporte-forestal#contacto` propone un mensaje editable comprobado en navegador. Los seis slugs siguen definidos. |

**Correo de prueba:** PHP ejecutado con `php -n -d SMTP=127.0.0.1 -d smtp_port=1025 -S 127.0.0.1:8090 -t _site`. Mailpit ligado a `127.0.0.1:1025` y `127.0.0.1:8025`, sin relay externo. Se capturaron cuatro consultas válidas del endpoint y una prueba diagnóstica aislada. El honeypot no añadió mensajes. No se cambió `php.ini` ni configuración de producción.

**Vista de desarrollo:** Eleventy en `http://127.0.0.1:8080/`. Con `FORESTAL_PHP_PORT=8090`, un proxy de desarrollo reenvía únicamente `/enviar_mensaje.php` al PHP de loopback. Es una opción del proceso local, no una dependencia del hosting. Sin PHP local, la verificación debe hacerse sirviendo `_site` con PHP.

### Recursos y medición

| Medida | V1 | V2 | Presupuesto |
| --- | ---: | ---: | ---: |
| CSS + JS gzip | 59,514 B | 63,390 B | ≤180 KB |
| Poster AVIF 1280 px | 122,005 B | 98,432 B | ≤250 KB |
| LCP local de la primera revisión V2, una navegación | 136 ms | 120 ms | Sin objetivo extrapolado a producción |
| CLS local de la primera revisión V2 | 0 | 0 | Sin desplazamientos registrados en esas navegaciones |

Perfil: mismo IAB Chromium, 1440 × 900, HTTP localhost, sin throttling. Dos servidores estáticos equivalentes inyectaron temporalmente `PerformanceObserver` para observar LCP/CLS; esa instrumentación no forma parte de las plantillas entregadas. La medición es una muestra local, no demuestra mejora de rendimiento en el hosting. [Datos registrados](evidencia/v2-home/mediciones-navegador.json).

### Evidencia visual y revisión

- [Sitio inicial d520025](evidencia/inicial-home/): hero y contacto en los tres tamaños.
- [V1 publicada 7b1b5e5](evidencia/v1-home/): hero y contacto comparables.
- [Home V2](evidencia/v2-home/): hero, seis capítulos de escritorio, variantes de empresa/SGC/mapa/contacto, menú, movimiento reducido, sin JS y estados del formulario.
- Storyboard conservado en `/storyboard-v2/`, con `noindex` y fuera del sitemap. Las referencias y skills siguen documentadas en [PROPUESTA_MODERNIZACION.md](PROPUESTA_MODERNIZACION.md) y [STORYBOARD_V2.md](STORYBOARD_V2.md).
- Revisión independiente Impeccable: **`ship` para código y capturas**; sin bloqueo material identificado en el alcance revisado. El revisor no operó el navegador y no certifica fluidez a partir de imágenes. Detector estático: cero hallazgos primarios; avisos de tokens se contrastan con el DESIGN actualizado.

### Ajuste de ritmo posterior a la revisión del usuario

El usuario pidió corregir tambaleo, cortes rápidos y ruptura visual de Acopio. Se retiró el zoom del montage y del medio del hero al hacer scroll, se alargó el montaje y se amplió la disolución de las escenas de .2 a .65 unidades de capítulo. Acopio usa `playa_acopio_1.jpeg` horizontal y mantiene el fondo oscuro y margen de lectura.

Build de producción completado después del ajuste. En IAB: video reproduciendo con duración 36s y transform del medio `none`; avance/regreso entre Transporte y Acopio; variante móvil horizontal sin fuente de video ni desbordamiento. [Preparación y alcance](recursos/HERO_CINEMATICO.md). Nuevas capturas: [Acopio escritorio](evidencia/v2-home/acopio-suave-1440.jpg) y [móvil](evidencia/v2-home/acopio-suave-390.jpg). La revisión independiente y métricas LCP/CLS anteriores no se atribuyen a este ajuste posterior; no se repitieron los envíos de correo.

### Sustitución de imágenes aportadas

Se incorporaron siete imágenes nuevas: Cosecha, Transporte, Caminos, Biomasa, Consultoría, Acopio y flota. Cosecha/Biomasa excluyen las marcas incorrectas por recortes autorizados con imagegen; originales preservados. Se actualizaron poster/SEO, catálogo, detalles, galerías, Home y SGC, y se regeneró el montaje manteniendo su ritmo. Acopio mantiene la imagen horizontal en el relato y usa la nueva vertical en catálogo/galería. Las tarjetas y detalles ahora llenan sus encuadres con picture de altura completa.

[Registro de archivos y edición](recursos/IMAGENES_ACTUALIZADAS.md). Build completado; visualización en IAB de poster/video, Biomasa, catálogo y detalle de Acopio. Los recursos se registran en `evidencia/v2-home/imagenes-nuevas.json`. No se repitió la medición LCP/CLS ni los envíos de correo; la revisión independiente anterior no se atribuye a estas sustituciones posteriores.

### Límites vigentes

El hosting, correo de producción, móviles físicos, rendimiento con red real y el comportamiento completo de Rockstar no se verificaron. El modo de ahorro de datos y pestaña oculta cuentan con lógica explícita; no se simularon todas sus variantes en dispositivos reales. La aprobación editorial del usuario y publicación de V2 no se infieren de la revisión técnica.

---

## Registro histórico de la primera modernización (V1)

El texto siguiente conserva la evidencia y limitaciones de la primera entrega. Sus bloqueos de navegador fueron resueltos para la revisión V2 y no describen el estado actual. La V1 se publicó posteriormente como `7b1b5e5` por instrucción del usuario.

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


## Home editorial con relato operativo — 2026-10-05

Esta revisión sustituye el recorrido Home V2 de seis capítulos por una cuadrícula de seis servicios y tres escenas operativas: Planificar → Operar en campo → Abastecer la industria. El orden completo es presentación, capacidades, operación, Empresa, alcance regional, SGC y consulta. Se conservan fuentes, paleta, fotografías propias, anclas históricas, enlaces, canonical de Consultoría y contratos de contacto.

| Antes | Después | Por qué |
| --- | --- | --- |
| Seis capítulos de servicios prolongados | Seis capacidades en cuadrícula 3/2/1 y tres escenas narrativas | Separar la búsqueda de una prestación del relato de cómo opera la empresa. |
| Zoom y parallax en el recorrido | Desplazamiento vertical y fundido de un tercio de capítulo, scrub 0.6 | Dar continuidad al avanzar y retroceder, con encuadres compartidos. |
| SGC con cuatro momentos extensos | Cuatro compromisos compactos en flujo normal | Mantener ritmo editorial después de la pausa institucional y el mapa. |
| Selección de servicio mediante filtro Nunjucks | Datos seleccionados explícitamente por slug | Corregir resúmenes repetidos y la introducción de Consultoría. |

[Storyboard, implementación, revisión Apple Design y límites](STORYBOARD_EDITORIAL.md). Capturas actuales: `evidencia/home-editorial-2026-10-05/`; evidencia histórica conservada. Se revisaron 1440 × 900, 768 × 1024, 390 × 844 y 360 × 800, avance/retroceso, cambios de tamaño, menú por teclado, movimiento reducido, ausencia de JavaScript y poster con video bloqueado. Build de producción y comprobación existente del contacto pasan.

Las referencias y skills de la propuesta original siguen como antecedentes: GTA VI orienta continuidad; GSAP implementa el relato y Lenis suaviza el escritorio; los catálogos aportan patrones adaptados. Apple Design guía esta revisión de jerarquía, lectura, navegación y movimiento opcional. No se añadieron dependencias.

Los bloqueos y pendientes de navegador registrados en fases anteriores son históricos; la revisión actual sí tiene capturas e interacción local. No se midió mejora de conversión, rendimiento de animación ni Core Web Vitals. No se enviaron correos ni se verificó el hosting en esta revisión. Entrega local, sin commit, push ni publicación.

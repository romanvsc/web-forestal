---
name: Forestal Garuhapé — Home V2
description: Sistema visual de la Home V2 implementada localmente en /; interiores conservan su autoridad CSS.
colors:
  forest: "#082d25"
  night: "#061c17"
  brand: "#0f766e"
  cream: "#f1eee6"
  white: "#f7f7f6"
  muted: "#cbd9d2"
  focus: "#bde4d4"
  field: "#0e2a23"
  field-border: "#788f84"
  error-border: "#ff938b"
  error-surface: "#54241f"
  caption: "#b3c9bd"
  number: "#8cb7a6"
  ink-muted: "#56645d"
  success-surface: "#e9f4ed"
  success-ink: "#065f46"
  control-white: "#ffffff"
typography:
  display:
    fontFamily: "Manrope Variable, Manrope, system-ui, sans-serif"
    fontSize: "clamp(48px, 9.3vw, 148px)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Manrope Variable, Manrope, system-ui, sans-serif"
    fontSize: "clamp(40px, 4.8vw, 74px)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-0.045em"
  contact:
    fontFamily: "Manrope Variable, Manrope, system-ui, sans-serif"
    fontSize: "clamp(44px, 7.4vw, 112px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.05em"
  year:
    fontFamily: "Manrope Variable, Manrope, system-ui, sans-serif"
    fontSize: "clamp(100px, 18vw, 270px)"
    fontWeight: 700
    lineHeight: 0.85
    letterSpacing: "-0.07em"
  body:
    fontFamily: "Work Sans Variable, Work Sans, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Work Sans Variable, Work Sans, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.12em"
  action:
    fontFamily: "Work Sans Variable, Work Sans, system-ui, sans-serif"
    fontSize: "0.96rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
rounded:
  straight: "0px"
  video-control: "2px"
  control: "3px"
spacing:
  icon-gap: "12px"
  group: "24px"
  mobile-gutter: "20px"
  tablet-gutter: "32px"
  gutter: "48px"
  scene: "80px"
  section: "100px"
components:
  button-submit:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.control-white}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.25rem"
  button-submit-hover:
    backgroundColor: "{colors.success-ink}"
    textColor: "{colors.control-white}"
  button-nav:
    backgroundColor: "{colors.control-white}"
    textColor: "{colors.forest}"
    rounded: "{rounded.control}"
  field-home:
    backgroundColor: "{colors.field}"
    textColor: "{colors.control-white}"
    typography: "{typography.body}"
    rounded: "{rounded.straight}"
    padding: "0.75rem 0.85rem"
  chapter-link:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.straight}"
  catalog-link:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.straight}"
    padding: "8px 0"
  video-toggle:
    backgroundColor: "rgb(6 28 23 / 65%)"
    textColor: "{colors.white}"
    rounded: "{rounded.video-control}"
    padding: "8px 12px"
  sgc-moment:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.straight}"
    padding: "40px 0"
  status-success:
    backgroundColor: "{colors.success-surface}"
    textColor: "{colors.success-ink}"
    rounded: "{rounded.control}"
    padding: "0.85rem 1rem"
  status-error:
    backgroundColor: "{colors.error-surface}"
    textColor: "{colors.control-white}"
    rounded: "{rounded.control}"
    padding: "0.85rem 1rem"
---

# Design System: Forestal Garuhapé — Home V2

## Overview

**Creative North Star: "Industrial Forestry Documentary"**

Fotografía operativa propia, titulares gigantes, rótulos pequeños y numeración de servicios construyen el lenguaje documental industrial elegido por el usuario. El bosque y el negro verde sostienen la operación; el crema marca las pausas institucionales. Manrope da escala a los mensajes, Work Sans organiza la lectura y Tabler Outline acompaña las acciones. La diferencia marcada entre título y metadata es una decisión explícita del brief.

**Estado: Home V2 implementada localmente en `/`.** La instrucción de implementar autorizó la composición y su integración; no existe una aprobación del storyboard pendiente. Este documento extrae el sistema real de `src/css/home.css` y los estilos compartidos que Home hereda de `src/css/styles.css`. Para páginas interiores, `src/css/styles.css` continúa como autoridad: la estética documental de Home no redefine sus superficies de lectura.

Fuentes: plantillas `src/_includes/home/*`, cabecera y contacto compartidos, `src/js/home.js` y `src/js/main.js`; contrato y estado en `docs/PROPUESTA_MODERNIZACION.md`, `docs/STORYBOARD_V2.md` y `docs/FASE_FINAL.md`. La revisión independiente de Home registró `SHIP` sobre código y capturas (1440/768/390), sin hallazgos materiales; su evidencia está en `docs/evidencia/v2-home/` y `.impeccable/review/`. Esta extracción documental no añade pruebas ni una nueva revisión de navegador. La entrega sigue siendo local, sin commit, push ni publicación.

**Key Characteristics:**

- Fotografías operativas reales, logo institucional y mapa con países verificados.
- Titulares gigantes, rótulos pequeños y numeración visible por capacidad.
- Bosque y negro verde alternados con pausas crema.
- Un único motor GSAP/ScrollTrigger con Lenis para la Home elegible.
- Fotos y contenido en flujo como alternativa estática.
- Consulta contextual editable y formulario comercial real.

## Colors

La paleta usa los colores extraídos del CSS implementado. Los valores del frontmatter son normativos para esta documentación de Home.

### Primary

- **Bosque (`forest`)**: imágenes, SGC, cabecera sólida y tinta institucional sobre crema.
- **Verde institucional (`brand`)**: envío comercial y enlaces sobre crema.

### Neutral

- **Negro verde (`night`)**: apertura, recorrido, contacto y pie.
- **Crema de pausa (`cream`)**: año institucional y alcance regional.
- **Blanco suave (`white`) y blanco de controles (`control-white`)**: titulares y lectura sobre oscuro; campos y acciones compartidas, respectivamente.
- **Texto secundario (`muted`)**: introducción, SGC y contenidos de apoyo.
- **Pie operativo (`caption`) y numeración (`number`)**: foto estática y catálogo/índice de capítulos.
- **Tinta secundaria (`ink-muted`)**: aclaraciones sobre crema.
- **Foco claro (`focus`)**: foco en hero, operación, SGC, contacto y pie; selección y caret.
- **Campo y borde (`field`, `field-border`)**: entrada de consulta sobre fondo oscuro.
- **Error (`error-border`, `error-surface`)**: campo inválido y feedback de fallo.
- **Confirmación (`success-surface`, `success-ink`)**: mensaje de envío aceptado y hover del botón compartido.

Las rampas OKLCH de ocho muestras del sidecar se sintetizan para el panel; no son una nueva paleta aplicada al sitio.

**The Surface Authority Rule.** Home V2 usa `home.css` junto con los estilos compartidos; las páginas interiores conservan `styles.css` como autoridad.

## Typography

**Display Font:** Manrope Variable (Manrope, system-ui, sans-serif).
**Body Font:** Work Sans Variable (Work Sans, system-ui, sans-serif).

Fuentes locales precargadas, con `font-display: swap`. Manrope (600/700) establece jerarquía; Work Sans (400/600) sirve a lectura y controles. El brief exige el contraste entre titulares gigantes y rótulos pequeños del hero y los servicios.

### Hierarchy

- **Display:** token `display` en el hero; móvil usa `clamp(42px, 10.7vw, 78px)`.
- **Headline:** token `headline` en capacidades operativas; tablet fija (40px), móvil usa `clamp(36px, 9vw, 52px)`.
- **Contact:** token `contact` en el cierre comercial; móvil usa (10.8vw).
- **Year:** token `year` en la pausa de 1993; móvil usa (29vw).
- **Body:** token `body` compartido; móvil reduce a (16px). Descripciones operativas: `clamp(16px, 1.35vw, 20px)`, ancho máximo (32ch).
- **Label:** token `label` para metadata del hero; móvil (10px). Índice de servicio (12px) con tracking (0.1em); rótulos de la base del hero (11px; 9px móvil). Se conserva su escala pequeña elegida.
- **Action:** token `action` en botones compartidos. Enlaces de servicio (15px); enlace final al catálogo en Manrope, `clamp(20px, 2.5vw, 36px)`.

Introducción, SGC y región conservan sus escalas propias de `home.css`. No se sustituyen todas por el token base de capítulo.

**The Chosen Hierarchy Rule.** Conservar los titulares gigantes y los rótulos pequeños del hero, junto con la numeración de servicios, porque forman parte de la dirección aprobada.

## Layout

Home abre con hero a sangre (100svh), poster inmediato y contenido superpuesto. La cabecera queda fija con JavaScript; es transparente sobre el hero cuando el menú está cerrado y sólida al salir. Sin JavaScript es relativa. Gutter compartido: (48px) escritorio, (32px) tablet y (20px) móvil; altura de cabecera (88/80/72px). El contenedor de la cabecera conserva el máximo compartido (1280px), mientras las escenas usan padding lateral.

Escritorio elegible: seis capítulos de (140svh), escenario fotográfico sticky debajo de la cabecera y texto que avanza en el documento. Cosecha expande máscara; transporte ocupa el lado derecho (desde 40%); acopio mantiene fotografía horizontal a sangre y texto a la izquierda sobre fondo oscuro; caminos abre panorama; biomasa empieza al (18%); consultoría usa marco con inset (4% 8% 15%). Caption identifica el capítulo; el fondo oscuro es continuo, sin cambio abrupto a crema.

La alternativa estática conserva fotos con texto: base en dos columnas, caminos panorámico (2.15) y consultoría (2.2). Hasta (767px), los capítulos se apilan; caminos/consultoría usan ratio (1.5). Móvil reduce padding de secciones a (64px), capítulos a (48px 64px). Empresa, región y contacto pasan a una columna.

La pausa crema combina 1993 y fotografía real de la flota. SGC mantiene cuatro momentos sobre imagen oscura, con altura mínima (50svh; 42svh móvil). El mapa destaca únicamente Argentina y Paraguay. No implica emplazamientos ni cobertura completa del territorio.

## Elevation & Depth

La profundidad principal procede de imágenes a sangre, gradientes y capas tonales. Hero combina transparencias verde oscuro y cierre en negro verde; SGC usa overlay oscuro al (80%). Home no añade sombras decorativas a capítulos ni una escala de tarjetas. El menú móvil compartido sí conserva `0 12px 18px rgb(0 0 0 / 12%)`; la cabecera sobre hero declara `box-shadow: none`.

## Shapes

Marcos fotográficos rectos y máscaras `inset`. Los campos de Home tienen radio (0px), el control de video (2px), y botones/feedback compartidos (3px). Los enlaces de servicio y catálogo usan borde inferior. Tabler Outline usa normalmente (1.25rem) e iconos SVG decorativos fuera del foco.

## Components

### Commercial actions

Botón de envío: token `button-submit`, mínimo (48px), foco (3px) con offset (3px), hover `button-submit-hover` y desplazamiento de activación (1px). Enviando deshabilita el control, anuncia `aria-busy` y cambia el texto a «Enviando…». Consultar en cabecera usa variante clara, mínimo (44px). El acceso final al catálogo usa token `catalog-link`, mínimo (56px) y tipografía de mayor escala.

Cada capítulo conserva «Conocer el servicio» y «Consultar»: enlaces semánticos, mínimo (48px), icono y borde inferior. La consulta mantiene `/?servicio=<slug>#contacto`. Las seis capacidades se resuelven por slug, con biomasa correcta y consultoría canónica en `/consultoria/`.

### Inputs / Fields

Token `field-home` editable, mínimo (48px), textarea mínimo (132px), borde (1px). El foco claro y el caret sobreviven al tema oscuro. Invalidación usa `aria-invalid`, borde de error y texto vinculado; la edición limpia el error del campo.

El formulario real hace POST nativo a `/enviar_mensaje.php`. Con JavaScript, pide JSON al mismo endpoint y conserva los contratos de éxito, errores de campo y fallo; sin JavaScript mantiene el envío nativo. El éxito comunica «El envío fue aceptado», sin equipararlo a recepción efectiva de correo. Fallos de servidor o conexión mantienen una vía comercial alternativa; el fallo de conexión conserva los datos. Consulta contextual sigue siendo editable.

### Navigation

Cabecera compartida con Servicios, Nosotros, SGC y Consultar. Menú tablet/móvil con botón (48px), `aria-expanded`, cierre al navegar/fuera del menú y Escape con restauración de foco. La apertura mantiene fondo sólido aunque la cabecera esté sobre el hero. Anclas de capítulos inmediatas; Lenis suaviza la rueda. Las rutas y el ancla pública técnica `#sgi` se conservan.

### Video control

Autoplay silencioso real desde (1024px), puntero fino, sin movimiento reducido ni ahorro de datos. El poster permanece debajo del video; el botón de pausa aparece cuando hay reproducción y anuncia estado mediante etiqueta/`aria-pressed`. Pausa manual persiste; salir de pantalla u ocultar la pestaña pausa el medio. Cambios de elegibilidad retiran los `src`; móvil/reduced-motion no los asignan.

La Home usa hero-cinematic.mp4: montaje local de fotografías, 36s a 30fps, planos de 8s y disoluciones de 2s, con encuadre fijo y loop continuo. El video entra por opacidad en 1400ms. Si falla o la reproducción se rechaza, se muestra el poster y se anuncia indisponibilidad; si el control tenía foco, se pasa al enlace de recorrido. Los atributos `data-src` permiten evitar carga automática en dispositivos no elegibles.

### Operational sequence

Un contexto GSAP + ScrollTrigger coordina las seis imágenes, máscara y hero; una instancia de Lenis se integra con el ticker. Escala de capítulos (1.02 → 1.05); caminos usa parallax (−1.5% → +1.5%); seguimiento de la secuencia (.9s). Disolución entre fotos de .65 unidades de capítulo con sine.inOut, sobre la foto anterior opaca para evitar flashes oscuros. La flota conserva parallax (−3% → +3%) y scrub .3s. Hero mantiene su medio fijo y desvanece el texto con recorrido vertical de 24px. Los momentos SGC y el mapa usan apariciones breves reversibles.

El contexto se limita a escritorio con puntero fino y movimiento permitido. Cambiar viewport o preferencia revierte estilos, retira ticker y destruye Lenis. Móvil, tablet, movimiento reducido, ausencia de JavaScript o fallo del motor muestran fotos y texto sin el escenario animado. El parallax integrado de Home comparte su contexto; las funciones heredadas para otros selectores no constituyen un segundo motor activo de Home.

### Contact feedback

`status-success` y `status-error` son estados existentes del formulario, con `role="status"`, `aria-live="polite"` y foco programático. Errores de campo orientan al primer control inválido; éxito o fallo de envío orientan al mensaje. Estos snippets documentan apariencia; el contrato y las peticiones viven en el formulario real.

## Do's and Don'ts

### Do:

- **Do** conservar fuentes locales, logo institucional, Tabler Outline y fotografías operativas propias.
- **Do** preservar los titulares gigantes, rótulos pequeños y numeración acordados.
- **Do** mantener una sola instancia de Lenis dentro del contexto de movimiento de Home.
- **Do** conservar lectura estática, foco visible y envío nativo sin JavaScript.
- **Do** mantener las seis capacidades por slug, consulta editable y contratos PHP existentes.
- **Do** usar el mapa exclusivamente como alcance institucional de Argentina y Paraguay.

### Don't:

- **Don't** propagar automáticamente la estética documental de Home a las páginas interiores.
- **Don't** asignar fuentes de video a móvil, movimiento reducido o ahorro de datos.
- **Don't** convertir la pausa manual de video en una reproducción forzada al volver a la pestaña.
- **Don't** inventar cifras, certificaciones, testimonios o ubicaciones operativas.
- **Don't** confundir las muestras manuales del storyboard con la timeline implementada en Home.
- **Don't** presentar la entrega local como publicación ni el envío aceptado como prueba de recepción de correo.


## Recursos de imagen actualizados

Los siete recursos aportados por el usuario se vinculan por servicio y usan AVIF/WebP con hash. Cosecha y Biomasa tienen recortes autorizados para excluir nombres de marca alterados, editados con imagegen; sus originales permanecen en `src/images/actualizadas/originales/`. La nueva Acopio vertical corresponde a catálogo y galería: el capítulo mantiene la fotografía horizontal y el fondo oscuro aprobados. Poster y montaje usan la nueva Cosecha. El detalle de fuentes, dimensiones y prompt figura en `docs/recursos/IMAGENES_ACTUALIZADAS.md`. Los wrappers picture de tarjetas y detalles ocupan el 100% del encuadre existente; las imágenes siguen usando object-fit cover.

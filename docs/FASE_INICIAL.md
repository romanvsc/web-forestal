# Estado inicial del proyecto

Este documento fija la referencia del proyecto antes de iniciar la refactorización. Al finalizar, se podrá contrastar esta fotografía con el estado final sin perder de vista qué se verificó y qué quedó pendiente.

## Identificación de la captura

- **Fecha:** 2026-10-02.
- **Repositorio local:** `C:\Users\roman\Desktop\Desarrollo\Proyectos\web_forestal`.
- **Rama:** `main`.
- **Commit de referencia:** `d5200253457acf8b248ae92dffa8904972f22cd2` (`Limpia metadata del proyecto y elimina el pipeline de Tailwind inactivo`).
- **Estado de Git al inspeccionar:** limpio; `main` estaba alineada con `origin/main`.
- **Remoto `origin`:** `https://github.com/romanvsc/web-forestal.git`.
- **Alcance de esta captura:** inspección estática de archivos y configuración del repositorio. No se ejecutaron build, pruebas ni revisión visual del sitio.

**Corrección documental del 2026-10-02:** al inspeccionar el include real de servicios se corrigió una afirmación heredada del README. La portada usa `todos_los_servicios.json` (6 registros), igual que el listado y las páginas de detalle. La corrección describe el mismo commit de referencia; no corresponde a un cambio del sitio.

## Qué es el proyecto

Sitio corporativo en español de Forestal Garuhapé SA. Presenta servicios forestales, transporte, biomasa, playas de acopio, caminos y consultoría. El repositorio está organizado como un sitio estático generado durante el build; incluye además un endpoint PHP para el formulario de contacto.

## Arquitectura y herramientas

| Área | Estado inicial |
| --- | --- |
| Generación | Eleventy (`@11ty/eleventy` 2.0.1), con `src/` como entrada y `_site/` como salida. |
| Plantillas | Nunjucks (`.njk`), layouts e includes compartidos. La configuración declara también formatos HTML y Markdown. |
| Contenido | Archivos JSON en `src/_data/`, consumidos como datos globales por Eleventy. |
| Estilos | Tailwind Play CDN cargado desde el layout base y CSS propio en `src/css/styles.css`. |
| Recursos externos | Google Fonts (Playfair Display y Work Sans), Tailwind CDN y Swiper 8 por CDN. |
| JavaScript | `src/js/main.js`, servido como archivo estático. |
| Contacto | PHP nativo (`mail()`), copiado al sitio generado junto con los recursos estáticos. |
| Persistencia | No se encontró base de datos ni API de aplicación en este repositorio. |
| Hosting descrito | Apache; `src/.htaccess` configura redirecciones, caché, compresión y cabeceras. |

`package.json` define `start`, `build`, `watch`, `test` y `clean`. El wrapper de build establece `NODE_ENV=production` y ejecuta Eleventy. No invoca un compilador de Tailwind. `tailwind.config.js` y `src/css/tailwind.css` están presentes, pero el layout carga Tailwind desde CDN y enlaza `styles.css`; no enlaza `tailwind.css`. Por eso, en esta captura no hay un pipeline local activo de Tailwind.

## Estructura y contenido

En la captura se contaron **197 archivos versionados**, incluidos **26 archivos Nunjucks**, **20 archivos JSON** y **137 archivos bajo `src/images/`**.

- `src/index.njk` compone la portada con hero, servicios, nosotros y SGC. Los includes de equipo, galería y clientes están comentados en esa portada.
- Hay páginas para servicios, consultoría, nosotros, postulaciones, privacidad y términos. `servicios/detalle.njk` usa paginación de Eleventy para producir una página por registro de `todos_los_servicios.json`.
- `src/_includes/layouts/base.njk` reúne metadatos, cabecera, contenido, pie, botón de WhatsApp y scripts.
- `src/_includes/components/` contiene cabecera, pie, hero, metadatos y formulario de CV; `src/_includes/sections/` agrupa las secciones de contenido.
- `src/_data/` contiene datos globales de la empresa, navegación, servicios, consultoría, equipo, SGC, clientes y galerías.
- La portada, el listado de servicios y las seis páginas de detalle consumen `todos_los_servicios.json` (6 registros). También existe `servicios.json` con 4 registros y contenido parcialmente coincidente, pero el include actual de la portada no consume ese archivo. El README atribuye la portada a este segundo JSON y no coincide con el código inspeccionado.
- `src/images/` contiene fotografías, logos, ilustraciones y videos, organizados en subcarpetas como `clientes/`, `consultoria/`, `equipo/`, `galeria/` y `servicios/`.

## Funciones presentes en el código

- Navegación principal alimentada por `navigation.json`, con menú móvil controlado desde `main.js`.
- Reproducción del video del hero y animaciones de aparición de secciones mediante `IntersectionObserver`.
- Botón flotante de WhatsApp con el teléfono configurado en el sitio.
- Formulario de contacto en el pie: envía nombre, email y mensaje a `/enviar_mensaje.php`. El PHP valida los campos, usa un honeypot y redirige con un estado que `main.js` muestra en pantalla; el envío depende de `mail()` en el hosting.
- Página de trabajo con formulario para adjuntar un CV. En el código inspeccionado, su `action` conserva el valor de ejemplo `YOUR_FORMSPREE_OR_NETLIFY_FORM_URL`; no se encontró en el repositorio un endpoint configurado para recibir ese formulario.
- Generación de metadatos, canonical, Open Graph, Twitter Cards y datos estructurados JSON-LD en `components/meta.njk`; también hay plantillas para `robots.txt`, `sitemap.xml` y `llms.txt`.
- El README documenta `npm test` como build más una comprobación de consistencia del teléfono de contacto. Esta captura no ejecutó ese comando.

## Observaciones concretas para contrastar al final

Estas observaciones describen el código de partida; no implican por sí solas decisiones de alcance para la refactorización.

1. **Datos heredados y documentación desactualizada:** portada, listado y detalle comparten un catálogo de 6 servicios. Existe además un JSON de 4 servicios que el README identifica como fuente de la portada, aunque su include actual usa el catálogo de 6.
2. **Formulario de CV sin destino configurado:** la página existe, pero el `action` apunta a una URL de ejemplo.
3. **Enlace de empleo del pie:** apunta a `https://vogelconsultoria.com.ar`, mientras existe una página local en `/trabaja/`.
4. **Enlaces sociales y de blog:** el pie contiene destinos `#` en los enlaces inspeccionados.
5. **CDN y pipeline CSS:** Tailwind y Swiper se referencian desde el layout. Hay configuración y hoja de entrada de Tailwind en el repo, pero el build observado no compila esa hoja.
6. **Metadatos de repositorio:** el remoto Git apunta a `romanvsc/web-forestal`; el campo `repository` de `package.json` y el ejemplo de clonación del README todavía mencionan `oscarvogel/web-forestal`.
7. **Comando de limpieza:** `npm run clean` ejecuta `rm -rf _site`, comando con sintaxis Unix.
8. **Entorno de esta captura:** Node `v24.11.0` y npm `11.6.1` estaban disponibles; `node_modules/` no existía. No se verificó si el build o los formularios funcionan en un hosting real.

## Comparación al terminar la refactorización

Completar la columna final y adjuntar evidencia al cerrar el trabajo. Mantener intactos los datos de la captura inicial.

| Dimensión | Estado inicial | Estado final / evidencia |
| --- | --- | --- |
| Commit y estructura | `d5200253457acf8b248ae92dffa8904972f22cd2`; 197 archivos versionados. | Pendiente |
| Generación y plantillas | Eleventy 2 + Nunjucks. | Pendiente |
| Fuentes y modelo de contenido | 20 JSON; portada, listado y detalle comparten 6 servicios; existe otro JSON de 4 registros. | Pendiente |
| CSS y dependencias externas | Tailwind Play CDN, CSS propio y Swiper por CDN. | Pendiente |
| Formularios | Contacto con PHP `mail()`; CV con URL de ejemplo. | Pendiente |
| SEO y despliegue | Metadatos estructurados; salida `_site/`; hosting Apache descrito. | Pendiente |
| Verificación | Inspección estática; build, tests y QA visual sin ejecutar. | Pendiente: anotar comandos, resultados y evidencia visual si se realiza |

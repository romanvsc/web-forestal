# Home editorial — relato operativo en slides

Fecha: 2026-10-05. Estado: implementado localmente. Sustituye el recorrido de seis capítulos de Home V2; `/storyboard-v2/` conserva el estudio histórico.

## Guion y composición

| Orden | Sección | Función y material |
| --- | --- | --- |
| 1 | Presentación | «Del bosque a la industria», descripción, Conocer servicios y Consultar. Poster y montaje cinematográfico existentes; pausa disponible. |
| 2 | Seis capacidades | Cosecha, Transporte, Acopio, Caminos, Biomasa y Consultoría. Cuadrícula 3/2/1 columnas, fotografías reales, resumen propio y enlace al detalle. |
| 3 | Cómo operamos | Tres escenas: Planificar → Operar en campo → Abastecer la industria. |
| 4 | Empresa | Pausa crema, 1993, flota existente y Nosotros. |
| 5 | Alcance regional | Mapa institucional: Argentina y Paraguay. |
| 6 | SGC | Imagen oscura y cuatro compromisos compactos: seguridad, calidad, sostenibilidad y mejora continua. |
| 7 | Consulta | Contactos reales y formulario existente. |

No se incorporan cifras, proyectos ni ubicaciones del mockup. El objetivo comercial orienta el diseño; no constituye una mejora medida de conversión.

## Escenas operativas

| Escena | Fotografía | Mensaje y destino |
| --- | --- | --- |
| Planificar | `actualizadas/consultoria-forestal.png` | Planificación del abastecimiento y análisis de la cadena; `/consultoria/`. |
| Operar en campo | `actualizadas/cosecha-forestal.png` | Corte, extracción y carga mecanizada; detalle de Cosecha. |
| Abastecer la industria | `servicios/playa_acopio_1.jpeg` | Logística, organización y movimientos internos; detalle de Acopio. |

`homeNarrative.js` define las escenas. `homeCapabilities.js` combina las seis prestaciones por slug con sus resúmenes de `todos_los_servicios.json`. La selección explícita evita repetir el primer servicio, comportamiento observado con el filtro Nunjucks anterior. `consultingService.js` aplica esa corrección a la introducción de Consultoría.

## Movimiento

- Escritorio ≥1024 px, puntero fino y movimiento permitido: escenario sticky bajo cabecera, tres textos en flujo de al menos 100svh. Imágenes a sangre, mismo encuadre y degradado.
- Timeline GSAP/ScrollTrigger: entrada de imagen 12% → 0%, salida 0% → −8%, fundido de un tercio de capítulo centrado en su límite; `sine.inOut`, `scrub: 0.6`. Imagen de 132% de altura, desplazada inicialmente −16%, cubre el movimiento sin bordes. Sin escala ni parallax adicional.
- Una instancia de Lenis sincronizada con el ticker GSAP. No hay snap ni avances forzados. Las anclas son inmediatas.
- Empresa, mapa y SGC siguen el flujo normal; entradas de contenido de 20 px y 350 ms. Contacto permanece en flujo normal.
- Tablet, móvil, movimiento reducido, ausencia de JavaScript y fallo de inicialización muestran fotos y textos estáticos. Cambiar de contexto revierte GSAP, retira el ticker y destruye Lenis.
- Las seis anclas históricas están en las tarjetas, con margen de cabecera. Se conservan `#sgi`, `#contacto`, rutas, canonical y endpoint PHP.

## Revisión con Apple Design

Se aplicó la skill local `apple-design`, usando sus criterios de jerarquía, lectura, tamaño de acciones, navegación y movimiento opcional al contexto web.

| Criterio | Resultado observado |
| --- | --- |
| Jerarquía | Dos acciones explícitas en la apertura; capacidades antes del relato; crema como pausa institucional. |
| Lectura | Textos descriptivos y enlaces fuera de las fotografías en la variante estática; degradado compartido en las escenas animadas. Sin texto oculto por el motor. |
| Acciones | CTA móvil de 48 px; foco visible heredado; enlace de detalle único en el orden de teclado de cada tarjeta. |
| Navegación | Menú móvil abre con Enter, cierra con Escape y devuelve foco al botón. Las seis tarjetas conservan destinos diferentes y anclas antiguas. |
| Movimiento | Avance y retroceso continuos; segunda escena asentada vuelve a opacidades `[0, 1, 0]`. Redimensionar a tablet elimina el escenario y volver a escritorio lo reinicia. |
| Preferencias y medios | Movimiento reducido y JavaScript desactivado muestran contenido estático. Video bloqueado conserva poster y anuncia indisponibilidad. |

La inspección visual no es una certificación WCAG ni una medición de contraste píxel por píxel de todas las fotografías o frames del video. No se midieron FPS, Core Web Vitals ni conversión.

## Evidencia y aceptación

Capturas en `evidencia/home-editorial-2026-10-05/`:

- 1440 × 900: hero, servicios, campo, abastecimiento, retroceso, movimiento reducido, sin JavaScript y video bloqueado.
- 768 × 1024: servicios en dos columnas.
- 390 × 844: hero y escena estática de campo.
- 360 × 800: hero y SGC compacto.

No se observó desbordamiento horizontal en los tamaños revisados ni bordes vacíos en los cambios de escena muestreados. Las capturas anteriores se conservan en `evidencia/v2-home/` y `evidencia/apple-design-2026-10-05/`.

`npm run build` y `node scripts/check-contact.mjs` pasan. No se enviaron correos en esta revisión; PHP y la lógica del formulario se conservan. No se declara una comprobación nueva del hosting ni de todas las combinaciones de dispositivo, lector de pantalla o fallo de red.

Entrega local, sin commit, push ni publicación.

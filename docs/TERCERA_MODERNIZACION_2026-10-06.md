# Tercera modernización — interiores y cierre de la segunda auditoría

## Estado y alcance

Implementación local de las ocho prioridades de `SEGUNDA_AUDITORIA_2026-10-05.md`. Base comparada: commit `98e7d7244b3b8edd6f2c4f545a8a53ea0d829d43`, exportado y compilado en una copia aislada de `.cache/third-baseline/source`. La auditoría y sus capturas originales se conservan. Sin commit, push ni publicación de esta entrega.

## Antes / Después / Por qué

| Prioridad | Antes | Después | Por qué |
| --- | --- | --- | --- |
| Interiores | Apertura solo tipográfica | Apertura fotográfica compartida, CTA y lectura clara posterior | Continuidad con Home y orientación comercial inmediata. |
| Consultoría | Áreas con H2 | H2 de sección y H3 por área | Jerarquía semántica de lectura. |
| Nosotros | Montaje institucional | Fotografía existente de la flota | Material documental coherente; se conserva historia, empresas del grupo, capacidades y SGC. |
| Galerías | Todas las imágenes visibles | Hasta tres fotos documentales y disclosure nativo para el resto | Reducir repetición y ordenar recursos. |
| Home | Resúmenes completos en tarjetas | `resumen_home` específico, encuadre propio, Empresa alineada arriba | Facilitar exploración y mejorar ritmo sin alterar el relato. |
| Video | 8.817.563 bytes | 6.667.385 bytes, exportado desde las fotografías originales | Reducir 24,4 % el peso, manteniendo 1280×720, 30 fps, 36 s y fundidos de 2 s. |
| Controles y contacto | Enlaces secundarios menores y sin orientación de campos | Enlaces del footer de 48 px, aviso de obligatorios y servicio opcional | Facilitar interacción y preparar consultas editables. |
| Mantenimiento y voz | Overrides históricos y colores repetidos | Tokens compartidos, reglas retiradas y títulos en frase en región/contacto | Consistencia y menos ambigüedad. |

## Decisiones implementadas

- Servicios y Consultoría: imagen a sangre y degradado en escritorio, mínimo 480 px. En móvil: foto horizontal seguida de copy crema; H1 de 32–40 px para conservar títulos largos en 360 px. Índice **Alcance / Imágenes / Consultar** en flujo, sin fijación.
- Relaciones: Cosecha → Transporte/Acopio; Transporte → Cosecha/Acopio; Acopio → Transporte/Biomasa; Caminos → Transporte/Consultoría; Biomasa → Cosecha/Acopio; Consultoría → Cosecha/Caminos. Consultoría conserva canonical hacia `/consultoria/` y su ruta alternativa.
- Galería principal: fotografías del repositorio; ilustraciones y recursos cuyo nombre alude a certificados quedan fuera de la selección principal. Consultoría tiene **una** fotografía documental identificada: se muestra amplia; sus ilustraciones permanecen como material complementario. No se inventaron otras dos fotos de un equipo ni certificaciones.
- Contacto: selector opcional `servicio`, seis slugs permitidos y validación 422 para valores desconocidos. El mensaje solo se sustituye si está vacío o coincide exactamente con la sugerencia anterior. Un mensaje editado se conserva. El servicio se incluye en el correo. Honeypot, destinatario y rutas se mantienen.
- Video: H.264 `slow`, CRF 26, sin audio; script offline parametrizado por CRF y salida. Comparación de hojas de fotogramas antes/después y comprobación del loop. Poster, pausa y exclusión de video en móvil/movimiento reducido se conservan.
- No se incorporaron dependencias, cifras, ubicaciones o proyectos nuevos. John Deere/Volvo no se añadieron al copy.

## Referencias y revisión de diseño

Se aplican las referencias ya estudiadas en la segunda auditoría: Stora Enso para apertura por servicio, Ponsse para historia documentada, Apple MacBook Pro para orientación local adaptada a un índice en flujo, y Komatsu para claridad de capacidades. GTA VI y las referencias originales siguen vinculadas al relato existente; esta revisión no cambia su motor ni copia componentes de React.

Apple Design se usa como principios trasladados a web: `layout.md › Visual hierarchy` para orden y disclosure; `typography.md › Conveying hierarchy` para H2/H3; `accessibility.md › Vision` para legibilidad, foco y revisión responsive; `entering-data.md` para orientación de campos; `motion.md` para movimiento opcional. Impeccable mantiene Persuade en Home, Read en interiores y Operate en contacto. La identidad aprobada prevalece: Manrope, Work Sans, Tabler y paleta bosque/crema.

La revisión visual identificó y corrigió el título largo de Biomasa en 360 px y unificó el selector con el aspecto de los campos de cada superficie. Los textos de apertura se apoyan en un degradado fuerte en escritorio; en móvil están sobre crema. No se presenta esta revisión como certificación WCAG ni auditoría nativa Apple.

## Verificación realizada

- Build de producción: correcto; 17 archivos generados. `php -l` y comprobación existente de consistencia de contacto: correctos. `git diff --check`: correcto.
- Trece rutas en 1440×900, 768×1024, 390×844 y 360×800: un H1 por documento, sin desbordamiento horizontal. Capturas de aperturas, revisión conjunta y páginas completas de Home, Cosecha y Consultoría. Archivo `route-check.json` y `responsive-check.json`.
- Menú móvil: apertura, Escape y retorno de foco al botón. Foco visible de 3 px en índice. Galería expandible, enlaces contextuales y relaciones entre servicios disponibles. Anclas con margen de cabecera definido en CSS.
- Relato: avance, retroceso y cambio a tablet; las tres imágenes vuelven a flujo estático. Movimiento reducido elimina el contexto animado y los `src` del video. Captura de Home sin JavaScript y de poster mientras el video está bloqueado.
- Contacto con PHP y Mailpit ligados a localhost, sin relay externo: vacío, correo inválido, servicio desconocido, método 405, los seis servicios, servicio vacío, éxito JSON, error nativo con datos escapados y servicio conservado, redirección nativa 303, fallo SMTP 503. Captura de correo en Mailpit. `contact-check.json`.
- Interacción: consulta contextual, mensaje editado conservado al cambiar servicio, éxito con limpieza, fallo de servidor y conexión con datos conservados, envío nativo sin JavaScript. Una doble pulsación produjo una sola consulta capturada (total Mailpit de 10 a 11).
- Reflow adicional a 720×450 sin desbordamiento. El comando de zoom del navegador no alteró la escala: **zoom real al 200 % pendiente**, esta muestra no lo sustituye.

## Peso y medición local

| Recurso | Antes | Después |
| --- | ---: | ---: |
| CSS + JavaScript gzip, nivel 9 | 63.758 B | 64.086 B |
| Video | 8.817.563 B | 6.667.385 B |

CSS/JS permanecen por debajo del presupuesto de 180 KiB gzip. El pequeño aumento de CSS corresponde a las aperturas e índice compartidos. La reducción de video es una comparación de archivos; no prueba por sí sola un LCP menor.

Diagnóstico con el mismo servidor estático instrumentado, viewport 1440×900, localhost, sin throttling y movimiento reducido: tres muestras sucesivas de LCP antes 124/120/120 ms y después 128/136/140 ms. CLS antes 0,0618/0/0 y después 0/0/0. Son lecturas tempranas en un entorno local; no representan Core Web Vitals de campo ni prueban una mejora de carga. El video queda excluido de este perfil. Datos completos en `local-load-check.json`.

## Evidencia y límites

Capturas y registros: `evidencia/tercera-modernizacion-2026-10-06/`. Los archivos `before-*` corresponden al commit anterior, con el mismo tamaño y rutas de referencia. Algunas primeras capturas de las páginas que no cambiaron muestran la entrada de título aún en curso; las capturas de movimiento reducido permiten contrastar el estado estático.

La matriz final fue guardada nuevamente con movimiento reducido, después de las correcciones, para que los títulos estén completamente visibles y la comparación sea estable. La Home queda abierta en `http://127.0.0.1:8080/`. La revisión con PHP permanece disponible en `http://127.0.0.1:8090/`, con Mailpit en `http://127.0.0.1:8025/`; ambos ligados a localhost. Los servidores de baseline, medición y fallo controlado se cerraron al terminar.

No se verificaron Safari, dispositivos físicos, lector de pantalla, zoom real 200 %, métricas de producción ni recepción por el servidor de correo real. La muestra de bloqueo de video confirma poster y control oculto durante carga fallida; no se hicieron pruebas exhaustivas de todos los errores de decodificación. No hay analítica para atribuir una mejora de conversión.

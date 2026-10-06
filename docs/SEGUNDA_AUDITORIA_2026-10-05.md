# Segunda auditoría — Forestal Garuhapé

Fecha: 2026-10-05. Base: commit `98e7d72`. Revisión y propuestas; sin cambios de interfaz.

## Dictamen

**Buena base, con identidad propia.** La tesis sigue siendo presentar una operación forestal integrada y facilitar consultas comerciales. El relato de tres escenas, la paleta bosque/crema y los recursos propios merecen conservarse. La siguiente modernización debería mejorar la continuidad de las páginas interiores, la selección editorial de fotografías y la orientación comercial.

No se identificaron bloqueos P0 en las muestras revisadas. Las recomendaciones visuales son juicio de diseño, diferenciadas de los hallazgos de código. No se certifica WCAG ni mejora de conversión.

## Alcance y evidencia

- Navegador local, Home en 1440 × 900 y 390 × 844; Cosecha, Nosotros, catálogo y Consultoría por muestras. Se observaron acciones de introducción después de asentarse su animación: su aparición inicial tenue no se reporta como contraste permanente.
- Inspección de Nunjucks, CSS y JavaScript de Home, componentes compartidos y detalles.
- Skill Apple Design: fundamentos de accesibilidad, layout, tipografía, color, movimiento, botones, entrada de datos y escritura. Solo se trasladan principios al sitio web, sin exigir convenciones nativas de macOS/iOS.
- Impeccable: contexto del producto, auditoría y detector sobre seis archivos. Resultado: 0 hallazgos primarios, 75 avisos (69 de escala tipográfica y 6 de color). Los avisos no equivalen a defectos; parte procede de estilos históricos sobrescritos y de comparar interiores con el sistema documentado de Home.
- Guías Vercel consultadas en su fuente actual. Capturas bajo `evidencia/segunda-auditoria-2026-10-05/`.
- Referencias externas: Komatsu y Stora Enso inspeccionados visualmente; Ponsse consultado como contenido institucional. Apple MacBook Pro: apertura y navegación observadas, pero medios no visibles en la muestra; no se evalúa su animación completa.

### Evaluación orientativa de Impeccable

| Dimensión | Nota / 4 | Evidencia y límite |
| --- | --- | --- |
| Accesibilidad | 3 | Etiquetas, foco y controles principales; jerarquía de Consultoría mejorable. Sin lector de pantalla ni zoom 200 %. |
| Rendimiento | 2 | Imágenes responsivas y fuentes locales; video de apertura de 8.817.563 B. Sin medición de red o Core Web Vitals. |
| Responsive | 3 | Muestras móviles sin desbordamiento; recorrido largo y enlaces secundarios de 40 px. Sin dispositivo físico. |
| Sistema visual | 2 | Identidad clara; colores literales, overrides y documentación con restos históricos. |
| Integridad | 4 | Recursos y hechos del proyecto, catálogo completo, movimiento con alternativa estática; detector sin hallazgos primarios. |
| **Total orientativo** | **14 / 20** | **Bueno; evaluación parcial, no puntuación Lighthouse ni certificación.** |

## Hallazgos y propuestas prioritarias

### 1. P2 / oportunidad alta — Continuidad editorial en interiores

**Dónde:** `src/servicios/detalle.njk:26`, `src/_includes/sections/consultoria.njk:3`, `src/css/styles.css:186`.

**Observado:** Home empieza con fotografía a sangre; Cosecha y Consultoría abren con una introducción clara sobre una gran superficie casi blanca. Cosecha desplaza la fotografía al bloque de alcance. La diferencia es intencional en el sistema actual, pero pierde continuidad de identidad.

**Propuesta:** introducir un encabezado editorial de servicio con fotografía horizontal, título, resumen y Consultar; después, conservar superficies claras para alcance y lectura. Consultoría debería usar su vista aérea como apertura. No fijar ni añadir scrollytelling a los detalles. Es juicio de diseño, no fallo funcional.

**Fundamento:** `writing.md › Best practices`, “Consider each screen’s purpose”; priorizar lectura en interiores y persuasión en su apertura.

### 2. P2 — Reducir repetición y longitud en móvil

**Dónde:** `src/_includes/home/capabilities.njk:10`, `src/_includes/home/operation.njk:13`, `src/_data/todos_los_servicios.json`.

**Observado:** Home mide aproximadamente 11.901 px a 390 × 844: unas 14 alturas de viewport. Cosecha y Consultoría aparecen en la cuadrícula y vuelven como escenas. Los resúmenes completos producen tarjetas largas. La altura por sí misma no demuestra abandono.

**Propuesta:** mantener los seis servicios y sus enlaces, pero crear un resumen específico de Home de una frase, aproximadamente 18–28 palabras. Reservar el resumen completo para catálogo/detalle. Usar otro encuadre o fotografía existente en el relato cuando aporte información distinta. Conservar las tres escenas apiladas, sin esconder el contenido en un carrusel.

**Fundamento:** `writing.md › Getting started`, “Be clear”; `motion.md › Best practices`, movimiento con propósito. La reducción del recorrido es una hipótesis de UX, pendiente de comparación.

### 3. P2 — Fotografías y galerías con intención documental

**Dónde:** `src/_includes/sections/nosotros.njk:6`, `src/servicios/detalle.njk:58`.

**Observado:** Nosotros usa un montaje ilustrativo con personas, planta e iconos; la apertura de Home y la flota transmiten otra estética. El alt actual lo presenta como equipo y operación de la empresa; el montaje no identifica a esas personas. Las galerías tienen el título genérico «Imágenes del servicio».

**Propuesta:** reemplazar el montaje por una foto operativa existente o la flota, sin atribuir personas no verificadas al equipo. Dar pies concretos a 2–3 imágenes por servicio, usando únicamente la actividad confirmada en el material. No añadir casos, clientes ni resultados sin documentación.

**Fundamento:** `writing.md › Best practices`, “Write for everyone”; describir el contenido con precisión. La preferencia por fotografía documental es juicio de diseño.

### 4. P2 — Corregir jerarquía de Consultoría y orientación entre detalles

**Dónde:** `src/_includes/sections/consultoria.njk:32`, `src/servicios/detalle.njk:30`.

**Código y DOM:** los ocho títulos de áreas de Consultoría usan H2, al mismo nivel que «Áreas de consultoría». No se identifican como subsecciones en la estructura. Los detalles permiten volver al catálogo, pero no elegir una capacidad relacionada sin salir a él.

**Corrección:** títulos de áreas H3 manteniendo su apariencia. Añadir navegación breve al cierre del detalle con 2 servicios relacionados por el proceso real, más «Todos los servicios». Ejemplo: Cosecha → Transporte / Acopio; no inventar relaciones contractuales.

**Fundamento:** [Vercel — Accessibility](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md): jerarquía semántica; `writing.md › Best practices`: acciones claras. La navegación relacionada es una mejora propuesta.

### 5. P2 — Revisar coste del video de apertura

**Dónde:** `src/_includes/home/hero.njk:7`, `src/js/home.js:66`, `src/images/hero-cinematic.mp4`.

**Medido:** MP4 de 8.817.563 B, aproximadamente 8,4 MiB. Se asigna y reproduce automáticamente en escritorio elegible; móvil, movimiento reducido y ahorro de datos ya evitan esa carga.

**Propuesta:** comparar una codificación más ligera del mismo montaje y sus fundidos, con calidad visual revisada. Mantener poster inmediato, pausa y encuadre estable. No sustituir suavidad por compresión excesiva; fijar un nuevo presupuesto tras comparar peso y calidad. Medir transferencia y LCP/INP/CLS en el entorno publicado antes de afirmar mejora de carga.

**Fundamento:** `motion.md › Best practices`, “Add motion purposefully”; el coste técnico es constatado, su impacto en tiempo de carga todavía no.

### 6. P2 — Afinar controles secundarios y orientación del formulario

**Dónde:** `src/css/styles.css:259`, `src/css/styles.css:262`, `src/_includes/components/footer.njk:27`.

**Medido en móvil:** enlaces de la lista del footer: 40 px de altura; dominio final: 21,75 px. Las vías de contacto tienen 44 px y las acciones de Consultoría 48 px. Los tres campos son obligatorios, pero las etiquetas no lo explicitan.

**Propuesta:** elevar enlaces secundarios a 44–48 px, sin agrandar su tipografía. Añadir «Todos los campos son obligatorios». Como mejora posterior, un selector opcional de servicio puede preparar el mensaje sin añadir campos al contrato PHP; su incorporación requiere diseñar cómo preservar el texto ya escrito.

**Fundamento:** `accessibility.md › Mobility`, “Offer sufficiently sized controls”; `entering-data.md › Best practices`, “Be clear about the data you need”. Las alturas menores de 44 px no se presentan automáticamente como infracción WCAG 2.2.

### 7. P2 — Consolidar tokens y retirar restos de composiciones anteriores

**Dónde:** `src/css/home.css:18`, `src/css/home.css:159`, `src/css/home.css:49`, `DESIGN.md`.

**Código:** hero definido primero con máximo 148 px y redefinido después a 112 px. Persisten reglas de Caminos/Consultoría y del cierre de catálogo que el relato actual no usa. Home repite colores literales aunque el CSS compartido tiene variables. El detector señala avisos de documentación, no errores visuales confirmados.

**Propuesta:** consolidar cada selector, retirar reglas verificadas sin uso y nombrar colores por función. Actualizar DESIGN.md y su sidecar para separar escalas de Home e interiores y registrar el estado publicado. Mantener exactamente el aspecto aprobado durante esa limpieza.

### 8. P3 — Una voz editorial más consistente

**Dónde:** `src/_includes/home/regional.njk:2`, `src/_includes/components/footer.njk:4`, `src/_includes/home/company.njk:4`.

**Observado:** hero y operación usan frase; región/contacto usan mayúsculas grandes. La nota del mapa explica principalmente qué no representa. Empresa separa fotografía y copy con mucho espacio vertical por alineación inferior.

**Propuesta:** mantener mayúsculas en rótulos y probar titulares en frase para región/contacto. Simplificar el pie del mapa a «Presencia institucional en Argentina y Paraguay», conservando su significado. En Empresa, alinear el copy con el inicio de la foto y agrupar fundación/historia/acción para reducir la separación observada, sin añadir cifras.

**Fundamento:** `writing.md › Best practices`, “Build language patterns”. Tipografía y alineación: juicio de composición.

## Inspiraciones revisadas y aplicación

| Referencia | Qué se revisó | Adaptación concreta para Forestal |
| --- | --- | --- |
| [Komatsu — Purpose-built for the forest](https://www.komatsu.com/en-us/products/equipment/forestry/purpose-built) | Página y apertura visual; diagrama del ciclo forestal, bloques de capacidades y enlaces. | Un esquema compacto Planificar → Operar → Abastecer como índice del relato, con los servicios correspondientes. Usar la claridad del proceso; conservar nuestro lenguaje visual y cuadrícula. |
| [Stora Enso — Servicios forestales](https://forest.storaenso.com/nb-no/for-skogeiere/tjenester-for-skogeiere) | Hero fotográfico y contenido organizado alrededor de las necesidades del propietario. | Abrir cada servicio con actividad + necesidad que cubre + alcance confirmado; cerrar con una consulta contextual. El recurso humano requeriría fotos reales aprobadas. |
| [Ponsse — About Ponsse](https://www.ponsse.com/en/company/about-ponsse) | Contenido: origen, evolución y relación con clientes. No se inspeccionó su movimiento. | Desarrollar Nosotros con fundación en 1993, composición del grupo, operación y SGC. Añadir hitos solo cuando se documenten. |
| [Apple — MacBook Pro](https://www.apple.com/macbook-pro/) | Apertura y barra local de navegación en scroll. Medios incompletos en la muestra. | Evaluar un índice local discreto en detalles largos: Alcance / Imágenes / Consultar. No añadirlo a Home ni duplicar toda la cabecera. Probar espacio disponible antes de adoptarlo. |

Las referencias GTA VI, Lenis y los catálogos del plan original siguen orientando el relato ya implementado. Esta auditoría no justifica incorporar nuevas librerías ni cambiar fuentes o paleta.

## Próxima modernización recomendada

1. **Correcciones pequeñas:** H3 de Consultoría, texto de campos obligatorios y superficies táctiles del footer (`$impeccable harden` / `adapt`).
2. **Interiores editoriales:** prototipo de Cosecha y Consultoría con apertura fotográfica, alcance legible, galería documentada y relaciones entre servicios (`$impeccable shape` / `layout`). Revisar ambos antes de extender al resto.
3. **Ritmo de Home:** resúmenes específicos, selección de encuadres y ajuste de Empresa/mapa (`$impeccable distill` / `clarify`). Conservar el movimiento actual hasta comparar visualmente.
4. **Coste y mantenimiento:** comparar codificación del video, medir carga y consolidar tokens/CSS (`$impeccable optimize` / `document`).
5. **Cierre:** una revisión desktop/mobile de las correcciones con `$impeccable polish` y auditoría posterior.

Se pueden abordar por separado o en conjunto. Esta recomendación no autoriza su implementación ni publicación.

## Qué conservar

- Manrope, Work Sans, paleta bosque/crema y Tabler Outline.
- Fotografía operativa, Acopio horizontal y encuadre compartido del relato.
- Tres escenas, scroll continuo, posibilidad de retroceder y alternativa estática.
- Menú sencillo, CTA comercial y mensajes editables por servicio.
- Lectura clara en interiores, disclosures nativos y contratos de contacto.

## Límites

No se revisaron visualmente todos los detalles, empleo o legales, ni todos los estados de animación. No hubo envíos de formulario, pruebas de PHP, lector de pantalla, zoom al 200 %, Safari, dispositivo físico, métricas de producción ni analítica. No se estimó contraste de fotografías a partir de capturas. No se ejecutaron builds ni suites de pruebas: la revisión fue visual y de código sobre el estado existente.

Solo se añadieron este informe y sus capturas. Sin modificaciones de frontend, commit o push.

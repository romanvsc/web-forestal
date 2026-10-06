# Auditoría de diseño — Forestal Garuhapé SA

Fecha: 5 de octubre de 2026. Skill: [dickwu/apple-design-skill](https://github.com/dickwu/apple-design-skill).

## Alcance y método

La skill ya estaba instalada en `C:/Users/roman/.codex/skills/apple-design`. Se comparó su `SKILL.md` con el archivo publicado en la rama `main`: contenido idéntico, ignorando espacios exteriores. No fue necesaria una reinstalación.

Se aplicaron principios y fundamentos de diseño para una web Eleventy/Nunjucks: accesibilidad, jerarquía, lectura, interacción y contenido. Las convenciones nativas de iOS/macOS, sus medidas en puntos y Liquid Glass no se trasladan como obligaciones a esta web.

Tesis: mostrar la operación forestal con una narrativa documental y facilitar consultas comerciales. La fotografía a sangre, los titulares Manrope, la lectura Work Sans y el verde bosque forman una dirección coherente con el proyecto.

Se revisó la versión local de `main`, con los cambios de continuidad existentes en `home.css` y `home.js`, no únicamente el último commit publicado. Se levantó `npm start`: compilación de recursos y generación de 17 salidas completadas. No se modificaron plantillas, estilos, scripts ni endpoint durante esta auditoría.

Referencias leídas de la skill: `accessibility.md`, `layout.md`, `typography.md`, `color.md`, `designing-for-macos.md`, `motion.md`, `buttons.md`, `entering-data.md`, `writing.md` y `references/cross-platform.md`. Las citas siguientes remiten a los archivos de `references/hig/`. Las propuestas de composición se identifican como juicio de diseño.

### Evidencia actual

| Superficie | Evidencia y comprobación |
| --- | --- |
| Home móvil, 390 × 844 | Poster, rótulos, menú abierto/cerrado, Escape y retorno al botón; captura `mobile-hero.png`. |
| Recorrido móvil | Accesos a capacidades y Acopio estático; `mobile-servicios.png`, `mobile-acopio.png`. |
| Contacto móvil | Consulta de Acopio precompletada y editable; validación de nombre/correo vacíos sin envío; `mobile-contacto-invalid.png`. |
| Home escritorio, 1440 × 900 | Entrada por ancla de Acopio, imagen horizontal a sangre después de asentarse la disolución; `desktop-acopio-anchor.png`. |
| Estado hover de Acopio | Color real computado del enlace «Consultar»; `desktop-acopio-hover.png`. |
| Catálogo y Cosecha, 1440 × 900 | Lectura, navegación y logo; `desktop-catalogo.png`, `desktop-cosecha.png`. |
| Nosotros, 768 × 1024 | Logo, contenido, enlace que vuelve a la misma URL, sin desbordamiento horizontal en la muestra; `tablet-nosotros.png`. |
| Movimiento reducido en escritorio | Emulación temporal: desaparece `has-home-motion`, escenario `display:none`, fuente del video sin `src`. Se retiró la emulación al terminar. |

Capturas en [evidencia/apple-design-2026-10-05](evidencia/apple-design-2026-10-05/). Algunas capturas de navegación incluyen una animación de introducción en progreso; no se deducen problemas de contraste a partir de esos estados transitorios.

## Evaluación

Dirección visual sólida, con una corrección de accesibilidad prioritaria y ajustes de identidad, orientación y conversión. Conviene conservar la identidad actual y mejorar estos puntos antes de añadir efectos.

### 1. Crítico — El hover de Acopio reduce el contraste de la acción comercial

**Dónde:** `src/css/home.css:66`.

**Evidencia:** al pasar el cursor por «Consultar», el navegador aplica `rgb(15,118,110)` (`#0f766e`) a texto de 15 px. Sobre la superficie oscura `#061c17`, el contraste calculado es **3,23:1**, inferior a 4,5:1 para este texto. En la variante animada hay una fotografía detrás: ese contraste varía por píxel y no se declara medido en toda la imagen. La variante estática conserva la combinación sólida problemática. La regla quedó compartida con enlaces sobre crema.

**Mejora:** separar el hover de Acopio del de Empresa/Región. Usar `#bde4d4` en el contexto oscuro: **12,82:1** sobre `#061c17`; mantener el verde institucional sobre crema.

**Fundamento:** `accessibility.md › Vision`, “Strive to meet color contrast minimum standards.”

### 2. Alto — El nombre del logo se pierde en las páginas interiores

**Dónde:** `src/images/fg-negative.svg:136`, `src/_includes/components/header.njk:5`, `src/css/home.css:9`.

**Evidencia:** parte del logo tiene relleno `#272525` sobre cabecera `#082d25`: **1,03:1**. Se ve en Catálogo, Cosecha y Nosotros. Home aplica un filtro blanco que las interiores no reciben. El mismo asset se usa en el pie compartido.

**Mejora:** utilizar una variante institucional realmente negativa y consistente en cabecera/pie de todas las rutas. Conservar forma, texto y proporciones del logo.

**Fundamento:** `color.md › Best practices`, “Make sure all your app’s colors work well in light, dark, and increased contrast contexts.” La gravedad aquí es de identidad y legibilidad; los logotipos tienen una excepción en los requisitos WCAG de contraste de texto.

### 3. Medio — El hero móvil pierde el sujeto operativo de la fotografía

**Dónde:** `src/css/home.css:14`, `src/_includes/home/hero.njk:5`.

**Evidencia:** en 390 × 844 predomina el cielo; la máquina queda parcialmente cortada a la derecha. `object-position` computado: `50% 50%`. La adaptación usa la misma fotografía horizontal con `cover`.

**Mejora:** elegir un punto focal móvil que conserve cabina/equipo o un encuadre alternativo del mismo material. Evaluarlo también en 360 px antes de fijar el valor. No se prescribe un porcentaje sin comprobar el resultado.

**Fundamento:** `layout.md › Adaptability`, “scale background artwork in response to display changes.” La selección del sujeto es juicio de diseño documental.

### 4. Medio — La acción comercial queda dentro del menú en la primera pantalla móvil

**Dónde:** `src/_includes/components/header.njk:17`, `src/_includes/home/hero.njk:19`.

**Evidencia:** con menú cerrado, el hero ofrece «Recorrer la operación» y la navegación oculta «Consultar». La acción comercial requiere abrir el menú o avanzar hasta un capítulo.

**Mejora:** añadir «Consultar» como acción secundaria visible junto a la entrada al recorrido, o mantenerla junto al botón del menú si el espacio lo permite. Conservar un área de 44–48 px y no cubrir el contenido con una barra flotante adicional.

**Fundamento:** `layout.md › Visual hierarchy`, “Order content by relative importance.” Priorizar esta acción responde al objetivo comercial; no se afirma una mejora de conversión medida.

### 5. Medio — Los rótulos móviles bajan a 9–10 px

**Dónde:** `src/css/home.css:122`, `src/css/home.css:125`.

**Evidencia:** tamaño computado de «DESDE 1993» y «OPERACIÓN REGIONAL»: 9 px; identificación de empresa/países: 10 px.

**Mejora:** probar 11–12 px para metadata en móvil, conservando mayúsculas, tracking y diferencia de escala con los titulares. Permitir reorganización de los dos bloques cuando crezca el texto.

**Fundamento:** `typography.md › Ensuring legibility`, “Use font sizes that most people can read easily.” Es una mejora de legibilidad, no una infracción WCAG automática por tamaño ni una conversión de puntos iOS a píxeles web.

### 6. Medio — Las interiores necesitan edición editorial y orientación más clara

**Dónde:** `src/servicios/index.njk:31`, `src/servicios/detalle.njk:27`, `src/_includes/sections/nosotros.njk:13`, `src/_includes/components/header.njk:13`.

**Evidencia:** el catálogo corta descripciones a 190 caracteres, incluso a mitad de palabras. Cosecha abre con un párrafo extenso antes del alcance. En Nosotros, «Conocer Forestal Garuhapé SA» vuelve a `/nosotros/`, comprobado al pulsarlo. Los enlaces principales no indican ruta actual con `aria-current`.

**Mejora:** redactar una entradilla completa de 25–40 palabras por servicio y presentar el alcance en bloques fáciles de escanear, conservando los hechos. Sustituir el enlace a sí mismo por un destino útil, como `#sgi`, o retirarlo en esa ruta. Marcar la página actual y distinguir Servicios también en sus detalles sin atribuir `aria-current="page"` a una URL diferente.

**Fundamento:** `writing.md › Getting started`, “Be clear”; `writing.md › Best practices`, “Be action oriented”; `layout.md › Visual hierarchy`, agrupación por relación. La extensión sugerida es juicio editorial.

### 7. Medio — El formulario puede orientar mejor la consulta y recuperar una petición detenida

**Dónde:** `src/_includes/components/footer.njk:40`, `src/js/main.js:127`.

**Evidencia:** la ayuda actual explica que el mensaje es editable, sin indicar qué información resulta útil. El `fetch` no tiene cancelación ni límite de espera propio; el botón permanece deshabilitado mientras la petición siga pendiente. Este segundo punto procede de inspección de código, no de una falla reproducida de servidor.

**Mejora:** usar una ayuda como «Indique el servicio, la ubicación de la operación y lo que necesita». Añadir un límite de espera razonable, conservar valores y devolver el control al usuario con mensaje de incertidumbre: «No pudimos confirmar el envío». Un timeout no demuestra que el servidor no haya recibido la consulta; evitar reintentos automáticos y promesas de entrega.

**Fundamento:** `entering-data.md › Best practices`, “Be clear about the data you need”; `buttons.md › Platform considerations › Mobile (iOS, iPadOS)`, feedback durante acciones demoradas, trasladado como principio de interacción.

### 8. Bajo — Revisar la duración de las pausas SGC en móvil

**Dónde:** `src/css/home.css:75`, `src/css/home.css:145`.

**Evidencia:** cuatro mensajes breves tienen un mínimo de 42svh cada uno en móvil: alrededor de 1,68 pantallas solo en esos bloques, además del título y márgenes. La Home móvil medida tiene aproximadamente 11.074 px de altura a 390 × 844.

**Mejora:** probar altura por contenido y separadores en móvil, manteniendo la cadencia amplia en escritorio. Es una hipótesis de eficiencia de lectura que requiere comparar el recorrido; no hay analítica que pruebe abandono ni motivo para acelerar todas las disoluciones.

**Fundamento:** `motion.md › Best practices`, “Add motion purposefully”; `layout.md › Visual hierarchy`, agrupación y jerarquía. La reducción propuesta es juicio de UX.

## Qué conservar

- El escenario común a sangre: Acopio ya se asienta en una fotografía horizontal del mismo tamaño que los otros capítulos. Una captura justo después del salto mostró Transporte durante la disolución; la observación posterior confirmó Acopio. Ese instante no se registra como un fallo permanente de sincronización.
- Los titulares, la paleta bosque/crema y Tabler Outline. Contrastes sólidos de referencia: `#f7f7f6` sobre `#061c17`, 16,51:1; `#56645d` sobre blanco, 6,22:1; blanco sobre `#0f766e`, 5,47:1.
- Menú no modal, etiquetas claras, foco y cierre con Escape.
- Consulta por servicio editable, errores junto al campo, nombre/correo con autocompletado y vías directas de contacto.
- La alternativa estática y el respeto a movimiento reducido; el video no comunica información imprescindible.

## Secuencia recomendada

1. Corregir hover de Acopio y variante del logo.
2. Ajustar foco fotográfico, rótulos y acceso comercial móvil.
3. Editar entradillas, enlaces de orientación y ayuda del formulario.
4. Añadir recuperación de peticiones pendientes y comparar la cadencia móvil de SGC.

## Límites de la revisión

Auditoría por muestras visuales de Home, catálogo, Cosecha y Nosotros, más inspección de componentes compartidos. No representa una revisión visual exhaustiva de los otros cinco detalles, consultoría, empleo y legales. No se enviaron mensajes, no se ejecutó PHP/Mailpit, ni se verificó entrega de correo. No se midieron FPS, métricas de conversión, rendimiento de red ni contraste por píxel de cada plano del video. Tampoco se completó una revisión con lector de pantalla, zoom de texto al 200 % o navegación íntegra sin JavaScript. Esas comprobaciones quedan pendientes antes de afirmar conformidad completa.

Solo se añadieron este informe y sus capturas. Se conservaron los cambios locales previos. No hubo commit, push ni publicación.

## Aplicación autorizada — 2026-10-05

Tras la instrucción «Okey aplica esos cambios», se implementaron las ocho recomendaciones:

- Acopio hereda el hover claro de Home; la regla verde queda para Empresa/Región sobre crema.
- El SVG negativo conserva sus formas y proporciones, con el nombre en blanco en cabecera y pie de todas las rutas.
- Poster móvil anclado abajo, con altura 120% y foco horizontal 62%. Observado en 360 y 390 px: la cabina gana presencia.
- Acción Consultar visible en el hero móvil, junto al recorrido; rótulos de 11–12 px.
- Seis entradillas completas, alcance en puntos y detalle técnico original en disclosures HTML nativos. Consultoría comparte su entradilla entre las dos rutas.
- Página actual con `aria-current="page"`; sección Servicios distinguida visualmente en detalles y consultoría. Nosotros dirige al SGC en vez de volver a sí misma.
- Ayuda del formulario orientada al servicio, ubicación y necesidad. Espera local máxima de 20 segundos mediante AbortController; conserva datos, libera el botón e informa incertidumbre sin reintentos automáticos.
- SGC móvil usa altura por contenido y 32 px de separación, conservando el ritmo de escritorio.

Compilación de producción completada: 17 salidas; CSS 41.931 bytes y JavaScript 145.747 bytes, valores sin compresión. Capturas posteriores en `evidencia/apple-design-2026-10-05/despues/`. Las muestras de detalle pueden incluir su aparición inicial en progreso.

No se ejecutaron pruebas automatizadas ni un envío real de correo. La recuperación por timeout está implementada, pero no se simuló una petición detenida. Los límites de cobertura descritos arriba siguen vigentes. Entrega local, sin commit ni push.

# Propuesta de modernización: identidad, UI, UX y scrollytelling

Fecha: 2026-10-02. Estado: decisiones confirmadas e implementadas en local; la revisión visual comparativa queda pendiente porque la política del navegador bloqueó el acceso al sitio local. Referencia inicial: `d5200253457acf8b248ae92dffa8904972f22cd2` y [FASE_INICIAL.md](FASE_INICIAL.md). El resultado y sus verificaciones están en [FASE_FINAL.md](FASE_FINAL.md).

**Alcance:** modernizar el sitio completo sobre Eleventy + Nunjucks, preservar el endpoint PHP y las URLs públicas, y orientar la portada a consultas comerciales. Este documento registra el contrato visual y de UX aplicado. Manrope para títulos es la variante digital documentada en el manual; el logo conserva su identidad.

## Objetivo y evidencia disponible

Crear una experiencia corporativa más cuidada que permita entender los servicios de Forestal Garuhapé SA y generar consultas comerciales. El visitante debe identificar una capacidad adecuada para su necesidad, encontrar evidencia operativa y contactar a la empresa desde cualquier punto del recorrido. El scrollytelling organiza parte de la portada dentro de una UI consistente para todo el sitio.

Se inspeccionaron el commit inicial, los recursos locales y las referencias enlazadas; ahora se construye una versión local con recursos propios. La inspección interactiva de Rockstar en navegador quedó bloqueada por una política de acceso; la experiencia deseada se toma de la preferencia expresada por el usuario. El proyecto no incorpora componentes de pago ni transfiere código de catálogos React a Nunjucks.

La implementación se apoya en fotografías, videos y logos del repositorio, documentación pública de las bibliotecas y las cinco skills de diseño solicitadas. Las capturas de referencia de GTA VI no se presentan como evidencia observada. La revisión visual del sitio modernizado se documenta por separado y permanece pendiente mientras no se pueda abrir en un navegador autorizado.

ForgeUI queda excluido por indicación del usuario. Las referencias confirmadas para Uilora y Shaders son `https://www.uilora.com/` y `https://shaders.com/`.

## Dirección visual aplicada

**Una web B2B de carácter industrial y lenguaje editorial, con operación real como protagonista.** La idea narrativa es **«Del bosque a la industria»**. La empresa dispone de fotografías y videos de maquinaria, cosecha, transporte, caminos y acopio que permiten construir una identidad propia.

El manual de marca define verde, blanco y slate, Playfair Display para títulos y Work Sans para texto. El sitio conserva el verde institucional y los neutros, incorpora roles funcionales y usa Manrope en títulos web junto con Work Sans para lectura. El logo negativo existente encabeza las superficies verdes; se conserva su identidad. La variante tipográfica digital y los tokens de interfaz se documentan al final del manual.

Propuesta de composición:

- Hero con imagen o video operativo dominante, titular breve y contacto visible.
- Alternancia de superficies claras y verde profundo para marcar capítulos.
- Imágenes grandes que permitan leer escala, maquinaria y contexto.
- Texto conciso junto a cada imagen; los detalles técnicos completos siguen en las páginas de servicios.
- Un bloque principal que permanece brevemente en pantalla mientras cambia la etapa operativa. El resto del recorrido mantiene un desplazamiento vertical sencillo.
- Interacciones de botones y navegación en CSS; movimiento coordinado reservado para la historia.

### Alternativas consideradas

| Dirección | Composición y carácter | Evaluación para este proyecto |
| --- | --- | --- |
| Industrial editorial — recomendada | Fotografías operativas grandes, títulos sans serif, superficies claras, capítulos verdes y secuencia de capacidades. | Comunica escala y conocimiento técnico; deja espacio para consultar servicios y contactar. |
| Institucional clásica | Playfair Display + Work Sans, lectura más formal, bloques convencionales y movimiento mínimo. | Mantiene mayor continuidad con el manual actual. Moderniza menos la expresión tipográfica. |
| Inmersiva audiovisual | Portada dominada por video, escenas extensas, fondos oscuros y transiciones gráficas frecuentes. | Depende de más material audiovisual y añade carga. La consulta rápida en móvil requeriría más cuidados. |

La primera dirección guía la implementación. La composición usa maquinaria, equipos, caminos y logística de las fotografías propias, con encuadres que permiten reconocer el trabajo de la empresa.

## Contrato de diseño

| Aspecto | Contrato de diseño |
| --- | --- |
| Producto | Sitio corporativo público B2B. La UI abarca portada, servicios, páginas institucionales, contacto, empleo y legales. |
| Audiencia principal | Responsables de operaciones, logística, abastecimiento y contratación de servicios foresto-industriales. Es una hipótesis derivada del manual; falta investigación con clientes reales. |
| Objetivo prioritario | Generar consultas comerciales pertinentes. |
| Tarea principal | Encontrar el servicio adecuado, comprender su alcance y enviar una consulta. |
| Tareas secundarias | Conocer la empresa, consultar calidad/seguridad y encontrar los canales de contacto. Empleo tiene un recorrido propio. |
| Personalidad | Técnica, sólida, contemporánea y cercana. |
| Evidencia visual | Fotografías y videos propios de operaciones; información institucional respaldada. |
| Firma visual | Manrope + Work Sans, verde institucional, fotografía de gran escala y capítulos con ritmo editorial. |
| Regla de contenido | Servicios y contacto accesibles directamente; texto legible aunque no se reproduzcan animaciones. |
| Regla de movimiento | Una escena narrativa principal en escritorio, lectura vertical en móvil y alternativa con movimiento reducido. |
| Estados obligatorios | Normal, hover cuando corresponda, foco, pulsación, envío, éxito, error y recurso multimedia no disponible. |

## Sistema tipográfico

### Fuentes elegidas y servidas localmente

- **Manrope, pesos 600 y 700:** títulos, encabezados de secciones y nombres de servicios. Se sirve como WOFF2 variable local.
- **Work Sans, pesos 400 y 600:** párrafos, navegación, botones, campos, etiquetas y mensajes. Mantiene continuidad con la fuente de lectura del manual.
- **Respaldo:** fuentes sans serif del sistema. El contenido y los controles deben seguir funcionando mientras se cargan las fuentes o si fallan.

[Manrope](https://github.com/googlefonts/manrope) y [Work Sans](https://github.com/weiweihuanghuang/Work-Sans) disponen de licencia SIL Open Font License 1.1: [licencia de Manrope](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt) y [licencia de Work Sans](https://raw.githubusercontent.com/google/fonts/main/ofl/worksans/OFL.txt). El build sirve WOFF2 locales, conserva sus licencias y carga únicamente los estilos necesarios.

### Jerarquía de referencia

La escala fluida aplicada en el sitio:

| Rol | Fuente / peso | Escritorio | Móvil | Interlineado |
| --- | --- | --- | --- | --- |
| H1 | Manrope 700 | 40–80 px fluidos | 40 px mínimo fluido | 1.12 |
| H2 | Manrope 600 | 32–48 px fluidos | 32 px mínimo fluido | 1.12 |
| H3 / nombre de servicio | Manrope 600 | 22–30 px fluidos | 22 px mínimo fluido | 1.12 |
| Introducción destacada | Work Sans 400 | 17–18 px | 16–18 px | 1.6 |
| Texto de lectura | Work Sans 400 | 17 px | 16 px | 1.6 |
| Navegación y acciones | Work Sans 600 | 16 px | 16 px | 1.4 |
| Etiquetas y ayuda | Work Sans 400/600 | 14–16 px | 14–16 px | 1.5 |

Reglas:

- Un H1 por página y niveles de encabezado acordes a la estructura del contenido.
- Párrafos de aproximadamente 60–65 caracteres por línea; títulos equilibrados, sin saltos manuales que fallen al cambiar el ancho.
- Mayúscula inicial en español. Evitar párrafos en mayúsculas y pesos ligeros en texto pequeño.
- Tracking levemente negativo solo en títulos grandes, con un punto inicial de `-0.02em`; lectura y controles con espaciado normal.
- Comprobar tildes, ñ, signos de apertura y el nombre «Forestal Garuhapé SA» en ambos juegos de fuentes.
- Cargar desde archivos WOFF2 locales, con `font-display: swap` y precarga de ambas familias; mantener proporciones intrínsecas en los medios.

## Paleta de colores y roles

Se conserva `#0F766E` como verde de marca. Los otros tokens completan superficies, bordes y estados de interacción. Las bandas oscuras son parte de la composición de ciertas secciones; no hay selector de tema.

| Rol / token | Color | Uso |
| --- | --- | --- |
| `background` | `#FFFFFF` | Fondo principal y lectura. |
| `surface` | `#F7F7F6` | Superficies secundarias y alternancia de secciones. |
| `text` | `#0F1724` | Títulos, párrafos y navegación. |
| `text-secondary` | `#56645D` | Ayuda y descripción secundaria sobre superficies claras. |
| `brand` | `#0F766E` | Acción principal, enlaces y elementos institucionales. |
| `brand-hover` | `#065F46` | Hover y pulsación de acciones sobre fondo claro. |
| `institutional-dark` | `#082D25` | Capítulos de confianza, cierre y contacto. |
| `on-dark` | `#F7F7F6` | Texto principal en superficies oscuras. |
| `on-dark-secondary` | `#CBD9D2` | Texto secundario en superficies oscuras. |
| `border` | `#DCE4DE` | Separadores decorativos y agrupación de contenido. |
| `control-border` | `#75847C` | Contorno de campos y controles cuando identifica su área. |
| `focus` / `focus-on-dark` | `#0F766E` / `#BDE4D4` | Indicador de foco en superficies claras / oscuras. |
| `error` | `#B42318` | Texto, icono y borde de error sobre blanco. |
| `success-text` / `success-surface` | `#065F46` / `#E9F4ED` | Mensajes de envío confirmado. |

### Combinaciones de referencia

Contrastes calculados para colores sólidos con la fórmula de luminancia relativa de WCAG, redondeados a dos decimales. No constituyen una validación visual de componentes ni del texto sobre imágenes.

| Combinación | Contraste aproximado | Aplicación |
| --- | --- | --- |
| `#0F1724` sobre `#FFFFFF` | 17.97:1 | Texto principal. |
| `#56645D` sobre `#F7F7F6` | 5.80:1 | Texto secundario. |
| `#FFFFFF` sobre `#0F766E` | 5.47:1 | Acción principal en fondo claro. |
| `#FFFFFF` sobre `#065F46` | 7.68:1 | Hover de acción principal. |
| `#F7F7F6` sobre `#082D25` | 13.87:1 | Lectura sobre fondo oscuro. |
| `#CBD9D2` sobre `#082D25` | 10.19:1 | Ayuda sobre fondo oscuro. |
| `#75847C` junto a `#F7F7F6` | 3.66:1 | Borde de campo sobre superficie clara. |
| `#B42318` sobre `#FFFFFF` | 6.57:1 | Error de formulario. |
| `#065F46` sobre `#E9F4ED` | 6.82:1 | Confirmación de envío. |

Objetivo: al menos 4.5:1 para texto normal, 3:1 para texto grande y 3:1 para los elementos gráficos necesarios para identificar controles y estados, conforme a las guías de [contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) y [contraste no textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

Reglas de aplicación:

- Sobre fondo oscuro, la acción principal usa fondo claro y texto verde profundo; evita depender del contraste entre dos verdes oscuros.
- Los enlaces dentro de párrafos tienen subrayado. Errores y confirmaciones combinan texto e icono; el color por sí solo no comunica el estado.
- `border` sirve para separación decorativa. Los campos necesitan `control-border` cuando el borde identifica el control.
- El verde activo `#10B981` del manual puede quedar como acento puntual. El verde `#059669` no se usa con texto blanco pequeño: esa combinación ronda 3.77:1.
- Texto sobre fotografía requiere revisar cada encuadre y cada estado del video. Preferir una zona de texto sólida cuando el fondo impida asegurar contraste.
- El color de la maquinaria y del entorno entra a través de las fotografías. Los componentes usan la paleta definida, sin incorporar acentos nuevos por cada sección.

## Iconografía minimalista

**Familia elegida: Tabler Icons, variante Outline.** Los SVG usados se reúnen en un sprite local, con trazo y color coherentes con el texto. Su [repositorio oficial](https://github.com/tabler/tabler-icons) documenta la licencia MIT.

| Función | Icono usado | Etiqueta o tratamiento |
| --- | --- | --- |
| Abrir / cerrar navegación | `menu-2` / `x` | Botón «Abrir menú» / «Cerrar menú». |
| Continuar o consultar servicio | `arrow-right` | Junto al texto de la acción. |
| Enlace a otro sitio | `arrow-up-right` | Acompaña el enlace cuando conviene indicar el destino externo. |
| Desplegar contenido | `chevron-down` | Estado coherente con el contenido abierto o cerrado. |
| Correo / teléfono | `mail` / `phone` | Canal escrito y enlace real. |
| WhatsApp | `brand-whatsapp` | «Consultar por WhatsApp»; verificar el número antes de publicar. |
| Reproducir / pausar video | `player-play` / `player-pause` | Nombre accesible según la acción disponible. |
| Confirmación / error | `circle-check` / `alert-circle` | Siempre acompañados por un mensaje escrito. |

Reglas:

- Una sola familia, sin mezclar estilos filled, outline, emojis o glifos tipográficos.
- Tamaños visuales: 20 px junto a texto y 24 px en controles de navegación. Las áreas pulsables serán mayores que el dibujo.
- Botones con icono solo: área mínima de 44 × 44 px y nombre accesible. Botones principales y campos: altura de referencia de 48 px. El [mínimo WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) tiene reglas y excepciones propias.
- Iconos decorativos ocultos a tecnologías de asistencia; la etiqueta del enlace o botón comunica la función.
- Servicios identificados por su nombre y fotografía. Agregar un icono únicamente si aporta una distinción útil.

## UI del sitio

### Estructura y ritmo

- Contenedor: máximo 1280 px. Márgenes laterales: 48 px en escritorio, 32 px en tablet y 20 px en móvil.
- Hero de escritorio con texto en aproximadamente 5 columnas e imagen en 7; en móvil, texto y medio en orden vertical. La altura se adapta al contenido, sin imponer una pantalla completa en dispositivos pequeños.
- Escala de espacios: 4, 8, 12, 16, 24, 32, 48, 64 y 96 px. Separación entre secciones: referencia de 96 px en escritorio, 64 px en tablet y 48 px en móvil.
- Radio de referencia: 8 px para controles y 4 px para fotografías. Bordes finos; sombras contenidas solo donde ayuden a entender superposición.
- Las fotografías reservan su proporción desde el HTML y usan variantes responsivas AVIF/WebP con encuadres según el componente.
- El footer reúne contacto, información institucional y enlaces legales. Los enlaces de empleo deben conducir al canal que esté realmente operativo.

### Componentes y comportamiento

| Componente | Definición visual | Comportamiento y estados |
| --- | --- | --- |
| Encabezado | Marca, navegación **Servicios / Nosotros / SGC / Consultar**. Fondo verde profundo. | Logo a inicio, enlace para saltar al contenido y foco visible. Cabecera sticky con margen de scroll para las anclas. |
| Navegación móvil | Botón de menú y panel desplegable bajo el encabezado, en viewports menores a 1024 px. | `aria-expanded`, relación con el panel, cierre con Escape y retorno del foco al botón al cerrar con Escape. Despliegue no modal; sin JavaScript los enlaces siguen visibles. |
| Acción principal | Fondo verde y texto blanco en superficies claras; fondo claro y texto verde profundo en oscuras. | Etiqueta comercial «Consultar» y envío «Enviar consulta». |
| Acción secundaria | Enlace con texto descriptivo y flecha opcional. | «Ver servicios» conduce al catálogo. Indicador visible de foco y hover solo donde hay puntero adecuado. |
| Acceso a servicios | Nombre, fotografía y descripción breve de cada prestación. | Enlaces nativos a las seis páginas. En escritorio, filas con imagen y texto; en móvil, secuencia vertical. Evitar zonas clicables anidadas. |
| Escena narrativa | Imagen grande, título de etapa, explicación y enlace al servicio. | Contenido semántico único; el texto permanece disponible con JavaScript desactivado. Reglas específicas en el storyboard. |
| Bloque de confianza | Texto legible y evidencia documental o visual real. | Publicar solo cifras, clientes y certificaciones verificadas. Omitir módulos que no tengan contenido respaldado. |
| Galería | Imágenes con leyendas cuando aporten contexto. | Sin reproducción automática. Si se añade lightbox, deberá tener cierre accesible, navegación por teclado y retorno del foco. |
| Contacto y formulario | Sección verde profunda con canales y formulario en dos columnas; una columna en móvil. Etiquetas persistentes y ayuda junto al campo. | Estados de validación, envío, aceptación y fallo; conserva valores y admite envío nativo sin JavaScript. |
| WhatsApp | Enlace secundario, con icono Tabler y texto descriptivo en contacto. | Sin burbuja flotante ni pulso continuo; se mantiene como canal contextual. |

### Páginas y navegación

La navegación contiene **Servicios**, **Nosotros**, **SGC** y **Consultar**. El logo vuelve a inicio. Los destinos conservan las rutas públicas; los enlaces a contacto y SGC desde páginas internas apuntan a la portada mediante `/#contacto` y `/#sgi`.

| Superficie | Ruta actual | Layout y tarea principal |
| --- | --- | --- |
| Portada | `/` | Presentación → seis servicios → planificación y caminos → relato operativo → biomasa → empresa y SGC → contacto. |
| Catálogo | `/servicios/` | Introducción corta y seis prestaciones identificables, con enlaces a sus detalles. |
| Detalle de servicio | `/servicios/{slug}/` | Nombre y fotografía → alcance → material operativo → «Consultar por este servicio». Lectura amplia y sin escenas fijadas. |
| Consultoría | `/consultoria/` | Página principal canónica; `/servicios/consultoria-forestal/` conserva contenido compartido y canonical a la ruta principal. |
| Institucional | `/nosotros/` y `/#nosotros` | Información empresarial existente organizada para lectura. |
| Sistema de calidad | `/#sgi` | Rotulado públicamente **SGC**; el ancla técnica `#sgi` se conserva. |
| Contacto | `/#contacto` | Canales visibles y formulario. Accesible desde la cabecera y desde cualquier página de servicio. |
| Empleo | `/trabaja/` | Recorrido separado de consultas comerciales, con derivación a Vogel Consultoría, que recibe los CV. |
| Legales | `/privacidad/`, `/terminos/` | Lectura sencilla, tipografía consistente y enlaces desde el footer. |

### Hero implementado

- **H1:** «Del bosque a la industria».
- **Bajada:** presentación de cosecha, transporte, caminos, biomasa, acopio y consultoría.
- **Acción principal:** «Consultar» → `/#contacto`.
- **Acción secundaria:** «Explorar servicios» → `/servicios/`.
- **Medio:** poster operativo AVIF/WebP desde el inicio; video bajo acción expresa, con controles nativos y carga diferida.

El contenido conserva los hechos disponibles en los datos del sitio. No se añadieron cifras, certificaciones, cobertura ni testimonios.

## UX: recorridos, contenido y estados

### Recorridos prioritarios

| Visitante / intención | Recorrido | Condición de éxito |
| --- | --- | --- |
| Potencial cliente que explora | Portada → servicio relevante → alcance y evidencia → contacto. | Puede explicar qué ofrece la empresa y enviar una consulta pertinente. |
| Cliente que ya conoce su necesidad | Enlace directo o catálogo → detalle de servicio → contacto. | Encuentra información útil sin recorrer toda la portada. |
| Responsable que evalúa confianza | Portada o nosotros → trayectoria / calidad / seguridad → contacto. | Distingue capacidades y prácticas respaldadas de mensajes promocionales. |
| Visitante móvil | Presentación rápida → servicio o canal de contacto → acción. | Puede consultar con una conexión limitada, sin esperar un video ni una escena extensa. |
| Persona que busca empleo | Enlace de empleo → instrucciones y canal válido. | Entiende dónde y cómo postularse; recibe confirmación solo si existe una recepción real. |

El objetivo comercial está confirmado por el usuario. Los perfiles y recorridos necesitan contrastarse con personas representativas; no se realizó una investigación de usuarios en esta fase.

### Jerarquía de la información

1. Qué servicios ofrece Forestal Garuhapé SA.
2. Qué alcance tiene la prestación que le interesa al visitante.
3. Qué evidencia operativa e institucional permite evaluar a la empresa.
4. Cómo iniciar una conversación comercial.

El directorio de seis servicios queda disponible antes del bloque narrativo principal. Los enlaces de contacto se repiten en cabecera, cierre de servicio y cierre de portada. El scrollytelling ayuda a comprender relaciones entre capacidades; no añade pasos obligatorios para contactar.

### Formulario comercial

Conservar los campos existentes: **nombre, correo electrónico y mensaje**. Etiquetas visibles y persistentes; ejemplos breves en ayudas, sin usar placeholders como sustituto de la etiqueta. Tipos de campo adecuados y autocompletado para nombre y correo. Permitir pegar texto y conservar lo escrito ante errores recuperables.

En una consulta iniciada desde un detalle de servicio, proponer un mensaje editable que nombre esa prestación. El visitante puede corregirlo antes de enviarlo; no se envía una consulta automáticamente al pulsar el enlace.

| Estado | Respuesta de la interfaz |
| --- | --- |
| Inicial | Campos disponibles, indicación de obligatoriedad y acceso a la política de privacidad. |
| Campo enfocado | Indicador de foco de 3 px con separación del componente; contraste según la superficie. |
| Dato inválido | Mensaje específico junto al campo; asociarlo al control y enfocar el primer campo inválido al intentar enviar. |
| Enviando | Texto «Enviando consulta…» y bloqueo de reenvíos durante la petición real. Conservar los datos. |
| Envío confirmado | «El envío fue aceptado». Aviso anunciado con `aria-live`; sin prometer lectura ni plazo de respuesta. |
| Error del servidor | Mensaje comprensible, datos conservados y opción de reintentar; ofrecer los canales de contacto verificados. |
| Sin conexión | Informar que no pudo enviarse; conservar lo escrito y permitir reintentar al recuperar conexión. |

No prometer tiempos de respuesta que la empresa no haya definido. El formulario mantiene validación del lado del servidor y protección antispam; el honeypot queda fuera de la interacción del visitante.

El endpoint `/enviar_mensaje.php` responde JSON para solicitudes compatibles y conserva el envío nativo con error HTML escapado y redirección 303 tras la aceptación. Los casos de validación, fallo de transporte y aceptación se verificaron en el proceso local descrito en `FASE_FINAL.md`.

El formulario de CV con destino de ejemplo fue retirado. `/trabaja/` describe la derivación a Vogel Consultoría, donde se confirmó que se reciben los CV.

### Lectura, teclado y medios

- Usar enlaces para navegación y botones para acciones. Orden del DOM coherente con la lectura visual.
- Foco visible en todos los controles; no ocultarlo al cambiar de estado. Evitar elementos fijados que cubran el control enfocado.
- No depender de hover para explicar o habilitar funciones; ofrecer la misma información en pantallas táctiles y con teclado.
- Imágenes con dimensiones reservadas, textos alternativos según su función y carga diferida cuando estén debajo del primer bloque.
- Poster visible desde el inicio; el video no bloquea el título ni la acción comercial. Añadir control para pausar medios en movimiento y evitar reproducción automática cuando se solicita movimiento reducido.
- Si falla un medio, conservar texto y enlaces. Si el bloque de evidencia no tiene datos, omitirlo en vez de inventar contenido.
- El menú, los campos y los enlaces deben seguir siendo utilizables al ampliar texto y en pantallas estrechas.

### Criterios de aceptación de UX

Los criterios y el resultado de sus verificaciones se resumen en `FASE_FINAL.md`. No se incorporó analítica nueva; un envío aceptado por el servidor no equivale a una lectura ni a una respuesta comercial.

## Movimiento como parte de la UI

| Interacción | Tratamiento |
| --- | --- |
| Hover y foco | Cambio breve de color o borde; CSS, aproximadamente 150–220 ms. Hover limitado a dispositivos que lo soporten. |
| Pulsación | Respuesta leve e inmediata, hasta `scale(0.98)` cuando no perjudique la lectura. |
| Menú móvil | Apertura y cierre breves, interrumpibles, sin demora en la disponibilidad de los enlaces. |
| Aparición de sección | Opacidad y traslación corta de 6–16 px solo si aporta orientación; contenido visible por defecto. |
| Escena operativa | Cambios coordinados de fotografía y texto ligados al avance del desplazamiento. Una escena principal en escritorio. |
| Parallax fotográfico | Fotos de caminos, biomasa y empresa con escala fija `1.12` y recorrido vertical de `-5%` a `5%` dentro de su encuadre, ligado al scroll mediante GSAP + ScrollTrigger. Texto estático. Solo desde 1024 px, puntero fino y movimiento permitido. |
| Movimiento reducido | Secuencia estática, sin pin, parallax, shaders ni video automático; mismas capacidades y enlaces. |

Preferir transformaciones y opacidad para el movimiento simple; evitar `transition: all`. No usar rebotes, flotación continua, cursor personalizado ni un acceso a WhatsApp que pulse permanentemente. Cada transición debe poder interrumpirse al cambiar de estado o de preferencia de movimiento.

### Segunda pasada: profundidad en las fotografías

El parallax solicitado añade profundidad al recorrido de la portada entre infraestructura, aprovechamiento y empresa. Se limita a tres fotografías de apoyo; la lámina de planificación conserva su encuadre para mantener la lectura de sus datos. El encuadre mantiene sus dimensiones y recorta el exceso de imagen, por lo que el movimiento no desplaza texto ni enlaces. En móvil, tablet, movimiento reducido o sin JavaScript se muestra la fotografía estática completa dentro del encuadre original.

Se evaluó [simple-parallax-js y su entrada vanilla](https://github.com/geosigno/simpleParallax.js/blob/master/README.md). El sitio utiliza GSAP y ScrollTrigger para este efecto: mantiene el ciclo de actualización existente con Lenis y evita añadir otro motor. `gsap.matchMedia()` revierte transformaciones y elimina los triggers al cambiar de breakpoint, puntero o preferencia; al volver al contexto permitido se reconstruye el efecto. No se incorporó una nueva dependencia.

## Aplicación de las cinco skills solicitadas

| Skill | Aporte aplicado a la implementación |
| --- | --- |
| Anti UI Slop | Contrato B2B, fotografías reales, paleta institucional y tipografía fija; componentes propios en Nunjucks y estados de menú, medios y formulario definidos. |
| Impeccable | Portada orientada a consulta, catálogo a exploración, páginas interiores a lectura y formulario a completar; cada sección tiene función y jerarquía propias. |
| Taste Skill — `design-taste-frontend` | Composición editorial con fotografía a escala, rejilla consistente y un sistema visual común; no se mezclan identidades de catálogo. |
| Emil Design Engineering — `emil-design-eng` | Movimiento breve e interrumpible, CTA con pulsación discreta, foco claro, cierre con Escape, errores que conservan el formulario y recuperación de Lenis al cambiar de breakpoint. |
| Vercel Web Design Guidelines — `web-design-guidelines` | HTML semántico, controles con nombre, foco visible, etiquetas persistentes, dimensiones de imagen y alternativa a movimiento. La verificación se registra con `archivo:línea`; la inspección visual completa puede quedar pendiente si el navegador la bloquea. |

Las [guías públicas de Vercel](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) se consultaron para revisar semántica, controles, foco, formularios, movimiento y medios. Se registran los hallazgos con `archivo:línea` en `FASE_FINAL.md`. No hay revisión visual en navegador: el acceso local fue denegado por la política administrada.

### Hallazgos del código base (referencia inicial `d520025`)

| Ubicación en el commit inicial | Observación del código | Mejora implementada |
| --- | --- | --- |
| `src/_includes/components/hero.njk:14` | CTA sin destino o acción. | Enlace a contacto con texto descriptivo. |
| `src/_includes/components/hero.njk:3` | Video con autoplay y loop; sin control de pausa en el componente. | Poster, control de reproducción y tratamiento de movimiento reducido. |
| `src/_includes/components/header.njk:4` | Logo sin dimensiones intrínsecas declaradas en el HTML. | Reservar proporción y revisar el archivo vigente. |
| `src/_includes/sections/servicios.njk:14` | Imágenes sin dimensiones intrínsecas declaradas. | Reservar espacio y definir encuadres por pantalla. |
| `src/_includes/components/footer.njk:20` y `:26` | Nombre y correo sin atributos de autocompletado. | Autocompletado y etiquetas persistentes. |
| `src/_includes/sections/servicios.njk:10` | Uso de `transition-all`. | Transiciones explícitas para las propiedades necesarias. |
| `src/_includes/sections/whatsapp-button.njk:2` | Pulso continuo del acceso de contacto. | Estado estático con feedback breve al interactuar. |

Estos son hallazgos de lectura del código. La validación posterior deberá comprobar el comportamiento y la presentación en navegador.

## Observaciones sobre el código actual

| Antes | Después implementado | Por qué |
| --- | --- | --- |
| El slogan aparece tanto en la franja superior como en el hero. | Jerarquía clara entre presentación, capacidad principal y contacto. | Aprovechar el primer pantallazo para comunicar información distinta. |
| Las seis prestaciones de la portada se presentan con una estructura de tarjetas repetida. | Una escena narrativa principal y acceso claro a todos los servicios. | Mostrar cómo se relacionan las capacidades y mantener la consulta rápida del catálogo. |
| La sección de servicios combina acentos azules y un overlay azul/violeta. | Aplicar consistentemente el verde y los neutros del manual. | Dar continuidad a la identidad institucional. |
| El CTA del hero es un `button` sin acción ni enlace en el código inspeccionado. | Un enlace real a contacto, disponible desde el comienzo. | Hacer que la presentación conduzca a una acción útil. |
| `.section-hidden` oculta contenido hasta que JavaScript lo revela. | Contenido visible por defecto; mejoras de movimiento al iniciar correctamente. | Conservar lectura y navegación cuando la animación no esté disponible. |
| Tailwind se carga por Play CDN; los scripts del proyecto no generan un bundle de assets. | Compilar CSS y JavaScript durante el build. | Poder importar bibliotecas desde npm y servir assets locales preparados para producción. |

La portada ya usa `todos_los_servicios.json`, con 6 prestaciones, igual que el listado y las páginas de detalle. `servicios.json` contiene 4 registros, pero no alimenta la sección actual. Se corrigió esta precisión en la documentación inicial.

## Qué aporta cada referencia

La última columna vincula cada referencia con una decisión visible en el código; la inspección interactiva de GTA VI está pendiente por el bloqueo de la política del navegador.

| Referencia | Enfoque tomado | Aplicación implementada |
| --- | --- | --- |
| [GTA VI](https://www.rockstargames.com/VI) | Preferencia de ritmo narrativo expresada por el usuario; la navegación interactiva no se verificó en el navegador disponible. | Guion propio «Del bosque a la industria»: entrada, operación, continuidad de escenas y una salida siempre accesible hacia la consulta. |
| [Lenis](https://github.com/darkroomengineering/lenis) | Suavizado basado en scroll nativo e integración oficial con ScrollTrigger mediante el ciclo de GSAP. | Dependencia local solo en escritorio con puntero fino; `smoothWheel`, `syncTouch: false`, anclas activadas y ciclo de ticker compartido. |
| [React Bits](https://www.reactbits.dev/get-started/index) | Patrones de revelado de texto e imagen para React. | Adaptación propia CSS/GSAP: entrada corta de H1 y contenido; siempre visible sin JavaScript y sin copiar componentes React. |
| [AnimmasterLib](https://animmasterlib.dev/) | Referencia de puesta en escena para medios grandes acompañados por mensajes concisos. | Escena con cosecha, transporte y acopio; fotografía de operación local y texto editorial breve. |
| [SkiperUI](https://skiper-ui.com/docs/quick-start) | Patrones de expansión y recorte de imágenes distribuidos para React. | Encuadre responsive propio; transición de escala restringida a `1.04` en las fotografías del escenario. |
| [VengenceUI](https://www.vengenceui.com/) | Patrones de continuidad entre tarjetas, contenido e imágenes al recorrer una página. | Una timeline de ScrollTrigger sincroniza los fundidos de imagen y el rótulo del capítulo activo. |
| [AnimateUI](https://animate-ui.com/docs/installation) | Patrones de estado y feedback para controles; el catálogo está orientado a React. | Menú móvil propio con estados abiertos/cerrados, Escape, cierre al navegar y feedback CSS en botones. |
| [Uiverse](https://uiverse.io/) | Ideas de controles y microinteracciones en CSS/Tailwind. | Adaptación propia a foco visible, bordes, pulsación y tamaños mínimos; no se copian componentes de autor. |
| [Uilora](https://www.uilora.com/) | Referencia de continuidad entre bloques y transiciones de navegación. | Anclas nativas, encabezado persistente y desplazamiento enlazado con Lenis durante la escena de escritorio. |
| [Shaders](https://shaders.com/docs/guide) | Referencia conceptual para transición entre medios mediante una capa gráfica. | Disolución propia por opacidad; no se incorpora WebGPU ni una licencia comercial de Shaders. |
| [Anime.js](https://animejs.com/documentation/events/onscroll/) | API de onScroll para separar secuencias de entrada y movimiento ligado al scroll. | Se adopta el criterio de separar esos disparadores con GSAP; Anime.js no se añade y no comparte control de la escena. |

La implementación usa GSAP como único motor de escena. Los catálogos destinados a React informan los patrones visuales; las plantillas y controles quedan escritos para Nunjucks, HTML y CSS.

Shaders permite evaluar su tecnología, pero el uso comercial y de producción requiere una licencia que cubra ese uso según sus [condiciones vigentes](https://shaders.com/license). Es una opción con costo, no una dependencia asumida del proyecto. También hay componentes de pago en algunos de los catálogos; el alcance inicial puede resolverse con bibliotecas generales y recursos propios.

## Stack decidido

- **Eleventy + Nunjucks** mantienen las plantillas, los datos y las URLs actuales. No se migra el sitio a Vue ni a Astro.
- **Tailwind CSS 3** se compila durante el build; las reglas propias fijan tokens, layout y estados.
- **esbuild** genera CSS y JavaScript locales con nombres hash y un manifiesto consumido por las plantillas.
- **Sharp** genera versiones AVIF/WebP de las imágenes referenciadas, hasta anchos disponibles del original y sin ampliarlas. Los originales permanecen intactos.
- **Manrope y Work Sans WOFF2 locales** evitan depender de Google Fonts y del Play CDN.
- **GSAP + ScrollTrigger** conducen la escena operativa; Lenis sincroniza el desplazamiento solo en escritorio con puntero fino y movimiento permitido.
- **Tabler Outline** aporta únicamente los iconos utilizados, reunidos en un sprite local. Los componentes de React quedan como referencia visual; los controles se escriben para HTML/Nunjucks.
- **PHP** mantiene `/enviar_mensaje.php`, el destinatario y los nombres de campo existentes.

Shaders y Anime.js no son dependencias. No se añade código de componentes premium o con licencia comercial.

## Referencia narrativa: GTA VI de Rockstar Games

El usuario señaló la [página oficial de GTA VI](https://www.rockstargames.com/VI) como experiencia de scrollytelling que le gusta. Se adopta esa dirección narrativa con un guion y material propios de Forestal Garuhapé SA; no se copian su contenido ni sus efectos particulares.

**Evidencia disponible:** el navegador administrado denegó el acceso antes de cargar la página; no se observaron transiciones en ejecución ni se inspeccionó su implementación. Este documento no atribuye a Rockstar un motor, técnica de renderizado o comportamiento específico verificado.

### Cómo se construye este tipo de experiencia

El avance del scroll se transforma en el progreso de una secuencia visual. Dentro de un tramo, puede permanecer un escenario en pantalla mientras cambian el encuadre, la imagen, la posición de las capas y el texto. La entrada y salida de cada escena forman parte del guion. Algunas transiciones siguen continuamente el desplazamiento; otras se reproducen al alcanzar un punto determinado.

Como opción técnica para Forestal, [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) permite fijar temporalmente una escena (`pin`) y vincular una animación o timeline al progreso del scroll (`scrub`). Esto explica una posible implementación propia; no identifica la tecnología usada por Rockstar.

### Adaptación aplicada a Forestal

- **Presentación:** titular «Del bosque a la industria», fotografía operativa estática y video solo a demanda.
- **Accesos:** seis servicios enlazados antes de entrar a la escena.
- **Planificación y caminos:** dos capacidades previas al relato operativo, con información y enlaces directos.
- **Operación:** tres bloques de texto fluidos para cosecha, transporte y acopio junto a una imagen persistente que se disuelve entre capítulos.
- **Ampliación:** biomasa forestal con fotografía local y vínculo al detalle.
- **Salida:** empresa, SGC y contacto permanecen en el recorrido y se accede al formulario sin completar la escena.

La escena fijada se activa solo en escritorio, con puntero fino y movimiento permitido, después de configurar GSAP. El texto y los enlaces conservan su flujo semántico. Las fotos se disuelven y escalan hasta `1.04`, con seguimiento de scroll de `0.3` s.

Tablet, móvil, movimiento reducido y fallos de JavaScript o del motor de animación muestran los tres bloques en secuencia vertical, cada uno con su propia imagen, texto y enlace. La capa duplicada del escenario se oculta en esa variante.

La inspección interactiva de Rockstar y las capturas visuales del resultado local siguen pendientes por el bloqueo del navegador. La preferencia del usuario determina la dirección narrativa sin atribuir una técnica específica al sitio de referencia.

## Storyboard: del bosque a la industria

Este recorrido presenta capacidades de la empresa. No afirma que todos los contratos incluyan cada etapa ni agrega cifras o certificaciones sin respaldo.

| Capítulo | Mensaje y contenido | Escritorio mejorado | Tablet, móvil y movimiento reducido |
| --- | --- | --- | --- |
| Presentación | «Del bosque a la industria» y catálogo comercial | Texto a la izquierda; poster operativo a la derecha; video bajo acción expresa. | Poster y texto apilados; reproducción opcional con controles. |
| Planificación | Consultoría y caminos forestales | Dos piezas editoriales con fotografía y enlace. | Mismos dos contenidos en orden de lectura vertical. |
| Cosecha | Operación mecanizada y alcance del servicio; `1470_proceso.jpeg` | Imagen persistente; capítulo 1. | Bloque propio con fotografía, texto y consulta. |
| Transporte | Troncos y chips conectan bosque e industria; `transporte_forestal_carga.jpeg` | Fundido hacia el capítulo 2, escala limitada a `1.04`. | Bloque propio con fotografía, texto y consulta. |
| Acopio | Organización del abastecimiento; `playa_acopio.jpeg` | Fundido hacia el capítulo 3. | Bloque propio con fotografía, texto y consulta. |
| Biomasa | Aprovechamiento de biomasa forestal | Sección estática enlazada al detalle. | Sección estática enlazada al detalle. |
| Empresa y SGC | Información institucional existente y Sistema de Gestión de Calidad | Lectura directa; sin claims añadidos. | Lectura directa y enlaces por teclado. |
| Consulta | Formulario comercial, email, teléfono y WhatsApp | Disponible al final o en cualquier navegación. | Campos apilados, mensajes vinculados a campos y envío nativo alternativo. |

Las páginas de servicios mantienen su función de consulta detallada y sus URLs. La portada puede contar la historia y ofrecer accesos directos para quien ya sabe qué servicio necesita.

## Plan de implementación acordado

### Etapa 1 — Baseline y documentación

- Preservar el commit inicial `d520025` en una copia de trabajo aislada.
- Registrar su instalación y build reproducibles, rutas y comportamiento del formulario.
- Completar capturas comparativas en escritorio y móvil cuando la política del navegador permita abrir el sitio local.
- Mantener el documento y el manual de marca alineados con las decisiones aprobadas.

### Etapa 2 — Build y recursos

- Mantener Eleventy y Tailwind 3; esbuild prepara módulos JavaScript y CSS.
- Publicar assets con hash y un manifiesto consumido por Nunjucks.
- Compilar antes de Eleventy en producción y desarrollo; reconstruir assets y plantillas al cambiar sus fuentes.
- Distribuir WOFF2 locales y los SVG Tabler utilizados.
- Generar AVIF/WebP responsive con Sharp sin ampliar originales.
- Retirar CDN de Tailwind, Google Fonts remoto, Swiper global y animaciones sustituidas.

### Etapa 3 — UI compartida

- Aplicar tokens, Manrope + Work Sans, márgenes y escala establecidos arriba.
- Crear cabecera sólida, navegación Servicios / Nosotros / SGC / Consultar y menú de teclado por debajo de 1024 px.
- Unificar acciones comerciales como «Consultar»; el envío del formulario usa «Enviar consulta».
- Incorporar foco visible, estados de pulsación, controles de 48 px y áreas de iconos de 44 × 44 px o más.
- Completar pie de página con contacto, políticas, términos y canal de empleo Vogel; eliminar enlaces sin destino.

### Etapa 4 — Portada y scrollytelling

Secuencia: **Presentación → seis servicios → planificación y caminos → cosecha/transporte/acopio → biomasa → empresa y SGC → contacto.**

- Hero con titular a la izquierda e imagen a la derecha en escritorio. Poster visible al entrar; el video se solicita con un control y expone controles nativos.
- En escritorio con puntero fino y movimiento permitido, una imagen permanece en el escenario mientras avanzan tres capítulos de texto en el flujo de la página.
- La timeline combina tres fotografías seleccionadas; escala máxima `1.04` y seguimiento de scroll `0.3` s.
- Lenis se limita a escritorio: `smoothWheel: true`, `syncTouch: false`, anclas y un ciclo integrado con GSAP.
- Tablet, móvil y movimiento reducido conservan tres bloques verticales con sus imágenes, textos y enlaces.
- La composición permanece legible con JavaScript desactivado o si falla el motor de animación.

### Etapa 5 — Páginas interiores y contacto

- Catálogo de seis prestaciones y seis páginas de detalle con galería estática y consulta contextual.
- Institucional y SGC reorganizados para lectura; la ancla técnica `#sgi` se conserva y SGC se mantiene como nombre público.
- `/consultoria/` es la ruta canónica principal; `/servicios/consultoria-forestal/` mantiene la información compartida y apunta su canonical a la principal.
- `/trabaja/` explica la derivación a Vogel Consultoría. No se usa el formulario cuyo destino anterior era de ejemplo.
- El endpoint PHP conserva destinatario, método nativo y campos. La interfaz JSON devuelve 200/422/503/405; el formulario valida, conserva datos ante fallo, evita reenvíos y anuncia el estado.
- `/?servicio=<slug>#contacto` propone texto editable para los seis slugs. No envía el formulario automáticamente.

### Etapa 6 — Verificación y evidencia

- Ejecutar build, prueba existente de consistencia de contacto, PHP lint y comprobaciones funcionales acordadas.
- Revisar rutas, teclado, navegación en ambas direcciones, movimiento reducido, medio bloqueado y formulario con/sin JavaScript.
- Probar 1440 × 900, 768 × 1024 y 390 × 844 en una ronda de inspección, una tanda de correcciones y confirmación final.
- Capturar las mismas páginas del commit inicial y final; registrar peso de CSS/JS, imágenes y estabilidad del layout.
- Objetivos de recursos: CSS + JavaScript hasta 180 KB comprimidos; poster principal hasta 250 KB.
- Usar Mailpit solo en localhost durante la verificación. Su configuración se limita al proceso PHP de prueba, sin modificar correo de producción ni reenviar al exterior.
- Crear `FASE_FINAL.md` con comparación Antes / Después / Por qué, evidencia y límites reales de verificación.

## Decisiones confirmadas

Eleventy + Nunjucks; Manrope 600/700 y Work Sans 400/600; paleta por roles; iconos Tabler Outline; GSAP + ScrollTrigger; Lenis restringido a escritorio; guion propio del usuario basado en GTA VI; imágenes especificadas en el storyboard; consultoría canónica en `/consultoria/`; SGC público y ancla `#sgi`; postulaciones derivadas a Vogel; envío comercial al endpoint PHP existente. ForgeUI queda excluido. La modernización se trabaja en local: esta documentación no autoriza publicación, commit o push.

## Home V2 — segunda modernización (2026-10-02)

La propuesta V1 anterior se conserva como registro. Para la Home V2, las decisiones de este apartado sustituyen su hero dividido, catálogo inmediato y relato de tres capítulos.

**Dirección:** Industrial Forestry Documentary. Fotografía operativa dominante, grandes titulares, marcos de escala variable y un recorrido comercial completo.

**Secuencia V2:** hero → Cosecha → Transporte → Acopio → Caminos → Biomasa → Consultoría → empresa desde 1993 → SGC → alcance regional → contacto.

**Decisiones confirmadas por el usuario:** video automático sin sonido en escritorio; fotografía operativa existente para el momento institucional. La instrucción «Implement the proposed plan» autorizó la Home completa y sustituyó la pausa de aprobación del storyboard.

**Paleta V2:** verde institucional `#0F766E`, bosque `#082D25`, crema de pausa `#F1EEE6`, negro verde de apertura/cierre `#061C17`, texto claro `#F7F7F6`. Se mantienen Manrope, Work Sans y Tabler Outline.

**Storyboard:** [guion, recursos y contrato visual](STORYBOARD_V2.md), conservado como referencia en `/storyboard-v2/`, fuera del sitemap y con `noindex`. La Home V2 real está implementada en `/`.

**Movimiento implementado:** `src/js/home.js` usa GSAP + ScrollTrigger, escala máxima 1.08, parallax de ±3% y seguimiento 0.3 s. Una única instancia de Lenis suaviza la rueda; los accesos a capítulos son inmediatos. Seis capítulos de 120svh en escritorio. Móvil, tablet, movimiento reducido y fallos del motor conservan fotos y texto en flujo. `matchMedia` revierte estilos, destruye Lenis y retira su ticker. La cabecera es transparente sobre el hero y sólida después.

**Medios implementados:** poster inmediato; autoplay solo desde 1024 px, con puntero fino, sin movimiento reducido ni ahorro de datos. Pausa visible, pausa fuera de pantalla/con pestaña oculta y conservación de la pausa manual. El WebM produjo un error de decodificación real en IAB: se añadió recuperación con el MP4 existente, comprobado en reproducción y pausa. Si también falla, se conserva el poster. Móvil y movimiento reducido no asignan `src` al video.

**Mapa:** contornos SVG locales de Natural Earth; [proveniencia y licencia](recursos/MAPA_REGIONAL.md). Argentina y Paraguay son los únicos países destacados, sin marcadores ni cobertura territorial inventada.

**Contenido:** los capítulos se resuelven por slug en `src/_data/storyboardV2.js`. Biomasa usa su descripción correcta; también se corrigió la selección Jinja incompatible del componente anterior. Se mantienen rutas, consultas contextuales, datos de contacto y contrato PHP. Se retiraron BOM de plantillas que generaban un nodo de texto antes del contenido y desplazaban el hero.

**Etapas realizadas:** storyboard de referencia → implementación de Home y movimiento → revisión responsive y funcional → capturas comparables y documentación. El parallax de Home se integra en el mismo contexto GSAP, sin instalar un segundo motor.

**Evidencia de Rockstar actualizada:** la página fue accesible y su apertura se inspeccionó el 2026-10-02. No se verificó su secuencia completa de movimiento ni su motor. Los bloqueos descritos en V1 corresponden a aquella revisión histórica.

**Estado de entrega:** Home V2 implementada localmente; interiores conservados. Evidencia en `docs/evidencia/v2-home/`, comparación y límites en [FASE_FINAL.md](FASE_FINAL.md). La V1 publicada permanece en `7b1b5e5`; la V2 no tiene commit, push ni publicación.


### Ajuste cinematográfico solicitado después de revisar V2

El usuario pidió eliminar el tambaleo, ralentizar los cambios de plano y evitar la ruptura visual de Acopio. La Home utiliza ahora `hero-cinematic.mp4` (36 segundos, 30fps, planos de 8s y disoluciones de 2s), generado con recursos propios mediante `scripts/create-hero-video.cjs`. Se retiraron el zoom codificado y el zoom adicional del hero al hacer scroll; el encuadre queda fijo. El MP4 reemplaza la combinación de formatos anterior en la Home; los originales se conservan.

Acopio usa `playa_acopio_1.jpeg`, horizontal a sangre y fondo oscuro, con texto al margen izquierdo. Las seis escenas disponen de 140svh, seguimiento .9s y disolución de .65 unidades de capítulo; escala máxima 1.05 y parallax de Caminos ±1.5%. La foto anterior permanece opaca debajo de la entrante durante el fundido. Esta revisión sustituye los valores y el encuadre de Acopio descritos en el registro anterior.


### Incorporación de las siete imágenes nuevas

Se sustituyeron los recursos correspondientes en Home, catálogo, detalles, galerías, fondo SGC y montaje del hero. Los archivos se nombran por servicio en `src/images/actualizadas/`; la nueva flota está en `src/images/flota_camiones.png`. El usuario autorizó recortar las marcas alteradas de Cosecha y Biomasa; esas salidas se editaron con imagegen y los originales se conservan. La nueva vertical de Acopio se aplica al catálogo/detalle/galería; el relato conserva la fotografía horizontal aprobada. El ajuste de contenedores picture mantiene las tarjetas y detalles cubiertos pese al cambio de proporciones.

[Relación de archivos, recortes, prompt y recursos](recursos/IMAGENES_ACTUALIZADAS.md). El poster actual a 1280px pesa 98,432 B; el MP4 regenerado mantiene 36s y disoluciones de 2s, con peso 8,817,563 B.

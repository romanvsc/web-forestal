# Storyboard Home V2 — Industrial Forestry Documentary

Fecha: 2026-10-02. Estado: **referencia visual de la Home V2 implementada localmente en `/`**. `/storyboard-v2/` conserva el estudio de composiciones y muestras manuales.

## Objetivo y entrega

Generar consultas comerciales mediante un recorrido documental con recursos propios. El usuario confirmó video automático sin sonido en escritorio, storyboard visual antes del código de la Home y fotografía operativa para la pausa institucional.

Vista local: `http://127.0.0.1:8080/storyboard-v2/`. Es una ruta de revisión, fuera del sitemap y con `noindex`. Las notas desplegables pertenecen al storyboard; no forman parte del producto final. El contacto dibujado es una composición y enlaza al formulario funcional de la V1.

## Direction contract

**THESIS:** la Home explica capacidades mientras recorre la operación forestal. La fotografía lleva el relato y cada capítulo facilita una consulta.

**OWN-WORLD:** Manrope 600/700, Work Sans 400/600, Tabler Outline. Verde institucional #0F766E, bosque #082D25, crema #F1EEE6, negro verde #061C17. Marcos rectos, imágenes reales y grandes cambios de escala.

**STORY:** hero → cosecha → transporte → acopio → caminos → biomasa → consultoría → empresa desde 1993 → SGC → Argentina y Paraguay → contacto.

**FIRST VIEWPORT:** poster a pantalla completa, logo arriba a la izquierda, Consultar arriba a la derecha, titular de dos líneas a la izquierda y datos breves en el borde inferior. Cabecera transparente con contraste asegurado.

**FORM:** storyboard responsive construido con material del repositorio. Dirección suministrada y elegida por el usuario; no se abre una nueva elección de identidad. Las composiciones revisadas serán la referencia para implementar la Home.

**FINISH:** la instrucción explícita de implementar autorizó la Home completa. La entrega exige implementación, revisión independiente, documentación del sistema y evidencia funcional y visual. El storyboard es una referencia de composición, no una condición pendiente de aprobación.

## Escenas del estudio previo

**Ajuste posterior del usuario:** la Home actual conserva encuadres oscuros continuos; Acopio usa `playa_acopio_1.jpeg` horizontal. El hero usa `hero-cinematic.mp4` de 36s, planos fijos y disoluciones de 2s. La tabla conserva el estudio previo; los valores vigentes están en DESIGN.md y PROPUESTA_MODERNIZACION.md.

| Escena | Recurso real | Composición | Movimiento para la Home |
| --- | --- | --- | --- |
| Hero | hero-forestal-poster.jpg / hero-forestal.webm / hero-forestal.mp4 | 100svh, título superpuesto y cabecera transparente | Video desktop; poster inmediato; salida del texto por máscara |
| Cosecha | 1470_proceso.jpeg | Marco al 75% y expansión | Máscara rectangular hasta 100%; escala 1 → 1.08 |
| Transporte | transporte_forestal_carga.jpeg | Foto a la derecha, texto al margen izquierdo | Entrada lateral breve y disolución |
| Acopio | playa_acopio.jpeg | Retrato vertical y texto lateral | Disolución que recupera el formato vertical |
| Caminos | caminos_forestales.jpeg | Panorama a sangre | Parallax máximo 5% |
| Biomasa | chipeado_gajos.jpeg | Material y máquina a gran escala | Encuadre y escala hasta 1.08 |
| Consultoría | consultoria.jpg | Vista aérea al 75% | Transición pausada hacia crema |
| Empresa | flota_camiones.jpg | 1993 de gran escala y flota | Lectura pausada; aparición breve |
| SGC | consultoria.jpg, con tratamiento oscuro | Titular y cuatro momentos consecutivos | Cambios de énfasis entre Seguridad, Calidad, Sostenibilidad y Mejora continua |
| Alcance | maps/argentina-paraguay.svg | Mapa grande y dos países | Aparición de contornos, sin puntos inventados |
| Contacto | Formulario existente | Fondo negro verde, título y campos | Feedback breve y estados del formulario actual |

La vista incluye tres muestras manuales de transición con inicio, punto medio y final. Ilustran encuadre y continuidad; no constituyen la timeline ScrollTrigger de producción.

## Responsive y accesibilidad

- Escritorio: títulos grandes, asimetría y marcos alternados; navegación directa a capacidades, SGC y consulta.
- Móvil: fotos y textos en flujo; ninguna escena fijada. Acopio mantiene su formato vertical.
- El storyboard conserva reproducción manual para inspeccionar el recurso. La Home implementa autoplay condicionado a escritorio, pausa, recuperación MP4 y poster ante fallo total.
- Foco visible, controles de 48 px, títulos jerárquicos y enlaces semánticos.
- Movimiento reducido: sin transiciones de controles; las muestras cambian solo por acción manual.
- Las seis descripciones se vinculan por slug a servicios reales. No se reutiliza la selección Nunjucks que está asignando contenido de cosecha a biomasa en V1.

## Referencias aplicadas

| Referencia | Aplicación en la V2 |
| --- | --- |
| [GTA VI](https://www.rockstargames.com/VI) | Escala, fotografía dominante y variación del ritmo. No se atribuye un motor a Rockstar. |
| [Lenis](https://github.com/darkroomengineering/lenis) | Un solo ciclo de suavizado integrado con GSAP en la Home. |
| [React Bits](https://www.reactbits.dev/get-started/index) | Apariciones breves de títulos con código propio. |
| [AnimmasterLib](https://animmasterlib.dev/) | Escenario operativo y mensajes breves. |
| [SkiperUI](https://skiper-ui.com/docs/quick-start) | Expansión del encuadre de cosecha. |
| [VengenceUI](https://www.vengenceui.com/) | Coordinación imagen, título y descripción. |
| [AnimateUI](https://animate-ui.com/docs/installation) | Feedback y apertura de controles. |
| [Uiverse](https://uiverse.io/) | Botones, campos y foco adaptados a Forestal. |
| [Uilora](https://www.uilora.com/) | Continuidad entre capítulos y pausa institucional. |
| [Shaders](https://shaders.com/docs/guide) | Referencia conceptual: máscaras y disoluciones propias. Sin dependencia comercial. |
| [Anime.js](https://animejs.com/documentation/events/onscroll/) | Distinción entre secuencias ligadas al scroll y apariciones disparadas. GSAP es el motor. |

ForgeUI excluido por decisión del usuario. Los catálogos React son referencias de comportamiento, no dependencias ni componentes copiados.

## Skills aplicadas

- Anti UI Slop: contrato específico, material propio y diferenciación de estados reales y muestras.
- Impeccable: portada persuasiva y continuidad del acceso comercial.
- Taste Skill: escala editorial, retrato de acopio y contraste de composiciones.
- Emil Design Engineering: interacción manual interrumpible y feedback breve.
- Vercel Web Design Guidelines: revisión de semántica, foco, teclado, medios y dimensiones de imágenes.

## Integración realizada

La Home V1 se reemplazó con estas composiciones y una timeline de seis capítulos. Se integraron parallax, corrección de biomasa y contacto oscuro. La comparación inicial d520025 → V1 7b1b5e5 → V2, las pruebas y los límites actuales se registran en [FASE_FINAL.md](FASE_FINAL.md).

## Verificación del storyboard (etapa previa)

- Build de producción y comprobación existente de consistencia de WhatsApp: correctos.
- Detector de Impeccable en las plantillas, estilos y controles del storyboard: sin hallazgos mecánicos.
- Inspección visual en 1440 × 900 y 390 × 844, con evidencia en [evidencia/v2-storyboard](evidencia/v2-storyboard/).
- Comprobación adicional de anchura y títulos en 768 × 1024 y 320 × 740: sin desbordamiento horizontal.
- Controles nativos de transición operados con teclado en 0%, 50% y 100%, con actualización de imagen y porcentaje.
- Una tanda de correcciones: contraste del logo, descripción de la foto de transporte, etiquetas del mapa y relevo de titulares en la transición institucional.
- La revisión independiente detectó un fondo ausente al final de la muestra Empresa → SGC. Se corrigió con fondo y orden de capas explícitos; la muestra usa una fotografía WebP del manifiesto como fondo local.

**Alcance de estas capturas:** muestran el storyboard, cuyos campos de contacto son de solo lectura. La evidencia de autoplay, timeline y formulario de la Home implementada se encuentra en `evidencia/v2-home/` y FASE_FINAL.md.

**Revisión independiente previa:** dictamen `ship` sobre el storyboard. El hallazgo del final Empresa → SGC quedó cerrado tras comparar capturas de 0%, 50% y 100%. Ese dictamen tiene alcance de maqueta; la Home integrada recibe una revisión independiente propia.

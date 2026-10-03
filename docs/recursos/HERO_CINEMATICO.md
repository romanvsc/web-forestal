# Hero cinematográfico — ajuste de ritmo

Pedido del usuario: eliminar tambaleo del hero, ralentizar cortes y conservar continuidad visual en Acopio.

| Antes | Después | Por qué |
| --- | --- | --- |
| Montaje de 13.33s con zoom codificado y zoom adicional al hacer scroll. | Montaje de 36s a 30fps, planos de encuadre fijo; medio del hero sin transform de scroll. | Eliminar movimientos simultáneos y la cuantización visible del zoom entre fotogramas. |
| Cambios de plano rápidos. | Planos de 8s y disoluciones de 2s; final y principio muestran la misma foto. | Dar tiempo de lectura y evitar un corte al reiniciar el loop. |
| Acopio vertical sobre crema y texto al lado opuesto. | Foto horizontal `playa_acopio_1.jpeg` a sangre en escritorio, fondo oscuro y texto a la izquierda. | Mantener continuidad con Transporte y Caminos. |
| Fundidos de .2 unidades de capítulo, scrub .3s. | Fundidos de .65 unidades con `sine.inOut`, scrub .9s, capítulos 140svh. | Prolongar el solapamiento; mantener la foto anterior opaca evita un flash del fondo. |

## Preparación reproducible

`node scripts/create-hero-video.cjs <ruta-a-ffmpeg>` produce `src/images/hero-cinematic.mp4`. Es preparación offline: el build y el navegador no necesitan FFmpeg. Los originales no se alteran. [Filtro xfade de FFmpeg](https://ffmpeg.org/ffmpeg-filters.html#xfade).

Fotos, en orden: `hero-forestal-poster.jpg`, `transporte_forestal_carga.jpeg`, `playa_acopio_1.jpeg`, `caminos_forestales.jpeg`, `chipeado_gajos.jpeg`, `consultoria.jpg`. El encuadre fijo es deliberado; el MP4 es un montaje fotográfico, no una nueva filmación. Exportación H.264, 1280×720, yuv420p, sin audio, faststart. Peso: 7,287,655 B. El poster, las condiciones de carga y la pausa manual se conservan.

## Alcance de la comprobación

Build de producción y chequeo de sintaxis completados. En IAB: MP4 reproduciendo, duración 36s y medio del hero con transform `none`; navegación Transporte → Acopio y regreso; Acopio horizontal en 1440×900 y 390×844, sin desbordamiento y sin fuente de video en móvil. Capturas: `docs/evidencia/v2-home/acopio-suave-1440.jpg` y `acopio-suave-390.jpg`.

Una muestra decodificada de primer/último frame a 128×72 en gris dio diferencia media de luminancia 1.4295 sobre 255. La compresión puede producir diferencias pequeñas; no se afirma igualdad binaria ni se sustituye una revisión temporal por capturas. Los estados de correo previamente verificados no se repitieron en esta corrección de medios.


## Actualización del material del usuario

El script ahora usa los recursos por servicio en `actualizadas/`: Cosecha, Transporte, Caminos, Biomasa y Consultoría. Acopio conserva `servicios/playa_acopio_1.jpeg` horizontal. El MP4 regenerado pesa 8,817,563 B; duración/fps/fundidos se conservan. El registro anterior de peso y comparación de primer/último frame corresponde al montaje previo; no se atribuye al archivo regenerado. [Fuentes y recortes](IMAGENES_ACTUALIZADAS.md).

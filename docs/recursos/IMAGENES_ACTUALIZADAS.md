# Imágenes actualizadas del usuario

Se incorporaron las siete imágenes aportadas. Se conservan las fotografías anteriores del repositorio; las nuevas usan nombres por servicio, sin espacios, y el build genera AVIF/WebP con hash y dimensiones intrínsecas.

| Archivo aportado (sufijo) | Recurso web | Dimensiones | Aplicación |
| --- | --- | --- | --- |
| 23_14_10-2.png | `/images/actualizadas/playas-de-acopio.png` | 1086 × 1448 | Catálogo, detalle y galería de Acopio. Home y montaje mantienen la foto horizontal aprobada. |
| 23_14_11-3.png | `/images/actualizadas/consultoria-forestal.png` | 1672 × 941 | Capítulo Consultoría, fondo SGC, catálogo y referencias de galería. |
| 23_14_12-4.png | `/images/actualizadas/biomasa-forestal.png` | 1821 × 864 | Capítulo Biomasa, catálogo, detalle, galerías y montaje. Recorte sin marca alterada. |
| 23_14_13-5.png | `/images/actualizadas/caminos-forestales.png` | 1672 × 941 | Capítulo Caminos, planificación, catálogo, detalle, galería y montaje. |
| 23_14_14-6.png | `/images/actualizadas/transporte-forestal.png` | 1448 × 1086 | Capítulo Transporte, catálogo, detalle, galerías y montaje. |
| 23_14_16-7.png | `/images/actualizadas/cosecha-forestal.png` | 1821 × 864 | Hero, poster/SEO, capítulo Cosecha, catálogo, detalle, galerías y montaje. Recorte sin marca alterada. |
| flota_camiones.png | `/images/flota_camiones.png` | 1448 × 1086 | Pausa institucional en Home y storyboard. |

## Recortes autorizados

El usuario indicó: «Las que tienen marcas alteradas, recortalas». Cosecha y Biomasa se editaron con imagegen integrado para excluir la franja inferior que contenía los nombres erróneos. Los archivos originales se conservan en `src/images/actualizadas/originales/`. Las salidas del editor son 1821 × 864; son ediciones generativas, no se afirma identidad píxel a píxel con un recorte determinista.

Prompt aplicado individualmente a los dos archivos:

> Edit target: the supplied forestry photograph. The user explicitly asks for a rectangular crop only to remove the incorrect watermark in the bottom-right corner. Crop away the bottom 16% across the full width. Keep the top 84% of the original photograph, including the sky, trees and machinery, exactly as supplied. Preserve its colors, equipment, logos on machinery, texture and detail. No inpainting, no new objects, no new text, no replacement company name, no artificial sharpening. Output only the cropped landscape photograph, full original width, landscape ratio about 2.11:1, no margins or padding. Remove all of the bottom-right watermark by excluding its entire area from the crop.

## Continuidad y recursos

La nueva foto vertical de Acopio se usa en catálogo/detalle/galería. La escena cinematográfica y su plano de video conservan `playa_acopio_1.jpeg` horizontal, conforme a la corrección anterior del usuario. El montaje se regeneró con Cosecha, Transporte, Caminos, Biomasa y Consultoría actualizadas; mantiene 36s, 30fps y disoluciones de 2s. Peso actual: 8,817,563 B. Poster AVIF de 1280px: 98,432 B, dentro del objetivo de 250KB. Los PNG originales no son la fuente principal en navegadores con AVIF/WebP.

Las dimensiones de las imágenes aportadas no aumentan en todos los casos: la nueva Consultoría mide 1672 × 941 frente a 1920 × 1080 del archivo anterior; se incorpora por la elección de material del usuario. El build evita ampliar las variantes por encima de la dimensión del recurso fuente.

Build de producción completado. Comprobación visual de poster/montaje y Biomasa en escritorio, catálogo y detalle/galería de Acopio. Las seis tarjetas llenan sus encuadres en escritorio; la tarjeta móvil mantiene igual altura de picture e imagen y no se observó desbordamiento. El registro de recursos está en `docs/evidencia/v2-home/imagenes-nuevas.json`. Los estados de correo no se repitieron, porque el ajuste corresponde a imágenes.

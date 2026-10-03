// Natural Earth 110m; dominio público. Se mantienen contornos reales, sin sitios operativos.
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const source = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';
const response = await fetch(source);
if (!response.ok) throw new Error(`Natural Earth respondió ${response.status}`);
const body = await response.text();
const data = JSON.parse(body);
const codes = ['ARG', 'PRY', 'BRA', 'BOL', 'CHL', 'URY'];
const selected = data.features.filter((feature) => codes.includes(feature.properties.ADM0_A3));
if (selected.length !== codes.length) throw new Error('Faltan países en la fuente del mapa');
const project = ([lon, lat]) => [((lon + 82) * 13).toFixed(2), ((-lat - 7) * 14).toFixed(2)];
const paths = selected.map((feature) => {
  const code = feature.properties.ADM0_A3;
  const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
  const d = polygons.map((rings) => rings.map((ring) => ring.map((point, index) => `${index ? 'L' : 'M'}${project(point).join(',')}`).join('') + 'Z').join('')).join('');
  const active = ['ARG', 'PRY'].includes(code);
  return `<path id="${code}" d="${d}" fill="${active ? '#0F766E' : '#CFD6CA'}" stroke="#F1EEE6" stroke-width="2" fill-rule="evenodd"/>`;
}).join('\n');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 710" role="img" aria-labelledby="title desc"><title id="title">Argentina y Paraguay</title><desc id="desc">Países donde opera el grupo. Los contornos no representan la ubicación ni la cobertura de operaciones específicas.</desc>${paths}<g fill="#061C17" font-family="sans-serif" font-size="20" font-weight="600"><text x="365" y="245">PARAGUAY</text><text x="340" y="470">ARGENTINA</text></g></svg>\n`;
await mkdir('src/images/maps', { recursive: true });
await writeFile('src/images/maps/argentina-paraguay.svg', svg);
await mkdir('docs/recursos', { recursive: true });
await writeFile('docs/recursos/MAPA_REGIONAL.md', `# Contornos del mapa regional\n\n- Fuente: [Natural Earth 110m admin 0 countries](${source}).\n- Licencia: [dominio público](https://www.naturalearthdata.com/about/terms-of-use/).\n- SHA-256 de la fuente descargada: \`${createHash('sha256').update(body).digest('hex')}\`.\n- Generación: \`node scripts/create-regional-map.mjs\`. No es una dependencia del build.\n- Conversión: proyección rectangular para el encuadre editorial, sin coordenadas operativas ni marcadores.\n- Argentina y Paraguay destacados; países vecinos como contexto.\n- No representa cobertura total de territorio ni emplazamientos particulares.\n`);
console.log('Mapa regional SVG generado con seis contornos de Natural Earth.');

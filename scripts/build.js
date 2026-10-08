const { spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const esbuild = require('esbuild');

const projectRoot = process.cwd();
const cacheRoot = path.join(projectRoot, '.cache', 'site-assets');
const distRoot = path.join(cacheRoot, 'dist');
const mediaCacheRoot = path.join(cacheRoot, 'media-cache');
const iconNames = [
  'menu-2', 'x', 'arrow-right', 'arrow-up-right', 'chevron-down',
  'mail', 'phone', 'player-play', 'player-pause', 'circle-check',
  'alert-circle', 'brand-whatsapp',
];
const rasterExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const vectorExtensions = new Set(['.svg']);

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function compileTailwind() {
  const result = spawnSync(process.execPath, [
    require.resolve('tailwindcss/lib/cli.js'),
    '--input', path.join(projectRoot, 'src/css/tailwind.css'),
    '--output', path.join(projectRoot, '.cache/tailwind.css'),
    '--minify',
  ], { cwd: projectRoot, stdio: 'inherit', env: process.env });

  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Tailwind terminó con código ${result.status ?? 'desconocido'}`);
}

function collectReferencedImages() {
  const sourceFiles = walk(path.join(projectRoot, 'src')).filter((file) => /\.(njk|html|js|json|md)$/i.test(file));
  const images = new Set();
  const imagePattern = /\/images\/[^\s"'<>`),]+/g;

  for (const sourceFile of sourceFiles) {
    const contents = readFileSync(sourceFile, 'utf8');
    for (const match of contents.matchAll(imagePattern)) {
      const url = match[0].replace(/[?#].*$/, '');
      const extension = path.extname(url).toLowerCase();
      if (rasterExtensions.has(extension) || vectorExtensions.has(extension)) images.add(url);
    }
  }

  return [...images].sort();
}

async function mapConcurrent(items, concurrency, task) {
  let index = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (index < items.length) {
      const item = items[index++];
      await task(item);
    }
  });
  await Promise.all(workers);
}

// One color direction for the whole site: catalog-style photos (saturated skies, HDR look) are
// pulled toward the cinematic tone of the aerial shots. Illustrations, logos and maps are untouched.
const GRADE_VERSION = 'g3';
const gradeSkipPrefixes = ['/images/consultoria/', '/images/clientes/', '/images/maps/'];
const gradeProfiles = {
  default: { saturation: 0.76, brightness: 0.94 },
  // Hero poster (also the mobile / reduced-motion hero): the vivid sky is calmed to sit with the cinematic video.
  '/images/actualizadas/cosecha-forestal.png': { saturation: 0.7, brightness: 0.9 },
  // The aerial render is already cinematic: leave as authored.
  '/images/actualizadas/consultoria-forestal.png': null,
};

function gradeFor(url) {
  if (url in gradeProfiles) return gradeProfiles[url];
  if (gradeSkipPrefixes.some((prefix) => url.startsWith(prefix))) return null;
  return gradeProfiles.default;
}

async function buildResponsiveImages() {
  const sources = collectReferencedImages();
  const images = {};
  const variantWidths = [480, 768, 1280, 1600];
  const outputDirectory = mediaCacheRoot;
  mkdirSync(outputDirectory, { recursive: true });

  await mapConcurrent(sources, 3, async (url) => {
    const source = path.join(projectRoot, 'src', url.replace(/^\//, ''));
    if (!existsSync(source)) return;

    if (path.extname(source).toLowerCase() === '.svg') {
      const svgRoot = readFileSync(source, 'utf8').match(/<svg\b[^>]*>/i)?.[0] ?? '';
      const viewBox = svgRoot.match(/\bviewBox\s*=\s*["']\s*(-?[\d.]+)[,\s]+(-?[\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
      const widthAttribute = svgRoot.match(/\bwidth\s*=\s*["']\s*([\d.]+)(?:px)?/i);
      const heightAttribute = svgRoot.match(/\bheight\s*=\s*["']\s*([\d.]+)(?:px)?/i);
      const width = Number(viewBox?.[3] ?? widthAttribute?.[1]);
      const height = Number(viewBox?.[4] ?? heightAttribute?.[1]);
      if (width > 0 && height > 0) images[url] = { width, height, avif: [], webp: [] };
      return;
    }
    const info = await sharp(source).metadata();
    if (!info.width || !info.height) return;
    const swapsDimensions = [5, 6, 7, 8].includes(info.orientation);
    const width = swapsDimensions ? info.height : info.width;
    const height = swapsDimensions ? info.width : info.height;

    const contentHash = createHash('sha256').update(readFileSync(source)).digest('hex').slice(0, 10);
    const slug = path.basename(url, path.extname(url)).toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const variants = { avif: [], webp: [] };

    const grade = gradeFor(url);
    const gradeTag = grade ? `-${GRADE_VERSION}` : '';

    for (const variantWidth of variantWidths.filter((candidate) => candidate <= width)) {
      for (const format of ['avif', 'webp']) {
        const filename = `${slug}-${contentHash}${gradeTag}-${variantWidth}.${format}`;
        const destination = path.join(outputDirectory, filename);
        if (!existsSync(destination)) {
          let pipeline = sharp(source).rotate().resize({ width: variantWidth, withoutEnlargement: true });
          if (grade) pipeline = pipeline.modulate(grade);
          if (format === 'avif') await pipeline.avif({ quality: 52, effort: 4 }).toFile(destination);
          else await pipeline.webp({ quality: 74, effort: 4 }).toFile(destination);
        }
        variants[format].push({ url: `/assets/media/${filename}`, width: variantWidth });
      }
    }

    images[url] = {
      width,
      height,
      avif: variants.avif,
      webp: variants.webp,
    };
  });

  return images;
}

function buildIconSprite() {
  const iconsDirectory = path.join(projectRoot, 'node_modules/@tabler/icons/icons/outline');
  const symbols = iconNames.map((name) => {
    const source = readFileSync(path.join(iconsDirectory, `${name}.svg`), 'utf8');
    const viewBox = source.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 24 24';
    const body = source.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] ?? '';
    return `<symbol id="${name}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</symbol>`;
  }).join('');
  const content = `<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`;
  const hash = createHash('sha256').update(content).digest('hex').slice(0, 10);
  const filename = `icons-${hash}.svg`;
  writeFileSync(path.join(distRoot, filename), content, 'utf8');
  return `/assets/${filename}`;
}

async function buildAssets() {
  rmSync(distRoot, { recursive: true, force: true });
  mkdirSync(distRoot, { recursive: true });
  mkdirSync(path.join(projectRoot, '.cache'), { recursive: true });

  compileTailwind();
  const images = await buildResponsiveImages();
  const distMediaRoot = path.join(distRoot, 'media');
  mkdirSync(distMediaRoot, { recursive: true });
  const copiedMedia = new Set();
  for (const image of Object.values(images)) {
    for (const variant of [...image.avif, ...image.webp]) {
      const filename = path.basename(variant.url);
      if (copiedMedia.has(filename)) continue;
      copyFileSync(path.join(mediaCacheRoot, filename), path.join(distMediaRoot, filename));
      copiedMedia.add(filename);
    }
  }
  const icons = buildIconSprite();
  const licensesDirectory = path.join(distRoot, 'licenses');
  mkdirSync(licensesDirectory, { recursive: true });
  copyFileSync(path.join(projectRoot, 'node_modules/@fontsource-variable/manrope/LICENSE'), path.join(licensesDirectory, 'manrope-OFL.txt'));
  copyFileSync(path.join(projectRoot, 'node_modules/@fontsource-variable/work-sans/LICENSE'), path.join(licensesDirectory, 'work-sans-OFL.txt'));
  copyFileSync(path.join(projectRoot, 'node_modules/@tabler/icons/LICENSE'), path.join(licensesDirectory, 'tabler-icons-MIT.txt'));
  const result = await esbuild.build({
    absWorkingDir: projectRoot,
    entryPoints: {
      main: 'src/js/main.js',
      site: 'scripts/site.css',
    },
    outdir: distRoot,
    bundle: true,
    minify: true,
    target: ['es2020'],
    format: 'esm',
    splitting: true,
    entryNames: '[name]-[hash]',
    chunkNames: 'chunk-[name]-[hash]',
    assetNames: 'font-[name]-[hash]',
    loader: { '.woff2': 'file' },
    metafile: true,
    legalComments: 'none',
  });

  const outputUrl = (entryPoint) => {
    const match = Object.entries(result.metafile.outputs).find(([, output]) => output.entryPoint === entryPoint);
    if (!match) throw new Error(`esbuild no produjo una salida para ${entryPoint}`);
    return `/assets/${path.basename(match[0])}`;
  };
  const fontUrl = (family) => {
    const output = Object.keys(result.metafile.outputs).find((file) => file.endsWith('.woff2') && file.toLowerCase().includes(family));
    if (!output) throw new Error(`esbuild no produjo la fuente ${family}`);
    return `/assets/${path.basename(output)}`;
  };

  const manifest = {
    css: outputUrl('scripts/site.css'),
    js: outputUrl('src/js/main.js'),
    fonts: {
      manrope: fontUrl('manrope-latin-wght-normal'),
      workSans: fontUrl('work-sans-latin-wght-normal'),
    },
    icons,
    images,
  };
  writeFileSync(path.join(cacheRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const cssBytes = statSync(path.join(distRoot, path.basename(manifest.css))).size;
  const jsBytes = statSync(path.join(distRoot, path.basename(manifest.js))).size;
  const responsiveImageCount = Object.values(images).filter((image) => image.avif.length > 0).length;
  console.log(`Assets listos: ${responsiveImageCount} imágenes raster responsivas; CSS ${cssBytes} B; JS ${jsBytes} B.`);
  return manifest;
}

function cleanSiteOutput() {
  const outputRoot = path.resolve(projectRoot, '_site');
  if (path.dirname(outputRoot) !== projectRoot || path.basename(outputRoot) !== '_site') {
    throw new Error('La salida de Eleventy debe ser la carpeta _site del proyecto.');
  }
  rmSync(outputRoot, { recursive: true, force: true });
}

async function buildSite() {
  await buildAssets();
  cleanSiteOutput();
  const result = spawnSync(process.execPath, [
    require.resolve('@11ty/eleventy/cmd.js'),
  ], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status ?? 1;
}

if (require.main === module) {
  buildSite().catch((error) => {
    console.error(error.stack ?? error.message ?? error);
    process.exitCode = 1;
  });
}

module.exports = { buildAssets, buildSite, cleanSiteOutput };

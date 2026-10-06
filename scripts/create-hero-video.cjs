// Offline media preparation only; FFmpeg is not a build or browser dependency.
// Run: node scripts/create-hero-video.cjs <path-to-ffmpeg> [crf] [output-path]
const { spawnSync } = require('node:child_process');
const { mkdirSync, copyFileSync } = require('node:fs');
const path = require('node:path');
const ffmpeg = process.argv[2];
const crf = process.argv[3] || '26';
const output = path.resolve(process.argv[4] || 'src/images/hero-cinematic.mp4');
if (!ffmpeg) throw new Error('Indique la ruta a FFmpeg.');
const shots = [
  'actualizadas/cosecha-forestal.png',
  'actualizadas/transporte-forestal.png',
  'servicios/playa_acopio_1.jpeg',
  'actualizadas/caminos-forestales.png',
  'actualizadas/biomasa-forestal.png',
  'actualizadas/consultoria-forestal.png',
];
const shotDuration = 8;
const dissolve = 2;
const cache = path.resolve('.cache/hero-video');
mkdirSync(cache, { recursive: true });
const frames = [...shots, shots[0]];
const input = frames.flatMap((source) => ['-loop', '1', '-framerate', '30', '-t', String(shotDuration), '-i', path.resolve('src/images', source)]);
const filters = frames.map((_, index) => `[${index}:v]scale=1280:720:force_original_aspect_ratio=increase:out_range=tv,crop=1280:720,setsar=1,format=yuv420p,settb=AVTB,setpts=PTS-STARTPTS,fps=30[v${index}]`);
for (let index = 1; index < frames.length; index += 1) {
  const previous = index === 1 ? 'v0' : `mix${index - 1}`;
  filters.push(`[${previous}][v${index}]xfade=transition=fade:duration=${dissolve}:offset=${index * (shotDuration - dissolve)}[mix${index}]`);
}
// Start/end on the identical first photograph, after the closing dissolve.
// Removing the duplicated hold makes the native HTML loop seamless.
const duration = shots.length * (shotDuration - dissolve);
filters.push(`[mix${frames.length - 1}]trim=start=${dissolve}:duration=${duration},setpts=PTS-STARTPTS,format=yuv420p[out]`);
const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'warning', '-y', ...input,
  '-filter_complex_threads', '2', '-filter_complex', filters.join(';'), '-map', '[out]', '-an',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', crf, '-pix_fmt', 'yuv420p', '-r', '30',
  '-movflags', '+faststart', path.join(cache, 'hero-cinematic.mp4')], { stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) throw new Error(`FFmpeg terminó con código ${result.status}`);
// Publish only the finished export so the dev watcher never copies a partial video.
copyFileSync(path.join(cache, 'hero-cinematic.mp4'), output);
console.log(`Hero: ${duration}s, 30fps, disoluciones ${dissolve}s, encuadre fijo y loop continuo.`);

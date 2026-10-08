// Offline media preparation only; FFmpeg is not a build or browser dependency.
// Run: node scripts/create-hero-video.cjs <path-to-ffmpeg> [crf] [output-path]
// The stills go through the same color grade as the site's images (scripts/build.js gradeFor), so the
// video, its poster and the rest of the page share one tone.
const { spawnSync } = require('node:child_process');
const { mkdirSync, copyFileSync } = require('node:fs');
const sharp = require('sharp');
const { gradeFor } = require('./build');
const path = require('node:path');
const ffmpeg = process.argv[2];
const crf = process.argv[3] || '34';
const tune = process.env.HERO_TUNE || 'stillimage';
// libx264 is the reference encoder; HERO_ENCODER=h264_nvenc is a fallback for machines whose FFmpeg lacks it.
const encoder = process.env.HERO_ENCODER || 'libx264';
const fps = process.env.HERO_FPS || '30';
const gop = process.env.HERO_GOP || '300';
const preset = process.env.HERO_PRESET || 'veryslow';
const encoderArgs = encoder === 'libx264'
  ? ['-c:v', 'libx264', '-preset', preset, '-crf', crf, ...(tune === 'none' ? [] : ['-tune', tune]), '-x264-params', process.env.HERO_X264 || 'aq-mode=3']
  : !encoder.includes('nvenc') ? ['-c:v', encoder, ...(process.env.HERO_EXTRA ? process.env.HERO_EXTRA.split(' ') : []), '-b:v', process.env.HERO_BITRATE || '700k']
  : ['-c:v', encoder, '-preset', 'p7', '-tune', 'hq', '-rc', 'vbr', '-cq', crf, '-b:v', '0', '-bf', '3', '-rc-lookahead', '32', '-spatial-aq', '1'];
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
const stills = path.join(cache, 'stills');
mkdirSync(stills, { recursive: true });
async function gradeStills() {
  const graded = [];
  for (const source of shots) {
    const target = path.join(stills, `${path.basename(source, path.extname(source))}.png`);
    let image = sharp(path.resolve('src/images', source)).resize(1280, 720, { fit: 'cover' });
    const grade = gradeFor(`/images/${source}`);
    if (grade) image = image.modulate(grade);
    await image.png().toFile(target);
    graded.push(target);
  }
  return graded;
}
function encode(gradedShots) {
const frames = [...gradedShots, gradedShots[0]];
const input = frames.flatMap((source) => ['-loop', '1', '-framerate', fps, '-t', String(shotDuration), '-i', source]);
const filters = frames.map((_, index) => `[${index}:v]scale=1280:720:force_original_aspect_ratio=increase:out_range=tv,crop=1280:720,setsar=1,format=yuv420p,settb=AVTB,setpts=PTS-STARTPTS,fps=${fps}[v${index}]`);
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
  ...encoderArgs, '-g', gop, '-pix_fmt', 'yuv420p', '-r', fps,
  '-movflags', '+faststart', path.join(cache, 'hero-cinematic.mp4')], { stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) throw new Error(`FFmpeg terminó con código ${result.status}`);
// Publish only the finished export so the dev watcher never copies a partial video.
copyFileSync(path.join(cache, 'hero-cinematic.mp4'), output);
console.log(`Hero: ${duration}s, ${fps}fps, disoluciones ${dissolve}s, encuadre fijo y loop continuo.`);
}
gradeStills().then(encode).catch((error) => { console.error(error); process.exitCode = 1; });

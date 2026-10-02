const { spawn } = require('node:child_process');
const { buildAssets, cleanSiteOutput } = require('./build');

const children = new Set();
let stopping = false;

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
  process.exitCode = code;
}

async function main() {
  await buildAssets();
  cleanSiteOutput();
  const eleventy = spawn(process.execPath, [require.resolve('@11ty/eleventy/cmd.js'), '--serve'], {
    cwd: process.cwd(),
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'development' },
  });
  children.add(eleventy);
  eleventy.on('exit', (code) => stop(code ?? 0));

}

process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));

main().catch((error) => {
  console.error(error.stack ?? error.message ?? error);
  stop(1);
});

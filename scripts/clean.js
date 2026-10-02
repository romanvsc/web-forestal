const { rmSync } = require('node:fs');

for (const directory of ['_site', '.cache/site-assets', '.cache/tailwind.css']) {
  rmSync(directory, { recursive: true, force: true });
}

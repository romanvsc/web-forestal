const { readFileSync } = require('node:fs');
const path = require('node:path');

module.exports = () => JSON.parse(readFileSync(path.resolve('.cache/site-assets/manifest.json'), 'utf8'));

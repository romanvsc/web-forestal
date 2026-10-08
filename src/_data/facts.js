// Facts shown in the Home's proof band. Every value comes from content already in the repository:
// - years: site.json foundingYear (1993), counted to the build year
// - group companies: nosotros.json describes "Forestal Garuhapé SA, Forestal Paraguay SA y Foresvia SA"
// - countries: Argentina and Paraguay (nosotros.json, PRODUCT.md)
// - capabilities: the six services in todos_los_servicios.json
// Add a figure here only when the client has confirmed it.
const site = require('./site.json');
const capabilities = require('./homeCapabilities');

module.exports = [
  { value: new Date().getFullYear() - Number(site.foundingYear), label: 'años de trayectoria' },
  { value: 3, label: 'empresas en el grupo' },
  { value: 2, label: 'países de operación' },
  { value: capabilities.length, label: 'capacidades de servicio' },
];

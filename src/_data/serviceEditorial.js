const services = require('./todos_los_servicios.json');
const relations = {
  'cosecha-forestal': ['transporte-forestal', 'playas-de-acopio'],
  'transporte-forestal': ['cosecha-forestal', 'playas-de-acopio'],
  'playas-de-acopio': ['transporte-forestal', 'aprovechamiento-biomasa-forestal'],
  'caminos-forestales': ['transporte-forestal', 'consultoria-forestal'],
  'aprovechamiento-biomasa-forestal': ['cosecha-forestal', 'playas-de-acopio'],
  'consultoria-forestal': ['cosecha-forestal', 'caminos-forestales'],
};
const detail = slug => slug === 'consultoria-forestal' ? '/consultoria/' : `/servicios/${slug}/`;
module.exports = Object.fromEntries(services.map(service => {
  const gallery = require(`./galerias/${service.slug}.json`);
  const documentary = gallery.filter(image => !/certificad|\.svg|consultoria\//i.test(image.src));
  return [service.slug, {
    image: service.slug === 'playas-de-acopio' ? '/images/servicios/playa_acopio_1.jpeg' : service.imagen,
    primary: documentary.slice(0, 3),
    remaining: gallery.filter(image => !documentary.slice(0, 3).includes(image)),
    related: relations[service.slug].map(slug => ({ ...services.find(item => item.slug === slug), detail: detail(slug) })),
  }];
}));

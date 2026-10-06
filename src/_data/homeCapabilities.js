const chapters = require('./storyboardV2');
const services = require('./todos_los_servicios.json');

module.exports = chapters.map((chapter) => {
  const service = services.find((item) => item.slug === chapter.slug);
  return { ...service, ...chapter, image: service.imagen };
});

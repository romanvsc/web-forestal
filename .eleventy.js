const { buildAssets } = require('./scripts/build');

module.exports = function(eleventyConfig) {
    eleventyConfig.on('eleventy.beforeWatch', async () => {
      if (process.env.NODE_ENV === 'development') await buildAssets();
    });

    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
      const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
      return date.toISOString().slice(0, 10);
    });

    eleventyConfig.addPassthroughCopy("src/.htaccess");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/**/*.php");
    eleventyConfig.addPassthroughCopy({ ".cache/site-assets/dist": "assets" });
    for (const source of [
      "src/css/tailwind.css",
      "src/css/styles.css",
      "src/js/main.js",
      "src/images",
      "scripts/site.css",
      "tailwind.config.js",
    ]) {
      eleventyConfig.addWatchTarget(source);
    }
    
    // Layout alias
    eleventyConfig.addLayoutAlias("base", "layouts/base.njk");

  
    return {
      dir: {
        input: "src",
        output: "_site",
        includes: "_includes",
        data: "_data" // Asegúrate de que esto esté correcto
      },
      templateFormats: ["njk", "html", "md"],
      htmlTemplateEngine: "njk"
    };
  };

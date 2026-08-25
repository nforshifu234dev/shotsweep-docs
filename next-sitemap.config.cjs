/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://shotsweep.nforshifu234dev.com',

  generateRobotsTxt: true,

  changefreq: 'weekly',

  priority: 0.5,

  transform: async (config, url) => {
    let priority = 0.5

    if (url === `${config.siteUrl}/hello`) {
      return null
    }

    if (url === '/') {
      priority = 1.0
    } else if (url.startsWith('/docs')) {
      priority = 0.9
    } else if (url === '/about') {
      priority = 0.7
    } else if (url === '/contact') {
      priority = 0.4
    }

    return {
      loc: url,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.france-pascale.fr', // Remplacer par l'URL réelle
  generateRobotsRxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      }
    ],
    additionalSitemaps: [
      'https://www.france-pascale.fr/sitemap.xml'
    ]
  },
  transform: async (config, path) => {
    // Priorités SEO selon l'importance des pages
    const priorities = {
      '/': 1.0,
      '/boutique': 0.9,
      '/boutique/tableaux': 0.8,
      '/boutique/mobilier': 0.8,
      '/boutique/objets-deco': 0.8,
      '/boutique/bijoux': 0.8,
      '/sur-mesure': 0.8,
      '/realisations': 0.7,
      '/blog': 0.7,
      '/a-propos': 0.6,
      '/contact': 0.6
    }

    // Fréquence de mise à jour
    const changefreqs = {
      '/': 'weekly',
      '/boutique': 'weekly',
      '/blog': 'weekly',
      '/realisations': 'monthly'
    }

    return {
      loc: path,
      changefreq: changefreqs[path] || 'monthly',
      priority: priorities[path] || 0.5,
      lastmod: new Date().toISOString()
    }
  }
} 
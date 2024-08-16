export default function sitemap() {
  return [
    {
      url: "http://localhost:3000/",
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1.0,
    },
    {
      url: "http://localhost:3000/products",
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.8,
    },
    {
      url: "http://localhost:3000/products/1",
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.5,
    },
  ];
}

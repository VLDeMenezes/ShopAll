export const robots = () => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/user",
      },
    ],
    sitemap: "http://localhost:3000/sitemap.xml",
  };
};

export default robots;

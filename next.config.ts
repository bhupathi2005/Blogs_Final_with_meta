const nextConfig = {
  trailingSlash: false,
  async rewrites() {
    console.log("Applying rewrites...");
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

export default nextConfig;

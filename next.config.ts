/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/robots.txt",
        destination: "/public/robots.txt",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;

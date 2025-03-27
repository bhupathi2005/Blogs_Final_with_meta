import { NextResponse } from "next/server";

const SITE_URL = "https://www.700sewagecleaning.com";

const staticPages = [
  "/",
  "/about-us",
  "/services",
  "/services/sewage-tank-cleaning",
  "/services/sewage-drainage-line-blockage-removal",
  "/services/oil-tank-cleaning",
  "/services/water-tank-cleaning",
  "/services/pipeline-%26-drain-line-cleaning", // Properly encoded "&"
  "/contact",
  "/blog",
];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/&nbsp;/g, "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export async function GET() {
  try {
    console.log("Fetching blog posts from WordPress API...");

    const res = await fetch(
      "https://public-api.wordpress.com/wp/v2/sites/cleaning988.wordpress.com/posts?per_page=100"
    );

    if (!res.ok) {
      console.error(`❌ Failed to fetch posts: ${res.status}`);
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    const posts = await res.json();

    console.log(`✅ Successfully fetched ${posts.length} blog posts.`);

    const staticSitemap = staticPages
      .map((page) => {
        return `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod> 
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      })
      .join("");

    const blogSitemap = posts
      .map((post) => {
        const postSlug = post.slug || slugify(post.title.rendered);
        const lastModDate = post.modified
          ? post.modified.split("T")[0]
          : new Date().toISOString().split("T")[0];

        return `
  <url>
    <loc>${SITE_URL}/blog/${postSlug}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
      })
      .join("");

    const finalSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticSitemap}
  ${blogSitemap}
</urlset>`;

    console.log("✅ Final SEO Sitemap generated successfully!");

    return new Response(finalSitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("🚨 Error generating sitemap:", error);
    return new Response("Failed to generate sitemap", { status: 500 });
  }
}

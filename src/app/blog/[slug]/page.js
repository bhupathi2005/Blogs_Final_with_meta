import { notFound } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import parse from "html-react-parser";

import he from "he";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Fetch all blog posts
async function getAllBlogPosts() {
  const res = await fetch(
    "https://public-api.wordpress.com/wp/v2/sites/cleaning988.wordpress.com/posts?per_page=50",
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  return await res.json();
}

// Helper function to extract the first image from content
function extractImage(content) {
  const match = content.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}
const stripTags = (html) => {
  return he.decode(html.replace(/<\/?[^>]+(>|$)/g, ""));
};

// Helper function to generate slugs
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&amp;/g, "and") // Convert &amp; to "and"
    .replace(/&nbsp;/g, "-") // Convert &nbsp; (space) to "-"
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/--+/g, "-") // Remove duplicate dashes
    .trim();
}

// Function to sanitize content and avoid nested <p> errors
function sanitizeContent(content) {
  return content
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/<p><p>/g, "<p>")
    .replace(/<\/p><\/p>/g, "</p>");
}

export default async function BlogPostPage({ params: paramsPromise }) {
  const params = await paramsPromise; // Await params if it's a Promise

  if (!params || !params.slug) return notFound(); // Handle missing slug

  const { slug } = params;
  console.log("Slug:", slug);

  const posts = await getAllBlogPosts();

  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  const relatedPosts = posts
    .filter((p) => p.id !== post.id) // Exclude current post
    .slice(0, 3);
  const recentPosts = posts.slice(0, 10);

  return (
    <>
      <Head>
        <title>{he.decode(parse(post.title?.rendered || "Untitled"))}</title>
        <meta
          name="description"
          content={`${stripTags(post.excerpt.rendered).substring(0, 100)}...`}
        />
        <meta
          property="og:description"
          content={`${stripTags(post.excerpt.rendered).substring(0, 100)}...`}
        />
        <meta
          name="twitter:description"
          content={`${stripTags(post.excerpt.rendered).substring(0, 100)}...`}
        />
      </Head>
      <Navbar />
      <div
        style={{
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            {/* Main Blog Content - Full Width on Mobile */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {parse(post.title?.rendered || "Untitled")}
              </h1>
              {post.jetpack_featured_media_url && (
                <Image
                  src={post.jetpack_featured_media_url}
                  alt={post.title?.rendered || "Blog image"}
                  width={800}
                  height={500}
                  className="w-full rounded-lg shadow-md mb-4"
                />
              )}
              <div className="text-gray-700 leading-relaxed">
                {parse(
                  post.content?.rendered || "<p>Content not available.</p>"
                )}
              </div>
            </div>

            {/* Sidebar - Moves Below on Mobile */}
            <div className="w-full">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "12px",
                    color: "#111827",
                  }}
                >
                  Recent Posts
                </h2>
                <ul
                  style={{ listStyleType: "none", padding: "0", margin: "0" }}
                >
                  {recentPosts.map((post) => (
                    <li
                      key={post.id}
                      style={{
                        marginBottom: "12px",
                        borderBottom: "1px solid #ddd",
                        paddingBottom: "8px",
                        paddingLeft: "6px",
                      }}
                    >
                      <Link
                        href={`/blog/${
                          post.slug || slugify(post.title.rendered)
                        }`}
                        style={{
                          color: "#2563eb",
                          textDecoration: "none",
                          fontSize: "1rem",
                          fontWeight: "500",
                        }}
                      >
                        {he.decode(post.title.rendered)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Blogs Section */}
          <section style={{ marginTop: "48px" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "16px",
                color: "#111827",
              }}
            >
              Related Blogs
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {relatedPosts.map((related) => {
                const imageUrl =
                  related.jetpack_featured_media_url ||
                  extractImage(related.content.rendered);
                return (
                  <div
                    key={related.id}
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      padding: "16px",
                      transition: "transform 0.2s",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                  >
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={related.title.rendered}
                        unoptimized
                        width={600}
                        height={400}
                        style={{
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                    <div style={{ padding: "12px 0", flexGrow: "1" }}>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "600",
                          marginBottom: "8px",
                          color: "#111827",
                        }}
                      >
                        <Link
                          href={`/blog/${
                            post.slug || slugify(post.title.rendered)
                          }`}
                          style={{
                            color: "#2563eb",
                            textDecoration: "none",
                          }}
                        >
                          {parse(related.title.rendered)}
                        </Link>
                      </h3>
                      <div
                        style={{
                          color: "#4b5563",
                          fontSize: "0.875rem",
                          marginBottom: "12px",
                        }}
                      >
                        {parse(
                          sanitizeContent(
                            related.excerpt.rendered.substring(0, 100)
                          )
                        )}
                        ...
                      </div>
                      <Link
                        href={`/blog/${
                          post.slug || slugify(post.title.rendered)
                        }`}
                        style={{
                          display: "inline-block",
                          padding: "10px 16px",
                          backgroundColor: "#CAEE5A",
                          color: "#000",
                          fontWeight: "bold",
                          borderRadius: "6px",
                          textAlign: "center",
                          textDecoration: "none",
                        }}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}

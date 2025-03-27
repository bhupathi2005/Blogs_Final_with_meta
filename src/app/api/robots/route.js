import { NextResponse } from "next/server";

export async function GET() {
  const robotsTxt = `
    User-agent: *
    Allow: /
    Sitemap: https://700sewagecleaning.com/sitemap.xml
  `;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

import { getAllPostsMeta } from "@/lib/posts";

const SITE_URL = "https://intp-gpt-to-know.netlify.app"; 
// 之後換成你真實 domain

function isoDate(date?: string) {
  if (!date) return null;
  // 假設你 md 用 YYYY-MM-DD
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().split("T")[0];
}

export async function GET() {
  const posts = await getAllPostsMeta();

  // 最新文章日期，用作 static page fallback
  const latestPostDate =
    posts.map((p) => isoDate(p.date)).filter(Boolean)[0] ?? null;

  const staticPages = [
    { path: "", lastmod: latestPostDate },
    { path: "/posts", lastmod: latestPostDate },
  ];

  const urls = [
    ...staticPages.map(
      ({ path, lastmod }) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>weekly</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`
    ),

    ...posts.map(
      (p) => `
  <url>
    <loc>${SITE_URL}/posts/${p.slug}</loc>
    ${isoDate(p.date) ? `<lastmod>${isoDate(p.date)}</lastmod>` : ""}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

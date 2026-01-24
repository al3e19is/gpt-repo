import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";

const SITE_URL = "https://example.com"; // 之後換你真 domain
const SITE_TITLE = "INTP 想知的事";
const SITE_DESCRIPTION = "記錄一啲真正想搞清楚嘅事：技術、金錢、生活方式與注意力。";

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toRfc2822(dateStr?: string) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return d.toUTCString(); // RFC 2822 enough for RSS pubDate
}

function htmlToText(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET() {
  const posts = await getAllPostsMeta();

  const itemsXml = await Promise.all(
    posts.slice(0, 50).map(async (p) => {
      const link = `${SITE_URL}/posts/${p.slug}`;
      const guid = link;

      // description 優先用 front-matter description，無就用內容頭 200 字
      let description = p.description?.trim();
      if (!description) {
        const full = await getPostBySlug(p.slug);
        if (full?.contentHtml) {
          description = htmlToText(full.contentHtml).slice(0, 200);
        }
      }
      description = description || "（無摘要）";

      const pubDate = toRfc2822(p.date) ?? new Date().toUTCString();

      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(guid)}</guid>
      <pubDate>${escapeXml(pubDate)}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
  );

  const lastBuildDate = new Date().toUTCString();

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>zh-HK</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
${itemsXml.join("\n")}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

const SITE_URL = "https://intp-gpt-to-know.netlify.app/"; 
// ⛔ 之後換成你真實 domain，例如 https://intp-things.com

export async function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

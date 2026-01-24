export async function GET() {
  return new Response("category ping OK", {
    headers: { "Content-Type": "text/plain" },
  });
}

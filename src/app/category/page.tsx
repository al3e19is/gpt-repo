import Link from "next/link";
import { getAllPostsMeta, groupByCategory } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";

export default async function CategoryPage() {
  const allPosts = await getAllPostsMeta();
  const grouped = groupByCategory(allPosts);
  const entries = Object.entries(grouped) as [string, PostMeta[]][];

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold" style={{ color: "var(--fg)" }}>分類</h1>

      {entries.map(([cat, posts]) => (
        <section key={cat}>
          <div className="flex items-baseline justify-between mb-3">
            <Link
              href={`/category/${encodeURIComponent(cat)}`}
              className="text-lg font-bold text-accent hover:underline"
            >
              {cat}
            </Link>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {posts.length} 篇
            </span>
          </div>

          <div style={{ borderTop: "1px solid var(--border)" }}>
            {posts.slice(0, 4).map((p) => (
              <article
                key={p.slug}
                className="py-3 group"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-2 text-xs mb-1" style={{ color: "var(--muted)" }}>
                  {p.date && <time>{p.date}</time>}
                  <span className="ml-auto">{p.readingTime} min</span>
                </div>
                <Link href={`/posts/${p.slug}`}>
                  <h2
                    className="text-sm font-medium group-hover:text-accent transition-colors leading-snug"
                    style={{ color: "var(--fg)" }}
                  >
                    {p.title}
                  </h2>
                </Link>
              </article>
            ))}
          </div>

          {posts.length > 4 && (
            <div className="mt-2 text-right">
              <Link
                href={`/category/${encodeURIComponent(cat)}`}
                className="text-xs text-accent hover:underline"
              >
                查看全部 {posts.length} 篇 →
              </Link>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

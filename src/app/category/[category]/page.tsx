import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const normalized = decodeURIComponent(category).trim().toLowerCase();

  const posts = (await getAllPostsMeta()).filter(
    (p) => (p.category ?? "").trim().toLowerCase() === normalized
  );

  return (
    <div>
      <div className="mb-6">
        <Link href="/category" className="text-xs text-accent hover:underline">
          ← 全部分類
        </Link>
        <h1 className="text-2xl font-bold mt-2" style={{ color: "var(--fg)" }}>
          {decodeURIComponent(category)}
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          {posts.length} 篇文章
        </p>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>呢個分類暫時未有文章。</p>
      ) : (
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {posts.map((p) => (
            <article
              key={p.slug}
              className="py-4 group"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2 mb-1.5 text-xs" style={{ color: "var(--muted)" }}>
                {p.date && <time>{p.date}</time>}
                <span className="ml-auto">{p.readingTime} min</span>
              </div>
              <Link href={`/posts/${p.slug}`}>
                <h2
                  className="font-semibold group-hover:text-accent transition-colors leading-snug"
                  style={{ color: "var(--fg)" }}
                >
                  {p.title}
                </h2>
                {p.description && (
                  <p className="mt-0.5 text-sm line-clamp-2" style={{ color: "var(--muted)" }}>
                    {p.description}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export default async function PostsPage() {
  const posts = await getAllPostsMeta();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--fg)" }}>
        全部文章
      </h1>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {posts.map((p) => (
          <article
            key={p.slug}
            className="py-4 group"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div
              className="flex items-center gap-2 mb-1.5 text-xs"
              style={{ color: "var(--muted)" }}
            >
              {p.date && <time>{p.date}</time>}
              {p.category && (
                <span className="px-2 py-0.5 rounded-full border border-accent/30 text-accent">
                  {p.category}
                </span>
              )}
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
    </div>
  );
}

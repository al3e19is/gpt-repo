import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

type Props = {
  currentSlug: string;
  posts: PostMeta[]; // ordered by chapter (slug asc)
};

export default function ChapterNav({ currentSlug, posts }: Props) {
  const currentIdx = posts.findIndex((p) => p.slug === currentSlug);
  const prev = currentIdx > 0 ? posts[currentIdx - 1] : null;
  const next = currentIdx < posts.length - 1 ? posts[currentIdx + 1] : null;

  return (
    <nav
      className="mb-8"
      style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
    >
      {/* Header row */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "0.6rem",
            color: "var(--text-2)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          章節導覽
        </span>
        <span style={{ fontSize: "0.72rem", color: "var(--text-2)" }}>
          · {posts.length} 章
        </span>
      </div>

      {/* Chapter list */}
      <div>
        {posts.map((p, i) => {
          const isCurrent = p.slug === currentSlug;
          return (
            <Link
              key={p.slug}
              href={`/posts/${p.slug}`}
              aria-current={isCurrent ? "page" : undefined}
              className="chapter-link flex items-center gap-4 px-5 py-3"
              style={{
                borderBottom:
                  i < posts.length - 1 ? "1px solid var(--border)" : undefined,
                background: isCurrent ? "var(--surface2)" : undefined,
                pointerEvents: isCurrent ? "none" : undefined,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {/* Chapter number */}
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.6rem",
                  color: isCurrent ? "var(--accent)" : "var(--text-2)",
                  flexShrink: 0,
                  width: "1.8rem",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Chapter title */}
              <span
                className="flex-1"
                style={{
                  fontSize: "0.88rem",
                  color: isCurrent ? "var(--accent)" : "var(--text-1)",
                  lineHeight: 1.4,
                }}
              >
                {p.title}
              </span>

              {/* Current indicator */}
              {isCurrent && (
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.6rem",
                    color: "var(--text-2)",
                    flexShrink: 0,
                  }}
                >
                  ◀ 目前
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Prev / Next bar */}
      {(prev || next) && (
        <div className="flex" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex-1">
            {prev && (
              <Link
                href={`/posts/${prev.slug}`}
                className="chapter-link flex items-center gap-2 px-5 py-3"
                style={{
                  textDecoration: "none",
                  borderRight: "1px solid var(--border)",
                  color: "var(--text-2)",
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                }}
              >
                ← 上一章
              </Link>
            )}
          </div>
          <div className="flex-1">
            {next && (
              <Link
                href={`/posts/${next.slug}`}
                className="chapter-link flex items-center justify-end gap-2 px-5 py-3"
                style={{
                  textDecoration: "none",
                  color: "var(--text-2)",
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                }}
              >
                下一章 →
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

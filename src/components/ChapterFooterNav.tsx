import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

type Props = {
  currentSlug: string;
  posts: PostMeta[]; // ordered by chapter (slug asc)
};

export default function ChapterFooterNav({ currentSlug, posts }: Props) {
  const idx = posts.findIndex((p) => p.slug === currentSlug);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;

  // Both null only if single-chapter series — shouldn't happen, but guard anyway
  if (!prev && !next) return null;

  return (
    <div
      className="flex mt-12"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* ── 上一章 ── */}
      <div className="flex-1" style={{ borderRight: "1px solid var(--border)" }}>
        {prev && (
          <Link
            href={`/posts/${prev.slug}`}
            className="chapter-link flex flex-col gap-1 px-5 py-4"
            style={{ textDecoration: "none", height: "100%", display: "flex" }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "0.6rem",
                color: "var(--text-3)",
                letterSpacing: "0.12em",
              }}
            >
              ← 上一章
            </span>
            <span style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.4 }}>
              {prev.title}
            </span>
          </Link>
        )}
      </div>

      {/* ── 下一章 ── */}
      <div className="flex-1">
        {next && (
          <Link
            href={`/posts/${next.slug}`}
            className="chapter-link flex flex-col items-end gap-1 px-5 py-4"
            style={{ textDecoration: "none", height: "100%", display: "flex" }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "0.6rem",
                color: "var(--text-3)",
                letterSpacing: "0.12em",
              }}
            >
              下一章 →
            </span>
            <span
              style={{
                fontSize: "0.88rem",
                color: "var(--text-2)",
                lineHeight: 1.4,
                textAlign: "right",
              }}
            >
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

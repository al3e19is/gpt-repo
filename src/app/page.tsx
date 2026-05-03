import Link from "next/link";
import { getAllPostsMeta, getBanner, getDailyPick } from "@/lib/posts";

export const dynamic = "force-dynamic";

const QUESTIONS = [
  { num: "01", text: "直立人第一次用火，是意外還是刻意？", cat: "人類進化" },
  { num: "02", text: "為什麼文明都傾向在河流旁邊出現？地理決定論有多少說服力？", cat: "世界文明" },
  { num: "03", text: "語言是何時出現的？有沒有可能永遠無法知道？", cat: "語言學" },
  { num: "04", text: "量子力學和佛教的「空」，真的有關聯還是只是比喻？", cat: "物理 · 哲學" },
  { num: "05", text: "K-Pop 的工業模式，會輸出到其他文化嗎？", cat: "音樂 · 文化" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-4 mb-6"
      style={{
        color: "var(--text-3)",
        fontFamily: "monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      {children}
      <div className="flex-1" style={{ height: 1, background: "var(--border)" }} />
    </div>
  );
}

export default async function HomePage() {
  const posts = await getAllPostsMeta();
  const featured = getDailyPick(posts);
  const gridPosts = posts.filter((p) => p.slug !== featured.slug).slice(0, 6);

  return (
    <div>
      {/* ── FEATURED ── */}
      <section className="py-10">
        <SectionLabel>精選文章</SectionLabel>

        <Link
          href={`/posts/${featured.slug}`}
          className="block group relative overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 2,
              background: "linear-gradient(to right, var(--accent), transparent)",
              zIndex: 1,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative" style={{ background: "var(--surface2)", minHeight: 260 }}>
              <img
                src={getBanner(featured)}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col" style={{ padding: "2.5rem", gap: "1rem" }}>
              <div className="flex items-center gap-4">
                {featured.category && (
                  <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {featured.category}
                  </span>
                )}
                <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--text-3)" }}>
                  {featured.readingTime} min read
                </span>
              </div>

              <h2
                className="flex-1"
                style={{ fontSize: "1.5rem", fontWeight: 300, lineHeight: 1.35, color: "var(--text-1)" }}
              >
                {featured.title}
              </h2>

              {featured.description && (
                <p style={{ fontSize: "0.88rem", color: "var(--text-2)", lineHeight: 1.8 }}>
                  {featured.description}
                </p>
              )}

              <div
                className="flex items-center justify-between"
                style={{ paddingTop: "1.2rem", borderTop: "1px solid var(--border)", marginTop: "auto" }}
              >
                <span style={{ fontSize: "0.8rem", color: "var(--text-2)" }}>今日精選</span>
                {featured.date && (
                  <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--text-3)" }}>
                    {featured.date}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* ── ARTICLES GRID ── */}
      <section className="pb-10">
        <SectionLabel>最新文章</SectionLabel>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "var(--border)" }}
        >
          {gridPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/posts/${p.slug}`}
              className="card-hover flex flex-col"
              style={{
                background: "var(--bg)",
                padding: "1.8rem",
                gap: "0.9rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="flex items-center justify-between">
                {p.category ? (
                  <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--accent-dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {p.category}
                  </span>
                ) : <span />}
                <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--text-3)" }}>
                  {p.readingTime} min
                </span>
              </div>

              <h3
                className="flex-1"
                style={{ fontSize: "1rem", lineHeight: 1.5, color: "var(--text-1)" }}
              >
                {p.title}
              </h3>

              {p.description && (
                <p className="line-clamp-2" style={{ fontSize: "0.82rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  {p.description}
                </p>
              )}

              <div
                className="flex justify-end"
                style={{ paddingTop: "0.9rem", borderTop: "1px solid var(--border)", marginTop: "auto" }}
              >
                {p.date && (
                  <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--text-3)" }}>
                    {p.date}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center pt-10">
          <Link href="/posts" className="view-all-link">
            查看全部文章 →
          </Link>
        </div>
      </section>

      {/* ── UNSOLVED QUESTIONS ── */}
      <section className="py-16" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionLabel>未解之謎</SectionLabel>

        <div>
          {QUESTIONS.map((q) => (
            <div
              key={q.num}
              className="flex items-baseline gap-8 py-5 transition-all hover:pl-2 cursor-default"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--text-3)", flexShrink: 0, width: "1.5rem" }}>
                {q.num}
              </span>
              <p style={{ fontSize: "0.95rem", color: "var(--text-1)", lineHeight: 1.5, flex: 1 }}>
                {q.text}
              </p>
              <span className="hidden sm:block" style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "var(--text-3)", flexShrink: 0 }}>
                {q.cat}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

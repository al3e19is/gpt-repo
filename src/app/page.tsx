import Link from "next/link";
import { getAllPostsMeta, getBanner, getDailyPick } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getAllPostsMeta();
  const todaysPick = getDailyPick(posts);
  const recentPosts = posts.slice(0, 8);

  return (
    <div className="space-y-12">

      {/* 每日一文 */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          今日推薦
        </p>
        <Link
          href={`/posts/${todaysPick.slug}`}
          className="group block relative overflow-hidden rounded-2xl"
        >
          <img
            src={getBanner(todaysPick)}
            alt={todaysPick.title}
            className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {todaysPick.category && (
              <span className="text-xs uppercase tracking-wider opacity-60 mb-1 block">
                {todaysPick.category}
              </span>
            )}
            <h2 className="text-xl font-bold leading-snug mb-1">{todaysPick.title}</h2>
            {todaysPick.description && (
              <p className="text-sm opacity-70 line-clamp-2">{todaysPick.description}</p>
            )}
            <p className="text-xs opacity-50 mt-2">
              {todaysPick.date} · {todaysPick.readingTime} min read
            </p>
          </div>
        </Link>
      </section>

      {/* 最新文章 */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>
          最新文章
        </p>
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {recentPosts.map((p) => (
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
                <h3
                  className="font-semibold group-hover:text-accent transition-colors leading-snug"
                  style={{ color: "var(--fg)" }}
                >
                  {p.title}
                </h3>
                {p.description && (
                  <p className="mt-0.5 text-sm line-clamp-1" style={{ color: "var(--muted)" }}>
                    {p.description}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-5 text-right">
          <Link href="/posts" className="text-sm text-accent hover:underline">
            查看全部文章 →
          </Link>
        </div>
      </section>

    </div>
  );
}

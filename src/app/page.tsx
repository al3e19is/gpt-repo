import Link from "next/link";
import { getAllPostsMeta, groupByCategory } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts"

function getBanner(post: PostMeta | undefined) {
  if (!post) return "/banners/series/default.jpg"

  if (post.series)
    return `/banners/series/${post.series}.jpg`

  return "/banners/series/default.jpg"
}


export default async function HomePage() {
  const posts = await getAllPostsMeta();

  // 你想固定順序就放呢度
  const order = ["finance", "dev", "history"];

  // grouped: Record<string, PostMeta[]>
  const grouped = groupByCategory(posts);

  // 依 order 排好（冇寫入 order 的分類會排到最後）
  const orderedEntries = [
    ...order.map((cat) => [cat, grouped[cat] ?? []] as const),
    ...Object.entries(grouped).filter(([cat]) => !order.includes(cat)),
  ].filter(([, arr]) => arr.length > 0); // 無文章就唔 show

  const latestPost = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];


  return (
    <main className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>INTP 想知的事</h1>
      <img
        src="/images/banner01.jpg"
        alt="文章 Banner"
      />


      <p>
        雖然現有 AI 的大型語言模型 (LLM) 很強大，<br/>但是GOOGLE／GROK／CHATGPT整理不了用家問過什麼內容，<br/>所以我做了這個。
      </p>
      {latestPost && (
        <section className="not-prose mb-8">
          <div className="text-3xl font-bold leading-tight mt-2 mb-6">
            <Link href={`/posts/${latestPost.slug}`}>讀最新文章</Link>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={getBanner(latestPost)}
              alt={latestPost.title}
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-sm opacity-90 mb-2">{latestPost.date}</p>
              <h2 className="text-3xl font-bold leading-tight">
                <Link href={`/posts/${latestPost.slug}`} className="no-underline text-white">
                  {latestPost.title}
                </Link>
              </h2>

              {/* 如果你有 excerpt / description 就打開呢行 */}
              {/* <p className="mt-2 opacity-90">{latestPost.excerpt}</p> */}
            </div>
          </div>


        </section>
      )}

      {orderedEntries.map(([cat, catPosts]) => (
        <section key={cat}  className="border-l-4 border-neutral-400 dark:border-neutral-600 pl-4 mb-6">
          <h3>{cat}</h3>

          <ul>
            {catPosts.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link href={`/posts/${p.slug}`}>{p.title}</Link><br/>
              </li>
            ))}
          </ul>

          <p>
            <Link href={`/category/${cat}`}>→ 查看 {cat} 全部文章</Link>
          </p>
        </section>
      ))}

    </main>
  );
}

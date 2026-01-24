import Link from "next/link";
import { getAllPostsMeta, groupByCategory } from "@/lib/posts";

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

  return (
    <main className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>INTP 想知的事</h1>

      <p>
        呢個 site 記錄一啲我真正想搞清楚嘅問題：技術、金錢、生活方式，
        同埋點樣喺資訊爆炸嘅年代保住注意力。
      </p>

      <h2>按分類：每類最新 5 篇</h2>

      {orderedEntries.map(([cat, catPosts]) => (
        <section key={cat}>
          <h3>{cat}</h3>

          <ul>
            {catPosts.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link href={`/posts/${p.slug}`}>{p.title}</Link><br/>
                <span className="text-sm text-gray-500"> · {p.readingTime} min</span>
              </li>
            ))}
          </ul>

          <p>
            <Link href={`/category/${cat}`}>→ 查看 {cat} 全部文章</Link>
          </p>
        </section>
      ))}

      <p>
        <Link href="/category">→ 按分類瀏覽文章</Link>
      </p>

      <p>
        <Link href="/posts">→ 查看全部文章</Link>
      </p>
    </main>
  );
}

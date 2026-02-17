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
      <img
        src="/images/banner01.jpg"
        alt="文章 Banner"
      />
      <p>
        雖然現有 AI 的大型語言模型 (LLM) 很強大，<br/>但是GOOGLE／GROK／CHATGPT整理不了用家問過什麼內容，<br/>所以我做了這個。
      </p>

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

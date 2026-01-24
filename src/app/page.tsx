import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPostsMeta();

  return (
    <main className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>INTP 想知的事</h1>

      <p>
        呢個 site 記錄一啲我真正想搞清楚嘅問題：技術、金錢、生活方式，
        同埋點樣喺資訊爆炸嘅年代保住注意力。
      </p>

      <h2>最新文章</h2>

      <ul>
        {posts.slice(0, 5).map((p) => (
          <li key={p.slug}>
            <Link href={`/posts/${p.slug}`}>{p.title}</Link>
            <span className="text-sm text-gray-500">
              {" "}
              · {p.readingTime} min
            </span>
          </li>
        ))}
      </ul>

      <p>
        <Link href="/posts">→ 查看全部文章</Link>
      </p>
    </main>
  );
}

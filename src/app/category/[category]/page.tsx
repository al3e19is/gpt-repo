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
    <main className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>分類：{category}</h1>

      {posts.length === 0 ? (
        <>
          <p className="text-gray-600 dark:text-gray-300">
            呢個分類暫時未有文章。（提示：請檢查 md front-matter 的 category 係咪同 URL 一樣）
          </p>
          <p>
            <Link href="/category">→ 返回分類列表</Link>
          </p>
        </>
      ) : (
        <ul>
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/posts/${p.slug}`}>{p.title}</Link>
              <span className="text-sm text-gray-500">
                {" "}
                · {p.date} · {p.readingTime} min
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

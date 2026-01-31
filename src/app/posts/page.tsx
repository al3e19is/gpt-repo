import Link from "next/link";
import { getAllCategories, getAllPostsMeta } from "@/lib/posts";

export default async function PostsPage() {
  const posts = await getAllPostsMeta();
  const categories = await getAllCategories();
  return (
    <main className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>全部文章</h1>

      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/posts/${p.slug}`}>{p.title}</Link>
            <span className="text-sm text-gray-500">
              {" "} · {p.date} · {p.readingTime} min
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}

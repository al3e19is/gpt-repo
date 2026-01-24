// app/page.tsx 或 app/categories/page.tsx
import { getAllPostsMeta, groupByCategory } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";

export default async function CategoryPage() {
  const allPosts = await getAllPostsMeta();
  const grouped = groupByCategory(allPosts);
  const entries = Object.entries(grouped) as [string, PostMeta[]][];

    return (
        <main className="space-y-10">
            
        {entries.map(([cat, posts]) => (
        <section key={cat}>
            <h2 className="text-2xl font-bold mb-3">{cat}</h2>
            <ul className="space-y-1">
            {posts.map((post) => (
                <li key={post.slug}>
                <a href={`/posts/${post.slug}`}>{post.title}</a>
                </li>
            ))}
            </ul>
        </section>
        ))}
        </main>
    );
}

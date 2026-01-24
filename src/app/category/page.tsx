// app/page.tsx 或 app/categories/page.tsx
import { getAllPosts } from "@/lib/posts";
import { groupByCategory } from "@/lib/posts";

export default async function Page() {
  const posts = await getAllPosts();
  const grouped = groupByCategory(posts);

  return (
    <main className="space-y-10">
      {Object.entries(grouped).map(([category, posts]) => (
        <section key={category}>
          <h2 className="text-2xl font-bold mb-3">
            {category}
          </h2>

          <ul className="space-y-1">
            {posts.map(post => (
              <li key={post.slug}>
                <a
                  href={`/posts/${post.slug}`}
                  className="hover:underline"
                >
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

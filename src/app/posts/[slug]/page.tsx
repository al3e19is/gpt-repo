import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

type Props = {
  // ✅ Next.js 15+：params 係 Promise
  params: Promise<{ slug: string }>;
};

// 1) Static generate all /posts/[slug] at build time
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 2) SEO Metadata per post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // ✅ 先 await
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
      robots: { index: false, follow: false },
    };
  }

  const title = post.title;
  const description =
    post.description ||
    (post.contentHtml
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160) || "文章");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params; // ✅ 先 await
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <header className="mb-6">
        <h1 className="mb-2">{post.title}</h1>

        <div className="text-sm text-gray-500">
          {post.date ? <time dateTime={post.date}>{post.date}</time> : null}
          {post.date ? " · " : null}
          {post.readingTime} min read
          {post.category ? ` · ${post.category}` : null}
        </div>

        {post.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded border border-gray-300/40 dark:border-gray-700/60"
              >
                #{t}
              </span>
            ))}
          </div>
        ) : null}

        {post.description ? (
          <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
            {post.description}
          </p>
        ) : null}
      </header>

      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
import fs from "fs/promises";
import path from "path";
import { remark } from "remark";
import html from "remark-html"; 
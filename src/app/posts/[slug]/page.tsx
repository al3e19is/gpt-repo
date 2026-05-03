import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, getBanner } from "@/lib/posts";
import RandomPostButton from "@/components/RandomPostButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
    openGraph: { title, description, type: "article" },
    twitter: { card: "summary", title, description },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const allSlugs = (await getPostSlugs()).filter((s) => s !== slug);

  return (
    <article>
      {/* Banner */}
      <div className="overflow-hidden rounded-xl mb-6">
        <img
          src={getBanner(post)}
          alt={post.title}
          className="w-full h-[260px] object-cover"
        />
      </div>

      {/* Header */}
      <header className="mb-8">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs" style={{ color: "var(--muted)" }}>
          {post.category && (
            <span className="px-2 py-0.5 rounded-full border border-accent/30 text-accent">
              {post.category}
            </span>
          )}
          {post.date && <time dateTime={post.date}>{post.date}</time>}
          <span>{post.readingTime} min read</span>
        </div>

        <h1 className="text-2xl font-bold leading-snug mb-3" style={{ color: "var(--fg)" }}>
          {post.title}
        </h1>

        {post.description && (
          <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            {post.description}
          </p>
        )}

        {post.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  background: "var(--border)",
                  color: "var(--muted)",
                }}
              >
                #{t}
              </span>
            ))}
          </div>
        ) : null}

        <hr className="mt-6" style={{ borderColor: "var(--border)" }} />
      </header>

      {/* Content */}
      <div
        className="prose prose-neutral dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <RandomPostButton slugs={allSlugs} />
    </article>
  );
}

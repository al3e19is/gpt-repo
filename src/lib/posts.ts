// lib/posts.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html"
import remarkGfm from "remark-gfm";
// import type { PostMeta } from "@/lib/posts"; // 如果同檔就唔洗

/**
 * LOCKED CONTENT PATH (SSOT)
 * 所有文章都放喺 /content/posts/*.md
 */
const POSTS_DIR = path.join(process.cwd(),  "content", "posts");

/**
 * Front-matter schema（你 md 檔頭 YAML）
 */
export type PostFrontMatter = {
  title: string;
  date?: string; // 建議用 "YYYY-MM-DD"
  description?: string;
  tags?: string[];
  category?: string;
  series?: string; // ✅ 如果你有系列，就加呢行 

};

/**
 * Post = 單篇文章完整模型（俾 app/posts/[slug]/page.tsx 用）
 * ✅ 你嘅 contract（LOCK）
 */
export type Post = {
  slug: string;
  title: string;
  date: string;
  readingTime: number;
  contentHtml: string;
  tags?: string[];
  category?: string;
  description?: string;
  series?: string; // ✅ 如果你有系列，就加呢行
};

/**
 * PostMeta = 列表頁用（唔含 contentHtml）
 * /posts list、related posts、sitemap/rss 都可以用
 */
export type PostMeta = Omit<Post, "contentHtml">;

function estimateReadingTimeMinutes(text: string): number {
  // 英文：200 words/min
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  // 中文/日文/韓文：用 CJK 字估，約 400 字/分鐘（粗略但穩）
  const cjkChars = (text.match(/[\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF]/g) ?? []).length;

  const minsByWords = words / 200;
  const minsByCJK = cjkChars / 400;

  const mins = Math.max(minsByWords, minsByCJK);
  return Math.max(1, Math.round(mins));
}


export async function markdownToHtml(markdown: string): Promise<string> {
  // sanitize: false = 保留 markdown 入面嘅原生 HTML
  const processed = await remark()
    .use(remarkGfm)                 // ✅ 開啟 GFM：table / task list / strikethrough
    .use(html, { sanitize: false })
    .process(markdown);

  return processed.toString();
}

function normalizeString(x: unknown): string | undefined {
  if (typeof x !== "string") return undefined;
  const s = x.trim();
  return s.length ? s : undefined;
}

function normalizeStringArray(x: unknown): string[] | undefined {
  if (!Array.isArray(x)) return undefined;
  const arr = x.map(String).map((s) => s.trim()).filter(Boolean);
  return arr.length ? arr : undefined;
}

async function readRawBySlug(slug: string): Promise<string | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

/**
 * 取得全部 slug（即檔名）
 */
export async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(POSTS_DIR);
  return files
    .filter((f) => f.toLowerCase().endsWith(".md"))
    .map((f) => f.replace(/\.md$/i, ""));
}

/**
 * 讀一篇文章：slug -> Post
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const raw = await readRawBySlug(slug);
  if (!raw) return null;

  const { data, content } = matter(raw);
  const fm = data as Partial<PostFrontMatter>;

  const title = normalizeString(fm.title);
  if (!title) return null;

  const date = normalizeString(fm.date) ?? "";
  const description = normalizeString(fm.description);
  const category = normalizeString(fm.category);
  const tags = normalizeStringArray(fm.tags);
  const series = normalizeString(fm.series);
  const contentHtml = await markdownToHtml(content);
  const readingTime = estimateReadingTimeMinutes(content);

  return {
    slug,
    title,
    date,
    readingTime,
    contentHtml,
    tags,
    category,
    description,
    series,
  };
}

/**
 * 取所有文章 metadata（唔含 contentHtml）
 * 用於 /posts list、related、sitemap/rss
 */
export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const slugs = await getPostSlugs();

  const items = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readRawBySlug(slug);
      if (!raw) return null;

      const { data, content } = matter(raw);
      const fm = data as Partial<PostFrontMatter>;

      const title = normalizeString(fm.title);
      if (!title) return null;

      return {
        slug,
        title,
        date: normalizeString(fm.date) ?? "",
        readingTime: estimateReadingTimeMinutes(content),
        description: normalizeString(fm.description),
        tags: normalizeStringArray(fm.tags),
        category: normalizeString(fm.category),
      } satisfies PostMeta;
    })
  );

  // 建議你 date 用 ISO "YYYY-MM-DD"，咁呢個排序就會準
  return items
    .filter(Boolean)
    .sort((a, b) => (b!.date || "").localeCompare(a!.date || "")) as PostMeta[];
}


export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPostsMeta();
  const set = new Set<string>();

  for (const p of posts) {
    if (p.category) set.add(p.category);
  }

  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export async function getPostsByCategory(category: string): Promise<PostMeta[]> {
  const posts = await getAllPostsMeta();
  return posts.filter((p) => p.category === category);
}




export async function getAllPosts() {
  const files = await fs.readdir(POSTS_DIR);

  const posts = await Promise.all(
    files
      .filter(f => f.endsWith(".md") || f.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(
          path.join(POSTS_DIR, file),
          "utf-8"
        );
        const { data } = matter(raw);

        return {
          slug: file.replace(/\.mdx?$/, ""),
          title: String(data.title ?? ""),
          date: String(data.date ?? ""),
          category: String(data.category ?? "uncategorized"),
        };
      })
  );

  return posts.sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
}
export function groupByCategory(posts: PostMeta[]): Record<string, PostMeta[]> {
  const map: Record<string, PostMeta[]> = {};

  for (const post of posts) {
    const cat = post.category ?? "uncategorized";
    (map[cat] ??= []).push(post);
  }

  return map;
}


export function getBanner(post: unknown) {
  if (typeof post === "object" && post !== null && "banner" in post) {
    const p = post as { banner?: string };
    return p.banner ?? "/images/banners/default.jpg";
  }
  return "/images/banners/default.jpg";
}
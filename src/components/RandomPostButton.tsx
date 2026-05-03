"use client";

import { useRouter } from "next/navigation";

export default function RandomPostButton({ slugs }: { slugs: string[] }) {
  const router = useRouter();

  function goRandom() {
    if (!slugs.length) return;
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/posts/${slug}`);
  }

  return (
    <button
      onClick={goRandom}
      className="mt-12 w-full rounded-xl py-4 text-sm font-medium card-hover transition-colors cursor-pointer"
      style={{ border: "1px solid var(--border)", color: "var(--text-2)" }}
    >
      隨機文章 →
    </button>
  );
}

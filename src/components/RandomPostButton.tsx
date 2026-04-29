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
      className="mt-12 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 py-4 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
    >
      隨機文章 →
    </button>
  );
}

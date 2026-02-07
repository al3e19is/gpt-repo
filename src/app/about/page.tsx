import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · INTP 想知的事",
  description: "關於 INTP 想知的事：這個網站在做什麼，以及為什麼存在。",
};

export default function AboutTagPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>關於這個站</h1>
        <img
            src="/images/banner02.png"
            alt="文章 Banner"
        />
        <p>
          <strong>INTP 想知的事</strong> 是一個把「問過、想過、查過」的問題，
          系統化整理成文章的地方。內容主要圍繞技術、歷史、金錢、
          還有一些不太適合放在社交平台、但值得慢慢想清楚的問題。
        </p>

        <p>
          這裡的文章多半不是即時新聞，也不是立場輸出，
          而是嘗試把零散的疑問，整理成可以重複閱讀的知識。
        </p>

        <p>
          如果你曾經有過「呢個問題好似冇人一次過講清楚」的感覺，
          咁你大概會明白呢個站點存在的原因。
        </p>

        <hr />

        <p className="text-sm text-gray-500">
          本站內容以 Markdown 撰寫，使用 Next.js 生成，
          目標係可長期保存、可搜尋、可引用。
        </p>
      </article>
    </main>
  );
}

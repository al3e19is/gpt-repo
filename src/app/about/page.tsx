import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於這個站",
  description: "INTP 想知的事：把「問過、想過、查過」的問題，系統化整理成文章的地方。",
};

export default function AboutPage() {
  return (
    <div>
      {/* Banner */}
      <div className="overflow-hidden rounded-xl mb-10">
        <img
          src="/images/banner02.jpg"
          alt="關於這個站"
          className="w-full h-[260px] object-cover"
        />
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: "1.6rem",
          fontWeight: 300,
          color: "var(--text-1)",
          lineHeight: 1.4,
          marginBottom: "2.5rem",
        }}
      >
        關於這個站
      </h1>

      {/* Body */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.6rem",
          fontSize: "0.97rem",
          lineHeight: 2,
          color: "var(--text-1)",
          maxWidth: "62ch",
        }}
      >
        <p>
          <strong style={{ color: "var(--accent)", fontWeight: 500 }}>
            INTP 想知的事
          </strong>{" "}
          是一個把「問過、想過、查過」的問題，
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
      </div>

      {/* Footer note */}
      <div
        style={{
          marginTop: "3rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--border)",
          fontFamily: "monospace",
          fontSize: "0.68rem",
          color: "var(--text-2)",
          letterSpacing: "0.05em",
          lineHeight: 1.8,
        }}
      >
        本站內容以 Markdown 撰寫，使用 Next.js 生成，
        目標係可長期保存、可搜尋、可引用。
      </div>
    </div>
  );
}

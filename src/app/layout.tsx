import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "INTP 想知的事",
    template: "%s · INTP 想知的事",
  },
  description: "記錄一啲真正想搞清楚嘅事：技術、金錢、生活方式與注意力。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK">
      <body style={{ background: "var(--bg)", color: "var(--fg)" }}>
        {/* Accent stripe */}
        <div className="h-[3px] bg-accent" />

        <header className="border-b" style={{ borderColor: "var(--border)" }}>
          <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-bold tracking-tight hover:text-accent transition-colors"
              style={{ color: "var(--fg)" }}
            >
              INTP 想知的事
            </Link>

            <nav className="flex items-center gap-5 text-sm" style={{ color: "var(--muted)" }}>
              <Link href="/posts" className="hover:text-accent transition-colors">文章</Link>
              <Link href="/category" className="hover:text-accent transition-colors">分類</Link>
              <Link href="/about" className="hover:text-accent transition-colors">關於</Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-10">
          {children}
        </main>

        <footer className="mt-16 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="mx-auto max-w-3xl px-4 py-6 text-sm" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} INTP 想知的事
          </div>
        </footer>
      </body>
    </html>
  );
}

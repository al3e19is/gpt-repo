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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-HK">
      <body className="bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
            {/* Site title */}
            <Link href="/" className="text-lg font-semibold tracking-tight">
              INTP 想知的事
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/posts"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                文章
              </Link>

              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                關於
              </Link>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-3xl px-4 py-8">
          {children}
        </main>

        {/* Footer（先留位，之後再加） */}
        <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-3xl px-4 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} INTP 想知的事
          </div>
        </footer>
      </body>
    </html>
  );
}

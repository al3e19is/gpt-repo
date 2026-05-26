"use client";
import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export type SeriesGroup = {
  series: string;
  title: string;
  posts: PostMeta[];
};

type Props = {
  knowledgePosts: PostMeta[];
  novelGroups: SeriesGroup[];
};

type Tab = "knowledge" | "novel";

export default function HomeTabs({ knowledgePosts, novelGroups }: Props) {
  const [tab, setTab] = useState<Tab>("knowledge");

  return (
    <div>
      {/* ── TAB SWITCHER ── */}
      <div
        className="flex mb-8"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {(
          [
            { id: "knowledge", label: "知識向" },
            { id: "novel",     label: "小說向" },
          ] as { id: Tab; label: string }[]
        ).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "0.7rem 1.6rem",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: tab === id ? "var(--text-1)" : "var(--text-3)",
              borderBottom:
                tab === id
                  ? "2px solid var(--accent)"
                  : "2px solid transparent",
              marginBottom: "-1px",
              transition: "color 0.15s, border-color 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── 知識向 GRID ── */}
      {tab === "knowledge" && (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ background: "var(--border)" }}
          >
            {knowledgePosts.map((p) => (
              <Link
                key={p.slug}
                href={`/posts/${p.slug}`}
                className="card-hover flex flex-col"
                style={{
                  background: "var(--bg)",
                  padding: "1.8rem",
                  gap: "0.9rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div className="flex items-center justify-between">
                  {p.category ? (
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                        color: "var(--accent-dim)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {p.category}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.6rem",
                      color: "var(--text-3)",
                    }}
                  >
                    {p.readingTime} min
                  </span>
                </div>

                <h3
                  className="flex-1"
                  style={{ fontSize: "1rem", lineHeight: 1.5, color: "var(--text-1)" }}
                >
                  {p.title}
                </h3>

                {p.description && (
                  <p
                    className="line-clamp-2"
                    style={{ fontSize: "0.82rem", color: "var(--text-2)", lineHeight: 1.7 }}
                  >
                    {p.description}
                  </p>
                )}

                <div
                  className="flex justify-end"
                  style={{
                    paddingTop: "0.9rem",
                    borderTop: "1px solid var(--border)",
                    marginTop: "auto",
                  }}
                >
                  {p.date && (
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                        color: "var(--text-3)",
                      }}
                    >
                      {p.date}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center pt-10">
            <Link href="/posts" className="view-all-link">
              查看全部文章 →
            </Link>
          </div>
        </>
      )}

      {/* ── 小說向 SERIES LIST ── */}
      {tab === "novel" && (
        <div className="flex flex-col gap-8">
          {novelGroups.map((group) => (
            <div
              key={group.series}
              style={{
                border: "1px solid var(--border)",
                background: "var(--surface)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Gold top accent */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 2,
                  background: "linear-gradient(to right, var(--accent), transparent)",
                }}
              />

              {/* Series header */}
              <div
                className="flex items-start justify-between gap-4"
                style={{ padding: "1.5rem 1.8rem", borderBottom: "1px solid var(--border)" }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.6rem",
                      color: "var(--text-3)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    小說系列
                  </p>
                  <h2
                    style={{ fontSize: "1.15rem", color: "var(--text-1)", lineHeight: 1.3 }}
                  >
                    {group.title}
                  </h2>
                </div>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.6rem",
                    color: "var(--text-3)",
                    flexShrink: 0,
                    paddingTop: "0.2rem",
                  }}
                >
                  {group.posts.length} 章
                </span>
              </div>

              {/* Chapter list */}
              <div>
                {group.posts.map((p, i) => (
                  <Link
                    key={p.slug}
                    href={`/posts/${p.slug}`}
                    className="chapter-link flex items-center gap-4"
                    style={{
                      padding: "0.9rem 1.8rem",
                      borderBottom:
                        i < group.posts.length - 1
                          ? "1px solid var(--border)"
                          : undefined,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                        color: "var(--text-3)",
                        flexShrink: 0,
                        width: "1.8rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="flex-1"
                      style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.4 }}
                    >
                      {p.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                        color: "var(--text-3)",
                        flexShrink: 0,
                      }}
                    >
                      {p.readingTime} min
                    </span>
                  </Link>
                ))}
              </div>

              {/* Start reading CTA */}
              <div
                className="flex justify-end"
                style={{ padding: "1rem 1.8rem", borderTop: "1px solid var(--border)" }}
              >
                <Link
                  href={`/posts/${group.posts[0]?.slug ?? ""}`}
                  className="view-all-link"
                >
                  從第一章開始 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

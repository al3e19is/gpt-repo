---
title: "Hello World：第一篇 INTP 想知的事"
date: "2026-01-23"
description: "用最少步驟，確認整個 markdown → HTML → /posts/[slug] routing pipeline 通咗。"
tags: ["setup", "nextjs", "blog"]
category: "dev"
---

你而家做緊嘅，其實唔係「寫一篇文」，而係驗證一條 pipeline：  
`content/posts/*.md` → `lib/posts.ts` parse → `app/posts/[slug]/page.tsx` render。

## ✅ Checkpoint

- 有 H1（由 page.tsx 顯示 title）
- 有日期與閱讀時間
- 下面內容正常 render（呢段就係 markdown）

### 一個 list

- 文章檔名 = slug
- `hello-world.md` → `/posts/hello-world`
- 成功就代表 architecture lock 住咗

> 小提示：你可以喺 markdown 直接寫 HTML，例如：<br/> 換行。

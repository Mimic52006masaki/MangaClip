# 05_TechStack.md

## フロントエンド
- Next.js + React
- TailwindCSS
- jszip（※将来的にバックアップ圧縮対応）
- clipboard.js または navigator.clipboard API

## バックエンド
- Node.js（Vercel API Routes想定）
- axios（HTML取得）
- cheerio（スクレイピング）
- OpenAI / Gemini API（SEOタイトル生成※仮定）
- DB操作ライブラリ：
  - Prisma / TypeORM / Knex.js など（Node.jsからDB操作を簡単にするORM）

## データベース
- SQLite / PostgreSQL / MySQL（個人利用ならSQLite推奨）
- テーブル：
  - MangaArticle（漫画まとめ速報用）
  - AnimeArticle（アニメまとめCH用）
- 各テーブルカラム：
  - MangaArticle：
    - id, originalTitle, generatedTitle, url, targetDate, createdAt, updatedAt, checked
  - AnimeArticle：
    - id, title, url, createdAt, updatedAt

## インフラ
- Vercel サーバーレス
- DBを永続ストレージとして利用

## 認証・認可
- 個人利用のため最小限（APIキー管理のみ）

# データ設計（簡易）

## テーブル一覧

### Article
- id
- siteType（manga / anime）
- targetDate（mangaのみ、mm/dd hh:00形式）
- originalTitle
- generatedTitle
- URL
- createdAt
- updatedAt
- ※仮定: rowIdや一意識別子をDB上で管理

## リレーション
- siteTypeごとに独立テーブルも可（例: manga_articles, anime_articles）

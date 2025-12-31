import { MangaArticle } from './database';
import db from './database';

interface ScrapedArticle {
  title: string;
  url: string;
}

/**
 * 前提:
 * - scraped[0] は最新記事
 * - scraped[last] は最古記事
 *
 * 仕様:
 * - 配列の順序は一切変更しない
 * - 古い記事から15件ずつ日付を割り当てる
 * - 最新の記事ブロックが最新日付
 * - 時間は使わず 00:00 固定
 */
export function insertScrapedArticles(
  scraped: ScrapedArticle[]
): MangaArticle[] {
  const assignedArticles: MangaArticle[] = [];

  // 1. 古い順に15件ずつブロックを作る
  const dayBlocks: ScrapedArticle[][] = [];
  for (let i = scraped.length; i > 0; i -= 15) {
    dayBlocks.push(scraped.slice(Math.max(0, i - 15), i));
  }
  // dayBlocks[0] が最古、最後が最新

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 2. 日付を割り当てる（古い → 新しい）
  dayBlocks.forEach((block, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (dayBlocks.length - 1 - index));

    block.forEach(article => {
      assignedArticles.push({
        originalTitle: article.title,
        generatedTitle: article.title,
        url: article.url,
        checked: false,
        targetDate: date.toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: 0
      });
    });
  });

  // 3. DBに挿入
  const insert = db.prepare(`
    INSERT INTO manga_articles
      (originalTitle, generatedTitle, url, checked, targetDate, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertedArticles: MangaArticle[] = [];
  for (const article of assignedArticles) {
    const result = insert.run(
      article.originalTitle,
      article.generatedTitle,
      article.url,
      article.checked ? 1 : 0,
      article.targetDate,
      article.createdAt,
      article.updatedAt
    );
    insertedArticles.push({
      ...article,
      id: result.lastInsertRowid as number
    });
  }

  return insertedArticles;
}


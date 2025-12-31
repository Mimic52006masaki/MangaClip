import db from './database';

interface ScrapedArticle {
  title: string;
  url: string;
}

function extractPostId(url: string): number {
  const match = url.match(/\/post\/(\d+)\//);
  if (!match) throw new Error(`Invalid url: ${url}`);
  return Number(match[1]);
}

export function insertScrapedArticles(scraped: ScrapedArticle[]) {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO manga_articles
      (post_id, originalTitle, generatedTitle, url, checked, targetDate, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, 0, ?, ?, ?)
  `);

  const now = new Date().toISOString();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const article of scraped) {
    insert.run(
      extractPostId(article.url),
      article.title,
      article.title,
      article.url,
      today.toISOString(),
      now,
      now
    );
  }

  // 件数制限: 300件を超えたら古い順に削除
  const deleteOld = db.prepare(`
    DELETE FROM manga_articles
    WHERE post_id < (
      SELECT post_id
      FROM manga_articles
      ORDER BY post_id DESC
      LIMIT 1 OFFSET 299
    )
  `);
  deleteOld.run();
}


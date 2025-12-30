import db from './database';
import { MangaArticle } from './database';

export function assignTargetDates(newArticles: Omit<MangaArticle, 'id' | 'createdAt' | 'updatedAt' | 'checked'>[]): Omit<MangaArticle, 'id' | 'createdAt' | 'updatedAt' | 'checked'>[] {
  // Get the latest targetDate from DB
  const latestArticle = db.prepare(`
    SELECT targetDate FROM manga_articles
    WHERE targetDate IS NOT NULL
    ORDER BY targetDate DESC
    LIMIT 1
  `).get() as { targetDate: string } | undefined;

  let latestDate: Date;

  if (latestArticle && latestArticle.targetDate) {
    latestDate = new Date(latestArticle.targetDate);
  } else {
    // If no articles, start from today 21:00
    latestDate = new Date();
    latestDate.setHours(21, 0, 0, 0);
  }

  // Assign targetDates in reverse order (newest first)
  const assignedArticles = newArticles.map(article => {
    let hour = latestDate.getHours() - 1;

    if (hour < 7) {
      // Move to previous day 21:00
      const prevDay = new Date(latestDate);
      prevDay.setDate(prevDay.getDate() - 1);
      prevDay.setHours(21, 0, 0, 0);
      latestDate = prevDay;
      hour = 21;
    }

    const targetDate = new Date(
      latestDate.getFullYear(),
      latestDate.getMonth(),
      latestDate.getDate(),
      hour, 0, 0, 0
    );

    latestDate = targetDate;

    return {
      ...article,
      targetDate: targetDate.toISOString()
    };
  });

  return assignedArticles;
}
import { MangaArticle } from './database';
import db from './database';

export function assignTargetDates(newArticles: Omit<MangaArticle, 'id' | 'createdAt' | 'updatedAt'>[]): Omit<MangaArticle, 'id' | 'createdAt' | 'updatedAt'>[] {
  console.log(`Assigning target dates for ${newArticles.length} articles`);

  // Get the latest targetDate from database
  const row = db.prepare('SELECT targetDate FROM manga_articles WHERE targetDate IS NOT NULL ORDER BY targetDate DESC LIMIT 1').get() as { targetDate: string } | undefined;
  const latestTargetDate = row?.targetDate || null;
  console.log('Latest targetDate from database:', latestTargetDate);

  let latestDate: Date;

  if (latestTargetDate) {
    latestDate = new Date(latestTargetDate);
    console.log('Using latest date from storage:', latestDate.toISOString());
  } else {
    // If no articles, start from today 21:00
    latestDate = new Date();
    latestDate.setHours(21, 0, 0, 0);
    console.log('No articles in storage, starting from today 21:00:', latestDate.toISOString());
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
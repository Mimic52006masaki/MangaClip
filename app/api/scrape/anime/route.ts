import { NextResponse } from 'next/server';
import { scrapeAnimeArticles } from '@/lib/scraper';
import db, { AnimeArticle } from '@/lib/database';

export async function POST() {
  try {
    // Scrape articles
    const scrapedArticles = await scrapeAnimeArticles();

    // Get existing URLs to check duplicates
    const existingUrls = db.prepare('SELECT url FROM anime_articles').all() as { url: string }[];
    const existingUrlSet = new Set(existingUrls.map(row => row.url));

    // Filter out duplicates
    const newArticles = scrapedArticles.filter(article => !existingUrlSet.has(article.url));

    // Insert new articles
    const insert = db.prepare(`
      INSERT INTO anime_articles (title, url)
      VALUES (?, ?)
    `);

    const insertedArticles: AnimeArticle[] = [];

    for (const article of newArticles) {
      const result = insert.run(article.title, article.url);
      const insertedArticle = db.prepare('SELECT * FROM anime_articles WHERE id = ?').get(result.lastInsertRowid) as AnimeArticle;
      insertedArticles.push(insertedArticle);
    }

    return NextResponse.json({
      success: true,
      scraped: scrapedArticles.length,
      new: newArticles.length,
      articles: insertedArticles
    });
  } catch (error) {
    console.error('Error in anime scrape:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to scrape anime articles' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const articles = db.prepare(`
      SELECT * FROM anime_articles
      ORDER BY createdAt DESC
    `).all() as AnimeArticle[];

    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error('Error fetching anime articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
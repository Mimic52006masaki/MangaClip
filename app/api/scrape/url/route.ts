import { NextResponse } from 'next/server';
import { scrapeArticlesFromUrl } from '@/lib/scraper';
import { insertScrapedArticles } from '@/lib/assignTargetDate';
import db, { MangaArticle, AnimeArticle } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { siteType, url }: { siteType: 'manga' | 'anime'; url: string } = body;

    if (!siteType || !url) {
      return NextResponse.json({ success: false, error: 'siteType and url are required' }, { status: 400 });
    }

    // Scrape articles from the URL
    const filterUrl = body.filterUrl;
    const scrapedArticles = await scrapeArticlesFromUrl(siteType, url, filterUrl);
    console.log('Scraped articles:', scrapedArticles.length);

    if (scrapedArticles.length === 0) {
      return NextResponse.json({
        success: true,
        addedArticles: []
      });
    }

    // Check for duplicates
    const tableName = siteType === 'manga' ? 'manga_articles' : 'anime_articles';
    const existingRows = db.prepare(`SELECT url FROM ${tableName}`).all() as { url: string }[];
    const existingUrls = existingRows.map(row => row.url);
    const existingUrlSet = new Set(existingUrls);

    const newArticles = scrapedArticles.filter(article => !existingUrlSet.has(article.url));
    console.log('New articles after dedup:', newArticles.length);

    if (newArticles.length === 0) {
      return NextResponse.json({
        success: true,
        addedArticles: []
      });
    }

    if (siteType === 'manga') {
      // Insert new articles with assigned target dates
      const insertedArticles = insertScrapedArticles(newArticles);

      return NextResponse.json({
        success: true,
        addedArticles: insertedArticles
      });
    } else {
      // Insert into anime_articles
      const insertStmt = db.prepare(`
        INSERT INTO anime_articles (title, url)
        VALUES (?, ?)
      `);

      const insertedArticles: AnimeArticle[] = [];

      for (const article of newArticles) {
        const result = insertStmt.run(article.title, article.url);
        const insertedArticle = db.prepare('SELECT * FROM anime_articles WHERE id = ?').get(result.lastInsertRowid) as AnimeArticle;
        insertedArticles.push(insertedArticle);
      }

      return NextResponse.json({
        success: true,
        addedArticles: insertedArticles
      });
    }
  } catch (error) {
    console.error('Error in scrape URL API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to scrape from URL' },
      { status: 500 }
    );
  }
}
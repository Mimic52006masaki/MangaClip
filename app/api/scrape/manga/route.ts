import { NextResponse } from 'next/server';
import { scrapeMangaArticles } from '@/lib/scraper';
import db from '@/lib/database';
import { MangaArticle } from '@/lib/database';
import { assignTargetDates } from '@/lib/assignTargetDate';

export async function POST() {
  try {
    // Scrape articles
    const scrapedArticles = await scrapeMangaArticles();

    // Get existing URLs to check duplicates
    const existingUrls = db.prepare('SELECT url FROM manga_articles').all() as { url: string }[];
    const existingUrlSet = new Set(existingUrls.map(row => row.url));

    // Filter out duplicates
    const newArticles = scrapedArticles.filter(article => !existingUrlSet.has(article.url));

    // Assign target dates
    const articlesWithTargetDate = assignTargetDates(newArticles.map(article => ({
      originalTitle: article.title,
      generatedTitle: null,
      url: article.url,
      targetDate: '', // will be assigned
      checked: false
    })));

    // Insert new articles
    const insert = db.prepare(`
      INSERT INTO manga_articles (originalTitle, url, targetDate)
      VALUES (?, ?, ?)
    `);

    const insertedArticles: MangaArticle[] = [];

    for (const article of articlesWithTargetDate) {
      const result = insert.run(article.originalTitle, article.url, article.targetDate);
      const insertedArticle = db.prepare('SELECT * FROM manga_articles WHERE id = ?').get(result.lastInsertRowid) as MangaArticle;
      insertedArticles.push(insertedArticle);
    }

    return NextResponse.json({
      success: true,
      scraped: scrapedArticles.length,
      new: newArticles.length,
      articles: insertedArticles
    });
  } catch (error) {
    console.error('Error in manga scrape:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to scrape manga articles' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const result = db.prepare('DELETE FROM manga_articles WHERE id = ?').run(id);
    if (result.changes === 0) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const articles = db.prepare(`
      SELECT * FROM manga_articles
      ORDER BY targetDate DESC, targetDate ASC
    `).all() as MangaArticle[];

    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error('Error fetching manga articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
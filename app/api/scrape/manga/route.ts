import { NextResponse } from 'next/server';
import { scrapeMangaArticles } from '@/lib/scraper';
import { assignTargetDates } from '@/lib/assignTargetDate';
import db, { MangaArticle } from '@/lib/database';

export async function POST() {
  try {
    console.log('Starting manga scrape API');

    // Scrape articles
    const scrapedArticles = await scrapeMangaArticles();
    console.log('Scraped articles:', scrapedArticles.length);

    // Get existing URLs to check duplicates
    const existingRows = db.prepare('SELECT url FROM manga_articles').all() as { url: string }[];
    const existingUrls = existingRows.map(row => row.url);
    console.log('Existing URLs count:', existingUrls.length);
    const existingUrlSet = new Set(existingUrls);

    // Filter out duplicates
    const newArticles = scrapedArticles.filter(article => !existingUrlSet.has(article.url));
    console.log('New articles after dedup:', newArticles.length);

    if (newArticles.length === 0) {
      return NextResponse.json({
        success: true,
        scraped: scrapedArticles.length,
        new: 0,
        articles: []
      });
    }

    // Assign target dates
    console.log('Assigning target dates');
    const articlesWithTargetDate = assignTargetDates(newArticles.map(article => ({
      originalTitle: article.title,
      generatedTitle: null,
      url: article.url,
      targetDate: '', // will be assigned
      checked: false
    })));
    console.log('Target dates assigned, count:', articlesWithTargetDate.length);

    // Insert new articles
    const insertStmt = db.prepare(`
      INSERT INTO manga_articles (originalTitle, generatedTitle, url, targetDate, checked)
      VALUES (?, ?, ?, ?, ?)
    `);
    const insertedArticles: MangaArticle[] = [];

    for (const article of articlesWithTargetDate) {
      console.log('Inserting article:', article.originalTitle.substring(0, 50));
      const result = insertStmt.run(
        article.originalTitle,
        article.generatedTitle,
        article.url,
        article.targetDate,
        article.checked ? 1 : 0
      );
      const insertedArticle = db.prepare('SELECT * FROM manga_articles WHERE id = ?').get(result.lastInsertRowid) as MangaArticle;
      insertedArticles.push(insertedArticle);
    }

    console.log('Manga scrape completed successfully');
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
    const body = await request.json();
    if (body.all) {
      // Bulk delete all manga articles
      const result = db.prepare('DELETE FROM manga_articles').run();
      return NextResponse.json({ success: true, deleted: result.changes });
    } else if (body.id) {
      // Delete single article
      const result = db.prepare('DELETE FROM manga_articles WHERE id = ?').run(body.id);
      if (result.changes === 0) {
        return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
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
    console.log('Articles count:', articles.length);
    console.log('First article targetDate:', articles[0]?.targetDate);

    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error('Error fetching manga articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
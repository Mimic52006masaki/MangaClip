import { NextResponse } from 'next/server';
import { scrapeMangaArticles } from '@/lib/scraper';
import { insertScrapedArticles } from '@/lib/assignTargetDate';
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

    // Insert new articles with assigned target dates
    console.log('Inserting new articles');
    insertScrapedArticles(newArticles);

    console.log('Manga scrape completed successfully');
    return NextResponse.json({
      success: true,
      scraped: scrapedArticles.length,
      new: newArticles.length,
      articles: []
    });
  } catch (error) {
    console.error('Error in manga scrape:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to scrape manga articles' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (body.id) {
      const updates: string[] = [];
      const params: any[] = [];
      if (body.targetDate !== undefined) {
        updates.push('targetDate = ?');
        params.push(body.targetDate);
      }
      if (body.checked !== undefined) {
        updates.push('checked = ?');
        params.push(body.checked ? 1 : 0);
      }
      if (body.generatedTitle !== undefined) {
        updates.push('generatedTitle = ?');
        params.push(body.generatedTitle);
      }
      if (updates.length === 0) {
        return NextResponse.json({ success: false, error: 'No fields to update' }, { status: 400 });
      }
      updates.push("updatedAt = datetime('now')");
      params.push(body.id);
      const result = db.prepare(`UPDATE manga_articles SET ${updates.join(', ')} WHERE id = ?`).run(...params);
      if (result.changes === 0) {
        return NextResponse.json({ success: false, error: 'Article not found or no changes made' }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid request: id required' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    if (body.all) {
      // Bulk delete all manga articles and associated date tags
      // First get all post_ids that will be deleted
      const articlesToDelete = db.prepare('SELECT post_id FROM manga_articles').all() as { post_id: number }[];
      const postIds = articlesToDelete.map(a => a.post_id);

      // Delete associated date tags
      if (postIds.length > 0) {
        const placeholders = postIds.map(() => '?').join(',');
        db.prepare(`DELETE FROM article_date_tags WHERE anchor_post_id IN (${placeholders})`).run(...postIds);
      }

      // Bulk delete all manga articles
      const result = db.prepare('DELETE FROM manga_articles').run();
      return NextResponse.json({ success: true, deleted: result.changes });
    } else if (body.id) {
      // Get post_id before marking as checked
      const article = db.prepare('SELECT post_id FROM manga_articles WHERE id = ?').get(body.id) as { post_id: number } | undefined;
      if (!article) {
        return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
      }

      // Mark single article as checked (hide from UI)
      const result = db.prepare("UPDATE manga_articles SET checked = 1, updatedAt = datetime('now') WHERE id = ?").run(body.id);
      if (result.changes === 0) {
        return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
      }

      // Remove associated date tags
      db.prepare('DELETE FROM article_date_tags WHERE anchor_post_id = ?').run(article.post_id);

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';
    if (all) {
      const articles = db.prepare(`
        SELECT *
        FROM manga_articles
        ORDER BY post_id DESC;
      `).all() as MangaArticle[];
      return NextResponse.json({ success: true, articles });
    }

    const limit = parseInt(searchParams.get('limit') || '15', 10);
    if (isNaN(limit) || limit <= 0 || limit > 100) {
      return NextResponse.json(
        { success: false, error: 'Invalid limit parameter' },
        { status: 400 }
      );
    }

    const articles = db.prepare(`
      SELECT *
      FROM manga_articles
      WHERE checked = 0
      ORDER BY post_id DESC
      LIMIT ?;
    `).all(limit) as MangaArticle[];

    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error('Error fetching manga articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
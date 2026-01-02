import { NextResponse } from 'next/server';
import db, { MangaArticle } from '@/lib/database';

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
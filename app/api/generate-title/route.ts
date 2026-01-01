import { NextResponse } from 'next/server';
import { generateTitle } from '@/lib/ai';
import db from '@/lib/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });
    }

    // Get original title
    const article = db.prepare('SELECT originalTitle FROM manga_articles WHERE id = ?').get(body.id) as { originalTitle: string } | undefined;
    if (!article) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }

    // Generate title with AI
    const generatedTitle = await generateTitle(article.originalTitle);

    // Update DB
    const result = db.prepare("UPDATE manga_articles SET generatedTitle = ?, updatedAt = datetime('now') WHERE id = ?").run(generatedTitle, body.id);
    if (result.changes === 0) {
      return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, generatedTitle });
  } catch (error) {
    console.error('Generate title error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate title' },
      { status: 500 }
    );
  }
}
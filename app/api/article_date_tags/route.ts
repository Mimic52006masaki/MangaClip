import { NextResponse } from 'next/server';
import db, { ArticleDateTag } from '@/lib/database';

export async function GET() {
  try {
    const tags = db.prepare('SELECT * FROM article_date_tags ORDER BY anchor_post_id DESC').all() as ArticleDateTag[];
    return NextResponse.json({ success: true, tags });
  } catch (error) {
    console.error('Error fetching article date tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article date tags' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.anchor_post_id && body.date) {
      const insert = db.prepare(`
        INSERT OR REPLACE INTO article_date_tags (anchor_post_id, date)
        VALUES (?, ?)
      `);
      insert.run(body.anchor_post_id, body.date);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'anchor_post_id and date required' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error creating article date tag:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create article date tag' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (body.anchor_post_id && body.date) {
      const update = db.prepare(`
        UPDATE article_date_tags SET date = ? WHERE anchor_post_id = ?
      `);
      const result = update.run(body.date, body.anchor_post_id);
      if (result.changes === 0) {
        return NextResponse.json({ success: false, error: 'Article date tag not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'anchor_post_id and date required' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating article date tag:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update article date tag' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    if (body.anchor_post_id) {
      const del = db.prepare('DELETE FROM article_date_tags WHERE anchor_post_id = ?');
      const result = del.run(body.anchor_post_id);
      if (result.changes === 0) {
        return NextResponse.json({ success: false, error: 'Article date tag not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'anchor_post_id required' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error deleting article date tag:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete article date tag' },
      { status: 500 }
    );
  }
}
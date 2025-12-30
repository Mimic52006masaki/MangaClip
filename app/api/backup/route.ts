import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import JSZip from 'jszip';

export async function GET() {
  try {
    const mangaArticles = db.prepare('SELECT * FROM manga_articles').all();
    const animeArticles = db.prepare('SELECT * FROM anime_articles').all();

    const backupData = {
      timestamp: new Date().toISOString(),
      mangaArticles,
      animeArticles
    };

    return NextResponse.json(backupData);
  } catch (error) {
    console.error('Error creating backup:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create backup' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const mangaArticles = db.prepare('SELECT * FROM manga_articles').all();
    const animeArticles = db.prepare('SELECT * FROM anime_articles').all();

    const backupData = {
      timestamp: new Date().toISOString(),
      mangaArticles,
      animeArticles
    };

    const jsonContent = JSON.stringify(backupData, null, 2);
    const csvManga = 'id,originalTitle,generatedTitle,url,targetDate,createdAt,updatedAt,checked\n' +
      mangaArticles.map((row: any) => `${row.id},"${row.originalTitle}","${row.generatedTitle}","${row.url}","${row.targetDate}","${row.createdAt}","${row.updatedAt}",${row.checked}`).join('\n');

    const csvAnime = 'id,title,url,createdAt,updatedAt\n' +
      animeArticles.map((row: any) => `${row.id},"${row.title}","${row.url}","${row.createdAt}","${row.updatedAt}"`).join('\n');

    const zip = new JSZip();
    zip.file('backup.json', jsonContent);
    zip.file('manga_articles.csv', csvManga);
    zip.file('anime_articles.csv', csvAnime);

    const zipContent = await zip.generateAsync({ type: 'nodebuffer' });

    return new NextResponse(zipContent, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=backup_${new Date().toISOString().slice(0, 10)}.zip`
      }
    });
  } catch (error) {
    console.error('Error creating backup zip:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create backup zip' },
      { status: 500 }
    );
  }
}
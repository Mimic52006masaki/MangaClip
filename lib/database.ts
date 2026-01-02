import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    console.log('Initializing database module');
    // Database path
    const dbPath = path.join(process.cwd(), 'data', 'mangaclip.db');
    console.log('DB path:', dbPath);
    db = new Database(dbPath);
    console.log('DB instance created');

    // Enable WAL mode for better concurrency
    db.pragma('journal_mode = WAL');

    // Create tables
    console.log('Creating tables...');
    db.exec(`
      CREATE TABLE IF NOT EXISTS manga_articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        originalTitle TEXT NOT NULL,
        generatedTitle TEXT,
        url TEXT NOT NULL UNIQUE,
        targetDate TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        checked BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE IF NOT EXISTS anime_articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        url TEXT NOT NULL UNIQUE,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS article_date_tags (
        anchor_post_id INTEGER PRIMARY KEY,
        date TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Add post_id column if not exists
    try {
      db.exec(`ALTER TABLE manga_articles ADD COLUMN post_id INTEGER;`);
      console.log('Added post_id column');
    } catch (error: any) {
      // Column might already exist, ignore error
      console.log('post_id column already exists or error adding:', error?.message);
    }

    // Add unique index for post_id if not exists
    try {
      db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_manga_articles_post_id ON manga_articles(post_id);`);
      console.log('Created post_id index');
    } catch (error: any) {
      console.log('Index creation error:', error?.message);
    }

    console.log('Tables created successfully');

    // Populate existing data with post_id if not set
    try {
      const rows = db.prepare('SELECT id, url FROM manga_articles WHERE post_id IS NULL').all() as { id: number; url: string }[];
      if (rows.length > 0) {
        const update = db.prepare('UPDATE manga_articles SET post_id = ? WHERE id = ?');
        for (const row of rows) {
          const match = row.url.match(/\/post\/(\d+)\//);
          if (match) {
            update.run(Number(match[1]), row.id);
          }
        }
        console.log(`Populated post_id for ${rows.length} existing rows`);
      }
    } catch (error: any) {
      console.log('Error populating post_id:', error?.message);
    }
  }
  return db;
}

// Types
export interface MangaArticle {
  id: number;
  originalTitle: string;
  generatedTitle: string | null;
  url: string;
  post_id: number;
  targetDate: string | null;
  createdAt: string;
  updatedAt: string;
  checked: boolean;
}

export interface AnimeArticle {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleDateTag {
  anchor_post_id: number;
  date: string;
  createdAt: string;
}

export default getDb();
import Database from 'better-sqlite3';
import path from 'path';

console.log('Initializing database module');

// Database path
const dbPath = path.join(process.cwd(), 'mangaclip.db');
console.log('DB path:', dbPath);
const db = new Database(dbPath);
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
`);
console.log('Tables created successfully');

// Types
export interface MangaArticle {
  id: number;
  originalTitle: string;
  generatedTitle: string | null;
  url: string;
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

export default db;
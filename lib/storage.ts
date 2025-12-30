import fs from 'fs/promises';
import path from 'path';

const STORAGE_DIR = path.join(process.cwd(), 'data');
const MANGA_FILE = path.join(STORAGE_DIR, 'manga_articles.json');
const ANIME_FILE = path.join(STORAGE_DIR, 'anime_articles.json');

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

async function ensureDir() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch (error) {
    // ignore if exists
  }
}

async function readMangaArticles(): Promise<MangaArticle[]> {
  try {
    const data = await fs.readFile(MANGA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeMangaArticles(articles: MangaArticle[]) {
  await ensureDir();
  await fs.writeFile(MANGA_FILE, JSON.stringify(articles, null, 2));
}

async function readAnimeArticles(): Promise<AnimeArticle[]> {
  try {
    const data = await fs.readFile(ANIME_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeAnimeArticles(articles: AnimeArticle[]) {
  await ensureDir();
  await fs.writeFile(ANIME_FILE, JSON.stringify(articles, null, 2));
}

export const storage = {
  // Manga
  async getMangaArticles(): Promise<MangaArticle[]> {
    return readMangaArticles();
  },
  async addMangaArticle(article: Omit<MangaArticle, 'id' | 'createdAt' | 'updatedAt'>): Promise<MangaArticle> {
    const articles = await readMangaArticles();
    const newArticle: MangaArticle = {
      ...article,
      id: Math.max(0, ...articles.map(a => a.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    articles.push(newArticle);
    await writeMangaArticles(articles);
    return newArticle;
  },
  async updateMangaArticle(id: number, updates: Partial<Omit<MangaArticle, 'id'>>): Promise<boolean> {
    const articles = await readMangaArticles();
    const index = articles.findIndex(a => a.id === id);
    if (index === -1) return false;
    articles[index] = { ...articles[index], ...updates, updatedAt: new Date().toISOString() } as MangaArticle;
    await writeMangaArticles(articles);
    return true;
  },
  async deleteMangaArticle(id: number): Promise<boolean> {
    const articles = await readMangaArticles();
    const filtered = articles.filter(a => a.id !== id);
    if (filtered.length === articles.length) return false;
    await writeMangaArticles(filtered);
    return true;
  },
  async getLatestMangaTargetDate(): Promise<string | null> {
    const articles = await readMangaArticles();
    const sorted = articles.filter(a => a.targetDate).sort((a, b) => new Date(b.targetDate!).getTime() - new Date(a.targetDate!).getTime());
    return sorted[0]?.targetDate || null;
  },
  async getMangaUrls(): Promise<string[]> {
    const articles = await readMangaArticles();
    return articles.map(a => a.url);
  },

  // Anime
  async getAnimeArticles(): Promise<AnimeArticle[]> {
    return readAnimeArticles();
  },
  async addAnimeArticle(article: Omit<AnimeArticle, 'id' | 'createdAt' | 'updatedAt'>): Promise<AnimeArticle> {
    const articles = await readAnimeArticles();
    const newArticle: AnimeArticle = {
      ...article,
      id: Math.max(0, ...articles.map(a => a.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    articles.push(newArticle);
    await writeAnimeArticles(articles);
    return newArticle;
  },
  async getAnimeUrls(): Promise<string[]> {
    const articles = await readAnimeArticles();
    return articles.map(a => a.url);
  },

  // Backup
  async getAllArticles() {
    const manga = await readMangaArticles();
    const anime = await readAnimeArticles();
    return { manga, anime };
  },
};
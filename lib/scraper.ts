import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedArticle {
  title: string;
  url: string;
}

// Manga summary news
export async function scrapeMangaArticles(): Promise<ScrapedArticle[]> {
  try {
    const response = await axios.get('https://mangamatomesokuhou.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const articles: ScrapedArticle[] = [];

    // Assuming articles are in .post or similar selector
    $('.post').each((_, element) => {
      const title = $(element).find('h2 a').text().trim();
      const url = $(element).find('h2 a').attr('href');

      if (title && url) {
        articles.push({ title, url });
      }
    });

    return articles;
  } catch (error) {
    console.error('Error scraping manga articles:', error);
    throw new Error('Failed to scrape manga articles');
  }
}

// Anime summary CH
export async function scrapeAnimeArticles(): Promise<ScrapedArticle[]> {
  try {
    const response = await axios.get('https://animematomech.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const articles: ScrapedArticle[] = [];

    // Assuming articles are in .entry or similar selector
    $('.entry').each((_, element) => {
      const title = $(element).find('h2 a').text().trim();
      const url = $(element).find('h2 a').attr('href');

      if (title && url) {
        articles.push({ title, url });
      }
    });

    return articles;
  } catch (error) {
    console.error('Error scraping anime articles:', error);
    throw new Error('Failed to scrape anime articles');
  }
}
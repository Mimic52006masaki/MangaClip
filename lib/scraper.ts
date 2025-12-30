import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedArticle {
  title: string;
  url: string;
}

// Manga summary news
export async function scrapeMangaArticles(): Promise<ScrapedArticle[]> {
  try {
    const targetUrl = 'https://anaguro.yanen.org/search.cgi?key=%e6%bc%ab%e7%94%bb%e3%81%be%e3%81%a8%e3%82%81%e9%80%9f%e5%a0%b1';
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const articles: ScrapedArticle[] = [];

    // Based on Python code: table.table01 > tr with hr > td.title > a.title
    const hrPosts: any[] = [];
    $('table.table01 tr').each((_, row) => {
      if ($(row).find('hr').length > 0) {
        hrPosts.push(row);
      }
    });

    hrPosts.forEach((titles) => {
      const titleElem = $(titles).find('td.title');
      const aTag = $(titles).find('a.title');

      if (titleElem.length > 0 && aTag.length > 0) {
        const title = titleElem.text().trim();
        const href = aTag.attr('href');
        if (title && href) {
          const fullUrl = href.startsWith('http') ? href : 'https://anaguro.yanen.org/' + href.replace('./cnt.cgi?1778=', '');
          articles.push({ title, url: fullUrl.trim() });
        }
      }
    });

    return articles;
  } catch (error) {
    console.error('Error scraping manga articles:', error);
    throw new Error('Failed to scrape manga articles');
  }
}

// Anime summary
export async function scrapeAnimeArticles(): Promise<ScrapedArticle[]> {
  try {
    const targetUrl = 'https://anaguro.yanen.org/search.cgi?c_10=1&c_11=1&c_15=1&c_16=1&c_17=1&c_20=1&c_24=1&c_30=1&c_31=1&c_40=1&c_41=1&c_45=1&c_51=1&c_60=1&c_61=1&c_63=1&c_70=1&c_95=1&c_99=1&type=month&key=%E3%82%A2%E3%83%8B%E3%83%A1%E3%81%BE%E3%81%A8%E3%82%81&btn=%E3%81%8A&chkb=1';
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const articles: ScrapedArticle[] = [];

    // Based on Python code: table.table01 > tr with hr > td.title > a.title
    const hrPosts: any[] = [];
    $('table.table01 tr').each((_, row) => {
      if ($(row).find('hr').length > 0) {
        hrPosts.push(row);
      }
    });

    hrPosts.forEach((titles) => {
      const titleElem = $(titles).find('td.title');
      const aTag = $(titles).find('a.title');

      if (titleElem.length > 0 && aTag.length > 0) {
        const title = titleElem.text().trim();
        const href = aTag.attr('href');
        if (title && href) {
          const fullUrl = href.startsWith('http') ? href : 'https://anaguro.yanen.org/' + href.replace('./cnt.cgi?1996=', '');
          articles.push({ title, url: fullUrl.trim() });
        }
      }
    });

    return articles;
  } catch (error) {
    console.error('Error scraping anime articles:', error);
    throw new Error('Failed to scrape anime articles');
  }
}
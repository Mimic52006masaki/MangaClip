'use client';

import { useState, useEffect } from 'react';

interface AnimeArticle {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export default function AnimeTable() {
  const [articles, setArticles] = useState<AnimeArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/scrape/anime');
      const data = await response.json();
      if (data.success) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleScrape = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scrape/anime', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        await fetchArticles(); // Refresh the list
      }
    } catch (error) {
      console.error('Error scraping:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = async () => {
    const text = articles.map(a => `${a.title},${a.url}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      alert('全件コピー完了!');
    } catch (error) {
      alert('コピー失敗');
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">アニメまとめCH</h2>
      <div className="mb-4">
        <button
          onClick={handleScrape}
          disabled={loading}
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? '取得中...' : '記事取得'}
        </button>
        <button
          onClick={handleCopyAll}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          全件コピー
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">タイトル</th>
            <th className="border border-gray-300 px-4 py-2">URL</th>
            <th className="border border-gray-300 px-4 py-2">作成日時</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              <td className="border border-gray-300 px-4 py-2">{article.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {article.url}
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(article.createdAt).toLocaleString('ja-JP')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
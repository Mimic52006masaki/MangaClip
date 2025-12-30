'use client';

import { useState, useEffect } from 'react';

interface MangaArticle {
  id: number;
  originalTitle: string;
  generatedTitle: string | null;
  url: string;
  targetDate: string | null;
  createdAt: string;
  updatedAt: string;
  checked: boolean;
}

export default function MangaTable() {
  const [articles, setArticles] = useState<MangaArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/scrape/manga');
      const data = await response.json();
      if (data.success) {
        console.log('Fetched articles:', data.articles.length);
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleScrape = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scrape/manga', { method: 'POST' });
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

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied!');
    } catch (error) {
      alert('Failed to copy');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('本当に削除しますか？')) return;
    try {
      const response = await fetch('/api/scrape/manga', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (data.success) {
        await fetchArticles(); // Refresh the list
        alert('削除しました');
      } else {
        alert('削除失敗: ' + data.error);
      }
    } catch (error) {
      alert('削除失敗');
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm('全ての漫画記事を削除しますか？')) return;
    try {
      const response = await fetch('/api/scrape/manga', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true })
      });
      const data = await response.json();
      if (data.success) {
        await fetchArticles(); // Refresh the list
        alert(`${data.deleted}件削除しました`);
      } else {
        alert('削除失敗: ' + data.error);
      }
    } catch (error) {
      alert('削除失敗');
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Group by date
  const groupedArticles = articles.reduce((groups, article) => {
    if (!article.targetDate) return groups;
    const date = new Date(article.targetDate).toLocaleDateString('ja-JP');
    if (!groups[date]) groups[date] = [];
    groups[date].push(article);
    return groups;
  }, {} as Record<string, MangaArticle[]>);
  console.log('Grouped articles keys:', Object.keys(groupedArticles));

  console.log('Rendering MangaTable');
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">漫画まとめ速報</h2>
      <div className="mb-4 space-x-2">
        <button
          onClick={handleScrape}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? '取得中...' : '記事取得'}
        </button>
        <button
          onClick={handleBulkDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          全記事削除
        </button>
      </div>

      {Object.keys(groupedArticles).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).map(date => (
        <div key={date} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{date}</h3>
          <button
            onClick={() => {
              const urls = groupedArticles[date].map(a => a.url);
              console.log('URLs to open:', urls);
              urls.forEach((url, index) => {
                console.log(`Opening URL ${index + 1}: ${url}`);
                setTimeout(() => window.open(url, '_blank'), index * 500);
              });
            }}
            className="mb-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            URL一括開き
          </button>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">時間</th>
                <th className="border border-gray-300 px-4 py-2">オリジナルタイトル</th>
                <th className="border border-gray-300 px-4 py-2">URL</th>
                <th className="border border-gray-300 px-4 py-2">生成タイトル</th>
                <th className="border border-gray-300 px-4 py-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const sorted = groupedArticles[date].sort((a, b) => {
                  if (!a.targetDate || !b.targetDate) return 0;
                  return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
                });
                console.log(`Date ${date}: ${sorted.length} articles`);
                return sorted;
              })().map(article => (
                <tr key={article.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {article.targetDate ? new Date(article.targetDate).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }) : ''}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{article.originalTitle}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {article.url}
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{article.generatedTitle || article.originalTitle}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleCopy(article.generatedTitle || article.originalTitle)}
                      className="mr-2 px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      コピー
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
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
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [filterUrl, setFilterUrl] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTime, setEditingTime] = useState('');
  const [limit, setLimit] = useState(15);
  const fetchArticles = async () => {
    try {
      const response = await fetch(`/api/scrape/manga?limit=${limit}`);
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

  const handleScrapeUrl = async () => {
    if (!scrapeUrl.trim()) {
      alert('URLを入力してください');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/scrape/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteType: 'manga', url: scrapeUrl.trim(), filterUrl: filterUrl.trim() || undefined })
      });
      const data = await response.json();
      if (data.success) {
        await fetchArticles(); // Refresh the list
        setScrapeUrl('');
        alert(`${data.addedArticles.length}件追加しました`);
      } else {
        alert('スクレイピング失敗: ' + data.error);
      }
    } catch (error) {
      alert('スクレイピング失敗');
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

  const handleUpdateTime = async (id: number, newTime: string) => {
    try {
      const response = await fetch('/api/scrape/manga', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, targetDate: newTime })
      });
      const data = await response.json();
      if (data.success) {
        await fetchArticles(); // Refresh the list
        setEditingId(null);
        setEditingTime('');
        alert('更新しました');
      } else {
        alert('更新失敗: ' + data.error);
      }
    } catch (error) {
      alert('更新失敗');
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

  const handleBulkDelete15 = async (date: string) => {
    if (!confirm(`${date}の最新15件の漫画記事を削除しますか？`)) return;
    try {
      const response = await fetch('/api/scrape/manga', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 15, date })
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
  }, [limit]);

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
      <div className="mb-4">
        <a href="/backup" className="text-blue-500 underline mr-4">バックアップページ</a>
      </div>
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
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value={10}>10件</option>
          <option value={15}>15件</option>
          <option value={20}>20件</option>
          <option value={50}>50件</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={scrapeUrl}
          onChange={(e) => setScrapeUrl(e.target.value)}
          placeholder="スクレイピングするURLを入力"
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-md"
        />
        <input
          type="text"
          value={filterUrl}
          onChange={(e) => setFilterUrl(e.target.value)}
          placeholder="URLフィルタ（例: post/25122918/）"
          className="ml-2 px-4 py-2 border border-gray-300 rounded w-full max-w-md"
        />
        <button
          onClick={handleScrapeUrl}
          disabled={loading}
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? '取得中...' : 'URLから取得'}
        </button>
      </div>

      {Object.keys(groupedArticles).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).map(date => (
        <div key={date} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{date}</h3>
          <div className="mb-2 space-x-2">
            <button
              onClick={() => {
                const urls = (groupedArticles[date] || []).map(a => a.url).slice(0, 16);
                console.log('URLs to open:', urls);
                urls.forEach((url, index) => {
                  console.log(`Opening URL ${index + 1}: ${url}`);
                  setTimeout(() => window.open(url, '_blank'), index * 500);
                });
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              URL一括開き
            </button>
            <button
              onClick={() => handleBulkDelete15(date)}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              15件削除
            </button>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">日時</th>
                <th className="border border-gray-300 px-4 py-2">オリジナルタイトル</th>
                <th className="border border-gray-300 px-4 py-2">URL</th>
                <th className="border border-gray-300 px-4 py-2">生成タイトル</th>
                <th className="border border-gray-300 px-4 py-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {(groupedArticles[date] || []).map(article => (
                <tr key={article.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingId === article.id ? (
                      <input
                        type="datetime-local"
                        value={editingTime}
                        onChange={(e) => setEditingTime(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded w-full"
                      />
                    ) : (
                      article.targetDate ? new Date(article.targetDate).toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : ''
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{article.originalTitle}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {article.url}
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{article.generatedTitle || article.originalTitle}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingId === article.id ? (
                      <>
                        <button
                          onClick={() => handleUpdateTime(article.id, editingTime)}
                          className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          保存
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditingTime('');
                          }}
                          className="mr-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          キャンセル
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(article.id);
                            setEditingTime(article.targetDate ? new Date(article.targetDate).toISOString().slice(0, 16) : '');
                          }}
                          className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          編集
                        </button>
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
                      </>
                    )}
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
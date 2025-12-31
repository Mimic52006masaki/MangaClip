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

export default function BackupPage() {
  const [articles, setArticles] = useState<MangaArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/scrape/manga?all=true');
      const data = await response.json();
      if (data.success) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleRestore = async (id: number) => {
    try {
      const response = await fetch('/api/scrape/manga', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, checked: false })
      });
      const data = await response.json();
      if (data.success) {
        await fetchArticles(); // Refresh the list
      } else {
        alert('復元失敗: ' + data.error);
      }
    } catch (error) {
      alert('復元失敗');
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">漫画記事バックアップ</h1>
      <div className="mb-4">
        <a href="/manga" className="text-blue-500 underline mr-4">メインに戻る</a>
      </div>
      <p className="mb-4">総記事数: {articles.length}</p>
      <button
        onClick={fetchArticles}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        更新
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">タイトル</th>
            <th className="border border-gray-300 px-4 py-2">URL</th>
            <th className="border border-gray-300 px-4 py-2">チェック済み</th>
            <th className="border border-gray-300 px-4 py-2">操作</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              <td className="border border-gray-300 px-4 py-2">{article.id}</td>
              <td className="border border-gray-300 px-4 py-2">{article.originalTitle}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {article.url}
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">{article.checked ? 'はい' : 'いいえ'}</td>
              <td className="border border-gray-300 px-4 py-2">
                {article.checked && (
                  <button
                    onClick={() => handleRestore(article.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    復元
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
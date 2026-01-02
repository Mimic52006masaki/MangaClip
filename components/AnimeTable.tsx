'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

/**
 * Anime Management Dashboard - Modern Version
 * MangaTable.tsxのデザインに近づけたアニメ管理画面
 */

interface AnimeArticle {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export default function AnimeTable() {
  // --- States ---
  const [articles, setArticles] = useState<AnimeArticle[]>([]);
  const [loading, setLoading] = useState(false);

  // --- API Functions ---
  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/scrape/anime');
      const data = await response.json();
      if (data.success) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error fetching anime articles:', error);
    }
  };

  const handleScrape = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scrape/anime', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        await fetchArticles();
      }
    } catch (error) {
      console.error('Error scraping anime:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = async () => {
    const text = articles.map(a => `${a.title}\t${a.url}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      alert("コピーしました")
    } catch (error) {
      console.error('Copy error:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-[#f6f6f8] dark:bg-[#101622] font-sans">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <Sidebar currentPage="anime" />

      {/* Main Content */}
      <main className="flex-1 md:ml-96 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">アニメまとめCH 管理</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleScrape}
              disabled={loading}
              className="flex h-10 items-center gap-2 px-4 rounded-lg bg-[#135bec] text-white text-sm font-bold hover:bg-[#135bec]/90 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-lg ${loading ? 'animate-spin' : ''}`}>refresh</span>
              {loading ? '取得中...' : '記事取得'}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-7xl flex flex-col gap-6">

            {/* Stats */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-medium text-slate-500">アニメ記事数</p>
                <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{articles.length}</h3>
              </div>
              <div className="flex items-center">
                <button onClick={handleCopyAll} className="w-full py-4 px-6 bg-purple-500 text-white text-sm font-bold hover:bg-purple-600 rounded-xl transition-colors">
                  全件コピー (CSV)
                </button>
              </div>
            </section>

            {/* Desktop Table */}
            <div className="hidden md:block rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <tr>
                      <th className="px-6 py-3 font-semibold">#</th>
                      <th className="px-6 py-3 font-semibold">タイトル</th>
                      <th className="px-6 py-3 font-semibold">URL</th>
                      <th className="px-6 py-3 font-semibold text-right">作成日時</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {articles.map((article, index) => (
                      <tr key={article.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 text-slate-400 font-bold">#{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white leading-tight">
                          {article.title}
                        </td>
                        <td className="px-6 py-4">
                          <a href={article.url} target="_blank" rel="noreferrer" className="text-[#135bec] hover:underline truncate max-w-xs block">
                            {article.url}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-right text-slate-500">
                          {new Date(article.createdAt).toLocaleString('ja-JP', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {articles.map((article, index) => (
                <div key={article.id} className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-slate-400 font-bold text-sm">#{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 dark:text-white leading-tight mb-2">
                        {article.title}
                      </div>
                      <a href={article.url} target="_blank" rel="noreferrer" className="text-[#135bec] hover:underline text-sm block mb-2 break-all">
                        {article.url}
                      </a>
                      <div className="text-xs text-slate-500">
                        {new Date(article.createdAt).toLocaleString('ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
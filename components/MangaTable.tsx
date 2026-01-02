'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

/**
 * Manga Management Dashboard - Integrated Version
 * エラー回避のため next/link を使用せず、提供された最新ロジックと型定義を統合。
 */

interface MangaArticle {
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

interface ArticleDateTag {
  anchor_post_id: number;
  date: string;
  createdAt: string;
}

export default function MangaTable() {
  // --- States ---
  const [articles, setArticles] = useState<MangaArticle[]>([]);
  const [dateTags, setDateTags] = useState<ArticleDateTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTime, setEditingTime] = useState('');
  const [editingDateId, setEditingDateId] = useState<number | null>(null);
  const [editingDate, setEditingDate] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null);
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [bulkDate, setBulkDate] = useState('');
  const [copiedButtonId, setCopiedButtonId] = useState<string | null>(null);

  // --- API Functions ---
  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/manga_articles?all=true');
      const data = await response.json();
      if (data.success) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const fetchDateTags = async () => {
    try {
      const response = await fetch('/api/article_date_tags');
      const data = await response.json();
      if (data.success) {
        setDateTags(data.tags);
      }
    } catch (error) {
      console.error('Error fetching date tags:', error);
    }
  };

  const handleScrape = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scrape/manga', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        await fetchArticles();
        await fetchDateTags();
      }
    } catch (error) {
      console.error('Error scraping:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, buttonId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedButtonId(buttonId);
      setTimeout(() => setCopiedButtonId(null), 1500);
    } catch (error) {
      console.error('Failed to copy');
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
        await fetchArticles();
        setEditingId(null);
        setEditingTime('');
      }
    } catch (error) {
      console.error('Update time error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('本当に削除しますか？')) return;
    try {
      const response = await fetch('/api/scrape/manga', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if ((await response.json()).success) {
        await fetchArticles();
        await fetchDateTags();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleUpdateDate = async (postId: number, date: string) => {
    try {
      const response = await fetch('/api/article_date_tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anchor_post_id: postId, date })
      });
      if ((await response.json()).success) {
        await fetchDateTags();
        setEditingDateId(null);
        setEditingDate('');
        setCopiedButtonId(`date-${postId}`);
        setTimeout(() => setCopiedButtonId(null), 1500);
      }
    } catch (error) {
      console.error('Update date error:', error);
    }
  };

  const handleDeleteDate = async (postId: number) => {
    if (!window.confirm('この日付を削除しますか？')) return;
    try {
      const response = await fetch('/api/article_date_tags', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anchor_post_id: postId })
      });
      if ((await response.json()).success) {
        await fetchDateTags();
      }
    } catch (error) {
      console.error('Delete date error:', error);
    }
  };

  const handleUpdateTitle = async (id: number, newTitle: string) => {
    try {
      const response = await fetch('/api/scrape/manga', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, generatedTitle: newTitle })
      });
      const data = await response.json();
      if (data.success) {
        await fetchArticles();
        setEditingTitleId(null);
        setEditingTitle('');
      }
    } catch (error) {
      console.error('Update title error:', error);
    }
  };

  const handleGenerateTitle = async (id: number) => {
    setGeneratingId(id);
    try {
      const response = await fetch('/api/generate-title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (data.success) {
        await fetchArticles();
      } else {
        alert(`タイトル生成エラー: ${data.error || '不明なエラー'}`);
      }
    } catch (error) {
      console.error('Generate title error:', error);
      alert('タイトル生成に失敗しました。ネットワークエラーまたはAPI制限の可能性があります。');
    } finally {
      setGeneratingId(null);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm('全ての漫画記事を削除しますか？')) return;
    try {
      const response = await fetch('/api/scrape/manga', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true })
      });
      if ((await response.json()).success) {
        await fetchArticles();
        await fetchDateTags();
      }
    } catch (error) {
      console.error('Bulk delete error:', error);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`${selectedIds.size}件の記事を削除しますか？`)) return;
    try {
      for (const id of selectedIds) {
        await fetch('/api/scrape/manga', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
      }
      alert(`${selectedIds.size}件の記事を削除しました。`);
      setSelectedIds(new Set());
      await fetchArticles();
      await fetchDateTags();
    } catch (error) {
      console.error('Bulk selection delete error:', error);
    }
  };

  const handleCopySelectedUrls = async () => {
    if (selectedIds.size === 0) return;
    const selectedArticles = articles.filter(article => selectedIds.has(article.id));
    const urls = selectedArticles.map(article => article.url).join('\n');
    try {
      await navigator.clipboard.writeText(urls);
      alert(`${selectedArticles.length}件のURLをクリップボードにコピーしました。`);
    } catch (error) {
      console.error('Copy URLs error:', error);
    }
  };

  const handleCopySelectedOriginalTitles = async () => {
    if (selectedIds.size === 0) return;
    const selectedArticles = articles.filter(article => selectedIds.has(article.id));
    const titles = selectedArticles.map(article => article.originalTitle).join('\n');
    try {
      await navigator.clipboard.writeText(titles);
      alert(`${selectedArticles.length}件のオリジナルタイトルをクリップボードにコピーしました。`);
    } catch (error) {
      console.error('Copy original titles error:', error);
    }
  };

  const handleBulkGenerateTitles = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`${selectedIds.size}件の記事のタイトルを一括生成しますか？`)) return;

    const selectedIdsArray = Array.from(selectedIds);
    let successCount = 0;
    for (const id of selectedIdsArray) {
      try {
        await handleGenerateTitle(id);
        successCount++;
        // 少し待機してAPI負荷を下げる
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Failed to generate title for ${id}:`, error);
      }
    }
    alert(`${successCount}件のタイトル生成が完了しました。`);
    setSelectedIds(new Set());
  };

  const handleBulkSetDate = async () => {
    if (selectedIds.size === 0 || !bulkDate) return;
    if (!window.confirm(`${selectedIds.size}件の記事に日付「${bulkDate}」を設定しますか？`)) return;

    const selectedArticles = unreadArticles.filter(article => selectedIds.has(article.id));
    let successCount = 0;
    for (const article of selectedArticles) {
      try {
        await handleUpdateDate(article.post_id, bulkDate);
        successCount++;
      } catch (error) {
        console.error(`Failed to set date for ${article.id}:`, error);
      }
    }
    alert(`${successCount}件の日付設定が完了しました。`);
    setSelectedIds(new Set());
    setBulkDate('');
  };

  const handleRowClick = (articleId: number, index: number, event: React.MouseEvent) => {
    const isShift = event.shiftKey;
    const isMeta = event.metaKey || event.ctrlKey;

    if (isShift && lastSelectedIndex !== null) {
      // Shift + クリック: 範囲選択
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);
      const newSelected = new Set<number>();

      unreadArticles.slice(start, end + 1).forEach((article) => {
        newSelected.add(article.id);
      });

      setSelectedIds(newSelected);
    } else if (isMeta) {
      // Command/Ctrl + クリック: 個別追加/削除
      const newSelected = new Set(selectedIds);
      if (selectedIds.has(articleId)) {
        newSelected.delete(articleId);
      } else {
        newSelected.add(articleId);
      }
      setSelectedIds(newSelected);
      setLastSelectedIndex(index);
    } else {
      // 通常クリック: トグル
      const newSelected = new Set(selectedIds);
      if (selectedIds.has(articleId)) {
        newSelected.delete(articleId);
      } else {
        newSelected.add(articleId);
      }
      setSelectedIds(newSelected);
      setLastSelectedIndex(index);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchDateTags();
  }, []);

  const dateTagMap = new Map<number, string>();
  dateTags.forEach(tag => dateTagMap.set(tag.anchor_post_id, tag.date));

  const unreadArticles = articles.filter(article => !article.checked);

  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <Sidebar currentPage="manga" />

      {/* Main Content */}
      <main className="flex-1 md:ml-96 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-white dark:bg-slate-900 px-8 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">漫画まとめ速報 管理</h2>
          <div className="flex items-center gap-2">
            {selectedIds.size > 0 && (
              <div className="flex items-center gap-2 mr-4 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={bulkDate}
                    onChange={(e) => setBulkDate(e.target.value)}
                    className="px-2 py-1 text-xs border rounded"
                  />
                  <button onClick={handleBulkSetDate} className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all">一括日付設定 ({selectedIds.size})</button>
                </div>
                <button onClick={handleCopySelectedUrls} className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all">URLコピー</button>
                <button onClick={handleCopySelectedOriginalTitles} className="px-3 py-1.5 text-xs font-bold text-purple-600 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all">オリジナルコピー</button>
                <button onClick={handleBulkGenerateTitles} className="px-3 py-1.5 text-xs font-bold text-green-600 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all">AI一括生成 ({selectedIds.size})</button>
                <button onClick={handleDeleteSelected} className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all">選択削除 ({selectedIds.size})</button>
                <button onClick={() => setSelectedIds(new Set())} className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all">選択解除</button>
              </div>
            )}
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

        <div className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-7xl flex flex-col gap-8">

            <section className="flex flex-col gap-6 p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <span className="material-symbols-outlined text-blue-500 text-3xl">download</span>
                新しい記事をスクレイピング
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl bg-blue-500/10 p-6 shadow-sm border border-blue-500/20 dark:border-blue-500/50 dark:bg-blue-500/10 flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-blue-500 text-5xl mb-3">article</span>
                  <p className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">未処理の記事</p>
                  <h3 className="text-5xl font-extrabold text-blue-500">{unreadArticles.length}</h3>
                </div>
                <div className="rounded-xl bg-emerald-500/10 p-6 shadow-sm border border-emerald-500/20 dark:border-emerald-500/50 dark:bg-emerald-500/10 flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-emerald-500 text-5xl mb-3">bookmark_add</span>
                  <p className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">日付タグ数</p>
                  <h3 className="text-5xl font-extrabold text-emerald-500">{dateTags.length}</h3>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-6 p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-500 text-3xl">rate_review</span>
                記事を確認・編集する
              </h3>
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 px-6 py-4 rounded-t-lg border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds(new Set(unreadArticles.map(a => a.id)));
                      else setSelectedIds(new Set());
                    }}
                    className="h-5 w-5 rounded border-slate-300 text-blue-500"
                  />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">すべて選択 / 元記事情報と生成タイトル</span>
                </div>
                <div className="flex items-center gap-6">
                  <button
                    onClick={handleCopySelectedUrls}
                    className={`text-sm font-medium ${selectedIds.size > 0 ? 'text-slate-600 hover:text-slate-700' : 'text-slate-400 cursor-not-allowed'}`}
                    disabled={selectedIds.size === 0}
                  >
                    <span className="material-symbols-outlined align-middle text-lg mr-1">link</span>
                    URLコピー
                  </button>
                  <button
                    onClick={handleCopySelectedOriginalTitles}
                    className={`text-sm font-medium ${selectedIds.size > 0 ? 'text-slate-600 hover:text-slate-700' : 'text-slate-400 cursor-not-allowed'}`}
                    disabled={selectedIds.size === 0}
                  >
                    <span className="material-symbols-outlined align-middle text-lg mr-1">description</span>
                    タイトルコピー
                  </button>
                  <button onClick={handleBulkGenerateTitles} className={`text-sm font-medium ${selectedIds.size > 0 ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-400 cursor-not-allowed'}`} disabled={selectedIds.size === 0}>
                    <span className="material-symbols-outlined align-middle text-lg mr-1">auto_fix_high</span>
                    AI生成 ({selectedIds.size})
                  </button>
                  <button onClick={handleDeleteSelected} className={`text-sm font-medium ${selectedIds.size > 0 ? 'text-red-600 hover:text-red-700' : 'text-slate-400 cursor-not-allowed'}`} disabled={selectedIds.size === 0}>
                    <span className="material-symbols-outlined align-middle text-lg mr-1">remove_circle</span>
                    選択した記事を削除
                  </button>
                  <button onClick={() => setSelectedIds(new Set())} className={`text-sm font-medium ${selectedIds.size > 0 ? 'text-slate-600 hover:text-slate-700' : 'text-slate-400 cursor-not-allowed'}`} disabled={selectedIds.size === 0}>
                    選択解除
                  </button>
                </div>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <tr>
                      <th className="p-4 w-10">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) setSelectedIds(new Set(unreadArticles.map(a => a.id)));
                            else setSelectedIds(new Set());
                          }}
                          className="h-4 w-4 rounded border-slate-300 text-[#135bec]"
                        />
                      </th>
                      <th className="px-6 py-3 font-semibold">元記事情報 / 生成タイトル</th>
                      <th className="px-6 py-3 font-semibold text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {unreadArticles.map((article, index) => (
                      <React.Fragment key={article.id}>
                        {/* Inline Edit for Title */}
                        {editingTitleId === article.id && (
                          <tr className="bg-green-50 dark:bg-green-900/10">
                            <td colSpan={3} className="p-4">
                              <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-green-200">
                                <span className="text-xs font-bold text-green-700 uppercase">タイトル編集</span>
                                <input
                                  type="text"
                                  value={editingTitle}
                                  onChange={(e) => setEditingTitle(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleUpdateTitle(article.id, editingTitle);
                                    }
                                  }}
                                  className="flex-1 rounded-lg border-slate-200 bg-white dark:bg-slate-700 text-sm px-3 py-1.5 focus:ring-[#135bec]"
                                  placeholder="新しいタイトルを入力"
                                />
                                <button onClick={() => handleUpdateTitle(article.id, editingTitle)} className="bg-green-600 text-white px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-green-700">保存</button>
                                <button onClick={() => setEditingTitleId(null)} className="text-slate-400 text-xs font-bold ml-auto hover:text-slate-600">閉じる</button>
                              </div>
                            </td>
                          </tr>
                        )}

                        {/* Inline Edit for Date */}
                        {editingDateId === article.post_id && (
                          <tr className="bg-amber-50 dark:bg-amber-900/10">
                            <td colSpan={3} className="p-4">
                              <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-amber-200">
                                <span className="text-xs font-bold text-amber-700 uppercase">日付設定</span>
                                <input
                                  type="date"
                                  value={editingDate}
                                  onChange={(e) => setEditingDate(e.target.value)}
                                  className="rounded-lg border-slate-200 bg-white dark:bg-slate-700 text-sm px-3 py-1.5 focus:ring-[#135bec]"
                                />
                                <button onClick={() => handleUpdateDate(article.post_id, editingDate)} className="bg-green-600 text-white px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-green-700">保存</button>
                                <button onClick={() => handleDeleteDate(article.post_id)} className="bg-red-50 text-red-600 px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-red-100">タグ削除</button>
                                <button onClick={() => setEditingDateId(null)} className="text-slate-400 text-xs font-bold ml-auto hover:text-slate-600">閉じる</button>
                              </div>
                            </td>
                          </tr>
                        )}

                        {/* Article Row */}
                        <tr
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                          onClick={(event) => handleRowClick(article.id, index, event)}
                        >
                          <td className="p-4" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedIds.has(article.id)}
                              onChange={(e) => {
                                const newSelected = new Set(selectedIds);
                                if (e.target.checked) newSelected.add(article.id);
                                else newSelected.delete(article.id);
                                setSelectedIds(newSelected);
                              }}
                              className="h-4 w-4 rounded border-slate-300 text-[#135bec]"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="mb-1 text-xs text-slate-400 flex items-center gap-2">
                              <span className="font-bold text-slate-300">#{index + 1}</span>
                              <a href={article.url} target="_blank" rel="noreferrer" className="hover:text-[#135bec] truncate max-w-xs">{article.url}</a>
                            </div>
                            <div className="font-medium text-slate-900 dark:text-white leading-tight mb-2">
                              {article.originalTitle}
                            </div>
                            <div className={`p-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg font-bold border border-slate-100 dark:border-slate-700 ${article.generatedTitle ? (article.generatedTitle !== article.originalTitle ? 'text-green-600' : 'text-slate-500') : 'text-[#135bec]'}`}>
                              {article.generatedTitle || "※ AI未生成"}
                              {article.generatedTitle && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingTitleId(article.id);
                                    setEditingTitle(article.generatedTitle!);
                                  }}
                                  className="ml-2 text-xs text-slate-400 hover:text-slate-600"
                                  title="タイトル編集"
                                >
                                  <span className="material-symbols-outlined text-base">edit</span>
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleGenerateTitle(article.id)}
                                disabled={generatingId === article.id}
                                className={`p-2 rounded-lg ${generatingId === article.id ? 'animate-spin text-slate-300' : article.generatedTitle ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-[#135bec] hover:bg-[#135bec]/10'}`}
                                title={article.generatedTitle ? "AIタイトル再生成" : "AIタイトル生成"}
                              >
                                <span className="material-symbols-outlined text-xl">{article.generatedTitle ? 'auto_fix_high' : 'auto_fix_high'}</span>
                              </button>
                              <button
                                onClick={() => {
                                  setEditingDateId(article.post_id);
                                  setEditingDate(dateTagMap.get(article.post_id) || '');
                                }}
                                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                                title="日付タグ設定"
                              >
                                <span className="material-symbols-outlined text-xl">{copiedButtonId === `date-${article.post_id}` ? 'check_circle' : 'bookmark'}</span>
                              </button>
                              <button
                                onClick={() => handleCopy(article.originalTitle, `copy-original-${article.id}`)}
                                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                                title="オリジナルタイトルをコピー"
                              >
                                <span className="material-symbols-outlined text-lg">{copiedButtonId === `copy-original-${article.id}` ? 'check_circle' : 'content_copy'}</span>
                              </button>
                              <button
                                onClick={() => handleCopy(article.generatedTitle || article.originalTitle, `copy-generated-${article.id}`)}
                                className={`p-2 rounded-lg ${article.generatedTitle ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-slate-300 cursor-not-allowed'}`}
                                title={article.generatedTitle ? "生成タイトルをコピー" : "生成タイトルなし"}
                                disabled={!article.generatedTitle}
                              >
                                <span className="material-symbols-outlined text-lg">{copiedButtonId === `copy-generated-${article.id}` ? 'check_circle' : 'content_paste'}</span>
                              </button>
                              <button
                                onClick={() => handleDelete(article.id)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                title="削除"
                              >
                                <span className="material-symbols-outlined text-xl">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Date Tag Row */}
                        {dateTagMap.has(article.post_id) && (
                          <tr
                            className="bg-amber-100 dark:bg-amber-900/20 border-l-4 border-amber-400 cursor-pointer hover:bg-amber-200 dark:hover:bg-amber-900/40 transition-colors"
                            onClick={() => {
                              setEditingDateId(article.post_id);
                              setEditingDate(dateTagMap.get(article.post_id) || '');
                            }}
                          >
                            <td className="px-6 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 w-16">
                              <span className="font-bold text-slate-300">#{index + 1}</span>
                            </td>
                            <td colSpan={2} className="px-6 py-2 text-xs font-bold text-amber-700 dark:text-amber-300">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">calendar_month</span>
                                {dateTagMap.get(article.post_id)}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
'use client';

import Link from 'next/link';

export default function Home() {
  const handleBackup = async () => {
    if (!confirm('バックアップを作成しますか？')) return;
    try {
      const response = await fetch('/api/backup', { method: 'POST' });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${new Date().toISOString().slice(0, 10)}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        alert('バックアップ完了');
      } else {
        alert('バックアップ失敗');
      }
    } catch (error) {
      alert('バックアップ失敗');
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">MangaClip</h1>
      <div className="text-center mb-8">
        <button
          onClick={handleBackup}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 mr-4"
        >
          バックアップ作成
        </button>
      </div>
      <div className="text-center">
        <Link href="/manga" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">
          漫画まとめ速報
        </Link>
        <Link href="/anime" className="px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-600">
          アニメまとめCH
        </Link>
      </div>
    </main>
  )
}
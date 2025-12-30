'use client';

import Link from 'next/link';
import MangaTable from '@/components/MangaTable';

export default function MangaPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="text-center mb-4">
        <Link href="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-4">
          ホームに戻る
        </Link>
        <Link href="/anime" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          アニメまとめCHへ
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">漫画まとめ速報</h1>
      <MangaTable />
    </main>
  )
}
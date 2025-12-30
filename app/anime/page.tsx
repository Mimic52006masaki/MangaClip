'use client';

import Link from 'next/link';
import AnimeTable from '@/components/AnimeTable';

export default function AnimePage() {
  return (
    <main className="min-h-screen p-8">
      <div className="text-center mb-4">
        <Link href="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-4">
          ホームに戻る
        </Link>
        <Link href="/manga" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          漫画まとめ速報へ
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">アニメまとめCH</h1>
      <AnimeTable />
    </main>
  )
}
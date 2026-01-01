'use client';

import Link from 'next/link';
import MangaTable from '@/components/MangaTable';

export default function MangaPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="text-center mb-4">
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">漫画まとめ速報</h1>
      <MangaTable />
    </main>
  )
}
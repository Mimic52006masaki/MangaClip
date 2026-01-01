'use client';

import Link from 'next/link';
import AnimeTable from '@/components/AnimeTable';

export default function AnimePage() {
  return (
    <main className="min-h-screen p-8">
      <div className="text-center mb-4">
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">アニメまとめCH</h1>
      <AnimeTable />
    </main>
  )
}
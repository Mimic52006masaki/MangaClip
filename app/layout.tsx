import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MangaClip',
  description: 'Manga and Anime article clipper',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
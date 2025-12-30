# MVP開発 Todo（補足版）

## データモデル

- [x]  Articleテーブル設計
    - [x]  MangaArticle / AnimeArticle で分ける
    - [x]  カラム定義: siteType, targetDate, originalTitle, generatedTitle, URL, createdAt, updatedAt, checked
- [x]  DB接続設定 / API Routes準備

## スクレイピング

- [x]  漫画まとめ速報取得
    - [x]  axiosでHTML取得
    - [x]  cheerioで記事抽出（タイトル、URL）
- [x]  アニメまとめCH取得
    - [x]  axiosでHTML取得
    - [x]  cheerioで記事抽出（タイトル、URL）
- [x]  重複チェックロジック実装（URL基準）

## targetDate割り当て（漫画まとめ速報）

- [x]  最新DB記事取得
- [x]  古い時間スロットから逆順で割り当て
- [x]  07:00〜21:00、1日15件単位
- [x]  日付降順＋時間昇順でUI表示

## UI実装（漫画まとめ速報）

- [x]  1日単位テーブル表示
- [x]  生成タイトルコピーボタン（各行）
- [x]  1件削除ボタン（各行）
- [x]  1日単位URL一括開きボタン

## UI実装（アニメまとめCH）

- [x]  記事一覧表示（取得順）
- [x]  全件コピーボタン（タイトル,URL形式）

## バックアップ

- [x]  全記事取得 → JSON/CSV変換
- [x]  ローカル保存 / ZIP圧縮
- [x]  UIからバックアップ確認ダイアログ表示

## エラーハンドリング

- [x]  コピー失敗時の例外キャッチ
- [x]  削除失敗時の例外キャッチ
- [x]  スクレイピング失敗時のリトライ or UI警告表示
- [x]  DB保存失敗時の通知

## テスト

- [x]  targetDate割り当て動作確認（最新07:00/21:00、1日15件ブロック）
- [x]  コピー・削除・一括URL開き動作確認
- [x]  アニメまとめCH全件コピー動作確認
- [x]  UI表示順（日付降順＋時間昇順）確認
- [x]  重複記事除外確認

## ドキュメント

- [ ]  01〜09更新反映
- [ ]  10_LogicDesign更新確認
- [x]  .cursorrulesルール確認（git push、todo進捗管理、docs確認）
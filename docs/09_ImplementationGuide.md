# 実装ガイド（Implementation Guide）

## 1. 実装方針
- 採用アーキテクチャ：
  - MVVM（React + Next.js）想定
- 状態管理の方針：
  - React Context + useState / useReducer
- データ永続化の方針：
  - DB（SQLite / PostgreSQL / MySQL）を利用
  - Prisma / TypeORM / Knex.js などのORMを通じて永続化
- 画面遷移の管理方法：
  - Next.js のページ遷移 + Router

## 2. 実装順序（推奨）
1. データモデル（MangaArticle / AnimeArticleテーブル構造）
2. スクレイピング・取得ロジック実装
3. targetDate自動割り当て（漫画まとめ速報）
4. コピー・削除ボタン実装
5. 画面表示（1日単位テーブル、アニメまとめCH一覧）
6. URL一括開きボタン実装
7. 全件コピーボタン実装（アニメまとめCH）
8. バックアップ機能実装
9. 動作確認・微調整

## 3. 画面別 実装ガイド

### 漫画まとめ速報画面
#### 実装対象
- View：MangaArticleTable
- ViewModel：MangaArticleViewModel

#### 主な処理
- targetDate割り当て（07:00〜21:00、1日15件単位）
- 生成タイトルコピー
- レコード削除
- 1日単位URL一括開き
- DB更新・UI反映

#### 注意点
- 日付降順＋時間昇順で表示
- 重複記事は追加しない
- DBの永続化を優先し、スクレイピング直後に保存

### アニメまとめCH画面
#### 実装対象
- View：AnimeArticleTable
- ViewModel：AnimeArticleViewModel

#### 主な処理
- タイトル・URL一覧取得
- 全件コピー（タイトル,URL形式）
- DB更新・UI反映

#### 注意点
- 日付管理は不要
- コピーは画面上のボタン1つでOK
- 新規記事取得時に重複チェック

## 4. データ更新フロー
1. スクレイピング → 新規記事取得
2. 重複チェック（URL基準）
3. targetDate割り当て（漫画まとめ速報のみ）
4. DB更新（INSERT / UPDATE）
5. UI反映（テーブル再描画）

## 5. エラーハンドリング方針
- 入力エラー：
  - コピー・削除ボタン押下時の例外キャッチ
- データ不整合：
  - targetDateやURL重複チェック
- 想定外ケース：
  - スクレイピング失敗時は警告表示
  - DB接続失敗時はUIに通知

## 6. MVPでは省略する実装
- 通知・リマインド
- Undo / Redo
- クラウド同期

## 7. 実装完了の判定基準
- targetDate割り当てと表示順が正しい
- コピー・削除・URL一括開きが動作
- アニメまとめCHで全件コピーが正しく行える
- DB永続化・重複チェックが正常に機能

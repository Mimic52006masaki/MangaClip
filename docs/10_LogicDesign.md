# ロジック設計書（Logic Design）

本ドキュメントは、漫画まとめ速報およびアニメまとめCHの取得・管理機能を
Node.js + DB 前提で具体的に実装可能なレベルまで落とし込んだ設計書です。
MVP段階での動作を保証することを目的としています。

---

## 1. 漫画まとめ速報 ロジック設計

### 1.1 記事取得フロー
1. DB接続・取得済み記事リストを取得
2. スクレイピング対象サイトURLを決定
   - `siteType = "manga"`
   - URL: 漫画まとめ速報検索ページ
3. `axios` でHTML取得
4. `cheerio` でHTML解析
5. 記事ごとに抽出
   - `originalTitle`（スクレイピング元タイトル）
   - `url`（相対URLの場合は正規化）
6. データを一時配列 `newArticles` に格納

### 1.2 重複チェック
- DBから取得した記事と `url` で比較
- 既存と一致する記事は `newArticles` から削除
- ※仮定: URL完全一致で重複判定

### 1.3 targetDate割り当てロジック
1. DBから最新記事の `targetDate` を取得
   - 例: `latestTargetDate = "01/06 08:00"`
2. 新規記事を逆順または指定順でループ
3. 1日15件単位（07:00〜21:00）で割り振り
4. 最新記事より前の時間帯を埋め、前日分が足りなければ翌日分を使用

#### 疑似コード（Node.js / Date オブジェクト想定）
```js
let latestDate = getLatestTargetDateFromDB(); // Date型
newArticles.forEach(article => {
  let hour = latestDate.getHours() - 1;
  if (hour < 7) {
    latestDate.setDate(latestDate.getDate() - 1);
    hour = 21;
  }
  article.targetDate = new Date(
    latestDate.getFullYear(),
    latestDate.getMonth(),
    latestDate.getDate(),
    hour, 0, 0
  );
  latestDate = article.targetDate;
});

### 1.4 データ永続化

- DBに `originalTitle`, `generatedTitle`, `url`, `targetDate`, `createdAt`, `updatedAt`, `checked` を保存
- `createdAt` と `updatedAt` は自動設定

### 1.5 UI表示順

- 日付降順 + 時間昇順
- 1日単位で 07:00 → 21:00
- 例：
1/7 07:00
...
1/7 21:00
1/6 07:00
...
1/6 21:00

### 1.6 操作ボタンロジック

- 生成タイトルコピー：`navigator.clipboard.writeText(article.generatedTitle)`
- 1件削除：DB削除 → UI更新
- 1日単位URL一括開き：該当日の URL 配列を `window.open(url)` で順次オープン

## 2. アニメまとめCH ロジック設計

### 2.1 記事取得フロー
1. DB接続・取得済み記事リストを取得
2. スクレイピング対象サイトURLを決定
   - `siteType = "anime"`
   - URL: アニメまとめCH検索ページ
3. `axios` でHTML取得
4. `cheerio` でHTML解析
5. 記事ごとに抽出
   - `title`（スクレイピングで取得したタイトル）
   - `url`
6. DB保存前に重複チェック（URL基準）
   - 既存と一致する場合は追加しない
7. DBに保存
   - `createdAt` と `updatedAt` を自動設定

### 2.2 UI操作
- 全件コピーボタン（画面上1つ）
  - 全記事を `title,URL\n` 形式でまとめる
  - `navigator.clipboard.writeText` でクリップボードにコピー
  
## 3. 共通処理

### 3.1 データ整形
- タイトル・URLを正規化
  - 不要な空白・改行の除去
  - URLは絶対パスに変換
- 空行や無効記事を除外

### 3.2 バックアップ
- 保存形式：JSON または CSV（※仮定）
- 処理フロー：
  1. MangaArticle / AnimeArticle の全件取得
  2. JSON.stringify または CSV変換
  3. ファイル名に日付付与（例：backup_YYYYMMDD_HHMM.json）
  4. ローカル保存 or ZIP圧縮（jszip使用可）
- 注意：
  - バックアップ前にUIで確認ダイアログ表示
  - 保存失敗時はエラー通知

### 3.3 エラーハンドリング
- スクレイピング失敗：
  - エラーメッセージ表示
  - UIに空リスト表示
- コピー失敗：
  - アラート表示
- 削除失敗：
  - リトライまたはエラー表示

## 4. データフロー図（疑似）

スクレイピング
      ↓
記事配列（タイトル・URL）
      ↓
重複チェック
      ↓
targetDate割り当て（漫画まとめ速報のみ）
      ↓
DB保存
      ↓
UI表示（テーブル）
      ↓
操作ボタン
  ├─ 生成タイトルコピー
  ├─ 1件削除
  └─ 1日単位URL一括開き

## 5. 注意点・補足

- targetDateは「漫画まとめ速報」のみ適用
- アニメまとめCHは最新順リスト＋全件コピーのみ
- 重複チェックはURL基準で簡易
- 将来的にAIタイトル生成のフックを追加可能
- UI上での表示順を崩さないよう、追加処理後に必ずソート

## 6. targetDate割り当ての特殊ケース

### 6.1 最新記事が07:00のとき
- 追加記事は前日の21:00から逆順に割り当て
- 翌日分の時間帯は新規記事が多すぎる場合のみ使用

### 6.2 1日15件以上追加する場合
- 15件単位で1日を作成
- 残り記事は翌日分として新しい日付で上部に追加

### 6.3 日付・時間の整合性
- 各日付の時間帯は 07:00 → 21:00 の順序を維持
- UI表示では日付降順＋時間昇順に並べる
- 内部DBは昇順でも構わないが、フロント表示時に必ずソート

## 7. コピー処理ロジック

### 7.1 生成タイトルコピー（漫画まとめ速報）
- 個別行の「コピー」ボタン押下で動作
- 処理フロー：
  1. ボタン押下イベント
  2. 該当行の generatedTitle を取得
  3. `navigator.clipboard.writeText(generatedTitle)` でコピー
  4. 成功時はUIに「コピー完了」通知

### 7.2 全件コピー（アニメまとめCH）
- 画面上のボタン1つで全件コピー
- 処理フロー：
  1. 全行データ取得
  2. `タイトル,URL\n` 形式で文字列作成
  3. `navigator.clipboard.writeText` にセット
  4. 成功時はUIに「全件コピー完了」通知

## 8. 削除処理ロジック（漫画まとめ速報）

- 削除ボタン押下で1件削除
- 処理フロー：
  1. ボタン押下イベント
  2. 確認ダイアログ表示（「本当に削除しますか？」）
  3. DBから該当記事を削除
  4. UIリスト更新（表示順は保持）
- 注意：
  - 削除後も targetDate の順序を崩さない
  - バックアップ前に削除確認を推奨

## 9. URL一括開きロジック（漫画まとめ速報）

- 1日単位のURLをブラウザで順番に開く
- 処理フロー：
  1. 日付単位で記事をフィルター
  2. URL配列を作成
  3. 配列をループして `window.open(url)`（Webブラウザ）
     - Electronやデスクトップアプリの場合は `shell.openExternal(url)` を使用
- 注意：
  - ブラウザのポップアップブロックに注意
  - タブを開きすぎないよう間隔調整可（必要に応じ）

## 10. バックアップロジック

- 保存形式：JSON または CSV（※仮定）
- 処理フロー：
  1. MangaArticle / AnimeArticle の全件取得
  2. JSON.stringify または CSV変換
  3. ファイル名に日付を付与（例：backup_YYYYMMDD_HHMM.json）
  4. ローカル保存 or ZIP圧縮（jszip使用可）
- 注意：
  - バックアップ前に UI から確認ダイアログを表示
  - 保存失敗時はエラー通知

## 11. 例外処理・補足

### 11.1 スクレイピング失敗
- HTTPエラー（404, 500など）：
  - リトライ3回まで実施
  - 失敗時は UI に警告表示
- HTML構造変更：
  - データが取得できない場合は空配列返却
  - ログ出力

### 11.2 DB操作失敗
- 接続エラー：
  - 例外キャッチして UI に通知
  - 再試行オプションを提示
- 保存失敗：
  - ロールバック（※仮定: DBではトランザクション利用）
  - UI に警告表示

### 11.3 コピー操作失敗
- クリップボードアクセス失敗：
  - ブラウザ依存による失敗時は通知
  - モバイル環境の場合はコピーできないことを明示

### 11.4 URL一括オープン失敗
- ブラウザのポップアップブロック：
  - ユーザーに事前通知
  - 必要に応じて1件ずつ開く方式にフォールバック

## 12. フローまとめ（疑似コード）

# 漫画まとめ速報取得フロー
newArticles = scrapeMangaArticles()
existingArticles = fetchFromDB(site="manga")
newArticles = removeDuplicates(newArticles, existingArticles)
latestDate = getLatestTargetDate(existingArticles)

for article in newArticles:
    article.targetDate = assignTargetDate(latestDate)
    latestDate = article.targetDate

saveArticlesToDB(newArticles)
sortArticlesForUI()  # 日付降順＋時間昇順

# アニメまとめCH取得フロー
newArticles = scrapeAnimeArticles()
existingArticles = fetchFromDB(site="anime")
newArticles = removeDuplicates(newArticles, existingArticles)
saveArticlesToDB(newArticles)

# コピー処理
clipboardText = "\n".join([f"{a.title},{a.url}" for a in newArticles])
copyToClipboard(clipboardText)

## 13. 補足

- 本設計書に沿って開発すれば、MVP段階で必要なすべての操作（取得・コピー・削除・一括開き・バックアップ）が実装可能
- 将来的にAI生成タイトルや複数サイト追加も、既存フローを拡張する形で対応可能
- targetDate割り当てやUI表示順は漫画まとめ速報専用ロジックで管理
- アニメまとめCHはシンプルなタイトル・URL取得＋全件コピーのみ

## 14. データモデルとの対応

### 14.1 MangaArticle テーブル（漫画まとめ速報）
| カラム名             | 型       | 説明 |
|---------------------|---------|------|
| id                  | int     | 自動採番 |
| originalTitle       | string  | スクレイピングで取得した元のタイトル |
| generatedTitle      | string  | AI生成タイトル（SEO対応） |
| url                 | string  | 記事URL |
| targetDate          | datetime| 表示用・割り当て済み日付 |
| createdAt           | datetime| レコード作成日時 |
| updatedAt           | datetime| レコード更新日時 |
| checked             | boolean | UIチェックボックス状態 |

### 14.2 AnimeArticle テーブル（アニメまとめCH）
| カラム名             | 型       | 説明 |
|---------------------|---------|------|
| id                  | int     | 自動採番 |
| title               | string  | スクレイピングで取得したタイトル |
| url                 | string  | 記事URL |
| createdAt           | datetime| レコード作成日時 |
| updatedAt           | datetime| レコード更新日時 |

## 15. UI操作とデータ連携マッピング

| 操作                           | 対象テーブル        | 処理内容 |
|--------------------------------|-------------------|----------|
| 個別生成タイトルコピー         | MangaArticle       | generatedTitleをコピー |
| 1件削除                        | MangaArticle       | DBから削除、UI更新 |
| 1日単位URL一括開き             | MangaArticle       | targetDate単位でURLを順番にブラウザで開く |
| 全件コピー                      | AnimeArticle       | title,URL形式で全件コピー |
| バックアップ                    | MangaArticle / AnimeArticle | JSON/CSV形式で全件保存 |

## 16. 実装優先度

1. 漫画まとめ速報記事取得・重複チェック・targetDate割り当て
2. MangaArticle UI表示・日付降順＋時間昇順ソート
3. 生成タイトルコピー・1件削除・1日単位URL一括開き
4. アニメまとめCH記事取得・全件コピー
5. バックアップ機能

## 17. 将来的な拡張

- AI生成タイトルの高度なSEO調整
  - タイトルキーワードの自動最適化
  - ユーザー指定のテンプレート適用
- 複数まとめサイトの追加
  - 新規サイトのスクレイピングルールを追加可能
  - サイトごとのテーブル管理
- 日付割り当てのカスタマイズ
  - 時間帯変更（例：06:00〜22:00）
  - 1日あたり記事件数の変更（例：15件以外）
- データベース拡張
  - SQLiteやクラウドDBへの置き換え
  - API共通化によるデータアクセス抽象化
- フロントエンド拡張
  - Next.js + React UI改善
  - モバイル対応
- バックアップ機能強化
  - クラウド保存（Google Drive, OneDrive）
  - 差分バックアップ対応

## 18. 注意事項

- targetDate割り当ては漫画まとめ速報専用
- 1日15件単位でブロック化
- UI表示順は必ず日付降順＋時間昇順
- コピー・削除・一括開きは操作対象が確定しているか確認
- バックアップは必ず操作前に確認ダイアログを表示
- 重複チェックはURL基準で簡易実施
- 大量データ追加時は分割して処理する
- AI生成タイトルはMVPでは必須ではないが、将来的にフックを用意
- アニメまとめCHはtargetDate管理不要、全件コピーのみ実装

## 19. 疑似コード補足（targetDate割り当て）

# 漫画まとめ速報の記事に targetDate を割り当てるロジック例
# ※Python風擬似コード、実装はNode.js/TypeScript想定

def assign_target_dates(existing_articles, new_articles):
    """
    existing_articles: DBに既に保存されている記事リスト（最新記事含む）
    new_articles: スクレイピングで取得した新規記事リスト
    """
    latest_date = get_latest_target_date(existing_articles)  # 最新記事の targetDate を取得

    for article in new_articles:
        # 最新記事より前の時間帯を逆順に割り当て
        hour = latest_date.hour - 1
        if hour < 7:
            # 前日の21:00に戻す
            latest_date = latest_date - timedelta(days=1)
            hour = 21
        article.targetDate = latest_date.replace(hour=hour, minute=0)
        latest_date = article.targetDate

    return new_articles

## 20. エラーハンドリング詳細

### 20.1 スクレイピング関連
- HTTPエラー（404, 500など）：
  - リトライ3回まで実施
  - 失敗時はUIに警告表示
- HTML構造変更：
  - データが取得できない場合は空配列返却
  - ログ出力

### 20.2 DB操作
- 接続エラー：
  - 例外キャッチしてUIに通知
  - 再試行オプションを提示
- 保存失敗：
  - トランザクション的に処理（※仮定: DBの場合はロールバック）
  - UIに警告表示

### 20.3 コピー操作
- クリップボードアクセス失敗：
  - ブラウザ依存による失敗時は通知
  - モバイル環境の場合はコピー不可を明示

### 20.4 URL一括オープン
- ブラウザのポップアップブロック：
  - ユーザーに事前通知
  - 必要に応じて1件ずつ開く方式にフォールバック

## 21. バックアップ・復元フロー

### 21.1 バックアップ作成
1. MangaArticle / AnimeArticle の全件データをDBから取得
2. JSONまたはCSVに変換
3. ファイル名に日付を付与（例：backup_YYYYMMDD_HHMM.json）
4. ローカル保存 or ZIP圧縮（jszip使用可）
5. UIに「バックアップ完了」通知

### 21.2 復元
1. 保存ファイルをユーザーが選択
2. JSON / CSVをパースしてデータ構造に変換
3. DBに既存データを上書きまたは追加
   - 上書きする場合はIDを基準にマージ
4. UIリストを更新して表示
5. 復元完了通知

## 22. まとめ

- 漫画まとめ速報：
  - targetDate割り当て、生成タイトルコピー、削除、1日単位URL一括開き
- アニメまとめCH：
  - タイトル・URL取得、全件コピー
- 共通：
  - バックアップ、エラーハンドリング、重複チェック
- UI表示：
  - 漫画まとめ速報は日付降順＋時間昇順
  - アニメまとめCHは取得順で表示
- 将来的にAI生成タイトルや複数サイト追加も容易に拡張可能

## 23. 実装上の注意事項

- targetDate割り当ては漫画まとめ速報専用
- 1日15件単位でブロック化
- UI表示順は必ず昇順/降順ルールを遵守
- コピー・削除・一括開きは操作対象が確定しているか確認
- バックアップは必ず操作前に確認ダイアログを表示

## 24. デバッグ・テスト方針

### 24.1 ユニットテスト
- targetDate割り当てロジック
  - 最新記事が07:00、21:00の場合の挙動確認
  - 15件単位での日付ブロック作成テスト
- 重複チェック
  - URL・タイトル重複時の除外確認
- コピー・削除・一括URL開き
  - UI操作イベントに応じた正しい挙動の確認

### 24.2 結合テスト
- スクレイピング → DB保存 → UI表示までの一連フロー確認
- MangaArticle と AnimeArticle の並行処理確認
- バックアップ作成・復元フロー確認

### 24.3 UIテスト
- 日付降順＋時間昇順表示
- コピー・削除・一括開きボタンの反応
- エラーメッセージ表示の確認

## 25. 開発上の補足

- 開発順序：
  1. データモデル作成（MangaArticle / AnimeArticle）
  2. スクレイピング機能実装
  3. 重複チェック・targetDate割り当て実装
  4. DB保存・UI表示実装
  5. コピー・削除・一括URL開き・全件コピー実装
  6. バックアップ機能実装
  7. テスト・デバッグ

- 仮定事項：
  - targetDate割り当てロジックは1日15件固定
  - スクレイピング結果は必ずタイトルとURLが存在する
  - UIフレームワークはReact / Next.jsを想定
  - DBはSQLiteやサーバーレスDBを想定し、APIは共通化

- 拡張：
  - 将来的にAI生成タイトルのSEO調整
  - 複数サイトの追加
  - バックアップ形式のクラウド保存
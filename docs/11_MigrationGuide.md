# 既存DBを壊さずに、UI順＝DB順（scrape_index方式）へ移行する手順

## 概要
既存データベースを破壊せずに、UIの表示順序をscrape_indexに基づく方式に移行する実務向けの手順です。一度きりの移行を安全に行います。

## 前提
- 既存データは削除しない
- UIで現在表示されている順序を正解として固定
- 移行は一度きりの作業

## 全体像（移行後のゴール）
- DBはscrape_indexだけでUI順が決まる
- 以後の追加は「前回の最新の上に差し込む」だけ
- id / createdAt / targetDate は順序に使わない

## 手順 0️⃣ 必ずバックアップ（超重要）
```bash
cp mangaclip.db mangaclip.db.bak
```
SQLiteはこれで十分です。これをやらずに進まないでください。

## 手順 1️⃣ scrape_index カラムを追加
```sql
ALTER TABLE manga_articles
ADD COLUMN scrape_index INTEGER;
```
※ まだ NOT NULL にしない（既存データがNULLのため）

## 手順 2️⃣ 「現在のUI表示順」をSQLで再現する
ここが唯一の判断ポイントです。

### あなたの現状から推測できるUI順
- 最新が上
- ほぼ `targetDate DESC`
- 同日内は挿入順（id DESC）

まずはUIと同じ並びになるSQLを作る。

#### 例（※必要に応じて微調整）
```sql
SELECT id
FROM manga_articles
ORDER BY
  targetDate DESC,
  id DESC;
```
この結果を一度UIと見比べてください。
- ここが一致していれば次へ
- ずれていれば ORDER BY を調整

⚠️ ここだけは妥協しないでください。この順が scrape_index の基準になります。

## 手順 3️⃣ 上で得た順序に scrape_index を振る

### 重要なルール
- 一番古い → scrape_index = 1
- 一番新しい → scrape_index = N
- UI表示は `scrape_index DESC`

### 実行用スクリプト（TypeScript / Node）
```ts
import db from './database';

// 1. UI順で取得（最新 → 古い）
const rows = db.prepare(`
  SELECT id
  FROM manga_articles
  ORDER BY targetDate DESC, id DESC
`).all();

// 2. 逆順にして index を付与（古い → 新しい）
let index = 1;
const update = db.prepare(`
  UPDATE manga_articles
  SET scrape_index = ?
  WHERE id = ?
`);

for (const row of rows.reverse()) {
  update.run(index++, row.id);
}

console.log('scrape_index migration completed');
```

## 手順 4️⃣ NULL が残っていないか確認
```sql
SELECT COUNT(*)
FROM manga_articles
WHERE scrape_index IS NULL;
```
0 であることを必ず確認

## 手順 5️⃣ 制約を強くする（仕上げ）
```sql
-- NULL禁止
ALTER TABLE manga_articles
ALTER COLUMN scrape_index SET NOT NULL;
```
SQLiteの都合で直接できない場合は：
- 一旦OK（運用上NULLはもう入らない）
- もしくはテーブル再作成（必要なら手順出します）

## 手順 6️⃣ UI取得を scrape_index に切り替える

### 旧（禁止）
```sql
ORDER BY targetDate DESC, id DESC;
```

### 新（これだけ）
```sql
ORDER BY scrape_index DESC;
```

## 手順 7️⃣ 以後の INSERT ルール（再確認）

### 新規スクレイプ時
1. DBから前回の最新を取得
   ```sql
   SELECT url, scrape_index
   FROM manga_articles
   ORDER BY scrape_index DESC
   LIMIT 1;
   ```
2. スクレイプ配列で URL一致まで slice
3. `scrape_index = max + 1` から順に INSERT

## よくある事故と回避策
### ❌ 途中で scrape_index を再計算
→ UI順が壊れる

### ❌ id を UI順に使い続ける
→ 今回の移行が無意味になる

### ❌ 15件単位ロジックと混同
→ 日付は順序に使わない

## 移行後の状態（完成形）
```
DB上の真実
┌───────────────┐
│ scrape_index  │ ← UI順の唯一の根拠
├───────────────┤
│ id            │ 内部ID
│ targetDate    │ 日付割当
│ createdAt     │ 監査用
└───────────────┘
```

## 最終チェックリスト（これ全部OKなら成功）
- [ ] UI表示が移行前と完全一致
- [ ] `ORDER BY scrape_index DESC` だけで表示
- [ ] 再スクレイプで上にだけ追加される
- [ ] 既存記事が動かない
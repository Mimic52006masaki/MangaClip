module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/Desktop/OriginalApp/MangaClip/lib/database.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$better$2d$sqlite3$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/Desktop/OriginalApp/MangaClip/node_modules/better-sqlite3)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
console.log('Initializing database module');
// Database path
const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'mangaclip.db');
console.log('DB path:', dbPath);
const db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$better$2d$sqlite3$29$__["default"](dbPath);
console.log('DB instance created');
// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');
// Create tables
console.log('Creating tables...');
db.exec(`
  CREATE TABLE IF NOT EXISTS manga_articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    originalTitle TEXT NOT NULL,
    generatedTitle TEXT,
    url TEXT NOT NULL UNIQUE,
    targetDate TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    checked BOOLEAN DEFAULT FALSE
  );

  CREATE TABLE IF NOT EXISTS anime_articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS article_date_tags (
    anchor_post_id INTEGER PRIMARY KEY,
    date TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
// Add post_id column if not exists
try {
    db.exec(`ALTER TABLE manga_articles ADD COLUMN post_id INTEGER;`);
    console.log('Added post_id column');
} catch (error) {
    // Column might already exist, ignore error
    console.log('post_id column already exists or error adding:', error?.message);
}
// Add unique index for post_id if not exists
try {
    db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_manga_articles_post_id ON manga_articles(post_id);`);
    console.log('Created post_id index');
} catch (error) {
    console.log('Index creation error:', error?.message);
}
console.log('Tables created successfully');
// Populate existing data with post_id if not set
try {
    const rows = db.prepare('SELECT id, url FROM manga_articles WHERE post_id IS NULL').all();
    if (rows.length > 0) {
        const update = db.prepare('UPDATE manga_articles SET post_id = ? WHERE id = ?');
        for (const row of rows){
            const match = row.url.match(/\/post\/(\d+)\//);
            if (match) {
                update.run(Number(match[1]), row.id);
            }
        }
        console.log(`Populated post_id for ${rows.length} existing rows`);
    }
} catch (error) {
    console.log('Error populating post_id:', error?.message);
}
const __TURBOPACK__default__export__ = db;
}),
"[project]/Desktop/OriginalApp/MangaClip/app/api/generate-title/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/OriginalApp/MangaClip/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/OriginalApp/MangaClip/lib/database.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'id required'
            }, {
                status: 400
            });
        }
        // Get original title
        const article = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT originalTitle FROM manga_articles WHERE id = ?').get(body.id);
        if (!article) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Article not found'
            }, {
                status: 404
            });
        }
        // Mock AI generation
        const generatedTitle = `${article.originalTitle}`;
        // Update DB
        const result = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare("UPDATE manga_articles SET generatedTitle = ?, updatedAt = datetime('now') WHERE id = ?").run(generatedTitle, body.id);
        if (result.changes === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Update failed'
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            generatedTitle
        });
    } catch (error) {
        console.error('Generate title error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to generate title'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__747e75fd._.js.map
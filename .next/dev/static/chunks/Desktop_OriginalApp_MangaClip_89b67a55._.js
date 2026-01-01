(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/OriginalApp/MangaClip/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Sidebar({ currentPage }) {
    const navItems = [
        {
            href: '/',
            icon: 'home',
            label: 'ホーム',
            page: 'home'
        },
        {
            href: '/manga',
            icon: 'menu_book',
            label: '漫画まとめCH',
            page: 'manga'
        },
        {
            href: '/anime',
            icon: 'movie',
            label: 'アニメまとめCH',
            page: 'anime'
        },
        {
            href: '/backup',
            icon: 'cloud_download',
            label: 'Backup Page',
            page: 'backup'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 transition-transform sm:translate-x-0 hidden md:block",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-col justify-between p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 px-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center rounded-lg bg-[#135bec]/10 p-2 text-[#135bec]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined",
                                    children: currentPage === 'manga' ? 'menu_book' : currentPage === 'anime' ? 'movie' : 'dashboard'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-slate-900 dark:text-white text-base font-bold leading-tight",
                                        children: currentPage === 'manga' ? 'Manga Manager' : currentPage === 'anime' ? 'Anime Manager' : 'Manager'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-500 dark:text-slate-400 text-xs",
                                        children: "v2.5.0"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex flex-col gap-1",
                        children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: item.href,
                                className: `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentPage === item.page ? 'bg-[#135bec]/10 text-[#135bec] font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-xl",
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.page, true, {
                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MangaTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/OriginalApp/MangaClip/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/OriginalApp/MangaClip/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/OriginalApp/MangaClip/components/Sidebar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function MangaTable() {
    _s();
    // --- States ---
    const [articles, setArticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dateTags, setDateTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingTime, setEditingTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editingDateId, setEditingDateId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingDate, setEditingDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedIds, setSelectedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [lastSelectedIndex, setLastSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [generatingId, setGeneratingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingTitleId, setEditingTitleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingTitle, setEditingTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // --- API Functions ---
    const fetchArticles = async ()=>{
        try {
            const response = await fetch('/api/scrape/manga?all=true');
            const data = await response.json();
            if (data.success) {
                setArticles(data.articles);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };
    const fetchDateTags = async ()=>{
        try {
            const response = await fetch('/api/article_date_tags');
            const data = await response.json();
            if (data.success) {
                setDateTags(data.tags);
            }
        } catch (error) {
            console.error('Error fetching date tags:', error);
        }
    };
    const handleScrape = async ()=>{
        setLoading(true);
        try {
            const response = await fetch('/api/scrape/manga', {
                method: 'POST'
            });
            const data = await response.json();
            if (data.success) {
                await fetchArticles();
                await fetchDateTags();
            }
        } catch (error) {
            console.error('Error scraping:', error);
        } finally{
            setLoading(false);
        }
    };
    const handleCopy = async (text)=>{
        try {
            await navigator.clipboard.writeText(text);
        // alert() の代わりになる通知UIが理想的ですが、ロジック維持のため残します
        } catch (error) {
            console.error('Failed to copy');
        }
    };
    const handleUpdateTime = async (id, newTime)=>{
        try {
            const response = await fetch('/api/scrape/manga', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    targetDate: newTime
                })
            });
            const data = await response.json();
            if (data.success) {
                await fetchArticles();
                setEditingId(null);
                setEditingTime('');
            }
        } catch (error) {
            console.error('Update time error:', error);
        }
    };
    const handleDelete = async (id)=>{
        if (!window.confirm('本当に削除しますか？')) return;
        try {
            const response = await fetch('/api/scrape/manga', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });
            if ((await response.json()).success) {
                await fetchArticles();
                await fetchDateTags();
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };
    const handleUpdateDate = async (postId, date)=>{
        try {
            const response = await fetch('/api/article_date_tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    anchor_post_id: postId,
                    date
                })
            });
            if ((await response.json()).success) {
                await fetchDateTags();
                setEditingDateId(null);
                setEditingDate('');
            }
        } catch (error) {
            console.error('Update date error:', error);
        }
    };
    const handleDeleteDate = async (postId)=>{
        if (!window.confirm('この日付を削除しますか？')) return;
        try {
            const response = await fetch('/api/article_date_tags', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    anchor_post_id: postId
                })
            });
            if ((await response.json()).success) {
                await fetchDateTags();
            }
        } catch (error) {
            console.error('Delete date error:', error);
        }
    };
    const handleUpdateTitle = async (id, newTitle)=>{
        try {
            const response = await fetch('/api/scrape/manga', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    generatedTitle: newTitle
                })
            });
            const data = await response.json();
            if (data.success) {
                await fetchArticles();
                setEditingTitleId(null);
                setEditingTitle('');
            }
        } catch (error) {
            console.error('Update title error:', error);
        }
    };
    const handleGenerateTitle = async (id)=>{
        setGeneratingId(id);
        try {
            const response = await fetch('/api/generate-title', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });
            const data = await response.json();
            if (data.success) {
                await fetchArticles();
            } else {
                alert(`タイトル生成エラー: ${data.error || '不明なエラー'}`);
            }
        } catch (error) {
            console.error('Generate title error:', error);
            alert('タイトル生成に失敗しました。ネットワークエラーまたはAPI制限の可能性があります。');
        } finally{
            setGeneratingId(null);
        }
    };
    const handleBulkDelete = async ()=>{
        if (!window.confirm('全ての漫画記事を削除しますか？')) return;
        try {
            const response = await fetch('/api/scrape/manga', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    all: true
                })
            });
            if ((await response.json()).success) {
                await fetchArticles();
                await fetchDateTags();
            }
        } catch (error) {
            console.error('Bulk delete error:', error);
        }
    };
    const handleDeleteSelected = async ()=>{
        if (selectedIds.size === 0) return;
        if (!window.confirm(`${selectedIds.size}件の記事を削除しますか？`)) return;
        try {
            for (const id of selectedIds){
                await fetch('/api/scrape/manga', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id
                    })
                });
            }
            alert(`${selectedIds.size}件の記事を削除しました。`);
            setSelectedIds(new Set());
            await fetchArticles();
            await fetchDateTags();
        } catch (error) {
            console.error('Bulk selection delete error:', error);
        }
    };
    const handleCopySelectedUrls = async ()=>{
        if (selectedIds.size === 0) return;
        const selectedArticles = articles.filter((article)=>selectedIds.has(article.id));
        const urls = selectedArticles.map((article)=>article.url).join('\n');
        try {
            await navigator.clipboard.writeText(urls);
            alert(`${selectedArticles.length}件のURLをクリップボードにコピーしました。`);
        } catch (error) {
            console.error('Copy URLs error:', error);
        }
    };
    const handleCopySelectedOriginalTitles = async ()=>{
        if (selectedIds.size === 0) return;
        const selectedArticles = articles.filter((article)=>selectedIds.has(article.id));
        const titles = selectedArticles.map((article)=>article.originalTitle).join('\n');
        try {
            await navigator.clipboard.writeText(titles);
            alert(`${selectedArticles.length}件のオリジナルタイトルをクリップボードにコピーしました。`);
        } catch (error) {
            console.error('Copy original titles error:', error);
        }
    };
    const handleBulkGenerateTitles = async ()=>{
        if (selectedIds.size === 0) return;
        if (!window.confirm(`${selectedIds.size}件の記事のタイトルを一括生成しますか？`)) return;
        const selectedIdsArray = Array.from(selectedIds);
        let successCount = 0;
        for (const id of selectedIdsArray){
            try {
                await handleGenerateTitle(id);
                successCount++;
                // 少し待機してAPI負荷を下げる
                await new Promise((resolve)=>setTimeout(resolve, 500));
            } catch (error) {
                console.error(`Failed to generate title for ${id}:`, error);
            }
        }
        alert(`${successCount}件のタイトル生成が完了しました。`);
        setSelectedIds(new Set());
    };
    const handleRowClick = (articleId, index, event)=>{
        const isShift = event.shiftKey;
        const isMeta = event.metaKey || event.ctrlKey;
        if (isShift && lastSelectedIndex !== null) {
            // Shift + クリック: 範囲選択
            const start = Math.min(lastSelectedIndex, index);
            const end = Math.max(lastSelectedIndex, index);
            const newSelected = new Set();
            unreadArticles.slice(start, end + 1).forEach((article)=>{
                newSelected.add(article.id);
            });
            setSelectedIds(newSelected);
        } else if (isMeta) {
            // Command/Ctrl + クリック: 個別追加/削除
            const newSelected = new Set(selectedIds);
            if (selectedIds.has(articleId)) {
                newSelected.delete(articleId);
            } else {
                newSelected.add(articleId);
            }
            setSelectedIds(newSelected);
            setLastSelectedIndex(index);
        } else {
            // 通常クリック: トグル
            const newSelected = new Set(selectedIds);
            if (selectedIds.has(articleId)) {
                newSelected.delete(articleId);
            } else {
                newSelected.add(articleId);
            }
            setSelectedIds(newSelected);
            setLastSelectedIndex(index);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MangaTable.useEffect": ()=>{
            fetchArticles();
            fetchDateTags();
        }
    }["MangaTable.useEffect"], []);
    const dateTagMap = new Map();
    dateTags.forEach((tag)=>dateTagMap.set(tag.anchor_post_id, tag.date));
    const unreadArticles = articles.filter((article)=>!article.checked);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen w-full bg-[#f6f6f8] dark:bg-[#101622] font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
                rel: "stylesheet"
            }, void 0, false, {
                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                currentPage: "manga"
            }, void 0, false, {
                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                lineNumber: 336,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 md:ml-64 flex flex-col min-h-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 dark:border-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-slate-900 dark:text-white",
                                children: "漫画まとめ速報 管理"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    selectedIds.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mr-4 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleCopySelectedUrls,
                                                className: "px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all",
                                                children: "URLコピー"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                lineNumber: 345,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleCopySelectedOriginalTitles,
                                                className: "px-3 py-1.5 text-xs font-bold text-purple-600 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all",
                                                children: "オリジナルコピー"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                lineNumber: 346,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleBulkGenerateTitles,
                                                className: "px-3 py-1.5 text-xs font-bold text-green-600 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all",
                                                children: [
                                                    "AI一括生成 (",
                                                    selectedIds.size,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                lineNumber: 347,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleDeleteSelected,
                                                className: "px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all",
                                                children: [
                                                    "選択削除 (",
                                                    selectedIds.size,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                lineNumber: 348,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedIds(new Set()),
                                                className: "px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all",
                                                children: "選択解除"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                lineNumber: 349,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                        lineNumber: 344,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleScrape,
                                        disabled: loading,
                                        className: "flex h-10 items-center gap-2 px-4 rounded-lg bg-[#135bec] text-white text-sm font-bold hover:bg-[#135bec]/90 disabled:opacity-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `material-symbols-outlined text-lg ${loading ? 'animate-spin' : ''}`,
                                                children: "refresh"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                lineNumber: 357,
                                                columnNumber: 15
                                            }, this),
                                            loading ? '取得中...' : '記事取得'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                        lineNumber: 352,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                lineNumber: 342,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-6 md:p-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl flex flex-col gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-slate-500",
                                                    children: "未処理の記事"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mt-2 text-3xl font-bold text-slate-900 dark:text-white",
                                                    children: unreadArticles.length
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                            lineNumber: 368,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-slate-500",
                                                    children: "日付タグ数"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                    lineNumber: 373,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mt-2 text-3xl font-bold text-slate-900 dark:text-white",
                                                    children: dateTags.length
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                            lineNumber: 372,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleBulkDelete,
                                                className: "w-full py-4 text-red-500 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors",
                                                children: "全記事一括削除"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                lineNumber: 377,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                            lineNumber: 376,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                    lineNumber: 367,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-x-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-left text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    className: "bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-4 w-10",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    onChange: (e)=>{
                                                                        if (e.target.checked) setSelectedIds(new Set(unreadArticles.map((a)=>a.id)));
                                                                        else setSelectedIds(new Set());
                                                                    },
                                                                    className: "h-4 w-4 rounded border-slate-300 text-[#135bec]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-6 py-3 font-semibold",
                                                                children: "元記事情報 / 生成タイトル"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                lineNumber: 399,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-6 py-3 font-semibold text-right",
                                                                children: "操作"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                    lineNumber: 387,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    className: "divide-y divide-slate-200 dark:divide-slate-700",
                                                    children: unreadArticles.map((article, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                            children: [
                                                                editingTitleId === article.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "bg-green-50 dark:bg-green-900/10",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        colSpan: 3,
                                                                        className: "p-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-green-200",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-xs font-bold text-green-700 uppercase",
                                                                                    children: "タイトル編集"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 411,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    value: editingTitle,
                                                                                    onChange: (e)=>setEditingTitle(e.target.value),
                                                                                    onKeyDown: (e)=>{
                                                                                        if (e.key === 'Enter') {
                                                                                            handleUpdateTitle(article.id, editingTitle);
                                                                                        }
                                                                                    },
                                                                                    className: "flex-1 rounded-lg border-slate-200 bg-white dark:bg-slate-700 text-sm px-3 py-1.5 focus:ring-[#135bec]",
                                                                                    placeholder: "新しいタイトルを入力"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 412,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>handleUpdateTitle(article.id, editingTitle),
                                                                                    className: "bg-green-600 text-white px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-green-700",
                                                                                    children: "保存"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 424,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>setEditingTitleId(null),
                                                                                    className: "text-slate-400 text-xs font-bold ml-auto hover:text-slate-600",
                                                                                    children: "閉じる"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 425,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                            lineNumber: 410,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                        lineNumber: 409,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                    lineNumber: 408,
                                                                    columnNumber: 27
                                                                }, this),
                                                                editingDateId === article.post_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "bg-amber-50 dark:bg-amber-900/10",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        colSpan: 3,
                                                                        className: "p-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-amber-200",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-xs font-bold text-amber-700 uppercase",
                                                                                    children: "日付設定"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 436,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "date",
                                                                                    value: editingDate,
                                                                                    onChange: (e)=>setEditingDate(e.target.value),
                                                                                    className: "rounded-lg border-slate-200 bg-white dark:bg-slate-700 text-sm px-3 py-1.5 focus:ring-[#135bec]"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 437,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>handleUpdateDate(article.post_id, editingDate),
                                                                                    className: "bg-green-600 text-white px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-green-700",
                                                                                    children: "保存"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 443,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>handleDeleteDate(article.post_id),
                                                                                    className: "bg-red-50 text-red-600 px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-red-100",
                                                                                    children: "タグ削除"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 444,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>setEditingDateId(null),
                                                                                    className: "text-slate-400 text-xs font-bold ml-auto hover:text-slate-600",
                                                                                    children: "閉じる"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 445,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                            lineNumber: 435,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                        lineNumber: 434,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                    lineNumber: 433,
                                                                    columnNumber: 27
                                                                }, this),
                                                                dateTagMap.has(article.post_id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "bg-amber-100 dark:bg-amber-900/20 border-l-4 border-amber-400",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        colSpan: 3,
                                                                        className: "px-6 py-2 text-xs font-bold text-amber-700 dark:text-amber-300",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "material-symbols-outlined text-sm",
                                                                                    children: "calendar_month"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 456,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                dateTagMap.get(article.post_id)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                            lineNumber: 455,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                        lineNumber: 454,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                    lineNumber: 453,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer",
                                                                    onClick: (event)=>handleRowClick(article.id, index, event),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "p-4",
                                                                            onClick: (e)=>e.stopPropagation(),
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "checkbox",
                                                                                checked: selectedIds.has(article.id),
                                                                                onChange: (e)=>{
                                                                                    const newSelected = new Set(selectedIds);
                                                                                    if (e.target.checked) newSelected.add(article.id);
                                                                                    else newSelected.delete(article.id);
                                                                                    setSelectedIds(newSelected);
                                                                                },
                                                                                className: "h-4 w-4 rounded border-slate-300 text-[#135bec]"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                lineNumber: 469,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                            lineNumber: 468,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "px-6 py-4",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "mb-1 text-xs text-slate-400 flex items-center gap-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-slate-300",
                                                                                            children: [
                                                                                                "#",
                                                                                                index + 1
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                            lineNumber: 483,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                                            href: article.url,
                                                                                            target: "_blank",
                                                                                            rel: "noreferrer",
                                                                                            className: "hover:text-[#135bec] truncate max-w-xs",
                                                                                            children: article.url
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                            lineNumber: 484,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 482,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "font-medium text-slate-900 dark:text-white leading-tight mb-2",
                                                                                    children: article.originalTitle
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 486,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: `p-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg font-bold border border-slate-100 dark:border-slate-700 ${article.generatedTitle ? article.generatedTitle !== article.originalTitle ? 'text-green-600' : 'text-slate-500' : 'text-[#135bec]'}`,
                                                                                    children: [
                                                                                        article.generatedTitle || "※ AI未生成",
                                                                                        article.generatedTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                            onClick: ()=>{
                                                                                                setEditingTitleId(article.id);
                                                                                                setEditingTitle(article.generatedTitle);
                                                                                            },
                                                                                            className: "ml-2 text-xs text-slate-400 hover:text-slate-600",
                                                                                            title: "タイトル編集",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "material-symbols-outlined text-base",
                                                                                                children: "edit"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                                lineNumber: 500,
                                                                                                columnNumber: 35
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                            lineNumber: 492,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                    lineNumber: 489,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                            lineNumber: 481,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "px-6 py-4 text-right",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-end gap-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>handleGenerateTitle(article.id),
                                                                                        disabled: generatingId === article.id,
                                                                                        className: `p-2 rounded-lg ${generatingId === article.id ? 'animate-spin text-slate-300' : article.generatedTitle ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-[#135bec] hover:bg-[#135bec]/10'}`,
                                                                                        title: article.generatedTitle ? "AIタイトル再生成" : "AIタイトル生成",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "material-symbols-outlined text-xl",
                                                                                            children: article.generatedTitle ? 'auto_fix_high' : 'auto_fix_high'
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                            lineNumber: 513,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                        lineNumber: 507,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>{
                                                                                            setEditingDateId(article.post_id);
                                                                                            setEditingDate(dateTagMap.get(article.post_id) || '');
                                                                                        },
                                                                                        className: "p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg",
                                                                                        title: "日付タグ設定",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "material-symbols-outlined text-xl",
                                                                                            children: "bookmark"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                            lineNumber: 523,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                        lineNumber: 515,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>handleCopy(article.originalTitle),
                                                                                        className: "p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg",
                                                                                        title: "オリジナルタイトルをコピー",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "material-symbols-outlined text-lg",
                                                                                            children: "content_copy"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                            lineNumber: 530,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                        lineNumber: 525,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>handleCopy(article.generatedTitle || article.originalTitle),
                                                                                        className: `p-2 rounded-lg ${article.generatedTitle ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-slate-300 cursor-not-allowed'}`,
                                                                                        title: article.generatedTitle ? "生成タイトルをコピー" : "生成タイトルなし",
                                                                                        disabled: !article.generatedTitle,
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "material-symbols-outlined text-lg",
                                                                                            children: "content_paste"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                            lineNumber: 538,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                        lineNumber: 532,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>handleDelete(article.id),
                                                                                        className: "p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg",
                                                                                        title: "削除",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "material-symbols-outlined text-xl",
                                                                                            children: "delete"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                            lineNumber: 545,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                        lineNumber: 540,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                                lineNumber: 506,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                            lineNumber: 505,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                                    lineNumber: 464,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, article.id, true, {
                                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                            lineNumber: 405,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                            lineNumber: 386,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                        lineNumber: 385,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                            lineNumber: 364,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx",
        lineNumber: 332,
        columnNumber: 5
    }, this);
}
_s(MangaTable, "O4whLs8ks9c5RvIysuhMf0mLzuo=");
_c = MangaTable;
var _c;
__turbopack_context__.k.register(_c, "MangaTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/OriginalApp/MangaClip/app/manga/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MangaPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/OriginalApp/MangaClip/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$components$2f$MangaTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/OriginalApp/MangaClip/components/MangaTable.tsx [app-client] (ecmascript)");
'use client';
;
;
function MangaPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-4"
            }, void 0, false, {
                fileName: "[project]/Desktop/OriginalApp/MangaClip/app/manga/page.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-bold text-center mb-8",
                children: "漫画まとめ速報"
            }, void 0, false, {
                fileName: "[project]/Desktop/OriginalApp/MangaClip/app/manga/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$OriginalApp$2f$MangaClip$2f$components$2f$MangaTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Desktop/OriginalApp/MangaClip/app/manga/page.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/OriginalApp/MangaClip/app/manga/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = MangaPage;
var _c;
__turbopack_context__.k.register(_c, "MangaPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_OriginalApp_MangaClip_89b67a55._.js.map
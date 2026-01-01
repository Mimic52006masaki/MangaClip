interface SidebarProps {
  currentPage: 'home' | 'manga' | 'anime' | 'backup';
}

export default function Sidebar({ currentPage }: SidebarProps) {
  const navItems = [
    {
      href: '/',
      icon: 'home',
      label: 'ホーム',
      page: 'home' as const
    },
    {
      href: '/manga',
      icon: 'menu_book',
      label: '漫画まとめCH',
      page: 'manga' as const
    },
    {
      href: '/anime',
      icon: 'movie',
      label: 'アニメまとめCH',
      page: 'anime' as const
    },
    {
      href: '/backup',
      icon: 'cloud_download',
      label: 'Backup Page',
      page: 'backup' as const
    }
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 transition-transform sm:translate-x-0 hidden md:block">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2">
            <div className="flex items-center justify-center rounded-lg bg-[#135bec]/10 p-2 text-[#135bec]">
              <span className="material-symbols-outlined">
                {currentPage === 'manga' ? 'menu_book' :
                 currentPage === 'anime' ? 'movie' : 'dashboard'}
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">
                {currentPage === 'manga' ? 'Manga Manager' :
                 currentPage === 'anime' ? 'Anime Manager' : 'Manager'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs">v2.5.0</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.page}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === item.page
                    ? 'bg-[#135bec]/10 text-[#135bec] font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
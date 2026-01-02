'use client';

import React, { useState, useEffect } from 'react';

interface SidebarProps {
  currentPage: 'home' | 'manga' | 'anime' | 'backup';
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt: string | undefined;
}

export default function Sidebar({ currentPage }: SidebarProps) {
  // Todo states
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activePage = currentPage;

  // Load todos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-todos');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load todos:', e);
      }
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-todos', JSON.stringify(todos));
  }, [todos]);

  // Add todos from textarea
  const addTodos = () => {
    if (!inputText.trim()) return;

    const newTodos = inputText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(text => ({
        id: Date.now() + Math.random().toString(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: undefined
      }));

    if (newTodos.length > 0) {
      setTodos(prev => [...newTodos, ...prev]);
      setInputText('');
    }
  };

  // Toggle todo completion
  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date().toISOString() : undefined
          }
        : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Copy todo text
  const copyTodo = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  // Clear completed todos
  const clearCompleted = () => {
    if (window.confirm('完了済みのTodoをすべて削除しますか？')) {
      setTodos(prev => prev.filter(todo => !todo.completed));
    }
  };

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
    <aside className="fixed left-0 top-0 z-40 h-screen w-96 border-r border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 transition-transform sm:translate-x-0 hidden md:flex flex-col">
      <div className="flex h-full flex-col p-6">
        <div className="flex items-center gap-3 px-2 mb-8 mt-2">
          <div className="flex items-center justify-center rounded-lg bg-blue-500/10 p-2">
            <span className="material-symbols-outlined text-blue-500 text-2xl">edit_note</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">MangaClip</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">v1.0.0</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2 mb-1">
          {navItems.map((item) => (
            <a
              key={item.page}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-base ${
                activePage === item.page
                  ? 'bg-blue-500/10 text-blue-500 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-blue-500/10 hover:text-blue-500'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-7 mb-6 px-2">
          <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-3 flex items-center justify-between">
            ToDo
            {todos.some(todo => todo.completed) && (
              <button
                onClick={clearCompleted}
                className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                title="完了済みを削除"
              >
                削除
              </button>
            )}
          </h3>
          <div className="flex flex-col gap-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="新しいタスクを追加しましょう！"
              className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm p-4 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] resize-none"
            />
            <button
              onClick={addTodos}
              disabled={!inputText.trim()}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm"
            >
              タスク確定
            </button>
          </div>
          <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
            {todos
              .sort((a, b) => {
                if (a.completed !== b.completed) {
                  return a.completed ? 1 : -1; // 未完了が先
                }
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // 新しい順
              })
              .map((todo) => (
                <div
                  key={todo.id}
                  className={`group flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                    todo.completed ? 'opacity-60' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700"
                  />
                  <span
                    className={`flex-1 text-slate-900 dark:text-white text-sm ${
                      todo.completed ? 'line-through' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                    {copiedId === todo.id ? (
                      <span className="px-2 py-1 text-xs font-medium text-emerald-600">Copied</span>
                    ) : (
                      <button
                        onClick={() => copyTodo(todo.text, todo.id)}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg dark:hover:bg-blue-900/20 transition-colors"
                        title="コピー"
                      >
                        <span className="material-symbols-outlined text-lg">content_copy</span>
                      </button>
                    )}
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg dark:hover:bg-red-900/20 transition-colors"
                      title="削除"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </aside>
  );
}
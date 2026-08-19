import React from 'react';
import Sidebar from '../components/Sidebar';

export default function MainLayout({ children, title }) {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar réutilisable */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header avec titre dynamique */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>

          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Recherche"
                className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-gray-400 w-64"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
              </button>

              <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-xs font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Zone où s'affiche la page */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
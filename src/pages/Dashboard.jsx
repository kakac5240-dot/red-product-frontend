import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  // Gestion de l'horloge en temps réel
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      id: 1,
      count: '125',
      label: 'Formulaires',
      sublabel: 'Je ne sais pas quoi mettre',
      bgColor: 'bg-purple-500',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 2,
      count: '40',
      label: 'Messages',
      sublabel: 'Je ne sais pas quoi mettre',
      bgColor: 'bg-teal-400',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      id: 3,
      count: '600',
      label: 'Événements',
      sublabel: 'Je ne sais pas quoi mettre',
      bgColor: 'bg-yellow-400',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 4,
      count: '08',
      label: 'Hôtels',
      sublabel: 'Je ne sais pas quoi mettre',
      bgColor: 'bg-red-500',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4" />
        </svg>
      ),
    },
    {
      id: 5,
      count: '40',
      label: 'Entités',
      sublabel: 'Je ne sais pas quoi mettre',
      bgColor: 'bg-purple-600',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: 6,
      count: '02',
      label: 'Équipes',
      sublabel: 'Je ne sais pas quoi mettre',
      bgColor: 'bg-blue-500',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER AVEC BARRE DE RECHERCHE DEVANT L'HORLOGE */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

          <div className="flex items-center gap-6">
            {/* Barre de recherche */}
            <div className="relative">
              <input
                type="text"
                placeholder="Recherche"
                className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-gray-400 w-64 text-gray-700"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Horloge */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{time}</span>
            </div>

            {/* Notifications & Avatar */}
            <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
              <button className="relative text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
              </button>

              <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* CONTENU */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Bienvenue sur RED Product</h2>
            <p className="text-gray-500 text-xs mt-1">
              Lorem ipsum dolor sit amet consectetur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center flex-shrink-0 shadow-inner`}>
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-gray-800">{item.count}</span>
                    <span className="text-sm font-semibold text-gray-600">{item.label}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{item.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
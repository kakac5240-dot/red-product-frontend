// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper pour vérifier si le lien est actif
  const isActive = (path) => location.pathname === path;

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside
      className="w-64 text-white flex flex-col justify-between flex-shrink-0 h-screen select-none"
      style={{
        backgroundImage: `url('/images/bg-pattern.png')`,
        backgroundColor: '#2c3036', // Couleur de secours en cas d'image introuvable
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div>
        {/* LOGO & NOM DU PROJET */}
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <img
            src="/images/logo.png"
            alt="RED PRODUCT Logo"
            className="h-6 w-auto object-contain"
            onError={(e) => {
              // Masque l'image si le chemin est incorrect
              e.target.style.display = 'none';
            }}
          />
          <span className="font-bold text-base tracking-wider text-white">
            RED PRODUCT
          </span>
        </div>

        {/* NAVIGATION PRINCIPALE */}
        <nav className="mt-6 px-4">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-3 px-3">
            Principal
          </p>
          <div className="space-y-1">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                isActive('/dashboard')
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Dashboard
            </Link>

            <Link
              to="/hotels"
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                isActive('/hotels') || isActive('/create-hotel')
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4"
                />
              </svg>
              Liste des hôtels
            </Link>
          </div>
        </nav>
      </div>

      {/* PROFIL UTILISATEUR ET BOUTON DE DÉCONNEXION */}
      <div className="p-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center font-bold text-gray-800 text-xs overflow-hidden">
              SA
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-gray-900 rounded-full"></span>
          </div>
          <div>
            <p className="text-xs font-medium text-white leading-tight">
              Signor Admin
            </p>
            <p className="text-[10px] text-green-400">en ligne</p>
          </div>
        </div>

        {/* Bouton Déconnexion */}
        <button
          onClick={handleLogout}
          title="Se déconnecter"
          className="text-gray-400 hover:text-red-400 transition-colors p-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
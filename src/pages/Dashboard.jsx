import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [hotelCount, setHotelCount] = useState(0);

  useEffect(() => {
    fetch('https://red-product-backend-ddfy.onrender.com/api/hotels')
      .then((res) => res.json())
      .then((data) => setHotelCount(data.length))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const displayCount = hotelCount < 10 ? `0${hotelCount}` : hotelCount;

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* HEADER */}
        <header style={{ 
          height: '64px', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', 
          display: 'flex', alignItems: 'center', padding: '0 32px', width: '100%', boxSizing: 'border-box'
        }}>
          <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Dashboard</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', marginLeft: 'auto' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <svg style={{ position: 'absolute', left: '12px', width: '15px', height: '15px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Recherche" style={{
                padding: '7px 12px 7px 34px', borderRadius: '20px', border: '1px solid #e5e7eb',
                fontSize: '13px', outline: 'none', width: '180px', backgroundColor: '#ffffff', color: '#374151'
              }}/>
            </div>

            <div title="Notifications" style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <svg style={{ width: '22px', height: '22px', fill: '#000000' }} viewBox="0 0 24 24">
                <path d="M12 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 5 14h14a1 1 0 0 0 .707-1.707L19 11.586V8a6 6 0 0 0-6-6zm0 19a3 3 0 0 0 2.816-2H9.184A3 3 0 0 0 12 21z" />
              </svg>
              <span style={{ 
                position: 'absolute', top: '-7px', right: '-8px', backgroundColor: '#f59e0b', 
                color: '#ffffff', fontSize: '11px', fontWeight: '700', borderRadius: '4px', 
                width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>3</span>
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fcd34d', 
                backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100")',
                backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid #e5e7eb'
              }}></div>
              <span style={{ position: 'absolute', bottom: '0px', right: '0px', width: '9px', height: '9px', backgroundColor: '#22c55e', borderRadius: '50%', border: '1.5px solid #ffffff' }}></span>
            </div>

            <button onClick={handleLogout} title="Se déconnecter" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000000', display: 'flex', alignItems: 'center', padding: '2px' }}>
              <svg style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>Bienvenue sur RED Product</h2>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Lorem ipsum dolor sit amet consectetur</p>
          </div>

          {/* GRILLE 3 COLONNES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }}>
            
            {/* 1. Formulaires */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>125</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Formulaires</span>
                </div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0 0' }}>Je ne sais pas quoi mettre</p>
              </div>
            </div>

            {/* 2. Messages */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#14b8a6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>40</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Messages</span>
                </div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0 0' }}>Je ne sais pas quoi mettre</p>
              </div>
            </div>

            {/* 3. Utilisateurs */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>600</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Utilisateurs</span>
                </div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0 0' }}>Je ne sais pas quoi mettre</p>
              </div>
            </div>

            {/* 4. E-mails */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>25</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>E-mails</span>
                </div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0 0' }}>Je ne sais pas quoi mettre</p>
              </div>
            </div>

            {/* Hôtels - DYNAMIQUE */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>{displayCount}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Hôtels</span>
                </div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0 0' }}>Nombre total d'hôtels enregistrés</p>
              </div>
            </div>

            {/* 6. Entités */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>02</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Entités</span>
                </div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0 0' }}>Je ne sais pas quoi mettre</p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
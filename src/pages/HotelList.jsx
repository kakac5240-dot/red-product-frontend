import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AddHotelModal from '../components/AddHotelModal';

const DEFAULT_HOTELS = [
  {
    id: 1,
    name: 'Hôtel Teranga',
    location: 'Boulevard Djily Mbaye, Dakar',
    price: 120000,
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'
  },
  {
    id: 2,
    name: 'King Fahd Palace',
    location: 'Route des Almadies, Dakar',
    price: 150000,
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500'
  },
  {
    id: 3,
    name: 'Radisson Blu Hotel',
    location: 'Route de la Corniche Ouest, Dakar',
    price: 180000,
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500'
  },
  {
    id: 4,
    name: 'Pullman Dakar Teranga',
    location: "Place de l'Indépendance, Dakar",
    price: 140000,
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500'
  },
  {
    id: 5,
    name: 'Hôtel Lac Rose',
    location: 'Niaga, Sénégal',
    price: 60000,
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500'
  },
  {
    id: 6,
    name: 'Hôtel Saly',
    location: 'Station Balnéaire, Saly',
    price: 85000,
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500'
  },
  {
    id: 7,
    name: 'Fathala Wildlife Reserve',
    location: 'Karang, Sénégal',
    price: 190000,
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500'
  },
  {
    id: 8,
    name: 'Lamantin Beach Resort',
    location: 'Saly Portudal, Sénégal',
    price: 165000,
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500'
  }
];

export default function HotelList() {
  const [hotels, setHotels] = useState(DEFAULT_HOTELS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/hotels', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setHotels(data);
          }
        }
      } catch (err) {
        console.log("Utilisation des hôtels par défaut", err);
      }
    };

    fetchHotels();
  }, []);

  const handleCreateHotel = (newHotel) => {
    setHotels((prev) => [newHotel, ...prev]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('blob:')) {
      return imagePath;
    }
    return `http://localhost:8000/storage/${imagePath}`;
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* HEADER SUPERIEUR */}
        <header style={{ 
          height: '64px', 
          backgroundColor: '#ffffff', 
          borderBottom: '1px solid #e5e7eb', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 32px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* TITRE À GAUCHE */}
          <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
            Liste des hôtels
          </h1>

          {/* GROUPE DE DROITE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', marginLeft: 'auto' }}>
            
            {/* RECHERCHE */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <svg 
                style={{ position: 'absolute', left: '12px', width: '15px', height: '15px', color: '#9ca3af' }} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Recherche" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '7px 12px 7px 34px',
                  borderRadius: '20px',
                  border: '1px solid #e5e7eb',
                  fontSize: '13px',
                  outline: 'none',
                  width: '160px',
                  backgroundColor: '#ffffff',
                  color: '#374151'
                }}
              />
            </div>

            {/* NOTIFICATION : CLOCHE NOIRE + BADGE JAUNE CARRÉ ARRONDI AVEC '3' EN BLANC */}
            <div title="Notifications" style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <svg style={{ width: '22px', height: '22px', color: '#000000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              
              <span style={{ 
                position: 'absolute', 
                top: '-7px', 
                right: '-8px', 
                backgroundColor: '#eab308', 
                color: '#ffffff', 
                fontSize: '11px', 
                fontWeight: '700', 
                borderRadius: '5px', 
                width: '17px',
                height: '17px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1'
              }}>
                3
              </span>
            </div>

            {/* AVATAR DE PROFIL AVEC POINT VERT */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                backgroundColor: '#fcd34d', 
                backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid #e5e7eb'
              }}>
              </div>
              <span style={{ 
                position: 'absolute', 
                bottom: '0px', 
                right: '0px', 
                width: '9px', 
                height: '9px', 
                backgroundColor: '#22c55e', 
                borderRadius: '50%', 
                border: '1.5px solid #ffffff' 
              }}></span>
            </div>

            {/* BOUTON DÉCONNEXION NOIR */}
            <button 
              onClick={handleLogout}
              title="Se déconnecter"
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                color: '#000000', 
                display: 'flex', 
                alignItems: 'center', 
                padding: '2px'
              }}
            >
              <svg style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>

          </div>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px', backgroundColor: '#f9fafb' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Hôtels ({filteredHotels.length})</h2>
            
            <button
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: '#1f2937', color: '#ffffff', fontWeight: '500', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', border: 'none', cursor: 'pointer' }}
            >
              + Créer un nouveau hôtel
            </button>
          </div>

          {/* GRILLE D'HÔTELS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '20px'
          }}>
            {filteredHotels.map((hotel, index) => (
              <div 
                key={hotel.id || index} 
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <img 
                  src={getImageUrl(hotel.image)} 
                  alt={hotel.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500';
                  }}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '12px' }}>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: '#ef4444', marginBottom: '2px' }}>
                    {hotel.location}
                  </p>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {hotel.name}
                  </h3>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#111827' }}>
                    {hotel.price} {hotel.currency || 'XOF'} par nuit
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <AddHotelModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onHotelCreated={handleCreateHotel} 
      />
    </div>
  );
}
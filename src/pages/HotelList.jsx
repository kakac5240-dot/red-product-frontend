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
    location: 'Place de l\'Indépendance, Dakar',
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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('blob:')) {
      return imagePath;
    }
    return `http://localhost:8000/storage/${imagePath}`;
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* HEADER */}
        <header style={{ height: '64px', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>Liste des hôtels</h1>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px', backgroundColor: '#f9fafb' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>Hôtels ({hotels.length})</h2>
            
            <button
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: '#1f2937', color: '#ffffff', fontWeight: '500', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', border: 'none', cursor: 'pointer' }}
            >
              + Créer un nouveau hôtel
            </button>
          </div>

          {/* GRILLE D'HÔTELS (4 COLONNES) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '20px'
          }}>
            {hotels.map((hotel, index) => (
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
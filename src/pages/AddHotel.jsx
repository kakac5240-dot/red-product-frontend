import React from 'react';
import Sidebar from '../components/Sidebar';
import HotelForm from '../components/HotelForm';

export default function AddHotel() {
  
  // Fonction pour gérer la redirection ou l'action après ajout
  const handleHotelAdded = () => {
    // Optionnel : Rediriger vers la liste des hôtels après création
    // window.location.href = '/hotels'; 
    console.log("Hôtel créé avec succès, mise à jour de la vue.");
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
      {/* Barre latérale */}
      <Sidebar />

      {/* Contenu principal */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        {/* En-tête de la page */}
        <header style={{ 
          height: '64px', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', 
          display: 'flex', alignItems: 'center', padding: '0 32px' 
        }}>
          <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
            Ajouter un hôtel
          </h1>
        </header>

        {/* Zone de formulaire */}
        <main style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '600px' }}>
            {/* Intégration du composant HotelForm */}
            <HotelForm onHotelAdded={handleHotelAdded} />
          </div>
        </main>
      </div>
    </div>
  );
}
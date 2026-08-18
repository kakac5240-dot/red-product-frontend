import { useState, useEffect } from 'react'
import CreateHotel from './CreateHotel' // Ajuste avec '../components/CreateHotel' si CreateHotel est dans le dossier components

const API_BASE_URL = 'https://red-product-backend-ddfy.onrender.com'

function HotelList() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  
  // État pour ouvrir ou fermer la boîte de dialogue (modal)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Récupérer les hôtels depuis le backend
  const fetchHotels = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/hotels`)
      const data = await response.json()
      if (response.ok) {
        setHotels(data)
      }
    } catch (err) {
      console.error('Erreur lors du chargement des hôtels :', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  // Fonction appelée dès qu'un hôtel est créé avec succès
  const handleHotelAdded = () => {
    fetchHotels() // Rafraîchit automatiquement la liste d'hôtels
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* En-tête avec le bouton */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hôtels</h1>
          <p className="text-sm text-gray-500">
            {hotels.length} hôtel{hotels.length > 1 ? 's' : ''} disponible{hotels.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Clic sur ce bouton -> Ouvre le modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#45484B] hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
        >
          <span className="text-lg font-bold">+</span>
          Créer un nouveau hôtel
        </button>
      </div>

      {/* Affichage des cartes d'hôtels */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Chargement des hôtels...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div 
              key={hotel._id || hotel.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <img
                src={hotel.imageUrl || 'https://via.placeholder.com/400x200'}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-xs text-red-500 font-semibold mb-1">{hotel.address}</p>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{hotel.name}</h3>
                <p className="text-sm font-bold text-gray-900">
                  {hotel.price} {hotel.currency || 'FCFA'} / nuit
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Le Modal de création d'hôtel */}
      <CreateHotel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onHotelAdded={handleHotelAdded}
      />
    </div>
  )
}

export default HotelList
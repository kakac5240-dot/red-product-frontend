import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const API_BASE_URL = 'https://red-product-backend-ddfy.onrender.com'

const FIGMA_IMAGES = {
  'Hôtel Terrou-Bi': '/images/hotel-cart-1.png',
  'King Fahd Palace': '/images/hotel-cart-2.png',
  'Radisson Blu Hotel': '/images/hotel-cart-3.png',
  'Pullman Dakar Teranga': '/images/hotel-cart-4.png',
  'Hôtel Lac Rose': '/images/hotel-cart-5.png',
  'Hôtel Saly': '/images/hotel-cart-6.png',
  'Palm Beach Resort & Spa': '/images/hotel-cart-7.png',
  'Novotel Dakar': '/images/hotel-cart-8.png'
}

function HotelList() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/hotels`)
      .then((res) => res.json())
      .then((data) => {
        setHotels(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const getHotelImage = (hotel, index) => {
    if (FIGMA_IMAGES[hotel.nom]) {
      return FIGMA_IMAGES[hotel.nom]
    }
    if (hotel.photo && !hotel.photo.includes('null')) {
      return hotel.photo.startsWith('http')
        ? hotel.photo
        : `${API_BASE_URL}/storage/${hotel.photo}`
    }
    return `/images/hotel-cart-${(index % 8) + 1}.png`
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Liste des hôtels</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Recherche"
                className="bg-gray-50 text-sm border border-gray-300 rounded-full py-2 px-4 pl-9 focus:outline-none focus:border-gray-400"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Cloche Notifications */}
            <button className="text-gray-500 hover:text-gray-700 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
            </button>

            {/* Avatar Utilisateur */}
            <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden border">
              <img src="https://i.pravatar.cc/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>

            {/* Bouton Se Déconnecter Figma */}
            <button 
              onClick={handleLogout}
              title="Se déconnecter"
              className="text-gray-500 hover:text-red-600 transition-colors ml-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </header>

        {/* Sous-header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-800">Hôtels</h2>
            <span className="text-gray-400 text-lg font-medium">{hotels.length}</span>
          </div>

          <Link
            to="/hotels/create"
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-md text-sm flex items-center gap-2 shadow-sm"
          >
            <span className="text-lg leading-none">+</span> Créer un nouvel hôtel
          </Link>
        </div>

        {/* Grille des cartes */}
        <main className="p-8 flex-1">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Chargement des hôtels...</div>
          ) : hotels.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Aucun hôtel disponible.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {hotels.map((hotel, index) => {
                const id = hotel._id || hotel.id
                return (
                  <div 
                    key={id} 
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
                  >
                    <div className="h-44 w-full bg-gray-200">
                      <img
                        src={getHotelImage(hotel, index)}
                        alt={hotel.nom}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-xs text-red-500 font-medium mb-1 truncate">
                        {hotel.adresse || 'Adresse non spécifiée'}
                      </p>
                      <h3 className="font-bold text-gray-900 text-base mb-1 truncate">
                        {hotel.nom}
                      </h3>
                      <p className="text-xs text-gray-600 mt-auto pt-2">
                        <span className="font-semibold text-gray-900">{hotel.prix_par_nuit} {hotel.devise || 'F XOF'}</span> par nuit
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default HotelList
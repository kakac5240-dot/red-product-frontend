import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function HotelList() {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/hotels')
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-2xl font-bold">Liste des hôtels</h1>
        <Link
          to="/hotels/create"
          className="bg-yellow-600 text-white px-4 py-2 rounded font-medium"
        >
          + Créer un nouvel hôtel
        </Link>
      </div>

      {hotels.length === 0 ? (
        <p className="text-gray-400">Aucun hôtel pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
              {hotel.photo ? (
                <img
                  src={hotel.photo.startsWith('http') ? hotel.photo : `http://127.0.0.1:8000/storage/${hotel.photo}`}
                  alt={hotel.nom}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="h-40 bg-gray-300 flex items-center justify-center text-gray-500">
                  Photo
                </div>
              )}
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{hotel.adresse}</p>
                <h3 className="font-bold mb-1">{hotel.nom}</h3>
                <p className="text-sm text-gray-700">{hotel.prix_par_nuit} {hotel.devise} par nuit</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HotelList
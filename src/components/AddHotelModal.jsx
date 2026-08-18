import { useState, useEffect } from 'react'

const API_BASE_URL = 'https://red-product-backend-ddfy.onrender.com'

// Modèles d'hôtels pré-remplis
const HOTEL_MODELS = [
  {
    name: 'Hôtel Teranga Dakar',
    address: 'Place de l\'Indépendance, Dakar',
    price: '45000',
    currency: 'FCFA',
    email: 'contact@terangadakar.sn',
    phone: '+221 33 889 22 00',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'King Fahd Palace',
    address: 'Pointe des Almadies, Dakar',
    price: '75000',
    currency: 'FCFA',
    email: 'reservation@kingfahdpalace.sn',
    phone: '+221 33 869 69 69',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Pullman Dakar Teranga',
    address: '10 Rue de Thann, Dakar',
    price: '85000',
    currency: 'FCFA',
    email: 'h0563@accor.com',
    phone: '+221 33 889 22 22',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Radisson Blu Hotel Dakar',
    address: 'Route de la Corniche Ouest, Dakar',
    price: '95000',
    currency: 'FCFA',
    email: 'info.dakar@radissonblu.com',
    phone: '+221 33 869 33 33',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Lamantin Beach Resort',
    address: 'Zone Touristique, Saly Portudal',
    price: '65000',
    currency: 'FCFA',
    email: 'resas@lelamantin.com',
    phone: '+221 33 957 07 77',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Rhino Resort Hotel',
    address: 'Saly Niakh Niakhal, Saly',
    price: '55000',
    currency: 'FCFA',
    email: 'contact@rhino-resort.com',
    phone: '+221 33 957 10 10',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Hôtel Le Djoloff',
    address: '7 Rue de Nguinth, Fann Résidence, Dakar',
    price: '38000',
    currency: 'FCFA',
    email: 'info@hotel-djoloff.com',
    phone: '+221 33 825 92 82',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Royam Hotel',
    address: 'BP 112, Saly Portudal',
    price: '50000',
    currency: 'FCFA',
    email: 'royam@royam-hotel.com',
    phone: '+221 33 957 11 81',
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
  },
]

function AddHotelModal({ isOpen, onClose, onHotelAdded }) {
  const [formData, setFormData] = useState(HOTEL_MODELS[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Choisir un modèle parmi les 8 à chaque ouverture du modal
  useEffect(() => {
    if (isOpen) {
      const randomIndex = Math.floor(Math.random() * HOTEL_MODELS.length)
      setFormData(HOTEL_MODELS[randomIndex])
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la création de l'hôtel")
      }

      if (onHotelAdded) onHotelAdded(data)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-gray-100">
        {/* Header Modal */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">
            Créer un nouvel hôtel
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 text-xs p-3 rounded border border-red-200">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Nom de l'hôtel
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Prix par nuit
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Adresse / Emplacement
            </label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                E-mail de contact
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Numéro de téléphone
              </label>
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Devise
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500 bg-white"
            >
              <option value="FCFA">F CFA</option>
              <option value="EUR">Euro (€)</option>
              <option value="USD">Dollar ($)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              URL de l'image de l'hôtel
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-[#45484B] hover:bg-gray-800 text-white rounded text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddHotelModal
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'https://red-product-backend-ddfy.onrender.com'

const DEFAULT_HOTEL = {
  name: 'Hôtel Teranga Dakar',
  address: "Place de l'Indépendance, Dakar",
  price: '45000',
  currency: 'FCFA',
  email: 'contact@terangadakar.sn',
  phone: '+221 33 889 22 00',
  imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
}

function CreateHotel() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(DEFAULT_HOTEL)
  const [imagePreview, setImagePreview] = useState(DEFAULT_HOTEL.imageUrl)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Gestion de la sélection d'image depuis le disque local
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
      setFormData((prev) => ({ ...prev, imageUrl: imageUrl }))
    }
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

      navigate('/hotels')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-md w-full max-w-2xl border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800">Créer un nouvel hôtel</h1>
          <button
            onClick={() => navigate('/hotels')}
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            &larr; Retour aux hôtels
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 text-xs p-3 rounded-lg border border-red-200">
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 bg-white"
            >
              <option value="FCFA">F CFA</option>
              <option value="EUR">Euro (€)</option>
              <option value="USD">Dollar ($)</option>
            </select>
          </div>

          {/* Zone d'insertion d'image */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Ajouter une photo de l'hôtel
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-500 transition-colors bg-gray-50 flex flex-col items-center justify-center cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <div className="relative w-full h-40">
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    Cliquer pour changer
                  </span>
                </div>
              ) : (
                <div className="py-4">
                  <p className="text-sm font-medium text-gray-600">
                    Glissez une image ici ou <span className="text-red-500 underline">parcourez</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG ou WEBP jusqu'à 5Mo</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/hotels')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#45484B] hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateHotel
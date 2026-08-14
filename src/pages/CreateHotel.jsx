import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const API_BASE_URL = 'https://red-product-backend-ddfy.onrender.com'

function CreateHotel() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    email: '',
    telephone: '',
    prix_par_nuit: '',
    devise: 'F XOF'
  })

  const [photo, setPhoto] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Gestion des champs textuels
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Gestion de la sélection de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  // Soumission du formulaire multipart/form-data
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const data = new FormData()
    data.append('nom', formData.nom)
    data.append('adresse', formData.adresse)
    data.append('email', formData.email)
    data.append('telephone', formData.telephone)
    data.append('prix_par_nuit', formData.prix_par_nuit)
    data.append('devise', formData.devise)
    if (photo) {
      data.append('photo', photo)
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/hotels`, {
        method: 'POST',
        body: data // FormData génère automatiquement les bons headers
      })

      if (!res.ok) {
        throw new Error('Erreur lors de la création de l\'hôtel.')
      }

      navigate('/hotels')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Impossible de créer l\'hôtel.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/hotels" className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Créer un nouvel hôtel</h1>
          </div>
        </header>

        {/* Contenu Formulaire */}
        <main className="p-8 flex-1 max-w-4xl">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Nom de l'hôtel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'hôtel
                </label>
                <input
                  type="text"
                  name="nom"
                  required
                  placeholder="ex: RADISSON BLU"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
                />
              </div>

              {/* Adresse */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  name="adresse"
                  required
                  placeholder="ex: Bd Martin Luther King, Dakar"
                  value={formData.adresse}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
                />
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="contact@hotel.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  placeholder="+221 33 000 00 00"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
                />
              </div>

              {/* Prix par nuit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix par nuit
                </label>
                <input
                  type="number"
                  name="prix_par_nuit"
                  required
                  placeholder="25000"
                  value={formData.prix_par_nuit}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
                />
              </div>

              {/* Devise */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Devise
                </label>
                <select
                  name="devise"
                  value={formData.devise}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:ring-2 focus:ring-gray-400 focus:outline-none"
                >
                  <option value="F XOF">F XOF (FCFA)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>

            </div>

            {/* Zone d'upload de la photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ajouter une photo
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition cursor-pointer relative bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {previewUrl ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewUrl}
                      alt="Aperçu"
                      className="h-40 object-cover rounded-lg mb-2 shadow"
                    />
                    <span className="text-xs text-gray-500">Cliquer pour changer la photo</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-4">
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-700">Ajouter une image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG jusqu'à 5 Mo</p>
                  </div>
                )}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
              <Link
                to="/hotels"
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-[#474a4d] hover:bg-gray-800 text-white text-sm font-medium transition disabled:opacity-50"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default CreateHotel
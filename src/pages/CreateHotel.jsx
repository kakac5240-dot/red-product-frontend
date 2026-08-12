import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateHotel() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nom: '',
    adresse: '',
    email: '',
    telephone: '',
    prix_par_nuit: '',
    devise: 'XOF',
  })
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const uploadToCloudinary = async (file) => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'hotel_uploads')

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/f6ys6orz/image/upload',
      { method: 'POST', body: data }
    )
    const result = await response.json()
    return result.secure_url
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      let photoUrl = null
      if (photo) {
        photoUrl = await uploadToCloudinary(photo)
      }

      const response = await fetch('http://127.0.0.1:8000/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ ...form, photo: photoUrl }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la création')
      }

      navigate('/hotels')
    } catch (err) {
      setError('Une erreur est survenue. Vérifiez les champs.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-xl font-bold mb-6">← CRÉER UN NOUVEAU HÔTEL</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Nom de l'hôtel</label>
              <input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                name="adresse"
                value={form.adresse}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Numéro de téléphone</label>
              <input
                type="text"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Prix par nuit</label>
              <input
                type="number"
                name="prix_par_nuit"
                value={form.prix_par_nuit}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Devise</label>
              <select
                name="devise"
                value={form.devise}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="XOF">F XOF</option>
                <option value="EUR">€ EUR</option>
                <option value="USD">$ USD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Ajouter une photo</label>
            <label className="border-2 border-dashed border-gray-300 rounded p-8 text-center text-gray-400 block cursor-pointer">
              {preview ? (
                <img src={preview} alt="Aperçu" className="mx-auto h-32 object-cover rounded" />
              ) : (
                '📷 Ajouter une photo'
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-800 text-white px-6 py-2 rounded font-medium hover:bg-gray-700 disabled:opacity-50"
            >
              {loading ? 'Envoi en cours...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateHotel
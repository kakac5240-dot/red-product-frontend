import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function CreateHotel() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: '',
    adresse: '',
    email: '',
    telephone: '',
    prix_par_nuit: '',
    devise: 'XOF',
  });
  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'hotel_uploads');

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/f6ys6orz/image/upload',
      { method: 'POST', body: data }
    );
    const result = await response.json();
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let photoUrl = null;
      if (photo) {
        photoUrl = await uploadToCloudinary(photo);
      }

      const response = await fetch('https://red-product-backend-ddfy.onrender.com/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ ...form, photo: photoUrl }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création');
      }

      navigate('/hotels');
    } catch (err) {
      setError('Une erreur est survenue. Vérifiez les champs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8">
          <h1 className="text-xl font-bold text-gray-800">Créer un nouveau hôtel</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-gray-50 flex justify-center">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 p-6 self-start">
            <div className="flex items-center gap-4 pb-4 mb-6 border-b border-gray-200">
              <Link to="/hotels" className="text-gray-500 hover:text-gray-700">← Retour</Link>
            </div>

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Nom de l'hôtel</label>
                  <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                    placeholder="ex: CAP SENEGAMBIA"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    value={form.adresse}
                    onChange={handleChange}
                    required
                    placeholder="ex: Dakar"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="ex: contact@hotel.com"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Numéro de téléphone</label>
                  <input
                    type="text"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    required
                    placeholder="ex: +221 77 777 77 77"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Prix par nuit</label>
                  <input
                    type="number"
                    name="prix_par_nuit"
                    value={form.prix_par_nuit}
                    onChange={handleChange}
                    required
                    placeholder="ex: 25000"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Devise</label>
                  <select
                    name="devise"
                    value={form.devise}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="XOF">F XOF</option>
                    <option value="EUR">€ EUR</option>
                    <option value="USD">$ USD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Ajouter une photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative bg-gray-50">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Aperçu" className="h-32 mx-auto rounded-md object-cover" />
                  ) : (
                    <p className="text-sm text-gray-500">Cliquez pour importer une image de votre ordinateur</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-800 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'Envoi en cours...' : 'Enregistrer'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
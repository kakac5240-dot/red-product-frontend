import React, { useState } from 'react';

export default function CreateHotelModal({ isOpen, onClose, onHotelCreated }) {
  const [formData, setFormData] = useState({
    name: 'Hôtel Terrou-Bi',
    location: 'Boulevard Djily Mbaye, Dakar',
    email: 'contact@terroubi.com',
    phone: '+221 33 839 90 00',
    price: '25000',
    currency: 'XOF',
    imageFile: null,
    imagePreview: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      });
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
      if (formData.imageFile) {
        photoUrl = await uploadToCloudinary(formData.imageFile);
      }

      const token = localStorage.getItem('token');
      const response = await fetch('https://red-product-backend-ddfy.onrender.com/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom: formData.name,
          adresse: formData.location,
          email: formData.email,
          telephone: formData.phone,
          prix_par_nuit: formData.price,
          devise: formData.currency,
          photo: photoUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création');
      }

      const newHotel = await response.json();
      onHotelCreated({
        id: newHotel.id,
        name: newHotel.nom,
        location: newHotel.adresse,
        price: newHotel.prix_par_nuit,
        currency: newHotel.devise,
        image: newHotel.photo,
      });
      onClose();
    } catch (err) {
      setError('Une erreur est survenue. Vérifiez les champs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Créer un nouveau hôtel</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Nom de l'hôtel</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Adresse</label>
            <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">E-mail</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Téléphone</label>
              <input type="text" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Prix par nuit</label>
              <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Devise</label>
              <select value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm bg-white">
                <option value="XOF">XOF</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Photo de l'hôtel</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center relative bg-gray-50">
              {formData.imagePreview ? (
                <img src={formData.imagePreview} alt="Preview" className="h-28 mx-auto rounded object-cover" />
              ) : (
                <p className="text-xs text-gray-500">Importer une photo depuis l'ordinateur</p>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg text-sm text-gray-600">Annuler</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 disabled:opacity-50">
              {loading ? 'Envoi...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from 'react';

export default function CreateHotelModal({ isOpen, onClose, onHotelCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    currency: 'XOF',
    imageFile: null,
    imagePreview: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construction du FormData pour l'envoi API
    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('price', formData.price);
    data.append('currency', formData.currency);
    if (formData.imageFile) data.append('image', formData.imageFile);

    onHotelCreated(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Créer un nouveau hôtel</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Nom de l'hôtel</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Emplacement</label>
            <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
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
            <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
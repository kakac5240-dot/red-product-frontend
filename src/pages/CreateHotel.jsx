import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function CreateHotel() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    currency: 'XOF',
    imagePreview: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imagePreview: URL.createObjectURL(file),
      }));
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

            <form onSubmit={(e) => { e.preventDefault(); navigate('/hotels'); }} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Nom de l'hôtel</label>
                  <input type="text" required placeholder="ex: CAP SENEGAMBIA" className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Adresse</label>
                  <input type="text" required placeholder="ex: Dakar" className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>

              {/* CHAMP IMPORTATION FICHIER IMAGE */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Ajouter une photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative bg-gray-50">
                  {formData.imagePreview ? (
                    <img src={formData.imagePreview} alt="Aperçu" className="h-32 mx-auto rounded-md object-cover" />
                  ) : (
                    <p className="text-sm text-gray-500">Cliquez pour importer une image de votre ordinateur</p>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                </div>
              </div>

              <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded-lg text-sm font-medium">
                Enregistrer
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
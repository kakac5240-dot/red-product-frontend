import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terms) {
      setError('Vous devez accepter les termes et conditions.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://red-product-backend-ddfy.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('/images/bg-pattern.png')` }}
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <img 
          src="/images/logo.png" 
          alt="RED PRODUCT Logo" 
          className="h-8 object-contain"
        />
        <h1 className="font-bold text-2xl tracking-wider text-white">
          RED PRODUCT
        </h1>
      </div>

      <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-gray-600 text-sm mb-6 text-center">
          Inscrivez-vous en tant que Admin
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Votre nom complet"
              className="w-full border-b border-gray-300 py-2 text-sm focus:border-[#E2211C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre.email@exemple.com"
              className="w-full border-b border-gray-300 py-2 text-sm focus:border-[#E2211C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full border-b border-gray-300 py-2 text-sm focus:border-[#E2211C] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mr-2 rounded border-gray-300"
              />
              Accepter les termes et conditions
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#45484B] hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg text-sm transition mt-4 shadow-md"
          >
            {loading ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/" className="text-[#E9B949] font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
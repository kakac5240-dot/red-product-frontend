import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
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
    setError('');
    setLoading(true);

    try {
      // Définition de l'URL dynamique (Render en ligne ou Localhost sur ton PC)
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Identifiants incorrects');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('/images/bg-pattern.png')` }}
    >
      {/* Logo et Titre SUR LA PAGE (au-dessus du bloc blanc) */}
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

      {/* Carte blanche du formulaire */}
      <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-gray-600 text-sm mb-6 text-center">
          Connectez-vous en tant que Admin
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2 rounded border-gray-300"
              />
              Garder ma session ouverte
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#45484B] hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg text-sm transition mt-4 shadow-md"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-[#E9B949]">
            <Link to="/forgot-password">Mot de passe oublié ?</Link>
          </p>
          <p className="text-xs text-gray-600">
            Vous n'avez pas de compte ?{' '}
            <Link to="/register" className="text-[#E9B949] font-medium">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
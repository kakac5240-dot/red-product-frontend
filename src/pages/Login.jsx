import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE_URL = 'https://red-product-backend-ddfy.onrender.com'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepConnected, setKeepConnected] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Identifiants incorrects')
      }

      localStorage.setItem('token', data.token)
      if (keepConnected) {
        localStorage.setItem('keepConnected', 'true')
      }

      navigate('/hotels')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-[#45484B] overflow-hidden">
      
      {/* Motifs Géométriques Cercles Figma */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <svg
          className="absolute w-[1200px] h-[1200px] text-white opacity-10"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cercles concentriques géométriques identiques à Figma */}
          <circle cx="500" cy="500" r="100" stroke="currentColor" strokeWidth="30" />
          <circle cx="500" cy="500" r="180" stroke="currentColor" strokeWidth="25" />
          <circle cx="500" cy="500" r="260" stroke="currentColor" strokeWidth="20" />
          <circle cx="500" cy="500" r="340" stroke="currentColor" strokeWidth="15" />
          <circle cx="500" cy="500" r="420" stroke="currentColor" strokeWidth="10" />
          <circle cx="500" cy="500" r="500" stroke="currentColor" strokeWidth="8" />
          <circle cx="500" cy="500" r="580" stroke="currentColor" strokeWidth="5" />
        </svg>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        {/* Logo RED PRODUCT */}
        <div className="flex items-center gap-3 mb-8">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <h1 className="text-2xl font-bold text-white tracking-wide uppercase">
            RED PRODUCT
          </h1>
        </div>

        {/* Carte unique de connexion */}
        <div className="bg-white rounded-md shadow-2xl p-8 w-full">
          <h2 className="text-gray-700 text-sm font-medium mb-6 text-left">
            Connectez-vous en tant que Admin
          </h2>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded mb-4 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                required
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 py-2 text-sm text-gray-800 focus:outline-none focus:border-gray-600 transition-colors"
              />
            </div>

            <div>
              <input
                type="password"
                required
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 py-2 text-sm text-gray-800 focus:outline-none focus:border-gray-600 transition-colors"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepConnected"
                checked={keepConnected}
                onChange={(e) => setKeepConnected(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-0"
              />
              <label htmlFor="keepConnected" className="ml-2 text-xs text-gray-600 select-none">
                Gardez-moi connecté
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#45484B] hover:bg-gray-800 text-white font-medium py-3 rounded text-sm transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>
        </div>

        {/* Liens bas de page */}
        <div className="mt-6 text-center space-y-3">
          <div>
            <Link 
              to="/forgot-password" 
              className="text-yellow-500 text-xs hover:underline font-medium"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="text-xs text-gray-300">
            Vous n'avez pas de compte ?{' '}
            <Link 
              to="/register" 
              className="text-yellow-500 hover:underline font-medium ml-1"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
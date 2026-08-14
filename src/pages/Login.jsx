import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API_BASE_URL = 'https://red-product-backend-ddfy.onrender.com'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Identifiants incorrects.')
      }

      // Stockage du token de connexion si le backend en retourne un
      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      navigate('/hotels')
    } catch (err) {
      console.error(err)
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#474a4d] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        
        {/* Logo RED Product */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#474a4d] rounded flex items-center justify-center font-bold text-white text-sm">
            N
          </div>
          <span className="font-bold text-xl tracking-wide text-gray-900 uppercase">RED PRODUCT</span>
        </div>

        <h2 className="text-center text-lg text-gray-600 mb-6 font-medium">Connectez-vous à votre compte</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="ex: admin@redproduct.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input type="checkbox" className="rounded text-gray-800" />
              Gardez-moi connecté
            </label>
            <a href="#" className="text-gray-500 hover:underline">Mot de passe oublié ?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#474a4d] hover:bg-gray-800 text-white font-medium rounded-lg transition disabled:opacity-50 mt-2"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Vous n'avez pas de compte ?{' '}
          <Link to="/register" className="text-gray-900 font-semibold hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
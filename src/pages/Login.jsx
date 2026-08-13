import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('https://red-product-backend-ddfy.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Identifiants incorrects')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      navigate('/hotels')
    } catch (err) {
      setError('E-mail ou mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🚩</span>
          <h1 className="text-xl font-bold">RED PRODUCT</h1>
        </div>

        <p className="text-gray-600 mb-6">
          Connectez-vous en tant que Admin
        </p>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="keep" />
            <label htmlFor="keep" className="text-sm text-gray-700">
              Gardez-moi connecté
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white rounded py-2 font-medium hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-yellow-600 text-sm mt-4">
          Mot de passe oublié?
        </p>

        <p className="text-center text-sm text-gray-600 mt-2">
          Vous n'avez pas de compte?{' '}
          <span className="text-yellow-600 font-medium">S'inscrire</span>
        </p>
      </div>
    </div>
  )
}

export default Login
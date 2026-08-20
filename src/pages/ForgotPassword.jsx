import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function ForgotPassword() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('https://red-product-backend-ddfy.onrender.com/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Erreur')
      }

      setSuccess(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      setError('E-mail introuvable ou erreur.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{
        backgroundImage: 'url(/images/bg-pattern.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <img src="/images/logo.png" alt="RED PRODUCT" className="h-8" />
          <h1 className="text-xl font-bold text-white">RED PRODUCT</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 mb-6">
            Réinitialiser votre mot de passe
          </p>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-4">Mot de passe mis à jour ! Redirection...</p>}

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
              <label className="block text-sm text-gray-700 mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white rounded py-2 font-medium hover:bg-gray-700 disabled:opacity-50"
            >
              {loading ? 'Envoi...' : 'Réinitialiser'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            <Link to="/" className="text-yellow-600 font-medium">Retour à la connexion</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
import { useNavigate } from 'react-router-dom'

function Navbar({ title }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between shadow-sm">
      {/* Titre de la page */}
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>

      {/* Partie droite */}
      <div className="flex items-center space-x-5">
        
        {/* Recherche */}
        <div className="relative">
          <input
            type="text"
            placeholder="Recherche"
            className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-gray-400 w-56 text-gray-700"
          />
          <span className="absolute left-3 top-2 text-gray-400 text-xs">🔍</span>
        </div>

        {/* Notification Cloche */}
        <div className="relative cursor-pointer text-lg p-1">
          🔔
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-white"></span>
        </div>

        {/* Photo de profil */}
        <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden border border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Profil"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Icône de Déconnexion (Flèche de sortie) */}
        <button
          onClick={handleLogout}
          title="Se déconnecter"
          className="text-gray-600 hover:text-red-600 p-1 rounded-lg transition-colors flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>

      </div>
    </header>
  )
}

export default Navbar
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <aside 
      className="w-64 min-h-screen text-white flex flex-col justify-between p-6 bg-cover bg-center bg-no-repeat bg-[#323537] relative"
      style={{ backgroundImage: "url('/images/bg-pattern.png')" }}
    >
      {/* Superposition sombre pour garder la lisibilité du texte */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10">
        {/* Logo RED PRODUCT */}
        <div className="flex items-center gap-3 mb-10">
          <img 
            src="/images/logo.png" 
            alt="RED PRODUCT Logo" 
            className="w-8 h-8 object-contain" 
          />
          <h1 className="text-lg font-bold tracking-wider uppercase text-white">
            RED PRODUCT
          </h1>
        </div>

        {/* Navigation principale */}
        <div className="mb-6">
          <p className="text-xs uppercase text-gray-400 font-semibold mb-4 tracking-wider">
            Principal
          </p>
          <nav className="space-y-1">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </Link>

            <Link
              to="/hotels"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive('/hotels')
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Liste des hôtels
            </Link>
          </nav>
        </div>
      </div>

      {/* Profil Utilisateur (Bas de Sidebar) */}
      <div className="relative z-10 pt-4 border-t border-gray-700/50 flex items-center gap-3">
        <div className="relative">
          <img
            src="https://i.pravatar.cc/100"
            alt="Mouhamet Badiane"
            className="w-10 h-10 rounded-full object-cover border border-gray-500"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#323537] rounded-full"></span>
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold truncate text-white">Mouhamet Badiane</p>
          <p className="text-xs text-green-400 font-medium">en ligne</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <div className="w-64 bg-[#45484B] text-white flex flex-col justify-between min-h-screen">
      <div>
        {/* Logo RED Product */}
        <div className="p-6 flex items-center space-x-3 border-b border-gray-600">
          <span className="font-bold text-lg tracking-wider text-white">RED PRODUCT</span>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <p className="px-6 text-xs text-gray-400 uppercase tracking-wider mb-2">Principal</p>
          <Link
            to="/dashboard"
            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
              isActive('/dashboard') ? 'bg-gray-700 text-white border-l-4 border-red-500' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/hotels"
            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
              isActive('/hotels') ? 'bg-gray-700 text-white border-l-4 border-red-500' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Liste des hôtels
          </Link>
        </nav>
      </div>

      {/* Profil Bas de Sidebar */}
      <div className="p-4 border-t border-gray-600 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-sm">
          A
        </div>
        <div>
          <p className="text-sm font-semibold">Administrateur</p>
          <p className="text-xs text-green-400">● En ligne</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
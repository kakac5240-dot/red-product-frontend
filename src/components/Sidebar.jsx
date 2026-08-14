import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="w-64 bg-[#474a4d] text-white flex flex-col justify-between min-h-screen p-4 flex-shrink-0 font-sans">
      <div>
        {/* LOGO EXACT RED PRODUCT DE VOTRE CAPTURE */}
        <div className="flex items-center gap-3 mb-8 px-2 pt-2">
          <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
              {/* Forme gauche */}
              <polygon points="15,85 15,30 50,65 50,85" fill="currentColor" />
              {/* Forme droite */}
              <polygon points="50,65 85,30 85,85" fill="currentColor" />
            </svg>
          </div>
          <span className="font-bold text-base tracking-wider text-white uppercase">
            RED PRODUCT
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-6">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-3 px-2">Principal</p>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-white text-gray-900' 
                        : 'text-gray-300 hover:bg-gray-600/50 hover:text-white'
                    }`
                  }
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hotels"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-white text-gray-900' 
                        : 'text-gray-300 hover:bg-gray-600/50 hover:text-white'
                    }`
                  }
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V11m0 0h5m-5 0H7" />
                  </svg>
                  Liste des hôtels
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Profil Utilisateur */}
      <div className="pt-4 border-t border-gray-600/40 flex items-center gap-3 px-2">
        <div className="relative w-10 h-10 rounded-full bg-gray-500 overflow-hidden flex-shrink-0">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Mohamed Pouye"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-white truncate">Mohamed Pouye</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-gray-400">en ligne</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
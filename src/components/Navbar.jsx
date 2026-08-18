import { useNavigate } from 'react-router-dom'

function Navbar({ title }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="text-xs text-red-600 font-semibold border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </header>
  )
}

export default Navbar
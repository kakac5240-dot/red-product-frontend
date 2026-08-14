import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import HotelList from './pages/HotelList'
import CreateHotel from './pages/CreateHotel'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection automatique vers la page de connexion */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Application */}
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/create" element={<CreateHotel />} />

        {/* Redirection par défaut pour les routes non trouvées */}
        <Route path="*" element={<Navigate to="/hotels" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
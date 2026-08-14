import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import HotelList from './pages/HotelList'
import CreateHotel from './pages/CreateHotel'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/create" element={<CreateHotel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
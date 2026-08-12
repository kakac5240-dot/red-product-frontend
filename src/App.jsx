import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import HotelList from './pages/HotelList'
import CreateHotel from './pages/CreateHotel'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/create" element={<CreateHotel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
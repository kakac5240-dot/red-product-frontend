import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddHotel from './pages/AddHotel';
import HotelList from './pages/HotelList';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Route pour ajouter un hôtel */}
        <Route path="/hotels/add" element={<AddHotel />} />
        
        {/* Route pour afficher la liste des hôtels */}
        <Route path="/hotels" element={<HotelList />} />
        
        {/* Redirection par défaut vers le dashboard */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; // Assure-toi que le chemin d'accès vers Login est correct
import Dashboard from './pages/Dashboard';
import AddHotel from './pages/AddHotel';
import HotelList from './pages/HotelList';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la page de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Routes protégées de ton application */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels/add" element={<AddHotel />} />
        <Route path="/hotels" element={<HotelList />} />
        
        {/* Redirection par défaut : si on arrive sur l'accueil (/), on va vers /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Route par défaut pour les URL introuvables */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
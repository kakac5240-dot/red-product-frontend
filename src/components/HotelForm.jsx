import React, { useState } from 'react';

export default function HotelForm() {
  const [formData, setFormData] = useState({
    name: '', address: '', email: '', phone: '', price: '', currency: 'XOF', photo: null
  });

  const inputStyle = {
    width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db',
    fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#f9fafb'
  };

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '40px auto' }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', fontWeight: '600' }}>
        ← CRÉER UN NOUVEAU HÔTEL
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>Nom de l'hôtel</label>
          <input type="text" style={inputStyle} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>Adresse</label>
          <input type="text" style={inputStyle} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>E-mail</label>
          <input type="email" style={inputStyle} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>Numéro de téléphone</label>
          <input type="tel" style={inputStyle} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>Prix par nuit</label>
          <input type="text" style={inputStyle} value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>Devise</label>
          <select style={inputStyle} value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})}>
            <option>F XOF</option>
            <option>EUR</option>
            <option>USD</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>Ajouter une photo</label>
        <div style={{ border: '2px dashed #d1d5db', borderRadius: '8px', padding: '40px', textAlign: 'center', backgroundColor: '#f9fafb', color: '#9ca3af' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ margin: '0 auto 10px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <p style={{ fontSize: '12px', margin: 0 }}>Ajouter une photo</p>
        </div>
      </div>

      <button style={{ marginTop: '20px', width: '100%', padding: '12px', backgroundColor: '#374151', color: '#ffffff', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
        Enregistrer
      </button>
    </div>
  );
}
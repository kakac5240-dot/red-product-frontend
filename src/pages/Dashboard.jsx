import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function Dashboard() {
  const [hotelsCount, setHotelsCount] = useState(0)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('https://red-product-backend-ddfy.onrender.com/api/hotels')
        const data = await response.json()
        const list = Array.isArray(data) ? data : data.hotels || []
        setHotelsCount(list.length)
      } catch (err) {
        console.error(err)
      }
    }
    fetchHotels()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Dashboard" />
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Bienvenue sur RED Product</h2>
            <p className="text-sm text-gray-500">Vue d'ensemble de votre plateforme de gestion hôtelière.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold">
                🏨
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Hôtels inscrits</p>
                <h3 className="text-2xl font-bold text-gray-800">{hotelsCount}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                💬
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Messages reçus</p>
                <h3 className="text-2xl font-bold text-gray-800">12</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl font-bold">
                👥
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Utilisateurs actifs</p>
                <h3 className="text-2xl font-bold text-gray-800">3</h3>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
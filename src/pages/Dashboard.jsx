function Dashboard() {
  const stats = [
    { label: 'réservations', value: 125, color: 'bg-purple-500', icon: '📋' },
    { label: 'messages', value: 40, color: 'bg-green-500', icon: '✉️' },
    { label: 'utilisateurs', value: 600, color: 'bg-orange-500', icon: '👥' },
    { label: 'étoiles', value: 25, color: 'bg-red-500', icon: '⭐' },
    { label: 'hôtels', value: 40, color: 'bg-purple-500', icon: '🏨' },
    { label: 'entités', value: 2, color: 'bg-blue-500', icon: '🏢' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-white text-2xl font-bold mb-2">Dashboard</h1>
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-1">Bienvenue sur RED Product</h2>
        <p className="text-gray-500 text-sm">
          Lorem ipsum dolor sit amet consectetur
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-lg p-4 flex items-center gap-4">
            <div className={`${stat.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="font-bold text-lg">
                {stat.value} <span className="font-normal text-sm">{stat.label}</span>
              </p>
              <p className="text-xs text-gray-400">Lorem ipsum dolor</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
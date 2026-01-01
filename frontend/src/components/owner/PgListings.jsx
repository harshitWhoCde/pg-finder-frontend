import React, { useState, useEffect } from 'react';
import { Bell, ArrowLeft, LogOut, X, MapPin, Home, Plus, Search, Edit, Loader2 } from 'lucide-react';

export default function MyPGsListPage({ onBack, onEdit, user, onNavigateToAdd }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwnerPGs();
  }, []);

  const fetchOwnerPGs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8080/api/v1/property/owner-properties', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setPgs(data.properties);
      }
    } catch (error) {
      console.error("Error fetching PGs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPGs = pgs.filter(pg => {
    return (pg.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
           (pg.city || "").toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              PG
            </div>
            <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">PGBuddy</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'O'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My PGs</h2>
            <p className="text-gray-600 mt-2">Manage all your property listings</p>
          </div>
          <button 
            onClick={onNavigateToAdd}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md font-semibold flex items-center gap-2"
          >
            <Plus size={20} /> Add New PG
          </button>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 relative w-full">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search by PG name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-100 hidden md:block">
              <span className="text-blue-700 font-semibold">Total: {pgs.length} PGs</span>
            </div>
          </div>
        </div>

        {/* Data Display */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="mt-4 text-gray-600">Loading your listings...</p>
          </div>
        ) : filteredPGs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPGs.map(pg => (
              <div key={pg._id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                
                {/* Image Section (No Badge) */}
<div className="h-48 bg-gray-200 relative overflow-hidden">
  {pg.photos && pg.photos.length > 0 ? (
    <img 
      src={
        // Check if the photo is already a full URL or a Base64 string
        pg.photos[0].startsWith('http') || pg.photos[0].startsWith('data:')
          ? pg.photos[0] 
          : `http://localhost:8080/${pg.photos[0]}`
      } 
      alt={pg.title} 
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      // Added an onError to show a fallback if the link is broken
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
      }}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
      <Home size={40} />
    </div>
  )}
</div>

                {/* Content Section */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{pg.title}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-4 truncate">
                    <MapPin size={14} className="text-blue-600 flex-shrink-0" /> {pg.address}, {pg.city}
                  </p>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Home size={16} className="text-purple-600" />
                      <span className="text-sm font-medium">{pg.occupancy || 'N/A'} Peoples</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">₹{pg.rent?.toLocaleString()}</span>
                  </div>

                  <button 
                  onClick={() => onEdit(pg)}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-95">
                    <Edit size={18} /> Edit Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <Home className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-900">No properties found</h3>
            <p className="text-gray-500 mt-2 mb-6">Start growing your business by adding your first PG!</p>
            <button 
              onClick={onNavigateToAdd}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center gap-2 mx-auto"
            >
              <Plus size={20} /> Add Your First PG
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
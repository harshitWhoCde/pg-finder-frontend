import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Wifi, Phone, LogOut, Search, Home, Filter } from 'lucide-react';

const StudentDashboard = ({ user, onLogout }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch Properties from Backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/property/get-all');
        if (res.data.success) {
          setProperties(res.data.properties);
        }
      } catch (error) {
        console.error("Error fetching PGs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter logic (Client-side simple search)
  const filteredProperties = properties.filter(pg => 
    pg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pg.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- Navbar --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                <Home className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-gray-800 tracking-tight">UniStays</span>
            </div>
            
            {/* User Profile & Logout */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
                <span className="text-xs text-gray-500 capitalize">{user?.role} Account</span>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search Header */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find your perfect stay</h1>
              <p className="text-gray-600 mt-1">Explore verified PGs and hostels near your campus.</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center max-w-2xl">
            <div className="pl-4 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search by PG name, city, or location..." 
              className="w-full px-4 py-3 outline-none text-gray-700 placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* --- Listings Grid --- */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Properties Found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mt-2">
              {searchTerm 
                ? `We couldn't find any PGs matching "${searchTerm}".` 
                : "It looks like no owners have listed properties yet. Check back later!"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((pg) => (
              <div key={pg._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer">
                
                {/* Image Section */}
                <div className="h-56 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={pg.photos?.[0] ? `http://localhost:8080/${pg.photos[0]}` : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                    alt={pg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }} // Fallback image
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm uppercase tracking-wide">
                    {pg.type}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-lg text-white text-xs font-medium flex items-center gap-1">
                     <Wifi className="w-3 h-3" /> Verified Owner
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-xl text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {pg.title}
                      </h3>
                      <span className="flex items-center gap-1 text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md">
                        4.5 ★
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      {pg.city} • {pg.distanceToCollege}km to college
                    </div>
                  </div>

                  {/* Amenities Tags */}
                  <div className="flex flex-wrap gap-2">
                    {pg.amenities?.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="bg-gray-50 border border-gray-100 px-2 py-1 rounded-md text-xs font-medium text-gray-600">
                        {amenity}
                      </span>
                    ))}
                    {pg.amenities?.length > 3 && (
                      <span className="bg-gray-50 border border-gray-100 px-2 py-1 rounded-md text-xs font-medium text-gray-400">
                        +{pg.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">₹{pg.rent}</span>
                      <span className="text-gray-400 text-sm font-medium">/month</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
                      <Phone className="w-4 h-4" /> Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
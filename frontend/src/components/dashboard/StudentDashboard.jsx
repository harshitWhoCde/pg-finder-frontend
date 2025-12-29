import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Home, Search, MapPin, Star, ChevronDown, Wifi, Wind, Utensils, Dumbbell, ShieldCheck, CheckCircle2, LogOut, Filter } from 'lucide-react';

const StudentDashboard = ({ user, onLogout }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // --- 1. Fetch Data from Backend ---
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

  // --- 2. Filter Logic ---
  const toggleFilter = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredProperties = properties.filter(pg => {
    // Search Filter
    const matchesSearch = pg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pg.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Amenity Filter (Simple check if string exists in amenities array)
    const matchesAmenities = selectedFilters.every(filter => 
      pg.amenities?.includes(filter)
    );

    return matchesSearch && matchesAmenities;
  });

  const getInitials = (name) => name ? name.substring(0, 2).toUpperCase() : "US";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- Sticky Navbar --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">PG Buddy</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-full transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {getInitials(user?.name)}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Search Section --- */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white border-b border-gray-100 pb-12 pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Find your perfect home near campus
            </h1>
            <p className="text-lg text-gray-600">
              Discover verified student accommodations with all the amenities you need.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex items-center">
            <div className="pl-4 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search by college, city, or area..." 
              className="w-full px-4 py-3 outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/30">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* --- Filters Row --- */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex gap-3 overflow-x-auto scrollbar-hide">
           {[
             { id: 'WiFi', icon: Wifi }, 
             { id: 'AC', icon: Wind }, 
             { id: 'Food', icon: Utensils },
             { id: 'Gym', icon: Dumbbell }
           ].map(f => (
             <button 
               key={f.id}
               onClick={() => toggleFilter(f.id)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                 selectedFilters.includes(f.id) 
                 ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                 : 'bg-white text-gray-600 border-gray-200 hover:border-blue-500 hover:text-blue-600'
               }`}
             >
               <f.icon className="w-4 h-4" /> {f.id}
             </button>
           ))}
        </div>
      </div>

      {/* --- Property Grid --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-gray-400"/></div>
            <h3 className="text-lg font-bold text-gray-900">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((pg) => (
              <div key={pg._id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img 
                    src={pg.photos?.[0] ? `http://localhost:8080/${pg.photos[0]}` : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"} 
                    alt={pg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => e.target.src = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-green-700 flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{pg.title}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-current" /> 4.8
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {pg.city} • {pg.distanceToCollege}km to college
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">₹{pg.rent}</span>
                      <span className="text-xs text-gray-500 font-medium">/month</span>
                    </div>
                    <button className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-gray-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
import React, { useState, useEffect } from 'react';
import { Bell, Bookmark, FileText, Search, MapPin, Wifi, UtensilsCrossed, Snowflake, X, ArrowRight, LogOut, ChevronDown, Home, Star, CheckCircle2, Wind, Utensils, Dumbbell } from 'lucide-react';

// 👇 FIX 1: Add 'onViewApplications' here
const EnhancedStudentDashboard = ({ user, onLogout, onViewDetails, onViewApplications,onViewBookmarks }) => {
  
  // ... (State and Effects remain exactly the same) ...
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [collegeDropdown, setCollegeDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    budget: [0, 100000],
    facilities: [],
    gender: 'Any',
    roomtype: 'Any'
  });
  const [savedPGs, setSavedPGs] = useState([]);

  const colleges = ['IIT Delhi', 'Delhi University', 'NSIT Delhi', 'IP University'];
  const facilities = ['WiFi', 'Food', 'AC', 'Laundry', 'Parking', 'Security'];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedPGs') || '[]');
    setSavedPGs(saved);
  }, []);

  const toggleSavePG = (e, pgId) => {
    e.stopPropagation();
    const updatedSaved = savedPGs.includes(pgId)
      ? savedPGs.filter(id => id !== pgId)
      : [...savedPGs, pgId];
    setSavedPGs(updatedSaved);
    localStorage.setItem('savedPGs', JSON.stringify(updatedSaved));
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/v1/property/get-all');
        const data = await res.json();
        if (data.success) {
          setProperties(data.properties);
        }
      } catch (error) {
        console.error("Error fetching PGs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchStudentNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch('http://localhost:8080/api/v1/application/student-applications', {
          headers: { 'Authorization': token } // Fixed Header format
        });
        const data = await res.json();
        if (data.success) {
          const dynamicNotifications = data.applications.map(app => ({
            id: app._id,
            type: 'application',
            message: app.status === 'PENDING' 
              ? `Application for ${app.property?.title} is under review.`
              : `Your application for ${app.property?.title} has been ${app.status.toLowerCase()}!`,
            time: new Date(app.updatedAt).toLocaleDateString(),
            status: app.status
          }));
          setNotifications(dynamicNotifications);
        }
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };
    if (user) fetchStudentNotifications();
  }, [user]);

  useEffect(() => {
    if (selectedCollege === '' && colleges.length > 0) {
      setSelectedCollege(colleges[0]);
    }
  }, []);

  const filteredProperties = properties.filter(pg => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = pg.title?.toLowerCase().includes(query) || 
                          pg.city?.toLowerCase().includes(query);
    const priceMatch = pg.rent >= searchFilters.budget[0] && pg.rent <= searchFilters.budget[1];
    const facilitiesMatch = searchFilters.facilities.length === 0 || 
      searchFilters.facilities.every(f => pg.amenities?.includes(f));
    const genderMatch = searchFilters.gender === 'Any' || 
                       pg.genderPreference === 'Any' || 
                       pg.genderPreference === searchFilters.gender;
    return matchesSearch && priceMatch && facilitiesMatch && genderMatch;
  });

  const handleBudgetChange = (value) => {
    setSearchFilters({ ...searchFilters, budget: value });
  };

  const toggleFacility = (facility) => {
    const newFacilities = searchFilters.facilities.includes(facility)
      ? searchFilters.facilities.filter(f => f !== facility)
      : [...searchFilters.facilities, facility];
    setSearchFilters({ ...searchFilters, facilities: newFacilities });
  };

  const getInitials = (name) => name ? name.substring(0, 2).toUpperCase() : "US";

  const getFacilityIcon = (facility) => {
    const iconMap = {
      'WiFi': <Wifi size={14} />,
      'Food': <Utensils size={14} />,
      'AC': <Snowflake size={14} />,
      'Wind': <Wind size={14} />,
      'Laundry': <UtensilsCrossed size={14} />,
    };
    return iconMap[facility];
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              <Home className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">PG Buddy</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Bell size={24} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  <div className="p-4 border-b border-gray-200 sticky top-0 bg-gray-50 rounded-t-xl flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)} className="text-gray-500 hover:text-gray-700">
                      <X size={18} />
                    </button>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No notifications</div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors relative">
                        <div className="flex gap-3">
                          <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 bg-blue-500`} />
                          <div>
                            <p className="text-sm text-gray-800 leading-snug font-medium">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow"
              >
                {getInitials(user?.name)}
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                  <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* 👇 FIX 2: Connect the button here */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">My Applications</h3>
                <p className="text-blue-100 text-sm">Track your pending requests</p>
              </div>
              <FileText size={32} className="group-hover:scale-110 transition-transform" />
            </div>
            <button 
              onClick={onViewApplications} 
              className="mt-4 flex items-center gap-2 text-sm font-semibold bg-white bg-opacity-30 hover:bg-opacity-40 text-blue-600 rounded-lg px-3 py-2 transition-all"
            >
              View Applications <ArrowRight size={16} />
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Saved PGs</h3>
                <p className="text-purple-100 text-sm">{savedPGs.length} bookmarked</p>
              </div>
              <Bookmark size={32} className="group-hover:scale-110 transition-transform" />
            </div>
            <button
            onClick={onViewBookmarks}
            className="mt-4 flex items-center gap-2 text-sm font-semibold bg-white bg-opacity-30 hover:bg-opacity-40 text-purple-600 rounded-lg px-3 py-2 transition-all">
              View Bookmarks <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Search Section (Simplified for brevity, logic remains same) */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 mb-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Search PGs Near Your College</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search by PG Name or City</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Try 'Standard PG' or 'Delhi'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 border-2 border-blue-100 rounded-xl bg-white text-gray-900 focus:border-blue-500 outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500">
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Budget: ₹{searchFilters.budget[0]} - ₹{searchFilters.budget[1]}</label>
                <input 
                  type="range" min="5000" max="50000" step="1000"
                  value={searchFilters.budget[1]}
                  onChange={(e) => handleBudgetChange([searchFilters.budget[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Gender Preference</label>
                <div className="flex gap-2">
                  {['Any', 'Male', 'Female'].map(gender => (
                    <button
                      key={gender}
                      onClick={() => setSearchFilters({ ...searchFilters, gender })}
                      className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                        searchFilters.gender === gender ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PGs Grid */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Available PGs</h3>
          {loading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-gray-400"/></div>
              <h3 className="text-lg font-bold text-gray-900">No properties found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProperties.map(pg => (
                <div key={pg._id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer group border border-gray-200">
                  <div className="relative h-32 bg-gray-200 overflow-hidden">
                    <img 
                      src={pg.photos?.[0] ? (pg.photos[0].startsWith('http') ? pg.photos[0] : `http://localhost:8080/${pg.photos[0]}`) : "https://via.placeholder.com/400x200"} 
                      alt={pg.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x200"; }}
                    />
                    <button 
                      onClick={(e) => toggleSavePG(e, pg._id)}
                      className={`absolute top-2 left-2 p-2 rounded-full backdrop-blur-md transition-all ${savedPGs.includes(pg._id) ? 'bg-blue-600 text-white' : 'bg-white/80 text-gray-600'}`}
                    >
                      <Bookmark size={16} fill={savedPGs.includes(pg._id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-gray-900 line-clamp-1">{pg.title}</h4>
                      <div className="flex items-center gap-1 text-xs font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-current" /> 4.8
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1 mb-3">
                      <MapPin size={14} /> {pg.city} • {pg.distanceToCollege}km
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <p className="text-lg font-bold text-blue-600">₹{pg.rent}</p>
                      <button onClick={() => onViewDetails(pg)} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EnhancedStudentDashboard;
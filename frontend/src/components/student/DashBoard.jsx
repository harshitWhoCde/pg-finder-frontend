import React, { useState } from 'react';
import { Bell, Bookmark, FileText, Search, MapPin, Wifi, UtensilsCrossed, Snowflake, X, ArrowRight, LogOut, ChevronDown } from 'lucide-react';

export default function StudentDashboard() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: '2 new PGs added near IIT Delhi within 2km', type: 'new_listing', time: '2 hours ago' },
    { id: 2, message: 'Your application for Sharma PG was accepted!', type: 'application', time: '1 day ago' },
    { id: 3, message: 'New message from owner of Cozy Corner PG', type: 'message', time: '2 days ago' }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [selectedCollege, setSelectedCollege] = useState('IIT Delhi');
  const [collegeDropdown, setCollegeDropdown] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    budget: [10000, 20000],
    facilities: [],
    gender: 'Any'
  });

  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Sharma PG', distance: 1.2, price: 15000, facilities: ['Wi-Fi', 'Food', 'AC'], gender: 'Any', image: 'PG Image' },
    { id: 2, name: 'Cozy Corner', distance: 0.8, price: 12500, facilities: ['Wi-Fi', 'Food', 'Laundry'], gender: 'Female', image: 'PG Image' },
    { id: 3, name: 'Home Sweet Home', distance: 1.5, price: 14000, facilities: ['Wi-Fi', 'AC', 'Parking'], gender: 'Any', image: 'PG Image' },
    { id: 4, name: 'Tech Hub Residence', distance: 2.1, price: 16500, facilities: ['Wi-Fi', 'Food', 'AC', 'Laundry'], gender: 'Male', image: 'PG Image' },
  ]);

  const studentName = "Rajesh Kumar";
  const colleges = ['IIT Delhi', 'Delhi University', 'NSIT Delhi', 'IP University'];
  const facilities = ['Wi-Fi', 'Food', 'AC', 'Laundry', 'Parking', 'Security'];

  const handleBudgetChange = (value) => {
    setSearchFilters({ ...searchFilters, budget: value });
  };

  const toggleFacility = (facility) => {
    const newFacilities = searchFilters.facilities.includes(facility)
      ? searchFilters.facilities.filter(f => f !== facility)
      : [...searchFilters.facilities, facility];
    setSearchFilters({ ...searchFilters, facilities: newFacilities });
  };

  const filteredResults = searchResults.filter(pg => {
    const priceMatch = pg.price >= searchFilters.budget[0] && pg.price <= searchFilters.budget[1];
    const facilitiesMatch = searchFilters.facilities.length === 0 || searchFilters.facilities.every(f => pg.facilities.includes(f));
    const genderMatch = searchFilters.gender === 'Any' || pg.gender === 'Any' || pg.gender === searchFilters.gender;
    return priceMatch && facilitiesMatch && genderMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              PG
            </div>
            <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">PGBuddy</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
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
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 sticky top-0 bg-gray-50 rounded-t-xl flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)} className="text-gray-500 hover:text-gray-700">
                      <X size={18} />
                    </button>
                  </div>
                  {notifications.map(notif => (
                    <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors">
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow"
              >
                {studentName.charAt(0)}
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{studentName}</p>
                    <p className="text-sm text-gray-600">{selectedCollege}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Profile Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Change Password</a>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, {studentName.split(' ')[0]}! 👋</h2>
          <p className="text-gray-600 mt-2">Searching for PGs near <span className="font-semibold text-blue-600">{selectedCollege}</span></p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* View Applications Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">My Applications</h3>
                <p className="text-blue-100 text-sm">Track your pending requests</p>
              </div>
              <FileText size={32} className="group-hover:scale-110 transition-transform" />
            </div>
            <button className="mt-4 flex items-center gap-2 text-sm font-semibold bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg px-3 py-2 transition-all">
              View Applications <ArrowRight size={16} />
            </button>
          </div>

          {/* View Bookmarks Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Saved PGs</h3>
                <p className="text-purple-100 text-sm">Your bookmarked properties</p>
              </div>
              <Bookmark size={32} className="group-hover:scale-110 transition-transform" />
            </div>
            <button className="mt-4 flex items-center gap-2 text-sm font-semibold bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg px-3 py-2 transition-all">
              View Bookmarks <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 mb-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Search PGs Near Your College</h3>
            
            {/* College Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select College</label>
              <div className="relative">
                <button 
                  onClick={() => setCollegeDropdown(!collegeDropdown)}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg bg-white text-gray-900 flex items-center justify-between hover:border-blue-500 transition-colors"
                >
                  <span className="font-medium">{selectedCollege}</span>
                  <ChevronDown size={20} className={`transition-transform ${collegeDropdown ? 'rotate-180' : ''}`} />
                </button>
                {collegeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-300 rounded-lg shadow-lg z-10">
                    {colleges.map(college => (
                      <button
                        key={college}
                        onClick={() => { setSelectedCollege(college); setCollegeDropdown(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {college}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Budget Range</label>
                <div className="space-y-2">
                  <input 
                    type="range" 
                    min="5000" 
                    max="50000" 
                    step="1000"
                    value={searchFilters.budget[1]}
                    onChange={(e) => handleBudgetChange([searchFilters.budget[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{searchFilters.budget[0].toLocaleString()}</span>
                    <span>₹{searchFilters.budget[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Gender Preference */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Gender Preference</label>
                <div className="flex gap-2">
                  {['Any', 'Male', 'Female'].map(gender => (
                    <button
                      key={gender}
                      onClick={() => setSearchFilters({ ...searchFilters, gender })}
                      className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                        searchFilters.gender === gender
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
              {/* Room type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Room Type</label>
                <div className="flex gap-2">
                  {['Single', 'Shared'].map(roomtype => (
                    <button
                      key={roomtype}
                      onClick={() => setSearchFilters({ ...searchFilters, roomtype })}
                      className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                        searchFilters.roomtype === roomtype
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {roomtype}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Facilities Filter */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Facilities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {facilities.map(facility => (
                  <button
                    key={facility}
                    onClick={() => toggleFacility(facility)}
                    className={`py-2 px-3 rounded-lg font-medium transition-all border-2 ${
                      searchFilters.facilities.includes(facility)
                        ? 'bg-blue-100 border-blue-600 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    {facility}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <p className="text-gray-700">
              Found <span className="font-bold text-blue-600">{filteredResults.length}</span> matching PGs within 3km of {selectedCollege}
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2">
              <Search size={18} /> Search
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Available PGs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredResults.map(pg => (
              <div key={pg.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer group border border-gray-200">
                <div className="h-32 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">{pg.image}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{pg.name}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin size={14} /> {pg.distance} km away
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {pg.facilities.slice(0, 2).map(facility => {
                      let icon;
                      if (facility === 'Wi-Fi') icon = <Wifi size={12} />;
                      else if (facility === 'Food') icon = <UtensilsCrossed size={12} />;
                      else if (facility === 'AC') icon = <Snowflake size={12} />;
                      return (
                        <span key={facility} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                          {icon} {facility}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-lg font-bold text-blue-600 mt-3">₹{pg.price.toLocaleString()}</p>
                  <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
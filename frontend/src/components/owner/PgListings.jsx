import React, { useState } from 'react';
import { Bell, ArrowLeft, LogOut, X, MapPin, Home, Plus, Search, BarChart3, Settings, Edit } from 'lucide-react';

export default function MyPGsListPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [pgs, setPgs] = useState([
    {
      id: 1,
      name: 'Sharma PG',
      location: 'Near IIT Delhi Gate, New Delhi',
      rooms: 8,
      status: 'active',
      price: 15000,
      views: 145,
      inquiries: 12
    },
    {
      id: 2,
      name: 'Cozy Corner',
      location: 'Kasturba Nagar, New Delhi',
      rooms: 6,
      status: 'active',
      price: 12500,
      views: 98,
      inquiries: 8
    },
    {
      id: 3,
      name: 'Tech Hub Residence',
      location: 'Okhla, New Delhi',
      rooms: 10,
      status: 'pending',
      price: 16500,
      views: 0,
      inquiries: 0
    },
    {
      id: 4,
      name: 'Student Haven',
      location: 'Dwarka, New Delhi',
      rooms: 5,
      status: 'inactive',
      price: 11000,
      views: 67,
      inquiries: 5
    }
  ]);

  const ownerName = "Rajesh Sharma";

  const filteredPGs = pgs.filter(pg => {
    const matchesSearch = pg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pg.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' ? true : pg.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' };
      case 'inactive':
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' };
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'pending':
        return 'Pending Approval';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
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
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 sticky top-0 bg-gray-50 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X size={18} />
                    </button>
                  </div>
                  <div className="p-4 text-center text-gray-500">No new notifications</div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow"
              >
                {ownerName.charAt(0)}
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{ownerName}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Change Password</a>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
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
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My PGs</h2>
            <p className="text-gray-600 mt-2">Manage all your property listings</p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md font-semibold flex items-center gap-2">
            <Plus size={20} /> Add New PG
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search by PG name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                  selectedFilter === 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                All ({pgs.length})
              </button>
              
              <button 
                onClick={() => setSelectedFilter('active')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                  selectedFilter === 'active'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                }`}
              >
                Active ({pgs.filter(p => p.status === 'active').length})
              </button>

              <button 
                onClick={() => setSelectedFilter('pending')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                  selectedFilter === 'pending'
                    ? 'bg-yellow-600 text-white border-yellow-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-400'
                }`}
              >
                Pending ({pgs.filter(p => p.status === 'pending').length})
              </button>

              <button 
                onClick={() => setSelectedFilter('inactive')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                  selectedFilter === 'inactive'
                    ? 'bg-gray-600 text-white border-gray-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                Inactive ({pgs.filter(p => p.status === 'inactive').length})
              </button>
            </div>
          </div>
        </div>

        {/* PGs Grid */}
        {filteredPGs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPGs.map(pg => {
              const statusColor = getStatusColor(pg.status);
              
              return (
                <div key={pg.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
                  
                  {/* PG Image */}
                  <div className={`h-40 bg-gradient-to-br ${pg.status === 'active' ? 'from-blue-400 to-blue-600' : pg.status === 'pending' ? 'from-yellow-300 to-yellow-500' : 'from-gray-300 to-gray-500'} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-white font-medium opacity-70">PG Image</span>
                    
                    {/* Status Badge */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                      {getStatusLabel(pg.status)}
                    </div>
                  </div>

                  {/* PG Details */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{pg.name}</h3>
                    
                    <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                      <MapPin size={14} className="text-blue-600 flex-shrink-0" />
                      {pg.location}
                    </p>

                    {/* Rooms and Price */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <Home size={16} className="text-purple-600" />
                        <span className="text-sm text-gray-700 font-medium">{pg.rooms} Rooms</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">₹{pg.price.toLocaleString()}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
                      <span>👁️ {pg.views} Views</span>
                      <span>💬 {pg.inquiries} Inquiries</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold text-sm flex items-center justify-center gap-1">
                        <Edit size={16} /> Edit
                      </button>
                      
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all font-semibold text-sm flex items-center justify-center gap-1">
                        <BarChart3 size={16} /> Analytics
                      </button>

                      <button className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all font-semibold text-sm">
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
            <Home size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No PGs Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'No properties match your search.' : 'You haven\'t added any PGs yet. Start by creating your first listing!'}
            </p>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold flex items-center gap-2 mx-auto">
              <Plus size={18} /> Add Your First PG
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
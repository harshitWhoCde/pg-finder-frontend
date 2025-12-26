import React, { useState } from 'react';
import { Bell, ArrowLeft, LogOut, X, MapPin, Star, Heart, ChevronRight } from 'lucide-react';

export default function MyBookmarksPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [bookmarks, setBookmarks] = useState([
    { id: 1, name: 'Sharma PG', location: 'Near IIT Delhi Gate, New Delhi', price: 15000, distance: 1.2, rating: 4.5, reviews: 28 },
    { id: 2, name: 'Cozy Corner', location: 'Kasturba Nagar, New Delhi', price: 12500, distance: 0.8, rating: 4.3, reviews: 15 },
    { id: 3, name: 'Tech Hub Residence', location: 'Okhla, New Delhi', price: 16500, distance: 2.1, rating: 4.6, reviews: 32 },
    { id: 4, name: 'Student Haven', location: 'Dwarka, New Delhi', price: 11000, distance: 2.8, rating: 4.2, reviews: 20 },
  ]);

  const studentName = "Rajesh Kumar";

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
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
                {studentName.charAt(0)}
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{studentName}</p>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Saved PGs</h2>
          <p className="text-gray-600 mt-2">Your bookmarked accommodations</p>
        </div>

        {/* Bookmarks Grid */}
        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map(bookmark => (
              <div key={bookmark.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
                
                {/* PG Image */}
                <div className="h-40 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center relative">
                  <span className="text-gray-600 font-medium">PG Image</span>
                  <button 
                    onClick={() => removeBookmark(bookmark.id)}
                    className="absolute top-3 right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors shadow-md"
                  >
                    <Heart size={20} fill="currentColor" />
                  </button>
                </div>

                {/* PG Details */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{bookmark.name}</h3>
                  
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                    <MapPin size={14} className="text-blue-600" />
                    {bookmark.location}
                  </p>

                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                    <MapPin size={14} className="text-purple-600" />
                    {bookmark.distance} km away
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(bookmark.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-700">{bookmark.rating} ({bookmark.reviews})</span>
                  </div>

                  <p className="text-2xl font-bold text-blue-600 mb-4">₹{bookmark.price.toLocaleString()}</p>

                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    View Details <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
            <Heart size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookmarks Yet</h3>
            <p className="text-gray-600 mb-6">You haven't saved any PGs yet. Start exploring and bookmark your favorites!</p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Search PGs
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
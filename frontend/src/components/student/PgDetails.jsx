import React, { useState } from 'react';
import { Bell, Bookmark, MapPin, Star, Wifi, UtensilsCrossed, Snowflake, ShoppingCart, Lock, Users, Phone, Mail, MessageSquare, ArrowLeft, Heart, ChevronLeft, ChevronRight, LogOut, X, Home } from 'lucide-react';

export default function PGDetailsPage({ pgData, onBack, user }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Use photos from DB or a fallback empty array
  const pgImages = pgData?.photos || [];
  const studentName = user?.name || "Student";

  const nextImage = () => {
    if (pgImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % pgImages.length);
  };

  const prevImage = () => {
    if (pgImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + pgImages.length) % pgImages.length);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // You can add an API call here to save a message in your DB
    setShowContactModal(false);
    alert("Message sent to owner!");
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    // Logic to send application to owner
    setShowApplicationModal(false);
    alert("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              PG
            </div>
            <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">PGBuddy</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow"
              >
                {studentName.charAt(0)}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            
            {/* Image Carousel */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-6">
              <div className="relative h-96 bg-gray-100 flex items-center justify-center">
                {pgImages.length > 0 ? (
                  <img 
                    src={pgImages[currentImageIndex].startsWith('http') ? pgImages[currentImageIndex] : `http://localhost:8080/${pgImages[currentImageIndex]}`}
                    alt="PG Gallery"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Home size={64} className="text-gray-300" />
                )}
                
                {pgImages.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"><ChevronLeft size={24}/></button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"><ChevronRight size={24}/></button>
                  </>
                )}

                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {pgImages.length > 0 ? currentImageIndex + 1 : 0} / {pgImages.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
                {pgImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-blue-600' : 'border-transparent'}`}
                  >
                    <img src={img.startsWith('http') ? img : `http://localhost:8080/${img}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* PG Title and Basic Info */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{pgData.title}</h1>
                  <p className="text-gray-600 flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-blue-600" />
                    {pgData.address}, {pgData.city}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Users size={18} className="text-purple-600" />
                    {pgData.occupancy} Sharing • {pgData.gender} Only
                  </p>
                </div>
                <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-3 rounded-full ${isBookmarked ? 'text-red-600 bg-red-50' : 'text-gray-400 bg-gray-50'}`}>
                  <Heart size={24} fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-3xl font-bold text-blue-600 mb-2">₹{pgData.rent?.toLocaleString()} <span className="text-lg text-gray-600">/month</span></p>
                <div className="flex items-center gap-2">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.5</span>
                  <span className="text-gray-500">(Verified Property)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Property</h2>
              <p className="text-gray-700 leading-relaxed">{pgData.description || "No description provided."}</p>
            </div>

            {/* Amenities - Dynamically rendered from DB array */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pgData.amenities?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700">
                    <div className="bg-white p-1 rounded shadow-sm">
                      {item.toLowerCase().includes('wifi') ? <Wifi size={18}/> : <Home size={18}/>}
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Owner Info and CTA */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Owner Information</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {pgData.owner?.name?.charAt(0) || 'O'}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{pgData.owner?.name || "Verified Owner"}</h4>
                  <p className="text-xs text-gray-500">Response Rate: Fast</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone size={18} className="text-blue-600" />
                  <span className="text-sm">{pgData.owner?.phoneNumber || "Phone Hidden"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail size={18} className="text-blue-600" />
                  <span className="text-sm truncate">{pgData.owner?.email || "Email Hidden"}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare size={20} /> Contact Owner
                </button>
                <button 
                  onClick={() => setShowApplicationModal(true)}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Apply for Admission
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals remain mostly the same but now use pgData.owner.name */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Message {pgData.owner?.name}</h3>
              <textarea className="w-full border p-2 rounded mb-4" rows="4" placeholder="I am interested in this PG..."></textarea>
              <div className="flex gap-2">
                <button onClick={() => setShowContactModal(false)} className="flex-1 border py-2 rounded">Cancel</button>
                <button onClick={handleContactSubmit} className="flex-1 bg-blue-600 text-white py-2 rounded">Send</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Bell, Bookmark, MapPin, Star, Wifi, UtensilsCrossed, Snowflake, ShoppingCart, Lock, Users, Phone, Mail, MessageSquare, ArrowLeft, Heart, ChevronLeft, ChevronRight, LogOut, X } from 'lucide-react';

export default function PGDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const pgImages = [
    'Gallery Image 1',
    'Gallery Image 2',
    'Gallery Image 3',
    'Gallery Image 4',
    'Gallery Image 5',
  ];

  const pgDetails = {
    name: 'Sharma PG',
    location: 'Near IIT Delhi Gate, New Delhi',
    price: 15000,
    distance: 1.2,
    collegeDistance: 'IIT Delhi',
    rating: 4.5,
    reviewCount: 28,
    ownerName: 'Rajesh Sharma',
    ownerRating: 4.7,
    ownerPhone: '+91 98765 43210',
    ownerEmail: 'rajesh.sharma@pgbuddy.com',
    description: 'Welcome to Sharma PG, your home away from home. We provide a comfortable, safe, and hygienic living environment for students pursuing higher education in Delhi. Our accommodation is designed with a modern touch, equipped with all essential amenities to make your stay pleasant and productive.',
    houseRules: [
      'Quiet hours: 10 PM to 7 AM',
      'No visitors after 8 PM without prior notice',
      'Monthly rent due by the 5th of each month',
      'No cooking in rooms',
      'Smoking strictly prohibited',
      'Alcohol consumption not allowed'
    ],
    amenities: [
      { name: 'Wi-Fi', icon: 'Wifi', description: 'High-speed broadband available 24/7' },
      { name: 'Food', icon: 'Food', description: 'Home-cooked vegetarian meals included' },
      { name: 'AC', icon: 'AC', description: 'Air conditioning in all rooms' },
      { name: 'Laundry', icon: 'Laundry', description: 'Weekly laundry service' },
      { name: 'Parking', icon: 'Parking', description: 'Secure parking available' },
      { name: 'Security', icon: 'Security', description: 'CCTV surveillance 24/7' }
    ],
    reviews: [
      { id: 1, author: 'Priya Sharma', rating: 5, date: '2 weeks ago', comment: 'Amazing PG! The owner is very friendly and responsive. Food quality is excellent and hygienic.' },
      { id: 2, author: 'Arjun Singh', rating: 4, date: '1 month ago', comment: 'Good location, clean rooms, and decent facilities. Wi-Fi speed could be better.' },
      { id: 3, author: 'Neha Gupta', rating: 5, date: '1 month ago', comment: 'Best PG near IIT Delhi. Very safe and well-maintained. Highly recommended!' },
      { id: 4, author: 'Vikram Kumar', rating: 4, date: '2 months ago', comment: 'Value for money. Good food and facilities. Complaint resolution could be faster.' },
    ]
  };

  const studentName = "Rajesh Kumar";

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pgImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + pgImages.length) % pgImages.length);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setShowContactModal(false);
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    setShowApplicationModal(false);
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            
            {/* Image Carousel */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-6">
              <div className="relative h-96 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium text-lg">{pgImages[currentImageIndex]}</span>
                
                {/* Navigation Buttons */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all shadow-lg"
                >
                  <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all shadow-lg"
                >
                  <ChevronRight size={24} className="text-gray-800" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {pgImages.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
                {pgImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-16 w-16 rounded-lg flex-shrink-0 border-2 transition-all ${
                      idx === currentImageIndex 
                        ? 'border-blue-600 bg-blue-100' 
                        : 'border-gray-300 bg-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <span className="text-xs text-gray-600">IMG {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* PG Title and Basic Info */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{pgDetails.name}</h1>
                  <p className="text-gray-600 flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-blue-600" />
                    {pgDetails.location}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <MapPin size={18} className="text-purple-600" />
                    {pgDetails.distance} km from {pgDetails.collegeDistance}
                  </p>
                </div>
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3 rounded-full transition-all ${
                    isBookmarked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                  }`}
                >
                  <Heart size={24} fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-3xl font-bold text-blue-600 mb-2">₹{pgDetails.price.toLocaleString()} <span className="text-lg text-gray-600">/month</span></p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < Math.floor(pgDetails.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{pgDetails.rating}</span>
                  <span className="text-gray-600">({pgDetails.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{pgDetails.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pgDetails.amenities.map((amenity, idx) => {
                  let icon;
                  if (amenity.icon === 'Wifi') icon = <Wifi size={24} />;
                  else if (amenity.icon === 'Food') icon = <UtensilsCrossed size={24} />;
                  else if (amenity.icon === 'AC') icon = <Snowflake size={24} />;
                  else if (amenity.icon === 'Laundry') icon = <ShoppingCart size={24} />;
                  else if (amenity.icon === 'Parking') icon = <MapPin size={24} />;
                  else if (amenity.icon === 'Security') icon = <Lock size={24} />;
                  
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="text-blue-600 flex-shrink-0">{icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{amenity.name}</h3>
                        <p className="text-sm text-gray-600">{amenity.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* House Rules */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">House Rules</h2>
              <ul className="space-y-2">
                {pgDetails.houseRules.map((rule, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews from Students</h2>
              <div className="space-y-4">
                {pgDetails.reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.author}</h3>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Owner Info and CTA */}
          <div>
            
            {/* Owner Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Owner Information</h3>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {pgDetails.ownerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{pgDetails.ownerName}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(pgDetails.ownerRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">{pgDetails.ownerRating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6 bg-gray-50 rounded-lg p-4">
                <a href={`tel:${pgDetails.ownerPhone}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                  <Phone size={18} className="text-blue-600" />
                  <span className="text-sm">{pgDetails.ownerPhone}</span>
                </a>
                <a href={`mailto:${pgDetails.ownerEmail}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                  <Mail size={18} className="text-blue-600" />
                  <span className="text-sm break-all">{pgDetails.ownerEmail}</span>
                </a>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-gray-700">Member Since</h5>
                <p className="text-gray-600 text-sm">January 2020</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              
              {/* Contact PG Owner Button */}
              <button 
                onClick={() => setShowContactModal(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare size={20} />
                Contact PG Owner
              </button>

              {/* Send Application Button */}
              <button 
                onClick={() => setShowApplicationModal(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md font-semibold"
              >
                Send Application
              </button>

              {/* Add to Favorites Button */}
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-full py-3 px-4 rounded-lg transition-all shadow-md font-semibold border-2 flex items-center justify-center gap-2 ${
                  isBookmarked
                    ? 'bg-red-100 border-red-600 text-red-600 hover:bg-red-200'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                <Bookmark size={20} />
                {isBookmarked ? 'Saved' : 'Save to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Contact {pgDetails.ownerName}</h3>
              <button onClick={() => setShowContactModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <input type="text" placeholder="Enter your name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" required />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Phone</label>
                <input type="tel" placeholder="+91" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea placeholder="Write your message..." rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" required></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowContactModal(false)} className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors">
                  Cancel
                </button>
                <button onClick={handleContactSubmit} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Apply for {pgDetails.name}</h3>
              <button onClick={() => setShowApplicationModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Why are you interested?</label>
                <textarea placeholder="Tell us about yourself..." rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" required></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Desired Move-in Date</label>
                <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (months)</label>
                <input type="number" min="1" placeholder="e.g., 12" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" required />
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowApplicationModal(false)} className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors">
                  Cancel
                </button>
                <button onClick={handleApplicationSubmit} className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
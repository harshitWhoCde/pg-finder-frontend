import React, { useState } from 'react';
import { Bell, ArrowLeft, LogOut, X, MapPin, Calendar, Clock, CheckCircle, AlertCircle, XCircle, ChevronRight, Eye, Trash2 } from 'lucide-react';

export default function MyApplicationsPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [applications, setApplications] = useState([
    {
      id: 1,
      pgName: 'Sharma PG',
      location: 'Near IIT Delhi Gate, New Delhi',
      price: 15000,
      status: 'accepted',
      appliedDate: '2024-01-15',
      respondedDate: '2024-01-18',
      coverLetter: 'I am a dedicated student looking for a comfortable and safe accommodation near my college. Your PG has excellent reviews and facilities that match my requirements perfectly.',
      moveInDate: '2024-02-01',
      duration: 12,
      preferences: 'Quiet environment, vegetarian meals preferred'
    },
    {
      id: 2,
      pgName: 'Cozy Corner',
      location: 'Kasturba Nagar, New Delhi',
      price: 12500,
      status: 'pending',
      appliedDate: '2024-01-20',
      respondedDate: null,
      coverLetter: 'I am very interested in your property as it offers great value for money and is close to my institute.',
      moveInDate: '2024-02-15',
      duration: 10,
      preferences: 'Good Wi-Fi, AC preferred'
    },
    {
      id: 3,
      pgName: 'Home Sweet Home',
      location: 'Mehrauli, New Delhi',
      price: 14000,
      status: 'rejected',
      appliedDate: '2024-01-10',
      respondedDate: '2024-01-12',
      coverLetter: 'Looking for comfortable accommodation near my university with modern amenities.',
      moveInDate: '2024-02-01',
      duration: 12,
      preferences: 'Non-vegetarian meals, parking facility'
    },
    {
      id: 4,
      pgName: 'Tech Hub Residence',
      location: 'Okhla, New Delhi',
      price: 16500,
      status: 'pending',
      appliedDate: '2024-01-22',
      respondedDate: null,
      coverLetter: 'Your property seems perfect for my needs with excellent facilities and great location.',
      moveInDate: '2024-03-01',
      duration: 11,
      preferences: 'High-speed Wi-Fi, study room'
    },
    {
      id: 5,
      pgName: 'Student Haven',
      location: 'Dwarka, New Delhi',
      price: 11000,
      status: 'accepted',
      appliedDate: '2024-01-05',
      respondedDate: '2024-01-08',
      coverLetter: 'I am impressed with your facility and the student-friendly atmosphere. Looking forward to joining.',
      moveInDate: '2024-02-01',
      duration: 12,
      preferences: 'Flexible check-in time, good kitchen facilities'
    },
  ]);

  const studentName = "Rajesh Kumar";

  const filteredApplications = applications.filter(app => 
    selectedFilter === 'all' ? true : app.status === selectedFilter
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted':
        return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', icon: CheckCircle };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', icon: Clock };
      case 'rejected':
        return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', icon: XCircle };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300', icon: AlertCircle };
    }
  };

  const handleWithdraw = (id) => {
    setApplications(applications.filter(app => app.id !== id));
    setShowDetailModal(false);
  };

  const handleViewDetails = (app) => {
    setSelectedApplication(app);
    setShowDetailModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'accepted':
        return 'Accepted';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
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
          <h2 className="text-3xl font-bold text-gray-900">My Applications</h2>
          <p className="text-gray-600 mt-2">Track all your PG applications and their status</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Filter by Status</h3>
          <div className="flex gap-3 flex-wrap">
            <button 
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              }`}
            >
              All Applications ({applications.length})
            </button>
            
            <button 
              onClick={() => setSelectedFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-all border-2 flex items-center gap-2 ${
                selectedFilter === 'pending'
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-400'
              }`}
            >
              <Clock size={16} />
              Pending ({applications.filter(a => a.status === 'pending').length})
            </button>

            <button 
              onClick={() => setSelectedFilter('accepted')}
              className={`px-4 py-2 rounded-lg font-medium transition-all border-2 flex items-center gap-2 ${
                selectedFilter === 'accepted'
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
              }`}
            >
              <CheckCircle size={16} />
              Accepted ({applications.filter(a => a.status === 'accepted').length})
            </button>

            <button 
              onClick={() => setSelectedFilter('rejected')}
              className={`px-4 py-2 rounded-lg font-medium transition-all border-2 flex items-center gap-2 ${
                selectedFilter === 'rejected'
                  ? 'bg-red-100 text-red-800 border-red-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-400'
              }`}
            >
              <XCircle size={16} />
              Rejected ({applications.filter(a => a.status === 'rejected').length})
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map(app => {
              const statusColor = getStatusColor(app.status);
              const StatusIcon = statusColor.icon;

              return (
                <div key={app.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  
                  {/* Application Card */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      
                      {/* PG Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{app.pgName}</h3>
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold border-2 flex items-center gap-1 ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                            <StatusIcon size={16} />
                            {getStatusLabel(app.status)}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 flex items-center gap-2 mb-2">
                          <MapPin size={16} className="text-blue-600" />
                          {app.location}
                        </p>

                        <p className="text-lg font-bold text-blue-600 mb-3">
                          ₹{app.price.toLocaleString()} <span className="text-sm text-gray-600">/month</span>
                        </p>
                      </div>

                      {/* Price Info */}
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-2">Applied on</p>
                        <p className="text-gray-900 font-semibold">{formatDate(app.appliedDate)}</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-blue-600" />
                          <span className="text-gray-700">Applied: <span className="font-semibold">{formatDate(app.appliedDate)}</span></span>
                        </div>
                        
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>

                        {app.respondedDate ? (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar size={16} className={app.status === 'accepted' ? 'text-green-600' : app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'} />
                            <span className="text-gray-700">Responded: <span className="font-semibold">{formatDate(app.respondedDate)}</span></span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock size={16} className="text-yellow-600" />
                            <span className="text-gray-700 italic">Awaiting response...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Application Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-xs text-gray-600 mb-1">Move-in Date</p>
                        <p className="font-semibold text-gray-900">{formatDate(app.moveInDate)}</p>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                        <p className="text-xs text-gray-600 mb-1">Duration</p>
                        <p className="font-semibold text-gray-900">{app.duration} months</p>
                      </div>

                      <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                        <p className="text-xs text-gray-600 mb-1">Preferences</p>
                        <p className="font-semibold text-gray-900 text-sm truncate">{app.preferences}</p>
                      </div>

                      <div className="bg-gray-100 rounded-lg p-3 border border-gray-300">
                        <p className="text-xs text-gray-600 mb-1">Status</p>
                        <p className="font-semibold text-gray-900 capitalize">{app.status}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => handleViewDetails(app)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                      >
                        <Eye size={18} />
                        View Details
                      </button>

                      {app.status === 'pending' && (
                        <button 
                          onClick={() => handleWithdraw(app.id)}
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-semibold flex items-center gap-2"
                        >
                          <Trash2 size={18} />
                          Withdraw
                        </button>
                      )}

                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center gap-2">
                        <ChevronRight size={18} />
                        Go to PG
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Found</h3>
              <p className="text-gray-600">You haven't sent any applications yet. Start exploring PGs near your college!</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Search PGs
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Details Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full border border-gray-200 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-900">Application Details - {selectedApplication.pgName}</h3>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              
              {/* Status */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900">Status</h4>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold border-2 flex items-center gap-1 ${getStatusColor(selectedApplication.status).bg} ${getStatusColor(selectedApplication.status).text} ${getStatusColor(selectedApplication.status).border}`}>
                  {getStatusLabel(selectedApplication.status)}
                </div>
              </div>

              {/* Cover Letter */}
              <div className="pb-4 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Your Cover Letter</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedApplication.coverLetter}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-semibold">Move-in Date</p>
                  <p className="text-gray-900">{formatDate(selectedApplication.moveInDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-semibold">Duration</p>
                  <p className="text-gray-900">{selectedApplication.duration} months</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-semibold">Applied On</p>
                  <p className="text-gray-900">{formatDate(selectedApplication.appliedDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-semibold">Response Date</p>
                  <p className="text-gray-900">{selectedApplication.respondedDate ? formatDate(selectedApplication.respondedDate) : 'Pending'}</p>
                </div>
              </div>

              {/* Preferences */}
              <div className="pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Your Preferences</h4>
                <p className="text-gray-700 text-sm">{selectedApplication.preferences}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {selectedApplication.status === 'pending' && (
                  <button 
                    onClick={() => {
                      handleWithdraw(selectedApplication.id);
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Withdraw Application
                  </button>
                )}
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
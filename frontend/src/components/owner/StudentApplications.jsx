import React, { useState } from 'react';
import { Bell, ArrowLeft, LogOut, X, Search, Clock, CheckCircle, XCircle, Eye, ThumbsUp, ThumbsDown, Calendar } from 'lucide-react';

export default function OwnerApplicationsPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [applications, setApplications] = useState([
    {
      id: 1,
      studentName: 'Priya Sharma',
      pgName: 'Sharma PG',
      appliedDate: '2024-01-15',
      moveInDate: '2024-02-01',
      status: 'pending',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      studentName: 'Arjun Singh',
      pgName: 'Cozy Corner',
      appliedDate: '2024-01-20',
      moveInDate: '2024-02-15',
      status: 'accepted',
      email: 'arjun.singh@example.com',
      phone: '+91 97654 32109'
    },
    {
      id: 3,
      studentName: 'Neha Gupta',
      pgName: 'Sharma PG',
      appliedDate: '2024-01-10',
      moveInDate: '2024-02-01',
      status: 'rejected',
      email: 'neha.gupta@example.com',
      phone: '+91 96543 21098'
    },
    {
      id: 4,
      studentName: 'Vikram Kumar',
      pgName: 'Tech Hub Residence',
      appliedDate: '2024-01-22',
      moveInDate: '2024-03-01',
      status: 'pending',
      email: 'vikram.kumar@example.com',
      phone: '+91 95432 10987'
    },
    {
      id: 5,
      studentName: 'Anjali Patel',
      pgName: 'Student Haven',
      appliedDate: '2024-01-12',
      moveInDate: '2024-02-01',
      status: 'accepted',
      email: 'anjali.patel@example.com',
      phone: '+91 94321 09876'
    },
    {
      id: 6,
      studentName: 'Rohan Verma',
      pgName: 'Cozy Corner',
      appliedDate: '2024-01-18',
      moveInDate: '2024-02-20',
      status: 'pending',
      email: 'rohan.verma@example.com',
      phone: '+91 93210 98765'
    }
  ]);

  const ownerName = "Rajesh Sharma";

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' ? true : app.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted':
        return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', icon: CheckCircle };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', icon: Clock };
      case 'rejected':
        return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', icon: XCircle };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300', icon: Clock };
    }
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

  const handleAccept = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'accepted' } : app
    ));
  };

  const handleReject = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'rejected' } : app
    ));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Student Applications</h2>
          <p className="text-gray-600 mt-2">Review and respond to student applications</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search by student name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                  selectedFilter === 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                All ({applications.length})
              </button>
              
              <button 
                onClick={() => setSelectedFilter('pending')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 flex items-center gap-2 ${
                  selectedFilter === 'pending'
                    ? 'bg-yellow-600 text-white border-yellow-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-400'
                }`}
              >
                <Clock size={16} />
                Pending ({applications.filter(a => a.status === 'pending').length})
              </button>

              <button 
                onClick={() => setSelectedFilter('accepted')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 flex items-center gap-2 ${
                  selectedFilter === 'accepted'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                }`}
              >
                <CheckCircle size={16} />
                Accepted ({applications.filter(a => a.status === 'accepted').length})
              </button>

              <button 
                onClick={() => setSelectedFilter('rejected')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 flex items-center gap-2 ${
                  selectedFilter === 'rejected'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-red-400'
                }`}
              >
                <XCircle size={16} />
                Rejected ({applications.filter(a => a.status === 'rejected').length})
              </button>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length > 0 ? (
          <div className="space-y-4">
            {filteredApplications.map(app => {
              const statusColor = getStatusColor(app.status);
              const StatusIcon = statusColor.icon;

              return (
                <div key={app.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    
                    {/* Left Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{app.studentName}</h3>
                          <p className="text-sm text-gray-600 mt-1">Applied for <span className="font-semibold text-blue-600">{app.pgName}</span></p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold border-2 flex items-center gap-1 ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                          <StatusIcon size={14} />
                          {getStatusLabel(app.status)}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                        <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                          <p className="text-gray-600 text-xs mb-1">Applied On</p>
                          <p className="font-semibold text-gray-900">{formatDate(app.appliedDate)}</p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-2 border border-purple-200">
                          <p className="text-gray-600 text-xs mb-1 flex items-center gap-1">
                            <Calendar size={12} /> Move-in Date
                          </p>
                          <p className="font-semibold text-gray-900">{formatDate(app.moveInDate)}</p>
                        </div>

                        <div className="bg-indigo-50 rounded-lg p-2 border border-indigo-200">
                          <p className="text-gray-600 text-xs mb-1">Email</p>
                          <p className="font-semibold text-gray-900 text-xs truncate">{app.email}</p>
                        </div>

                        <div className="bg-cyan-50 rounded-lg p-2 border border-cyan-200">
                          <p className="text-gray-600 text-xs mb-1">Phone</p>
                          <p className="font-semibold text-gray-900 text-xs">{app.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold text-sm flex items-center gap-2">
                        <Eye size={16} /> View
                      </button>

                      {app.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleAccept(app.id)}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold text-sm flex items-center gap-2"
                          >
                            <ThumbsUp size={16} /> Accept
                          </button>

                          <button 
                            onClick={() => handleReject(app.id)}
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-semibold text-sm flex items-center gap-2"
                          >
                            <ThumbsDown size={16} /> Reject
                          </button>
                        </>
                      )}

                      {app.status === 'accepted' && (
                        <button className="px-4 py-2 bg-green-100 text-green-800 border-2 border-green-300 rounded-lg font-semibold text-sm">
                          ✓ Accepted
                        </button>
                      )}

                      {app.status === 'rejected' && (
                        <button className="px-4 py-2 bg-red-100 text-red-800 border-2 border-red-300 rounded-lg font-semibold text-sm">
                          ✕ Rejected
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
            <Clock size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'No applications match your search.' : 'You haven\'t received any applications yet.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
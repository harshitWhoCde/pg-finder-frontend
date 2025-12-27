import React, { useState } from 'react';
import { Bell, ArrowLeft, LogOut, X, Mail, Phone, BookOpen, MapPin, Calendar, Clock, MessageSquare, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';

export default function ViewStudentApplicationPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'student',
      studentName: 'Priya Sharma',
      text: 'Hi, I am very interested in your PG. Can you provide more information about the available rooms?',
      timestamp: '2024-01-15 10:30 AM'
    },
    {
      id: 2,
      sender: 'owner',
      text: 'Hello Priya! Yes, we have both single and double rooms available. Would you like to visit?',
      timestamp: '2024-01-15 02:45 PM'
    },
    {
      id: 3,
      sender: 'student',
      text: 'Sure! Can I visit this weekend?',
      timestamp: '2024-01-16 09:15 AM'
    }
  ]);

  const ownerName = "Rajesh Sharma";

  const applicationData = {
    studentName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    college: 'IIT Delhi',
    preferences: 'Quiet environment, vegetarian meals preferred, prefer single room',
    pgName: 'Sharma PG',
    coverLetter: 'I am a dedicated student pursuing my degree at IIT Delhi. I am looking for a comfortable and safe accommodation near my college. Your PG has excellent reviews and facilities that match my requirements perfectly. The proximity to my campus and the amenities offered make it an ideal choice for me.',
    moveInDate: '2024-02-01',
    duration: 12,
    appliedDate: '2024-01-15',
    status: 'pending'
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'owner',
        text: messageText,
        timestamp: new Date().toLocaleString()
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleAccept = () => {
    alert('Application accepted! Student will be notified.');
  };

  const handleReject = () => {
    alert('Application rejected! Student will be notified.');
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Application Details</h2>
          <p className="text-gray-600 mt-2">Review application from {applicationData.studentName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Student Information Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Student Information</h3>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {applicationData.studentName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{applicationData.studentName}</h4>
                  <p className="text-gray-600 text-sm">Applied on {formatDate(applicationData.appliedDate)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <Mail size={18} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Email</p>
                    <p className="text-gray-900">{applicationData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <Phone size={18} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Phone</p>
                    <p className="text-gray-900">{applicationData.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <BookOpen size={18} className="text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">College/University</p>
                    <p className="text-gray-900">{applicationData.college}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-purple-600 mt-1" />
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Preferences</p>
                    <p className="text-gray-900 text-sm">{applicationData.preferences}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Details Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Application Details</h3>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                <p className="text-xs text-gray-600 font-semibold mb-2">PG Applied For</p>
                <p className="text-lg font-bold text-blue-600">{applicationData.pgName}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-xs text-gray-600 font-semibold mb-2 flex items-center gap-1">
                    <Calendar size={14} /> Desired Move-in Date
                  </p>
                  <p className="text-lg font-bold text-purple-600">{formatDate(applicationData.moveInDate)}</p>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <p className="text-xs text-gray-600 font-semibold mb-2 flex items-center gap-1">
                    <Clock size={14} /> Duration Required
                  </p>
                  <p className="text-lg font-bold text-indigo-600">{applicationData.duration} months</p>
                </div>
              </div>
            </div>

            {/* Cover Letter Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cover Letter / Reason for Joining</h3>
              <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-200">
                {applicationData.coverLetter}
              </p>
            </div>

            {/* Messages Section */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Messages & Inquiries</h3>
              
              {/* Messages Thread */}
              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'owner' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'owner'
                        ? 'bg-blue-100 border border-blue-300 text-gray-900'
                        : 'bg-white border border-gray-300 text-gray-900'
                    }`}>
                      {msg.sender === 'student' && (
                        <p className="text-xs font-semibold text-gray-600 mb-1">{msg.studentName}</p>
                      )}
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              {!showMessageForm ? (
                <button 
                  onClick={() => setShowMessageForm(true)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} /> Send Message
                </button>
              ) : (
                <div className="space-y-2">
                  <textarea 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  ></textarea>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSendMessage}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Send
                    </button>
                    <button 
                      onClick={() => setShowMessageForm(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            
            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={handleAccept}
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <ThumbsUp size={18} /> Accept Application
                </button>

                <button 
                  onClick={handleReject}
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <ThumbsDown size={18} /> Reject Application
                </button>
              </div>
            </div>

            {/* Mark as Reviewed */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="reviewed"
                  checked={isReviewed}
                  onChange={() => setIsReviewed(!isReviewed)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="reviewed" className="cursor-pointer">
                  <span className="font-semibold text-gray-900">Mark as Reviewed</span>
                  <p className="text-sm text-gray-600">Remember that you've reviewed this application</p>
                </label>
              </div>
              {isReviewed && (
                <div className="mt-3 flex items-center gap-2 text-green-700 bg-green-50 p-2 rounded border border-green-200">
                  <CheckCircle size={16} />
                  <span className="text-sm font-semibold">Application marked as reviewed</span>
                </div>
              )}
            </div>

            {/* Application Status */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Application Status</h3>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 text-center">
                <p className="text-xs text-gray-600 font-semibold mb-1">Current Status</p>
                <p className="text-lg font-bold text-yellow-800">Pending Review</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
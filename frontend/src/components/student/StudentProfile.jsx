import React, { useState } from 'react';
import { Bell, ArrowLeft, LogOut, X, Mail, Phone, MapPin, BookOpen, ChevronRight, Eye, EyeOff } from 'lucide-react';

export default function StudentProfilePage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    college: 'IIT Delhi',
    preferredBudget: '₹10,000 - ₹20,000',
    preferences: 'Wi-Fi, Food, AC'
  });

  const [editData, setEditData] = useState(profileData);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const studentName = "Rajesh Kumar";

  const handleEditClick = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword === passwordData.confirmPassword) {
      // Password changed successfully
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      alert('Password changed successfully!');
    } else {
      alert('New passwords do not match!');
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
            {!isEditing && (
              <button 
                onClick={handleEditClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Avatar */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-4xl">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{profileData.name}</h3>
              <p className="text-gray-600">{profileData.college}</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>

          {!isEditing ? (
            <div className="space-y-4">
              {/* Name */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1">Full Name</p>
                  <p className="text-gray-900">{profileData.name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                    <Mail size={14} /> Email
                  </p>
                  <p className="text-gray-900">{profileData.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                    <Phone size={14} /> Phone
                  </p>
                  <p className="text-gray-900">{profileData.phone}</p>
                </div>
              </div>

              {/* College */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                    <BookOpen size={14} /> College
                  </p>
                  <p className="text-gray-900">{profileData.college}</p>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1">Preferred Budget</p>
                  <p className="text-gray-900">{profileData.preferredBudget}</p>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Preferences</p>
                <p className="text-gray-900">{profileData.preferences}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Name Edit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Email Edit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Phone Edit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* College Edit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">College</label>
                <input 
                  type="text" 
                  value={editData.college}
                  onChange={(e) => setEditData({ ...editData, college: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Budget Edit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Budget</label>
                <input 
                  type="text" 
                  value={editData.preferredBudget}
                  onChange={(e) => setEditData({ ...editData, preferredBudget: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Preferences Edit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferences</label>
                <textarea 
                  value={editData.preferences}
                  onChange={(e) => setEditData({ ...editData, preferences: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  rows="3"
                ></textarea>
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleSaveChanges}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Change Password Section */}
        {!showPasswordForm ? (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Password</h3>
                <p className="text-gray-600 text-sm">Change your account password</p>
              </div>
              <button 
                onClick={() => setShowPasswordForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
              >
                Change Password <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Change Password</h3>

            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 pr-10"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 pr-10"
                  />
                  <button 
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 pr-10"
                  />
                  <button 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handlePasswordChange}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Change Password
                </button>
                <button 
                  onClick={() => setShowPasswordForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
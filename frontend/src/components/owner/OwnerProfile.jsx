import React, { useState } from 'react';
import { Bell, ArrowLeft, LogOut, X, Mail, Phone, Building2, Hash, CreditCard, MapPin, Eye, EyeOff, ChevronRight, Trash2 } from 'lucide-react';

export default function OwnerProfilePage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    phone: '+91 98765 43210',
    businessName: 'Sharma Properties',
    gstNumber: '07AAFCS5055K1Z0',
    bankAccountNumber: '1234567890123456',
    bankIFSC: 'ICIC0000001',
    bankName: 'ICICI Bank',
    address: '123, Sharma Nagar, New Delhi - 110016'
  });

  const [editData, setEditData] = useState(profileData);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const ownerName = "Rajesh Sharma";

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
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      alert('Password changed successfully!');
    } else {
      alert('New passwords do not match!');
    }
  };

  const handleDeleteAccount = () => {
    alert('Account deleted successfully!');
    setShowDeleteConfirm(false);
  };

  const maskBankAccount = (account) => {
    return '*'.repeat(12) + account.slice(-4);
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
            <p className="text-gray-600 mt-2">Manage your account information</p>
          </div>
          {!isEditing && (
            <button 
              onClick={handleEditClick}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md font-semibold"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-4xl">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{profileData.name}</h3>
              <p className="text-gray-600">{profileData.businessName}</p>
              <p className="text-sm text-gray-500 mt-1">Property Owner</p>
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

              {/* Business Name */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                    <Building2 size={14} /> Business Name
                  </p>
                  <p className="text-gray-900">{profileData.businessName}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                    <MapPin size={14} /> Address
                  </p>
                  <p className="text-gray-900">{profileData.address}</p>
                </div>
              </div>

              {/* GST Number */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                    <Hash size={14} /> GST Number
                  </p>
                  <p className="text-gray-900">{profileData.gstNumber}</p>
                </div>
              </div>

              {/* Bank Details */}
              <div className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                      <CreditCard size={14} /> Bank Details
                    </p>
                    <p className="text-gray-900 text-sm">{profileData.bankName}</p>
                    <p className="text-gray-600 text-sm">{maskBankAccount(profileData.bankAccountNumber)}</p>
                  </div>
                  <button 
                    onClick={() => setShowBankDetails(!showBankDetails)}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {showBankDetails ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {showBankDetails && (
                  <div className="mt-3 bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">Bank Name:</span> {profileData.bankName}</p>
                    <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">Account Number:</span> {profileData.bankAccountNumber}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">IFSC Code:</span> {profileData.bankIFSC}</p>
                  </div>
                )}
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

              {/* Business Name Edit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                <input 
                  type="text" 
                  value={editData.businessName}
                  onChange={(e) => setEditData({ ...editData, businessName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Address Edit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <input 
                  type="text" 
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* GST Number Edit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">GST Number</label>
                <input 
                  type="text" 
                  value={editData.gstNumber}
                  onChange={(e) => setEditData({ ...editData, gstNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleSaveChanges}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold"
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
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Password</h3>
                <p className="text-gray-600 text-sm">Change your account password</p>
              </div>
              <button 
                onClick={() => setShowPasswordForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold flex items-center gap-2"
              >
                Change Password <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
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
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold"
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

        {/* Delete Account Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Delete Account</h3>
              <p className="text-gray-600 text-sm">Permanently delete your account and all data</p>
            </div>
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-100 text-red-600 border-2 border-red-300 rounded-lg hover:bg-red-200 transition-colors font-semibold flex items-center gap-2"
            >
              <Trash2 size={18} /> Delete Account
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Delete Account?</h3>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Are you sure you want to delete your account? This action <span className="font-bold">cannot be undone</span>. All your PG listings and data will be permanently deleted.
                </p>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDeleteAccount}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Bell, Home, FileText, Users, Plus, ArrowRight, LogOut, X, Clock, CheckCircle, AlertCircle, Trash2, Edit, Upload, MapPin, IndianRupee, TrendingUp, Loader2 } from 'lucide-react';

const EnhancedOwnerDashboard = ({ user, onLogout, onNavigateToAdd, onViewAllProperties ,onNavigateToApplications}) => {
  // State Management
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    rent: '',
    type: 'PG',
    distanceToCollege: '',
    city: '',
    amenities: [],
    gender: 'Any',
    photos: null
  });

  // Fetch Properties from Database
  useEffect(() => {
    fetchMyProperties();
    fetchNotifications();
    fetchRecentActivity();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8080/api/v1/properties/owner-properties', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (data.success) {
        setProperties(data.properties);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const sampleNotifications = [
        { id: 1, message: 'New application from a student for your PG', time: '2 hours ago' },
        { id: 2, message: 'Your property reached 50 views', time: '1 day ago' },
      ];
      setNotifications(sampleNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const sampleActivity = [
        { id: 1, type: 'application', studentName: 'Priya Sharma', pgName: 'Sample PG', time: '2 hours ago', status: 'pending' },
        { id: 2, type: 'view', studentName: 'Arjun Singh', pgName: 'Your PG', time: '5 hours ago', status: 'view' },
        { id: 3, type: 'application', studentName: 'Neha Gupta', pgName: 'Hostel', time: '1 day ago', status: 'accepted' },
      ];
      setRecentActivity(sampleActivity);
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };

  // Handle Add Property
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('ownerId', user._id);
      data.append('title', formData.title);
      data.append('address', formData.address);
      data.append('rent', formData.rent);
      data.append('type', formData.type);
      data.append('distanceToCollege', formData.distanceToCollege);
      data.append('city', formData.city);
      data.append('gender', formData.gender);
      data.append('amenities', JSON.stringify(formData.amenities));

      if (formData.photos) {
        for (let i = 0; i < formData.photos.length; i++) {
          data.append('photos', formData.photos[i]);
        }
      }

      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8080/api/v1/property/add', {
        method: 'POST',
        headers: { 'Authorization': token },
        body: data
      });

      const result = await res.json();
      if (result.success) {
        alert("Property Added Successfully!");
        setIsAddPropertyOpen(false);
        fetchMyProperties();
        setFormData({
          title: '',
          address: '',
          rent: '',
          type: 'PG',
          distanceToCollege: '',
          city: '',
          amenities: [],
          gender: 'Any',
          photos: null
        });
      } else {
        alert("Failed to add property");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files : value
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/api/v1/property/delete/${propertyId}`, {
          method: 'DELETE',
          headers: { 'Authorization': token }
        });
        const result = await res.json();
        if (result.success) {
          alert("Property deleted successfully");
          fetchMyProperties();
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to delete property");
      }
    }
  };

  // Calculate Stats
  const totalRevenue = properties.reduce((sum, p) => sum + (Number(p.rent) || 0), 0);
  const stats = [
    { label: 'Total PGs', value: properties.length, icon: Home, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Listings', value: properties.filter(p => p.isActive !== false).length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'Est. Revenue', value: `₹${(totalRevenue / 1000).toFixed(1)}k`, icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
  ];

  const amenitiesOptions = ['WiFi', 'Food', 'AC', 'Laundry', 'Parking', 'Security'];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'application':
        return <FileText size={18} className="text-blue-600" />;
      case 'view':
        return <AlertCircle size={18} className="text-purple-600" />;
      case 'inquiry':
        return <Users size={18} className="text-green-600" />;
      default:
        return <Clock size={18} className="text-gray-600" />;
    }
  };

  const getInitials = (name) => name ? name.substring(0, 2).toUpperCase() : "US";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              <Home className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">PG Buddy</h1>
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
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  <div className="p-4 border-b border-gray-200 sticky top-0 bg-gray-50 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X size={18} />
                    </button>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No notifications</div>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors">
                        <p className="text-sm text-gray-800">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow"
              >
                {getInitials(user?.name)}
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Profile Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Change Password</a>
                  <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
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
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
          <p className="text-gray-600 mt-2">Manage your properties and student applications</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl shadow-lg p-4 text-white cursor-pointer hover:shadow-xl transition-shadow group`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-opacity-80 text-xs font-semibold mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                  </div>
                  <Icon size={28} className="group-hover:scale-110 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* Add New PG Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Add New PG</h3>
                <p className="text-blue-100 text-sm">List a new property</p>
              </div>
              <Plus size={32} className="group-hover:scale-110 transition-transform" />
            </div>
            <button onClick={onNavigateToAdd} className="mt-4 flex items-center gap-2 text-sm font-semibold bg-white bg-opacity-30 hover:bg-opacity-40 text-blue-600 rounded-lg px-3 py-2 transition-all">
              Create Listing <ArrowRight size={16} />
            </button>
          </div>

          {/* View Applications Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Student Applications</h3>
                <p className="text-purple-100 text-sm">Review applications</p>
              </div>
              <FileText size={32} className="group-hover:scale-110 transition-transform" />
            </div>
            <button
            onClick={onNavigateToApplications}
            className="mt-4 flex items-center gap-2 text-sm font-semibold bg-white bg-opacity-30 hover:bg-opacity-40 text-purple-600 rounded-lg px-3 py-2 transition-all">
              Review Applications <ArrowRight size={16} />
            </button>
          </div>
        </div>

        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activity Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm">
                          <span className="text-blue-600">{activity.studentName}</span> {activity.type === 'application' ? 'applied to' : activity.type === 'view' ? 'viewed' : 'inquired about'} <span className="text-blue-600">{activity.pgName}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          activity.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {activity.status === 'view' ? 'View' : activity.status === 'inquiry' ? 'Inquiry' : activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No recent activity yet</p>
              )}
            </div>
          </div>

          {/* Tasks Overview */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 h-fit">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Properties</h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {properties.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No properties yet</p>
                ) : (
                  properties.slice(0, 5).map(property => (
                    <div key={property._id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900 truncate">{property.title}</p>
                          <p className="text-xs text-gray-500 mt-1">₹{property.rent}/month</p>
                        </div>
                        <button onClick={() => handleDeleteProperty(property._id)} className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors flex-shrink-0">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button
              onClick={onViewAllProperties}
               className="w-full mt-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm">
                View All Properties
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnhancedOwnerDashboard;
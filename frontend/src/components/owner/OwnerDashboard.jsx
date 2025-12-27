import React, { useState } from 'react';
import { Bell, Home, FileText, Users, Plus, ArrowRight, LogOut, X, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function OwnerDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [notifications] = useState([
    { id: 1, message: 'New application from Priya Sharma for Sharma PG', time: '2 hours ago' },
    { id: 2, message: 'Your Cozy Corner PG reached 50 views', time: '1 day ago' },
  ]);

  const [recentActivity] = useState([
    { id: 1, type: 'application', studentName: 'Priya Sharma', pgName: 'Sharma PG', time: '2 hours ago', status: 'pending' },
    { id: 2, type: 'view', studentName: 'Arjun Singh', pgName: 'Cozy Corner', time: '5 hours ago', status: 'view' },
    { id: 3, type: 'application', studentName: 'Neha Gupta', pgName: 'Tech Hub Residence', time: '1 day ago', status: 'accepted' },
    { id: 4, type: 'inquiry', studentName: 'Vikram Kumar', pgName: 'Student Haven', time: '2 days ago', status: 'inquiry' },
  ]);

  const ownerName = "Rajesh Sharma";
  const businessName = "Sharma Properties";

  const stats = [
    { label: 'Total PGs', value: '4', icon: Home, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Listings', value: '3', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'Recent Inquiries', value: '12', icon: FileText, color: 'from-purple-500 to-purple-600' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Pending Applications', count: 5, icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    { id: 2, title: 'Property Reviews', count: 28, icon: Users, color: 'bg-blue-100 text-blue-800' },
  ];

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

  const getActivityLabel = (type) => {
    switch(type) {
      case 'application':
        return 'New Application';
      case 'view':
        return 'PG View';
      case 'inquiry':
        return 'Inquiry';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 sticky top-0 bg-gray-50 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X size={18} />
                    </button>
                  </div>
                  {notifications.map(notif => (
                    <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors">
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
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
                    <p className="text-sm text-gray-600">{businessName}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Profile Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Change Password</a>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
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
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, {ownerName.split(' ')[0]}! 👋</h2>
          <p className="text-gray-600 mt-2">Managing <span className="font-semibold text-blue-600">{businessName}</span></p>
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
            <button className="mt-4 flex items-center gap-2 text-sm font-semibold bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg px-3 py-2 transition-all">
              Create Listing <ArrowRight size={16} />
            </button>
          </div>

          {/* View Applications Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Student Applications</h3>
                <p className="text-purple-100 text-sm">5 pending applications</p>
              </div>
              <FileText size={32} className="group-hover:scale-110 transition-transform" />
            </div>
            <button className="mt-4 flex items-center gap-2 text-sm font-semibold bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg px-3 py-2 transition-all">
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

          {/* Upcoming Tasks Section */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 h-fit">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tasks Overview</h3>
              
              <div className="space-y-3">
                {upcomingTasks.map(task => {
                  const TaskIcon = task.icon;
                  return (
                    <div key={task.id} className={`${task.color} rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <TaskIcon size={20} />
                          <div>
                            <p className="font-semibold text-sm">{task.title}</p>
                            <p className="text-2xl font-bold mt-1">{task.count}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* My PGs Link */}
              <button className="w-full mt-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm">
                View My PGs List
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
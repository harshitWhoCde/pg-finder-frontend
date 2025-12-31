import React, { useState, useEffect } from 'react';
import { GraduationCap, Building2, ArrowRight } from 'lucide-react';

// --- Imports ---
import AuthForm from './components/auth/AuthForm'; 
import { StudentRegistration } from './components/auth/StudentRegistration';
import { OwnerRegistration } from './components/auth/OwnerRegistration';
import { SuccessScreen } from './components/auth/SuccessScreen';
import EnhancedStudentDashboard from './components/student/DashBoard'; 
import EnhancedOwnerDashboard from './components/owner/OwnerDashboard'; 
import AddPGForm from './components/owner/AddNewPg';
import HomePage from './pages/HomePage'; 
import ViewStudentApplicationPage from './components/owner/ViewApplications';

// 👇 NEW IMPORT: Import the List Page
import MyPGsListPage from './components/owner/PgListings'; 

// --- RoleSelection Component (No Changes) ---
const RoleSelection = ({ onSelectRole, onBackHome, mode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <button onClick={onBackHome} className="absolute top-6 left-6 text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2">
        ← Back to Home
      </button>
      <div className="w-full max-w-5xl space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            {mode === 'register' ? 'Join as a...' : 'Log in as...'}
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Choose your role to {mode === 'register' ? 'create your account' : 'access your dashboard'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Student Card */}
          <button onClick={() => onSelectRole('student')} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-blue-500 border-2 border-transparent transition-all text-left">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Student</h2>
              <p className="text-gray-600">Find the perfect PG near your college.</p>
              <div className="flex items-center gap-2 text-blue-600 font-semibold pt-2">
                <span>{mode === 'register' ? 'Create Profile' : 'Login'}</span> <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </button>

          {/* Owner Card */}
          <button onClick={() => onSelectRole('owner')} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-purple-500 border-2 border-transparent transition-all text-left">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                <Building2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Property Owner</h2>
              <p className="text-gray-600">List your property and find tenants.</p>
              <div className="flex items-center gap-2 text-purple-600 font-semibold pt-2">
                <span>{mode === 'register' ? 'List Property' : 'Login'}</span> <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [view, setView] = useState('home');
  const [authMode, setAuthMode] = useState('login'); 
  const [user, setUser] = useState(null); 

  // Check for existing session
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.role === 'student') setView('student-dashboard');
      if (parsedUser.role === 'owner') setView('owner-dashboard');
    }
  }, []);

  const handleNavLogin = () => {
    setAuthMode('login');
    setView('selection');
  };

  const handleNavRegister = () => {
    setAuthMode('register');
    setView('selection');
  };

  const handleRoleSelect = (role) => {
    if (authMode === 'login') {
      setView(`${role}-login`);
    } else {
      setView(`${role}-register`);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    if (userData.role === 'student') {
      setView('student-dashboard');
    } else if (userData.role === 'owner') {
      setView('owner-dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setView('home');
  };

  const handleRegistrationComplete = (data, type) => {
    setUser({ name: data.name, role: type, _id: data._id }); 
    setView('success');
  };

  return (
    <div>
      {/* Home */}
      {view === 'home' && (
        <HomePage onLoginClick={handleNavLogin} onRegisterClick={handleNavRegister} />
      )}

      {/* Selection */}
      {view === 'selection' && (
        <RoleSelection mode={authMode} onSelectRole={handleRoleSelect} onBackHome={() => setView('home')} />
      )}
      
      {/* Login */}
      {view === 'student-login' && (
        <AuthForm role="student" onBack={() => setView('selection')} onLoginSuccess={handleLoginSuccess} />
      )}
      {view === 'owner-login' && (
        <AuthForm role="owner" onBack={() => setView('selection')} onLoginSuccess={handleLoginSuccess} />
      )}

      {/* Register */}
      {view === 'student-register' && (
        <StudentRegistration onBack={() => setView('selection')} onComplete={(data) => handleRegistrationComplete(data, 'student')} />
      )}
      {view === 'owner-register' && (
        <OwnerRegistration onBack={() => setView('selection')} onComplete={(data) => handleRegistrationComplete(data, 'owner')} />
      )}

      {/* Success */}
      {view === 'success' && (
        <SuccessScreen 
          userType={user?.role} 
          userName={user?.name} 
          onContinue={() => {
            if (user?.role === 'student') setView('student-dashboard');
            else setView('owner-dashboard');
          }} 
        />
      )}

      {/* Dashboards */}
      {view === 'student-dashboard' && (
        <EnhancedStudentDashboard user={user} onLogout={handleLogout} />
      )}

      {/* --- OWNER DASHBOARD SECTION --- */}
      {view === 'owner-dashboard' && (
        <EnhancedOwnerDashboard 
          user={user} 
          onLogout={handleLogout} 
          // Navigation to Add Form
          onNavigateToAdd={() => setView('add-pg')} 
          // 👇 NEW: Navigation to List Page
          onViewAllProperties={() => setView('owner-all-pgs')} 

          onNavigateToApplications={() => setView('view-application')}
        />
      )}
      
      {/* Add PG Form View */}
      {view === 'add-pg' && (
        <AddPGForm 
          onBack={() => setView('owner-dashboard')} 
          onSuccess={() => setView('owner-dashboard')} 
        />
      )}

      {/* 👇 NEW VIEW: Owner All PGs List */}
      {view === 'owner-all-pgs' && (
        <MyPGsListPage 
          onBack={() => setView('owner-dashboard')} 
        />
      )}

      {view === 'view-application' && (
        <ViewStudentApplicationPage 
          onBack={() => setView('owner-dashboard')} 
        />
      )}

    </div>
  );
};

export default App;
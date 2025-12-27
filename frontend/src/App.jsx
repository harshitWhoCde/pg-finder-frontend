import React, { useState, useEffect } from 'react';
import { GraduationCap, Building2, ArrowRight } from 'lucide-react';

// --- Imports ---
import AuthForm from './components/auth/AuthForm'; 
import { StudentRegistration } from './components/auth/StudentRegistration';
import { OwnerRegistration } from './components/auth/OwnerRegistration';
import { SuccessScreen } from './components/auth/SuccessScreen';
import StudentDashboard from './components/dashboard/StudentDashboard'; // Import Dashboard
// import OwnerDashboard from './components/dashboard/OwnerDashboard'; // (Placeholder for later)
import HomePage from './pages/HomePage'; // Ensure this path is correct

// --- RoleSelection Component ---
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


const App = () => {
  const [view, setView] = useState('home');
  const [authMode, setAuthMode] = useState('login'); 
  const [user, setUser] = useState(null); // Tracks logged-in user

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Automatically redirect to dashboard if logged in
      if (parsedUser.role === 'student') setView('student-dashboard');
      if (parsedUser.role === 'owner') setView('owner-dashboard');
    }
  }, []);

  // 1. Navigation Handlers
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

  // 2. Auth Handlers
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
    // For now, we just show success screen. 
    // In a real app, you might auto-login or ask them to verify email.
    // We construct a temporary user object for the success screen
    setUser({ name: data.name, role: type }); 
    setView('success');
  };

  return (
    <div>
      {/* Home Page */}
      {view === 'home' && (
        <HomePage 
          onLoginClick={handleNavLogin} 
          onRegisterClick={handleNavRegister} 
        />
      )}

      {/* Role Selection */}
      {view === 'selection' && (
        <RoleSelection 
          mode={authMode} 
          onSelectRole={handleRoleSelect} 
          onBackHome={() => setView('home')}
        />
      )}
      
      {/* Login Views */}
      {view === 'student-login' && (
        <AuthForm 
          role="student" 
          onBack={() => setView('selection')} 
          onLoginSuccess={handleLoginSuccess} // ✅ Connected!
        />
      )}
      {view === 'owner-login' && (
        <AuthForm 
          role="owner" 
          onBack={() => setView('selection')} 
          onLoginSuccess={handleLoginSuccess} // ✅ Connected!
        />
      )}

      {/* Register Views */}
      {view === 'student-register' && (
        <StudentRegistration 
          onBack={() => setView('selection')} 
          onComplete={(data) => handleRegistrationComplete(data, 'student')} 
        />
      )}
      {view === 'owner-register' && (
        <OwnerRegistration 
          onBack={() => setView('selection')} 
          onComplete={(data) => handleRegistrationComplete(data, 'owner')} 
        />
      )}

      {/* Success View */}
      {view === 'success' && (
        <SuccessScreen 
          userType={user?.role} 
          userName={user?.name} 
          onContinue={() => setView('home')} // Or redirect to login
        />
      )}

      {/* Dashboard Views */}
      {view === 'student-dashboard' && (
        <StudentDashboard user={user} onLogout={handleLogout} />
      )}

      {view === 'owner-dashboard' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
           <h1 className="text-3xl font-bold mb-4">Owner Dashboard</h1>
           <p className="text-gray-600 mb-6">Welcome, {user?.name}. You can manage properties here.</p>
           <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Logout</button>
           {/* You can replace this div with <OwnerDashboard /> later */}
        </div>
      )}

    </div>
  );
};

export default App;
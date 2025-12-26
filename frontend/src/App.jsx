

import { Navbar } from './old_components/Navbar.jsx'
import HeroSection from './old_components/HeroSection.jsx'
import PopularAreas from './old_components/PopularAreas.jsx'
import StudentReviews from './old_components/StudentReviews.jsx'
import WhyPlatform from './old_components/WhyPlatform.jsx'
import Footer from './old_components/Footer.jsx'

import React, { useState } from 'react';
import { GraduationCap, Building2, ArrowRight } from 'lucide-react';

// --- Imports ---
import AuthForm from './components/AuthForm'; 
import HomePage from './pages/HomePage';
import { StudentRegistration } from './components/auth/StudentRegistration';
import { OwnerRegistration } from './components/auth/OwnerRegistration';
import { SuccessScreen } from './components/auth/SuccessScreen';

// --- RoleSelection Component ---
// We add 'mode' prop to change text dynamically ("Login as..." vs "Join as...")
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
  const [authMode, setAuthMode] = useState('login'); // New state: 'login' or 'register'
  const [userData, setUserData] = useState(null);

  // 1. Handle Navigation from Navbar
  const handleNavLogin = () => {
    setAuthMode('login');
    setView('selection');
  };

  const handleNavRegister = () => {
    setAuthMode('register');
    setView('selection');
  };

  // 2. Handle Role Selection Logic (The Magic Part)
  const handleRoleSelect = (role) => {
    if (authMode === 'login') {
      // If they wanted to login, send them to login forms
      setView(`${role}-login`);
    } else {
      // If they wanted to register, send them DIRECTLY to registration forms
      setView(`${role}-register`);
    }
  };

  // 3. Handle Completion
  const handleRegistrationComplete = (data, type) => {
    console.log("Registration Data:", data);
    setUserData({ name: data.name, type: type });
    setView('success');
  };

  return (
    <div>
      {/* Pass BOTH handlers to HomePage */}
      {view === 'home' && (
        <HomePage 
          onLoginClick={handleNavLogin} 
          onRegisterClick={handleNavRegister} 
        />
      )}

      {view === 'selection' && (
        <RoleSelection 
          mode={authMode} 
          onSelectRole={handleRoleSelect} 
          onBackHome={() => setView('home')}
        />
      )}
      
      {/* Login Views */}
      {view === 'student-login' && (
        <AuthForm role="student" onBack={() => setView('selection')} onRegisterClick={() => { setAuthMode('register'); setView('student-register'); }} />
      )}
      {view === 'owner-login' && (
        <AuthForm role="owner" onBack={() => setView('selection')} onRegisterClick={() => { setAuthMode('register'); setView('owner-register'); }} />
      )}

      {/* Register Views */}
      {view === 'student-register' && (
        <StudentRegistration onBack={() => setView('selection')} onComplete={(data) => handleRegistrationComplete(data, 'student')} />
      )}
      {view === 'owner-register' && (
        <OwnerRegistration onBack={() => setView('selection')} onComplete={(data) => handleRegistrationComplete(data, 'owner')} />
      )}

      {/* Success View */}
      {view === 'success' && (
        <SuccessScreen userType={userData?.type} userName={userData?.name} onContinue={() => setView('home')} />
      )}
    </div>
  );
};

export default App;
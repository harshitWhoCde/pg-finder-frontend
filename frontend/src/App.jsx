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
import MyPGsListPage from './components/owner/PgListings'; 
import EditPGPage from './components/owner/EditPgDetails';
import PGDetailsPage from './components/student/PgDetails';
import MyApplicationsPage from './components/student/Applications';
import MyBookmarksPage from './components/student/BookMarks'; // Ensure correct import path

// ... (RoleSelection Component remains the same) ...
const RoleSelection = ({ onSelectRole, onBackHome, mode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* ... (RoleSelection code) ... */}
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
          <button onClick={() => onSelectRole('student')} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-blue-500 border-2 border-transparent transition-all text-left">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600"><GraduationCap className="w-8 h-8" /></div>
              <h2 className="text-2xl font-bold text-gray-900">Student</h2>
              <p className="text-gray-600">Find the perfect PG near your college.</p>
            </div>
          </button>
          <button onClick={() => onSelectRole('owner')} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-purple-500 border-2 border-transparent transition-all text-left">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600"><Building2 className="w-8 h-8" /></div>
              <h2 className="text-2xl font-bold text-gray-900">Property Owner</h2>
              <p className="text-gray-600">List your property and find tenants.</p>
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
  const [selectedPG, setSelectedPG] = useState(null);

  // ... (useEffect and handlers remain the same) ...
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.role) {
          setUser(parsedUser);
          if (parsedUser.role === 'student') setView('student-dashboard');
          else if (parsedUser.role === 'owner') setView('owner-dashboard');
        } else {
          localStorage.removeItem('user');
        }
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleNavLogin = () => { setAuthMode('login'); setView('selection'); };
  const handleNavRegister = () => { setAuthMode('register'); setView('selection'); };
  const handleRoleSelect = (role) => {
    setView(authMode === 'login' ? `${role}-login` : `${role}-register`);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    if (userData.role === 'student') setView('student-dashboard');
    else if (userData.role === 'owner') setView('owner-dashboard');
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

  const handleViewPGDetails = (pgData) => {
    setSelectedPG(pgData);
    setView('pg-details');
  };

  const handleEditPG = (pgData) => {
    setSelectedPG(pgData);
    setView('edit-pg');
  };


  return (
    <div>
      {/* ... (Home, Selection, Auth Views remain the same) ... */}
      {view === 'home' && <HomePage onLoginClick={handleNavLogin} onRegisterClick={handleNavRegister} />}
      {view === 'selection' && <RoleSelection mode={authMode} onSelectRole={handleRoleSelect} onBackHome={() => setView('home')} />}
      
      {view === 'student-login' && <AuthForm role="student" onBack={() => setView('selection')} onLoginSuccess={handleLoginSuccess} />}
      {view === 'owner-login' && <AuthForm role="owner" onBack={() => setView('selection')} onLoginSuccess={handleLoginSuccess} />}
      
      {view === 'student-register' && <StudentRegistration onBack={() => setView('selection')} onComplete={(data) => { setUser({...data, role: 'student'}); setView('success'); }} />}
      {view === 'owner-register' && <OwnerRegistration onBack={() => setView('selection')} onComplete={(data) => { setUser({...data, role: 'owner'}); setView('success'); }} />}
      
      {view === 'success' && (
        <SuccessScreen 
          userType={user?.role} 
          userName={user?.name} 
          onContinue={() => setView(user?.role === 'student' ? 'student-dashboard' : 'owner-dashboard')} 
        />
      )}

      {/* STUDENT DASHBOARD - UPDATED WITH BOOKMARKS HANDLER */}
      {view === 'student-dashboard' && (
        <EnhancedStudentDashboard 
          user={user} 
          onLogout={handleLogout} 
          onViewDetails={handleViewPGDetails}
          onViewApplications={() => setView('my-applications')} 
          onViewBookmarks={() => setView('my-bookmarks')} // 👈 ADDED THIS LINE
        />
      )}
    
      {view === 'pg-details' && selectedPG && (
        <PGDetailsPage 
          pgData={selectedPG} 
          user={user} 
          onBack={() => setView('student-dashboard')} 
        />
      )}

      {/* NEW BOOKMARKS PAGE VIEW */}
      {view === 'my-bookmarks' && (
        <MyBookmarksPage 
          onBack={() => setView('student-dashboard')} 
        />
      )}

      {/* OWNER DASHBOARD */}
      {view === 'owner-dashboard' && (
        <EnhancedOwnerDashboard 
          user={user} 
          onLogout={handleLogout} 
          onNavigateToAdd={() => setView('add-pg')} 
          onViewAllProperties={() => setView('owner-all-pgs')} 
          onNavigateToApplications={() => setView('view-application')}
        />
      )}
      
      {view === 'add-pg' && <AddPGForm onBack={() => setView('owner-dashboard')} onSuccess={() => setView('owner-dashboard')} />}
      
      {view === 'owner-all-pgs' && (
        <MyPGsListPage 
          user={user}
          onBack={() => setView('owner-dashboard')} 
          onNavigateToAdd={() => setView('add-pg')}
          onEdit={handleEditPG}
        />
      )}

      {view === 'edit-pg' && selectedPG && (
        <EditPGPage 
          pgToEdit={selectedPG} 
          user={user} 
          onBack={() => setView('owner-all-pgs')} 
        />
      )} 
      
      {view === 'view-application' && (
        <ViewStudentApplicationPage onBack={() => setView('owner-dashboard')} />
      )}

      {view === 'my-applications' && (
        <MyApplicationsPage 
          onBack={() => setView('student-dashboard')} 
        />
      )}
    </div>
  );
};

export default App;
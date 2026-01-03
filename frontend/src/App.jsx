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

// --- RoleSelection Component ---
const RoleSelection = ({ onSelectRole, onBackHome, mode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <button
        onClick={onBackHome}
        className="absolute top-6 left-6 text-gray-500 hover:text-gray-900 font-medium"
      >
        ← Back to Home
      </button>

      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            {mode === 'register' ? 'Join as a...' : 'Log in as...'}
          </h1>
          <p className="text-gray-600 mt-2">
            Choose your role to continue
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onSelectRole('student')}
            className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl text-left"
          >
            <GraduationCap className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-xl font-bold">Student</h2>
            <p className="text-gray-600">Find PGs near your college</p>
          </button>

          <button
            onClick={() => onSelectRole('owner')}
            className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl text-left"
          >
            <Building2 className="w-8 h-8 text-purple-600 mb-4" />
            <h2 className="text-xl font-bold">Property Owner</h2>
            <p className="text-gray-600">List & manage PGs</p>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
const App = () => {
  const [view, setView] = useState('home');
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedPG, setSelectedPG] = useState(null);

  // Restore session
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setView(parsedUser.role === 'student' ? 'student-dashboard' : 'owner-dashboard');
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setView(userData.role === 'student' ? 'student-dashboard' : 'owner-dashboard');
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setView('home');
  };

  const handleEditPG = (pg) => {
    setSelectedPG(pg);
    setView('edit-pg');
  };

  const handleViewPGDetails = (pg) => {
    setSelectedPG(pg);
    setView('pg-details');
  };

  return (
    <div>
      {view === 'home' && (
        <HomePage
          onLoginClick={() => { setAuthMode('login'); setView('selection'); }}
          onRegisterClick={() => { setAuthMode('register'); setView('selection'); }}
        />
      )}

      {view === 'selection' && (
        <RoleSelection
          mode={authMode}
          onSelectRole={(role) => setView(`${role}-${authMode}`)}
          onBackHome={() => setView('home')}
        />
      )}

      {view === 'student-login' && (
        <AuthForm role="student" onBack={() => setView('selection')} onLoginSuccess={handleLoginSuccess} />
      )}

      {view === 'owner-login' && (
        <AuthForm role="owner" onBack={() => setView('selection')} onLoginSuccess={handleLoginSuccess} />
      )}

      {view === 'student-register' && (
        <StudentRegistration onBack={() => setView('selection')} />
      )}

      {view === 'owner-register' && (
        <OwnerRegistration onBack={() => setView('selection')} />
      )}

      {view === 'student-dashboard' && (
        <EnhancedStudentDashboard
          user={user}
          onLogout={handleLogout}
          onViewDetails={handleViewPGDetails}
        />
      )}

      {view === 'pg-details' && selectedPG && (
        <PGDetailsPage
          pgData={selectedPG}
          user={user}
          onBack={() => setView('student-dashboard')}
        />
      )}

      {view === 'owner-dashboard' && (
        <EnhancedOwnerDashboard
          user={user}
          onLogout={handleLogout}
          onNavigateToAdd={() => setView('add-pg')}
          onViewAllProperties={() => setView('owner-all-pgs')}
          onNavigateToApplications={() => setView('view-application')}
        />
      )}

      {view === 'add-pg' && (
        <AddPGForm onBack={() => setView('owner-dashboard')} />
      )}

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
    </div>
  );
};

export default App;

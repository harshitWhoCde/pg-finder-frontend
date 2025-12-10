import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

import ThemeToggle from "../components/common/ThemeToggle";

const HomePage = () => {
  const { isAuthenticated, role } = useAuth();

  const [authMode, setAuthMode] = useState("role-selection"); 
  const [userAuthMode, setUserAuthMode] = useState("login");

  // Redirect after login
  if (isAuthenticated) {
    if (role === "STUDENT") {
      return <Navigate to="/student/dashboard" replace />;
    } else if (role === "PG_OWNER") {
      return <Navigate to="/pg/dashboard" replace />;
    }
  }

  const handleRoleSelection = (selectedRole) => {
    if (selectedRole === "STUDENT") {
      setAuthMode("student-auth");
    } else {
      setAuthMode("owner-auth");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-100 dark:to-dark-200">
      
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        {authMode === "role-selection" && (
          <div className="max-w-4xl mx-auto text-center">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-dark-800 mb-4">
                PG Finder
              </h1>
              <p className="text-xl text-gray-600 dark:text-dark-600">
                Find the perfect PG or manage your listings easily
              </p>
            </div>

            {/* Role Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">

              {/* Student Card */}
              <div
                onClick={() => handleRoleSelection("STUDENT")}
                className="card card-hover cursor-pointer group hover:scale-105 transition-all"
              >
                <div className="text-center">
                  
                  <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14c-4 0-7 3-7 7h14c0-4-3-7-7-7zM12 12a4 4 0 100-8 4 4 0 000 8z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold">I am a Student</h3>
                  <p className="text-gray-600 dark:text-dark-600">
                    Discover verified PG accommodations nearby
                  </p>
                </div>
              </div>

              {/* PG Owner Card */}
              <div
                onClick={() => handleRoleSelection("PG_OWNER")}
                className="card card-hover cursor-pointer group hover:scale-105 transition-all"
              >
                <div className="text-center">

                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7m-9-5v12m4-12l2 2m-2-2v12m0 0h-4"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold">I am a PG Owner</h3>
                  <p className="text-gray-600 dark:text-dark-600">
                    Manage PG listings and connect with students
                  </p>
                </div>
              </div>
            </div>

            {/* PG Owner Registration Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-800 rounded-xl p-6 max-w-2xl mx-auto">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3">
                🔒 New PG Owner? Registration Required
              </h4>
              <p className="text-blue-700 dark:text-blue-300 mb-3">
                To maintain listing quality, PG Owners must be verified.
              </p>

              <div className="bg-white dark:bg-dark-200 p-4 rounded-lg border border-blue-300 dark:border-blue-700">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-1">
                  Email your PG details and government ID to:
                </p>
                <a
                  href="mailto:pg.owner.register@gmail.com"
                  className="text-blue-700 font-bold underline"
                >
                  pg.owner.register@gmail.com
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Student Authentication */}
        {authMode === "student-auth" && (
          <div className="max-w-md mx-auto">
            
            {/* Back Button */}
            <button
              className="text-primary-600 mb-6 flex items-center"
              onClick={() => setAuthMode("role-selection")}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>

            {userAuthMode === "login" ? (
              <LoginForm
                role="STUDENT"
                onSwitchToSignup={() => setUserAuthMode("signup")}
              />
            ) : (
              <SignupForm
                role="STUDENT"
                onSwitchToLogin={() => setUserAuthMode("login")}
              />
            )}
          </div>
        )}

        {/* PG Owner Authentication */}
        {authMode === "owner-auth" && (
          <div className="max-w-md mx-auto">

            {/* Back Button */}
            <button
              className="text-primary-600 mb-6 flex items-center"
              onClick={() => setAuthMode("role-selection")}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>

            {/* PG Owner is Login Only */}
            <LoginForm role="PG_OWNER" onSwitchToSignup={() => {}} />

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                Need to Register Your PG?
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Email your PG details to:{" "}
                <a
                  href="mailto:pg.owner.register@gmail.com"
                  className="font-bold underline"
                >
                  pg.owner.register@gmail.com
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

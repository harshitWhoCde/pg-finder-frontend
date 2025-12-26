import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { CheckCircle2, ArrowRight, Home, FileEdit } from "lucide-react";
import confetti from "canvas-confetti"; // Make sure you ran 'npm install canvas-confetti'

export function SuccessScreen({ userType, userName, collegeName, onContinue }) {
  useEffect(() => {
    // Confetti Animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 text-center space-y-8">
          {/* Success Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full blur-3xl"></div>
            <div className="relative w-24 h-24 lg:w-32 lg:h-32 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl text-gray-900">
              {userType === 'student' ? "You're in," : "Welcome,"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{userName}!</span>
            </h1>
            <p className="text-xl text-gray-600">
              {userType === 'student' 
                ? `Welcome to UniStays. Browse verified PGs near ${collegeName || 'your college'}.`
                : "Profile Under Review. You can start drafting your listing while we verify your documents."
              }
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {userType === 'student' ? (
              <>
                <div className="bg-blue-50 rounded-2xl p-6 text-left">
                  <Home className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="text-gray-900 font-semibold mb-2">Browse Listings</h3>
                  <p className="text-sm text-gray-600">Explore 200+ verified PG accommodations.</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-6 text-left">
                  <CheckCircle2 className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="text-gray-900 font-semibold mb-2">Save Favorites</h3>
                  <p className="text-sm text-gray-600">Shortlist PGs and compare them easily.</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-purple-50 rounded-2xl p-6 text-left">
                  <FileEdit className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="text-gray-900 font-semibold mb-2">Create Listing</h3>
                  <p className="text-sm text-gray-600">Add photos and details for your property.</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 text-left">
                  <CheckCircle2 className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="text-gray-900 font-semibold mb-2">Quick Approval</h3>
                  <p className="text-sm text-gray-600">We review documents within 24-48 hours.</p>
                </div>
              </>
            )}
          </div>

          {/* Action Button */}
          <Button
            onClick={onContinue}
            className={`w-full h-12 text-lg gap-2 ${
              userType === 'student' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600'
            }`}
          >
            {userType === 'student' ? 'Start Browsing' : 'Create Your Listing'} <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

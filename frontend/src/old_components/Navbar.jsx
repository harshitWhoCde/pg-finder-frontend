import React, { useState } from 'react';
import { Home, MapPin, Star, Phone, Menu, X } from 'lucide-react';
import { Button } from "../components/ui/button"; // Ensure this path is correct based on your folder structure

// 1. ADD onRegisterClick TO PROPS 👇
export function Navbar({ onLoginClick, onRegisterClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2. Separate handlers for Mobile Menu
  const handleMobileLogin = () => {
    setIsMobileMenuOpen(false);
    if (onLoginClick) onLoginClick();
  };

  const handleMobileRegister = () => {
    setIsMobileMenuOpen(false);
    if (onRegisterClick) onRegisterClick();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '#'}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 leading-none">PG Finder</span>
              <span className="text-xs font-medium text-gray-500">TIMSCDR Students</span>
            </div>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a href="#nearby-pgs" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Nearby PGs</span>
            </a>
            <a href="#reviews" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              <Star className="w-4 h-4" />
              <span>Reviews</span>
            </a>
            <a href="#contact" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" onClick={onLoginClick}>
              Login
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:opacity-90 transition-opacity"
              onClick={onRegisterClick}
            >
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top-5">
          <div className="flex flex-col p-4 space-y-4">
            <a href="#home" className="flex items-center gap-3 text-gray-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </a>
            <a href="#nearby-pgs" className="flex items-center gap-3 text-gray-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Nearby PGs</span>
            </a>
            <a href="#reviews" className="flex items-center gap-3 text-gray-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>
              <Star className="w-5 h-5" />
              <span className="font-medium">Reviews</span>
            </a>
            
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <Button variant="outline" className="w-full justify-center" onClick={handleMobileLogin}>
                Login
              </Button>
              <Button 
                className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600" 
                onClick={handleMobileRegister}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
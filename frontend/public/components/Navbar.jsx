import React, { useState } from 'react';
import { Home, MapPin, Star, Phone, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind classes safely
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Reusable Button Component
 * (Replaces the import { Button } from "./ui/button")
 */
const Button = React.forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 text-gray-700",
    ghost: "hover:bg-gray-100 hover:text-gray-900 text-gray-600",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

/**
 * Main Navbar Component
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <span>Student Reviews</span>
            </a>
            <a href="#contact" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline">
              Login
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:opacity-90 transition-opacity">
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
        <div className="md:hidden border-t border-gray-100 bg-white">
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
              <span className="font-medium">Student Reviews</span>
            </a>
            <a href="#contact" className="flex items-center gap-3 text-gray-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>
              <Phone className="w-5 h-5" />
              <span className="font-medium">Contact</span>
            </a>
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <Button variant="outline" className="w-full justify-center">Login</Button>
              <Button className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600">Register</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/**
 * Main App Component (Layout for demo purposes)
 */
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      {/* Hero Section Placeholder */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Find Your Perfect <span className="text-blue-600">Student Home</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The exclusive PG finding platform for TIMSCDR students. Verified listings, honest reviews, and seamless connectivity.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
              Explore PGs
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              List Your Property
            </Button>
          </div>
        </div>

        {/* Features Grid Placeholder */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            { title: "Verified Listings", icon: <Star className="w-8 h-8 text-blue-500" /> },
            { title: "Close to Campus", icon: <MapPin className="w-8 h-8 text-purple-500" /> },
            { title: "Direct Contact", icon: <Phone className="w-8 h-8 text-green-500" /> },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
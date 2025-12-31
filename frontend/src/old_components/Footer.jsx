import React from 'react';
// 1. ADD THIS LINE BELOW 👇
import { Home, Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react'; 

export default function Footer () {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 scroll-mt-20">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg text-white">PG Buddy</div>
                <div className="text-xs text-gray-400">TIMSCDR Students</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted platform to find safe and verified PG accommodations.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#nearby-pgs" className="hover:text-white transition-colors">Browse PGs</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#contact" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Safety Guidelines</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                <span className="text-sm">Kandivali East, Mumbai</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <span className="text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-sm">support@pgbuddy.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2025 PG Buddy - TIMSCDR Students.</p>
        </div>
      </div>
    </footer>
  );
};

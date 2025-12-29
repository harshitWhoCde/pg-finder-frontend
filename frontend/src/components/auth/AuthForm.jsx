import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, ArrowLeft, Loader2, GraduationCap, Building2 } from 'lucide-react';

// --- Local Shared Components (So you don't need extra files) ---

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const baseStyles = "w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25",
    outline: "border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 bg-transparent",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
    />
  </div>
);

// --- The Main Login Component ---

const AuthForm = ({ role, onBack, onLoginSuccess }) => { 
  const isStudent = role === 'student';
  const themeColor = isStudent ? 'blue' : 'purple';
  
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Login Logic
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page reload
    
    try {
      setLoading(true);
      
      // 1. Call Backend
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email,
        password
      });

      if (res.data.success) {
        // 2. Save Session
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        // 3. Navigate
        alert("Login Successful!");
        onLoginSuccess(res.data.user);
      } else {
        alert(res.data.message);
      }

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Login Failed. Check your connection.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Left Side - Form */}
        <div className="p-8 lg:p-12 space-y-8 flex flex-col justify-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to selection
          </button>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {isStudent ? 'Student Login' : 'Partner Portal'}
            </h2>
            <p className="text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <InputField 
                icon={Mail} 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField 
                icon={Lock} 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className={`font-medium hover:underline text-${themeColor}-600`}>Forgot password?</a>
            </div>

            <Button type="submit" disabled={loading} className={`bg-${themeColor}-600`}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account? 
            <button onClick={onBack} className={`ml-1 font-semibold hover:underline text-${themeColor}-600`}>
              Go back and Join
            </button>
          </p>
        </div>

        {/* Right Side - Decorator */}
        <div className={`hidden md:flex flex-col justify-between p-12 text-white bg-gradient-to-br ${isStudent ? 'from-blue-600 to-indigo-700' : 'from-purple-600 to-pink-600'}`}>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
              {isStudent ? <GraduationCap className="w-6 h-6 text-white" /> : <Building2 className="w-6 h-6 text-white" />}
            </div>
            <h3 className="text-3xl font-bold">
              {isStudent ? "Find your home away from home." : "Manage your properties with ease."}
            </h3>
            <p className="text-blue-100/90 text-lg leading-relaxed">
              {isStudent 
                ? "Join thousands of students finding verified PGs and hostels near their campus."
                : "The most trusted platform for property owners to find verified tenants."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;
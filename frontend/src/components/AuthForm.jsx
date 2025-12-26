import React, { useState } from 'react';
import { GraduationCap, Building2, ArrowLeft, Mail, Lock } from 'lucide-react';

// --- Shared Components (Ensure these are defined or imported) ---

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const baseStyles = "w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25",
    outline: "border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 bg-transparent",
    ghost: "text-gray-500 hover:text-gray-900 bg-transparent hover:bg-gray-100"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const InputField = ({ icon: Icon, type, placeholder, name, value, onChange }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    <input 
      type={type} 
      name={name}        // Added name prop for state handling
      value={value}      // Added value prop
      onChange={onChange} // Added onChange prop
      placeholder={placeholder}
      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
    />
  </div>
);

// --- The Main AuthForm Component ---

const AuthForm = ({ role, onBack }) => {
  const isStudent = role === 'student';
  const themeColor = isStudent ? 'blue' : 'purple';
  
  // 1. State for Form Data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // 2. Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Submit (Ready for Backend)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitting as ${role}:`, formData);
    // TODO: Add your axios.post here
    // example: axios.post('/api/auth/login', { ...formData, role })
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
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField 
                icon={Lock} 
                type="password" 
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className={`rounded border-gray-300 text-${themeColor}-600 focus:ring-${themeColor}-500`} />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className={`font-medium hover:underline text-${themeColor}-600`}>Forgot password?</a>
            </div>

            <Button type="submit">
              Sign in
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button">Google</Button>
              <Button variant="outline" type="button">Apple</Button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account? <a href="#" className={`font-semibold hover:underline text-${themeColor}-600`}>Sign up for free</a>
          </p>
        </div>

        {/* Right Side - Decorator */}
        <div className={`hidden md:flex flex-col justify-between p-12 text-white bg-gradient-to-br ${isStudent ? 'from-blue-600 to-indigo-700' : 'from-purple-600 to-pink-600'}`}>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
              {isStudent ? <GraduationCap className="w-6 h-6 text-white" /> : <Building2 className="w-6 h-6 text-white" />}
            </div>
            <h3 className="text-2xl font-bold">
              {isStudent ? "Find your home away from home." : "Manage your properties with ease."}
            </h3>
            <p className="text-blue-100/90 leading-relaxed">
              {isStudent 
                ? "Join thousands of students finding verified PGs and hostels near their campus."
                : "The most trusted platform for property owners to find verified tenants."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-sm font-medium">"This platform made finding a PG so simple. The verification badge gave me peace of mind."</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">AS</div>
                <div className="text-xs opacity-80">
                  <div className="font-semibold">Ananya S.</div>
                  <div>Student, Delhi University</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
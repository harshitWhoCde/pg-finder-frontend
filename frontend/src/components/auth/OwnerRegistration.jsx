import React, { useState } from 'react';
import axios from 'axios';
import { Building2, MapPin, Upload, Loader2, ArrowLeft, User, Mail, Phone, Lock } from 'lucide-react';

// Reusable Input Component
const InputField = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <input 
        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
        {...props}
      />
    </div>
  </div>
);

export const OwnerRegistration = ({ onBack, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    propertyName: '',
    address: '',
    distanceToCollege: '',
    idProof: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Prepare Form Data (Required for file upload)
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('password', formData.password);
      data.append('role', 'owner'); // Important!
      
      // Owner Specific Fields
      data.append('propertyName', formData.propertyName);
      data.append('address', formData.address); // Backend expects 'address'
      data.append('distanceToCollege', formData.distanceToCollege);
      
      // File
      if (formData.idProof) {
        data.append('idProof', formData.idProof);
      }

      // 2. Send to Backend
      const res = await axios.post('http://localhost:8080/api/v1/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        onComplete(res.data.user);
      } else {
        alert(res.data.message);
      }

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
        
        {/* Header */}
        <div className="bg-purple-600 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <button onClick={onBack} className="flex items-center gap-2 text-purple-100 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-3xl font-bold">Partner Registration</h2>
            <p className="text-purple-100 mt-2">List your property and connect with students.</p>
          </div>
          <Building2 className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-purple-500 opacity-50 rotate-12" />
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <InputField 
                  icon={User} 
                  label="Full Name" 
                  name="name" 
                  placeholder="John Doe" 
                  required 
                  onChange={handleChange}
                />
                <InputField 
                  icon={Phone} 
                  label="Phone Number" 
                  name="phone" 
                  placeholder="+91 98765 43210" 
                  required 
                  onChange={handleChange}
                />
              </div>
              <InputField 
                icon={Mail} 
                label="Email Address" 
                name="email" 
                type="email" 
                placeholder="john@example.com" 
                required 
                onChange={handleChange}
              />
              <InputField 
                icon={Lock} 
                label="Create Password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                onChange={handleChange}
              />
            </div>

            {/* Property Details */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Property Info</h3>
              <InputField 
                icon={Building2} 
                label="Property Name" 
                name="propertyName" 
                placeholder="e.g. Sai Residency" 
                required 
                onChange={handleChange}
              />
              <InputField 
                icon={MapPin} 
                label="Full Address" 
                name="address" 
                placeholder="Plot No, Street, Area, City" 
                required 
                onChange={handleChange}
              />
              <InputField 
                icon={MapPin} 
                label="Distance to College (km)" 
                name="distanceToCollege" 
                type="number" 
                placeholder="e.g. 1.5" 
                required 
                onChange={handleChange}
              />
            </div>

            {/* ID Proof Upload */}
            <div className="pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload ID Proof (Govt. ID)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-purple-500 transition-colors text-center cursor-pointer relative group bg-gray-50">
                <input 
                  type="file" 
                  name="idProof" 
                  onChange={handleChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2 group-hover:text-purple-500 transition-colors" />
                <p className="text-sm text-gray-500 group-hover:text-purple-600">
                  {formData.idProof ? formData.idProof.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/30 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Registering...</> : "Complete Registration"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};
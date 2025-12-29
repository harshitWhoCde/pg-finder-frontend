import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, Plus, Home, LogOut, Trash2, Edit, Upload, MapPin, IndianRupee, Users, TrendingUp, X, Loader2 } from 'lucide-react';

const OwnerDashboard = ({ user, onLogout }) => {
  const [properties, setProperties] = useState([]);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // New Property Form State
  const [formData, setFormData] = useState({
    title: '', address: '', rent: '', type: 'PG', distanceToCollege: '', city: '', photos: null
  });

  // --- 1. Fetch Properties ---
  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      // For now using get-all. Ideally backend should have '/my-properties' endpoint using the token to filter
      const res = await axios.get('http://localhost:8080/api/v1/property/get-all'); 
      if (res.data.success) {
        setProperties(res.data.properties); 
      }
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  // --- 2. Handle Add Property ---
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('ownerId', user._id);
      Object.keys(formData).forEach(key => {
        if(key === 'photos' && formData.photos) {
          for(let i=0; i<formData.photos.length; i++) data.append('photos', formData.photos[i]);
        } else {
          data.append(key, formData[key]);
        }
      });

      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:8080/api/v1/property/add', data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: token }
      });

      if(res.data.success) {
        alert("Property Added!");
        setIsAddPropertyOpen(false);
        fetchMyProperties();
        setFormData({ title: '', address: '', rent: '', type: 'PG', distanceToCollege: '', city: '', photos: null });
      }
    } catch (error) {
      alert("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files : value }));
  };

  // Stats Calculation
  const totalRevenue = properties.reduce((sum, p) => sum + (p.rent || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-md">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900 leading-none">Owner Panel</div>
                <div className="text-xs text-gray-500 font-medium mt-1">UniStays</div>
              </div>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Action Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">My Properties</h1>
            <p className="text-gray-600">Manage your student accommodations</p>
          </div>
          <button 
            onClick={() => setIsAddPropertyOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-purple-500/30 flex items-center gap-2 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> Add New Property
          </button>
        </div>

        {/* --- ADD PROPERTY FORM (Modal) --- */}
        {isAddPropertyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold">Add New Property</h2>
                <button onClick={() => setIsAddPropertyOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5"/></button>
              </div>
              <form onSubmit={handleAddSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Property Title</label>
                    <input name="title" required value={formData.title} onChange={handleChange} className="w-full mt-1 p-3 border rounded-xl bg-gray-50 focus:ring-2 ring-purple-500 outline-none" placeholder="e.g. Laxmi Hostel" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Rent (₹)</label>
                    <input name="rent" type="number" required value={formData.rent} onChange={handleChange} className="w-full mt-1 p-3 border rounded-xl bg-gray-50 focus:ring-2 ring-purple-500 outline-none" />
                  </div>
                </div>
                <div>
                   <label className="text-sm font-medium text-gray-700">City</label>
                   <input name="city" required value={formData.city} onChange={handleChange} className="w-full mt-1 p-3 border rounded-xl bg-gray-50 outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Address</label>
                  <textarea name="address" required value={formData.address} onChange={handleChange} className="w-full mt-1 p-3 border rounded-xl bg-gray-50 outline-none" rows="2"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="text-sm font-medium text-gray-700">Distance (km)</label>
                      <input name="distanceToCollege" type="number" required value={formData.distanceToCollege} onChange={handleChange} className="w-full mt-1 p-3 border rounded-xl bg-gray-50 outline-none" />
                   </div>
                   <div>
                      <label className="text-sm font-medium text-gray-700">Type</label>
                      <select name="type" value={formData.type} onChange={handleChange} className="w-full mt-1 p-3 border rounded-xl bg-gray-50 outline-none">
                        <option>PG</option>
                        <option>Hostel</option>
                        <option>Flat</option>
                      </select>
                   </div>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <input type="file" multiple name="photos" onChange={handleChange} className="hidden" id="photo-upload" />
                  <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-purple-600 font-medium">Click to upload photos</span>
                  </label>
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl flex justify-center items-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : "Publish Listing"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Listing Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Properties', val: properties.length, icon: Home, color: 'text-purple-600', bg: 'bg-purple-100' },
            { label: 'Active Tenants', val: properties.length * 3, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' }, // Dummy logic for tenants
            { label: 'Est. Revenue', val: `₹${(totalRevenue/1000).toFixed(1)}k`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.val}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow flex gap-6">
               <img 
                 src={property.photos?.[0] ? `http://localhost:8080/${property.photos[0]}` : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5"} 
                 className="w-32 h-32 object-cover rounded-xl bg-gray-200"
                 alt="Prop"
               />
               <div className="flex-1">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
                    <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-bold border border-purple-200">{property.type}</span>
                 </div>
                 <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                    <MapPin className="w-4 h-4" /> {property.city}
                 </div>
                 <div className="flex items-center gap-4 text-sm font-medium text-gray-700 mb-4">
                    <div className="flex items-center gap-1"><IndianRupee className="w-4 h-4" /> {property.rent}/mo</div>
                    <div className="flex items-center gap-1"><Users className="w-4 h-4" /> 0 tenants</div>
                 </div>
                 <div className="flex gap-2">
                    <button className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2"><Edit className="w-3 h-3"/> Edit</button>
                    <button className="flex-1 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 flex items-center justify-center gap-2"><Trash2 className="w-3 h-3"/> Delete</button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
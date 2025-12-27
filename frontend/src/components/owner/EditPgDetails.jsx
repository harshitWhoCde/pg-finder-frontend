import React, { useState } from 'react';
import { Bell, ArrowLeft, LogOut, X, Upload, ChevronDown, Wifi, Snowflake, UtensilsCrossed, MapPin, Plus, Trash2 } from 'lucide-react';

export default function AddNewPGPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [formData, setFormData] = useState({
    // Basic Info
    pgName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    
    // Details
    description: '',
    houseRules: '',
    ownerPolicies: '',
    
    // Amenities
    amenities: [],
    
    // Room Info
    roomType: '',
    numRooms: '',
    pricePerRoom: '',
    occupancy: '',
    
    // Preferences
    genderPreference: '',
    petPolicy: '',
    visitorPolicy: ''
  });

  const ownerName = "Rajesh Sharma";

  const amenitiesList = [
    { id: 'wifi', label: 'Wi-Fi', icon: 'Wifi' },
    { id: 'ac', label: 'AC', icon: 'AC' },
    { id: 'food', label: 'Food', icon: 'Food' },
    { id: 'parking', label: 'Parking', icon: 'Parking' },
    { id: 'laundry', label: 'Laundry', icon: 'Laundry' },
    { id: 'security', label: '24/7 Security', icon: 'Security' }
  ];

  const steps = [
    { title: 'Basic Info', icon: '📋' },
    { title: 'Details', icon: '📝' },
    { title: 'Photos', icon: '📷' },
    { title: 'Amenities', icon: '⭐' },
    { title: 'Room Info', icon: '🛏️' },
    { title: 'Preferences', icon: '⚙️' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAmenityToggle = (amenityId) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenityId)
        ? formData.amenities.filter(a => a !== amenityId)
        : [...formData.amenities, amenityId]
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages([...uploadedImages, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 0: // Basic Info
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">PG Name *</label>
              <input 
                type="text" 
                name="pgName"
                value={formData.pgName}
                onChange={handleInputChange}
                placeholder="e.g., Sharma PG"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter complete address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g., New Delhi"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                <input 
                  type="text" 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="e.g., 110016"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        );

      case 1: // Details
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your PG and why students should choose it..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">House Rules *</label>
              <textarea 
                name="houseRules"
                value={formData.houseRules}
                onChange={handleInputChange}
                placeholder="List your house rules (e.g., Quiet hours, Visitor policy, etc.)"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Policies</label>
              <textarea 
                name="ownerPolicies"
                value={formData.ownerPolicies}
                onChange={handleInputChange}
                placeholder="Any specific policies or terms (e.g., Notice period, Deposit amount, etc.)"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              ></textarea>
            </div>
          </div>
        );

      case 2: // Photos
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
              <Upload size={40} className="mx-auto text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Upload PG Photos</h3>
              <p className="text-sm text-gray-600 mb-4">Click or drag and drop to upload images</p>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageInput"
              />
              <label 
                htmlFor="imageInput"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all font-semibold inline-block"
              >
                Choose Files
              </label>
            </div>

            {uploadedImages.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Uploaded Images ({uploadedImages.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedImages.map((image, idx) => (
                    <div key={idx} className="relative group">
                      <img src={image} alt={`Preview ${idx}`} className="w-full h-32 object-cover rounded-lg border border-gray-300" />
                      <button 
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3: // Amenities
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Select all amenities available in your PG</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenitiesList.map(amenity => (
                <button
                  key={amenity.id}
                  onClick={() => handleAmenityToggle(amenity.id)}
                  className={`p-4 rounded-lg border-2 font-semibold transition-all flex items-center justify-center gap-2 ${
                    formData.amenities.includes(amenity.id)
                      ? 'bg-blue-100 border-blue-600 text-blue-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
                  }`}
                >
                  {amenity.icon === 'Wifi' && <Wifi size={18} />}
                  {amenity.icon === 'AC' && <Snowflake size={18} />}
                  {amenity.icon === 'Food' && <UtensilsCrossed size={18} />}
                  {amenity.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 4: // Room Info
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Room Type *</label>
              <div className="flex gap-3">
                {['Single', 'Double', 'Shared'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, roomType: type })}
                    className={`flex-1 py-2 px-3 rounded-lg font-semibold border-2 transition-all ${
                      formData.roomType === type
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Rooms *</label>
                <input 
                  type="number" 
                  name="numRooms"
                  value={formData.numRooms}
                  onChange={handleInputChange}
                  placeholder="e.g., 5"
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price per Room *</label>
                <input 
                  type="number" 
                  name="pricePerRoom"
                  value={formData.pricePerRoom}
                  onChange={handleInputChange}
                  placeholder="e.g., 15000"
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Occupancy per Room</label>
                <input 
                  type="number" 
                  name="occupancy"
                  value={formData.occupancy}
                  onChange={handleInputChange}
                  placeholder="e.g., 2"
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        );

      case 5: // Preferences
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender Preference *</label>
              <div className="flex gap-3">
                {['Any', 'Male', 'Female'].map(gender => (
                  <button
                    key={gender}
                    onClick={() => setFormData({ ...formData, genderPreference: gender })}
                    className={`flex-1 py-2 px-3 rounded-lg font-semibold border-2 transition-all ${
                      formData.genderPreference === gender
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pet Policy *</label>
              <div className="flex gap-3">
                {['Allowed', 'Not Allowed'].map(policy => (
                  <button
                    key={policy}
                    onClick={() => setFormData({ ...formData, petPolicy: policy })}
                    className={`flex-1 py-2 px-3 rounded-lg font-semibold border-2 transition-all ${
                      formData.petPolicy === policy
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {policy}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Visitor Policy *</label>
              <div className="flex gap-3">
                {['Open', 'Restricted', 'No Visitors'].map(policy => (
                  <button
                    key={policy}
                    onClick={() => setFormData({ ...formData, visitorPolicy: policy })}
                    className={`flex-1 py-2 px-3 rounded-lg font-semibold border-2 transition-all ${
                      formData.visitorPolicy === policy
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {policy}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              PG
            </div>
            <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">PGBuddy</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Bell size={24} />
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow"
              >
                {ownerName.charAt(0)}
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{ownerName}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile Settings</a>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Add New PG</h2>
          <p className="text-gray-600 mt-2">Create a new property listing</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between overflow-x-auto pb-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(idx)}
                  className={`w-12 h-12 rounded-full font-bold flex items-center justify-center transition-all ${
                    currentStep === idx
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : currentStep > idx
                      ? 'bg-green-100 text-green-800 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                  }`}
                  title={step.title}
                >
                  {step.icon}
                </button>
                
                {idx < steps.length - 1 && (
                  <div className={`h-1 w-8 mx-2 ${currentStep > idx ? 'bg-green-300' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-semibold text-gray-700 mt-4">{steps[currentStep].title}</p>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 mb-8">
          {renderStepContent()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-between">
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                ← Previous
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Cancel
            </button>

            <button className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
              Save as Draft
            </button>

            {currentStep < steps.length - 1 ? (
              <button 
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold"
              >
                Next →
              </button>
            ) : (
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold">
                Publish PG
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
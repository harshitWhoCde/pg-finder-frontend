import React, { useState } from 'react';
import { Upload, X, Check, Save, Eye, MapPin, AlertCircle } from 'lucide-react';

export default function AddPGForm({ onBack, onSuccess }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    latitude: '',
    longitude: '',
    phoneNumber: '',
    ownerName: '',
    type: 'PG',
    rent: '',
    occupancy: '',
    description: '',
    photos: [],
    amenities: [],
    gender: 'Any',
    isActive: true,
    houseRules: '',
    ownerPolicies: '',
    petPolicy: 'Not Allowed',
    visitorPolicy: 'Allowed with Restrictions'
  });

  const sections = ['Basic Info', 'Property Details', 'Photos', 'Amenities', 'Preferences'];

  const amenitiesList = ['WiFi', 'AC', 'Food', 'Parking', 'Laundry', 'TV', 'Refrigerator', 'Geyser', 'Gym', 'Power Backup', 'CCTV', 'Security'];

  const validateSection = (sectionIndex) => {
    const newErrors = {};

    switch(sectionIndex) {
      case 0:
        if (!formData.title.trim()) newErrors.title = 'Property title is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.phoneNumber.trim()) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber.replace(/[^\d]/g, ''))) {
          newErrors.phoneNumber = 'Invalid phone number';
        }
        if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
        if (!formData.latitude || !formData.longitude) newErrors.location = 'Location required';
        break;

      case 1:
        if (!formData.type) newErrors.type = 'Property type is required';
        if (!formData.rent || formData.rent <= 0) newErrors.rent = 'Valid rent is required';
        if (!formData.occupancy || formData.occupancy <= 0) newErrors.occupancy = 'Occupancy is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        break;

      case 2:
        if (images.length === 0) newErrors.photos = 'At least one photo required';
        break;

      case 3:
        if (formData.amenities.length === 0) newErrors.amenities = 'Select at least one amenity';
        break;

      case 4:
        if (!formData.gender) newErrors.gender = 'Gender preference is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file
    }));
    setImages([...images, ...newImages]);
    setErrors({...errors, photos: ''});
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
    setErrors({...errors, amenities: ''});
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude, 
          longitude: position.coords.longitude
          });
          setErrors({...errors, location: ''});
        },
        (error) => {
          alert('Unable to get location. Please enter manually.');
        }
      );
    }
  };

  const handleSaveDraft = () => {
    let allValid = true;
    for (let i = 0; i < sections.length; i++) {
      if (!validateSection(i)) {
        allValid = false;
        setCurrentSection(i);
        break;
      }
    }

    if (allValid) {
      const propertyData = {
        title: formData.title,
        address: formData.address,
        city: formData.city,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        rent: parseFloat(formData.rent),
        type: formData.type,
        photos: images.map(img => img.url),
        amenities: formData.amenities,
        gender: formData.gender,
        occupancy: parseInt(formData.occupancy),
        description: formData.description,
        phoneNumber: formData.phoneNumber,
        ownerName: formData.ownerName,
        isActive: false,
        houseRules: formData.houseRules,
        ownerPolicies: formData.ownerPolicies,
        petPolicy: formData.petPolicy,
        visitorPolicy: formData.visitorPolicy
      };

      console.log('Saving draft:', propertyData);
      alert('Draft saved successfully!');
    }
  };

  const handlePublish = async () => {
  // 1. Run Validation
  let allValid = true;
  for (let i = 0; i < sections.length; i++) {
    if (!validateSection(i)) {
      allValid = false;
      setCurrentSection(i);
      break;
    }
  }

  if (allValid) {
    try {
      // 2. Initialize FormData for Multipart Upload
      const data = new FormData();

      // 3. Append simple text fields
      data.append('title', formData.title);
      data.append('address', formData.address);
      data.append('city', formData.city);
      data.append('rent', parseFloat(formData.rent));
      data.append('type', formData.type);
      data.append('gender', formData.gender);
      data.append('occupancy', parseInt(formData.occupancy));
      data.append('description', formData.description);
      data.append('phoneNumber', formData.phoneNumber);
      data.append('ownerName', formData.ownerName);
      data.append('isActive', "true"); // FormData sends everything as strings
      data.append('houseRules', formData.houseRules);
      data.append('ownerPolicies', formData.ownerPolicies);
      data.append('petPolicy', formData.petPolicy);
      data.append('visitorPolicy', formData.visitorPolicy);

      // 4. Append Complex Objects as JSON strings
      // MongoDB GeoJSON format: [longitude, latitude]
      const locationData = {
        type: "Point",
        coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)]
      };
      data.append('location', JSON.stringify(locationData));
      
      data.append('amenities', JSON.stringify(formData.amenities));

      // 5. Append actual File objects for photos
      images.forEach((image) => {
        // Ensure image.file contains the actual File object from handleImageUpload
        data.append('photos', image.file);
      });

      // 6. API Call
      const response = await fetch('http://localhost:8080/api/v1/properties/add', {
        method: 'POST',
        headers: {
          // Important: Get token for protected route
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
          // Note: Browser automatically sets "Content-Type: multipart/form-data" 
          // with the correct boundary when it sees the Body is FormData.
        },
        body: data
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Publishing Success:', result);
        alert('Property published successfully!');
        onSuccess(); //redirects back to owner dashboard
        // Optional: navigate('/dashboard');
      } else {
        throw new Error(result.message || 'Failed to publish property');
      }

    } catch (error) {
      console.error('Error during publishing:', error);
      alert(`Error: ${error.message}`);
    }
  }
};

  const renderSection = () => {
    switch(currentSection) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({...formData, title: e.target.value});
                  setErrors({...errors, title: ''});
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., Sunshine Boys PG"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => {
                  setFormData({...formData, address: e.target.value});
                  setErrors({...errors, address: ''});
                }}
                rows="3"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Complete address"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.address}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => {
                  setFormData({...formData, city: e.target.value});
                  setErrors({...errors, city: ''});
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="City name"
              />
              {errors.city && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Coordinates *</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="0.000001"
                  value={formData.latitude}
                  onChange={(e) => {
                    setFormData({...formData, latitude: e.target.value});
                    setErrors({...errors, location: ''});
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Latitude"
                />
                <input
                  type="number"
                  step="0.000001"
                  value={formData.longitude}
                  onChange={(e) => {
                    setFormData({...formData, longitude: e.target.value});
                    setErrors({...errors, location: ''});
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Longitude"
                />
              </div>
              <button onClick={getLocation} className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <MapPin className="w-4 h-4" /> Use Current Location
              </button>
              {errors.location && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name *</label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => {
                  setFormData({...formData, ownerName: e.target.value});
                  setErrors({...errors, ownerName: ''});
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.ownerName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Your name"
              />
              {errors.ownerName && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.ownerName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData({...formData, phoneNumber: e.target.value});
                  setErrors({...errors, phoneNumber: ''});
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="+91 XXXXX XXXXX"
              />
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.phoneNumber}</p>}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
              <select
                value={formData.type}
                onChange={(e) => {
                  setFormData({...formData, type: e.target.value});
                  setErrors({...errors, type: ''});
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="PG">PG</option>
                <option value="Hostel">Hostel</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rent per Month (₹) *</label>
                <input
                  type="number"
                  value={formData.rent}
                  onChange={(e) => {
                    setFormData({...formData, rent: e.target.value});
                    setErrors({...errors, rent: ''});
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.rent ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="5000"
                  min="0"
                />
                {errors.rent && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.rent}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Occupancy *</label>
                <input
                  type="number"
                  value={formData.occupancy}
                  onChange={(e) => {
                    setFormData({...formData, occupancy: e.target.value});
                    setErrors({...errors, occupancy: ''});
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.occupancy ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="2"
                  min="1"
                />
                {errors.occupancy && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.occupancy}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => {
                  setFormData({...formData, description: e.target.value});
                  setErrors({...errors, description: ''});
                }}
                rows="4"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Describe your property..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">House Rules</label>
              <textarea
                value={formData.houseRules}
                onChange={(e) => setFormData({...formData, houseRules: e.target.value})}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Rules and regulations..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Owner Policies</label>
              <textarea
                value={formData.ownerPolicies}
                onChange={(e) => setFormData({...formData, ownerPolicies: e.target.value})}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Payment terms, deposit..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className={`border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 transition-colors ${errors.photos ? 'border-red-500' : 'border-gray-300'}`}>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Click to upload images</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </label>
            </div>

            {errors.photos && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.photos}</p>}

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={image.id} className="relative group rounded-lg overflow-hidden border border-gray-200">
                    <img src={image.url} alt="Property" className="w-full h-40 object-cover" />
                    {index === 0 && <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">Cover</div>}
                    <button onClick={() => removeImage(image.id)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <p className="text-gray-600">Select amenities *</p>
            {errors.amenities && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.amenities}</p>}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.amenities.includes(amenity) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} className="w-5 h-5 text-blue-600 rounded" />
                  <span className="ml-3 text-gray-700 font-medium">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Gender Preference *</label>
              {errors.gender && <p className="mb-2 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.gender}</p>}
              <div className="grid grid-cols-3 gap-4">
                {['Male', 'Female', 'Any'].map((option) => (
                  <label key={option} className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.gender === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="gender" value={option} checked={formData.gender === option} onChange={(e) => {
                      setFormData({...formData, gender: e.target.value});
                      setErrors({...errors, gender: ''});
                    }} className="sr-only" />
                    <span className="font-medium text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Pet Policy</label>
              <div className="grid grid-cols-2 gap-4">
                {['Allowed', 'Not Allowed'].map((option) => (
                  <label key={option} className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.petPolicy === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="pets" value={option} checked={formData.petPolicy === option} onChange={(e) => setFormData({...formData, petPolicy: e.target.value})} className="sr-only" />
                    <span className="font-medium text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Visitor Policy</label>
              <div className="space-y-3">
                {['Allowed Anytime', 'Allowed with Restrictions', 'Not Allowed'].map((option) => (
                  <label key={option} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.visitorPolicy === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="visitors" value={option} checked={formData.visitorPolicy === option} onChange={(e) => setFormData({...formData, visitorPolicy: e.target.value})} className="sr-only" />
                    <span className="font-medium text-gray-700">{option}</span>
                  </label>
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* 1. NEW TOP BACK BUTTON */}
        <button 
          onClick={onBack} 
          className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          ← Back to Dashboard
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Property</h1>
          <p className="text-gray-600">Fill in all required fields to list your property</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 overflow-x-auto">
          <div className="flex justify-between items-center min-w-max">
            {sections.map((section, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${index === currentSection ? 'bg-blue-600 text-white' : index < currentSection ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {index < currentSection ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium hidden md:block ${index === currentSection ? 'text-blue-600' : 'text-gray-600'}`}>
                  {section}
                </span>
                {index < sections.length - 1 && <div className={`w-12 h-1 mx-2 ${index < currentSection ? 'bg-green-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{sections[currentSection]}</h2>
          {renderSection()}
        </div>

        <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-6">
          <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>

          <div className="flex gap-3">
            {currentSection > 0 && (
              <button onClick={() => setCurrentSection(currentSection - 1)} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                Previous
              </button>
            )}

            {currentSection < sections.length - 1 ? (
              <button onClick={handleNext} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
                Next
              </button>
            ) : (
              <div className="flex gap-3">
                <button onClick={handleSaveDraft} className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2">
                  <Save className="w-5 h-5" /> Save Draft
                </button>
                <button onClick={handlePublish} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
                  <Eye className="w-5 h-5" /> Publish
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
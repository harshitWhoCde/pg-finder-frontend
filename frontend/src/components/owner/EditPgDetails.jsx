import React, { useState, useEffect } from 'react';
import { Bell, ArrowLeft, LogOut, X, Upload, Wifi, Snowflake, UtensilsCrossed, MapPin, Plus, Trash2, Search, Loader2 } from 'lucide-react';

export default function EditPGPage({ onBack, pgToEdit, user }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // New: Loading state

  const [formData, setFormData] = useState({
    pgName: pgToEdit?.title || '',
    address: pgToEdit?.address || '',
    city: pgToEdit?.city || '',
    pincode: pgToEdit?.pincode || '',
    phone: pgToEdit?.phone || '',
    description: pgToEdit?.description || '',
    houseRules: pgToEdit?.houseRules || '',
    ownerPolicies: pgToEdit?.ownerPolicies || '',
    amenities: pgToEdit?.amenities || [],
    roomType: pgToEdit?.roomType || '',
    numRooms: pgToEdit?.numRooms || '',
    pricePerRoom: pgToEdit?.rent || '',
    occupancy: pgToEdit?.occupancy || '',
    genderPreference: pgToEdit?.genderPreference || 'Any',
    petPolicy: pgToEdit?.petPolicy || 'Not Allowed',
    visitorPolicy: pgToEdit?.visitorPolicy || 'Restricted'
  });

  const ownerName = user?.name || "Owner";

  useEffect(() => {
    if (pgToEdit?.photos && pgToEdit.photos.length > 0) {
      const existingPhotos = pgToEdit.photos.map(path => 
        path.startsWith('http') ? path : `http://localhost:8080/${path}`
      );
      setUploadedImages(existingPhotos);
    }
  }, [pgToEdit]);

  // 👇 NEW: FUNCTION TO SAVE CHANGES TO DATABASE
  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    try {
      const cleanPhotos = uploadedImages.map(img => {
  if (img.includes('http://localhost:8080/')) {
    return img.replace('http://localhost:8080/', '');
  }
  return img; // Keep as is if it's a new Base64 string or already a path
});
      // Note: Use the ID from pgToEdit. Adjust the URL to match your backend route
      const response = await fetch(`http://localhost:8080/api/v1/property/update/${pgToEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // If your route is protected, add the token:
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: formData.pgName,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          phone: formData.phone,
          description: formData.description,
          houseRules: formData.houseRules,
          amenities: formData.amenities,
          roomType: formData.roomType,
          numRooms: formData.numRooms,
          rent: formData.pricePerRoom,
          occupancy: formData.occupancy,
          genderPreference: formData.genderPreference,
          photos: cleanPhotos // Note: handling image updates usually requires Multer/FormData
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('PG details updated successfully!');
        onBack(); // Go back to the list page
      } else {
        alert(`Update failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating PG:', error);
      alert('An error occurred while saving.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      reader.onload = (event) => setUploadedImages(prev => [...prev, event.target.result]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => setUploadedImages(uploadedImages.filter((_, i) => i !== index));

  const amenitiesList = [
    { id: 'wifi', label: 'Wi-Fi' }, { id: 'ac', label: 'AC' }, 
    { id: 'food', label: 'Food' }, { id: 'parking', label: 'Parking' }, 
    { id: 'laundry', label: 'Laundry' }, { id: 'security', label: '24/7 Security' }
  ];

  const steps = [
    { title: 'Basic Info', icon: '📋' }, { title: 'Details', icon: '📝' },
    { title: 'Photos', icon: '📷' }, { title: 'Amenities', icon: '⭐' },
    { title: 'Room Info', icon: '🛏️' }, { title: 'Preferences', icon: '⚙️' }
  ];

  const renderStepContent = () => {
    switch(currentStep) {
        case 0: return (
            <div className="space-y-4">
              <input type="text" name="pgName" value={formData.pgName} onChange={handleInputChange} placeholder="PG Name" className="w-full p-2 border rounded" />
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="w-full p-2 border rounded" />
              <div className="grid grid-cols-3 gap-2">
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="p-2 border rounded" />
                <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" className="p-2 border rounded" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="p-2 border rounded" />
              </div>
            </div>
        );
        case 1: return (
            <div className="space-y-4">
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" rows="4" className="w-full p-2 border rounded" />
              <textarea name="houseRules" value={formData.houseRules} onChange={handleInputChange} placeholder="House Rules" rows="3" className="w-full p-2 border rounded" />
            </div>
        );
        case 2: return (
            <div className="space-y-4">
              <input type="file" multiple onChange={handleImageUpload} id="imageInput" className="hidden" />
              <label htmlFor="imageInput" className="p-4 border-2 border-dashed block text-center cursor-pointer">Upload New Photos</label>
              <div className="grid grid-cols-3 gap-2">
                {uploadedImages.map((img, i) => (
                  <div key={i} className="relative"><img src={img} className="h-20 w-full object-cover" /><button onClick={() => removeImage(i)} className="absolute top-0 right-0 bg-red-500 text-white p-1">X</button></div>
                ))}
              </div>
            </div>
        );
        case 3: return (
            <div className="grid grid-cols-2 gap-2">
              {amenitiesList.map(a => (
                <button key={a.id} onClick={() => handleAmenityToggle(a.id)} className={`p-2 border rounded ${formData.amenities.includes(a.id) ? 'bg-blue-100 border-blue-600' : ''}`}>{a.label}</button>
              ))}
            </div>
        );
        case 4: return (
            <div className="space-y-4">
              <div className="flex gap-2">
                {['Single', 'Double', 'Shared'].map(t => <button key={t} onClick={() => setFormData({...formData, roomType: t})} className={`flex-1 p-2 border rounded ${formData.roomType === t ? 'bg-blue-600 text-white' : ''}`}>{t}</button>)}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input type="number" name="numRooms" value={formData.numRooms} onChange={handleInputChange} placeholder="Rooms" className="p-2 border rounded" />
                <input type="number" name="pricePerRoom" value={formData.pricePerRoom} onChange={handleInputChange} placeholder="Rent" className="p-2 border rounded" />
                <input type="number" name="occupancy" value={formData.occupancy} onChange={handleInputChange} placeholder="Occ." className="p-2 border rounded" />
              </div>
            </div>
        );
        case 5: return (
            <div className="flex gap-2">
                {['Any', 'Male', 'Female'].map(g => <button key={g} onClick={() => setFormData({...formData, genderPreference: g})} className={`flex-1 p-2 border rounded ${formData.genderPreference === g ? 'bg-blue-600 text-white' : ''}`}>{g}</button>)}
            </div>
        );
        default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2"><ArrowLeft size={20} /> Back</button>
        <h1 className="text-xl font-bold">Edit PG</h1>
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">{ownerName[0]}</div>
      </header>

      <main className="max-w-3xl mx-auto p-6">
        <div className="flex justify-between mb-8 overflow-x-auto gap-4">
          {steps.map((s, i) => (
            <div key={i} className={`text-center ${currentStep === i ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center ${currentStep === i ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{s.icon}</div>
                <p className="text-xs mt-1">{s.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
          {renderStepContent()}
        </div>

        <div className="flex justify-between">
          <button disabled={currentStep === 0} onClick={() => setCurrentStep(prev => prev - 1)} className="px-6 py-2 bg-gray-200 rounded disabled:opacity-50">Previous</button>
          
          {currentStep < steps.length - 1 ? (
            <button onClick={() => setCurrentStep(prev => prev + 1)} className="px-6 py-2 bg-blue-600 text-white rounded">Next</button>
          ) : (
            <button 
              onClick={handleSaveChanges} 
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded flex items-center gap-2 disabled:bg-green-400"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Save Changes'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
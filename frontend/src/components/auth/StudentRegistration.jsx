import React, { useState } from "react";
import { Button } from "../ui/button"; // Adjust path to ../../ui/button if needed
import { Input } from "../ui/input";   // Adjust path to ../../ui/input if needed
import { Label } from "../ui/label";   // Adjust path to ../../ui/label if needed
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"; // Adjust path
import { Slider } from "../ui/slider"; // Ensure this file exists or remove import
import { ArrowLeft, ArrowRight, Upload, ShieldCheck, User, Mail, Phone, Lock, School } from "lucide-react";
import axios from "axios";
// NOTICE THE 'export' KEYWORD HERE 👇
export function StudentRegistration({ onBack, onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    college: "",
    studentId: null,
    budgetRange: [5000, 12000],
    roomType: [],
    amenities: []
  });

  const roomTypes = ["Single", "Double", "Triple", "Shared"];
  const amenitiesList = ["WiFi", "AC", "Food Included", "Laundry", "Parking", "Security", "Power Backup", "Water Supply"];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const toggleRoomType = (type) => {
    setFormData(prev => ({
      ...prev,
      roomType: prev.roomType.includes(type)
        ? prev.roomType.filter(t => t !== type)
        : [...prev.roomType, type]
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
            <span className="text-sm text-gray-700">Student Registration</span>
          </div>
          <h1 className="text-3xl lg:text-4xl text-gray-900">
            Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Profile</span>
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {step} of 3</span>
            <span className="text-sm text-gray-600">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl text-gray-900">Basic Information</h2>
                <p className="text-gray-600">Tell us a bit about yourself</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Verification */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl text-gray-900">Student Verification</h2>
                <p className="text-gray-600">Verify your student status for safety</p>
              </div>

              {/* Verification Badge */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-900">Verification Required for Safety</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      We verify all students to ensure a safe community for everyone
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="college" className="flex items-center gap-2">
                    <School className="w-4 h-4" /> Select College/University
                  </Label>
                  <Select 
                    value={formData.college}
                    onValueChange={(value) => setFormData({ ...formData, college: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose your college" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tcet">Thakur College of Engineering and Technology (TCET)</SelectItem>
                      <SelectItem value="kjsce">K.J. Somaiya College of Engineering</SelectItem>
                      <SelectItem value="spit">Sardar Patel Institute of Technology</SelectItem>
                      <SelectItem value="djsce">Dwarkadas J. Sanghvi College of Engineering</SelectItem>
                      <SelectItem value="vjti">Veermata Jijabai Technological Institute (VJTI)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Upload Student ID Card
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      id="studentId"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*,.pdf"
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.files?.[0] || null })}
                    />
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    {formData.studentId ? (
                      <p className="text-sm text-gray-900">{formData.studentId.name}</p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-900">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF (max. 5MB)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl text-gray-900">Your Preferences</h2>
                <p className="text-gray-600">Help us find the perfect PG for you</p>
              </div>

              <div className="space-y-6">
                {/* Budget Range - Simplified Input since Slider UI might be missing */}
                <div className="space-y-4">
                  <Label>Budget Range (Monthly)</Label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                         <Label className="text-xs text-gray-500 mb-1">Min Budget</Label>
                         <Input 
                            type="number" 
                            value={formData.budgetRange[0]} 
                            onChange={(e) => setFormData({...formData, budgetRange: [parseInt(e.target.value), formData.budgetRange[1]]})}
                         />
                    </div>
                    <div className="flex-1">
                         <Label className="text-xs text-gray-500 mb-1">Max Budget</Label>
                         <Input 
                            type="number" 
                            value={formData.budgetRange[1]} 
                            onChange={(e) => setFormData({...formData, budgetRange: [formData.budgetRange[0], parseInt(e.target.value)]})}
                         />
                    </div>
                  </div>
                </div>

                {/* Room Type */}
                <div className="space-y-3">
                  <Label>Room Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {roomTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleRoomType(type)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all ${
                          formData.roomType.includes(type)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  <Label>Preferred Amenities</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {amenitiesList.map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all text-sm ${
                          formData.amenities.includes(amenity)
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 h-12 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 gap-2"
            >
              {step === 3 ? 'Complete Registration' : 'Next'}
              {step < 3 && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
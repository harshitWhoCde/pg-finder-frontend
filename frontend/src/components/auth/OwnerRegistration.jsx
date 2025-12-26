import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea"; // Ensure you have this component or use a standard <textarea>
import { ArrowLeft, ArrowRight, Upload, ShieldCheck, User, Mail, Phone, Building2, MapPin, FileText } from "lucide-react";

export function OwnerRegistration({ onBack, onComplete }) {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    propertyName: "",
    distanceToCollege: "",
    address: "",
    idProof: null,
    propertyDocs: null
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const handleSendOTP = () => {
    // Mock OTP sending logic
    setOtpSent(true);
    alert(`OTP sent to ${formData.phone}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
            <span className="text-sm text-gray-700">Property Owner Registration</span>
          </div>
          <h1 className="text-3xl lg:text-4xl text-gray-900">
            List Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Property</span>
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
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
          {/* Step 1: Account Creation */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl text-gray-900">Account Information</h2>
                <p className="text-gray-600">Create your owner account</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" /> Owner Name
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
                    <Phone className="w-4 h-4" /> Mobile Number
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 flex-1"
                    />
                    <Button
                      onClick={handleSendOTP}
                      variant="outline"
                      className="h-12 px-6"
                      disabled={otpSent}
                    >
                      {otpSent ? 'Sent' : 'Send OTP'}
                    </Button>
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      className="h-12"
                      maxLength={6}
                    />
                    <p className="text-xs text-gray-500">
                      OTP sent to {formData.phone}. Didn&apos;t receive? <button className="text-blue-600 hover:underline">Resend</button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Property Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl text-gray-900">Property Details</h2>
                <p className="text-gray-600">Tell us about your property</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyName" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Property Name
                  </Label>
                  <Input
                    id="propertyName"
                    placeholder="e.g., Sunshine PG for Boys"
                    value={formData.propertyName}
                    onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Property Address
                  </Label>
                  {/* Using standard textarea if UI component is missing, otherwise ensure Textarea is imported */}
                  <textarea
                    id="address"
                    placeholder="Enter complete address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="min-h-24 w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distance">Distance to Nearest College</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="distance"
                      type="number"
                      placeholder="e.g., 2"
                      value={formData.distanceToCollege}
                      onChange={(e) => setFormData({ ...formData, distanceToCollege: e.target.value })}
                      className="h-12"
                    />
                    <span className="text-gray-600 min-w-fit">kilometers</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: KYC Verification */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl text-gray-900">Verification Documents</h2>
                <p className="text-gray-600">Upload documents for verification</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-900">We Verify All Owners</h3>
                    <p className="text-xs text-gray-600 mt-1">Verification typically takes 24-48 hours.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idProof" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" /> ID Proof (Aadhaar/PAN)
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      id="idProof"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*,.pdf"
                      onChange={(e) => setFormData({ ...formData, idProof: e.target.files?.[0] || null })}
                    />
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-purple-600" />
                    </div>
                    {formData.idProof ? (
                      <p className="text-sm text-gray-900">{formData.idProof.name}</p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-900">Click to upload</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF (max. 5MB)</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm text-gray-700">
                      I agree to the Terms & Conditions and confirm that all information is accurate.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <Button onClick={handleBack} variant="outline" className="flex-1 h-12 gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button onClick={handleNext} className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 gap-2">
              {step === 3 ? 'Submit for Verification' : 'Next'}
              {step < 3 && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
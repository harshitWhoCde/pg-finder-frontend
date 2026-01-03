import React, { useState } from "react";
import {
  MapPin,
  Users,
  Phone,
  Mail,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Home
} from "lucide-react";

export default function PGDetailsPage({ pgData, onBack, user }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    college: "",
    year: "",
    message: ""
  });

  const pgImages = pgData?.photos || [];

  const nextImage = () => {
    if (!pgImages.length) return;
    setCurrentImageIndex((i) => (i + 1) % pgImages.length);
  };

  const prevImage = () => {
    if (!pgImages.length) return;
    setCurrentImageIndex((i) => (i - 1 + pgImages.length) % pgImages.length);
  };

  // ✅ SAFE APPLY HANDLER
  const handleApply = async () => {
    if (!formData.phone || !formData.college || !formData.year) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:8080/api/applications/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            propertyId: pgData._id,
            phone: formData.phone,
            college: formData.college,
            year: formData.year,
            message: formData.message
          })
        }
      );

      // 🛑 SAFETY CHECK (prevents <!DOCTYPE> crash)
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        alert("Server error. Please try again.");
        return;
      }

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to apply");
        return;
      }

      alert("Application submitted successfully!");
      setShowApplyModal(false);
      setFormData({ phone: "", college: "", year: "", message: "" });

    } catch (err) {
      console.error(err);
      alert("Network / server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* HEADER */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded">
            <ArrowLeft />
          </button>
          <h1 className="text-xl font-bold">PGBuddy</h1>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl overflow-hidden shadow mb-6">
            <div className="relative h-96 flex items-center justify-center bg-gray-100">
              {pgImages.length ? (
                <img
                  src={
                    pgImages[currentImageIndex].startsWith("http")
                      ? pgImages[currentImageIndex]
                      : `http://localhost:8080/${pgImages[currentImageIndex]}`
                  }
                  className="w-full h-full object-cover"
                />
              ) : (
                <Home size={64} className="text-gray-300" />
              )}

              {pgImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 bg-white p-2 rounded-full"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 bg-white p-2 rounded-full"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h1 className="text-3xl font-bold">{pgData.title}</h1>
            <p className="text-gray-600 flex items-center gap-2 mt-2">
              <MapPin /> {pgData.address}, {pgData.city}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <Users /> {pgData.occupancy} Sharing • {pgData.gender}
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-4">
              ₹{pgData.rent}/month
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-24">
          <h3 className="font-bold mb-4">Owner Info</h3>
          <p>{pgData.owner?.name}</p>
          <p className="flex gap-2 mt-2">
            <Phone /> {pgData.owner?.phoneNumber}
          </p>
          <p className="flex gap-2 mt-2">
            <Mail /> {pgData.owner?.email}
          </p>

          <button
            onClick={() => setShowApplyModal(true)}
            className="w-full mt-4 bg-purple-600 text-white py-3 rounded"
          >
            Apply for PG
          </button>
        </div>
      </main>

      {/* APPLY MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Apply for PG</h3>

            {["phone", "college", "year"].map((field) => (
              <input
                key={field}
                placeholder={field.toUpperCase()}
                className="w-full border p-2 rounded mb-3"
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
              />
            ))}

            <textarea
              placeholder="Message (optional)"
              className="w-full border p-2 rounded mb-4"
              rows={3}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 border py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

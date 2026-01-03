import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function ViewStudentApplicationPage({ onBack }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/applications/owner",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      const res = await fetch(
        `http://localhost:8080/api/applications/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status } : app
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update application");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 mb-6"
      >
        <ArrowLeft /> Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-6">
        Student Applications
      </h1>

      {loading && <p>Loading applications...</p>}

      {!loading && applications.length === 0 && (
        <p className="text-gray-500">
          No applications received yet.
        </p>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-xl shadow p-5 border"
          >
            <h3 className="font-bold text-lg">
              {app.student.name}
            </h3>
            <p className="text-sm text-gray-600">
              {app.student.email}
            </p>

            <div className="mt-3 text-sm">
              <p><strong>PG:</strong> {app.property.title}</p>
              <p><strong>College:</strong> {app.studentDetails.college}</p>
              <p><strong>Phone:</strong> {app.studentDetails.phone}</p>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(app.status)}`}
              >
                {app.status}
              </span>

              {app.status === "PENDING" && (
                <>
                  <button
                    disabled={updatingId === app._id}
                    onClick={() => updateStatus(app._id, "APPROVED")}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    Accept
                  </button>
                  <button
                    disabled={updatingId === app._id}
                    onClick={() => updateStatus(app._id, "REJECTED")}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>

            {app.studentDetails.message && (
              <p className="mt-3 italic text-gray-700">
                “{app.studentDetails.message}”
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";

const SignupForm = ({ role, onSwitchToLogin }) => {
  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Signup Form ({role})</h2>
      {onSwitchToLogin && (
        <button className="mt-4 underline text-blue-600" onClick={onSwitchToLogin}>
          Switch to Login
        </button>
      )}
    </div>
  );
};

export default SignupForm;

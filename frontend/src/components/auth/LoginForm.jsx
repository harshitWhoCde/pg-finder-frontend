import React from "react";

const LoginForm = ({ role, onSwitchToSignup }) => {
  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Login Form ({role})</h2>
      {onSwitchToSignup && (
        <button className="mt-4 underline text-blue-600" onClick={onSwitchToSignup}>
          Switch to Signup
        </button>
      )}
    </div>
  );
};

export default LoginForm;

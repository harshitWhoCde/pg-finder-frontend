import React, { createContext, useContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  role: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ isAuthenticated: false, role: null }}>
      {children}
    </AuthContext.Provider>
  );
};

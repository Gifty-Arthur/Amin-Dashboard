import React, { createContext, useState, useEffect, useContext } from "react";
import { checkAuth, logoutUser } from "./authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("learnerToken");
      if (token) {
        try {
          const response = await checkAuth();
          setUser(response.user || response.data);
        } catch (error) {
          console.error("Token validation failed, logging out:", error);
          logout(); // Call the context's logout function
        }
      }
    };
    verifyUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("learnerToken", token);
    localStorage.setItem("learnerUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser(); // Call API via service
    } catch (error) {
      console.error("Server logout failed:", error);
    } finally {
      localStorage.removeItem("learnerToken");
      localStorage.removeItem("learnerUser");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

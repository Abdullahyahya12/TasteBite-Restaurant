import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { API_BASE_URL } from "../config/api";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("tastebite-user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("tastebite-token") || null;
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // Save Authentication Data
  // =========================

  const saveAuthData = (authToken, authUser) => {
    localStorage.setItem("tastebite-token", authToken);
    localStorage.setItem(
      "tastebite-user",
      JSON.stringify(authUser)
    );

    setToken(authToken);
    setUser(authUser);
  };

  // =========================
  // Register
  // =========================

  const register = async (userData) => {
    const response = await fetch(
      `${API_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Registration failed"
      );
    }

    saveAuthData(data.token, data.user);

    return data;
  };

  // =========================
  // Login
  // =========================

  const login = async (credentials) => {
    const response = await fetch(
      `${API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Login failed"
      );
    }

    saveAuthData(data.token, data.user);

    return data;
  };

  // =========================
  // Logout
  // =========================

  const logout = () => {
    localStorage.removeItem("tastebite-token");
    localStorage.removeItem("tastebite-user");

    setToken(null);
    setUser(null);
  };

  // =========================
  // Verify Existing Session
  // =========================

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          logout();
          return;
        }

        setUser(data.user);

        localStorage.setItem(
          "tastebite-user",
          JSON.stringify(data.user)
        );
      } catch (error) {
        console.error(
          "Authentication verification failed:",
          error
        );

        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token && user),
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export default AuthProvider;
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Session Timeout Logic (5 minutes)
  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      if (timeout) clearTimeout(timeout);
      if (user) {
        timeout = setTimeout(() => {
          alert('Je bent automatisch uitgelogd vanwege inactiviteit (5 minuten).');
          logout();
        }, 5 * 60 * 1000); // 5 minutes
      }
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    if (user) {
      resetTimer(); // Start timer
      events.forEach(event => window.addEventListener(event, resetTimer));
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user, logout]);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('loginTime', Date.now());
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

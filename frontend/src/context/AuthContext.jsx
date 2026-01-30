import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('admin_token');
      if (storedToken) {
        try {
          const response = await fetch(`${API_URL}/api/admin/me`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          if (response.ok) {
            const data = await response.json();
            setAdmin(data);
            setToken(storedToken);
          } else {
            localStorage.removeItem('admin_token');
            setToken(null);
            setAdmin(null);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('admin_token');
          setToken(null);
          setAdmin(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [API_URL]);

  const login = async (username, password) => {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('admin_token', data.access_token);
    setToken(data.access_token);
    setAdmin({ id: data.admin_id, username: data.username });
    return data;
  };

  const register = async (username, password, email) => {
    const response = await fetch(`${API_URL}/api/admin/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('admin_token', data.access_token);
    setToken(data.access_token);
    setAdmin({ id: data.admin_id, username: data.username });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

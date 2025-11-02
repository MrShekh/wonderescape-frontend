import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import components
import LandingPage from './components/LandingPage/LandingPage';
import DestinationExplorer from './components/DestinationExplorer/DestinationExplorer';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated (you can implement your own auth logic)
  const isAuthenticated = localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/destinations" element={<DestinationExplorer />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <div>Admin Dashboard</div>
          </ProtectedRoute>
        }
      />
      
      {/* 404 Route */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes; 

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Ruta protegida que solo permite acceso si el usuario está logueado.
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-4">Cargando...</p>;

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
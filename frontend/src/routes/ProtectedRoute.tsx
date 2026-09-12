// src/components/common/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps { requiredRole?: 'ADMIN' | 'CUSTOMER' }

export function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />

  return <Outlet />
}

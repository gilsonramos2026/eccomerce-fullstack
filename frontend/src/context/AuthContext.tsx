// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react'
import { api } from '../services/api'

interface AuthUser { name: string; role: 'CUSTOMER' | 'ADMIN' }

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  async function login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify({ name: data.name, role: data.role }))
    setUser({ name: data.name, role: data.role })
  }

  async function register(name: string, email: string, password: string) {
    const { data } = await api.post('/auth/register', { name, email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify({ name: data.name, role: data.role }))
    setUser({ name: data.name, role: data.role })
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}

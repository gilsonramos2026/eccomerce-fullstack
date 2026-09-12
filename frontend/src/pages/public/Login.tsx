// src/pages/public/Login.tsx
import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../../components/common/Button'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch {
      setError('E-mail ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-[var(--text-title)]">Entrar</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email" required placeholder="E-mail" value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-[var(--border-line)] bg-[var(--bg-surface)] rounded-md px-3 py-2 text-[var(--text-title)]"
        />
        <input
          type="password" required placeholder="Senha" value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-[var(--border-line)] bg-[var(--bg-surface)] rounded-md px-3 py-2 text-[var(--text-title)]"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
      </form>
      <p className="text-sm text-[var(--text-body)]">
        Não tem conta? <Link to="/register" className="text-[var(--color-primary)]">Cadastre-se</Link>
      </p>
    </div>
  )
}

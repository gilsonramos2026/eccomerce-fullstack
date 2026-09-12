// src/pages/public/SignUp.tsx
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../../components/common/Button'

export function SignUp() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch {
      setError('Não foi possível criar sua conta.')
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-10 items-center min-h-[70vh]">
      <div className="hidden md:block bg-[var(--color-ink-950)] rounded-md h-[520px]" />

      <div className="max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-semibold text-[var(--text-title)] mb-2">Create an account</h1>
        <p className="text-sm text-[var(--text-body)] mb-8">Enter your details below</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Name" required value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="border-b border-[var(--border-line)] bg-transparent py-2 outline-none"
          />
          <input
            type="email" placeholder="Email" required value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="border-b border-[var(--border-line)] bg-transparent py-2 outline-none"
          />
          <input
            type="password" placeholder="Password" required value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="border-b border-[var(--border-line)] bg-transparent py-2 outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">Create Account</Button>
        </form>

        <p className="text-sm text-[var(--text-body)] mt-6 text-center">
          Already have an account? <Link to="/login" className="underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}

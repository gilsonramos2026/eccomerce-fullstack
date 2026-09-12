// src/components/layout/Header.tsx
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { TopBar } from '../../layout/TopBar'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/contact', label: 'Contact' },
  { to: '/about', label: 'About' },
  { to: '/signup', label: 'Sign Up' },
]

export function Header() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate(`/products?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="border-b border-[var(--border-line)] bg-[var(--bg-surface)]">
      <TopBar />
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="text-2xl font-bold text-[var(--text-title)] shrink-0">
          Exclusive
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--text-title)]">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="hover:text-[var(--color-primary)]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-[var(--bg-base)] rounded-md px-3 py-1.5">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="bg-transparent text-sm outline-none w-40"
            />
            <button type="submit" aria-label="Buscar">🔍</button>
          </form>

          <Link to="/wishlist" aria-label="Wishlist" className="text-xl">♡</Link>

          <Link to="/cart" aria-label="Carrinho" className="relative text-xl">
            🛒
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {user ? (
            <button onClick={logout} className="text-sm text-[var(--text-body)]">Sair ({user.name})</button>
          ) : (
            <Link to="/login" aria-label="Conta" className="text-xl">👤</Link>
          )}
        </div>
      </div>
    </header>
  )
}

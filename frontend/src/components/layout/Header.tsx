import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/Button'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-line)] bg-[var(--bg-panel)] backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold tracking-tight text-[var(--text-title)]">
            E-Commerce<span className="text-[var(--color-primary)]">.</span>
          </Link>
        </div>

        {/* NAVEGAÇÃO DE ROTAS */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/products" className="text-sm font-medium text-[var(--text-body)] hover:text-[var(--text-title)] transition-colors">
            Produtos
          </Link>
          <Link to="/categories" className="text-sm font-medium text-[var(--text-body)] hover:text-[var(--text-title)] transition-colors">
            Categorias
          </Link>
          <Link to="/orders/me" className="text-sm font-medium text-[var(--text-body)] hover:text-[var(--text-title)] transition-colors">
            Meus Pedidos
          </Link>
        </nav>

        {/* ACÇÕES / BOTÕES */}
        <div className="flex items-center gap-4">
          {/* Alternador de Tema */}
          <Button variant="ghost" onClick={toggleTheme} aria-label="Alternar tema" className="p-2">
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>

          {/* Carrinho de Compras */}
          <Link to="/cart" className="relative p-2 text-[var(--text-body)] hover:text-[var(--text-title)] transition-colors">
            <span>🛒</span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
              0
            </span>
          </Link>

          {/* Login */}
          <Link to="/login">
            <Button variant="outline" className="px-4 py-1.5 text-xs">Entrar</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

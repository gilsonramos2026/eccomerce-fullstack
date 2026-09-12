import { Outlet, NavLink } from 'react-router-dom'

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Produtos' },
  { to: '/admin/orders', label: 'Pedidos' },
]

export function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-(--bg-base)">
      <aside className="w-64 bg-(--bg-surface) border-r border-(--border-line) p-4">
        <h2 className="text-lg font-bold text-(--text-title) mb-6">Painel Admin</h2>
        <nav className="flex flex-col gap-1">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm ${isActive
                  ? 'bg-(--color-primary) text-white'
                  : 'text-(--text-body) hover:bg-(--bg-base)'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

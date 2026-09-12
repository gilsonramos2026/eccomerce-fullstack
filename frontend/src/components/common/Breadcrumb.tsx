// src/components/common/Breadcrumb.tsx
import { Link } from 'react-router-dom'

interface Crumb { label: string; to?: string }

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-[var(--text-body)] py-4">
      {items.map((item, i) => (
        <span key={item.label}>
          {item.to ? <Link to={item.to} className="hover:text-[var(--text-title)]">{item.label}</Link> : (
            <span className="text-[var(--text-title)]">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  )
}

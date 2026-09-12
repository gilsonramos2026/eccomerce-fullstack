// src/components/layout/TopBar.tsx
import { useState } from 'react'

export function TopBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="bg-[var(--color-ink-950)] text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-center relative">
        <p>
          Summer Sale For All Suits and Free Express Delivery - OFF 50%!{' '}
          <a href="/products" className="underline font-semibold">ShopNow</a>
        </p>
        <div className="absolute right-4 flex items-center gap-4">
          <select className="bg-transparent text-sm outline-none" defaultValue="pt">
            <option value="pt">Português</option>
            <option value="en">English</option>
          </select>
          <button onClick={() => setVisible(false)} aria-label="Fechar" className="text-lg leading-none">×</button>
        </div>
      </div>
    </div>
  )
}

// src/components/product/ProductSection.tsx
import type { ReactNode } from 'react'
import { Button } from '../common/Button'

interface ProductSectionProps {
  tag: string
  title: string
  action?: ReactNode
  children: ReactNode
}

export function ProductSection({ tag, title, action, children }: ProductSectionProps) {
  return (
    <section className="py-10">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-4 h-8 bg-[var(--color-primary)] rounded" />
        <span className="text-sm font-semibold text-[var(--color-primary)]">{tag}</span>
      </div>
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--text-title)]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

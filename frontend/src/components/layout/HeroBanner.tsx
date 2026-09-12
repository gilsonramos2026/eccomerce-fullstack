// src/components/layout/HeroBanner.tsx
import { Link } from 'react-router-dom'

export function HeroBanner() {
  return (
    <section className="bg-[var(--color-ink-950)] text-white rounded-xl overflow-hidden flex items-center justify-between px-10 py-12 mt-6">
      <div>
        <span className="text-sm text-[var(--color-ink-200)]">iPhone 15 Series</span>
        <h1 className="text-3xl md:text-4xl font-bold my-3 max-w-sm">Up to 10% off Voucher</h1>
        <Link to="/products" className="inline-block border-b-2 border-white pb-1 text-sm">
          Shop Now →
        </Link>
      </div>
      <div className="hidden md:block w-56 h-56 bg-white/10 rounded-full" />
    </section>
  )
}

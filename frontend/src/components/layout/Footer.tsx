// src/components/layout/Footer.tsx
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-[var(--color-ink-950)] text-[var(--color-ink-200)] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Exclusive</h3>
          <p className="mb-2">Subscribe</p>
          <p className="mb-4 text-[var(--color-ink-400)]">Get 10% off your first order</p>
          <form
            onSubmit={e => e.preventDefault()}
            className="flex border border-[var(--color-ink-400)] rounded-md overflow-hidden"
          >
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-transparent px-3 py-2 text-sm outline-none flex-1"
            />
            <button className="px-3">➤</button>
          </form>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-[var(--color-ink-400)]">
            <li>111 Bijoy sarani, Dhaka, Bangladesh</li>
            <li>exclusive@gmail.com</li>
            <li>+88015-88888-9999</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Account</h4>
          <ul className="space-y-2 text-[var(--color-ink-400)]">
            <li><a href="/login">My Account</a></li>
            <li><a href="/login">Login / Register</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
            <li><a href="/">Shop</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Link</h4>
          <ul className="space-y-2 text-[var(--color-ink-400)]">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms Of Use</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Download App</h4>
          <p className="text-[var(--color-ink-400)] text-xs mb-3">Save $3 with App New User Only</p>
          <div className="w-28 h-28 bg-white/10 rounded mb-3" />
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-white/10 rounded" />
            <div className="w-12 h-12 bg-white/10 rounded" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-[var(--color-ink-400)] py-4">
        © 2026 Exclusive. All rights reserved.
      </div>
    </footer>
  )
}

// src/context/CartContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Product } from '../types/product'

export interface CartItem { product: Product; quantity: number }

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clear: () => void
  total: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function addItem(product: Product) {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  function removeItem(productId: number) {
    setItems(prev => prev.filter(i => i.product.id !== productId))
  }

  function updateQuantity(productId: number, quantity: number) {
    setItems(prev => prev.map(i =>
      i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i))
  }

  function clear() { setItems([]) }

  const total = items.reduce((acc, i) => {
    const price = i.product.discountPrice ?? i.product.price
    return acc + price * i.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider')
  return ctx
}

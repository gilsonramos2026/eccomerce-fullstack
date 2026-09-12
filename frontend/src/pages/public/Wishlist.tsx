// src/pages/public/Wishlist.tsx
import { useEffect, useState } from 'react'
import { productService } from '../../services/productService'
import { ProductCard } from '../../components/product/ProductCard'
import { useCart } from '../../context/CartContext'
import type { Product } from '../../types/product'

export function Wishlist() {
  const [products, setProducts] = useState<Product[]>([])
  const { addItem } = useCart()

  useEffect(() => {
    productService.list(0, 4).then(page => setProducts(page.content))
  }, [])

  return (
    <div>
      <h1 className="text-xl font-semibold text-[var(--text-title)] mb-6">
        Wishlist ({products.length})
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} onAddToCart={addItem} />)}
      </div>
    </div>
  )
}

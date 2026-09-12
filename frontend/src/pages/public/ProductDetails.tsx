// src/pages/public/ProductDetails.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productService } from '../../services/productService'
import { Breadcrumb } from '../../components/common/Breadcrumb'
import { Button } from '../../components/common/Button'
import { useCart } from '../../context/CartContext'
import type { Product } from '../../types/product'

export function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  useEffect(() => {
    if (id) productService.getById(Number(id)).then(setProduct)
  }, [id])

  if (!product) return <p className="text-[var(--text-body)] py-10">Carregando...</p>

  return (
    <div>
      <Breadcrumb items={[{ label: 'Account', to: '/' }, { label: 'Gaming', to: '/' }, { label: product.name }]} />

      <div className="grid md:grid-cols-2 gap-10 py-6">
        <div className="aspect-square bg-[var(--bg-base)] rounded-md overflow-hidden">
          <img src={product.imageUrl ?? '/placeholder.png'} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-title)] mb-2">{product.name}</h1>
          <p className="text-sm text-[var(--text-body)] mb-3">★ {product.rating.toFixed(1)} · Em estoque</p>
          <p className="text-2xl font-semibold text-[var(--text-title)] mb-4">
            R$ {(product.discountPrice ?? product.price).toFixed(2)}
          </p>
          <p className="text-sm text-[var(--text-body)] mb-6 border-b border-[var(--border-line)] pb-6">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-[var(--border-line)] rounded-md">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2">-</button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2">+</button>
            </div>
            <Button onClick={() => addItem(product)} className="flex-1">Buy Now</Button>
            <button className="border border-[var(--border-line)] rounded-md w-10 h-10" aria-label="Wishlist">♡</button>
          </div>

          <div className="border border-[var(--border-line)] rounded-md text-sm">
            <div className="flex items-center gap-3 p-4 border-b border-[var(--border-line)]">
              <span>🚚</span>
              <div>
                <p className="font-medium text-[var(--text-title)]">Free Delivery</p>
                <p className="text-[var(--text-body)] text-xs">Enter your postal code for delivery availability</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <span>↩️</span>
              <div>
                <p className="font-medium text-[var(--text-title)]">Return Delivery</p>
                <p className="text-[var(--text-body)] text-xs">Free 30 days delivery returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

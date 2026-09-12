import { useEffect, useState } from 'react'
import { productService } from '../../services/productService'
import type { Product } from '../../types/product'
import { ProductCard } from '../../components/product/ProductCard'

export function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const page = await productService.list(0, 12)
        setProducts(page.content)
      } catch {
        setError('Não foi possível carregar os produtos.')
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  if (loading) return <p className="text-(--text-body)">Carregando produtos...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={() => {}} />
      ))}
    </div>
  )
}

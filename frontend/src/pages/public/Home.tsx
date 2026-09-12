// src/pages/public/Home.tsx — Flash Sales com contador
import { useEffect, useState } from 'react'
import { productService } from '../../services/productService'
import { ProductCard } from '../../components/product/ProductCard'
import { ProductSection } from '../../components/product/ProductSection'
import { CountdownBadge } from '../../components/product/CountdownBadge'
import { useCountdown } from '../../hooks/useCountdown'
import { useCart } from '../../context/CartContext'
import { CategoryIcons } from '../../components/layout/CategoryIcons'
import { ServiceFeatures } from '../../components/layout/ServiceFeatures'
import { HeroBanner } from '../../components/layout/HeroBanner'
import type { Product } from '../../types/product'

const flashSaleDeadline = new Date(Date.now() + 3 * 86400000)

export function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const { addItem } = useCart()
  const countdown = useCountdown(flashSaleDeadline)

  useEffect(() => {
    productService.list(0, 8).then(page => setProducts(page.content))
  }, [])

  return (
    <>
      <HeroBanner />

      <CategoryIcons />

      <ProductSection
        tag="Today's"
        title="Flash Sales"
        action={
          <div className="flex items-center gap-4">
            <CountdownBadge label="Days" value={countdown.days} />
            <CountdownBadge label="Hours" value={countdown.hours} />
            <CountdownBadge label="Minutes" value={countdown.minutes} />
            <CountdownBadge label="Seconds" value={countdown.seconds} />
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addItem} />
          ))}
        </div>
      </ProductSection>

      <ProductSection tag="Categories" title="Browse By Category">
        <CategoryIcons expanded />
      </ProductSection>

      <ProductSection tag="This Month" title="Best Selling Products">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addItem} />
          ))}
        </div>
      </ProductSection>

      {/* Banner de destaque — "Enhance Your Music Experience" */}
      <section className="bg-[var(--color-ink-950)] text-white rounded-xl p-10 my-10 flex items-center justify-between">
        <div>
          <span className="text-[var(--color-star)] text-sm">Categories</span>
          <h2 className="text-3xl font-bold mt-2 mb-6 max-w-sm">Enhance Your Music Experience</h2>
          <div className="flex gap-3 mb-6">
            {['23', '05', '59', '35'].map((v, i) => (
              <div key={i} className="w-14 h-14 rounded-full bg-white text-[var(--color-ink-950)] flex items-center justify-center font-bold">
                {v}
              </div>
            ))}
          </div>
          <button className="bg-[var(--color-success-500)] text-white px-6 py-2.5 rounded-md text-sm font-medium">
            Buy Now!
          </button>
        </div>
        <div className="hidden md:block w-64 h-64 bg-white/10 rounded-full" />
      </section>

      <ProductSection tag="Our Products" title="Explore Our Products">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addItem} />
          ))}
        </div>
      </ProductSection>

      <ServiceFeatures />
    </>
  )
}

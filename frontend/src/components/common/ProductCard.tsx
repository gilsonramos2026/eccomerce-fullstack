import type { Product } from '../../types/product'
import { Button } from '../common/Button'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const hasDiscount = !!product.discountPrice
  const finalPrice = hasDiscount ? product.discountPrice! : product.price

  return (
    <div className="group rounded-(--radius-card) bg-(--bg-surface) border border-(--border-line) p-4 flex flex-col gap-3">
      <div className="relative aspect-square rounded-md overflow-hidden bg-(--bg-base)">
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-(--color-primary) text-white text-xs px-2 py-0.5 rounded">
            -{Math.round((1 - finalPrice / product.price) * 100)}%
          </span>
        )}
        <img
          src={product.imageUrl ?? '/placeholder.png'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-(--text-title) line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-(--color-primary) font-semibold">
            R$ {finalPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-(--text-placeholder) line-through text-sm">
              R$ {product.price.toFixed(2)}
            </span>
          )}
        </div>
        <span className="text-xs text-(--text-body)">★ {product.rating.toFixed(1)}</span>
      </div>

      <Button onClick={() => onAddToCart(product)} className="w-full">
        Adicionar ao carrinho
      </Button>
    </div>
  )
}

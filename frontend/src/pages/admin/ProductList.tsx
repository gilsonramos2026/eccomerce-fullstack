// src/pages/admin/ProductList.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productService } from '../../services/productService'
import type { Product } from '../../types/product'
import { Button } from '../../components/common/Button'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService.list(0, 50).then(page => {
      setProducts(page.content)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-[var(--text-title)]">Produtos</h1>
        <Link to="/admin/products/new"><Button>+ Novo produto</Button></Link>
      </div>

      {loading ? (
        <p className="text-[var(--text-body)]">Carregando...</p>
      ) : (
        <table className="w-full text-sm bg-[var(--bg-surface)] rounded-md overflow-hidden">
          <thead className="bg-[var(--bg-base)] text-left text-[var(--text-body)]">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Estoque</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t border-[var(--border-line)]">
                <td className="p-3 text-[var(--text-title)]">{p.name}</td>
                <td className="p-3">{p.categoryName}</td>
                <td className="p-3">R$ {p.price.toFixed(2)}</td>
                <td className="p-3">{p.stockQuantity}</td>
                <td className="p-3">
                  <Link to={`/admin/products/${p.id}/edit`} className="text-[var(--color-primary)]">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

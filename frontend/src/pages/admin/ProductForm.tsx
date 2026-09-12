// src/pages/admin/ProductForm.tsx
import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productService } from '../../services/productService'
import { Button } from '../../components/common/Button'

export function ProductForm() {
  const { id } = useParams()
  const isEditing = !!id
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', description: '', price: 0, stockQuantity: 0, imageUrl: '', categoryId: 1,
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEditing) {
      productService.getById(Number(id)).then(p => {
        setForm({
          name: p.name, description: p.description ?? '', price: p.price,
          stockQuantity: p.stockQuantity, imageUrl: p.imageUrl ?? '', categoryId: 1,
        })
      })
    }
  }, [id, isEditing])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await productService.create(form)
      navigate('/admin/products')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-bold text-[var(--text-title)] mb-4">
        {isEditing ? 'Editar produto' : 'Novo produto'}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          placeholder="Nome" required value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border border-[var(--border-line)] bg-[var(--bg-surface)] rounded-md px-3 py-2"
        />
        <textarea
          placeholder="Descrição" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="border border-[var(--border-line)] bg-[var(--bg-surface)] rounded-md px-3 py-2"
        />
        <div className="flex gap-3">
          <input
            type="number" placeholder="Preço" required value={form.price}
            onChange={e => setForm({ ...form, price: Number(e.target.value) })}
            className="flex-1 border border-[var(--border-line)] bg-[var(--bg-surface)] rounded-md px-3 py-2"
          />
          <input
            type="number" placeholder="Estoque" required value={form.stockQuantity}
            onChange={e => setForm({ ...form, stockQuantity: Number(e.target.value) })}
            className="flex-1 border border-[var(--border-line)] bg-[var(--bg-surface)] rounded-md px-3 py-2"
          />
        </div>
        <input
          placeholder="URL da imagem" value={form.imageUrl}
          onChange={e => setForm({ ...form, imageUrl: e.target.value })}
          className="border border-[var(--border-line)] bg-[var(--bg-surface)] rounded-md px-3 py-2"
        />
        <Button type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</Button>
      </form>
    </div>
  )
}

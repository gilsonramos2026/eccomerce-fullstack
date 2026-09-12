// src/pages/public/Checkout.tsx
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { orderService } from '../../services/orderService'
import { Breadcrumb } from '../../components/common/Breadcrumb'
import { Button } from '../../components/common/Button'

export function Checkout() {
  const { items, total, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [address, setAddress] = useState({ street: '', city: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!user) {
      navigate('/login')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const shippingAddress = `${address.street}, ${address.city} — Tel: ${address.phone}`
      const payload = orderService.toPayload(items, shippingAddress)
      const order = await orderService.create(payload)
      clear()
      navigate(`/order-confirmation/${order.id}`)
    } catch {
      setError('Não foi possível concluir o pedido. Verifique o estoque dos itens.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--text-body)] mb-4">Seu carrinho está vazio.</p>
        <Button onClick={() => navigate('/')}>Voltar às compras</Button>
      </div>
    )
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10 py-6">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-title)] mb-6">Billing Details</h1>

          <div className="flex flex-col gap-4">
            <input
              placeholder="Street Address*" required value={address.street}
              onChange={e => setAddress({ ...address, street: e.target.value })}
              className="border border-[var(--border-line)] bg-[var(--bg-surface)] rounded-md px-3 py-2"
            />
            <input
              placeholder="Town / City*" required value={address.city}
              onChange={e => setAddress({ ...address, city: e.target.value })}
              className="border border-[var(--border-line)] bg-[var(--bg-surface)] rounded-md px-3 py-2"
            />
            <input
              placeholder="Phone Number*" required value={address.phone}
              onChange={e => setAddress({ ...address, phone: e.target.value })}
              className="border border-[var(--border-line)] bg-[var(--bg-surface)] rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div>
          <div className="border border-[var(--border-line)] rounded-md p-6 mb-6">
            {items.map(item => {
              const price = item.product.discountPrice ?? item.product.price
              return (
                <div key={item.product.id} className="flex justify-between text-sm py-2">
                  <span className="text-[var(--text-title)]">{item.product.name} × {item.quantity}</span>
                  <span>R$ {(price * item.quantity).toFixed(2)}</span>
                </div>
              )
            })}
            <div className="flex justify-between text-sm py-2 border-t border-[var(--border-line)] mt-2">
              <span>Shipping:</span><span>Free</span>
            </div>
            <div className="flex justify-between font-semibold py-2">
              <span>Total:</span><span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" defaultChecked /> Bank / Pix
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" /> Cash on delivery
            </label>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Processando...' : 'Place Order'}
          </Button>
        </div>
      </form>
    </div>
  )
}

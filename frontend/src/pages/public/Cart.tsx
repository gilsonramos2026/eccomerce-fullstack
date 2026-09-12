// src/pages/public/Cart.tsx
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { Breadcrumb } from '../../components/common/Breadcrumb'
import { Button } from '../../components/common/Button'

export function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart()

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />

      <table className="w-full text-sm mb-8">
        <thead>
          <tr className="text-left text-[var(--text-body)] border-b border-[var(--border-line)]">
            <th className="py-3">Product</th>
            <th className="py-3">Price</th>
            <th className="py-3">Quantity</th>
            <th className="py-3">Subtotal</th>
            <th className="py-3"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            const price = item.product.discountPrice ?? item.product.price
            return (
              <tr key={item.product.id} className="border-b border-[var(--border-line)]">
                <td className="py-4 flex items-center gap-3">
                  <img src={item.product.imageUrl ?? '/placeholder.png'} className="w-12 h-12 object-cover rounded" />
                  {item.product.name}
                </td>
                <td>R$ {price.toFixed(2)}</td>
                <td>
                  <input
                    type="number" min={1} value={item.quantity}
                    onChange={e => updateQuantity(item.product.id, Number(e.target.value))}
                    className="w-16 border border-[var(--border-line)] rounded-md px-2 py-1"
                  />
                </td>
                <td>R$ {(price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeItem(item.product.id)} className="text-[var(--color-primary)]">✕</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="flex justify-between">
        <Link to="/"><Button variant="outline">Return To Shop</Button></Link>

        <div className="w-80 border border-[var(--border-line)] rounded-md p-6">
          <h3 className="font-semibold text-[var(--text-title)] mb-4">Cart Total</h3>
          <div className="flex justify-between text-sm py-2 border-b border-[var(--border-line)]">
            <span>Subtotal:</span><span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-[var(--border-line)]">
            <span>Shipping:</span><span>Free</span>
          </div>
          <div className="flex justify-between font-semibold py-2 mb-4">
            <span>Total:</span><span>R$ {total.toFixed(2)}</span>
          </div>
          <Link to="/checkout"><Button className="w-full">Proceed to checkout</Button></Link>
        </div>
      </div>
    </div>
  )
}

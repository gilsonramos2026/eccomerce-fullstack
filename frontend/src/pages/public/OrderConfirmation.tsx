// src/pages/public/OrderConfirmation.tsx
import { useParams, Link } from 'react-router-dom'
import { Button } from '../../components/common/Button'

export function OrderConfirmation() {
  const { orderId } = useParams()

  return (
    <div className="text-center py-24">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-[var(--text-title)] mb-2">Pedido confirmado!</h1>
      <p className="text-[var(--text-body)] mb-8">
        Seu pedido <strong>#{orderId}</strong> foi registrado e está sendo processado.
      </p>
      <Link to="/"><Button>Voltar para a loja</Button></Link>
    </div>
  )
}

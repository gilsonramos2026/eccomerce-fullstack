// src/pages/public/NotFound.tsx
import { Link } from 'react-router-dom'
import { Breadcrumb } from '../../components/common/Breadcrumb'
import { Button } from '../../components/common/Button'

export function NotFound() {
  return (
    <div className="text-center py-20">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: '404 Error' }]} />
      <h1 className="text-5xl font-bold text-[var(--text-title)] mt-10 mb-4">404 Not Found</h1>
      <p className="text-[var(--text-body)] mb-8">
        A página que você visitou não existe. Volte para a página inicial.
      </p>
      <Link to="/"><Button>Back to home page</Button></Link>
    </div>
  )
}

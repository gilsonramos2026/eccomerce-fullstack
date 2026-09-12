// src/pages/public/About.tsx
import { Breadcrumb } from '../../components/common/Breadcrumb'

const stats = [
  { value: '10.5k', label: "Seller active our site" },
  { value: '33k', label: 'Monthly Product Sale' },
  { value: '45.5k', label: 'Customer active in our site' },
  { value: '25k', label: 'Annual gross sale in our site' },
]

const team = [
  { name: 'Tom Cruise', role: 'Founder & Chairman' },
  { name: 'Emma Watson', role: 'Managing Director' },
  { name: 'Will Smith', role: 'Product Designer' },
]

export function About() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />

      <div className="grid md:grid-cols-2 gap-10 items-center py-10">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-title)] mb-4">Our Story</h1>
          <p className="text-[var(--text-body)] mb-4">
            Lançada em 2015, a Exclusive é a maior plataforma de e-commerce da região,
            com milhões de produtos e milhares de vendedores ativos.
          </p>
          <p className="text-[var(--text-body)]">
            Hoje a Exclusive atende clientes em diversas categorias, oferecendo uma
            experiência de compra rápida e confiável.
          </p>
        </div>
        <div className="bg-[var(--bg-base)] rounded-md h-80" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
        {stats.map(s => (
          <div key={s.label} className="border border-[var(--border-line)] rounded-md p-6 text-center">
            <p className="text-2xl font-bold text-[var(--text-title)]">{s.value}</p>
            <p className="text-xs text-[var(--text-body)] mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 py-10">
        {team.map(member => (
          <div key={member.name} className="text-center">
            <div className="bg-[var(--bg-base)] rounded-md h-64 mb-4" />
            <h3 className="font-semibold text-[var(--text-title)]">{member.name}</h3>
            <p className="text-sm text-[var(--text-body)]">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

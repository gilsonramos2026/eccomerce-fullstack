// src/components/layout/ServiceFeatures.tsx
const features = [
  { icon: '🚚', title: 'FREE AND FAST DELIVERY', desc: 'Free delivery for all orders over $140' },
  { icon: '🎧', title: '24/7 CUSTOMER SERVICE', desc: 'Friendly 24/7 customer support' },
  { icon: '🛡️', title: 'MONEY BACK GUARANTEE', desc: 'We return money within 30 days' },
]

export function ServiceFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-14 text-center">
      {features.map(f => (
        <div key={f.title} className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[var(--color-ink-950)] text-white flex items-center justify-center text-2xl">
            {f.icon}
          </div>
          <h3 className="font-semibold text-[var(--text-title)] text-sm">{f.title}</h3>
          <p className="text-xs text-[var(--text-body)]">{f.desc}</p>
        </div>
      ))}
    </div>
  )
}

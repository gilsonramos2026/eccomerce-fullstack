// src/components/layout/CategoryIcons.tsx
const categories = [
  { icon: '📱', label: 'Phones' },
  { icon: '💻', label: 'Computers' },
  { icon: '⌚', label: 'SmartWatch' },
  { icon: '📷', label: 'Camera' },
  { icon: '🎧', label: 'HeadPhones' },
  { icon: '🎮', label: 'Gaming' },
]

export function CategoryIcons({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className={`grid ${expanded ? 'grid-cols-3 md:grid-cols-6' : 'grid-cols-6'} gap-4 py-6`}>
      {categories.map(cat => (
        <button
          key={cat.label}
          className="flex flex-col items-center justify-center gap-2 border border-[var(--border-line)] rounded-md py-5 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
        >
          <span className="text-2xl">{cat.icon}</span>
          <span className="text-xs">{cat.label}</span>
        </button>
      ))}
    </div>
  )
}

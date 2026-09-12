// src/components/product/CountdownBadge.tsx
interface Props { label: string; value: number }

export function CountdownBadge({ label, value }: Props) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-[var(--text-body)]">{label}</span>
      <span className="text-lg font-bold text-[var(--text-title)]">{String(value).padStart(2, '0')}</span>
    </div>
  )
}

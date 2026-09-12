// src/hooks/useCountdown.ts
import { useEffect, useState } from 'react'

export function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculate())

  function calculate() {
    const diff = Math.max(0, targetDate.getTime() - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calculate()), 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const MODES = ['light', 'system', 'dark']
const ICONS = { light: '☀️', system: '🖥️', dark: '🌙' }

export function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid a hydration mismatch — theme isn't known until after mount.
  useEffect(() => setMounted(true), [])

  const current = mounted ? theme ?? 'system' : 'system'

  const cycle = () => {
    const next = MODES[(MODES.indexOf(current) + 1) % MODES.length]
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className={className ? `${className} theme-toggle-btn` : 'theme-toggle-btn'}
      aria-label={`Theme: ${current}. Click to change.`}
      title={`Theme: ${current}`}
    >
      {mounted ? ICONS[current] : ICONS.system}
    </button>
  )
}
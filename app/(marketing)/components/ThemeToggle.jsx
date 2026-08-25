'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const MODES = ['light', 'system', 'dark']

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

const ICONS = { light: SunIcon, system: SystemIcon, dark: MoonIcon }

export function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid a hydration mismatch — theme isn't known until after mount.
  useEffect(() => setMounted(true), [])

  const current = mounted ? theme ?? 'system' : 'system'
  const Icon = ICONS[current]

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
      <Icon />
    </button>
  )
}
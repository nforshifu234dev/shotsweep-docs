'use client'

import { useEffect, useRef, useState } from 'react'
import { ecosystemLinks } from '../../lib/footer-links.js'

export function EcosystemMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return

    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="land-nav-ecosystem" ref={ref}>
      <button
        type="button"
        className="land-nav-ecosystem-btn"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        Ecosystem <span className={open ? 'is-open' : undefined}>▾</span>
      </button>

      {open && (
        <div className="land-nav-ecosystem-panel">
          {ecosystemLinks.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
'use client'

import { usePathname } from 'next/navigation'
import { EcosystemMenu } from './EcosystemMenu.jsx'

const EXTRA_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/docs/changelog', label: 'Changelog' },
  { href: '/contact', label: 'Contact' }
]

export function NavExtraLinks() {
  const pathname = usePathname()

  return (
    <div className="docs-nav-extra">
      {EXTRA_LINKS.map(l => {
        const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(`${l.href}/`))
        return (
          <a
            key={l.href}
            href={l.href}
            className="navbar-extra-link"
            aria-current={active ? 'page' : undefined}
            style={{
              fontSize: '0.85rem',
              marginRight: '0.75rem',
              color: active ? 'var(--brand-accent)' : undefined,
              fontWeight: active ? 600 : undefined
            }}
          >
            {l.label}
          </a>
        )
      })}
      <EcosystemMenu />
    </div>
  )
}
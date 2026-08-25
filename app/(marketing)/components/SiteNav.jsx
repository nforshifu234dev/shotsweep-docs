'use client'

import { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle.jsx'
import { EcosystemMenu } from '../../components/EcosystemMenu.jsx'
import { socialIcons } from '../../../lib/footer-links.js'

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/docs', label: 'Docs', match: '/docs' },
  { href: '/docs/recipes', label: 'Recipes' },
  { href: '/docs/changelog', label: 'Changelog' },
  { href: '/contact', label: 'Contact' }
]

function isLinkActive(pathname, link) {
  if (link.external) return false
  const base = link.match || link.href
  return pathname === base || pathname.startsWith(`${base}/`)
}

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="land-nav">
      <div className="land-nav-inner">
        <a href="/" className="land-brand">
          <Image src="/shotsweep-mark.svg" alt="" width={28} height={28} priority />
          <span>
            <span className="land-brand-scope">nfsfu234/</span> {' '}shotsweep
          </span>
        </a>

        <div className="land-nav-links">
          {LINKS.map(l => {
            const active = isLinkActive(pathname, l)
            return (
              <a
                key={l.href}
                href={l.href}
                className={active ? 'is-active' : undefined}
                aria-current={active ? 'page' : undefined}
              >
                {l.label}
              </a>
            )
          })}

          <EcosystemMenu />

          <a
            href="https://github.com/nforshifu234dev/shotsweep"
            target="_blank"
            rel="noopener noreferrer"
            className="land-nav-icon-link"
            aria-label="GitHub"
            dangerouslySetInnerHTML={{ __html: socialIcons.github }}
          />

          <a href="/docs/quick-start" className="land-nav-cta">
            Get started
          </a>
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="land-nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="land-nav-mobile-panel">
          {LINKS.map(l => {
            const active = isLinkActive(pathname, l)
            return (
              <a
                key={l.href}
                href={l.href}
                className={active ? 'is-active' : undefined}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            )
          })}

          <span className="land-nav-mobile-heading">Ecosystem</span>
          <a
            href="https://github.com/nforshifu234dev/shotsweep"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            GitHub
          </a>
          <a href="https://form-validation.nforshifu234dev.com" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            form-validation
          </a>
          <a href="https://tour-guide.nforshifu234dev.com" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            tour-guide
          </a>
          <a href="https://nforshifu234dev.com" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            nforshifu234dev.com
          </a>

          <a href="/docs/quick-start" className="land-nav-cta" onClick={() => setOpen(false)}>
            Get started
          </a>
          <ThemeToggle className="land-nav-cta" />
        </div>
      )}
    </nav>
  )
}
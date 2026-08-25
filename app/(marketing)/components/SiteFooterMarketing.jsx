'use client'

import Image from 'next/image'
import { docsPrimaryColumn, sharedFooterColumns, socialIcons } from '../../../lib/footer-links.js'
import { useLatestVersion } from '../../../lib/useLatestVersion.js'

const YEAR = new Date().getFullYear()
const columns = [docsPrimaryColumn, ...sharedFooterColumns]

export function SiteFooterMarketing() {
  const { version, published } = useLatestVersion()

  return (
    <footer className="land-footer">
      <div className="land-footer-grid">
        <div>
          <div className="land-footer-brand-row">
            <Image src="/shotsweep-mark.svg" alt="" width={26} height={26} />
            <span style={{ fontWeight: 800, fontSize: '15px', color: 'var(--land-text)' }}>
              nfsfu234/shotsweep
            </span>
          </div>
          <p style={{ maxWidth: '260px', marginBottom: '0.5rem' }}>
            A developer-first CLI for automated website screenshots, authenticated pages,
            sectioned captures, and visual diffing between runs.
          </p>
          <div className="land-footer-version-badge">
            <span className="land-footer-version-dot" />
            {published ? `v${version} — Latest` : `v${version}`}
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--land-surface-soft)',
              border: '1px solid var(--land-border-strong)',
              marginTop: '0.5rem'
            }}
          >
            <span style={{ color: 'var(--land-text-mute-3)', fontSize: '12px', fontFamily: 'monospace' }}>$</span>
            <code style={{ fontSize: '12px', color: 'var(--land-text-muted)', fontFamily: 'monospace' }}>
              npm i -g @nfsfu234/shotsweep
            </code>
          </div>
          <div className="land-footer-icon-row">
            <a
              href="https://github.com/nforshifu234dev/shotsweep"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="land-footer-icon-btn"
              dangerouslySetInnerHTML={{ __html: socialIcons.github }}
            />
            <a
              href="https://www.npmjs.com/package/@nfsfu234/shotsweep"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="npm"
              className="land-footer-icon-btn"
              dangerouslySetInnerHTML={{ __html: socialIcons.npm }}
            />
            <a
              href="/contact"
              aria-label="Contact"
              className="land-footer-icon-btn"
              dangerouslySetInnerHTML={{ __html: socialIcons.mail }}
            />
          </div>
        </div>

        {columns.map(col => (
          <div key={col.title} className={col.accent ? 'land-footer-accent' : undefined}>
            <h4>{col.title}</h4>
            <div className="land-footer-links">
              {col.links.map(link => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="land-footer-bottom">
        <span>© {YEAR} nfsfu234/shotsweep. MIT Licensed. Part of the NFSFU234 ecosystem.</span>
        <span>
          Built by <a href="https://nforshifu234dev.com" target="_blank" rel="noopener noreferrer">NFORSHIFU234 Dev</a> 🇳🇬
        </span>
      </div>
    </footer>
  )
}
'use client'

import { docsPrimaryColumn, sharedFooterColumns, socialIcons } from '../../lib/footer-links.js'
import { useLatestVersion } from '../../lib/useLatestVersion.js'

const YEAR = new Date().getFullYear()
const columns = [docsPrimaryColumn, ...sharedFooterColumns]

export function SiteFooter() {
  const { version, published } = useLatestVersion()

  return (
    <div className="site-footer">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <b className="footer-brand-scoped">
              <span className="brand-scope">nfsfu234/</span>shotsweep
            </b>
          </a>
          <p>
            A developer-first CLI for automated website screenshots, authenticated pages,
            sectioned captures, and visual diffing between runs. Built and maintained under the
            NFORSHIFU234 ecosystem.
          </p>
          <div className="footer-version-badge">
            <span className="footer-version-dot" />
            {published ? `v${version} — Latest` : `v${version}`}
          </div>
          <div className="footer-install-chip">
            <span>$</span> npm i -g @nfsfu234/shotsweep
          </div>
          <div className="footer-icon-row">
            <a
              href="https://github.com/nforshifu234dev/shotsweep"
              aria-label="GitHub"
              className="footer-icon-btn"
              dangerouslySetInnerHTML={{ __html: socialIcons.github }}
            />
            <a
              href="https://www.npmjs.com/package/@nfsfu234/shotsweep"
              aria-label="npm"
              className="footer-icon-btn"
              dangerouslySetInnerHTML={{ __html: socialIcons.npm }}
            />
            <a
              href="/contact"
              aria-label="Contact"
              className="footer-icon-btn"
              dangerouslySetInnerHTML={{ __html: socialIcons.mail }}
            />
          </div>
        </div>

        {columns.map(col => (
          <div key={col.title} className={col.accent ? 'site-footer-accent' : undefined}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map(link => (
                <li key={link.label}>
                  <a href={link.href}>
                    {link.iconKey && (
                      <span
                        style={{ display: 'inline-flex', marginRight: '0.4rem', verticalAlign: '-2px' }}
                        dangerouslySetInnerHTML={{ __html: socialIcons[link.iconKey] }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="site-footer-bottom">
        <span>MIT {YEAR} &copy; nfsfu234/shotsweep, part of the NFSFU234 ecosystem.</span>
        <span>
          Built by{' '}
          <a href="https://www.nforshifu234dev.com" target="_blank" rel="noopener noreferrer">
            NFORSHIFU234 Dev
          </a>
          , a{' '}
          <a href="https://iamnotshifu.com" target="_blank" rel="noopener noreferrer">
            NFORSHIFU LOGICFORGE LTD
          </a>{' '}
          company
        </span>
      </div>
    </div>
  )
}
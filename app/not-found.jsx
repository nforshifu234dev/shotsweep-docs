import Image from 'next/image'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata = {
  title: 'Page not found'
}

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="land-body" style={{ margin: 0 }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '2rem',
              fontFamily: "'DM Sans', -apple-system, sans-serif"
            }}
          >
            <Image src="/shotsweep-mark.svg" alt="" width={48} height={48} style={{ marginBottom: '1.5rem' }} />
            <span
              style={{
                color: 'var(--brand-accent)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              404
            </span>
            <h1
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                margin: '0 0 1rem',
                color: 'var(--land-text)'
              }}
            >
              Nothing captured here.
            </h1>
            <p style={{ color: 'var(--land-text-mute-2)', maxWidth: '420px', marginBottom: '2rem', lineHeight: 1.7 }}>
              The page you're looking for doesn't exist, or moved. Try the homepage or jump
              straight into the docs.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="/"
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '14px',
                  background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                  color: '#fff',
                  textDecoration: 'none'
                }}
              >
                Go home
              </a>
              <a
                href="/docs"
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '14px',
                  background: 'var(--land-surface-soft)',
                  color: 'var(--land-text-soft)',
                  textDecoration: 'none',
                  border: '1px solid var(--land-border-strong)'
                }}
              >
                Read the docs
              </a>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
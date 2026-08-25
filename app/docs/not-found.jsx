export const metadata = {
  title: 'Page not found'
}

export default function DocsNotFound() {
  return (
    <div
      style={{
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem'
      }}
    >
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
      <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 1rem' }}>
        This page hasn't been captured.
      </h1>
      <p style={{ color: 'var(--nextra-gray-600, #71717a)', maxWidth: '420px', marginBottom: '2rem', lineHeight: 1.7 }}>
        That doc page doesn't exist, or the link is out of date. Try the docs home, or use search
        above.
      </p>
      <a
        href="/docs"
        style={{
          padding: '11px 22px',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '14px',
          background: 'var(--brand-accent)',
          color: '#fff',
          textDecoration: 'none'
        }}
      >
        Back to docs home
      </a>
    </div>
  )
}
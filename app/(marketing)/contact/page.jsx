export const metadata = {
  title: 'Contact',
  description: 'How to reach the team behind NFSFU234 ShotSweep.'
}

const LINKS = [
  {
    title: 'General contact & forms',
    body: 'Every NFSFU234 project shares one home base — that\u2019s where the contact form lives.',
    href: 'https://nforshifu234dev.com',
    label: 'nforshifu234dev.com'
  },
  {
    title: 'For developers',
    body: 'Questions about ShotSweep itself, integration help, or anything code-related.',
    href: 'mailto:developers@nforshifu234dev.com',
    label: 'developers@nforshifu234dev.com'
  },
  {
    title: 'Bugs & feature requests',
    body: 'Once the repo is public, GitHub issues will be the fastest path for these.',
    href: 'https://github.com/nforshifu234dev/shotsweep',
    label: 'github.com/nforshifu234dev/shotsweep'
  }
]

export default function ContactPage() {
  return (
    <>
      <header
        style={{
          padding: 'clamp(4rem, 10vw, 6rem) 1.5rem 3rem',
          textAlign: 'center',
          background: 'var(--land-bg)'
        }}
      >
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              color: 'var(--brand-accent)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}
          >
            Contact
          </span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 2.6rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: 'var(--land-text)',
              marginBottom: '1rem'
            }}
          >
            Reach the right inbox.
          </h1>
          <p style={{ color: 'var(--land-text-muted)', fontSize: '1rem', lineHeight: 1.75 }}>
            ShotSweep doesn't run its own contact form — every NFSFU234 project routes through
            one shared place instead. Pick whichever fits below.
          </p>
        </div>
      </header>

      <section style={{ padding: '0 1.5rem clamp(4rem, 10vw, 6rem)', background: 'var(--land-bg)' }}>
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'var(--land-border)',
            border: '1px solid var(--land-border)',
            borderRadius: '16px',
            overflow: 'hidden'
          }}
        >
          {LINKS.map(l => (
            <a
              key={l.title}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                padding: '1.75rem',
                background: 'var(--land-bg)',
                textDecoration: 'none',
                display: 'block',
                minWidth: 0
              }}
            >
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: 'var(--land-text)' }}>
                {l.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--land-text-mute-2)', lineHeight: 1.7, marginBottom: '10px' }}>
                {l.body}
              </p>
              <span
                style={{
                  color: 'var(--brand-accent)',
                  fontSize: '13px',
                  fontWeight: 600,
                  overflowWrap: 'anywhere',
                  wordBreak: 'break-word'
                }}
              >
                {l.label} →
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
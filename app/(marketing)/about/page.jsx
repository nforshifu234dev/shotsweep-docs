import Image from 'next/image'
import { ExampleGallery } from '../../components/ExampleGallery'

export const metadata = {
  title: 'About',
  description: 'The story behind NFSFU234 ShotSweep and the NFORSHIFU234 Dev ecosystem.'
}

const PRINCIPLES = [
  {
    title: 'Solve a real problem',
    body: 'ShotSweep exists because a page can pass every automated test and still ship visually broken. It adds the visual layer, it doesn\u2019t replace the rest of your stack.'
  },
  {
    title: 'Keep it light',
    body: 'Concurrency-aware, retry-capable, pure-JS pixel diffing. No native compile step to fight in CI.'
  },
  {
    title: 'Keep it simple',
    body: 'Point it at a URL, a CSV, or a sitemap. One command captures; one command compares.'
  }
]

export default function AboutPage() {
  return (
    <>
      <header
        style={{
          padding: 'clamp(4rem, 10vw, 6rem) 1.5rem 3rem',
          textAlign: 'center',
          background: 'var(--land-bg)'
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
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
            About
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: 'var(--land-text)',
              marginBottom: '1rem'
            }}
          >
            Built to answer one question:
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 50%, #6d28d9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              what does the site actually look like?
            </span>
          </h1>
          <p style={{ color: 'var(--land-text-muted)', fontSize: '1.05rem', lineHeight: 1.75 }}>
            ShotSweep is a developer-first CLI for automated website screenshots, visual
            comparisons, authenticated pages, and AI-assisted review — built by{' '}
            <a href="https://iamnotshifu.com" style={{ color: 'var(--brand-accent)' }}>
              IAMNOTSHIFU
            </a>
            , through{' '}
            <a href="https://nforshifu234dev.com" style={{ color: 'var(--brand-accent)' }}>
              NFORSHIFU234 Dev
            </a>
            .
          </p>
        </div>
      </header>

      <section
        style={{
          padding: '0 1.5rem 4rem',
          background: 'var(--land-bg)',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--land-border-strong)',
            boxShadow: '0 30px 70px rgba(0,0,0,0.25)',
          }}
        >
          <ExampleGallery
            images={[
              {
                src: '/shotsweep-poster.png',
                alt: 'NFSFU234 ShotSweep overview — capture, compare, and inspect any website from the command line',
              },
            ]}
            columns={1}
            flush
          />
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.5rem', background: 'var(--land-bg-alt)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span
              style={{
                display: 'block',
                color: 'var(--brand-accent)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              The philosophy
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.3rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: 'var(--land-text)'
              }}
            >
              One philosophy, across every NFSFU234 tool.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1px',
              background: 'var(--land-border)',
              border: '1px solid var(--land-border)',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
          >
            {PRINCIPLES.map(p => (
              <div key={p.title} style={{ padding: '2rem', background: 'var(--land-bg-alt)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: 'var(--land-text)' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--land-text-mute-2)', lineHeight: 1.7, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.5rem', textAlign: 'center', background: 'var(--land-bg)' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: 'var(--land-text)',
              marginBottom: '1rem'
            }}
          >
            "Capture everything. Miss nothing."
          </h2>
          <p style={{ color: 'var(--land-text-mute-2)', marginBottom: '2rem' }}>— Built by NFORSHIFU234 Dev 🇳🇬</p>
          <a
            href="/docs/quick-start"
            style={{
              display: 'inline-block',
              padding: '13px 28px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '15px',
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 0 0 1px #6d28d9, 0 8px 32px rgba(139,92,246,0.35)'
            }}
          >
            Read the docs →
          </a>
        </div>
      </section>
    </>
  )
}
'use client'

import Image from 'next/image'
import InstallTerminal from '../components/InstallTerminal.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { JsonLdScript } from '../components/JsonLdScript.jsx'
import { LiveDemo } from './components/LiveDemo.jsx'
import { buildOrganizationLd, buildSoftwareApplicationLd } from '../../lib/json-ld.js'

const FEATURES = [
  {
    icon: '🆚',
    title: 'Visual regression',
    body: 'Capture a baseline, capture again after a change, and compare the two runs with deterministic pixel diffing.'
  },
  {
    icon: '⚙️',
    title: 'Built for CI',
    body: 'Machine-readable output and non-zero exit codes make visual changes usable as a real CI gate.'
  },
  {
    icon: '🖥️',
    title: 'Real browser capture',
    body: 'ShotSweep uses Playwright and Chromium to capture the actual rendered page, not an HTML approximation.'
  },
  {
    icon: '🗺️',
    title: 'Sitemap aware',
    body: 'Point ShotSweep at a sitemap or sitemap index and turn your existing URL structure into a visual test plan.'
  },
  {
    icon: '🔐',
    title: 'Authenticated pages',
    body: 'Capture protected pages with form login, saved sessions, bearer tokens, headers, or cookies.'
  },
  {
    icon: '🔀',
    title: 'Production → localhost',
    body: 'Reuse a production sitemap against staging, preview deployments, or localhost with --replace-origin.'
  },
  {
    icon: '📐',
    title: 'Full or sectioned',
    body: 'Capture entire pages or split long pages into viewport-height sections for easier review.'
  },
  {
    icon: '🖥️',
    title: 'Multiple viewports',
    body: 'Capture desktop, tablet, mobile, or custom viewport sizes in the same run.'
  },
  {
    icon: '⏸️',
    title: 'Resumable runs',
    body: 'Resume large capture jobs and use limit, offset, retries, and concurrency controls for CI environments.'
  },
  {
    icon: '🪶',
    title: 'Focused CLI',
    body: 'A dependency-conscious command-line tool that produces screenshots, manifests, and reports without requiring a hosted service.'
  }
]

const WORKFLOW = [
  {
    title: 'Build',
    body: 'Run your normal application build and test suite.'
  },
  {
    title: 'Capture',
    body: 'Capture the pages and viewports that matter to your application.'
  },
  {
    title: 'Change',
    body: 'Ship a UI change, dependency update, or new release.'
  },
  {
    title: 'Compare',
    body: 'Run shotsweep diff against the previous visual baseline.'
  },
  {
    title: 'Gate',
    body: 'Let CI pass or fail the build based on visual changes.'
  }
]

const DEMO_LINES = [
  { t: '$ shotsweep capture --sitemap https://example.com/sitemap.xml --viewport 1440x900', c: '#d4d4d8' },
  { t: '✔ Resolved 12 URLs from sitemap', c: '#a78bfa' },
  { t: '✔ Captured 12 screenshots → ./screenshots', c: '#a78bfa' },
  { t: 'Done in 9.8s (avg 0.8s/page)', c: '#71717a' },
  { t: 'Manifest: screenshots/manifest.json', c: '#71717a' },
  { t: '', c: '#71717a' },
  { t: '$ shotsweep diff before/manifest.json after/manifest.json', c: '#d4d4d8' },
  { t: '2 changed, 9 unchanged, 1 added, 0 removed', c: '#fbbf24' },
  { t: 'Report: diff/diff-report.json', c: '#71717a' }
]

const ECOSYSTEM = [
  {
    label: 'DEVELOPER TOOL — THIS LIBRARY',
    name: '@nfsfu234/shotsweep',
    desc: 'Automated website screenshots, authenticated pages, sectioned captures, and pixel diffs.',
    href: '/docs'
  },
  {
    label: 'HTML-FIRST FORMS',
    name: '@nfsfu234/form-validation',
    desc: 'HTML-first form validation built on the attributes you already wrote.',
    href: 'https://form-validation.nforshifu234dev.com'
  },
  {
    label: 'REACT LIBRARY',
    name: '@nfsfu234/tour-guide',
    desc: 'Zero-dependency onboarding tours, walkthroughs, and product tours for React.',
    href: 'https://tour-guide.nforshifu234dev.com'
  },
  {
    label: 'PRODUCT',
    name: 'WishIT',
    desc: 'Preserving wishes and memories digitally.',
    href: 'https://wish-it.app'
  }
]

export default function LandingPage() {
  return (
    <>
      <JsonLdScript data={buildSoftwareApplicationLd()} />
      <JsonLdScript data={buildOrganizationLd()} />

      <header className="land-hero">
        <div className="land-glow land-glow-1" />
        <div className="land-glow land-glow-2" />

        <div className="land-wrap land-hero-content">
          <span className="land-badge">
            <span className="land-badge-dot" />
            v0.1.0 · Visual regression testing from the command line
          </span>

          <h1>
            Know exactly what
            <br />
            <span className="land-gradient-text">your site looks like.</span>
          </h1>

          <p>
            Capture real pages with a real browser, compare them before and after a change,
            and let CI catch visual regressions before they reach production.
          </p>

          <div className="land-hero-actions">
            <a href="/docs/quick-start" className="land-btn land-btn-primary">
              Get Started
            </a>

            <a href="#live-demo" className="land-btn land-btn-secondary">
              Try the Live Demo
            </a>

            <a
              href="https://github.com/nforshifu234dev/shotsweep"
              className="land-btn land-btn-secondary"
            >
              GitHub
            </a>
          </div>

          <InstallTerminal />

          <div className="land-framework-strip">
            <span>real browser</span>
            <span>visual diff</span>
            <span>auth support</span>
            <span>CI-ready</span>
            <span>MIT licensed</span>
          </div>
        </div>
      </header>

      <div className="land-stats">
        <div className="land-stat">
          <strong>Real Browser</strong>
          <span>Chromium-powered capture</span>
        </div>

        <div className="land-stat">
          <strong>Full / Sections</strong>
          <span>Capture modes</span>
        </div>

        <div className="land-stat">
          <strong>Deterministic</strong>
          <span>Pixel comparison</span>
        </div>

        <div className="land-stat">
          <strong>MIT</strong>
          <span>Open source</span>
        </div>
      </div>

      {/* LIVE DEMO */}
      <section className="land-section" id="live-demo">
        <div className="land-wrap">
          <div className="land-section-head">
            <span className="land-eyebrow">Try it now</span>
            <h2>A real capture, running live.</h2>
            <p>
              This runs the same capture engine used by the CLI against sites we control.
              Same browser, same waiting logic, same screenshot pipeline — just without
              installing anything.
            </p>
          </div>

          <LiveDemo />
        </div>
      </section>

      {/* WHY */}
      <section className="land-section" style={{ paddingTop: 0 }}>
        <div className="land-wrap">
          <div className="land-section-head">
            <span className="land-eyebrow">Why ShotSweep</span>
            <h2>A page can pass every test and still look broken.</h2>

            <p>
              Your build can pass. Your unit tests can pass. Your API tests can pass.
              Your application can return HTTP 200. A CSS change can still break the interface.
              ShotSweep adds a visual regression layer to the test suite you already have.
            </p>
          </div>

          <div className="land-features">
            {WORKFLOW.map((step, i) => (
              <Reveal className="land-reveal" delay={i * 60} key={step.title}>
                <div className="land-feature">
                  <span className="land-feature-label">STEP {i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TERMINAL DEMO */}
      <section className="land-section" style={{ paddingTop: 0 }}>
        <div className="land-wrap">
          <div className="land-code-section">
            <div className="land-code-copy">
              <span className="land-eyebrow">See it work</span>
              <h2>Capture once. Diff on every deploy.</h2>
              <p>
                Capture a known visual baseline, deploy your change, then run{' '}
                <code
                  style={{
                    background: 'var(--land-surface-soft)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  shotsweep diff
                </code>{' '}
                to see which pages changed. In CI, a real visual regression produces a
                non-zero exit code.
              </p>
              <a href="/docs/visual-comparison/diff" style={{ color: 'var(--brand-accent)', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
                Read the diff docs →
              </a>
            </div>

            <div className="land-terminal">
              <div className="land-terminal-bar">
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div className="land-terminal-dot" style={{ background: '#ff5f57' }} />
                  <div className="land-terminal-dot" style={{ background: '#febc2e' }} />
                  <div className="land-terminal-dot" style={{ background: '#28c840' }} />
                </div>
                <span className="land-terminal-title">nfsfu234-shotsweep</span>
              </div>
              <pre>
                {DEMO_LINES.map((line, i) => (
                  <span key={i} style={{ display: 'block', color: line.c }}>
                    {line.t || '\u00A0'}
                  </span>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="land-section">
        <div className="land-wrap">
          <div className="land-section-head">
            <span className="land-eyebrow">Key Features</span>
            <h2>Everything a real site needs to be captured properly.</h2>
            <p>Concurrency-aware, CPU-warned, retry-capable — built for real sites, not just demos.</p>
          </div>

          <div className="land-features">
            {FEATURES.map((f, i) => (
              <Reveal className="land-reveal" delay={(i % 4) * 60} key={f.title}>
                <div className="land-feature">
                  <div className="land-feature-icon" style={{ fontSize: '16px' }}>
                    {f.icon}
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="land-section" style={{ paddingTop: 0 }}>
        <div className="land-wrap">
          <div className="land-section-head">
            <span className="land-eyebrow">The NFSFU234 Ecosystem</span>
            <h2>Focused tools. Built to solve real problems.</h2>
            <p>
              Every NFSFU234 tool solves one real problem, stays focused, and works well on its own.
            </p>
          </div>

          <div className="land-features">
            {ECOSYSTEM.map(e => (
              <a
                key={e.name}
                href={e.href}
                className="land-feature"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <span className="land-feature-label">{e.label}</span>
                <h3>{e.name}</h3>
                <p style={{ marginBottom: '10px' }}>{e.desc}</p>
                <span style={{ color: 'var(--brand-accent)', fontSize: '13px', fontWeight: 600 }}>Explore →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="land-section" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(500px, 80vw, 700px)',
            height: 'clamp(300px, 50vw, 500px)',
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse, var(--land-glow-1) 0%, transparent 70%)'
          }}
        />
        <div className="land-wrap land-cta" style={{ position: 'relative' }}>
          <Image
            src="/shotsweep-icon-full.svg"
            alt="ShotSweep"
            width={72}
            height={72}
            style={{ margin: '0 auto 1.5rem' }}
          />
          <h2>Capture everything. Miss nothing.</h2>
          <p>
            Add visual regression to your workflow without adding another hosted platform.
            Capture, compare, and let CI catch what your other tests cannot see.
          </p>
          <div className="land-hero-actions">
            <a href="/docs/quick-start" className="land-btn land-btn-primary">
              Get Started →
            </a>
            <a
              href="https://github.com/nforshifu234dev/shotsweep"
              className="land-btn land-btn-secondary"
            >
              ⭐ Star on GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
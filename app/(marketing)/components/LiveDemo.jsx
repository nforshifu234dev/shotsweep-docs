'use client'

import { useState } from 'react'

const TARGETS = [
  { key: 'form-validation', label: 'FormValidation', domain: 'form-validation.nforshifu234dev.com' },
  { key: 'tour-guide', label: 'TourGuide', domain: 'tour-guide.nforshifu234dev.com' },
  { key: 'wishit', label: 'WishIT', domain: 'wish-it.app' },
  { key: 'iamnotshifu', label: 'IAMNOTSHIFU', domain: 'iamnotshifu.com' },
  { key: 'healthhub', label: 'HealthHub', domain: 'healthhub.nforshifu234dev.com' },
  { key: 'nfsfu234dev', label: 'NFORSHIFU234 Dev', domain: 'nforshifu234dev.com' }
]

const LOG_LINES = [
  'Resolving target…',
  'Launching browser…',
  'Waiting for page load…',
  'Capturing screenshot…'
]

export function LiveDemo() {
  const [selected, setSelected] = useState(TARGETS[0].key)
  const [status, setStatus] = useState('idle') // idle | running | done | error
  const [logIndex, setLogIndex] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const run = async () => {
    setStatus('running')
    setError(null)
    setResult(null)
    setLogIndex(0)

    const logTimer = setInterval(() => {
      setLogIndex(i => Math.min(i + 1, LOG_LINES.length - 1))
    }, 500)

    try {
      const res = await fetch('/api/demo-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: selected })
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Capture failed.')
      }

      setResult(data)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    } finally {
      clearInterval(logTimer)
    }
  }

  const activeTarget = TARGETS.find(t => t.key === selected)

  return (
    <div className="demo-panel">
      <div className="demo-controls">
        <span className="demo-controls-label">Pick a target</span>
        <div className="demo-target-grid">
          {TARGETS.map(t => (
            <button
              key={t.key}
              type="button"
              className={`demo-target-btn ${selected === t.key ? 'is-active' : ''}`}
              onClick={() => {
                setSelected(t.key)
                setStatus('idle')
                setResult(null)
                setError(null)
              }}
              disabled={status === 'running'}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button type="button" className="demo-run-btn" onClick={run} disabled={status === 'running'}>
          {status === 'running' ? 'Capturing…' : `Capture ${activeTarget.label} →`}
        </button>

        <p className="demo-note">
          Real capture, run live against {activeTarget.domain} — same viewport and load-wait
          logic ShotSweep uses. Limited to a handful of sites we control, rate-limited, cached
          for 30 minutes.
        </p>
      </div>

      <div className="demo-output">
        {status === 'idle' && (
          <div className="demo-output-placeholder">Pick a target and hit capture.</div>
        )}

        {status === 'running' && (
          <div className="demo-output-log">
            {LOG_LINES.slice(0, logIndex + 1).map((line, i) => {
              const isCurrent = i === logIndex
              return (
                <div
                  key={i}
                  className={`demo-log-line ${isCurrent ? 'is-current' : 'is-done'}`}
                >
                  {isCurrent ? <span className="demo-log-spinner" /> : <span className="demo-log-check">✓</span>}
                  {line}
                </div>
              )
            })}
            <div className="demo-log-progress">
              <div
                className="demo-log-progress-bar"
                style={{ width: `${((logIndex + 1) / LOG_LINES.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {status === 'error' && <div className="demo-output-error">✗ {error}</div>}

        {status === 'done' && result && (
          <div className="demo-output-image-wrap">
            <img src={result.dataUrl} alt={`Screenshot of ${result.label}`} className="demo-output-image" />
            <span className="demo-output-caption">
              {result.label} {result.cached ? '(cached)' : '(just now)'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
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

// `command` is what the same capture looks like in the CLI, shown under the buttons.
const MODES = [
  { key: 'viewport', label: 'Above the fold', command: '--mode scroll --scroll-stop 0', hint: 'Just the first screen.' },
  { key: 'full', label: 'Full page', command: '--mode full', hint: 'The whole page in one tall image.' },
  { key: 'sections', label: 'Sections', command: '--mode sections', hint: 'Viewport-height slices (first four shown).' },
  { key: 'scroll', label: 'Scroll frames', command: '--mode scroll --scroll-stop 0 --scroll-stop 33% --scroll-stop 66% --scroll-stop 100%', hint: 'Four frames down the page, each taken once it stops moving.' }
]

const LOG_LINES = [
  'Resolving target…',
  'Launching browser…',
  'Waiting for page load…',
  'Capturing screenshot…'
]

const SCROLL_LOG_LINES = [
  'Resolving target…',
  'Launching browser…',
  'Waiting for page load…',
  'Scrolling and waiting for each frame to settle…'
]

export function LiveDemo() {
  const [selected, setSelected] = useState(TARGETS[0].key)
  const [mode, setMode] = useState('viewport')
  const [status, setStatus] = useState('idle') // idle | running | done | error
  const [logIndex, setLogIndex] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const logLines = mode === 'scroll' || mode === 'sections' ? SCROLL_LOG_LINES : LOG_LINES

  const run = async () => {
    setStatus('running')
    setError(null)
    setResult(null)
    setLogIndex(0)

    const logTimer = setInterval(() => {
      setLogIndex(i => Math.min(i + 1, logLines.length - 1))
    }, 500)

    try {
      const res = await fetch('/api/demo-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: selected, mode })
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
  const activeMode = MODES.find(m => m.key === mode)
  const frames = result?.frames?.length ? result.frames : result ? [{ dataUrl: result.dataUrl }] : []

  const resetOutput = () => {
    setStatus('idle')
    setResult(null)
    setError(null)
  }

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
                resetOutput()
              }}
              disabled={status === 'running'}
            >
              {t.label}
            </button>
          ))}
        </div>

        <span className="demo-controls-label">Capture mode</span>
        <div className="demo-target-grid">
          {MODES.map(m => (
            <button
              key={m.key}
              type="button"
              className={`demo-target-btn ${mode === m.key ? 'is-active' : ''}`}
              onClick={() => {
                setMode(m.key)
                resetOutput()
              }}
              disabled={status === 'running'}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="demo-mode-hint">{activeMode.hint}</p>
        <code className="demo-command">shotsweep capture --url https://{activeTarget.domain} {activeMode.command}</code>

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
            {logLines.slice(0, logIndex + 1).map((line, i) => {
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
                style={{ width: `${((logIndex + 1) / logLines.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {status === 'error' && <div className="demo-output-error">✗ {error}</div>}

        {status === 'done' && result && (
          <div className="demo-output-image-wrap">
            <div className={frames.length > 1 ? 'demo-frames' : 'demo-frame-single'}>
              {frames.map((frame, i) => (
                <img
                  key={i}
                  src={frame.dataUrl}
                  alt={`${activeMode.label} screenshot of ${result.label}${frames.length > 1 ? `, frame ${i + 1} of ${frames.length}` : ''}`}
                  className="demo-output-image"
                />
              ))}
            </div>
            <span className="demo-output-caption">
              {result.label} · {activeMode.label}
              {frames.length > 1 ? ` · ${frames.length} frames` : ''} {result.cached ? '(cached)' : '(just now)'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
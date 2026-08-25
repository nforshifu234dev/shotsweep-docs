'use client'

import { useState } from 'react'

export default function InstallTerminal({ command = 'npm install -g @nfsfu234/shotsweep' }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '11px 18px',
        borderRadius: '10px',
        background: 'var(--land-bg-raised)',
        border: '1px solid var(--land-border-strong)'
      }}
    >
      <span style={{ color: 'var(--land-text-mute-3)', fontSize: '13px', fontFamily: 'monospace' }}>$</span>
      <code
        style={{
          fontSize: '13px',
          color: 'var(--land-text-soft)',
          fontFamily: "'Fira Code', monospace",
          userSelect: 'all'
        }}
      >
        {command}
      </code>
      <button
        onClick={copy}
        style={{
          background: copied ? 'rgba(139,92,246,0.18)' : 'var(--land-surface-soft)',
          border: `1px solid ${copied ? 'rgba(139,92,246,0.45)' : 'var(--land-border-strong)'}`,
          color: copied ? 'var(--brand-accent)' : 'var(--land-text-muted)',
          cursor: 'pointer',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '12px',
          transition: 'all 0.2s',
          fontWeight: 600
        }}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )
}
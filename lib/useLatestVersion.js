'use client'

import { useEffect, useState } from 'react'

const PACKAGE_NAME = '@nfsfu234/shotsweep'
const FALLBACK_VERSION = '0.1.0'

/**
 * Reads the live version straight from the npm registry so it can never
 * drift out of sync with what's actually published. Falls back to
 * FALLBACK_VERSION (and `published: false`) until the package exists on
 * npm — which, pre-launch, is the common case.
 */
export function useLatestVersion() {
  const [version, setVersion] = useState(FALLBACK_VERSION)
  const [published, setPublished] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch(`https://registry.npmjs.org/${encodeURIComponent(PACKAGE_NAME)}/latest`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (cancelled || !data?.version) return
        setVersion(data.version)
        setPublished(true)
      })
      .catch(() => {
        // Not published yet, or offline — keep the fallback.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { version, published }
}
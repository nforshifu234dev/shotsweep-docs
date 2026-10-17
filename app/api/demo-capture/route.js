export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TARGETS = {
  'form-validation': 'FormValidation',
  'tour-guide': 'TourGuide',
  wishit: 'WishIT',
  iamnotshifu: 'IAMNOTSHIFU',
  healthhub: 'HealthHub',
  nfsfu234dev: 'NFORSHIFU234 Dev'
}

// Capture modes the demo offers. The worker maps each one to its own CLI flags,
// so only these keys are ever forwarded.
const MODES = ['viewport', 'full', 'sections', 'scroll']
const DEFAULT_MODE = 'viewport'

const CACHE_TTL_MS = 30 * 60 * 1000
const CACHE_MAX_ENTRIES = 40
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX = 5

const cache = new Map()
const rateBuckets = new Map()

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  return request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const bucket = rateBuckets.get(ip)

  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateBuckets.set(ip, {
      count: 1,
      windowStart: now
    })

    return false
  }

  bucket.count += 1

  return bucket.count > RATE_LIMIT_MAX
}

export async function POST(request) {
  const ip = getClientIp(request)

  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Too many requests — try again in a minute.' },
      { status: 429 }
    )
  }

  let body

  try {
    body = await request.json()
  } catch {
    return Response.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    )
  }

  const key = body?.target
  const label = TARGETS[key]
  const mode = body?.mode ?? DEFAULT_MODE

  if (!label) {
    return Response.json(
      { error: 'Unknown target. Pick one of the provided options.' },
      { status: 400 }
    )
  }

  if (!MODES.includes(mode)) {
    return Response.json(
      { error: 'Unknown mode. Pick one of the provided options.' },
      { status: 400 }
    )
  }

  const cacheKey = `${key}:${mode}`
  const cached = cache.get(cacheKey)

  if (cached && cached.expiresAt > Date.now()) {
    return Response.json({
      ...cached.payload,
      label,
      mode,
      cached: true
    })
  }

  const captureUrl = process.env.SHOTSWEEP_CAPTURE_URL
  const apiKey = process.env.SHOTSWEEP_CAPTURE_API_KEY

  if (!captureUrl || !apiKey) {
    console.error('ShotSweep capture worker environment variables are missing.')

    return Response.json(
      { error: 'Capture service is not configured.' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `${captureUrl.replace(/\/$/, '')}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          target: key,
          mode
        }),
        cache: 'no-store'
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('ShotSweep capture worker error:', result)

      return Response.json(
        {
          error:
            result?.error ||
            'Capture service failed.'
        },
        {
          status: response.status
        }
      )
    }

    // `frames` is only present for multi-frame modes (sections, scroll);
    // `dataUrl` is always the first frame.
    const payload = {
      dataUrl: result.dataUrl,
      ...(Array.isArray(result.frames) ? { frames: result.frames, truncated: Boolean(result.truncated) } : {})
    }

    if (cache.size >= CACHE_MAX_ENTRIES) {
      cache.delete(cache.keys().next().value)
    }

    cache.set(cacheKey, {
      payload,
      expiresAt: Date.now() + CACHE_TTL_MS
    })

    return Response.json({
      ...payload,
      label: result.label || label,
      mode,
      cached: false
    })
  } catch (error) {
    console.error('SHOTSWEEP CAPTURE PROXY ERROR:', error)

    return Response.json(
      {
        error: 'Unable to reach the capture service.'
      },
      {
        status: 502
      }
    )
  }
}
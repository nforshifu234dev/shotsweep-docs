import { chromium } from 'playwright'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// The demo NEVER accepts a URL from the client — only a key that maps to a
// URL we control. This is the whole SSRF defense: there is no code path
// where user input becomes part of a fetched URL.
const TARGETS = {
  'form-validation': { url: 'https://form-validation.nforshifu234dev.com', label: 'FormValidation' },
  'tour-guide': { url: 'https://tour-guide.nforshifu234dev.com', label: 'TourGuide' },
  wishit: { url: 'https://wish-it.app', label: 'WishIT' },
  iamnotshifu: { url: 'https://iamnotshifu.com', label: 'IAMNOTSHIFU' },
  healthhub: { url: 'https://healthhub.nforshifu234dev.com', label: 'HealthHub' },
  'nfsfu234dev': { url: 'https://nforshifu234dev.com', label: 'NFORSHIFU234 Dev' }
}

const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX = 5
const MAX_CONCURRENT_CAPTURES = 2
const CAPTURE_TIMEOUT_MS = 15000

// In-memory only — resets on redeploy/restart. Fine for a demo endpoint;
// swap for Redis/KV if this needs to survive restarts or run across
// multiple instances.
const cache = new Map() // key -> { dataUrl, expiresAt }
const rateBuckets = new Map() // ip -> { count, windowStart }
let inFlight = 0

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const bucket = rateBuckets.get(ip)

  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateBuckets.set(ip, { count: 1, windowStart: now })
    return false
  }

  bucket.count += 1
  return bucket.count > RATE_LIMIT_MAX
}

async function captureTarget(url) {
  const browser = await chromium.launch({ headless: true })

  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    const page = await context.newPage()

    await page.goto(url, { waitUntil: 'load', timeout: CAPTURE_TIMEOUT_MS })
    const buffer = await page.screenshot({ type: 'png' })

    return `data:image/png;base64,${buffer.toString('base64')}`
  } finally {
    await browser.close()
  }
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
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const key = body?.target
  const target = TARGETS[key]

  if (!target) {
    return Response.json(
      { error: 'Unknown target. Pick one of the provided options.' },
      { status: 400 }
    )
  }

  const cached = cache.get(key)
  if (cached && cached.expiresAt > Date.now()) {
    return Response.json({ dataUrl: cached.dataUrl, label: target.label, cached: true })
  }

  if (inFlight >= MAX_CONCURRENT_CAPTURES) {
    return Response.json(
      { error: 'Demo is busy capturing another site — try again shortly.' },
      { status: 429 }
    )
  }

  inFlight += 1
  try {
    const dataUrl = await captureTarget(target.url)
    cache.set(key, { dataUrl, expiresAt: Date.now() + CACHE_TTL_MS })
    return Response.json({ dataUrl, label: target.label, cached: false })
  } catch (err) {
    const timedOut = /Timeout|timeout/.test(err?.message ?? '')
    return Response.json(
      { error: timedOut ? 'The target page took too long to load.' : 'Capture failed.' },
      { status: timedOut ? 504 : 500 }
    )
  } finally {
    inFlight -= 1
  }
}
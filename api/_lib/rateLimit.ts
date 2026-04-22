const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

const requests = new Map<string, number[]>()

export function getClientIp(req: { headers?: Record<string, string | string[] | undefined> }) {
  const forwarded = req.headers?.['x-forwarded-for']
  const rawValue = Array.isArray(forwarded) ? forwarded[0] : forwarded
  if (rawValue && rawValue.length > 0) {
    return rawValue.split(',')[0]?.trim() ?? 'unknown'
  }

  return 'unknown'
}

export function isRateLimited(key: string) {
  const now = Date.now()
  const history = requests.get(key) ?? []
  const activeWindow = history.filter((time) => now - time < WINDOW_MS)

  if (activeWindow.length >= MAX_REQUESTS) {
    requests.set(key, activeWindow)
    return true
  }

  activeWindow.push(now)
  requests.set(key, activeWindow)
  return false
}

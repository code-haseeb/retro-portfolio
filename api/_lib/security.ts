type RequestHeaders = Record<string, string | string[] | undefined>

export function allowedOrigins() {
  const configured = process.env.ALLOWED_ORIGINS ?? ''
  return configured
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
}

export function isOriginAllowed(origin: string | undefined, headers: RequestHeaders = {}) {
  const allowList = allowedOrigins()
  if (allowList.length === 0) return true
  if (!origin) return false

  const hostHeader = headers.host
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader

  return allowList.includes(origin) || (host ? allowList.includes(`https://${host}`) : false)
}

export function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy':
      "default-src 'self'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  } as const
}

import { Resend } from 'resend'
import { parseContactPayload, validatePayloadSize } from './_lib/validation'
import { getClientIp, isRateLimited } from './_lib/rateLimit'
import { isOriginAllowed, securityHeaders } from './_lib/security'

type ApiRequest = {
  method?: string
  body?: unknown
  headers: Record<string, string | string[] | undefined>
}

type ApiResponse = {
  setHeader: (name: string, value: string) => void
  status: (statusCode: number) => { json: (payload: unknown) => void }
}

function applyHeaders(res: ApiResponse) {
  const headers = securityHeaders()
  for (const [name, value] of Object.entries(headers)) {
    res.setHeader(name, value)
  }
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  applyHeaders(res)

  if (req.method === 'OPTIONS') {
    return res.status(204).json({ ok: true })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined
  if (!isOriginAllowed(origin, req.headers)) {
    return res.status(403).json({ message: 'Origin denied' })
  }

  const ip = getClientIp(req)
  if (isRateLimited(ip)) {
    return res.status(429).json({ message: 'Too many requests, try later' })
  }

  if (!validatePayloadSize(req.body)) {
    return res.status(413).json({ message: 'Payload too large' })
  }

  try {
    const payload = parseContactPayload(req.body)

    if (payload.website) {
      return res.status(400).json({ message: 'Spam detected' })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL
    const fromEmail = process.env.CONTACT_FROM_EMAIL

    if (!resendApiKey || !toEmail || !fromEmail) {
      return res.status(500).json({ message: 'Email service is not configured' })
    }

    const resend = new Resend(resendApiKey)

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: payload.email,
      subject: `[Portfolio Contact] ${payload.subject}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.description}`,
    })

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(400).json({ message: 'Invalid payload' })
  }
}

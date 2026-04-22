import { z } from 'zod'

const MAX_PAYLOAD_BYTES = 8_192

export const ContactPayloadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(180),
  subject: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(),
})

export type ContactPayload = z.infer<typeof ContactPayloadSchema>

export function validatePayloadSize(input: unknown) {
  const bytes = Buffer.byteLength(JSON.stringify(input ?? {}), 'utf8')
  return bytes <= MAX_PAYLOAD_BYTES
}

export function sanitizeText(value: string) {
  return value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim()
}

export function parseContactPayload(body: unknown): ContactPayload {
  const parsed = ContactPayloadSchema.parse(body)
  return {
    ...parsed,
    name: sanitizeText(parsed.name),
    email: sanitizeText(parsed.email.toLowerCase()),
    subject: sanitizeText(parsed.subject),
    description: sanitizeText(parsed.description),
  }
}

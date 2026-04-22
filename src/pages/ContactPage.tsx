import { type FormEvent, useState } from 'react'
import { z } from 'zod'
import { AppShell } from '../components/layout/AppShell'
import { PixelButton } from '../components/ui/PixelButton'
import { PixelInput, PixelTextarea } from '../components/ui/PixelInput'
import { PixelCard } from '../components/ui/PixelCard'

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(180),
  subject: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(),
})

type FormState = z.infer<typeof ContactSchema>

const initialState: FormState = {
  name: '',
  email: '',
  subject: '',
  description: '',
  website: '',
}

export function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsed = ContactSchema.safeParse(form)
    if (!parsed.success) {
      setStatus('error')
      setMessage(parsed.error.issues[0]?.message ?? 'Please review your input.')
      return
    }

    setStatus('sending')
    setMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })

      if (!response.ok) {
        const error = (await response.json()) as { message?: string }
        throw new Error(error.message ?? 'Unable to submit right now.')
      }

      setStatus('success')
      setMessage('Message sent successfully. Thanks for reaching out.')
      setForm(initialState)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Submission failed.')
    }
  }

  return (
    <AppShell
      title="Contact"
      subtitle="Open to software engineering, secure development, and penetration testing opportunities."
      exitTo="/menu"
    >
      <PixelCard className="mx-auto w-full max-w-2xl">
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div>
            <label className="mono-inline mb-2 block" htmlFor="name">
              Name
            </label>
            <PixelInput
              id="name"
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label className="mono-inline mb-2 block" htmlFor="email">
              Email
            </label>
            <PixelInput
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => update('email', event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="mono-inline mb-2 block" htmlFor="subject">
              Subject
            </label>
            <PixelInput
              id="subject"
              value={form.subject}
              onChange={(event) => update('subject', event.target.value)}
              required
            />
          </div>

          <div>
            <label className="mono-inline mb-2 block" htmlFor="description">
              Description
            </label>
            <PixelTextarea
              id="description"
              value={form.description}
              onChange={(event) => update('description', event.target.value)}
              required
            />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => update('website', event.target.value)}
            />
          </div>

          <PixelButton type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </PixelButton>

          {message ? (
            <p
              className={status === 'success' ? 'text-sm text-emerald-600' : 'text-sm text-rose-700'}
              role="status"
            >
              {message}
            </p>
          ) : null}
        </form>
      </PixelCard>
    </AppShell>
  )
}

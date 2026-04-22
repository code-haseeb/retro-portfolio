import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type PixelInputProps = InputHTMLAttributes<HTMLInputElement>
type PixelTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export function PixelInput({ className, ...rest }: PixelInputProps) {
  return (
    <input
      className={cn(
        'focus-ring w-full rounded-none border-2 border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--text)]',
        className,
      )}
      {...rest}
    />
  )
}

export function PixelTextarea({ className, ...rest }: PixelTextareaProps) {
  return (
    <textarea
      className={cn(
        'focus-ring min-h-36 w-full rounded-none border-2 border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--text)]',
        className,
      )}
      {...rest}
    />
  )
}

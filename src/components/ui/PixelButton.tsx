import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '../../utils/cn'

type PixelButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: 'primary' | 'ghost'
    fullWidth?: boolean
  }
>

export function PixelButton({
  children,
  className,
  tone = 'primary',
  fullWidth = false,
  ...rest
}: PixelButtonProps) {
  return (
    <button
      className={cn(
        'focus-ring mono-inline rounded-none border-2 px-4 py-3 transition active:translate-y-[2px]',
        fullWidth && 'w-full',
        tone === 'primary' &&
          'border-[var(--border)] bg-[var(--accent-500)] text-white hover:bg-[var(--accent-600)]',
        tone === 'ghost' &&
          'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-soft)]',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

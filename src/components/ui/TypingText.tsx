import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type TypingTextProps = {
  values: readonly string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
}

export function TypingText({
  values,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseMs = 1200,
}: TypingTextProps) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const reducedMotion = useReducedMotion()
  const displayedText = reducedMotion ? values[index] ?? '' : text

  useEffect(() => {
    if (values.length === 0) return
    if (reducedMotion) return

    const fullText = values[index]
    const nextStep = () => {
      if (!isDeleting) {
        const next = fullText.slice(0, text.length + 1)
        setText(next)
        if (next === fullText) {
          setTimeout(() => setIsDeleting(true), pauseMs)
          return
        }
      } else {
        const next = fullText.slice(0, Math.max(0, text.length - 1))
        setText(next)
        if (next.length === 0) {
          setIsDeleting(false)
          setIndex((current) => (current + 1) % values.length)
          return
        }
      }
    }

    const delay = isDeleting ? deletingSpeed : typingSpeed
    const timeout = window.setTimeout(nextStep, delay)

    return () => window.clearTimeout(timeout)
  }, [values, index, text, isDeleting, typingSpeed, deletingSpeed, pauseMs, reducedMotion])

  return (
    <span className="mono-inline text-[var(--accent-500)]">
      {displayedText}
      <span aria-hidden="true" className="animate-pulse">
        |
      </span>
    </span>
  )
}

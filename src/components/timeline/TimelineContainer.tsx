import type { PropsWithChildren } from 'react'

export function TimelineContainer({ children }: PropsWithChildren) {
  return <ol className="relative ml-2 border-l-2 border-[var(--border)] pl-8">{children}</ol>
}

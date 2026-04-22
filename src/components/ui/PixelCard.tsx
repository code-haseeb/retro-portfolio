import type { HTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '../../utils/cn'

type PixelCardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export function PixelCard({ className, children, ...rest }: PixelCardProps) {
  return (
    <div className={cn('retro-screen p-5', className)} {...rest}>
      {children}
    </div>
  )
}

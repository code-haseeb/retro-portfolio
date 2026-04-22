import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const TIME_TO_TARGET_MS = 900
const MAX_FRAME_STEP_SEC = 0.05

export function PacmanCursorFollower() {
  const pacmanRef = useRef<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine), (pointer: coarse)')
    const updateEnabled = () => setEnabled(media.matches)
    updateEnabled()
    media.addEventListener('change', updateEnabled)

    return () => media.removeEventListener('change', updateEnabled)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const el = pacmanRef.current
    if (!el) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let frameId = 0
    let lastTime = 0

    const render = (time: number) => {
      if (!lastTime) lastTime = time
      const deltaSec = Math.min((time - lastTime) / 1000, MAX_FRAME_STEP_SEC)
      lastTime = time

      const dx = targetX - currentX
      const dy = targetY - currentY

      if (reducedMotion) {
        currentX = targetX
        currentY = targetY
        el.dataset.moving = 'false'
      } else {
        const tau = TIME_TO_TARGET_MS / 1000
        const factor = 1 - Math.exp(-deltaSec / tau)
        currentX += dx * factor
        currentY += dy * factor
        const remaining = Math.hypot(targetX - currentX, targetY - currentY)
        if (remaining < 0.5) {
          currentX = targetX
          currentY = targetY
          el.dataset.moving = 'false'
        } else {
          el.dataset.moving = 'true'
        }
      }

      el.style.transform = `
        translate3d(${currentX}px, ${currentY}px, 0)
        translate(-50%, -50%)
      `

      frameId = requestAnimationFrame(render)
    }

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      el.classList.add('is-visible')
    }

    const handlePointerLeave = () => {
      el.classList.remove('is-visible')
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)

    frameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [enabled, reducedMotion])

  if (!enabled) return null

  return (
    <div ref={pacmanRef} className="pacman-cursor-follower">
      <span aria-hidden="true" />
    </div>
  )
}
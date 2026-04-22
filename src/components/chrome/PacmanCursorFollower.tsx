import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const TIME_TO_TARGET_MS = 2000
const MAX_FRAME_STEP_SEC = 0.05
const GRID_SIZE_PX = 24
const AXIS_ALIGN_EPS = 0.5

export function PacmanCursorFollower() {
  const pacmanRef = useRef<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const updateEnabled = () => setEnabled(media.matches)
    updateEnabled()
    media.addEventListener('change', updateEnabled)

    return () => media.removeEventListener('change', updateEnabled)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const element = pacmanRef.current
    if (!element) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let angle = 0
    let desiredAngle = 0
    let lastMouseX = targetX
    let lastMouseY = targetY
    let speed = 0
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
      } else {
        const moveAlongX = Math.abs(dx) > AXIS_ALIGN_EPS
        const axisDistance = moveAlongX ? Math.abs(dx) : Math.abs(dy)
        const step = Math.min(speed * deltaSec, axisDistance)

        if (moveAlongX) {
          currentX += Math.sign(dx) * step
        } else {
          currentY += Math.sign(dy) * step
        }
      }

      if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        angle = desiredAngle
      }

      element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${angle}deg)`
      frameId = window.requestAnimationFrame(render)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rawX = event.clientX
      const rawY = event.clientY
      const mouseDx = rawX - lastMouseX
      const mouseDy = rawY - lastMouseY

      if (Math.abs(mouseDx) > Math.abs(mouseDy)) {
        desiredAngle = mouseDx >= 0 ? 0 : 180
      } else if (Math.abs(mouseDy) > 0) {
        desiredAngle = mouseDy >= 0 ? 90 : -90
      }

      lastMouseX = rawX
      lastMouseY = rawY
      targetX = Math.round(rawX / GRID_SIZE_PX) * GRID_SIZE_PX
      targetY = Math.round(rawY / GRID_SIZE_PX) * GRID_SIZE_PX
      const distance = Math.hypot(targetX - currentX, targetY - currentY)
      speed = distance / (TIME_TO_TARGET_MS / 1000)
      element.classList.add('is-visible')
    }

    const handleMouseLeave = () => {
      element.classList.remove('is-visible')
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)
    frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [enabled, reducedMotion])

  if (!enabled) return null

  return <div ref={pacmanRef} className="pacman-cursor-follower" aria-hidden="true" />
}
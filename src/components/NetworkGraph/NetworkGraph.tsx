'use client'

import React, { useEffect, useRef } from 'react'

type Node = { x: number; y: number; p: number; r: number }

type NetworkGraphProps = {
  className?: string
  nodeCount?: number
  animate?: boolean
}

const MOBILE_BREAKPOINT = 640
const MOBILE_NODE_RATIO = 0.6

// Deterministic layout (Park–Miller PRNG) so the graph looks the same on every load.
function createNodes(count: number): Node[] {
  let seed = 7
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  return Array.from({ length: count }, () => ({
    x: rnd(),
    y: rnd(),
    p: rnd() * Math.PI * 2,
    r: 1 + rnd() * 1.8,
  }))
}

export function NetworkGraph({ className, nodeCount = 70, animate = true }: NetworkGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0
    let height = 0
    let dpr = 1
    let nodes: Node[] = []
    let t = 0
    let raf = 0
    let inView = true

    const draw = () => {
      if (!width) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const pts = nodes.map((n) => ({
        x: width * (0.35 + n.x * 0.62) + Math.sin(t + n.p) * 14,
        y: height * (0.2 + n.y * 0.6) + Math.cos(t * 0.8 + n.p) * 14,
        r: n.r,
      }))

      const maxD = Math.min(width, height) * 0.17
      ctx.lineWidth = 0.8
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < maxD) {
            ctx.strokeStyle = `rgba(227,236,234,${0.2 * (1 - d / maxD)})`
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      ctx.fillStyle = 'rgba(140,203,184,0.75)'
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const shouldAnimate = () =>
      animate && !reducedMotion.matches && inView && document.visibilityState === 'visible'

    const tick = () => {
      t += 0.004
      draw()
      raf = requestAnimationFrame(tick)
    }

    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const sync = () => {
      if (shouldAnimate()) {
        if (!raf) raf = requestAnimationFrame(tick)
      } else {
        stop()
        draw()
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr

      const count =
        width < MOBILE_BREAKPOINT ? Math.round(nodeCount * MOBILE_NODE_RATIO) : nodeCount
      if (count !== nodes.length) nodes = createNodes(count)

      draw()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      sync()
    })
    intersectionObserver.observe(canvas)

    document.addEventListener('visibilitychange', sync)
    reducedMotion.addEventListener('change', sync)

    resize()
    sync()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', sync)
      reducedMotion.removeEventListener('change', sync)
    }
  }, [animate, nodeCount])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

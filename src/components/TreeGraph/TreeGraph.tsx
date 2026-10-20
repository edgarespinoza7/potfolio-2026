'use client'

import React, { useEffect, useRef } from 'react'

type NodeKind = 'axis' | 'trunk' | 'crown' | 'root' | 'leaf'

type TreeNode = {
  i: number
  x: number
  y: number
  parent: number
  kind: NodeKind
  depth: number
  kids: number[]
  /** Branch curvature. */
  bend: number
  /** Sway phase. */
  p: number
  /** Sway amplitude in px. */
  sw: number
}

type Tree = { nodes: TreeNode[]; box: [number, number, number, number] }

type Signal = { n: number; p: number }

type Point = { x: number; y: number }

type TreeGraphProps = {
  className?: string
  /** Crown branching depth (3–6). */
  depth?: number
  animate?: boolean
}

// Below Tailwind's `lg` the tree is centred in the upper part of the hero; from `lg` it sits on the right.
const LG_BREAKPOINT = 1024

// Deterministic tree (Park–Miller PRNG) so it looks the same on every load.
function buildTree(D: number): Tree {
  let seed = 23
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const nodes: TreeNode[] = []

  const add = (x: number, y: number, parent: number, kind: NodeKind, depth: number) => {
    const n: TreeNode = {
      i: nodes.length,
      x,
      y,
      parent,
      kind,
      depth,
      kids: [],
      bend: (rnd() - 0.5) * 0.35,
      p: rnd() * Math.PI * 2,
      sw: 0,
    }
    nodes.push(n)
    if (parent >= 0) nodes[parent].kids.push(n.i)
    return n
  }

  const ground = add(0, 0, -1, 'axis', 0)
  const t1 = add((rnd() - 0.5) * 0.03, -0.12, ground.i, 'trunk', 0)
  const t2 = add((rnd() - 0.5) * 0.04, -0.23, t1.i, 'trunk', 0)
  const t3 = add((rnd() - 0.5) * 0.03, -0.33, t2.i, 'trunk', 0)

  const crown = (from: TreeNode, ang: number, len: number, d: number) => {
    const n = add(from.x + Math.cos(ang) * len, from.y + Math.sin(ang) * len, from.i, 'crown', d)
    if (d >= D) return
    const k = rnd() < 0.25 ? 3 : 2
    for (let c = 0; c < k; c++) {
      const spread = 0.32 + rnd() * 0.3
      let a = ang + (k === 2 ? (c ? 1 : -1) * spread : (c - 1) * spread) + (rnd() - 0.5) * 0.25
      a += (-Math.PI / 2 - a) * 0.08
      crown(n, a, len * (0.7 + rnd() * 0.14), d + 1)
    }
  }
  ;[-0.62, 0.02, 0.6].forEach((o) => crown(t3, -Math.PI / 2 + o + (rnd() - 0.5) * 0.15, 0.19, 1))
  crown(t2, -Math.PI / 2 - 1.05, 0.13, 2)
  crown(t2, -Math.PI / 2 + 1.0, 0.13, 2)

  const root = (from: TreeNode, ang: number, len: number, d: number) => {
    const n = add(from.x + Math.cos(ang) * len, from.y + Math.sin(ang) * len, from.i, 'root', d)
    if (d >= 3) return
    for (let c = 0; c < 2; c++) {
      let a = ang + (c ? 1 : -1) * (0.3 + rnd() * 0.35)
      a += a > Math.PI / 2 ? 0.12 : -0.12
      root(n, a, len * (0.68 + rnd() * 0.15), d + 1)
    }
  }
  ;[-1.2, -0.6, 0, 0.6, 1.2].forEach((o) =>
    root(ground, Math.PI / 2 + o + (rnd() - 0.5) * 0.2, 0.09 + rnd() * 0.03, 1),
  )

  // Loose "leaf" dots around the crown tips.
  nodes
    .filter((n) => n.kind === 'crown' && !n.kids.length)
    .forEach((tip) => {
      const m = 1 + (rnd() < 0.5 ? 1 : 0)
      for (let q = 0; q < m; q++) {
        const a = rnd() * Math.PI * 2
        const r = 0.02 + rnd() * 0.05
        add(tip.x + Math.cos(a) * r, tip.y + Math.sin(a) * r, -1, 'leaf', D + 1)
      }
    })

  nodes.forEach((n) => {
    n.sw =
      n.kind === 'axis'
        ? 0
        : n.kind === 'trunk'
          ? 0.4
          : n.kind === 'crown'
            ? 1 + n.depth * 1.3
            : n.kind === 'root'
              ? 0.8 + n.depth * 0.6
              : 9
  })

  let bx0 = Infinity
  let bx1 = -Infinity
  let by0 = Infinity
  let by1 = -Infinity
  nodes.forEach((n) => {
    bx0 = Math.min(bx0, n.x)
    bx1 = Math.max(bx1, n.x)
    by0 = Math.min(by0, n.y)
    by1 = Math.max(by1, n.y)
  })

  return { nodes, box: [bx0, bx1, by0, by1] }
}

export function TreeGraph({ className, depth = 5, animate = true }: TreeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const { nodes, box } = buildTree(depth)

    let width = 0
    let height = 0
    let dpr = 1
    let t = 0
    let raf = 0
    let lastTs = 0
    let inView = true

    // Signal state: glow per node, travelling signals, next spontaneous fire (seconds).
    const glow = new Float32Array(nodes.length)
    let signals: Signal[] = []
    let nextFire = performance.now() / 1000 + 0.8
    let pts: Point[] = []
    let maxD = 0

    const fire = (i: number) => {
      glow[i] = 1
      const n = nodes[i]
      if (!n.kids.length) {
        // A signal reaching a crown tip lights up the nearby leaves.
        if (n.kind === 'crown' && pts.length) {
          const a = pts[i]
          nodes.forEach((m, j) => {
            if (m.kind !== 'leaf') return
            const b = pts[j]
            if (Math.hypot(a.x - b.x, a.y - b.y) < maxD * 1.3) glow[j] = Math.max(glow[j], 0.75)
          })
        }
        return
      }
      const pick = n.kids.slice().sort(() => Math.random() - 0.5)
      signals.push({ n: pick[0], p: 0 })
      if (pick[1] !== undefined && Math.random() < (n.kind === 'axis' ? 0.6 : 0.3)) {
        signals.push({ n: pick[1], p: 0 })
      }
    }

    const draw = (now: number, dt: number, anim: boolean) => {
      if (!width) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const small = width < LG_BREAKPOINT
      const X0 = small ? width * 0.05 : width * 0.48
      const X1 = small ? width * 0.95 : width * 0.96
      const Y0 = 96
      const Y1 = small ? height * 0.62 : height * 0.9
      const sc = Math.min((X1 - X0) / (box[1] - box[0]), (Y1 - Y0) / (box[3] - box[2]))
      const ox = (X0 + X1) / 2 - ((box[0] + box[1]) / 2) * sc
      const oy = (Y0 + Y1) / 2 - ((box[2] + box[3]) / 2) * sc

      pts = nodes.map((n) => ({
        x: ox + n.x * sc + Math.sin(t * 0.9 + n.p) * n.sw,
        y: oy + n.y * sc + Math.cos(t * 0.7 + n.p) * n.sw * 0.7,
      }))
      maxD = sc * 0.075

      const curve = (n: TreeNode) => {
        const A = pts[n.parent]
        const B = pts[n.i]
        const dx = B.x - A.x
        const dy = B.y - A.y
        const C = { x: (A.x + B.x) / 2 - dy * n.bend, y: (A.y + B.y) / 2 + dx * n.bend }
        return (u: number) => ({
          x: (1 - u) * (1 - u) * A.x + 2 * (1 - u) * u * C.x + u * u * B.x,
          y: (1 - u) * (1 - u) * A.y + 2 * (1 - u) * u * C.y + u * u * B.y,
        })
      }
      const path = (n: TreeNode, upto = 1) => {
        const q = curve(n)
        const steps = 14
        let pt = q(0)
        ctx.beginPath()
        ctx.moveTo(pt.x, pt.y)
        for (let k = 1; k <= steps; k++) {
          pt = q((upto * k) / steps)
          ctx.lineTo(pt.x, pt.y)
        }
        return pt
      }

      if (anim) {
        if (now > nextFire) {
          fire(0)
          nextFire = now + 3.5 + Math.random() * 3
        }
        const speed = sc * 0.1
        for (const s of signals) {
          const A = pts[nodes[s.n].parent]
          const B = pts[s.n]
          s.p += (dt * speed) / Math.max(8, Math.hypot(B.x - A.x, B.y - A.y))
        }
        const done = signals.filter((s) => s.p >= 1)
        signals = signals.filter((s) => s.p < 1)
        done.forEach((s) => fire(s.n))
        for (let i = 0; i < glow.length; i++) glow[i] = Math.max(0, glow[i] - dt * 0.3)
      }

      // Proximity links between nearby nodes.
      ctx.lineWidth = 0.6
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          if (Math.abs(dx) > maxD || Math.abs(dy) > maxD) continue
          const d = Math.hypot(dx, dy)
          if (d >= maxD) continue
          const k = 1 - d / maxD
          const lit = Math.min(glow[i], glow[j])
          ctx.strokeStyle = `rgba(227,236,234,${0.12 * k})`
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.stroke()
          if (lit > 0.02) {
            ctx.strokeStyle = `rgba(140,203,184,${0.4 * lit * k})`
            ctx.stroke()
          }
        }
      }

      // Branches.
      for (const n of nodes) {
        if (n.parent < 0) continue
        ctx.lineWidth =
          n.kind === 'trunk'
            ? 2
            : n.kind === 'crown'
              ? Math.max(0.6, 1.7 - n.depth * 0.22)
              : Math.max(0.6, 1.5 - n.depth * 0.3)
        ctx.strokeStyle = 'rgba(227,236,234,0.2)'
        path(n)
        ctx.stroke()
        if (glow[n.i] > 0.02) {
          ctx.strokeStyle = `rgba(140,203,184,${0.55 * glow[n.i]})`
          ctx.stroke()
        }
      }

      // Travelling signals.
      ctx.lineWidth = 1.2
      for (const s of signals) {
        const e = s.p * s.p * (3 - 2 * s.p)
        ctx.strokeStyle = 'rgba(160,215,198,0.6)'
        const pt = path(nodes[s.n], e)
        ctx.stroke()
        ctx.fillStyle = 'rgba(200,240,228,0.9)'
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Nodes, with a soft halo while glowing.
      for (const n of nodes) {
        const { x, y } = pts[n.i]
        const gl = glow[n.i]
        const tip = !n.kids.length && n.kind !== 'leaf'
        const base = n.kind === 'axis' ? 2.6 : n.kind === 'leaf' ? 1.2 : tip ? 1.6 : 1
        if (gl > 0.01) {
          const Rg = base + 12 * gl
          const rg = ctx.createRadialGradient(x, y, 0, x, y, Rg)
          rg.addColorStop(0, `rgba(140,203,184,${0.35 * gl})`)
          rg.addColorStop(1, 'rgba(140,203,184,0)')
          ctx.fillStyle = rg
          ctx.beginPath()
          ctx.arc(x, y, Rg, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle =
          gl > 0.01
            ? `rgba(${140 + 60 * gl},${203 + 37 * gl},${184 + 44 * gl},${0.8 + 0.2 * gl})`
            : n.kind === 'leaf'
              ? 'rgba(140,203,184,0.55)'
              : tip || n.kind === 'axis'
                ? 'rgba(140,203,184,0.75)'
                : 'rgba(227,236,234,0.35)'
        ctx.beginPath()
        ctx.arc(x, y, base * (1 + 0.5 * gl), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const shouldAnimate = () =>
      animate && !reducedMotion.matches && inView && document.visibilityState === 'visible'

    const drawStatic = () => draw(performance.now() / 1000, 0, false)

    const tick = (ts: number) => {
      const now = ts / 1000
      const dt = lastTs ? Math.min(0.05, now - lastTs) : 0
      lastTs = now
      t += dt * 0.24
      draw(now, dt, true)
      raf = requestAnimationFrame(tick)
    }

    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
      lastTs = 0
    }

    const sync = () => {
      if (shouldAnimate()) {
        if (!raf) raf = requestAnimationFrame(tick)
      } else {
        stop()
        drawStatic()
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      if (!raf) drawStatic()
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
  }, [animate, depth])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

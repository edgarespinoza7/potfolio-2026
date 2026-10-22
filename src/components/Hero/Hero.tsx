import React from 'react'

import { ChevronDownIcon } from '@/components/icons'
import { TreeGraph } from '@/components/TreeGraph/TreeGraph'

export function Hero() {
  return (
    <div className="bg-hero relative flex min-h-svh flex-col overflow-hidden">
      <div
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen"
        aria-hidden="true"
      />
      <TreeGraph className="pointer-events-none absolute inset-0 size-full" />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b/srgb from-bg/0 from-45% to-bg/85"
        aria-hidden="true"
      />

      <header className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-gutter py-8 font-mono text-[12px] tracking-[0.06em] whitespace-nowrap text-fg uppercase">
        <span>Edgar Espinoza</span>
        <span>Full-stack engineer</span>
      </header>

      <section className="relative flex flex-1 flex-col justify-end gap-[clamp(32px,5vh,56px)] px-gutter pb-[clamp(32px,6vh,64px)] lg:pb-[clamp(104px,15vh,160px)]">
        <h1 className="text-[clamp(40px,7vw,120px)] leading-none lg:text-[clamp(40px,4vw,96px)] font-medium tracking-[-0.035em]">
          {/* One sentence per line; each wraps (balanced) only on narrow screens. */}
          <span className="block text-balance">Connecting the dots.</span>{' '}
          <span className="block text-balance text-muted">Visualizing complexity.</span>
        </h1>

        <p className="max-w-[52ch] text-[clamp(15px,1.3vw,18px)] leading-[1.55] text-pretty text-body">
          Full-stack software engineer at{' '}
          <a
            className="text-fg underline decoration-fg/35 underline-offset-3 transition-[text-decoration-color] duration-200 hover:decoration-fg"
            href="https://vizzuality.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Vizzuality
          </a>
          <br/>
          I build <span className="text-fg">high-performance web apps</span> and{' '}
          <span className="text-fg">interactive data visualizations</span> that help people{' '}
          <span className="text-fg">explore, understand, and act</span> on complex datasets.
        </p>
      </section>

      {/* Scroll cue. Hidden below lg, where it would overlap the full-width bio. */}
      <a
        href="#work"
        aria-label="Scroll to selected work"
        className="absolute bottom-[clamp(32px,6vh,64px)] left-1/2 hidden -translate-x-1/2 p-2 text-muted transition-colors duration-200 hover:text-fg focus-visible:text-fg lg:block"
      >
        <span className="block animate-nudge motion-reduce:animate-none">
          <ChevronDownIcon />
        </span>
      </a>
    </div>
  )
}

import React from 'react'

import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/icons'
import { NetworkGraph } from '@/components/NetworkGraph/NetworkGraph'

const SOCIAL_LINKS = [
  { href: 'https://github.com/edgarespinoza7', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://www.linkedin.com/in/edgarespinozadev/', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://x.com/edgrafo', label: 'X', Icon: XIcon },
]

export function Hero() {
  return (
    <div className="bg-hero relative flex min-h-svh flex-col overflow-hidden">
      <div
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen"
        aria-hidden="true"
      />
      <NetworkGraph className="pointer-events-none absolute inset-0 size-full" />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b/srgb from-bg/0 from-45% to-bg/85"
        aria-hidden="true"
      />

      <header className="relative flex items-center justify-between gap-6 px-gutter py-8 font-mono text-[12px] tracking-[0.06em] whitespace-nowrap text-fg uppercase">
        <span>Edgar Espinoza</span>
        <span>Front-end engineer</span>
      </header>

      <section className="relative flex flex-1 flex-col justify-end gap-[clamp(32px,5vh,56px)] px-gutter pb-[clamp(32px,6vh,64px)]">
        <h1 className="text-[clamp(36px,5.4vw,88px)] leading-none font-medium tracking-[-0.03em]">
          {/* One sentence per line; each wraps (balanced) only on narrow screens. */}
          <span className="block text-balance">Connecting the dots.</span>{' '}
          <span className="block text-balance text-muted">Advancing sustainability.</span>
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-rule pt-6">
          <p className="max-w-[46ch] text-[clamp(15px,1.3vw,18px)] leading-[1.55] text-pretty text-body">
            Front-end software engineer at{' '}
            <a
              className="text-fg underline decoration-fg/35 underline-offset-3 transition-[text-decoration-color] duration-200 hover:decoration-fg"
              href="https://vizzuality.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vizzuality
            </a>
            . I build <span className="text-fg">interactive data visualizations</span>,{' '}
            <span className="text-fg">data stories</span>,{' '}
            <span className="text-fg">Web GIS platforms</span>, and{' '}
            <span className="text-fg">high-performance web apps</span> that transform complexity
            into clarity.
          </p>

          <nav className="flex gap-3" aria-label="Social links">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                className="flex size-12 items-center justify-center rounded-full border border-fg/18 text-fg transition-colors duration-200 hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg"
                href={href}
                aria-label={label}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon />
              </a>
            ))}
          </nav>
        </div>
      </section>
    </div>
  )
}

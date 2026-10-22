import React from 'react'

import { SocialLinks } from '@/components/SocialLinks/SocialLinks'

export function Footer() {
  return (
    <footer className="flex flex-col gap-[clamp(40px,6vh,64px)] bg-bg px-gutter pt-[clamp(48px,8vh,80px)] pb-10">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <p className="text-[clamp(28px,3.4vw,52px)] leading-[1.05] font-medium tracking-[-0.03em] text-fg">
          Let’s connect.
        </p>
        <SocialLinks />
      </div>

      <div className="flex flex-wrap justify-between gap-4 border-t border-rule pt-6 font-mono text-[12px] tracking-[0.06em] text-muted uppercase">
        <span>© {new Date().getFullYear()} Edgar Espinoza</span>
        <span>Full-stack engineer</span>
      </div>
    </footer>
  )
}

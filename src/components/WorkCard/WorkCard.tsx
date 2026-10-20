import Image from 'next/image'
import React from 'react'

import type { ProjectImage } from '@/data/projects'

type WorkCardProps = {
  index: string
  title: string
  link: string
  domain: string
  image?: ProjectImage
}

export function WorkCard({ index, title, link, domain, image }: WorkCardProps) {
  return (
    <article className="flex flex-wrap gap-x-12 gap-y-6 border-t border-rule py-10 text-fg">
      <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-4">
        <span className="font-mono text-[12px] tracking-[0.06em] text-muted">{index}</span>
        <h3 className="text-[clamp(24px,2.4vw,36px)] leading-[1.1] font-medium tracking-[-0.02em] text-balance">
          {title}
        </h3>
      </div>

      {/* The frame takes the screenshot's own ratio so nothing is cropped (logo and nav stay visible).
          Screenshots rest muted and come to full colour on hover. The muting lives in overlays that
          only fade their opacity, so the image itself animates nothing but its (GPU-composited) zoom.
          The site link sits centred on the frame and fades in on hover or keyboard focus; on touch
          screens (no hover) it is always visible. */}
      <div
        className={`group relative min-w-0 flex-[2_1_420px] self-start overflow-hidden rounded-[10px] border border-fg/8 bg-surface ${image ? '' : 'aspect-[16/10]'}`}
      >
        {image && (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="block h-auto w-full origin-top-left transition-transform duration-600 ease-[cubic-bezier(.2,.7,.2,1)] group-focus-within:scale-105 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100"
            />
            {/* Desaturate (~70%): neutral grey blended with `saturation` strips colour. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[#808080] opacity-70 mix-blend-saturation transition-opacity duration-600 ease-[cubic-bezier(.2,.7,.2,1)] group-focus-within:opacity-0 group-hover:opacity-0 motion-reduce:transition-none"
            />
            {/* Dim slightly. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-black opacity-10 transition-opacity duration-600 ease-[cubic-bezier(.2,.7,.2,1)] group-focus-within:opacity-0 group-hover:opacity-0 motion-reduce:transition-none"
            />
          </>
        )}

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
          <a
            className="pointer-events-auto flex translate-y-1 items-center gap-2.5 rounded-full border border-fg/18 bg-bg/85 px-[18px] py-3 font-mono text-[12px] tracking-[0.06em] text-fg uppercase opacity-0 transition-[opacity,translate,background-color,color] duration-600 ease-[cubic-bezier(.2,.7,.2,1)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg motion-reduce:translate-y-0 motion-reduce:transition-none [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
            href={link}
            rel="noopener noreferrer"
            target="_blank"
          >
            {domain} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}

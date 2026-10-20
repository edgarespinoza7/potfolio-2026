import React from 'react'

import { WorkCard } from '@/components/WorkCard/WorkCard'
import { getDomain, PROJECTS } from '@/data/projects'

export function SelectedWork() {
  return (
    <section
      id="work"
      className="flex flex-col gap-8 bg-bg px-gutter pt-[clamp(64px,10vh,120px)] pb-[clamp(48px,8vh,96px)]"
    >
      <h2 className="font-mono text-[12px] font-normal tracking-[0.06em] text-fg uppercase">
        Selected work
      </h2>

      <div className="flex flex-col border-b border-rule">
        {PROJECTS.map((project, i) => (
          <WorkCard
            key={project.slug}
            index={String(i + 1).padStart(2, '0')}
            title={project.title}
            link={project.link}
            domain={getDomain(project.link)}
            image={project.image}
          />
        ))}
      </div>
    </section>
  )
}

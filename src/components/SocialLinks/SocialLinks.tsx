import React from 'react'

import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/icons'

const SOCIAL_LINKS = [
  { href: 'https://github.com/edgarespinoza7', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://www.linkedin.com/in/edgarespinozadev/', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://x.com/edgrafo', label: 'X', Icon: XIcon },
]

export function SocialLinks() {
  return (
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
  )
}

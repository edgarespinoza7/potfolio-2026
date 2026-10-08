import React from 'react'

import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/icons'
import { NetworkGraph } from '@/components/NetworkGraph/NetworkGraph'

import styles from './Hero.module.css'

const SOCIAL_LINKS = [
  { href: 'https://github.com/edgarespinoza7', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://www.linkedin.com/in/edgarespinozadev/', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://x.com/edgrafo', label: 'X', Icon: XIcon },
]

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.noise} aria-hidden="true" />
      <NetworkGraph className={styles.graph} />
      <div className={styles.fade} aria-hidden="true" />

      <header className={styles.meta}>
        <span className={styles.name}>Edgar Espinoza</span>
        <span className={styles.role}>Front-end engineer</span>
        <span className={styles.focus}>Data visualization · Web apps</span>
      </header>

      <section className={styles.body}>
        <h1 className={styles.headline}>
          Turning complexity into clarity through data, design, and code.
        </h1>

        <div className={styles.footer}>
          <p className={styles.bio}>
            Front-end software engineer at{' '}
            <a
              className={styles.inlineLink}
              href="https://vizzuality.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vizzuality
            </a>
            , building interactive data visualizations and high-performance web apps that transform complex data into clear, intuitive experiences.
          </p>

          <nav className={styles.social} aria-label="Social links">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                className={styles.socialLink}
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

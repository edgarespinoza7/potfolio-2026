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
        <span>Edgar Espinoza</span>
        <span>Front-end engineer</span>
      </header>

      <section className={styles.body}>
        <h1 className={styles.headline}>
          <span className={styles.headlineLine}>Connecting the dots.</span>{' '}
          <span className={`${styles.headlineLine} ${styles.headlineMuted}`}>
            Advancing sustainability.
          </span>
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
            . I build <span className={styles.highlight}>interactive data visualizations</span>,{' '}
            <span className={styles.highlight}>data stories</span>,{' '}
            <span className={styles.highlight}>Web GIS platforms</span>, and{' '}
            <span className={styles.highlight}>high-performance web apps</span> that transform
            complexity into clarity.
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

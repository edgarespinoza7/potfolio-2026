// Frontend-only project list for the "Selected work" section.
// Field names mirror the Payload `projects` collection (title, slug, link, image; list order = `order`)
// so this can later be swapped for `payload.find({ collection: 'projects', sort: 'order' })`.

export type Project = {
  title: string
  slug: string
  link: string
  /** Screenshot under /public/work/. width/height are the file's pixel size; the card keeps that ratio. */
  image?: ProjectImage
}

export type ProjectImage = { src: string; alt: string; width: number; height: number }

export const PROJECTS: Project[] = [
  {
    title: 'Forest Innovation Platform',
    slug: 'forest-innovation-platform',
    link: 'https://forestinnovationplatform.org/',
    image: {
      src: '/work/forest-innovation-platform.webp',
      width: 2000,
      height: 1013,
      alt: 'Forest Innovation Platform: US temperature map with climate charts and layer legend',
    },
  },
  {
    title: 'Forest Analytics for Carbon Tracking (FACT)',
    slug: 'fact',
    link: 'https://forestryanalytics.org/',
    image: {
      src: '/work/fact.webp',
      width: 2000,
      height: 1016,
      alt: 'FACT homepage: aerial forest landscape with the headline “Track Carbon. Grow Confidence.”',
    },
  },
]

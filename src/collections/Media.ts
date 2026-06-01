import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        withoutEnlargement: true,
      },
      {
        name: 'card',
        width: 800,
        height: 450,
        position: 'centre',
        withoutEnlargement: true,
      },
      {
        name: 'cover',
        width: 1280,
        height: 720,
        position: 'centre',
        withoutEnlargement: true,
      },
    ],
  },
}

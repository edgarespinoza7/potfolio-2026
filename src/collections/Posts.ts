import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { formatSlug } from '../utilities/formatSlug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', '_status'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'publishedDate',
      type: 'date',
      index: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Data Viz', value: 'data-viz' },
        { label: 'Geospatial', value: 'geospatial' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Career', value: 'career' },
        { label: 'Tutorial', value: 'tutorial' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show as featured post on blog index',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Estimated read time in minutes',
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      maxDepth: 1,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'meta',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

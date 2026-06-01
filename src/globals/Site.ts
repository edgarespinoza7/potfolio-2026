import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Site: GlobalConfig = {
  slug: 'site',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Edgar Espinoza',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Author photo used in bylines and About section',
      },
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'body', type: 'textarea' },
        { name: 'ctaPrimaryLabel', type: 'text' },
        { name: 'ctaSecondaryLabel', type: 'text' },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'body',
          type: 'richText',
          editor: lexicalEditor(),
        },
        {
          name: 'stack',
          type: 'array',
          admin: {
            description: 'Technology stack items shown in the About section',
          },
          fields: [
            { name: 'category', type: 'text', required: true },
            { name: 'name', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'body', type: 'textarea' },
        { name: 'email', type: 'email' },
        {
          name: 'cvUrl',
          type: 'text',
          admin: { description: 'Link to downloadable CV/resume' },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'Bluesky', value: 'bluesky' },
            { label: 'Medium', value: 'medium' },
            { label: 'Email', value: 'email' },
            { label: 'Twitter / X', value: 'twitter' },
          ],
        },
        { name: 'url', type: 'text', required: true },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'blog',
      type: 'group',
      admin: {
        description: 'Content for the /blog page hero section',
      },
      fields: [
        { name: 'pageTitle', type: 'text' },
        { name: 'pageSubtitle', type: 'textarea' },
      ],
    },
  ],
}

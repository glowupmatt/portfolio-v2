import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'name',         title: 'Full Name',    type: 'string' }),
    defineField({ name: 'tagline',      title: 'Tagline',      type: 'string',
      description: 'Shown in nav beside the logo, e.g. "FULL-STACK · DEV"' }),
    defineField({ name: 'location',     title: 'Location',     type: 'string',
      description: 'e.g. "BROOKLYN → REMOTE"' }),
    defineField({ name: 'isOpenToWork', title: 'Open to Work', type: 'boolean',
      initialValue: true }),
    defineField({ name: 'email',        title: 'Email',        type: 'string' }),
    defineField({ name: 'githubUrl',    title: 'GitHub URL',   type: 'url' }),
    defineField({ name: 'linkedInUrl',  title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'resume', title: 'Résumé (PDF)', type: 'file',
      options: { accept: '.pdf' },
      description: 'Upload your résumé PDF here. The download link will use the Sanity CDN URL.' }),
    defineField({
      name: 'editionLabel',
      title: 'Edition Label',
      type: 'string',
      description: 'Top-left label in hero + footer. e.g. "PORTFOLIO · v02 · EDITORIAL"',
    }),
    defineField({
      name: 'heroItalicLine',
      title: 'Hero Italic Line',
      type: 'string',
      description: 'First line of the hero headline, rendered in italic serif. e.g. "building"',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      rows: 2,
      description: 'Remaining lines of the hero headline in uppercase sans. One line per row. e.g. "FOR THE" on line 1, "WEB" on line 2.',
    }),
  ],
})

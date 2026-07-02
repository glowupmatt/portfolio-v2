import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order', type: 'number',
      description: 'Sort order on the page (lower = first)' }),
    defineField({ name: 'no', title: 'Number', type: 'string',
      description: 'Display number, e.g. "01"' }),
    defineField({ name: 'kind', title: 'Kind', type: 'string',
      description: 'e.g. "Full-Stack App" or "Side Project"' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'liveUrl', title: 'Live / More Info URL', type: 'url' }),
    defineField({ name: 'hasLiveSite', title: 'Has Live Site', type: 'boolean',
      description: 'On → shows "Live site →". Off → shows "More info →".',
      initialValue: false }),
    defineField({ name: 'codeUrl', title: 'Code / Breakdown URL', type: 'url' }),
    defineField({ name: 'hasBreakdownVideo', title: 'Has Breakdown Video', type: 'boolean',
      description: 'On → shows "Breakdown →". Off → shows "Code".',
      initialValue: false }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'kind', media: 'image' },
  },
})

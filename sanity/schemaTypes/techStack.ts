import { defineField, defineType } from 'sanity'

export const techStack = defineType({
  name: 'techStack',
  title: 'Tech Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Add or remove tools; order here = order on the page.',
    }),
  ],
})

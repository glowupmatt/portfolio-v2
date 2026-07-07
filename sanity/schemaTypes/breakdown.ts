import { defineField, defineType } from 'sanity'

export const breakdown = defineType({
  name: 'breakdown',
  title: 'Project Breakdown',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order', type: 'number',
      description: 'Sort order on the listing page (lower = first)' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'challenge', title: 'Challenge', type: 'text', rows: 2,
      description: 'One-line challenge statement shown on the listing card.' }),
    defineField({ name: 'role', title: 'Role', type: 'string',
      description: 'e.g. "Software Engineer" or "Frontend Developer, Designer"' }),
    defineField({
      name: 'tools',
      title: 'Tools & Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image',
      options: { hotspot: true } }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'role', media: 'heroImage' },
  },
})

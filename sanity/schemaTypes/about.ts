import { defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'introQuote',
      title: 'Intro Quote',
      type: 'text',
      rows: 3,
      description: 'Full italic pull-quote sentence. Include the accent phrase verbatim.',
    }),
    defineField({
      name: 'introAccentPhrase',
      title: 'Accent Phrase',
      type: 'string',
      description: 'The exact fragment inside the intro quote that renders in red.',
    }),
    defineField({ name: 'bioParagraph1', title: 'Bio Paragraph 1', type: 'text', rows: 4 }),
    defineField({ name: 'bioParagraph2', title: 'Bio Paragraph 2', type: 'text', rows: 4 }),
    defineField({
      name: 'skillAreas',
      title: 'Skill Areas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string',
              description: 'e.g. "frontend"' }),
            defineField({ name: 'sub', title: 'Sub-text', type: 'string',
              description: 'e.g. "react · next · tailwind"' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})

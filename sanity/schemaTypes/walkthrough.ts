import { defineField, defineType } from 'sanity'

export const walkthrough = defineType({
  name: 'walkthrough',
  title: 'Walkthrough',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order', type: 'number',
      description: 'Sort order on the page (lower = first)' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'youtubeEmbedUrl', title: 'YouTube Embed URL', type: 'url',
      description: 'Use the embed URL: https://www.youtube.com/embed/VIDEO_ID' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'youtubeEmbedUrl' },
  },
})

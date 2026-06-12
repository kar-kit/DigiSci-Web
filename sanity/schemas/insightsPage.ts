import { defineField, defineType } from 'sanity';

export const insightsPage = defineType({
  name: 'insightsPage',
  title: 'Insights Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero', type: 'object', title: 'Hero',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'body',    type: 'text',   title: 'Body', rows: 2 }),
      ],
    }),
    defineField({
      name: 'subscribe', type: 'object', title: 'Subscribe CTA',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'body',    type: 'text',   title: 'Body', rows: 2 }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Insights Page' }) },
});

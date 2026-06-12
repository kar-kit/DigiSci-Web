import { defineField, defineType } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title',   type: 'string', title: 'Title',   validation: r => r.required() }),
    defineField({ name: 'slug',    type: 'slug',   title: 'Slug',    options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'sector',  type: 'string', title: 'Sector',  description: 'e.g. Cell & Gene Therapy' }),
    defineField({ name: 'service', type: 'string', title: 'Service', description: 'e.g. AI Strategy' }),
    defineField({ name: 'client',  type: 'string', title: 'Client (anonymised)' }),
    defineField({ name: 'outcome', type: 'string', title: 'Outcome (one-line)' }),
    defineField({ name: 'context', type: 'text',   title: 'Context', rows: 4 }),
    defineField({
      name: 'challenge', type: 'object', title: 'Challenge',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'body',    type: 'text',   title: 'Body', rows: 4 }),
      ],
    }),
    defineField({
      name: 'approach', type: 'object', title: 'Approach',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'body',    type: 'text',   title: 'Body', rows: 4 }),
      ],
    }),
    defineField({
      name: 'impact', type: 'object', title: 'Impact',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'body',    type: 'text',   title: 'Body', rows: 4 }),
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'sector' } },
});

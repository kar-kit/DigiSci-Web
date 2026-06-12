import { defineField, defineType } from 'sanity';

export const industryPage = defineType({
  name: 'industryPage',
  title: 'Industry Page',
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
      name: 'cgt', type: 'object', title: 'Cell & Gene Therapy section',
      fields: [
        defineField({ name: 'eyebrow',       type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'heading',       type: 'string', title: 'Heading' }),
        defineField({ name: 'body',          type: 'text',   title: 'Body', rows: 3 }),
        defineField({ name: 'tags',          type: 'array',  title: 'Tags',         of: [{ type: 'string' }] }),
        defineField({ name: 'capabilities',  type: 'array',  title: 'Capabilities', of: [{ type: 'string' }] }),
      ],
    }),
    defineField({
      name: 'pharma', type: 'object', title: 'Pharmaceutical Ops section',
      fields: [
        defineField({ name: 'eyebrow',       type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'heading',       type: 'string', title: 'Heading' }),
        defineField({ name: 'body',          type: 'text',   title: 'Body', rows: 3 }),
        defineField({ name: 'tags',          type: 'array',  title: 'Tags',         of: [{ type: 'string' }] }),
        defineField({ name: 'capabilities',  type: 'array',  title: 'Capabilities', of: [{ type: 'string' }] }),
      ],
    }),
    defineField({
      name: 'aiRegulated', type: 'object', title: 'AI in Regulated Environments section',
      fields: [
        defineField({ name: 'eyebrow',       type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'heading',       type: 'string', title: 'Heading' }),
        defineField({ name: 'body',          type: 'text',   title: 'Body', rows: 3 }),
        defineField({ name: 'tags',          type: 'array',  title: 'Tags',         of: [{ type: 'string' }] }),
        defineField({ name: 'capabilities',  type: 'array',  title: 'Capabilities', of: [{ type: 'string' }] }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Industry Page' }) },
});

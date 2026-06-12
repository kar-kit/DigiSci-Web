import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero', type: 'object', title: 'Hero',
      fields: [
        defineField({ name: 'eyebrow',    type: 'string', title: 'Eyebrow tag' }),
        defineField({ name: 'heading',    type: 'string', title: 'Heading' }),
        defineField({ name: 'accentText', type: 'string', title: 'Heading accent (coloured)' }),
        defineField({ name: 'body',       type: 'text',   title: 'Body paragraph', rows: 3 }),
        defineField({
          name: 'stats', type: 'array', title: 'Panel stats',
          of: [{ type: 'object', fields: [
            defineField({ name: 'value', type: 'string', title: 'Value', description: 'e.g. "40"' }),
            defineField({ name: 'unit',  type: 'string', title: 'Unit',  description: 'e.g. "%" or "×"' }),
            defineField({ name: 'label', type: 'string', title: 'Label', description: 'e.g. "Cycle-time reduction"' }),
          ]}],
        }),
      ],
    }),
    defineField({
      name: 'industryContext', type: 'object', title: 'Industry Context',
      fields: [
        defineField({ name: 'heading',    type: 'string', title: 'Heading' }),
        defineField({ name: 'paragraphs', type: 'array', title: 'Paragraphs', of: [{ type: 'text' }] }),
        defineField({ name: 'pullQuote',  type: 'string', title: 'Pull quote' }),
        defineField({ name: 'accentText', type: 'string', title: 'Accent text in pull quote' }),
      ],
    }),
    defineField({
      name: 'credTags', type: 'array', title: 'Credibility tags',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'pillars', type: 'array', title: 'Value pillars',
      of: [{ type: 'object', fields: [
        defineField({ name: 'n',       type: 'string', title: 'Index (01, 02…)' }),
        defineField({ name: 'iconKey', type: 'string', title: 'Icon key', description: 'layers | cpu | shield-check | compass' }),
        defineField({ name: 'title',   type: 'string', title: 'Title' }),
        defineField({ name: 'body',    type: 'text',   title: 'Body', rows: 2 }),
      ]}],
    }),
    defineField({
      name: 'valueProposition', type: 'object', title: 'Value Proposition copy',
      fields: [
        defineField({ name: 'eyebrow',    type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'heading',    type: 'string', title: 'Heading' }),
        defineField({ name: 'body',       type: 'text',   title: 'Body', rows: 2 }),
        defineField({ name: 'pullQuote',  type: 'string', title: 'Pull quote' }),
      ],
    }),
    defineField({
      name: 'services', type: 'array', title: 'Services overview',
      of: [{ type: 'object', fields: [
        defineField({ name: 'iconKey', type: 'string', title: 'Icon key', description: 'route | cpu | database | trending-up' }),
        defineField({ name: 'title',   type: 'string', title: 'Title' }),
        defineField({ name: 'body',    type: 'text',   title: 'Body', rows: 2 }),
        defineField({ name: 'points',  type: 'array',  title: 'Bullet points', of: [{ type: 'string' }] }),
      ]}],
    }),
    defineField({
      name: 'cta', type: 'object', title: 'CTA band',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'body',    type: 'text',   title: 'Body', rows: 2 }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
});

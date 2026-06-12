import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero', type: 'object', title: 'Hero',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'body',    type: 'text',   title: 'Body', rows: 3 }),
      ],
    }),
    defineField({
      name: 'founder', type: 'object', title: 'Founder profile',
      fields: [
        defineField({ name: 'name',       type: 'string', title: 'Name' }),
        defineField({ name: 'title',      type: 'string', title: 'Title / role' }),
        defineField({ name: 'paragraphs', type: 'array',  title: 'Bio paragraphs', of: [{ type: 'text' }] }),
        defineField({ name: 'quote',      type: 'text',   title: 'Pull quote', rows: 2 }),
      ],
    }),
    defineField({
      name: 'careerThread', type: 'array', title: 'Career thread',
      of: [{ type: 'object', fields: [
        defineField({ name: 'n',     type: 'string', title: 'Index (01…)' }),
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'body',  type: 'text',   title: 'Body', rows: 2 }),
      ]}],
    }),
    defineField({
      name: 'mission', type: 'object', title: 'Mission',
      fields: [
        defineField({ name: 'eyebrow',    type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'heading',    type: 'string', title: 'Heading' }),
        defineField({ name: 'accentText', type: 'string', title: 'Accent text' }),
      ],
    }),
    defineField({
      name: 'howWeWork', type: 'array', title: 'How we work',
      of: [{ type: 'object', fields: [
        defineField({ name: 'iconKey', type: 'string', title: 'Icon key', description: 'user-check | users | globe' }),
        defineField({ name: 'label',   type: 'string', title: 'Label' }),
        defineField({ name: 'value',   type: 'string', title: 'Value' }),
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
  preview: { prepare: () => ({ title: 'About Page' }) },
});

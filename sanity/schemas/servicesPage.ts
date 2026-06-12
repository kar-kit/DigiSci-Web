import { defineField, defineType } from 'sanity';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
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
      name: 'services', type: 'array', title: 'Service tiers',
      of: [{ type: 'object', fields: [
        defineField({ name: 'n',           type: 'string', title: 'Index' }),
        defineField({ name: 'title',       type: 'string', title: 'Title' }),
        defineField({ name: 'duration',    type: 'string', title: 'Duration' }),
        defineField({ name: 'who',         type: 'text',   title: 'Who it\'s for', rows: 2 }),
        defineField({ name: 'deliverables', type: 'array', title: 'Deliverables', of: [{ type: 'string' }] }),
      ]}],
    }),
    defineField({
      name: 'offers', type: 'array', title: 'Productised offers',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title',       type: 'string', title: 'Title' }),
        defineField({ name: 'scope',       type: 'string', title: 'Scope tag' }),
        defineField({ name: 'description', type: 'text',   title: 'Description', rows: 2 }),
      ]}],
    }),
    defineField({
      name: 'processSteps', type: 'array', title: 'Process steps',
      of: [{ type: 'object', fields: [
        defineField({ name: 'n',     type: 'string', title: 'Index' }),
        defineField({ name: 'label', type: 'string', title: 'Label' }),
      ]}],
    }),
  ],
  preview: { prepare: () => ({ title: 'Services Page' }) },
});

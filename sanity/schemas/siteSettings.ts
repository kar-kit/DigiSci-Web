import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName',    type: 'string', title: 'Site name' }),
    defineField({ name: 'description', type: 'text',   title: 'Default meta description', rows: 2 }),
    defineField({
      name: 'nav', type: 'object', title: 'Navigation',
      fields: [
        defineField({
          name: 'links', type: 'array', title: 'Nav links',
          of: [{ type: 'object', fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'href',  type: 'string', title: 'Path (e.g. /services)' }),
          ]}],
        }),
      ],
    }),
    defineField({
      name: 'footer', type: 'object', title: 'Footer',
      fields: [
        defineField({ name: 'description', type: 'text',   title: 'Tagline / description', rows: 2 }),
        defineField({ name: 'legalName',   type: 'string', title: 'Legal entity name' }),
        defineField({ name: 'linkedin',    type: 'url',    title: 'LinkedIn URL' }),
        defineField({ name: 'email',       type: 'string', title: 'Contact email' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});

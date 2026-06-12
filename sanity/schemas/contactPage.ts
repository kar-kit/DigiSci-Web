import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
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
      name: 'contact', type: 'object', title: 'Contact details',
      fields: [
        defineField({ name: 'geography', type: 'string', title: 'Geography' }),
        defineField({ name: 'linkedin',  type: 'url',    title: 'LinkedIn URL' }),
        defineField({ name: 'email',     type: 'string', title: 'Email address' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
});

import { defineField, defineType } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title',    type: 'string',   title: 'Title',       validation: r => r.required() }),
    defineField({ name: 'slug',     type: 'slug',     title: 'Slug',        options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'tag',      type: 'string',   title: 'Tag',         validation: r => r.required() }),
    defineField({ name: 'date',     type: 'date',     title: 'Date',        validation: r => r.required() }),
    defineField({ name: 'readTime', type: 'string',   title: 'Read time',   description: 'e.g. "8 min"' }),
    defineField({ name: 'excerpt',  type: 'text',     title: 'Excerpt',     rows: 3 }),
    defineField({ name: 'lede',     type: 'text',     title: 'Lede',        rows: 3, description: 'Opening paragraph displayed before the body' }),
    defineField({ name: 'body',     type: 'blockContent', title: 'Body' }),
    defineField({ name: 'featured', type: 'boolean',  title: 'Featured article', description: 'Pinned to the top of the Insights index' }),
  ],
  orderings: [{ title: 'Date (newest first)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'tag' } },
});

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

const SINGLETONS = ['homePage', 'aboutPage', 'servicesPage', 'industryPage', 'insightsPage', 'contactPage', 'siteSettings'];

export default defineConfig({
  name: 'digisci',
  title: 'DigiSci Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site Settings').id('siteSettings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings')
            ),
            S.divider(),
            S.listItem().title('Home Page').id('homePage').child(
              S.document().schemaType('homePage').documentId('homePage')
            ),
            S.listItem().title('About Page').id('aboutPage').child(
              S.document().schemaType('aboutPage').documentId('aboutPage')
            ),
            S.listItem().title('Services Page').id('servicesPage').child(
              S.document().schemaType('servicesPage').documentId('servicesPage')
            ),
            S.listItem().title('Industry Page').id('industryPage').child(
              S.document().schemaType('industryPage').documentId('industryPage')
            ),
            S.listItem().title('Insights Page').id('insightsPage').child(
              S.document().schemaType('insightsPage').documentId('insightsPage')
            ),
            S.listItem().title('Contact Page').id('contactPage').child(
              S.document().schemaType('contactPage').documentId('contactPage')
            ),
            S.divider(),
            S.documentTypeListItem('article').title('Articles'),
            S.documentTypeListItem('caseStudy').title('Case Studies'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes.filter(t => !SINGLETONS.includes(t.name)) },
});

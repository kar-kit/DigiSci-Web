export const homePageQuery = `*[_type == "homePage"][0]`;
export const aboutPageQuery = `*[_type == "aboutPage"][0]`;
export const servicesPageQuery = `*[_type == "servicesPage"][0]`;
export const industryPageQuery = `*[_type == "industryPage"][0]`;
export const insightsPageQuery = `*[_type == "insightsPage"][0]`;
export const contactPageQuery = `*[_type == "contactPage"][0]`;
export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

export const allArticlesQuery = `
  *[_type == "article"] | order(date desc) {
    title, "slug": slug.current, tag, date, readTime, excerpt, featured
  }
`;

export const featuredArticleQuery = `
  *[_type == "article" && featured == true][0] {
    title, "slug": slug.current, tag, date, readTime, excerpt, lede
  }
`;

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    title, "slug": slug.current, tag, date, readTime, excerpt, lede, body
  }
`;

export const allArticleSlugsQuery = `*[_type == "article"].slug.current`;

export const allCaseStudiesQuery = `
  *[_type == "caseStudy"] | order(_createdAt asc) {
    title, "slug": slug.current, sector, service, client, outcome
  }
`;

export const allCaseStudiesCardQuery = `
  *[_type == "caseStudy"] | order(_createdAt asc) {
    title, "slug": slug.current, sector, service, client, outcome,
    "challenge": challenge.body, "approach": approach.body, "impact": impact.body
  }
`;

export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0]
`;

export const allCaseStudySlugsQuery = `*[_type == "caseStudy"].slug.current`;

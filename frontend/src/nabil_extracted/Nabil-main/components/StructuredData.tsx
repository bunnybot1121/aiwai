import React from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

/**
 * StructuredData Component
 * 
 * Renders JSON-LD structured data for SEO, AEO, and GEO optimization.
 * Schema.org markup helps search engines and AI crawlers understand content.
 */
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

/**
 * Pre-built schema generators for common use cases
 */

export function createOrganizationSchema(config: {
  name: string;
  url: string;
  logo: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialProfiles?: string[];
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    url: config.url,
    logo: config.logo,
    ...(config.description && { description: config.description }),
    ...(config.socialProfiles && config.socialProfiles.length > 0 && {
      sameAs: config.socialProfiles,
    }),
    ...(config.contactPhone && {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: config.contactPhone,
        contactType: 'customer service',
        ...(config.contactEmail && { email: config.contactEmail }),
      },
    }),
    ...(config.address && {
      address: {
        '@type': 'PostalAddress',
        ...(config.address.street && { streetAddress: config.address.street }),
        ...(config.address.city && { addressLocality: config.address.city }),
        ...(config.address.region && { addressRegion: config.address.region }),
        ...(config.address.postalCode && { postalCode: config.address.postalCode }),
        ...(config.address.country && { addressCountry: config.address.country }),
      },
    }),
  };
}

export function createPersonSchema(config: {
  name: string;
  url: string;
  image?: string;
  jobTitle?: string;
  description?: string;
  email?: string;
  socialProfiles?: string[];
  sameAs?: string[];
  knowsAbout?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.name,
    url: config.url,
    ...(config.image && { image: config.image }),
    ...(config.jobTitle && { jobTitle: config.jobTitle }),
    ...(config.description && { description: config.description }),
    ...(config.email && { email: config.email }),
    ...(config.socialProfiles && config.socialProfiles.length > 0 && {
      sameAs: config.socialProfiles,
    }),
    ...(config.knowsAbout && config.knowsAbout.length > 0 && {
      knowsAbout: config.knowsAbout,
    }),
  };
}

export function createWebSiteSchema(config: {
  name: string;
  url: string;
  description?: string;
  searchUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: config.url,
    ...(config.description && { description: config.description }),
    ...(config.searchUrl && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: config.searchUrl,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };
}

export function createWebPageSchema(config: {
  name: string;
  url: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.name,
    url: config.url,
    ...(config.description && { description: config.description }),
    ...(config.datePublished && { datePublished: config.datePublished }),
    ...(config.dateModified && { dateModified: config.dateModified }),
  };
}

export function createArticleSchema(config: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.headline,
    description: config.description,
    url: config.url,
    ...(config.image && { image: config.image }),
    datePublished: config.datePublished,
    ...(config.dateModified && { dateModified: config.dateModified }),
    author: {
      '@type': 'Person',
      name: config.author.name,
      ...(config.author.url && { url: config.author.url }),
    },
    publisher: {
      '@type': 'Organization',
      name: config.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: config.publisher.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.url,
    },
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createPortfolioSchema(config: {
  name: string;
  url: string;
  description: string;
  creator: {
    name: string;
    url?: string;
    jobTitle?: string;
    image?: string;
  };
  works?: Array<{
    name: string;
    url: string;
    description?: string;
    image?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': config.url,
    name: config.name,
    url: config.url,
    description: config.description,
    creator: {
      '@type': 'Person',
      name: config.creator.name,
      ...(config.creator.url && { url: config.creator.url }),
      ...(config.creator.jobTitle && { jobTitle: config.creator.jobTitle }),
      ...(config.creator.image && { image: config.creator.image }),
    },
    ...(config.works && config.works.length > 0 && {
      hasPart: config.works.map((work) => ({
        '@type': 'CreativeWork',
        name: work.name,
        url: work.url,
        ...(work.description && { description: work.description }),
        ...(work.image && { image: work.image }),
      })),
    }),
  };
}

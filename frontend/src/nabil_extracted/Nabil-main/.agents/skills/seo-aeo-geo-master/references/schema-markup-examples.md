# Schema Markup Examples - Biblioteca Completa

## Formato Recomendado: JSON-LD

JSON-LD é o formato preferido pelo Google por ser:
- Mais fácil de implementar
- Não interfere com HTML
- Mais fácil de manter
- Suportado por todas ferramentas

**Onde inserir:** Dentro do `<head>` ou no final do `<body>`

## Article Schema

### Blog Post Básico
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Complete Guide to SEO in 2025",
  "image": "https://example.com/images/seo-guide.jpg",
  "author": {
    "@type": "Person",
    "name": "John Doe",
    "url": "https://example.com/authors/john-doe"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Example SEO Company",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-10-23",
  "description": "Comprehensive SEO guide covering technical SEO, content optimization, and link building strategies for 2025."
}
```

### NewsArticle (para sites de notícias)
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Breaking: New Google Algorithm Update",
  "image": "https://example.com/news-image.jpg",
  "datePublished": "2025-10-23T14:30:00Z",
  "dateModified": "2025-10-23T15:45:00Z",
  "author": {
    "@type": "Person",
    "name": "Jane Reporter"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Tech News Daily",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "description": "Google announces major algorithm update affecting search rankings."
}
```

## FAQ Schema

### FAQ Page Completa
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO (Search Engine Optimization) is the practice of optimizing websites to rank higher in search engine results. It involves technical improvements, content creation, and link building to increase organic visibility."
      }
    },
    {
      "@type": "Question",
      "name": "How long does SEO take to work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO typically takes 3-6 months to show significant results. The timeline depends on competition, domain authority, content quality, and consistency of optimization efforts."
      }
    },
    {
      "@type": "Question",
      "name": "What are Core Web Vitals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Core Web Vitals are user experience metrics by Google: LCP (loading), INP (interactivity), and CLS (visual stability). They're ranking factors that measure real-world page performance."
      }
    }
  ]
}
```

## HowTo Schema

### Tutorial/Guide
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Optimize Images for SEO",
  "description": "Step-by-step guide to optimize images for better search engine performance",
  "image": "https://example.com/image-optimization.jpg",
  "totalTime": "PT20M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Image compression tool"
    },
    {
      "@type": "HowToTool",
      "name": "Photo editor"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Choose the Right Format",
      "text": "Select WebP for modern browsers, with JPEG fallback for compatibility.",
      "image": "https://example.com/step1.jpg",
      "url": "https://example.com/guide#step1"
    },
    {
      "@type": "HowToStep",
      "name": "Compress Images",
      "text": "Use compression tools to reduce file size by 50-80% without quality loss.",
      "image": "https://example.com/step2.jpg",
      "url": "https://example.com/guide#step2"
    },
    {
      "@type": "HowToStep",
      "name": "Add Descriptive Alt Text",
      "text": "Write clear, keyword-rich alt text that describes the image content.",
      "image": "https://example.com/step3.jpg",
      "url": "https://example.com/guide#step3"
    }
  ]
}
```

## Product Schema

### E-commerce Product
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "SEO Software Pro",
  "image": [
    "https://example.com/product-image-1.jpg",
    "https://example.com/product-image-2.jpg"
  ],
  "description": "Professional SEO software with keyword tracking, site audits, and competitor analysis.",
  "sku": "SEO-PRO-001",
  "mpn": "SEO001",
  "brand": {
    "@type": "Brand",
    "name": "Example SEO Tools"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/product/seo-software-pro",
    "priceCurrency": "USD",
    "price": "99.00",
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Example SEO Tools"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "324",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Sarah Miller"
      },
      "datePublished": "2025-09-15",
      "reviewBody": "Excellent SEO tool! Easy to use and provides detailed insights.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    }
  ]
}
```

## LocalBusiness Schema

### Business Local
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Example SEO Agency",
  "image": "https://example.com/office.jpg",
  "@id": "https://example.com",
  "url": "https://example.com",
  "telephone": "+1-555-123-4567",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94102",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://facebook.com/exampleagency",
    "https://twitter.com/exampleagency",
    "https://linkedin.com/company/exampleagency"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "156"
  }
}
```

## Person Schema

### Author/Expert Profile
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "John Doe",
  "url": "https://example.com/authors/john-doe",
  "image": "https://example.com/john-doe.jpg",
  "jobTitle": "Senior SEO Specialist",
  "worksFor": {
    "@type": "Organization",
    "name": "Example SEO Company"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Stanford University"
  },
  "knowsAbout": [
    "Search Engine Optimization",
    "Content Marketing",
    "Technical SEO",
    "Link Building"
  ],
  "sameAs": [
    "https://twitter.com/johndoe",
    "https://linkedin.com/in/johndoe",
    "https://github.com/johndoe"
  ]
}
```

## Organization Schema

### Company/Brand
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Example SEO Company",
  "alternateName": "Example SEO",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service",
    "email": "support@example.com",
    "availableLanguage": ["English", "Spanish"]
  },
  "sameAs": [
    "https://facebook.com/examplecompany",
    "https://twitter.com/examplecompany",
    "https://linkedin.com/company/examplecompany",
    "https://instagram.com/examplecompany"
  ],
  "foundingDate": "2015",
  "founders": [
    {
      "@type": "Person",
      "name": "Jane Smith"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94102",
    "addressCountry": "US"
  }
}
```

## Breadcrumb Schema

### Navigation Breadcrumbs
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://example.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "SEO Guides",
      "item": "https://example.com/blog/seo"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Complete SEO Guide 2025",
      "item": "https://example.com/blog/seo/complete-guide-2025"
    }
  ]
}
```

## Event Schema

### Webinar/Conference
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Advanced SEO Strategies Webinar",
  "description": "Learn cutting-edge SEO techniques from industry experts",
  "image": "https://example.com/webinar-banner.jpg",
  "startDate": "2025-11-15T14:00:00-08:00",
  "endDate": "2025-11-15T16:00:00-08:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "location": {
    "@type": "VirtualLocation",
    "url": "https://example.com/webinar-room"
  },
  "organizer": {
    "@type": "Organization",
    "name": "Example SEO Company",
    "url": "https://example.com"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/webinar-registration",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-10-01"
  },
  "performer": {
    "@type": "Person",
    "name": "Jane Expert"
  }
}
```

## Review Schema

### Product Review
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Product",
    "name": "SEO Tool X",
    "image": "https://example.com/product.jpg"
  },
  "author": {
    "@type": "Person",
    "name": "John Reviewer"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "datePublished": "2025-10-15",
  "reviewBody": "Excellent SEO tool with comprehensive features. User-friendly interface and accurate data. Highly recommended for agencies and in-house teams.",
  "publisher": {
    "@type": "Organization",
    "name": "Example Reviews"
  }
}
```

## Video Schema

### VideoObject
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "SEO Tutorial: Keyword Research",
  "description": "Learn how to conduct effective keyword research for SEO",
  "thumbnailUrl": "https://example.com/thumbnail.jpg",
  "uploadDate": "2025-10-20T08:00:00Z",
  "duration": "PT15M30S",
  "contentUrl": "https://example.com/videos/keyword-research.mp4",
  "embedUrl": "https://example.com/embed/keyword-research",
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/WatchAction",
    "userInteractionCount": "12450"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Example SEO Channel",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  }
}
```

## Course Schema

### Online Course
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Complete SEO Masterclass",
  "description": "Comprehensive SEO course covering technical SEO, content optimization, and link building",
  "provider": {
    "@type": "Organization",
    "name": "Example SEO Academy",
    "sameAs": "https://example.com"
  },
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "price": "299",
    "priceCurrency": "USD"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "courseWorkload": "PT40H"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "567"
  }
}
```

## Validation e Testing

### Ferramentas:
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/
3. **Google Search Console**: Enhancement reports

### Checklist de Validação:
- [ ] Sem erros críticos
- [ ] Warnings revisados
- [ ] Todas propriedades obrigatórias
- [ ] URLs corretas
- [ ] Datas no formato ISO 8601
- [ ] Images com URLs absolutos
- [ ] Tested em múltiplas páginas

### Common Errors:
- Missing required properties
- Invalid URL format
- Incorrect date format
- Missing image URLs
- Duplicate schemas

### Best Practices:
- Use schema mais específico possível
- Combine múltiplos schemas quando apropriado
- Mantenha dados consistentes
- Atualize schemas quando conteúdo muda
- Monitore no Search Console
- Teste após implementação

Este guia fornece exemplos prontos para uso de todos os principais tipos de schema markup. Adapte conforme necessidade do seu conteúdo.

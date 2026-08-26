# Schema.org JSON-LD Templates

## LocalBusiness

For local businesses (salons, restaurants, agencies, etc.):

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "description": "Brief description of the business",
  "url": "https://example.com",
  "telephone": "+41 44 123 45 67",
  "email": "info@example.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bahnhofstrasse 1",
    "addressLocality": "Zürich",
    "postalCode": "8001",
    "addressCountry": "CH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "47.3769",
    "longitude": "8.5417"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "image": "https://example.com/logo.png"
}
```

## Service

For service pages:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Webdesign",
  "description": "Professionelle Website-Erstellung für KMUs",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Local Studios"
  },
  "areaServed": {
    "@type": "City",
    "name": "Zürich"
  },
  "offers": {
    "@type": "Offer",
    "price": "100",
    "priceCurrency": "CHF",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "100",
      "priceCurrency": "CHF",
      "unitText": "Monat"
    }
  }
}
```

## FAQPage

For FAQ sections:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie viel kostet eine Website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unsere Websites starten ab CHF 100 pro Monat, inklusive Hosting und Support."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert die Erstellung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine Standard-Website ist in 2-4 Wochen fertig."
      }
    }
  ]
}
```

## Organization

For about/company pages:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "foundingDate": "2024",
  "founders": [
    {
      "@type": "Person",
      "name": "Founder Name"
    }
  ],
  "sameAs": [
    "https://linkedin.com/company/example",
    "https://instagram.com/example"
  ]
}
```

## BreadcrumbList

For breadcrumb navigation:

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
      "name": "Leistungen",
      "item": "https://example.com/leistungen"
    }
  ]
}
```

## Implementation in Next.js

Create a component:

```tsx
// components/structured-data.tsx
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

Use in pages:

```tsx
import { StructuredData } from '@/components/structured-data'

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    // ...
  }

  return (
    <>
      <StructuredData data={schema} />
      {/* Page content */}
    </>
  )
}
```

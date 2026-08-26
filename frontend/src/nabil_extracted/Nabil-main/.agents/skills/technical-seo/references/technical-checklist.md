# Technical SEO Checklist

## Files to Create/Configure

### 1. robots.txt

Location: `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Sitemap: https://domain.com/sitemap.xml
```

### 2. sitemap.xml

Location: `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'

const baseUrl = 'https://domain.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/leistungen',
    '/preise',
    '/kontakt',
    '/ueber-uns',
    '/impressum',
    '/datenschutz',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
```

### 3. Canonical URLs

In layout or page metadata:

```typescript
export const metadata = {
  alternates: {
    canonical: 'https://domain.com/page',
    languages: {
      'de': 'https://domain.com/de/page',
      'en': 'https://domain.com/en/page',
    },
  },
}
```

### 4. hreflang Tags

For bilingual sites (DE/EN):

```typescript
export const metadata = {
  alternates: {
    languages: {
      'de-CH': 'https://domain.com',
      'en': 'https://domain.com/en',
    },
  },
}
```

## Performance Targets (Core Web Vitals)

| Metric | Target | Tool |
|--------|--------|------|
| LCP (Largest Contentful Paint) | < 2.5s | PageSpeed Insights |
| FID (First Input Delay) | < 100ms | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | < 0.1 | PageSpeed Insights |
| PageSpeed Score | 95+ | PageSpeed Insights |

## Image Optimization

- Use Next.js `<Image>` component
- Provide alt text with keywords (where natural)
- Use WebP format
- Lazy load below-fold images

```tsx
import Image from 'next/image'

<Image
  src="/hero.webp"
  alt="Webdesign Agentur Zürich - Modernes Büro"
  width={1200}
  height={600}
  priority // for above-fold images
/>
```

## Open Graph Images

Location: `app/opengraph-image.tsx` or `public/og-image.png`

Recommended size: 1200x630px

```typescript
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Company Name'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div style={{ /* styles */ }}>
      Company Name
    </div>,
    { ...size }
  )
}
```

## Checklist Per Project

### Initial Setup
- [ ] robots.txt created
- [ ] sitemap.ts created
- [ ] Canonical URLs configured
- [ ] hreflang tags for DE/EN

### Per Page
- [ ] Meta title (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] H1 with primary keyword
- [ ] Schema.org structured data
- [ ] Open Graph tags
- [ ] Twitter card tags
- [ ] Image alt texts

### Performance
- [ ] PageSpeed score 95+
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Images optimized (WebP, lazy load)

### Verification
- [ ] Google Search Console connected
- [ ] Sitemap submitted
- [ ] No crawl errors
- [ ] Mobile-friendly test passed

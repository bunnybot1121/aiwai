# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Essential Commands
```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code (Next.js ESLint)
npm run lint
```

### Package Management
This project has lock files for both npm and pnpm. Use npm for consistency with the README.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 with OKLCH color space
- **UI Components**: shadcn/ui (New York style variant)
- **3D Graphics**: Three.js with React Three Fiber
- **Theme**: next-themes for dark/light mode
- **Font**: Geist (Google Fonts)
- **Deployment**: Vercel

### Project Structure

#### Core Directories
- **`app/`**: Next.js App Router pages and layouts
  - Uses file-based routing with Server Components by default
  - `layout.tsx` - Root layout with SEO metadata and structured data
  - `page.tsx` - Homepage with portfolio content (Client Component)
  - `gallery/page.tsx` - Project gallery page
  - `robots.ts` - Dynamic robots.txt generator
  - `sitemap.ts` - Dynamic sitemap.xml generator

- **`components/`**: React components
  - **SEOManager.tsx**: Centralized SEO configuration with siteConfig object
  - **StructuredData.tsx**: Schema.org JSON-LD generators for SEO/AEO/GEO
  - **theme-provider.tsx**: next-themes wrapper
  - **InfiniteGallery.tsx**: Project showcase component
  - **`ui/`**: Complete shadcn/ui component library (50+ components)

- **`hooks/`**: Custom React hooks
  - `use-mobile.ts` - Responsive breakpoint detection
  - `use-toast.ts` - Toast notification system

- **`lib/`**: Utility functions
  - `utils.ts` - Helper functions (likely cn() for className merging)

- **`middleware.ts`**: Edge middleware that runs before requests
  - Security headers (CSP, X-Frame-Options, etc.)
  - AI crawler detection and optimization
  - Cache control headers
  - Trailing slash redirects
  - Preload hints for AI crawlers

- **`scripts/`**: Build and utility scripts
  - `generate-sitemap.js` - Sitemap generation
  - `prerender.js` - Prerendering logic

### Key Architectural Patterns

#### SEO/AEO/GEO Optimization Strategy
This portfolio is heavily optimized for discoverability across traditional search engines AND AI platforms:

1. **Structured Data**: All pages include Schema.org JSON-LD markup
   - Person schema for portfolio owner
   - WebSite schema for site-wide data
   - Combined knowledge graph for AI crawler understanding
   - Use helpers from `StructuredData.tsx` for new pages

2. **Metadata Management**: Centralized in `SEOManager.tsx`
   - `siteConfig` object contains all site information (name, description, social links, keywords)
   - `generateDefaultMetadata()` for base metadata
   - `generatePageMetadata()` for page-specific overrides
   - Always update siteConfig when adding new social links or changing site info

3. **AI Crawler Optimization**:
   - Middleware detects AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
   - robots.ts explicitly allows all major AI crawlers
   - Security headers and cache control optimized for crawlers
   - See `isAICrawler()` function in middleware.ts for detection logic

#### Theme System
- Custom theme implemented with CSS variables using OKLCH color space
- Defined in `app/globals.css` with separate light/dark variants
- Accessed via Tailwind classes: `bg-background`, `text-foreground`, `text-muted-foreground`, etc.
- Manual theme toggle in `app/page.tsx` (not using ThemeProvider currently)

#### Component Organization
- **UI components** (components/ui/): Generic, reusable components from shadcn/ui
- **Feature components** (components/): App-specific components
- Import path alias: `@/` maps to root directory (configured in tsconfig.json and components.json)

#### Client vs Server Components
- Most UI is client-side (`"use client"` in page.tsx) for animations and interactivity
- Layout is Server Component for optimal metadata and SEO
- Use Server Components by default in app/ unless you need:
  - useState, useEffect, or other React hooks
  - Browser APIs
  - Event handlers (onClick, onChange, etc.)

### Important Configuration Notes

#### next.config.mjs
- **TypeScript errors ignored during builds** (`ignoreBuildErrors: true`)
- **ESLint errors ignored during builds** (`ignoreDuringBuilds: true`)
- **Images unoptimized** (`unoptimized: true`) - consider optimizing for production
- These settings are permissive for rapid development but should be reviewed before production

#### Path Aliases
Always use `@/` for imports:
```typescript
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/components/SEOManager"
import { cn } from "@/lib/utils"
```

#### Tailwind CSS
- Using Tailwind CSS 4 (new @import syntax in globals.css)
- Custom animations defined in @layer utilities
- Color system uses CSS custom properties, not traditional Tailwind config file
- To modify colors, edit CSS variables in globals.css, not a tailwind.config file

### Working with SEO Features

#### Adding New Pages
1. Create page in `app/[route]/page.tsx`
2. Export metadata using `generatePageMetadata()` from SEOManager
3. Add structured data using appropriate schema from StructuredData.tsx
4. Update `app/sitemap.ts` to include the new route
5. Optionally add breadcrumb data using `generateBreadcrumbData()`

#### Updating Site Information
- Edit `siteConfig` object in `components/SEOManager.tsx`
- Update social links in `siteConfig.socialLinks`
- Modify keywords in `siteConfig.keywords`
- Change base URL in both SEOManager.tsx and app/robots.ts

#### Managing AI Crawler Access
- Allow/block specific crawlers in `app/robots.ts`
- Commented examples show how to block CommonCrawl or ByteSpider
- Update `isAICrawler()` in middleware.ts when new AI crawlers emerge

### Deployment (Vercel)

#### Configuration (vercel.json)
- Security headers applied to all routes
- Aggressive caching for static assets (1 year)
- Short cache with stale-while-revalidate for HTML (1 hour cache, 24 hour stale)
- Redirects: `/home` → `/` (301 permanent)
- Region: `iad1` (US East)

#### Environment
- Framework auto-detected as Next.js
- No environment variables required for basic functionality
- TODO items in code reference adding profile image and verification codes

### Styling Conventions

#### Animation System
- Scroll-triggered animations using IntersectionObserver
- Custom `animate-fade-in-up` class defined in globals.css
- Sections fade in and slide up when scrolling into view
- Use `sectionsRef` pattern from page.tsx for new animated sections

#### Responsive Design
- Mobile-first approach
- Breakpoints: sm:, lg: primarily used
- Side navigation hidden on mobile (`hidden lg:block`)
- Grid layouts adjust: `lg:grid-cols-5`, `lg:col-span-3`

#### Typography
- Geist font family applied via CSS variable `--font-geist`
- Minimalist design with generous whitespace
- Size scale: text-sm (12px), text-lg (18px), text-xl (20px), text-4xl-7xl for headings
- Font weights: font-light (300) for headings, font-medium (500) for emphasis

### Testing & Quality

This project currently has:
- No test framework configured
- No test files present
- Linting via Next.js ESLint (run with `npm run lint`)
- Type checking via TypeScript compiler (run with `npx tsc --noEmit`)

When adding tests, consider:
- Vitest or Jest for unit tests
- Playwright or Cypress for E2E tests
- Test structured data with schema validators
- Test metadata generation functions

### Common Tasks

#### Adding a shadcn/ui Component
```bash
npx shadcn-ui@latest add [component-name]
```
Component will be added to `components/ui/` and auto-configured.

#### Customizing Personal Information
Edit the following locations:
1. `components/SEOManager.tsx` - siteConfig object (name, social links, description)
2. `app/page.tsx` - Portfolio content (intro, work experience, skills)
3. `app/layout.tsx` - Update Person schema if needed
4. `app/robots.ts` and `app/sitemap.ts` - Update base URL

#### Adding Three.js Components
- Three.js already installed via @react-three/fiber and @react-three/drei
- Create 3D components using `<Canvas>` from @react-three/fiber
- See InfiniteGallery.tsx for potential 3D integration examples

### Performance Considerations

- Edge middleware runs on all routes (see middleware.ts config.matcher)
- Static assets cached for 1 year (images, fonts, CSS, JS)
- HTML pages use stale-while-revalidate strategy
- IntersectionObserver used for lazy animation triggers
- Consider: Image optimization (currently disabled), font subsetting, code splitting

### Known TODOs in Codebase
- Add actual profile image (referenced in layout.tsx)
- Add actual OG image (referenced in SEOManager.tsx)
- Add verification codes for Google Search Console and Bing Webmaster Tools
- Consider enabling TypeScript/ESLint checks in builds (currently ignored)

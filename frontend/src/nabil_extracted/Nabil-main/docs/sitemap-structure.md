# Site Structure & Sitemap

**Visual representation of site architecture for SEO planning**

---

## 🗺️ Site Hierarchy

```
nabil-thange.vercel.app/
│
├── / (Landing/Intro)
│   └── Primary: Brand awareness
│   └── Keywords: Nabil Thange
│
├── /home (Main Portfolio Dashboard)
│   ├── Primary: full-stack developer Mumbai
│   ├── Secondary: AI developer, React developer
│   └── Links to: /about, /gallery, /contact, /blog
│
├── /about (About & Background)
│   ├── Primary: software engineer Mumbai
│   ├── Secondary: SCOE alumni, computer engineering
│   └── Links to: /home, /gallery, /contact
│
├── /gallery (Project Portfolio)
│   ├── Primary: developer portfolio Mumbai
│   ├── Secondary: AI projects, React projects, Three.js
│   └── Links to: /home, /blog/[related-posts]
│
├── /contact (Hire/Contact)
│   ├── Primary: hire freelance developer Mumbai
│   ├── Secondary: contact developer, project inquiry
│   └── Links to: /home, /about, /gallery
│
├── /blog (Blog Hub)
│   ├── Primary: web development blog India
│   ├── Secondary: React tutorials, AI development
│   ├── Links to: /home, /blog/[posts]
│   │
│   └── /blog/[slug] (Individual Posts)
│       ├── Keywords: Post-specific
│       └── Links to: /home, /about, /gallery, related posts
│
└── AI Discovery & Resources
    ├── /llms.txt (AI Content Guide)
    ├── /humans.txt (Team Credits)
    ├── /about.txt (Plain Text About)
    ├── /faq.json (Structured FAQ)
    ├── /.well-known/ai-policy.txt (AI Policy)
    ├── /sitemap.xml (XML Sitemap)
    ├── /robots.txt (Crawler Rules)
    └── /feed.xml (RSS Feed)
```

---

## 📄 Page Details

### Landing Page `/`

**Purpose:** First impression, brand introduction  
**Type:** Interactive intro with sound options  
**SEO Priority:** Low (not main entry point)  
**Keywords:** Nabil Thange (brand)  
**Content:** Name animation, enter buttons  
**Links:** → /home

---

### Homepage `/home`

**Purpose:** Main portfolio dashboard  
**Type:** Portfolio showcase  
**SEO Priority:** ⭐⭐⭐⭐⭐ (Highest)  
**Primary Keyword:** full-stack developer Mumbai  
**Secondary Keywords:**
- freelance developer Mumbai
- AI developer Mumbai
- React developer Mumbai
- software engineer Mumbai

**Content Sections:**
1. Hero - Introduction with primary keyword
2. Featured Projects - 3-5 top projects
3. Skills & Technologies - Tech stack showcase
4. Services - What I offer
5. Recent Blog Posts - Latest 3 posts
6. Call-to-Action - Contact/hire buttons

**Internal Links:**
- About → /about
- View All Projects → /gallery
- Read Blog → /blog
- Contact Me → /contact
- Individual projects → /gallery or /blog/[project-post]

**Structured Data:**
- Person schema
- WebSite schema
- BreadcrumbList schema

---

### About Page `/about`

**Purpose:** Background, education, expertise  
**Type:** Professional profile  
**SEO Priority:** ⭐⭐⭐⭐ (High)  
**Primary Keyword:** software engineer Mumbai  
**Secondary Keywords:**
- Saraswati College Engineering alumni
- computer engineering Mumbai
- AI specialist Mumbai
- full-stack developer background

**Content Sections:**
1. Introduction - Who I am
2. Education - SCOE, Computer Engineering
3. Professional Experience - Projects, achievements
4. Technical Skills - Detailed tech stack
5. Certifications - ISRO, Microsoft, Google
6. Interests & Approach - Vibe coding, creative tech
7. Location - Mumbai, India, remote worldwide

**Internal Links:**
- Portfolio → /gallery
- Blog → /blog
- Contact → /contact
- Home → /home

**Structured Data:**
- Person schema (detailed)
- EducationalOrganization schema (SCOE)
- BreadcrumbList schema

---

### Gallery Page `/gallery`

**Purpose:** Project showcase  
**Type:** Portfolio grid  
**SEO Priority:** ⭐⭐⭐⭐ (High)  
**Primary Keyword:** developer portfolio Mumbai  
**Secondary Keywords:**
- AI projects portfolio
- React projects showcase
- Three.js developer work
- web development portfolio India

**Content Sections:**
1. Portfolio Introduction
2. Featured Projects - Highlighted work
3. AI & Machine Learning Projects
4. Web Applications
5. 3D Interactive Experiences
6. Client Work (if applicable)
7. Open Source Contributions

**Per Project:**
- Project name and description
- Technologies used
- Key features
- Live demo link (if available)
- GitHub repository link
- Screenshots/images with alt text

**Internal Links:**
- Home → /home
- Related blog posts → /blog/[slug]
- Contact for similar work → /contact

**Structured Data:**
- CreativeWork schema (per project)
- ImageObject schema (project images)
- BreadcrumbList schema

---

### Contact Page `/contact`

**Purpose:** Lead generation, inquiries  
**Type:** Contact form + information  
**SEO Priority:** ⭐⭐⭐⭐ (High)  
**Primary Keyword:** hire freelance developer Mumbai  
**Secondary Keywords:**
- contact developer Mumbai
- freelance developer rates
- project inquiry
- get quote web development

**Content Sections:**
1. Contact Introduction - CTA
2. Services Offered - What I can help with
3. Contact Form - Name, email, message
4. Availability - Freelance, remote, worldwide
5. Location - Mumbai, India
6. Response Time - Expectations
7. Social Links - Alternative contact methods

**Internal Links:**
- View Portfolio → /gallery
- Learn More → /about
- Read Blog → /blog
- Home → /home

**Structured Data:**
- ContactPoint schema
- Person schema
- BreadcrumbList schema

---

### Blog Hub `/blog`

**Purpose:** Content marketing, SEO traffic  
**Type:** Blog listing page  
**SEO Priority:** ⭐⭐⭐⭐ (High)  
**Primary Keyword:** web development blog India  
**Secondary Keywords:**
- React tutorials
- Next.js tips
- AI development blog
- software engineering insights

**Content Sections:**
1. Blog Introduction
2. Featured Posts - Top 3 posts
3. Recent Posts - Latest posts grid
4. Categories - Web Dev, AI, Tutorials, Career
5. Tags - Technology tags
6. Search - Blog search functionality

**Internal Links:**
- Individual posts → /blog/[slug]
- Home → /home
- About Author → /about
- Portfolio → /gallery

**Structured Data:**
- Blog schema
- BreadcrumbList schema

---

### Blog Post `/blog/[slug]`

**Purpose:** Educational content, SEO traffic  
**Type:** Article/tutorial  
**SEO Priority:** ⭐⭐⭐⭐ (High, per post)  
**Keywords:** Post-specific (varies)

**Content Sections:**
1. Title (H1) with keyword
2. Meta information - Date, author, reading time
3. Summary/TL;DR - Answer-first format
4. Table of Contents
5. Main Content - Sections with H2/H3
6. Code Examples (if applicable)
7. Images/Diagrams with alt text
8. FAQ Section
9. Conclusion with CTA
10. Author Bio
11. Related Posts - 3-5 related articles
12. Comments/Discussion (future)

**Internal Links:**
- Home → /home
- Author → /about
- Related projects → /gallery
- Related posts → /blog/[other-slugs]
- External authoritative sources

**Structured Data:**
- Article schema
- Person schema (author)
- FAQPage schema (if FAQ section)
- BreadcrumbList schema

---

## 🤖 AI Discovery Files

### `/llms.txt`

**Purpose:** Guide AI models to important content  
**Format:** Markdown with links  
**Priority:** ⭐⭐⭐⭐ (High for AI)  
**Content:**
- Site description
- Key pages with descriptions
- Skills and expertise
- Services offered
- Education and location

**Update Frequency:** Quarterly or when major content added

---

### `/humans.txt`

**Purpose:** Credits and team information  
**Format:** Plain text  
**Priority:** ⭐⭐ (Low)  
**Content:**
- Team members
- Technologies used
- Tools and frameworks
- Last update date

**Update Frequency:** When tech stack changes

---

### `/about.txt`

**Purpose:** Plain text about information  
**Format:** Plain text  
**Priority:** ⭐⭐⭐ (Medium)  
**Content:**
- About Nabil
- Education
- Skills
- Services
- Contact info
- Keywords

**Update Frequency:** Quarterly

---

### `/faq.json`

**Purpose:** Structured FAQ data for AI  
**Format:** JSON-LD (FAQPage schema)  
**Priority:** ⭐⭐⭐⭐ (High for AI)  
**Content:**
- Common questions and answers
- Who, what, where, why, how questions
- Services, technologies, location

**Update Frequency:** When new common questions arise

---

### `/.well-known/ai-policy.txt`

**Purpose:** AI crawler policy and terms  
**Format:** Plain text  
**Priority:** ⭐⭐⭐ (Medium)  
**Content:**
- Allowed AI crawlers
- Usage terms
- Attribution preferences
- Contact information

**Update Frequency:** Annually or when policy changes

---

## 🔗 Internal Linking Strategy

### Hub Pages (Link to Everything)

**Homepage `/home`:**
- Links to: About, Gallery, Contact, Blog, Featured Posts
- Receives links from: All pages (logo/home link)

**Blog Hub `/blog`:**
- Links to: All blog posts, Home, About, Gallery
- Receives links from: Home, individual posts, footer

### Spoke Pages (Link to Hub + Related)

**About `/about`:**
- Links to: Home, Gallery, Contact, Blog
- Receives links from: Home, Blog posts (author bio), Footer

**Gallery `/gallery`:**
- Links to: Home, Related blog posts, Contact
- Receives links from: Home, Blog posts, About

**Contact `/contact`:**
- Links to: Home, About, Gallery, Blog
- Receives links from: Home, All pages (CTA buttons), Footer

**Blog Posts `/blog/[slug]`:**
- Links to: Home, Blog hub, Author (About), Related posts, Gallery (projects)
- Receives links from: Blog hub, Other posts, Home (featured)

---

## 📊 Page Priority Matrix

| Page | SEO Priority | Update Frequency | Content Type |
|------|--------------|------------------|--------------|
| `/home` | ⭐⭐⭐⭐⭐ | Weekly | Dynamic |
| `/about` | ⭐⭐⭐⭐ | Monthly | Static |
| `/gallery` | ⭐⭐⭐⭐ | Weekly | Dynamic |
| `/contact` | ⭐⭐⭐⭐ | Quarterly | Static |
| `/blog` | ⭐⭐⭐⭐ | Weekly | Dynamic |
| `/blog/[slug]` | ⭐⭐⭐⭐ | Per post | Static |
| `/` (landing) | ⭐⭐ | Rarely | Static |
| `/llms.txt` | ⭐⭐⭐⭐ | Quarterly | Static |
| `/faq.json` | ⭐⭐⭐⭐ | As needed | Static |

---

## 🎯 Content Gaps & Future Pages

### Planned Pages (Future)

1. **`/services`** - Detailed service offerings
   - Keywords: web development services Mumbai
   - Content: Service packages, pricing, process

2. **`/testimonials`** - Client testimonials
   - Keywords: developer reviews Mumbai
   - Content: Client feedback, case studies

3. **`/projects/[slug]`** - Individual project pages
   - Keywords: Project-specific
   - Content: Detailed project case studies

4. **`/blog/category/[category]`** - Category pages
   - Keywords: Category-specific
   - Content: Posts by category

5. **`/blog/tag/[tag]`** - Tag pages
   - Keywords: Tag-specific
   - Content: Posts by tag

6. **`/resources`** - Free resources/tools
   - Keywords: developer resources, free tools
   - Content: Downloadable resources, tools

---

## 📈 Sitemap Priorities

**XML Sitemap Priority Values:**

| Page Type | Priority | Change Frequency |
|-----------|----------|------------------|
| Homepage | 1.0 | Weekly |
| About | 0.9 | Monthly |
| Gallery | 0.9 | Weekly |
| Contact | 0.8 | Monthly |
| Blog Hub | 0.8 | Weekly |
| Blog Posts | 0.7 | Monthly |
| AI Files | 0.7-0.9 | Monthly |
| Landing | 1.0 | Weekly |

---

## 🔍 Crawl Budget Optimization

### High Priority (Crawl Frequently)

- `/home` - Main entry point
- `/blog` - New content hub
- `/blog/[new-posts]` - Fresh content
- `/gallery` - Updated projects
- `/sitemap.xml` - Sitemap updates

### Medium Priority (Crawl Regularly)

- `/about` - Stable content
- `/contact` - Stable content
- `/llms.txt` - AI discovery
- `/faq.json` - Structured data

### Low Priority (Crawl Occasionally)

- `/` - Landing page
- `/humans.txt` - Credits
- `/about.txt` - Plain text
- `/.well-known/ai-policy.txt` - Policy

---

**Last Updated:** February 25, 2026  
**Review Frequency:** Monthly  
**Maintained By:** Nabil Thange

# SEO/GEO Series — Chapter Content Briefs
### What must be inside each post (structure only, no content)



Viewed plan.md:1-20

Here is the quick guide to publishing new blogs under the refactored system:

### 1. Create a Markdown File
Create a new file in the `/content` folder: `content/your-slug-here.md`

### 2. Add Metadata Frontmatter
Add this block at the very top of your file:
```yaml
---
title: "Your Post Title"
excerpt: "A short, SEO-optimized summary of your post."
date: "Feb 2026"
readTime: "10 min"
tags: ["SEO", "AEO", "Tech"]
slug: "your-slug-here"
---
```

### 3. Write Your Content
Write your article using standard Markdown below the metadata block.

### 4. Build or Run
Start your dev server or trigger a build. The pipeline compiles the markdown automatically:
```bash
pnpm dev
# or
pnpm build
```
---
Series Progress Tracker

📖 You are reading Chapter X of 27

← Previous Chapter · Next Chapter →

In this series: [list all 27, linked when live, "Coming Soon" when not]

## Universal Template (applies to every chapter, incl. Ch0)

Every post follows this skeleton:

```
1. Title + target keyword in H1
2. Intro (2-3 lines): problem/question + "Chapter X of 31" line
3. [Chapter-specific H2 sections — see table below]
4. "Common Mistakes" callout box
5. "Key Takeaways" bullet list (3-5 bullets)
6. Practical exercise / action step (1 sentence)
7. Series nav footer: ← Prev · Next → · Full Series link
8. "In This Series" mini-list (3 nearest chapters, linked)
```

Only deviations from this template are noted per chapter below.

---

## Part 0 — Lead Magnet

| Ch | Slug / Keyword | Required H2 Sections | Must-Include Elements |
|---|---|---|---|
| **0** | `/seo-prompts-2026` — "SEO prompts 2026" | Content prompts · Technical prompts · AEO prompts · GEO prompts · AI crawler verification prompts · Analytics prompts | 50+ copy-paste prompt boxes, each tagged with linked chapter #; downloadable PDF opt-in; no "mistakes" box (replace with "How to use these prompts" note) |

---

## Part 1 — Foundations

| Ch | Slug / Keyword | Required H2 Sections | Must-Include Elements |
|---|---|---|---|
| **1** | `/how-search-works-2026` | Google vs Bing vs AI Search · Perplexity AI: Research-oriented search · AI Overviews explained · ChatGPT/Perplexity as search · The Great Decoupling: AI Overviews vs CTR · Why search is fragmenting, not dying | Comparison table (Google/Bing/ChatGPT/Perplexity); Stat: AI Overviews in 85%+ searches, -30% CTR impact |
| **2** | `/seo-fundamentals` | What is SEO · On-page · Off-page · Technical · Local · Entity · Semantic | 1 diagram mapping all 6 types |
| **3** | `/searcher-intent-seo` | Why mechanical SEO writing died · Intent-first mindset · Content-Answer Fit: Writing like AI responds · Zero-Click Intent vs Click-Through Intent · Worked example (searcher persona breakdown) | Before/after example: keyword-stuffed vs intent-first paragraph; Stat: Content-Answer Fit = 55% citation likelihood |
| **4** | `/keyword-research-2026` | Search intent types (info/commercial/transactional/navigational) · Tool walkthroughs (Planner, Ahrefs, Semrush, LowFruits, AlsoAsked) · Keyword difficulty filtering (≤30) · Search volume filtering (≥100) · Question-based keywords · Adjacent/funnel keywords · Competitor keyword analysis | Tool comparison table; SEMrush filtering walkthrough (KD ≤30, Volume ≥100, Intent filter); Stat: Cost-per-click sorting reveals money keywords |

---

## Part 2 — On-Site: Content

| Ch | Slug / Keyword | Required H2 Sections | Must-Include Elements |
|---|---|---|---|
| **5** | `/eeat-google` | What EEAT stands for · Helpful Content signals · E-E-A-T for AI Overviews · YMYL Content Requirements · Why "writing for algorithms" backfires | Real EEAT-passing page example; GEO Methods: Cite Sources (+40%), Add Statistics (+37%), Quotations (+30%), Authoritative Tone (+25%) |
| **5.5** | `/on-page-seo-checklist` | Primary keyword in first 100 words · Meta title & description optimization · H1/H2/H3 hierarchy (exactly 1 H1) · Internal linking strategy (3-5 links) · External linking strategy (2-3 authoritative links) · Image alt text · Question integration (4-8 questions per post) · Keyword density balance · 80+ point on-page SEO checklist | Copy-paste 80+ point checklist; Meta title/description examples with character limits; Internal/external link ratio; Visual: Invisible meta tags in developer tools; Balance: SEO optimization WITHOUT killing readability |
| **6** | `/topical-authority-clusters` | Pillar pages explained · Cluster architecture · Internal linking as a system · Keyword clustering strategy (root + secondary/tertiary keywords) · Multi-keyword optimization per page | Visual cluster map (this series as the example); Keyword cluster example (How to unclog drain → unclog kitchen sink, unclog bathroom sink, slow drain, home remedy clogged drain) |
| **7** | `/ai-writing-for-seo` | Feeding AI your own research first · Voice & tone extraction from your content · Creating reference documents (humor, stats, stories, opinions) · Prompting for execution, not strategy · AI Writing Red Flags to Avoid · Human Editing Checklist for AI Content · Before/after AI prompt examples · Maintaining personality while optimizing for SEO | 2 full prompt examples (bad vs good); Red flags: staccato fragments, bumper-stickers, three-beat reveals; Voice extraction method (LinkedIn posts, transcripts, emails); Stat: Content must be enjoyable to read = higher dwell time = better rankings |
| **8** | `/programmatic-seo` | What is programmatic SEO · The Zipper Method (Service × Location) · Template strategies · When to use programmatic SEO · Automation tools · CSV keyword imports · Avoiding thin content penalties · Publishing cadence strategy | Template example; Zipper example (Emergency Plumber × [Vancouver, Toronto, Montreal, Edmonton]); Warning: Don't dump 1000+ pages at once; Gradual publishing: Day 1 (1 post), Day 2 (1 post), Day 3 (2 posts), Day 5 (3 posts) |
| **9** | `/answer-first-writing` | FAQ structuring · Direct-answer paragraph formula · When to use lists vs prose · Competitive content analysis (analyze top 3 ranking pages) · Stealing what works (avg word count, H2 count, image count) · Balancing SEO optimization with readability | 1 formula template box: [Question Header] → [Direct answer 40-60 words] → [Detailed explanation] → [Supporting data] → [Related questions]; Top 3 analysis method: Find top 3 non-Reddit results → analyze structure, length, keywords → take average metrics → build better version |

---

## Part 3 — On-Site: Technical

| Ch | Slug / Keyword | Required H2 Sections | Must-Include Elements |
|---|---|---|---|
| **10** | `/technical-seo-crawling-indexing` | Crawlability · Indexability · Crawl budget optimization · robots.txt basics · Sitemap · Static Site Generation (SSG) vs Server-Side Rendering (SSR) vs Client-Side Rendering (CSR) · Why SSG matters for SEO (instant page load for crawlers) · Pizza analogy explanation | Sample robots.txt + sitemap snippet; SSG/SSR/CSR comparison table; Pizza analogy: SSG = pizza ready, SSR = cook on order, CSR = you make it yourself; Critical: Google needs instant access to complete pages |
| **11** | `/url-structure-canonicalization` | URL best practices · Canonical tags · Duplicate content strategy · Redirect strategy (301 vs 302) · Error pages (404/500) handling · Pagination SEO | URL structure examples |
| **12** | `/core-web-vitals-2026` | LCP/INP/CLS explained · Mobile-First Indexing · How to measure with Google Lighthouse · Common fixes · Lighthouse optimization workflow · Performance scoring (aim for 100/100/100/100) · Image optimization · JavaScript optimization | Before/after PageSpeed screenshot; Note: INP replaced FID in 2024; Google Lighthouse tutorial (Chrome DevTools → Lighthouse → Analyze); Iterative fixing: Run report → Copy issues → Paste to Claude Code → Fix → Re-test |
| **13** | `/ai-crawler-javascript` | Why AI crawlers skip JS-rendered content · Server-Side Rendering vs Client-Side for AI · Dynamic rendering for AI bots · JavaScript SEO frameworks (SSR/SSG/ISR) · How to test | Step-by-step "can ChatGPT read my page" test |
| **14** | `/ai-crawler-robots-txt` | GPTBot/ClaudeBot/PerplexityBot/Google-Extended rules · Why blocking hurts visibility · Server log verification | Copy-paste robots.txt block for AI bots; Market share: GPTBot (30%), Meta-ExternalAgent (19%) |
| **15** | `/hreflang-international-seo` | Hreflang setup · Common mistakes · Multilingual canonical strategy · Locale URL structures · International sitemaps · Locale content quality | Copy-paste hreflang examples |
| **16** | `/structured-data-essentials` | Organization · Article · Person · FAQ · Breadcrumb schema | JSON-LD code block per type |
| **17** | `/ecommerce-rich-results-schema` | Product · Review · LocalBusiness · Event · HowTo schema | JSON-LD code block per type |

---

## Part 4 — Answer & AI Search Optimization

| Ch | Slug / Keyword | Required H2 Sections | Must-Include Elements |
|---|---|---|---|
| **18** | `/answer-engine-optimization` | Featured snippets · AI Overviews · Voice search · Direct answers · The Inverted Pyramid Content Structure · Zero-Click SEO: When Visibility ≠ Traffic | Snippet-winning content example; Stat: Zero-click with AI Overviews = -30% CTR |
| **19** | `/geo-llm-discovery` | What GEO is · Retrieval basics · Mention frequency · Brand signals | 1 retrieval-flow diagram; Stat: Crawl-to-Refer Ratio (Claude) = 38,065:1 |
| **20** | `/entity-seo-knowledge-graph` | What is an entity · Knowledge Graph · Wikidata · SameAs markup · Author/Org pages | Sample Wikidata entry walkthrough; Stat: Wikipedia = 7.8% of ChatGPT citations; Authoritative citations = +132% visibility |
| **21** | `/llms-txt` | What it does (and doesn't) · How to build one · Honest 2026 status: ~1,000 sites adoption, no official platform support · Alternative: Focus on E-E-A-T instead · When it's worth the effort anyway | Sample llms.txt file |
| **22** | `/chatgpt-seo` | ChatGPT vs Perplexity vs Gemini vs Claude vs Copilot — differences in surfacing/citing · Content-Answer Fit Framework · Domain Authority's Role in AI Citations | Platform comparison table: Index source, Key factor, Unique signal; Stat: Domain Authority = 40% weight for ChatGPT |
| **23** | `/video-seo-youtube` | YouTube ranking factors · Video schema markup · Transcriptions for SEO · Video snippets · Video content for AI Overviews | Video schema JSON-LD example |

---

## Part 5 — Off-Site & Authority

| Ch | Slug / Keyword | Required H2 Sections | Must-Include Elements |
|---|---|---|---|
| **24** | `/reddit-forum-seo` | Why forum content ranks · Reddit SEO strategies · Quora optimization · Community building for citations | Stat: Reddit = 1.8% of ChatGPT citations, 3rd most visible site on Google (Aug 2025) |
| **25** | `/backlinks-2026` | Do links still matter · Quality vs quantity · Broken link building strategy · Guest posting (write for us) · HARO alternatives (Help a Reporter Out) · Link velocity · Natural links · Toxic backlink identification & disavow · White-hat vs black-hat link building · PBN dangers (Private Blog Networks) · Hero journalism/expert quotes | 1 outreach email template; Stat: Branded searches = 44% of all Google queries; Warning: $5 backlink services = instant death; 4 legit strategies: (1) Broken backlink swapping, (2) Guest posting, (3) HARO/expert quotes, (4) Paid quality backlinks (Forbes, TechCrunch style); PBN = link farms = Google blacklist |
| **26** | `/author-authority-seo` | LinkedIn publishing · Wikidata presence · Byline consistency · Unlinked brand mentions | Author bio schema example |
| **27** | `/topical-authority-strategy` | Becoming the authority in one niche · Internal linking for topical authority · Content velocity: Publishing frequency matters · Why a 36-part series beats one giant post | This-series-as-case-study callout |

---

## Part 6 — Measurement & What's Next

| Ch | Slug / Keyword | Required H2 Sections | Must-Include Elements |
|---|---|---|---|
| **27.5** | `/vercel-github-deployment` | Why deployment matters for SEO · GitHub repository setup · Vercel deployment (free) · Custom domain connection · Environment variables (.env) · Continuous deployment workflow · Alternative hosting (Netlify, Cloudflare Pages) | Step-by-step GitHub → Vercel deployment; Screenshot walkthrough; Framework preset selection (Next.js); Domain connection tutorial; Warning: localhost ≠ live site for Google |
| **28** | `/google-search-console-guide` | Verification · Performance · Coverage · AI Overview Performance Tracking · Indexing · Manual Actions · URL Inspection · Interpreting coverage reports · Submitting sitemaps · Request indexing (fast-track new pages) · Daily indexing limits | Real screenshots (each section); Note: GSC now shows AI Overview impressions/clicks; Pro tip: Request indexing for new pages = indexed in 1 day vs weeks/months; Limit: ~10 indexing requests per day |
| **29** | `/bing-webmaster-tools` | Import from GSC · IndexNow tie-in · Crawl Control · Keyword & Backlink reports · Why Bing matters now (Copilot/ChatGPT browsing) | Screenshot of setup flow |
| **30** | `/indexnow` | What it is · Why Bing/Copilot favor it · Plugin options · API basics | Code snippet for API call |
| **31** | `/google-analytics-4-guide` | Events · Conversions · Traffic sources · User journey · Engagement | GA4 dashboard screenshot |
| **31.5** | `/landing-page-conversion-optimization` | SEO traffic ≠ revenue (the funnel) · Conversion Rate Optimization (CRO) basics · A/B testing landing pages · Google Ads testing strategy · Finding your winning formula · Service page replication · The 20% conversion case study | Business funnel diagram: Traffic → Landing Page → Lead → Customer; Real example: tested 5-10 landing pages via Google Ads → found 20% conversion rate winner → replicated across all service pages; Formula: Max traffic (SEO) × Max conversion (CRO) = Max revenue |
| **32** | `/ai-citation-tracking` | Classic metrics (impressions/clicks/CTR/rankings) · AI citation tools (Profound, Otterly, Goodie, GenRank, OmniSEO) · Manual DIY tracking method · Setting up AI citation alerts · Manual prompt-audit method | Manual audit checklist |
| **33** | `/seo-portfolio-case-study` | Timeline · Traffic · Rankings · AI mentions · Mistakes · Lessons | Real before/after traffic graph |
| **34** | `/seo-tools-2026` | SEO tools · AI Visibility Tracking Tools · AI tools · Analytics tools · Technical tools · Keyword tools · Free vs paid tool decision framework | Categorized tool table w/ pricing tier |
| **35** | `/beyond-google-seo` | Why Google traffic can vanish overnight · YouTube/Reddit/Quora/Pinterest SEO transfer · Brave Search optimization (for Claude AI) · LinkedIn & GitHub for Copilot SEO · Diversification framework | 1 personal example of channel diversification |
| **36** | `/future-of-search` | AI Mode · AI crawlers · Agentic search · Personalization · Multimodal search · The Google Algorithm Black Box (200+ signals) · Why content quality wins · Reverse engineering Google's incentive (serve quality → users return → more ads → more revenue) · Dwell time, bounce rate, scroll depth matter | Closing "series recap" linking to all 39; Stat: ChatGPT Search 10M+ queries/day, GPTBot 5%→30% growth; The Meta Truth: Nobody knows exact algorithm, but quality content = longer dwell time = positive signals = better rankings; SEO Black Box: 200+ rumored signals, but focus on fundamentals |

---

## Quick Reference: Elements That Must Never Repeat
- **Schema mechanics** → only in Ch16/Ch17 (others link to it)
- **AI crawler bot names** → only in Ch13/Ch14 (others reference, don't re-list)
- **Entity/Wikidata setup steps** → only in Ch20 (Ch26 references, doesn't repeat)

---

## Series Summary
- **Total chapters**: 39 (+ Ch0 lead magnet = 40 pieces)
- **New chapters added**: 
  - Reddit/Forum SEO
  - Programmatic SEO
  - Hreflang/International
  - Video SEO/YouTube
  - On-Page SEO Checklist (Ch5.5) — 80+ optimization points
  - Vercel/GitHub Deployment (Ch27.5) — practical deployment guide
  - Landing Page CRO (Ch31.5) — conversion optimization
- **Chapters split**: Technical SEO Basics (→ 2), Structured Data (→ 2)
- **Analytics chapters moved**: Ch28-31 (GSC, Bing, IndexNow, GA4) moved from Part 3 to Part 6
- **Major enhancements from video**:
  - SSG/SSR/CSR explanation with pizza analogy (Ch10)
  - Keyword filtering strategy: KD ≤30, Volume ≥100 (Ch4)
  - Keyword clustering methodology (Ch6)
  - Voice/tone extraction for AI writing (Ch7)
  - The Zipper Method for programmatic SEO (Ch8)
  - Top 3 competitor analysis method (Ch9)
  - Google Lighthouse optimization workflow (Ch12)
  - 4 legit backlink strategies + PBN warnings (Ch25)
  - GSC request indexing fast-track (Ch28)
  - The SEO black box explanation & quality focus (Ch36)
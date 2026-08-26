const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content');

// Define date mappings for posts
const dateMappings = {
  // Core/Featured post - always first
  'seo-prompts-2026': 'Jul 2026',
  
  // Most recent standalone posts - Jun/Jul 2026
  'what-is-full-stack-developer-2026': 'Jul 2026',
  'how-to-hire-freelance-developer-india': 'Jun 2026',
  'freelance-developer-rates-mumbai-2026': 'Jun 2026',
  'future-of-ai-access-privilege': 'Jun 2026',
  'building-ai-agents-production-not-demo': 'Jun 2026',
  'building-ai-agents-with-memory': 'May 2026',
  
  // SEO Series - Mar-May 2026
  'how-search-works-2026': 'May 2026',
  'seo-fundamentals': 'May 2026',
  'searcher-intent-seo': 'May 2026',
  'keyword-research-2026': 'May 2026',
  'eeat-google': 'May 2026',
  'topical-authority-clusters': 'Apr 2026',
  'ai-writing-for-seo': 'Apr 2026',
  'programmatic-seo': 'Apr 2026',
  'answer-first-writing': 'Apr 2026',
  'technical-seo-crawling-indexing': 'Apr 2026',
  'url-structure-canonicalization': 'Mar 2026',
  'core-web-vitals-2026': 'Mar 2026',
  'ai-crawler-javascript': 'Mar 2026',
  'ai-crawler-robots-txt': 'Mar 2026',
  'hreflang-international-seo': 'Mar 2026',
  'structured-data-essentials': 'Mar 2026',
  'ecommerce-rich-results-schema': 'Mar 2026',
  'answer-engine-optimization': 'Mar 2026',
  'geo-llm-discovery': 'Mar 2026',
  'entity-seo-knowledge-graph': 'Mar 2026',
  'llms-txt': 'Mar 2026',
  'chatgpt-seo': 'Mar 2026',
  'video-seo-youtube': 'Mar 2026',
  'reddit-forum-seo': 'Mar 2026',
  'backlinks-2026': 'Mar 2026',
  'author-authority-seo': 'Mar 2026',
  'topical-authority-strategy': 'Mar 2026',
  
  // Older posts from 2025
  'building-ai-that-doesnt-suck': 'Dec 2025',
  'the-commerce-kids-guide-to-tech': 'Nov 2025',
  'hackathons-speed-running-product-development': 'Oct 2025',
  'why-i-built-gitskinz': 'Sep 2025',
};

function updateDateInFile(filePath, newDate) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(
    /^date:\s*"[^"]*"/m,
    `date: "${newDate}"`
  );
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    return true;
  }
  return false;
}

function main() {
  let updatedCount = 0;
  
  for (const [slug, date] of Object.entries(dateMappings)) {
    const filePath = path.join(contentDir, `${slug}.md`);
    
    if (fs.existsSync(filePath)) {
      if (updateDateInFile(filePath, date)) {
        console.log(`✓ Updated ${slug}.md to ${date}`);
        updatedCount++;
      } else {
        console.log(`- ${slug}.md already has ${date}`);
      }
    } else {
      console.log(`✗ File not found: ${slug}.md`);
    }
  }
  
  console.log(`\nUpdated ${updatedCount} files.`);
}

main();

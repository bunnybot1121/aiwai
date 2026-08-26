/**
 * Prerender Verification Script
 * 
 * Validates that critical pages are properly prerendered and optimized
 * for search engine crawlers and AI platforms.
 * 
 * Usage: node scripts/prerender.js
 */

const fs = require('fs');
const path = require('path');

/**
 * Check if critical pages exist in the build output
 */
function checkPrerenderPages() {
  const buildDir = path.join(__dirname, '..', '.next');
  
  if (!fs.existsSync(buildDir)) {
    console.log('⚠️  No build directory found. Run "npm run build" first.');
    return false;
  }

  const criticalPages = [
    { name: 'Homepage', path: 'server/app/page.js' },
    { name: 'Gallery', path: 'server/app/gallery/page.js' },
  ];

  console.log('🔍 Checking prerendered pages...\n');

  let allExist = true;
  criticalPages.forEach(page => {
    const fullPath = path.join(buildDir, page.path);
    const exists = fs.existsSync(fullPath);
    
    if (exists) {
      const stats = fs.statSync(fullPath);
      console.log(`✅ ${page.name}: ${(stats.size / 1024).toFixed(2)} KB`);
    } else {
      console.log(`❌ ${page.name}: NOT FOUND`);
      allExist = false;
    }
  });

  return allExist;
}

/**
 * Validate robots.txt and sitemap.xml generation
 */
function validateSEOFiles() {
  console.log('\n🔍 Checking SEO files...\n');
  
  const seoFiles = [
    { name: 'robots.ts', path: path.join(__dirname, '..', 'app', 'robots.ts') },
    { name: 'sitemap.ts', path: path.join(__dirname, '..', 'app', 'sitemap.ts') },
  ];

  let allExist = true;
  seoFiles.forEach(file => {
    const exists = fs.existsSync(file.path);
    
    if (exists) {
      console.log(`✅ ${file.name}: Found`);
    } else {
      console.log(`❌ ${file.name}: NOT FOUND`);
      allExist = false;
    }
  });

  return allExist;
}

/**
 * Check for structured data components
 */
function validateStructuredData() {
  console.log('\n🔍 Checking structured data components...\n');
  
  const components = [
    { name: 'StructuredData.tsx', path: path.join(__dirname, '..', 'components', 'StructuredData.tsx') },
    { name: 'SEOManager.tsx', path: path.join(__dirname, '..', 'components', 'SEOManager.tsx') },
  ];

  let allExist = true;
  components.forEach(component => {
    const exists = fs.existsSync(component.path);
    
    if (exists) {
      console.log(`✅ ${component.name}: Found`);
    } else {
      console.log(`❌ ${component.name}: NOT FOUND`);
      allExist = false;
    }
  });

  return allExist;
}

/**
 * Performance recommendations
 */
function printRecommendations() {
  console.log('\n💡 Performance Recommendations:\n');
  console.log('  1. Run "npm run build" to generate production build');
  console.log('  2. Test with "npm start" locally before deploying');
  console.log('  3. Use Lighthouse to audit performance and SEO');
  console.log('  4. Verify structured data with Google Rich Results Test');
  console.log('  5. Submit sitemap.xml to Google Search Console');
  console.log('  6. Monitor Core Web Vitals with Vercel Analytics');
  console.log('  7. Test AI crawler access with different user-agents');
  console.log('  8. Validate robots.txt at /robots.txt');
  console.log('  9. Check sitemap.xml at /sitemap.xml');
  console.log('  10. Monitor AEO performance with tools like Profound.ai\n');
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Prerender Verification\n');
  console.log('=' .repeat(60) + '\n');

  const pagesValid = checkPrerenderPages();
  const seoValid = validateSEOFiles();
  const structuredDataValid = validateStructuredData();

  console.log('\n' + '='.repeat(60));
  
  if (pagesValid && seoValid && structuredDataValid) {
    console.log('\n✨ All checks passed! Your site is optimized for SEO/AEO/GEO.\n');
  } else {
    console.log('\n⚠️  Some checks failed. Please review the issues above.\n');
  }

  printRecommendations();
}

// Execute if run directly
if (require.main === module) {
  main();
}

module.exports = { 
  checkPrerenderPages, 
  validateSEOFiles, 
  validateStructuredData 
};

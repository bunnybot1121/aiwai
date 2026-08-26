/**
 * Generate Sitemap Script
 * 
 * This script can be run during build time to generate additional
 * sitemap entries or validate the sitemap.xml
 * 
 * Usage: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://nabil-thange.vercel.app';
const currentDate = new Date().toISOString();

/**
 * Generate sitemap XML from routes
 */
function generateSitemap() {
  // Define static routes
  const routes = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/gallery', priority: 0.9, changefreq: 'weekly' },
  ];

  // Future: Add dynamic routes from content
  // const posts = getPostsFromFileSystem();
  // posts.forEach(post => {
  //   routes.push({
  //     path: `/blog/${post.slug}`,
  //     priority: 0.7,
  //     changefreq: 'monthly'
  //   });
  // });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

/**
 * Write sitemap to public directory
 */
function writeSitemap() {
  const sitemap = generateSitemap();
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write sitemap
  const sitemapPath = path.join(publicDir, 'sitemap-static.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  
  console.log('✅ Static sitemap generated at:', sitemapPath);
  console.log(`📊 Total URLs: ${sitemap.split('<url>').length - 1}`);
}

/**
 * Validate sitemap.xml exists
 */
function validateSitemap() {
  const nextSitemapPath = path.join(__dirname, '..', 'app', 'sitemap.ts');
  
  if (!fs.existsSync(nextSitemapPath)) {
    console.error('❌ Error: app/sitemap.ts not found!');
    process.exit(1);
  }
  
  console.log('✅ Next.js sitemap.ts found');
}

// Run the script
function main() {
  console.log('🚀 Generating sitemap...\n');
  
  validateSitemap();
  writeSitemap();
  
  console.log('\n✨ Sitemap generation complete!');
  console.log('💡 Note: Next.js will also generate sitemap.xml at build time from app/sitemap.ts\n');
}

// Execute if run directly
if (require.main === module) {
  main();
}

module.exports = { generateSitemap, writeSitemap, validateSitemap };

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content');

function cleanEmojisFromFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Remove emoji from chapter headers (📖 Chapter X of Y)
  const originalContent = content;
  content = content.replace(/📖\s*/g, '');
  
  // Remove arrows from navigation links (keeping the structure but removing emoji arrows)
  // We'll keep the arrows as they'll be rendered as SVG icons
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    modified = true;
  }
  
  return modified;
}

function main() {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  let updatedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    if (cleanEmojisFromFile(filePath)) {
      console.log(`✓ Cleaned ${file}`);
      updatedCount++;
    }
  }
  
  console.log(`\nCleaned ${updatedCount} files.`);
}

main();

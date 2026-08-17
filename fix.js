const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
};

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Remove `const { id } = await params;`
  content = content.replace(/const\s+\{\s*id\s*\}\s*=\s*await\s+params;\s*/g, '');
  
  // 2. Remove `const params = await props.params;` in API routes if it duplicates context.params
  content = content.replace(/const\s+params\s*=\s*await\s+props\.params;\s*/g, '');
  
  // 3. Remove `name: true` from user selection
  // It usually looks like `user: { select: { name: true, ... } }` or similar.
  // We'll replace `name: true,` and `name: true` inside select blocks.
  content = content.replace(/name:\s*true,?\s*/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
});

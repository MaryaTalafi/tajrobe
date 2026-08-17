const fs = require('fs');

// Fix API routes
const apiRoutes = [
  'src/app/api/events/[id]/attendees/route.ts',
  'src/app/api/events/[id]/favorite/route.ts',
  'src/app/api/events/[id]/ratings/route.ts',
  'src/app/api/events/[id]/register/route.ts'
];

apiRoutes.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/const \{ id: eventId \} = await params;/g, 'const eventId = id;');
  fs.writeFileSync(file, content);
});

// Fix page.tsx
let page = fs.readFileSync('src/app/events/[id]/page.tsx', 'utf8');
page = page.replace(/(export default async function EventDetailPage\(\{ params \}: \{ params: Promise<\{ id: string \}> \}\) \{)/g, '$1\n  const { id } = await params;');
fs.writeFileSync('src/app/events/[id]/page.tsx', page);

// Fix prisma.config.ts
let config = fs.readFileSync('prisma.config.ts', 'utf8');
config = config.replace(/earlyAccess:\s*true,?\s*/g, '');
fs.writeFileSync('prisma.config.ts', config);

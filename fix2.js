const fs = require('fs');

// Fix src/types/index.ts
let types = fs.readFileSync('src/types/index.ts', 'utf8');
types = types.replace(/joinLink\?: string;/g, 'joinLink?: string | null;');
types = types.replace(/recordingUrl\?: string;/g, 'recordingUrl?: string | null;');
types = types.replace(/createdAt: string;/g, 'createdAt: Date | string;');
fs.writeFileSync('src/types/index.ts', types);

// Fix prisma.config.ts
let config = fs.readFileSync('prisma.config.ts', 'utf8');
config = config.replace(/directUrl:\s*process\.env\.POSTGRES_URL_NON_POOLING,?\s*/g, '');
fs.writeFileSync('prisma.config.ts', config);

// Fix API routes
const apiRoutes = [
  'src/app/api/events/[id]/attendees/route.ts',
  'src/app/api/events/[id]/favorite/route.ts',
  'src/app/api/events/[id]/ratings/route.ts',
  'src/app/api/events/[id]/register/route.ts',
  'src/app/api/events/[id]/route.ts'
];

apiRoutes.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // if id is missing, we add it. The function signature is `props: { params: Promise<{ id: string }> }`
  content = content.replace(/(export async function (GET|POST|PATCH|DELETE|PUT)\(request: Request, props: \{ params: Promise<\{ id: string \}> \}\) \{)/g, 
  '$1\n  const { id } = await props.params;');
  fs.writeFileSync(file, content);
});

// Fix page.tsx
let page = fs.readFileSync('src/app/events/[id]/page.tsx', 'utf8');
page = page.replace(/(export default async function EventPage\(props: \{ params: Promise<\{ id: string \}> \}\) \{)/g, '$1\n  const { id } = await props.params;');
fs.writeFileSync('src/app/events/[id]/page.tsx', page);

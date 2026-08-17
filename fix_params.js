const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/app/api');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(fullPath));
        } else if (file === 'route.ts') {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walkDir(directoryPath);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the params destructured parameter in the function signature
    // From: export async function GET(request: Request, { params }: { params: { id: string } })
    // To: export async function GET(request: Request, context: { params: Promise<{ id: string }> })
    
    let modified = false;

    content = content.replace(/export async function (GET|POST|PUT|DELETE)\(request: Request, { params }: { params: { id: string } }\) {/g, 
        'export async function $1(request: Request, context: { params: Promise<{ id: string }> }) {\n  const { id } = await context.params;');
        
    // Also try to replace variations with `req: Request`
    content = content.replace(/export async function (GET|POST|PUT|DELETE)\(req: Request, { params }: { params: { id: string } }\) {/g, 
        'export async function $1(req: Request, context: { params: Promise<{ id: string }> }) {\n  const { id } = await context.params;');

    // Also without the `request: Request` if it exists
    content = content.replace(/export async function (GET|POST|PUT|DELETE)\(_req: Request, { params }: { params: { id: string } }\) {/g, 
        'export async function $1(_req: Request, context: { params: Promise<{ id: string }> }) {\n  const { id } = await context.params;');

    if (content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content);
        console.log(`Fixed ${file}`);
    }
});

console.log("Done");

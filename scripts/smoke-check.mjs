const baseUrl = process.argv[2] || 'http://localhost:3000';
const routes = ['/', '/my-plan', '/workout/1'];

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`);
  if (!response.ok) throw new Error(`${route} returned ${response.status}`);
  console.log(`✓ ${route} ${response.status}`);
}

console.log(`FitLog smoke check passed for ${baseUrl}`);

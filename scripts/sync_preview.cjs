// Keep the demo header and homepage in sync with the real Shopify sections.
const fs = require('node:fs');
const path = require('node:path');
const { Liquid } = require('liquidjs');
const { parseHTML } = require('linkedom');
const root = path.resolve(__dirname, '..');
const engine = new Liquid({ root: path.join(root, 'snippets'), extname: '.liquid' });
engine.registerFilter('asset_url', name => `assets/${name}`);
const routes = { root_url: 'DECOKASA-inicio.html', search_url: 'catalogo.html', all_products_collection_url: 'catalogo.html', collections_url: 'collections' };
async function section(name) {
  const raw = fs.readFileSync(path.join(root, 'sections', `${name}.liquid`), 'utf8');
  const schema = JSON.parse(raw.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
  const settings = Object.fromEntries(schema.settings.filter(s => s.id).map(s => [s.id, s.default ?? '']));
  const html = await engine.parseAndRender(raw.replace(/{% schema %}[\s\S]*?{% endschema %}/, ''), { section: { settings }, routes, search: { terms: '' } });
  return html.replaceAll('collections/types?q=', 'catalogo.html?categoria=').replaceAll('collections/vendors?q=', 'catalogo.html?marca=');
}
async function main() {
  const header = await section('header'), home = await section('home');
  const css = fs.readFileSync(path.join(root, 'assets/decokasa.css'), 'utf8');
  const js = fs.readFileSync(path.join(root, 'assets/decokasa.js'), 'utf8');
  const preview = path.join(root, 'preview');
  for (const file of fs.readdirSync(preview).filter(f => f.endsWith('.html'))) {
    const { document } = parseHTML(fs.readFileSync(path.join(preview, file), 'utf8'));
    const content = file === 'DECOKASA-inicio.html' ? home : document.querySelector('main').innerHTML;
    const footer = document.querySelector('footer').outerHTML;
    const consent = document.querySelector('[data-consent-banner]')?.outerHTML ?? document.querySelector('.consent')?.outerHTML ?? '';
    document.querySelectorAll('style').forEach(el => el.remove());
    const html = `<!doctype html><html lang="es"><head>${document.head.innerHTML}<style>${css}</style></head><body>${header}<main id="main">${content}</main><div class="demo">Demostración · Productos de ejemplo. Los formularios todavía no envían solicitudes.</div>${footer}${consent}<script>${js}</script></body></html>`;
    fs.writeFileSync(path.join(preview, file), html);
  }
  fs.mkdirSync(path.join(preview, 'assets'), { recursive: true });
  fs.copyFileSync(path.join(root, 'assets/decokasa-reference.jpg'), path.join(preview, 'assets/decokasa-reference.jpg'));
  console.log('Seven preview pages synchronized with the Shopify header and homepage.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });

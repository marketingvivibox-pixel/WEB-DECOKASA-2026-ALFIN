// Render the demo header, homepage and catalog from the real Shopify sections.
const fs = require('node:fs');
const path = require('node:path');
const { Liquid } = require('liquidjs');
const { parseHTML } = require('linkedom');
const root = path.resolve(__dirname, '..');
const engine = new Liquid({ root: path.join(root, 'snippets'), extname: '.liquid' });
engine.registerFilter('asset_url', name => `assets/${name}`);
engine.registerFilter('url_for_vendor', name => `catalogo.html?marca=${encodeURIComponent(name)}`);
engine.registerFilter('url_for_type', name => `catalogo.html?categoria=${encodeURIComponent(name)}`);
engine.registerFilter('handleize', name => String(name).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
const routes = { root_url: 'DECOKASA-inicio.html', search_url: 'catalogo.html', all_products_collection_url: 'catalogo.html', collections_url: 'collections' };
async function section(name, overrides = {}, context = {}) {
  const raw = fs.readFileSync(path.join(root, 'sections', `${name}.liquid`), 'utf8');
  const schema = JSON.parse(raw.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
  const settings = { ...Object.fromEntries(schema.settings.filter(s => s.id).map(s => [s.id, s.default ?? ''])), ...overrides };
  // The local demo contains five examples; Shopify paginates the real collection.
  const source = raw.replace(/{% schema %}[\s\S]*?{% endschema %}/, '').replace(/{% paginate [\s\S]*?%}/g, '').replace(/{% endpaginate %}/g, '').replace('{% assign is_demo = false %}', `{% assign is_demo = ${context.is_demo === true} %}`);
  const html = await engine.parseAndRender(source, { section: { settings }, routes, search: { terms: '' }, ...context });
  return html.replaceAll('collections/types?q=', 'catalogo.html?categoria=').replaceAll('collections/vendors?q=', 'catalogo.html?marca=');
}
async function main() {
  const template = JSON.parse(fs.readFileSync(path.join(root, 'templates/index.json'), 'utf8'));
  const homeSettings = template.sections?.main?.settings ?? {};
  const header = await section('header'), home = await section('home', homeSettings);
  const products = JSON.parse(fs.readFileSync(path.join(root, 'preview/products.json'), 'utf8')).map(product => ({...product, title: product.name, vendor: product.brand, type: product.category, url: `landing-${product.handle}.html`}));
  const catalogTemplate = JSON.parse(fs.readFileSync(path.join(root, 'templates/collection.json'), 'utf8'));
  const catalog = await section('catalog', catalogTemplate.sections?.main?.settings ?? {}, {is_demo: true, shop: {vendors: ['DECOKASA', 'Xion', 'Biflex', 'Mundo Baby'], types: [...new Set(products.map(product => product.type))]}, collection: {handle: 'all', title: 'Todos los productos', products, products_count: products.length, sort_by: 'manual'}});
  const css = fs.readFileSync(path.join(root, 'assets/decokasa.css'), 'utf8');
  const js = fs.readFileSync(path.join(root, 'assets/decokasa.js'), 'utf8');
  const preview = path.join(root, 'preview');
  for (const file of fs.readdirSync(preview).filter(f => f.endsWith('.html') && f !== 'DECOKASA-movil.html')) {
    const { document } = parseHTML(fs.readFileSync(path.join(preview, file), 'utf8'));
    document.querySelectorAll('link[rel="icon"]').forEach(el => el.remove());
    document.head.insertAdjacentHTML('beforeend', '<link rel="icon" type="image/png" sizes="128x128" href="assets/favicon.png">');
    const content = file === 'DECOKASA-inicio.html' ? home : file === 'catalogo.html' ? catalog : document.querySelector('main').innerHTML;
    const footer = document.querySelector('footer').outerHTML;
    const consent = document.querySelector('[data-consent-banner]')?.outerHTML ?? document.querySelector('.consent')?.outerHTML ?? '';
    document.querySelectorAll('style').forEach(el => el.remove());
    const html = `<!doctype html><html lang="es"><head>${document.head.innerHTML}<style>${css}</style></head><body>${header}<main id="main">${content}</main><div class="demo">Demostración · Productos de ejemplo. Los formularios todavía no envían solicitudes.</div>${footer}${consent}<script>${js}</script></body></html>`;
    fs.writeFileSync(path.join(preview, file), html.replace(/[ \t]+$/gm, ''));
  }
  fs.mkdirSync(path.join(preview, 'assets'), { recursive: true });
  for (const asset of fs.readdirSync(path.join(root, 'assets')).filter(name => /^(decokasa-.*\.webp|favicon\.png)$/.test(name))) {
    fs.copyFileSync(path.join(root, 'assets', asset), path.join(preview, 'assets', asset));
  }
  console.log('Seven preview pages synchronized with the Shopify header, homepage and catalog.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });

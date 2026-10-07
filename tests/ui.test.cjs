const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const {parseHTML}=require('linkedom');
const out=path.resolve(__dirname,'../preview');
const source=fs.readFileSync(path.resolve(__dirname,'../assets/decokasa.js'),'utf8');
function load(file,search=''){
  const {window,document}=parseHTML(fs.readFileSync(path.join(out,file),'utf8'));
  const data=new Map(); let sends=0;
  for(const select of document.querySelectorAll('select')){
    let selected=select.querySelector('option')?.getAttribute('value')??select.querySelector('option')?.textContent;
    Object.defineProperty(select,'value',{get:()=>selected,set:v=>{selected=String(v);}});
    Object.defineProperty(select,'selectedOptions',{get:()=>[...select.querySelectorAll('option')].filter(o=>(o.getAttribute('value')??o.textContent)===selected)});
  }
  for(const form of document.querySelectorAll('form'))form.reportValidity=()=>true;
  window.location={search};
  window.sessionStorage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
  class FormDataMock{constructor(form){this.values=[...form.querySelectorAll('[name]')].filter(e=>e.type!=='checkbox'||e.checked).map(e=>[e.name||e.getAttribute('name'),e.value]);}entries(){return this.values;}}
  const context={window,document,URLSearchParams,Uint8Array,Intl,FormData:FormDataMock,fetch:()=>{sends++;throw Error('Unexpected network');}};
  vm.runInNewContext(source,context);
  return {document,data,window,sends:()=>sends,event:(el,name)=>el.dispatchEvent(new window.Event(name,{cancelable:true,bubbles:true}))};
}
const home=load('DECOKASA-inicio.html');
assert.equal(home.document.querySelector('.brand.xion strong').textContent,'XION');
assert.equal(home.document.querySelector('.brand.baby strong').textContent,'MUNDOBABY');
assert.equal(home.document.querySelector('.brand.biflex strong').textContent,'BIFLEX');
assert.equal(home.document.querySelector('.whatsapp-float').getAttribute('href'),'https://wa.me/51941599516?text=Hola%2C+visit%C3%A9+la+tienda+DECOKASA+y+quisiera+ayuda+con+un+producto+o+una+cotizaci%C3%B3n.');
const catalog=load('catalogo.html','?marca=Xion');
const visible=()=>[...catalog.document.querySelectorAll('[data-card]')].filter(e=>!e.hidden);
assert.equal(visible().length,2);
const brand=catalog.document.querySelector('[data-filter-brand]');brand.value='Biflex';catalog.event(brand,'input');assert.equal(visible().length,1);
const category=catalog.document.querySelector('[data-filter-category]');category.value='Bebés';catalog.event(category,'input');assert.equal(visible().length,0);assert.equal(catalog.document.querySelector('[data-empty]').hidden,false);
const pvc=load('landing-pisos-pvc.html','?utm_source=meta&ad_id=123');
const $=s=>pvc.document.querySelector(s),area=$('[name=area]'),quantity=$('[name=quantity]');
assert.equal($('fieldset').disabled,false);
area.value='20';pvc.event(area,'input');assert.equal(Number(quantity.value),10);
const form=$('[data-request-form]');
const id=()=> $('[data-request-status]').textContent.match(/Referencia: ([a-f0-9-]+)/)[1];
assert.equal(pvc.event(form,'submit'),false);const first=id();pvc.event(form,'submit');assert.equal(id(),first);
area.value='22';pvc.event(area,'input');pvc.event(form,'submit');assert.notEqual(id(),first);
const variant=$('[name=variant_id]');variant.value='DEMO-V-4-B';pvc.event(variant,'change');assert.equal(Number(quantity.value),10);assert.equal($('[data-sku]').textContent,'DEMO-PVC-002');assert.match($('[data-product-price]').textContent,/119/);
const latest=id();area.value='0';pvc.event(area,'input');pvc.event(form,'submit');assert.equal(id(),latest);assert.equal($('[data-calc-result]').classList.contains('error'),true);
pvc.event($('[data-consent="accepted"]'),'click');assert.equal(JSON.parse(pvc.data.get('decokasa.attribution')).first.ad_id,'123');
pvc.event($('[data-consent="rejected"]'),'click');assert.equal(pvc.data.has('decokasa.attribution'),false);assert.equal(pvc.data.has('decokasa.visitor'),false);
assert.equal(pvc.sends(),0);assert.equal([...pvc.data.keys()].some(k=>k.includes('draft')),false);
console.log('DOM simulado: catálogo, estado vacío, PVC, variante, formulario/reintentos, consentimiento y cero envíos: correctos. No verifica renderizado visual ni validez nativa de campos.');

'use strict';
const fs=require('node:fs'),path=require('node:path');
const catalog=require('../vendor-catalog.json');
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const jsonScript=v=>JSON.stringify(v).replace(/</g,'\\u003c');
const slug=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function safeUrl(value){try{const u=new URL(String(value));return ['http:','https:'].includes(u.protocol)?u.href:''}catch{return ''}}
function phone(s){const n=String(s||'').replace(/\D/g,'');return /^(?:91)?[6-9]\d{9}$/.test(n)?(n.length===10?'91'+n:n):''}
const fields=['Submission ID','Business Name','Mobile','WhatsApp','Category','District','City','About Business','Services','Starting Price','Full Address','Logo URL','Photo URLs','Website','Instagram','Facebook','Google Maps','Portfolio Link','Status','Slug'];
function normalize(rows){
 const ids=new Set(),slugs=new Set();
 return rows.filter(v=>v.Status==='Approved').map(v=>{
  if(!v['Submission ID']||ids.has(v['Submission ID']))throw Error('Duplicate/missing vendor ID');ids.add(v['Submission ID']);
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v.Slug||'')||slugs.has(v.Slug))throw Error('Missing/duplicate/unsafe persisted slug');slugs.add(v.Slug);
  if(!v['Business Name']||!phone(v.Mobile)||!phone(v.WhatsApp))throw Error('Invalid business/phone');
  if(!catalog.locations[v.District]?.includes(v.City))throw Error('Invalid district/city');
  if(!catalog.categories.some(c=>c[0]===v.Category))throw Error('Invalid category');
  return Object.fromEntries(fields.map(k=>[k,String(v[k]??'')]));
 });
}
function categoryPath(v){const c=catalog.categories.find(c=>c[0]===v.Category);return `rajasthan/${slug(v.District)}/${slug(v.City)}/${c[1]}/`;}
function render(v,base){
 const url=base+'vendors/'+v.Slug+'/',name=v['Business Name'];
 const desc=`${name} — ${v.Category} in ${v.City}, Rajasthan. ${v.Services}`.slice(0,300);
 const photos=String(v['Photo URLs']||'').split(/[\n,]+/).map(safeUrl).filter(Boolean);
 const logo=safeUrl(v['Logo URL']);
 const schema={'@context':'https://schema.org','@type':'LocalBusiness',name,url,description:desc,telephone:'+'+phone(v.Mobile),address:{'@type':'PostalAddress',streetAddress:v['Full Address'],addressLocality:v.City,addressRegion:'Rajasthan',addressCountry:'IN'},...(logo?{image:logo}:{})};
 const css='*{box-sizing:border-box}body{margin:0;background:#f7f3eb;color:#171717;font:17px Arial;overflow-wrap:anywhere}header{background:#111;color:#e0c78e;padding:22px}main{max-width:1050px;margin:auto;padding:25px}h1{font-size:clamp(26px,5vw,46px)}section{background:white;padding:25px;border-radius:16px;margin:20px 0}p{white-space:pre-line;line-height:1.7}a{color:#76571f}.buttons{display:flex;gap:14px;flex-wrap:wrap}.buttons a{padding:14px;background:#111;color:#e0c78e;border-radius:24px}.gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:15px}.gallery img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:12px}.logo{width:100px;height:100px;object-fit:cover}';
 return `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(name)} | Rajasthan Wedding Guide</title><meta name="description" content="${escape(desc)}"><link rel="canonical" href="${escape(url)}"><meta property="og:title" content="${escape(name)}"><meta property="og:description" content="${escape(desc)}"><meta property="og:url" content="${escape(url)}"><meta property="og:type" content="website">${logo?`<meta property="og:image" content="${escape(logo)}">`:''}<style>${css}</style><script type="application/ld+json">${jsonScript(schema)}</script></head><body><header>Rajasthan Wedding Guide</header><main><a href="../../${categoryPath(v)}">${escape(v.Category)} in ${escape(v.City)}</a><section>${logo?`<img class="logo" src="${escape(logo)}" alt="${escape(name)} logo">`:''}<h1>${escape(name)}</h1><p>${escape(v.Category)} · ${escape(v.City)} · ${escape(v.District)}</p><div class="buttons"><a href="tel:+${phone(v.Mobile)}">Call Now</a><a href="https://wa.me/${phone(v.WhatsApp)}?text=${encodeURIComponent('Hello '+name+', I found you on Rajasthan Wedding Guide.')}" rel="noopener" target="_blank">WhatsApp Enquiry</a></div></section><section><h2>About</h2><p>${escape(v['About Business']||v.Services)}</p><h2>Services</h2><p>${escape(v.Services)}</p>${v['Starting Price']?`<h2>Starting Price</h2><p>${escape(v['Starting Price'])}</p>`:''}${v['Full Address']?`<h2>Address</h2><p>${escape(v['Full Address'])}</p>`:''}</section>${photos.length?`<section><h2>Gallery</h2><div class="gallery">${photos.map((u,i)=>`<img src="${escape(u)}" loading="lazy" alt="${escape(name)} portfolio ${i+1}">`).join('')}</div></section>`:''}<section><h2>Links</h2>${['Website','Instagram','Facebook','Google Maps','Portfolio Link'].map(k=>safeUrl(v[k])?`<p><a href="${escape(safeUrl(v[k]))}" rel="noopener" target="_blank">${k}</a></p>`:'').join('')}</section></main></body></html>`;
}
function publish(rows,dir,base){
 const u=new URL(base);if(u.protocol!=='https:'||u.hostname==='rajasthanweddingguide.com')throw Error('DEV base URL required');
 base=u.href.endsWith('/')?u.href:u.href+'/';
 const vendors=normalize(rows);const staging=path.join(dir,'.vendors-next');fs.rmSync(staging,{recursive:true,force:true});fs.mkdirSync(staging,{recursive:true});
 for(const v of vendors){const d=path.join(staging,v.Slug);fs.mkdirSync(d);fs.writeFileSync(path.join(d,'index.html'),render(v,base));}
 // All input and pages validate before replacing the managed output directory.
 fs.rmSync(path.join(dir,'vendors'),{recursive:true,force:true});fs.renameSync(staging,path.join(dir,'vendors'));
 fs.writeFileSync(path.join(dir,'approved-vendors.json'),JSON.stringify({ok:true,items:vendors},null,2)+'\n');
 fs.writeFileSync(path.join(dir,'sitemap-vendors.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+vendors.map(v=>'<url><loc>'+escape(base+'vendors/'+v.Slug+'/')+'</loc></url>').join('')+'</urlset>\n');
 return {vendors:vendors.length,mode:'DEV',indexing:'noindex',base};
}
async function main(){
 const api=process.env.DEV_API_URL,base=process.env.DEV_BASE_URL;
 if(!api||!base)throw Error('DEV_API_URL and DEV_BASE_URL required');
 const url=new URL(api);if(url.hostname!=='script.google.com'||!/^\/macros\/s\/[^/]+\/exec$/.test(url.pathname))throw Error('Apps Script DEV endpoint required');
 const health=await fetch(api+'?action=test',{signal:AbortSignal.timeout(30000)}).then(r=>r.json());
 if(!health.ok||health.environment!=='dev'||health.version!=='automatic-vendor-v1')throw Error('Backend is not isolated automatic-vendor DEV');
 const data=await fetch(api+'?action=list',{signal:AbortSignal.timeout(30000)}).then(r=>r.json());
 if(!data.ok||!Array.isArray(data.items))throw Error('Invalid public API response');
 if(data.items.some(v=>v.Status!=='Approved'))throw Error('Public API exposes unapproved data');
 console.log(JSON.stringify(publish(data.items,process.cwd(),base)));
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1});
module.exports={normalize,render,publish,categoryPath};

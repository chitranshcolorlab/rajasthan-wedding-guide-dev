'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),vm=require('node:vm');
const {publish,normalize,render}=require('../scripts/publish-vendors');
const source=fs.readFileSync(path.join(__dirname,'../backend/Code.gs'),'utf8');
function fixture(id='v5',slug='shree-krishna-wedding-photography-didwana',Status='Approved'){
 return {'Submission ID':id,Slug:slug,Status,'Business Name':'Shree Krishna Wedding Photography','Owner Name':'Test Owner',Mobile:'9876543210',WhatsApp:'9876543210',Category:'Photographers & Films',District:'Didwana-Kuchaman',City:'Didwana',Services:'Wedding photography','About Business':'Studio','Review Notes':'PRIVATE'};
}
function backend(vendors){
 const context={Logger:{log(){}},PropertiesService:{getScriptProperties:()=>({getProperty:k=>({RWG_ENV:'dev',DEV_SPREADSHEET_ID:'isolated-test'}[k])})},LockService:{getScriptLock:()=>({waitLock(){},releaseLock(){}})},ContentService:{MimeType:{JSON:'json'},createTextOutput:s=>({getContent:()=>s,setMimeType(){return this}})},Utilities:{formatDate:()=> '2026-10-05',getUuid:()=>crypto.randomUUID()},SpreadsheetApp:{flush(){}}};
 vm.createContext(context);vm.runInContext(source,context);const headers=vm.runInContext('HEADERS',context);
 const rows=[Array.from(headers),...vendors.map(v=>headers.map(h=>v[h]||''))];
 const range=(r,c,n=1,m=1)=>({getDisplayValues:()=>Array.from({length:n},(_,i)=>Array.from({length:m},(_,j)=>String(rows[r-1+i]?.[c-1+j]||''))),setValue(value){rows[r-1]??=[];rows[r-1][c-1]=value;return this},setValues(values){values.forEach((row,i)=>row.forEach((x,j)=>{rows[r-1+i]??=[];rows[r-1+i][c-1+j]=x}));return this},setFontWeight(){return this},setBackground(){return this}});
 const sheet={getLastRow:()=>rows.length,getLastColumn:()=>rows[0].length,getRange:range,getDataRange:()=>range(1,1,rows.length,rows[0].length),appendRow:row=>rows.push(row),setFrozenRows(){}};
 context.SpreadsheetApp.openById=()=>({getSheetByName:()=>sheet});context.writeAuditLog_=()=>{};
 return {context,rows,headers,sheet};
}
const parsed=x=>JSON.parse(x.getContent());
const admin={ok:true,email:'sharadmn29@gmail.com',sub:'verified-test'};
test('QA-64: data plus backend approval generates page, link and sitemap without vendor-specific code',()=>{
 const b=backend([fixture('v5','', 'Pending Approval')]);
 const approval=parsed(b.context.updateStatus_({id:'v5',status:'Approved'},admin));assert.equal(approval.ok,true);
 const publicRows=parsed(b.context.doGet({parameter:{action:'list'}})).items;
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rwg-'));try{
  publish(publicRows,dir,'https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev/');
  const slug=approval.slug;assert.ok(fs.existsSync(path.join(dir,'vendors',slug,'index.html')));
  assert.ok(fs.readFileSync(path.join(dir,'sitemap-vendors.xml'),'utf8').includes('vendors/'+slug+'/'));
  assert.ok(fs.readFileSync(path.join(dir,'approved-vendors.json'),'utf8').includes(slug));
  const html=fs.readFileSync(path.join(dir,'vendors',slug,'index.html'),'utf8');assert.match(html,/rel="canonical"/);assert.match(html,/application\/ld\+json/);assert.match(html,/noindex,nofollow/);
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
test('double approval is idempotent; same-name vendors receive distinct persistent slugs',()=>{
 const b=backend([fixture('one','', 'Pending Approval'),fixture('two','', 'Pending Approval')]);
 const a=parsed(b.context.updateStatus_({id:'one',status:'Approved'},admin));
 assert.equal(parsed(b.context.updateStatus_({id:'one',status:'Approved'},admin)).slug,a.slug);
 const second=parsed(b.context.updateStatus_({id:'two',status:'Approved'},admin));assert.notEqual(a.slug,second.slug);assert.equal(b.rows.length,3);
 b.rows[1][b.headers.indexOf('Business Name')]='Changed Name';assert.equal(parsed(b.context.updateStatus_({id:'one',status:'Approved'},admin)).slug,a.slug);
});
test('unauthorized approval cannot change database',()=>{
 const b=backend([fixture('v5','', 'Pending Approval')]),before=JSON.stringify(b.rows);
 assert.equal(parsed(b.context.updateStatus_({id:'v5',status:'Approved'},null)).ok,false);assert.equal(JSON.stringify(b.rows),before);
});
test('public API excludes pending and rejected vendors and private notes',()=>{
 const b=backend([fixture(),fixture('pending','pending','Pending Approval'),fixture('rejected','rejected','Rejected')]);
 const j=parsed(b.context.doGet({parameter:{action:'list'}}));assert.equal(j.items.length,1);assert.equal(j.items[0]['Review Notes'],undefined);assert.equal(j.items[0]['Owner Name'],undefined);
});
test('invalid approval fails before publishing and lock is released',()=>{
 const v=fixture('v5','', 'Pending Approval');v.Mobile='bad';const b=backend([v]);let releases=0;b.context.LockService.getScriptLock=()=>({waitLock(){},releaseLock(){releases++}});
 assert.throws(()=>b.context.updateStatus_({id:'v5',status:'Approved'},admin),/Invalid phone/);assert.equal(releases,1);assert.equal(b.rows[1][b.headers.indexOf('Status')],'Pending Approval');
});
test('XSS, attribute injection and unsafe outbound URLs do not enter executable HTML',()=>{
 const v=fixture();v['Business Name']='<script>alert(1)</script>';v.Services='</script><script>alert(2)</script>';v.Website='javascript:alert(3)';
 const html=render(v,'https://dev.example/');assert.ok(!html.includes('<script>alert('));assert.ok(!html.includes('href="javascript:'));assert.ok(html.includes('&lt;script&gt;'));assert.ok(html.includes('\\u003c'));
});
test('failed snapshot preserves output; unpublish removes profile and sitemap entry; republish restores',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rwg-'));try{
 const v=fixture();publish([v],dir,'https://dev.example/');const file=path.join(dir,'vendors',v.Slug,'index.html');
 assert.throws(()=>publish([v,fixture('other',v.Slug)],dir,'https://dev.example/'),/slug/);assert.ok(fs.existsSync(file));
 publish([{...v,Status:'Rejected'}],dir,'https://dev.example/');assert.ok(!fs.existsSync(file));assert.ok(!fs.readFileSync(path.join(dir,'sitemap-vendors.xml'),'utf8').includes(v.Slug));
 publish([v],dir,'https://dev.example/');assert.ok(fs.existsSync(file));
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
test('rejects unsafe slug and production target',()=>{
 assert.throws(()=>normalize([fixture('v5','../escape')]),/slug/);
 assert.throws(()=>publish([],os.tmpdir(),'https://rajasthanweddingguide.com/'),/DEV/);
});
test('backend refuses configured production spreadsheet',()=>{
 const b=backend([]);b.context.PropertiesService.getScriptProperties=()=>({getProperty:()=>''});assert.throws(()=>b.context.getSpreadsheet_(),/Isolated DEV/);
});
test('API token validation rejects missing, fake, expired, wrong audience/issuer/email/subject before database mutation',()=>{
 const cases=[null,{badHttp:true},{exp:1},{aud:'wrong'},{iss:'https://attacker.invalid'},{email_verified:false},{email:'other@example.com'},{sub:''}];
 for(const override of cases){
  const b=backend([fixture('v5','', 'Pending Approval')]),before=JSON.stringify(b.rows);
  const valid={aud:'180810306472-6u3ujevmmm3hhvjim4jfll136tn5b5dc.apps.googleusercontent.com',iss:'https://accounts.google.com',exp:Math.floor(Date.now()/1000)+300,email_verified:true,email:'sharadmn29@gmail.com',sub:'test-subject'};
  b.context.UrlFetchApp={fetch:()=>({getResponseCode:()=>override?.badHttp?401:200,getContentText:()=>JSON.stringify({...valid,...override})})};
  const result=parsed(b.context.doPost({postData:{contents:JSON.stringify({action:'status',id:'v5',status:'Approved',idToken:override===null?undefined:'test-token'})}}));
  assert.equal(result.ok,false);assert.equal(JSON.stringify(b.rows),before);
 }
});
test('header reordering preserves row ownership and approval status',()=>{
 const b=backend([fixture('v5','', 'Pending Approval')]);
 const a=b.headers.indexOf('Status'),z=b.headers.indexOf('Review Notes');
 for(const row of b.rows)[row[a],row[z]]=[row[z],row[a]];
 const result=parsed(b.context.updateStatus_({id:'v5',status:'Approved',note:'reviewed'},admin));assert.equal(result.ok,true);assert.equal(b.rows[1][z],'Approved');assert.equal(b.rows[1][a],'reviewed');
});
test('public and private lists find vendor ID after an empty column is moved first',()=>{
 const v=fixture();v['Email']='';const b=backend([v]);
 const email=b.headers.indexOf('Email');for(const row of b.rows)[row[0],row[email]]=[row[email],row[0]];
 assert.equal(parsed(b.context.doGet({parameter:{action:'list'}})).items.length,1);
 b.context.verifyGoogleAdminToken_=()=>admin;
 assert.equal(parsed(b.context.doPost({postData:{contents:JSON.stringify({action:'admin-list',idToken:'mock'})}})).items.length,1);
});

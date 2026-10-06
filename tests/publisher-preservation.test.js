'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{spawnSync}=require('node:child_process');
const script=path.resolve(__dirname,'../scripts/publish-vendors.js'),catalog=require('../vendor-catalog.json');
const district=Object.keys(catalog.locations)[0],city=catalog.locations[district][0];
const vendor={'Submission ID':'DEV-PRESERVATION-FIXTURE','Business Name':'Disposable DEV preservation fixture',Mobile:'9999999999',WhatsApp:'9999999999',Category:catalog.categories[0][0],District:district,City:city,Status:'Approved',Slug:'dev-preservation-fixture'};
function run(scenario){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rwg-publisher-preservation-'));
 fs.mkdirSync(path.join(dir,'vendors','old-profile'),{recursive:true});
 const before={'approved-vendors.json':'OLD SNAPSHOT\n','sitemap-vendors.xml':'OLD SITEMAP\n','vendors/old-profile/index.html':'OLD PROFILE\n'};
 for(const [name,value] of Object.entries(before))fs.writeFileSync(path.join(dir,name),value);
 const mock=path.join(dir,'mock-api.cjs');
 fs.writeFileSync(mock,`const fs=require('node:fs');let calls=[];const scenario=${JSON.stringify(scenario)},vendor=${JSON.stringify(vendor)};
 process.on('exit',()=>fs.writeFileSync('calls.json',JSON.stringify(calls)));
 global.fetch=async(url)=>{
 const action=new URL(url).searchParams.get('action');calls.push(action);
 const listCalls=calls.filter(x=>x==='list').length;
 if(scenario==='health-retry-success'&&calls.length===1)return {ok:true,status:200,json:async()=>{throw Error('PRIVATE HTML BODY')}};
 if(scenario==='list-unreadable'&&action==='list')return {ok:true,status:200,json:async()=>{throw Error('PRIVATE HTML BODY')}};
 const health={ok:true,environment:scenario==='wrong-environment'?'production':'dev',version:'automatic-vendor-v1'};
 let data={ok:true,items:[vendor]};
 if(scenario==='list-invalid')data={ok:true,items:{}};
 if(scenario==='unapproved')data={ok:true,items:[{...vendor,Status:'Pending'}]};
 return {ok:true,status:200,json:async()=>action==='test'?health:data};
 };`);
 const result=spawnSync(process.execPath,['--require',mock,script],{cwd:dir,encoding:'utf8',timeout:15000,env:{...process.env,DEV_API_URL:'https://script.google.com/macros/s/DEV-PRESERVATION-FIXTURE/exec',DEV_BASE_URL:'https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev/'}});
 const calls=JSON.parse(fs.readFileSync(path.join(dir,'calls.json'),'utf8'));
 return {dir,before,result,calls,cleanup:()=>fs.rmSync(dir,{recursive:true,force:true})};
}
function unchanged(run){for(const [name,value] of Object.entries(run.before))assert.equal(fs.readFileSync(path.join(run.dir,name),'utf8'),value,name);assert.equal(fs.existsSync(path.join(run.dir,'.vendors-next')),false);}
test('wrong environment fails before list and preserves all generated files',()=>{
 const r=run('wrong-environment');try{assert.equal(r.result.status,1);assert.deepEqual(r.calls,['test']);unchanged(r);}finally{r.cleanup();}
});
test('exhausted unreadable list fails safely and preserves old profile snapshot and sitemap',()=>{
 const r=run('list-unreadable');try{assert.equal(r.result.status,1);assert.deepEqual(r.calls,['test','list','list','list']);assert.match(r.result.stderr,/unreadable JSON after 3 attempts/);assert.doesNotMatch(r.result.stderr,/PRIVATE HTML BODY/);unchanged(r);}finally{r.cleanup();}
});
test('valid JSON with invalid list shape fails without retries or output changes',()=>{
 const r=run('list-invalid');try{assert.equal(r.result.status,1);assert.deepEqual(r.calls,['test','list']);unchanged(r);}finally{r.cleanup();}
});
test('unapproved API record fails without publishing or removing existing profiles',()=>{
 const r=run('unapproved');try{assert.equal(r.result.status,1);assert.deepEqual(r.calls,['test','list']);unchanged(r);}finally{r.cleanup();}
});
test('health HTML retry integrates with validated publication and exact approved profile output',()=>{
 const r=run('health-retry-success');try{
  assert.equal(r.result.status,0,r.result.stderr);assert.deepEqual(r.calls,['test','test','list']);
  const data=JSON.parse(fs.readFileSync(path.join(r.dir,'approved-vendors.json'),'utf8'));assert.equal(data.items.length,1);assert.equal(data.items[0]['Submission ID'],vendor['Submission ID']);
  assert.ok(fs.existsSync(path.join(r.dir,'vendors',vendor.Slug,'index.html')));
  assert.equal(fs.existsSync(path.join(r.dir,'vendors','old-profile')),false);
  assert.ok(fs.readFileSync(path.join(r.dir,'sitemap-vendors.xml'),'utf8').includes('/vendors/'+vendor.Slug+'/'));
 }finally{r.cleanup();}
});

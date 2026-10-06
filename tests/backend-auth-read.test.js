'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../backend/Code.gs'),'utf8');
function setup(claims,mode){
 let reads=0,fetches=0;
 const ctx={UrlFetchApp:{fetch(){fetches++;if(mode==='network')throw Error('upstream unavailable');return {getResponseCode:()=>200,getContentText:()=>mode==='malformed'?'not-json':JSON.stringify(claims)}}},ContentService:{MimeType:{JSON:'json'},createTextOutput:s=>({getContent:()=>s,setMimeType(){return this}})}};
 vm.createContext(ctx);vm.runInContext(source,ctx);
 ctx.getSheet_=()=>{reads++;return {getDataRange:()=>({getDisplayValues:()=>[['Submission ID','Status','Email'],['fixture','Pending Approval','private@example.invalid']]})}};
 return {ctx,counts:()=>({reads,fetches})};
}
const valid=()=>({aud:'180810306472-6u3ujevmmm3hhvjim4jfll136tn5b5dc.apps.googleusercontent.com',iss:'https://accounts.google.com',exp:Math.floor(Date.now()/1000)+300,email_verified:true,email:'sharadmn29@gmail.com',sub:'synthetic-subject'});
const post=b=>({postData:{contents:JSON.stringify(b)}});
test('valid Google claim variants authorize private admin read only',()=>{
 for(const variant of [{},{iss:'accounts.google.com',email_verified:'true',email:' SHARADMN29@GMAIL.COM '}]) {
  const b=setup({...valid(),...variant});
  const r=JSON.parse(b.ctx.doPost(post({action:'admin-list',idToken:'synthetic-token'})).getContent());
  assert.equal(r.ok,true);assert.equal(r.items[0]['Submission ID'],'fixture');assert.equal(r.items[0].Email,'private@example.invalid');assert.deepEqual(b.counts(),{reads:1,fetches:1});
 }
});
test('unauthorized claim variants cannot read private vendor data',()=>{
 for(const variant of [{aud:'wrong'},{iss:'https://attacker.invalid'},{exp:1},{email_verified:false},{email:'other@example.invalid'},{sub:'   '}]) {
  const b=setup({...valid(),...variant});
  const r=JSON.parse(b.ctx.doPost(post({action:'admin-list',idToken:'synthetic-token'})).getContent());
  assert.equal(r.ok,false);assert.equal(r.items,undefined);assert.equal(b.counts().reads,0);
 }
});
test('token verification outages and malformed JSON fail closed for private reads',()=>{
 for(const mode of ['network','malformed']){
  const b=setup(valid(),mode),r=JSON.parse(b.ctx.doPost(post({action:'admin-list',idToken:'synthetic-token'})).getContent());
  assert.equal(r.ok,false);assert.equal(r.error,'Google authentication verification failed.');assert.equal(b.counts().reads,0);assert.equal(r.items,undefined);
 }
});
test('missing and non-string tokens never reach verifier or private sheet',()=>{
 for(const idToken of [undefined,null,{},123]){
  const b=setup(valid()),r=JSON.parse(b.ctx.doPost(post({action:'admin-list',idToken})).getContent());
  assert.equal(r.ok,false);assert.deepEqual(b.counts(),{reads:0,fetches:0});
 }
});

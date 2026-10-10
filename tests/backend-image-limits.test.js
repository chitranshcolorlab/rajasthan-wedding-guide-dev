'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function backend(){const c={Utilities:{base64Decode:s=>Array.from(Buffer.from(s,'base64'))}};vm.createContext(c);vm.runInContext(fs.readFileSync('backend/Code.gs','utf8'),c);return c;}
const image=n=>({type:'image/webp',data:Buffer.alloc(n).toString('base64')});
test('backend accepts exactly 200 KB and rejects one byte over before creating a file',()=>{const c=backend();assert.equal(c.validateImage_(image(200*1024)).bytes.length,200*1024);assert.throws(()=>c.saveFile_({createFile(){assert.fail('must not write oversized image')}},image(200*1024+1),'test'),/200 KB/);});
test('backend rejects GIF and eleven photos before any database or file access',()=>{const c=backend();assert.throws(()=>c.validateImage_({type:'image/gif',data:'AAAA'}),/Unsupported/);c.validateVendor_=()=>{};assert.throws(()=>c.submitVendor_({photos:Array(11).fill(image(1))}),/Maximum 10/);assert.throws(()=>c.submitVendor_({photos:[image(200*1024+1)]}),/200 KB/);});

test('admin API rejects missing token without reading or modifying vendor records',()=>{
 const c=backend();c.json_=x=>x;
 c.getSheet_=()=>{assert.fail('unauthorized request read private vendor data')};
 c.updateStatus_=()=>{assert.fail('unauthorized request changed vendor status')};
 for(const action of ['admin-list','status']){
  const result=c.doPost({postData:{contents:JSON.stringify({action,id:'test',status:'Approved'})}});
  assert.equal(result.ok,false);assert.match(result.error,/Google ID token missing/);
 }
});
test('admin API rejects invalid token without reading or modifying vendor records',()=>{
 const c=backend();c.json_=x=>x;
 c.UrlFetchApp={fetch:()=>({getResponseCode:()=>401})};
 c.getSheet_=()=>{assert.fail('invalid token read private vendor data')};
 c.updateStatus_=()=>{assert.fail('invalid token changed vendor status')};
 for(const action of ['admin-list','status']){
  const result=c.doPost({postData:{contents:JSON.stringify({action,idToken:'invalid',id:'test',status:'Approved'})}});
  assert.equal(result.ok,false);assert.match(result.error,/Invalid or expired Google ID token/);
 }
});
test('DEV registration guard limits a phone to five attempts per hour',()=>{
 const c=backend(),cache=new Map();
 c.getSpreadsheet_=()=>({});
 c.Utilities.computeDigest=(_algo,bytes)=>Array.from(Buffer.from(String(bytes)));
 c.Utilities.DigestAlgorithm={SHA_256:'SHA_256'};
 c.Utilities.base64EncodeWebSafe=bytes=>Buffer.from(bytes).toString('base64url');
 c.LockService={getScriptLock:()=>({waitLock(){},releaseLock(){}})};
 c.CacheService={getScriptCache:()=>({get:key=>cache.get(key),put:(key,value)=>cache.set(key,value)})};
 for(let i=0;i<5;i++)assert.doesNotThrow(()=>c.checkDevSubmissionLimit_('9876543210'));
 assert.throws(()=>c.checkDevSubmissionLimit_('9876543210'),/Submission limit reached/);
 assert.doesNotThrow(()=>c.checkDevSubmissionLimit_('9876543211'));
});

test('admin token verification rejects forged audience, issuer, unverified email and wrong admin',()=>{
 const c=backend();
 const now=Math.floor(Date.now()/1000);
 const valid={aud:'180810306472-6u3ujevmmm3hhvjim4jfll136tn5b5dc.apps.googleusercontent.com',iss:'https://accounts.google.com',exp:now+3600,email_verified:true,email:'sharadmn29@gmail.com',sub:'test-google-sub'};
 for(const override of [{aud:'another-client'},{iss:'https://attacker.example'},{exp:now-1},{email_verified:false},{email:'not-admin@example.com'},{sub:''}]){
  c.UrlFetchApp={fetch:()=>({getResponseCode:()=>200,getContentText:()=>JSON.stringify({...valid,...override})})};
  assert.equal(c.verifyGoogleAdminToken_('dummy-token').ok,false);
 }
 c.UrlFetchApp={fetch:()=>({getResponseCode:()=>200,getContentText:()=>JSON.stringify(valid)})};
 assert.equal(c.verifyGoogleAdminToken_('dummy-token').ok,true);
});

test('public vendor response exposes only approved profile fields, never future private columns',()=>{
 const c=backend();
 const source={'Submission ID':'RWG-test','Business Name':'QA Business',Mobile:'9876543210',Status:'Approved',Slug:'qa-business','Owner Name':'Private Owner',Email:'private@example.com','Review Notes':'Private review','Registration Date':'2026-10-10','Internal Payment Notes':'private','Admin Secret':'private'};
 const result=c.publicVendor_(source);
 assert.equal(result['Business Name'],'QA Business');
 assert.equal(result.Mobile,'9876543210');
 for(const key of ['Owner Name','Email','Review Notes','Registration Date','Internal Payment Notes','Admin Secret'])assert.equal(Object.hasOwn(result,key),false,key+' leaked');
});

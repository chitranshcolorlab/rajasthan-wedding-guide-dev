'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function backend(){const c={Utilities:{base64Decode:s=>Array.from(Buffer.from(s,'base64'))}};vm.createContext(c);vm.runInContext(fs.readFileSync('backend/Code.gs','utf8'),c);return c;}
const image=n=>({type:'image/webp',data:Buffer.alloc(n).toString('base64')});
test('backend accepts exactly 200 KB and rejects one byte over before creating a file',()=>{const c=backend();assert.equal(c.validateImage_(image(200*1024)).bytes.length,200*1024);assert.throws(()=>c.saveFile_({createFile(){assert.fail('must not write oversized image')}},image(200*1024+1),'test'),/200 KB/);});
test('backend rejects GIF and eleven photos before any database or file access',()=>{const c=backend();assert.throws(()=>c.validateImage_({type:'image/gif',data:'AAAA'}),/Unsupported/);c.validateVendor_=()=>{};assert.throws(()=>c.submitVendor_({photos:Array(11).fill(image(1))}),/Maximum 10/);assert.throws(()=>c.submitVendor_({photos:[image(200*1024+1)]}),/200 KB/);});

'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), vm = require('node:vm'), path = require('node:path');
function compressor(sizes) {
  let revoked = false, calls = 0;
  const dimensions = [];
  const canvas = {getContext: () => ({clearRect(){},drawImage(){}}), toBlob(callback) {
    dimensions.push([this.width,this.height]);
    callback({type:'image/webp',size:sizes[Math.min(calls++,sizes.length-1)]});
  }};
  const context = {document:{getElementById:()=>({addEventListener(){}}),createElement:()=>canvas},
    URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){revoked=true}},
    Image:class {constructor(){this.naturalWidth=2400;this.naturalHeight=1800} set src(value){this.onload()}},
    FileReader:class {readAsDataURL(blob){this.result='data:image/webp;base64,TEST';this.onload()}},
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../scripts/vendor-register.js'),'utf8'),context);
  return {run:file=>context.readBusinessImage(file),dimensions,revoked:()=>revoked};
}
test('large original uploads only compressed bytes within the KB cap',async()=>{
  const c=compressor([300000,250000,210000,180000]);
  const result=await c.run({type:'image/png',size:11380532});
  assert.equal(result.sizeBytes,180000);assert.equal(result.type,'image/webp');
  assert.equal(c.dimensions[0][0],1600);assert.ok(c.revoked());
});
test('difficult image shrinks dimensions and never falls back to original upload',async()=>{
  const c=compressor([300000]);
  await assert.rejects(c.run({type:'image/png',size:11380532}),/200 KB/);
  assert.ok(c.dimensions.at(-1)[0]<=320);assert.ok(c.revoked());
});

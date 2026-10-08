'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {fetchDevJson}=require('../scripts/publish-vendors.js');
const url='https://script.google.com/macros/s/DEV-FIXTURE/exec?action=list';
const json=v=>({ok:true,status:200,json:async()=>v});
test('HTML acknowledgement retries GET only and returns later JSON without exposing body',async()=>{
 let calls=0;const waits=[];
 const value=await fetchDevJson(url,{fetchImpl:async(u,o)=>{assert.equal(u,url);assert.equal(o.method,undefined);assert.ok(o.signal);calls++;return calls===1?{ok:true,status:200,json:async()=>{throw new SyntaxError('PRIVATE HTML BODY')}}:json({ok:true,items:[]})},sleep:async n=>waits.push(n)});
 assert.deepEqual(value,{ok:true,items:[]});assert.equal(calls,2);assert.deepEqual(waits,[1000]);
});
test('transport failures and transient HTTP errors retry with bounded backoff',async()=>{
 for(const first of ['network',404,408,429,503]){
  let calls=0;const waits=[];
  const result=await fetchDevJson(url,{fetchImpl:async()=>{calls++;if(calls===1){if(first==='network')throw Error('PRIVATE NETWORK DETAIL');return {ok:false,status:first}}return json({ok:true})},sleep:async n=>waits.push(n)});
  assert.equal(result.ok,true);assert.equal(calls,2);assert.deepEqual(waits,[1000]);
 }
});
test('permanent HTTP errors fail on first request',async()=>{
 for(const status of [400,401,403]){
  let calls=0;await assert.rejects(fetchDevJson(url,{fetchImpl:async()=>{calls++;return {ok:false,status}},sleep:async()=>assert.fail('must not wait')}),new RegExp('DEV API HTTP '+status));assert.equal(calls,1);
 }
});
test('404 retry is restricted to deployed Apps Script GET endpoints and stays bounded',async()=>{
 for(const target of ['https://example.com/macros/s/DEV/exec','https://script.google.com/not-an-exec']){
  let calls=0;await assert.rejects(fetchDevJson(target,{fetchImpl:async()=>{calls++;return {ok:false,status:404}},sleep:async()=>assert.fail('must not wait')}),/HTTP 404/);assert.equal(calls,1);
 }
 let calls=0;const waits=[];
 await assert.rejects(fetchDevJson(url,{fetchImpl:async()=>{calls++;return {ok:false,status:404}},sleep:async n=>waits.push(n)}),/HTTP 404/);
 assert.equal(calls,3);assert.deepEqual(waits,[1000,2000]);
});
test('unreadable JSON fails after three requests with safe error and no fourth request',async()=>{
 let calls=0;const waits=[];
 await assert.rejects(fetchDevJson(url,{fetchImpl:async()=>{calls++;return {ok:true,status:200,json:async()=>{throw Error('PRIVATE HTML BODY')}}},sleep:async n=>waits.push(n)}),e=>e.message==='DEV API returned unreadable JSON after 3 attempts');
 assert.equal(calls,3);assert.deepEqual(waits,[1000,2000]);
});
test('exhausted transport and HTTP failures remain bounded',async()=>{
 for(const kind of ['network','http']){
  let calls=0;
  await assert.rejects(fetchDevJson(url,{fetchImpl:async()=>{calls++;if(kind==='network')throw Error('PRIVATE DETAIL');return {ok:false,status:503}},sleep:async()=>{}}),kind==='network'?/transport failed after 3 attempts/:/HTTP 503/);assert.equal(calls,3);
 }
});
test('valid JSON error or unexpected environment is not silently replaced by retry success',async()=>{
 const rejection={ok:false,error:'Backend rejected'};let calls=0;
 assert.deepEqual(await fetchDevJson(url,{fetchImpl:async()=>{calls++;return json(rejection)},sleep:async()=>assert.fail('no retry')}),rejection);assert.equal(calls,1);
});


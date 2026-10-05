'use strict';
const fs=require('node:fs');
const statuses=['NEW','TRIAGED','ASSIGNED','IN PROGRESS','FIX READY','RETESTING','CLOSED','REOPENED','DEFERRED','REJECTED'];
function blockers(state){
 const reasons=[];
 if(!state.candidateCommit)reasons.push('Candidate commit missing');
 for(const d of state.defects||[]){
  if(!statuses.includes(d.status))reasons.push(d.id+': invalid lifecycle status');
  if(['CLOSED','REJECTED'].includes(d.status)){
   if(d.status==='CLOSED'&&(!d.retestEvidence||!d.closedByQA))reasons.push(d.id+': closure lacks QA evidence');
   if(d.status==='REJECTED'&&(!d.reason||!d.approvedBy))reasons.push(d.id+': rejection lacks approval');
   continue;
  }
  const absolute=d.severity==='S0'||d.priority==='P0'||d.releaseBlocker||['security','data-integrity','linking','QA-64'].includes(d.area);
  if(absolute)reasons.push(d.id+': unresolved blocker');
  else if(d.status!=='DEFERRED'||!d.targetFixVersion||!d.approvedBy||!d.riskAssessment)reasons.push(d.id+': unresolved without approved deferral');
 }
 for(let i=1;i<=64;i++){const id='QA-'+String(i).padStart(2,'0');if(!state.tests?.[id])reasons.push(id+': test record missing');}
 for(const [id,result] of Object.entries(state.tests||{}))if(result.status!=='PASS'||result.commit!==state.candidateCommit||!result.evidence)reasons.push(id+': candidate PASS evidence required');
 if(state.tests?.['QA-64']?.environment!=='DEV')reasons.push('QA-64 requires actual DEV evidence');
 if(!state.legacy||state.legacy.length!==4||state.legacy.some(v=>v.status!=='PASS'||!v.evidence||v.commit!==state.candidateCommit))reasons.push('Legacy 4/4 candidate evidence missing');
 for(const role of ['QA','Developer','Release Owner','Approver']){
  const s=state.signoffs?.[role];if(!s?.name||!s.date||s.commit!==state.candidateCommit)reasons.push(role+': sign-off missing');
 }
 return reasons;
}
if(require.main===module){const s=JSON.parse(fs.readFileSync(process.argv[2]||'qa/release-state.json','utf8'));const b=blockers(s);console.log(JSON.stringify({decision:b.length?'RELEASE BLOCKED':'READY FOR PRODUCTION',blockers:b},null,2));if(b.length)process.exitCode=1;}
module.exports={blockers};

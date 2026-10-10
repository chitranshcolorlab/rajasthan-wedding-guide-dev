const SPREADSHEET_ID='1XxO0mATpxA85Qc0BZW3oMk7pULuypZeXchqSEJuRsQY';
const SHEET_NAME='Vendor Registrations',AUDIT_SHEET_NAME='Admin Audit Log',APPROVAL_EXEC_AUDIT_SHEET_NAME='Approval Execution Audit';
const PHOTO_FOLDER_NAME='Rajasthan Wedding Guide - DEV Vendor Uploads';
const GOOGLE_CLIENT_ID='180810306472-6u3ujevmmm3hhvjim4jfll136tn5b5dc.apps.googleusercontent.com';
const AUTHORIZED_ADMIN_EMAIL='sharadmn29@gmail.com';
const HEADERS=['Submission ID','Business Name','Owner Name','Mobile','WhatsApp','Email','Years in Business','Category','District','City','Full Address','Service Areas','Google Maps','About Business','Services','Starting Price','Languages','Specialities','Instagram','Website','Facebook','Portfolio Link','Logo URL','Photo URLs','Registration Date','Status','Review Notes','Slug'];
function getSpreadsheet_(){const p=PropertiesService.getScriptProperties(),id=p.getProperty('DEV_SPREADSHEET_ID');if(p.getProperty('RWG_ENV')!=='dev'||!id||id===SPREADSHEET_ID)throw Error('Isolated DEV spreadsheet required');return SpreadsheetApp.openById(id);}
function getSheet_(){const ss=getSpreadsheet_();let s=ss.getSheetByName(SHEET_NAME);if(!s)s=ss.insertSheet(SHEET_NAME);if(!s.getLastRow()){s.getRange(1,1,1,HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#c7a15a');s.setFrozenRows(1);}return s;}
function getHeaderColumn_(s,h){const i=s.getRange(1,1,1,s.getLastColumn()).getDisplayValues()[0].findIndex(x=>String(x).trim()===h);if(i<0)throw Error('Required sheet header not found: '+h);return i+1;}
function getAuditSheet_(){const ss=getSpreadsheet_();let s=ss.getSheetByName(AUDIT_SHEET_NAME);if(!s)s=ss.insertSheet(AUDIT_SHEET_NAME);const h=['Date','Submission ID','Action','Note','Admin Email','Google Account ID'];s.getRange(1,1,1,h.length).setValues([h]).setFontWeight('bold').setBackground('#c7a15a');s.setFrozenRows(1);return s;}
function setupSystem(){getSheet_();getAuditSheet_();getApprovalExecutionAuditSheet_();getUploadFolder_();Logger.log('Rajasthan Wedding Guide DEV System Ready');}

function setupDevSystem(){
 const p=PropertiesService.getScriptProperties();
 if(ScriptApp.getScriptId()!=='1ET6cuL8kKoH4z-z1nGEg1_DzvCw6KKJsS_4f2Pw0JtAYp9H1CKcV7BBo')throw Error('Setup is restricted to the isolated DEV project');
 if(p.getProperty('RWG_ENV')&&p.getProperty('RWG_ENV')!=='dev')throw Error('Not DEV');
 if(!p.getProperty('DEV_SPREADSHEET_ID')){const ss=SpreadsheetApp.create('Rajasthan Wedding Guide — Isolated DEV Vendors');p.setProperties({RWG_ENV:'dev',DEV_SPREADSHEET_ID:ss.getId()});}
 setupSystem();Logger.log('DEV spreadsheet: '+getSpreadsheet_().getUrl());
}
function doGet(e){try{const p=e&&e.parameter?e.parameter:{},action=String(p.action||'list').trim().toLowerCase();if(action==='test'){getSpreadsheet_();return json_({ok:true,environment:'dev',version:'automatic-vendor-v1'});}if(action!=='list')return json_({ok:false,error:'Unsupported GET action'});const data=getSheet_().getDataRange().getDisplayValues();let items=data.slice(1).map(r=>rowObject_(data[0],r)).filter(v=>v['Submission ID']).filter(v=>v.Status==='Approved').map(publicVendor_);if(p.status)items=items.filter(v=>v.Status===p.status);return json_({ok:true,count:items.length,items});}catch(e){Logger.log('DEV API request failed: '+String(e));return json_({ok:false,error:'Request could not be processed. Please try again or contact support.'});}}
function doPost(e){try{const b=JSON.parse(e&&e.postData?e.postData.contents:'{}'),action=String(b.action||'').trim().toLowerCase();if(action==='submit')return submitVendor_(b);if(action==='admin-list'||action==='status'){const a=verifyGoogleAdminToken_(b.idToken);if(!a.ok)return json_(a);if(action==='status')return updateStatus_(b,a);const rows=getSheet_().getDataRange().getDisplayValues();return json_({ok:true,items:rows.slice(1).map(r=>rowObject_(rows[0],r)).filter(v=>v['Submission ID'])});}return json_({ok:false,error:'Unsupported POST action'});}catch(e){Logger.log('DEV API request failed: '+String(e));return json_({ok:false,error:'Request could not be processed. Please try again or contact support.'});}}
function verifyGoogleAdminToken_(t){try{if(!t||typeof t!=='string')return {ok:false,error:'Google ID token missing.'};const r=UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token='+encodeURIComponent(t),{method:'get',muteHttpExceptions:true});if(r.getResponseCode()!==200)return {ok:false,error:'Invalid or expired Google ID token.'};const p=JSON.parse(r.getContentText());if(String(p.aud||'')!==GOOGLE_CLIENT_ID)return {ok:false,error:'Invalid token audience.'};if(!['accounts.google.com','https://accounts.google.com'].includes(String(p.iss||'')))return {ok:false,error:'Invalid token issuer.'};if(!Number(p.exp)||Number(p.exp)<=Math.floor(Date.now()/1000))return {ok:false,error:'Google login has expired.'};if(p.email_verified!==true&&String(p.email_verified).toLowerCase()!=='true')return {ok:false,error:'Google email is not verified.'};const email=String(p.email||'').trim().toLowerCase();if(!email)return {ok:false,error:'Google email missing.'};if(email!==AUTHORIZED_ADMIN_EMAIL)return {ok:false,error:'This Google account is not authorized.'};if(!String(p.sub||'').trim())return {ok:false,error:'Google account ID missing.'};return {ok:true,email,sub:String(p.sub),exp:Number(p.exp)};}catch(e){return {ok:false,error:'Google authentication verification failed.'};}}
// Best-effort per-phone abuse guard. DEV only; cache expiry resets the window.
function checkDevSubmissionLimit_(mobile){
 getSpreadsheet_();
 const digits=String(mobile||'').replace(/\D/g,'').slice(-10);
 const key='dev-submit-'+Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,digits)).slice(0,36);
 const lock=LockService.getScriptLock();lock.waitLock(10000);
 try{
  const cache=CacheService.getScriptCache(),count=Number(cache.get(key)||0);
  if(count>=5)throw Error('Submission limit reached. Please try again later.');
  cache.put(key,String(count+1),3600);
 }finally{lock.releaseLock();}
}
function submitVendor_(b){validateVendor_(b);if(b.photos&&!Array.isArray(b.photos))throw Error('Invalid photos');if((b.photos||[]).length>10)throw Error('Maximum 10 photos allowed');[b.logo,...(b.photos||[])].forEach(validateImage_);checkDevSubmissionLimit_(b.mobile);const s=getSheet_(),id='RWG-'+Utilities.getUuid(),folder=getUploadFolder_(),now=new Date();const logo=saveFile_(folder,b.logo,id+'-logo'),photos=(Array.isArray(b.photos)?b.photos.slice(0,10):[]).map((p,i)=>saveFile_(folder,p,id+'-photo-'+(i+1))).filter(Boolean);const row=[id,b.businessName,b.ownerName,b.mobile,b.whatsapp,b.email||'',b.experience||'',b.category,b.district,b.city,b.address||'',b.serviceAreas||'',b.maps||'',b.about||'',b.services,b.startingPrice||'',b.languages||'',b.specialities||'',b.instagram||'',b.website||'',b.facebook||'',b.portfolio||'',logo,photos.join('\n'),Utilities.formatDate(now,'Asia/Kolkata','yyyy-MM-dd HH:mm:ss'),'Pending Approval',b.notes||''];const h=s.getRange(1,1,1,s.getLastColumn()).getDisplayValues()[0],v=rowObject_(HEADERS,row);s.appendRow(h.map(k=>safeCell_(v[k]||'')));SpreadsheetApp.flush();return json_({ok:true,id,status:'Pending Approval'});}
function getApprovalExecutionAuditSheet_(){

  const ss=getSpreadsheet_();

  let s=ss.getSheetByName(APPROVAL_EXEC_AUDIT_SHEET_NAME);

  if(!s)s=ss.insertSheet(APPROVAL_EXEC_AUDIT_SHEET_NAME);

  const h=['Request ID','Submission ID','Requested Status','Admin Email','Start UTC','Lock Acquired UTC','Lock Wait MS','End UTC','Duration MS','Outcome','Publication State','Error'];

  if(!s.getLastRow()){

    s.getRange(1,1,1,h.length).setValues([h]).setFontWeight('bold').setBackground('#c7a15a');

    s.setFrozenRows(1);

  }else{

    const existing=s.getRange(1,1,1,h.length).getDisplayValues()[0];

    if(h.some((v,i)=>v!==existing[i]))throw Error('Approval Execution Audit header mismatch');

  }

  return s;

}

function writeApprovalExecutionAudit_(record){

  const s=getApprovalExecutionAuditSheet_();

  s.appendRow([

    record.requestId,record.submissionId,record.requestedStatus,record.adminEmail,

    record.startUtc,record.lockAcquiredUtc,record.lockWaitMs,

    record.endUtc,record.durationMs,record.outcome,record.publicationState,

    safeCell_(record.error)

  ]);

  SpreadsheetApp.flush();

}

function updateStatus_(b,a){

  const startedAt=new Date(),startMs=Date.now(),requestId=Utilities.getUuid();

  const record={

    requestId,submissionId:String(b.id||'').trim(),

    requestedStatus:String(b.status||'').trim(),adminEmail:String((a&&a.email)||''),

    startUtc:startedAt.toISOString(),lockAcquiredUtc:'',lockWaitMs:'',

    endUtc:'',durationMs:0,outcome:'Failed',publicationState:'',error:''

  };

  let lock=null,locked=false,result=null;

  try{

    lock=LockService.getScriptLock();

    const lockStartMs=Date.now();

    lock.waitLock(30000);

    locked=true;

    record.lockAcquiredUtc=new Date().toISOString();

    record.lockWaitMs=Date.now()-lockStartMs;

    try{

      result=JSON.parse(updateStatusLocked_(b,a).getContent());

    }finally{

      if(locked){lock.releaseLock();locked=false;}

    }

    record.outcome=result.ok?'Approved action completed':'Rejected action / validation failure';

    if(result.ok){

      try{

        result.publication=requestDevPublication_();

        record.publicationState=String(result.publication.state||'unknown');

      }catch(pubError){

        record.publicationState='failed';

        record.error='Publication dispatch failed: '+String(pubError);

        result.publication={state:'failed'};

      }

    }else record.error=String(result.error||'Request was not applied');

  }catch(err){

    record.outcome='Failed';

    record.error=String(err);

    result={ok:false,error:String(err)};

  }finally{

    if(locked){try{lock.releaseLock();}catch(ignore){}}

    record.endUtc=new Date().toISOString();

    record.durationMs=Date.now()-startMs;

    try{writeApprovalExecutionAudit_(record);}

    catch(auditError){

      // Fail visibly: a successful approval without an audit trail must not be silent.

      Logger.log('Approval audit write failed for request '+requestId+': '+String(auditError));

      if(result)result.audit={state:'failed',requestId};

    }

  }

  result.requestId=requestId;

  if(!result.audit)result.audit={state:'recorded',requestId};

  return json_(result);

}

function updateStatusLocked_(b,a){
 if(!a||!a.ok||String(a.email).toLowerCase()!==AUTHORIZED_ADMIN_EMAIL)return json_({ok:false,error:'Unauthorized admin.'});
 const id=String(b.id||'').trim(),status=String(b.status||'').trim(),note=String(b.note||'').trim();
 if(!id)return json_({ok:false,error:'Submission ID missing'});
 if(!['Approved','Rejected','Edit Required'].includes(status))return json_({ok:false,error:'Invalid admin status'});
 const s=getSheet_(),data=s.getDataRange().getDisplayValues(),h=data[0],idCol=h.indexOf('Submission ID');
 const i=data.findIndex((r,n)=>n>0&&String(r[idCol]).trim()===id);if(i<0)return json_({ok:false,error:'Submission not found'});
 const v=rowObject_(h,data[i]);let slug=String(v.Slug||'');
 if(status==='Approved'){
 validateVendor_({businessName:v['Business Name'],ownerName:v['Owner Name'],mobile:v.Mobile,whatsapp:v.WhatsApp,category:v.Category,district:v.District,city:v.City,services:v.Services});
 const all=data.slice(1).map(r=>rowObject_(h,r));if(slug&&all.some(x=>x['Submission ID']!==id&&x.Slug===slug))throw Error('Duplicate stored slug');
 if(!slug){const base=(slugify_(v['Business Name'])+'-'+slugify_(v.City)).slice(0,160).replace(/-+$/,'');slug=base;const used=new Set(all.filter(x=>x['Submission ID']!==id).map(x=>x.Slug));let n=2;while(used.has(slug))slug=base+'-'+n++;let col=h.indexOf('Slug')+1;if(!col){col=h.length+1;s.getRange(1,col).setValue('Slug');}s.getRange(i+1,col).setValue(slug);}
 }
 s.getRange(i+1,getHeaderColumn_(s,'Status')).setValue(status);s.getRange(i+1,getHeaderColumn_(s,'Review Notes')).setValue(safeCell_(note));SpreadsheetApp.flush();writeAuditLog_({vendorId:id,action:status,note,adminEmail:a.email,adminGoogleId:a.sub});return json_({ok:true,id,status,slug,profilePath:slug?'vendors/'+slug+'/':'',admin:a.email});
}
function writeAuditLog_(e){getAuditSheet_().appendRow([Utilities.formatDate(new Date(),'Asia/Kolkata','yyyy-MM-dd HH:mm:ss'),e.vendorId||'',e.action||'',safeCell_(e.note||''),e.adminEmail||'',e.adminGoogleId||'']);SpreadsheetApp.flush();}
function getUploadFolder_(){const f=DriveApp.getFoldersByName(PHOTO_FOLDER_NAME);return f.hasNext()?f.next():DriveApp.createFolder(PHOTO_FOLDER_NAME);}
function validateImage_(f){if(!f||!f.data)return null;const mime=f.type||'image/jpeg';if(!['image/jpeg','image/png','image/webp'].includes(mime))throw Error('Unsupported image type');const base64=String(f.data).split(',').pop();if(base64.length>4*Math.ceil(200*1024/3))throw Error('Image exceeds 200 KB limit');const bytes=Utilities.base64Decode(base64);if(!bytes.length||bytes.length>200*1024)throw Error('Image exceeds 200 KB limit');return {mime,bytes};}
function saveFile_(folder,f,name){const image=validateImage_(f);if(!image)return '';const file=folder.createFile(Utilities.newBlob(image.bytes,image.mime,name+mimeExtension_(image.mime)));file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);return 'https://drive.google.com/thumbnail?id='+encodeURIComponent(file.getId())+'&sz=w1600';}
function mimeExtension_(m){return {'image/png':'.png','image/webp':'.webp','image/gif':'.gif'}[m]||'.jpg';}
function rowObject_(h,r){const v={};h.forEach((k,i)=>v[k]=r[i]||'');return v;}
function json_(v){return ContentService.createTextOutput(JSON.stringify(v)).setMimeType(ContentService.MimeType.JSON);}
function slugify_(s){return String(s||'').normalize('NFKD').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'vendor';}
function safeCell_(v){const s=String(v||'');return /^[=+@-]/.test(s)?"'"+s:s;}
function validateVendor_(v){for(const k of ['businessName','ownerName','category','district','city','services'])if(!String(v[k]||'').trim())throw Error('Required field missing: '+k);for(const k of ['mobile','whatsapp'])if(!/^(?:91)?[6-9][0-9]{9}$/.test(String(v[k]||'').replace(/\D/g,'')))throw Error('Invalid phone: '+k);const c=JSON.parse(RWG_CATALOG_JSON);if(!c.locations[v.district]||!c.locations[v.district].includes(v.city))throw Error('Invalid district/city');if(!c.categories.some(x=>x[0]===v.category))throw Error('Invalid category');}
function publicVendor_(v){const hidden=['Owner Name','Email','Review Notes','Registration Date'],out={};Object.keys(v).filter(k=>!hidden.includes(k)).forEach(k=>out[k]=v[k]);return out;}
const RWG_CATALOG_JSON=JSON.stringify({locations:{"Ajmer":["Ajmer","Kishangarh","Nasirabad","Pushkar","Kekri","Sarwar"],"Alwar":["Alwar","Rajgarh","Ramgarh","Thanagazi","Laxmangarh"],"Balotra":["Balotra","Pachpadra","Siwana","Samdari"],"Banswara":["Banswara","Kushalgarh","Bagidora","Ghatol","Garhi"],"Baran":["Baran","Anta","Atru","Chhabra","Mangrol","Shahbad"],"Barmer":["Barmer","Chohtan","Dhorimanna","Gudamalani","Sheo"],"Beawar":["Beawar","Masuda","Vijaynagar","Raipur","Jaitaran"],"Bharatpur":["Bharatpur","Bayana","Nadbai","Weir","Roopwas"],"Bhilwara":["Bhilwara","Shahpura","Asind","Mandal","Mandalgarh","Jahazpur","Gulabpura"],"Bikaner":["Bikaner","Nokha","Deshnoke","Lunkaransar","Kolayat","Khajuwala"],"Bundi":["Bundi","Lakheri","Keshoraipatan","Nainwa","Hindoli","Indragarh"],"Chittorgarh":["Chittorgarh","Nimbahera","Kapasan","Begun","Rawatbhata","Bari Sadri"],"Churu":["Churu","Ratangarh","Sujangarh","Sardarshahar","Taranagar","Rajgarh"],"Dausa":["Dausa","Bandikui","Lalsot","Mahwa","Sikrai"],"Deeg":["Deeg","Kaman","Nagar","Kumher","Pahari"],"Dholpur":["Dholpur","Bari","Rajakhera","Baseri"],"Didwana-Kuchaman":["Didwana","Kuchaman City","Ladnun","Makrana","Parbatsar","Nawa"],"Dungarpur":["Dungarpur","Sagwara","Aspur","Simalwara"],"Hanumangarh":["Hanumangarh","Nohar","Bhadra","Pilibanga","Sangaria","Rawatsar"],"Jaipur":["Jaipur","Chomu","Sambhar","Phulera","Shahpura","Jobner","Dudu","Kishangarh Renwal"],"Jaisalmer":["Jaisalmer","Pokaran","Fatehgarh"],"Jalore":["Jalore","Bhinmal","Sanchore","Raniwara","Ahore"],"Jhalawar":["Jhalawar","Bhawani Mandi","Jhalrapatan","Aklera","Khanpur","Manohar Thana"],"Jhunjhunu":["Jhunjhunu","Nawalgarh","Chirawa","Pilani","Khetri","Mandawa","Udaipurwati"],"Jodhpur":["Jodhpur","Bilara","Pipar City","Bhopalgarh","Osian"],"Karauli":["Karauli","Hindaun","Todabhim","Sapotra"],"Khairthal-Tijara":["Khairthal","Tijara","Bhiwadi","Kishangarh Bas","Mundawar"],"Kota":["Kota","Ramganj Mandi","Sangod","Itawa"],"Kotputli-Behror":["Kotputli","Behror","Neemrana","Bansur","Viratnagar","Paota"],"Nagaur":["Nagaur","Merta City","Degana","Jayal","Khinvsar"],"Pali":["Pali","Sojat","Bali","Sumerpur","Marwar Junction","Desuri"],"Phalodi":["Phalodi","Lohawat","Dechu","Bap"],"Pratapgarh":["Pratapgarh","Chhoti Sadri","Arnod","Dhariawad"],"Rajsamand":["Rajsamand","Nathdwara","Amet","Deogarh","Bhim","Kumbhalgarh"],"Salumber":["Salumber","Sarada","Semari","Jhallara","Lasadiya"],"Sawai Madhopur":["Sawai Madhopur","Gangapur City","Bonli","Chauth Ka Barwara"],"Sikar":["Sikar","Fatehpur","Neem Ka Thana","Sri Madhopur","Lachhmangarh","Reengus"],"Sirohi":["Sirohi","Abu Road","Mount Abu","Pindwara","Sheoganj"],"Sri Ganganagar":["Sri Ganganagar","Suratgarh","Raisinghnagar","Sri Karanpur","Sadulshahar","Anupgarh"],"Tonk":["Tonk","Malpura","Niwai","Deoli","Todaraisingh","Uniara"],"Udaipur":["Udaipur","Fatehnagar","Bhinder","Gogunda","Kherwara","Mavli"]},categories:[["Wedding Venues","wedding-venues"],["Photographers & Films","photographers-films"],["Makeup Artists","makeup-artists"],["Decorators & Tent House","decorators-tent-house"],["Wedding Planners","wedding-planners"],["Caterers","caterers"],["Mehendi Artists","mehendi-artists"],["DJ & Entertainment","dj-entertainment"],["Anchors & Emcees","anchors-emcees"],["Wedding Rental Dresses","wedding-rental-dresses"],["Bridal Wear","bridal-wear"],["Groom Wear","groom-wear"],["Band, Dhol & Ghodi","band-dhol-ghodi"],["Pandit & Wedding Priest","pandit-wedding-priest"],["Other Wedding Service","other-wedding-service"]]});

function requestDevPublication_(){
 try{
  const p=PropertiesService.getScriptProperties();
  if(p.getProperty('RWG_ENV')!=='dev')return {state:'blocked_environment'};
  const token=p.getProperty('DEV_PUBLISH_GITHUB_TOKEN');
  if(!token)return {state:'not_configured'};
  if(ScriptApp.getScriptId()!=='1ET6cuL8kKoH4z-z1nGEg1_DzvCw6KKJsS_4f2Pw0JtAYp9H1CKcV7BBo')return {state:'blocked_project'};
  const response=UrlFetchApp.fetch('https://api.github.com/repos/chitranshcolorlab/rajasthan-wedding-guide-dev/actions/workflows/vendor-publisher.yml/dispatches',{
   method:'post',contentType:'application/json',headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2026-03-10'},
   payload:JSON.stringify({ref:'dev/automatic-vendor-system'}),muteHttpExceptions:true,followRedirects:false
  });
  const code=response.getResponseCode();
  return code===200||code===204?{state:'queued'}:{state:'failed',httpStatus:code};
 }catch(e){return {state:'failed'};}
}
function retryDevPublication(){const result=requestDevPublication_();Logger.log('DEV publisher request: '+result.state);return result;}

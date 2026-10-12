'use strict';
const registrationForm = document.getElementById('vendorForm');
const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const uploadImageLimit = 200 * 1024;
function blobData(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({type: blob.type, data: reader.result, sizeBytes: blob.size});
    reader.onerror = () => reject(new Error('Could not read the compressed image.'));
    reader.readAsDataURL(blob);
  });
}
async function readBusinessImage(file) {
  if (!imageTypes.has(file.type)) throw new Error('Please choose JPG, PNG or WebP images.');
  if (file.size > 20 * 1024 * 1024) throw new Error('Please choose an original image smaller than 20 MB.');
  const url = URL.createObjectURL(file), image = new Image();
  try {
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () => reject(new Error('This image could not be opened. Please choose another image.'));
      image.src = url;
    });
    if (!image.naturalWidth || !image.naturalHeight) throw new Error('Invalid image.');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Image compression is unavailable in this browser.');
    let edge = Math.min(1600, Math.max(image.naturalWidth, image.naturalHeight));
    while (true) {
      const scale = Math.min(1, edge / Math.max(image.naturalWidth, image.naturalHeight));
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      for (const quality of [0.85, 0.75, 0.65, 0.55]) {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', quality));
        if (!blob) throw new Error('Could not compress this image.');
        if (blob.size <= uploadImageLimit) return blobData(blob);
      }
      if (edge <= 320) throw new Error('Could not reduce this image to 200 KB. Please choose another image.');
      edge = Math.max(320, Math.floor(edge * 0.75));
    }
  } finally { URL.revokeObjectURL(url); }
}
// Model 2+: persist a free registration before offering an optional paid upgrade.
registrationForm.addEventListener('submit',async function(event){
 event.preventDefault();
 const button=this.querySelector('.submit'),message=document.getElementById('success'),upgrade=document.getElementById('upgrade');
 const data=new FormData(this);
 const payload={action:'register-basic'};
 for(const key of ['businessName','ownerName','mobile','category','district','city'])payload[key]=String(data.get(key)||'').trim();
 message.style.display='none';upgrade.hidden=true;
 if(!/^[6-9][0-9]{9}$/.test(payload.mobile.replace(/\\D/g,''))){message.textContent='Please enter a valid 10-digit mobile number.';message.style.display='block';return;}
 button.disabled=true;button.textContent='Saving your free registration...';
 try{
  if(!WEB_APP_URL)throw Error('DEV backend is not configured.');
  const response=await fetch(WEB_APP_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
  if(!response.ok)throw Error('Registration request failed.');
  const result=await response.json();
  if(!result.ok)throw Error(result.error||'Registration could not be saved.');
  if(result.resumeToken){const creds={id:result.id,token:result.resumeToken};sessionStorage.setItem('rwg_dev_resume',JSON.stringify(creds));history.replaceState(null,'',location.pathname+location.search+'#resume='+encodeURIComponent(creds.id)+'.'+encodeURIComponent(creds.token));document.getElementById('copyResume').hidden=false;}
  message.textContent='Free registration saved. Vendor ID: '+result.id+'. Status: '+result.status+'. Complete your profile before approval.';
  message.style.display='block';upgrade.hidden=false;
  document.getElementById('upgradeStatus').textContent=result.alreadyRegistered?'Existing registration found. No duplicate was created.':'No payment required. Featured checkout is not enabled yet.';
  upgrade.scrollIntoView({behavior:'smooth',block:'start'});
 }catch(error){message.textContent=error.message||'Could not save registration. Please retry.';message.style.display='block';}
 finally{button.disabled=false;button.textContent='Save Free Registration & Continue';}
});
document.getElementById('continueFree').addEventListener('click',()=>{
 document.getElementById('upgradeStatus').textContent='Your free registration is saved. Full profile completion is required before admin approval. Please keep your Vendor ID.';
});

document.getElementById('completeForm').addEventListener('submit',async function(event){
 event.preventDefault();
 const status=document.getElementById('completeStatus'),button=this.querySelector('button[type=submit]');
 let credentials;
 try{credentials=JSON.parse(sessionStorage.getItem('rwg_dev_resume')||'null');}catch{}
 if(!credentials?.id||!credentials?.token){status.textContent='Secure resume access is unavailable in this tab. Please use the original registration session; do not register again.';return;}
 const data=new FormData(this),payload={action:'complete-profile',id:credentials.id,resumeToken:credentials.token};
 for(const key of ['services','whatsapp','about','address','serviceAreas','instagram','website'])payload[key]=String(data.get(key)||'').trim();
 const ownerFile=data.get('ownerPhoto');
 if(!ownerFile||!ownerFile.size){status.textContent='Please upload your own photo.';return;}
 if(payload.services.length>100){status.textContent='Description must be 100 characters or fewer.';return;}
 button.disabled=true;button.textContent='Saving profile...';status.textContent='';
 try{
  payload.ownerPhoto=await readBusinessImage(ownerFile);
  const response=await fetch(WEB_APP_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
  if(!response.ok)throw Error('Network error');
  const result=await response.json();if(!result.ok)throw Error(result.error||'Profile completion failed');
  status.textContent='Profile submitted for admin approval. Vendor ID: '+result.id+'.';
  button.disabled=true;button.textContent='Submitted for Admin Approval';
 }catch(error){status.textContent=error.message||'Please retry';button.disabled=false;button.textContent='Submit Profile for Admin Approval';}
});

(function restoreSecureResume(){
 const match=location.hash.match(/^#resume=(RWG-[a-f0-9-]{36})\.([a-f0-9-]{72})$/i);
 if(!match)return;
 sessionStorage.setItem('rwg_dev_resume',JSON.stringify({id:match[1],token:match[2]}));
 document.getElementById('upgrade').hidden=false;
 document.getElementById('copyResume').hidden=false;
 document.getElementById('upgradeStatus').textContent='Secure resume link restored. Complete your profile below.';
})();
document.getElementById('copyResume').addEventListener('click',async()=>{
 const status=document.getElementById('upgradeStatus');
 try{await navigator.clipboard.writeText(location.href);status.textContent='Private resume link copied. Keep it safe; anyone with this link can edit your unfinished profile.';}
 catch{status.textContent='Copy the full URL from your browser address bar and keep it private.';}
});

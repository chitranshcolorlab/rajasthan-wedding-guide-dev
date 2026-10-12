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
const mobileInput=registrationForm.querySelector('[name="mobile"]');
const whatsappInput=registrationForm.querySelector('[name="whatsapp"]');
const sameWhatsApp=document.getElementById('sameWhatsApp');
function syncWhatsApp(){if(sameWhatsApp.checked)whatsappInput.value=mobileInput.value;}
sameWhatsApp.addEventListener('change',syncWhatsApp);
mobileInput.addEventListener('input',syncWhatsApp);
registrationForm.addEventListener('submit',async function(event){
 event.preventDefault();
 const button=this.querySelector('.submit'),message=document.getElementById('success'),data=new FormData(this);
 const payload={action:'register-basic'};
 for(const key of ['businessName','ownerName','mobile','whatsapp','category','district','city','services'])payload[key]=String(data.get(key)||'').trim();
 message.style.display='block';
 if(!/^[6-9][0-9]{9}$/.test(payload.mobile)||!/^[6-9][0-9]{9}$/.test(payload.whatsapp)){message.textContent='Enter valid 10-digit mobile and WhatsApp numbers.';return;}
 if(!payload.services||payload.services.length>100){message.textContent='Description must be 1–100 characters.';return;}
 if(!data.get('photoConsent')){message.textContent='Photo publication consent is required.';return;}
 button.disabled=true;button.textContent='Submitting...';
 try{
  if(!WEB_APP_URL)throw Error('DEV backend is not configured.');
  const file=data.get('ownerPhoto');
  if(!file||!file.size)throw Error('Please select one owner photo.');
  payload.ownerPhoto=await readBusinessImage(file);
  const response=await fetch(WEB_APP_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
  if(!response.ok)throw Error('Registration request failed.');
  const result=await response.json();
  if(!result.ok)throw Error(result.error||'Registration failed.');
  message.textContent=result.alreadyRegistered?'This business is already registered. Vendor ID: '+result.id:'Registration submitted. Vendor ID: '+result.id+'. Status: '+result.status+'. Admin approval is pending.';
  if(!result.alreadyRegistered)this.reset();
 }catch(error){message.textContent=error.message||'Could not submit registration.';}
 finally{button.disabled=false;button.textContent='Submit Free Registration';}
});

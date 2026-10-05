'use strict';
const registrationForm = document.getElementById('vendorForm');
const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const uploadImageLimit = 200 * 1024;
function blobData(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({type: blob.type, data: reader.result});
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
registrationForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  const button = this.querySelector('.submit'), message = document.getElementById('success');
  const data = new FormData(this), payload = {action: 'submit'};
  message.style.display = 'none';
  for (const key of ['businessName','ownerName','mobile','whatsapp','category','district','city','services','maps','email','experience','address','serviceAreas','about','startingPrice','languages','specialities','instagram','website','facebook','portfolio']) payload[key] = String(data.get(key) || '').trim();
  button.disabled = true; button.textContent = 'SUBMITTING...';
  try {
    const photos = Array.from(this.elements.photos.files), logo = this.elements.logo.files[0];
    if (photos.length > 10) throw new Error('Please choose no more than 10 business photos.');
    // Validate every selection before reading or submitting any file.
    for (const file of [...photos, ...(logo ? [logo] : [])]) {
      if (!imageTypes.has(file.type)) throw new Error('Please choose JPG, PNG or WebP images.');
      if (file.size > 20 * 1024 * 1024) throw new Error('Please choose an original image smaller than 20 MB.');
    }
    button.textContent = 'COMPRESSING PHOTOS...';
    payload.logo = logo ? await readBusinessImage(logo) : null;
    payload.photos = [];
    for (const photo of photos) payload.photos.push(await readBusinessImage(photo));
    if (!WEB_APP_URL) throw new Error('Isolated DEV backend is not configured.');
    button.textContent = 'UPLOADING...';
    const response = await fetch(WEB_APP_URL, {method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'}, body:JSON.stringify(payload)});
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || 'Submission failed.');
    message.textContent = 'Submitted for review. Submission ID: ' + result.id + '. Status: Pending Approval.';
    message.style.display = 'block'; this.reset();
    document.getElementById('district').dispatchEvent(new Event('change'));
  } catch (error) {
    message.textContent = error.message || 'Submission failed. Please try again.';
    message.style.display = 'block';
  } finally { button.disabled = false; button.textContent = 'SUBMIT DEVELOPMENT TEST'; }
});

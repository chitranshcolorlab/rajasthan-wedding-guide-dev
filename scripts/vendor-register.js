'use strict';
const registrationForm = document.getElementById('vendorForm');
const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
function readBusinessImage(file) {
  if (!imageTypes.has(file.type)) throw new Error('Please choose JPG, PNG, WebP or GIF images.');
  if (file.size > 5 * 1024 * 1024) throw new Error('Each image must be 5 MB or smaller.');
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({type: file.type, data: reader.result});
    reader.onerror = () => reject(new Error('Could not read the selected image. Please select it again.'));
    reader.readAsDataURL(file);
  });
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
      if (!imageTypes.has(file.type)) throw new Error('Please choose JPG, PNG, WebP or GIF images.');
      if (file.size > 5 * 1024 * 1024) throw new Error('Each image must be 5 MB or smaller.');
    }
    payload.logo = logo ? await readBusinessImage(logo) : null;
    payload.photos = await Promise.all(photos.map(readBusinessImage));
    if (!WEB_APP_URL) throw new Error('Isolated DEV backend is not configured.');
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

'use strict';
(async()=>{
 const root=document.getElementById('v');if(!root)return;
 try{
  const script=document.querySelector('script[data-rwg-category]');
  const response=await fetch(new URL('../approved-vendors.json',script.src),{cache:'no-store'});
  if(!response.ok)throw Error('Publisher data unavailable');
  const data=await response.json(),n=s=>String(s||'').trim().toLowerCase();
  const vendors=data.items.filter(v=>v.Status==='Approved'&&n(v.District)===n(script.dataset.district)&&n(v.City)===n(script.dataset.city)&&n(v.Category)===n(script.dataset.category));
  root.replaceChildren();
  for(const v of vendors){
   if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v.Slug))throw Error('Invalid slug');
   const card=document.createElement('article');card.className='card';
   const title=document.createElement('h3');title.textContent=v['Business Name'];
   const desc=document.createElement('p');desc.textContent=v.Services;
   const link=document.createElement('a');link.href=new URL('../vendors/'+v.Slug+'/',script.src).href;link.textContent='View Profile →';
   card.append(title,desc,link);root.append(card);
  }
  if(!vendors.length)root.textContent='No approved vendors listed yet.';
 }catch(e){root.textContent='Vendor listing is temporarily unavailable.';console.error(e.message)}
})();

const list=document.querySelector('#tasks');
list.addEventListener('change',e=>{if(e.target.type==='checkbox')e.target.parentElement.classList.toggle('done',e.target.checked)});
document.querySelector('#complete').onclick=e=>{e.target.textContent='Completed ✓';e.target.disabled=true};
document.querySelector('#theme').onclick=()=>document.body.classList.toggle('dark');
document.querySelector('#add').onclick=()=>{const text=prompt('New study task');if(!text)return;const li=document.createElement('li');li.innerHTML='<input type="checkbox"> <span></span><small>Flexible</small>';li.querySelector('span').textContent=text;list.append(li)};
const header=document.querySelector('header');
const focus=document.querySelector('#plan');
const metrics=document.querySelector('.metrics');
const columns=document.querySelector('.columns');
const tasksPanel=columns.querySelector('.panel:first-child');
const revision=document.querySelector('#revision');
const resources=document.querySelector('#resources');
const navLinks=document.querySelectorAll('aside a');
const baseBlocks=[header,focus,metrics,columns,resources];
function showView(hash){
  if(!['#overview','#plan','#progress','#revision','#resources'].includes(hash))hash='#overview';
  baseBlocks.forEach(block=>block.style.display='none');
  tasksPanel.style.display='none';
  revision.style.display='none';
  if(hash==='#overview'||hash==='#progress'){header.style.display='flex';metrics.style.display='grid'}
  if(hash==='#plan'){focus.style.display='flex';columns.style.display='block';tasksPanel.style.display='block'}
  if(hash==='#revision'){columns.style.display='block';revision.style.display='block'}
  if(hash==='#resources'){resources.style.display='flex'}
  navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===hash));
}
navLinks.forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const hash=link.getAttribute('href');history.replaceState(null,'',hash);showView(hash);window.scrollTo({top:0,behavior:'smooth'})}));
showView(window.location.hash);
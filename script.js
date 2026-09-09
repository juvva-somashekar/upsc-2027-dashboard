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
  baseBlocks.forEach(block=>block.style.display='none');tasksPanel.style.display='none';revision.style.display='none';
  if(hash==='#overview'||hash==='#progress'){header.style.display='flex';metrics.style.display='grid'}
  if(hash==='#plan'){focus.style.display='flex';columns.style.display='block';tasksPanel.style.display='block'}
  if(hash==='#revision'){columns.style.display='block';revision.style.display='block'}
  if(hash==='#resources'){resources.style.display='flex'}
  navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===hash));
}
navLinks.forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const hash=link.getAttribute('href');history.replaceState(null,'',hash);showView(hash);window.scrollTo({top:0,behavior:'smooth'})}));
const targetStyle=document.createElement('style');
targetStyle.textContent='.target-button{display:block;margin-top:16px;background:#28755e;color:#fff;border-radius:7px;padding:9px 13px;font-weight:700;font-size:12px}.target-modal{position:fixed;inset:0;background:#18332daa;display:grid;place-items:center;padding:20px;z-index:5}.target-card{background:#fffdf8;color:#18332d;width:min(400px,100%);border-radius:14px;padding:24px;box-shadow:0 20px 50px #0005}.target-card h2{font-family:Georgia,serif;margin:0 0 7px}.target-card p{color:#697a74;line-height:1.5}.target-card label{display:grid;gap:6px;margin:16px 0;font-weight:600;font-size:13px}.target-card input{padding:10px;border:1px solid #d9d8d0;border-radius:7px;font:inherit}.target-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:20px}.target-actions button{padding:9px 12px;border-radius:7px;font-weight:700}.save-targets{background:#28755e;color:#fff}.cancel-targets{border:1px solid #d9d8d0!important}';
document.head.append(targetStyle);
const targetButton=document.createElement('button');
targetButton.className='target-button';targetButton.textContent='Set targets';
header.querySelector('div').append(targetButton);
const progressArticle=metrics.querySelector('article:nth-child(2)');
const mcqArticle=metrics.querySelector('article:nth-child(3)');
function getTargets(){return JSON.parse(localStorage.getItem('upscTargets')||'{"weekly":24,"mcqs":500}')}
function renderTargets(){const targets=getTargets();progressArticle.querySelector('b').innerHTML=`18.5 <small>/ ${targets.weekly} hrs</small>`;progressArticle.querySelector('u').style.width=`${Math.min(100,(18.5/targets.weekly)*100)}%`;mcqArticle.querySelector('b').innerHTML=`340 <small>/ ${targets.mcqs} MCQs</small>`}
function openTargets(){const targets=getTargets();const modal=document.createElement('div');modal.className='target-modal';modal.innerHTML=`<form class="target-card"><h2>Set your targets</h2><p>Choose goals that match your own UPSC preparation plan.</p><label>Weekly study hours<input required min="1" max="168" name="weekly" type="number" value="${targets.weekly}"></label><label>Monthly MCQs<input required min="1" name="mcqs" type="number" value="${targets.mcqs}"></label><div class="target-actions"><button class="cancel-targets" type="button">Cancel</button><button class="save-targets" type="submit">Save targets</button></div></form>`;document.body.append(modal);modal.querySelector('.cancel-targets').onclick=()=>modal.remove();modal.querySelector('form').onsubmit=event=>{event.preventDefault();const values=new FormData(event.currentTarget);localStorage.setItem('upscTargets',JSON.stringify({weekly:Number(values.get('weekly')),mcqs:Number(values.get('mcqs'))}));renderTargets();modal.remove()}}
targetButton.onclick=openTargets;
renderTargets();showView(window.location.hash);
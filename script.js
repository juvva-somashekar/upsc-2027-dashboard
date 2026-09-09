const list=document.querySelector('#tasks');
list.addEventListener('change',e=>{if(e.target.type==='checkbox')e.target.parentElement.classList.toggle('done',e.target.checked)});
document.querySelector('#complete').onclick=e=>{e.target.textContent='Completed ✓';e.target.disabled=true};
document.querySelector('#theme').onclick=()=>document.body.classList.toggle('dark');
document.querySelector('#add').onclick=()=>{const text=prompt('New study task');if(!text)return;const li=document.createElement('li');li.innerHTML='<input type="checkbox"> <span></span><small>Flexible</small>';li.querySelector('span').textContent=text;list.append(li)};

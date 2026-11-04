// Tabs
const tabs=document.querySelectorAll('.tabs button');
tabs.forEach(b=>b.addEventListener('click',()=>{
  tabs.forEach(x=>x.setAttribute('aria-selected',x===b));
  ['projects','certs','stack'].forEach(id=>document.getElementById(id).hidden=id!==b.dataset.t);
}));
// Tech stack
const st=['Python','JavaScript','Git','HTML','CSS','Figma'];
document.getElementById('stack').innerHTML=st.map(s=>`<div class="card"><i>${s.slice(0,2)}</i>${s}</div>`).join('');
// Tech stack: tilt on hover, pop on click
document.querySelectorAll('#stack .card').forEach(c=>{
  const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  c.addEventListener('pointermove',e=>{
    if(calm)return;
    const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
    c.style.transform=`perspective(500px) rotateX(${-py*18}deg) rotateY(${px*18}deg) translateY(-4px)`;
  });
  c.addEventListener('pointerleave',()=>{c.style.transform=''});
  c.addEventListener('click',()=>{c.classList.remove('pop');void c.offsetWidth;c.classList.add('pop')});
});
// Certificate viewer
const modal=document.getElementById('modal'),mi=document.getElementById('mimg'),mt=document.getElementById('mtxt');
function closeModal(){modal.hidden=true;document.body.style.overflow=''}
document.querySelectorAll('.cert').forEach(c=>{
  const open=()=>{
    const img=c.querySelector('img');
    if(img){mi.src=img.src;mi.alt=img.alt;mi.hidden=false;mt.hidden=true}
    else{mi.hidden=true;mt.hidden=false;mt.textContent='Add this certificate image to the images folder to see it here.'}
    modal.hidden=false;document.body.style.overflow='hidden';
  };
  c.addEventListener('click',open);
  c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
});
modal.addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// Draggable ID card (springs back when released)
const lan=document.getElementById('lan');
if(lan){
  const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  let x=0,y=0,vx=0,vy=0,drag=false,ox=0,oy=0,t=0;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  lan.addEventListener('dragstart',e=>e.preventDefault());
  lan.addEventListener('pointerdown',e=>{drag=true;ox=e.clientX-x;oy=e.clientY-y;lan.setPointerCapture(e.pointerId)});
  lan.addEventListener('pointermove',e=>{
    if(!drag)return;
    const nx=clamp(e.clientX-ox,-180,180),ny=clamp(e.clientY-oy,-30,140);
    vx=nx-x;vy=ny-y;x=nx;y=ny;
  });
  const up=()=>{drag=false};
  lan.addEventListener('pointerup',up);lan.addEventListener('pointercancel',up);
  (function tick(){
    t+=0.016;
    if(!drag){vx+=-x*0.05;vy+=-y*0.05;vx*=0.92;vy*=0.92;x+=vx;y+=vy}
    const sway=calm?0:Math.sin(t*1.3)*1.5;
    lan.style.transform=`translate(${x}px,${y}px) rotate(${x*0.1+sway}deg)`;
    requestAnimationFrame(tick);
  })();
}

// Active nav link
const ls=document.querySelectorAll('nav .links a');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)ls.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{threshold:.5});
document.querySelectorAll('section').forEach(s=>io.observe(s));

// Typing effect
(function(){
  const el=document.getElementById('type');
  if(!el)return;
  const text=el.dataset.text;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=text;return}
  let i=0;
  (function step(){
    el.textContent=text.slice(0,i);
    if(i++<text.length)setTimeout(step,80);
  })();
})();
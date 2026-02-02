(function(){'use strict';
const h=document.getElementById('main-header');
window.addEventListener('scroll',()=>{h.classList.toggle('scrolled',window.scrollY>50);},{passive:true});

const mt=document.getElementById('mobile-menu-toggle'),mm=document.getElementById('mobile-menu'),mi=document.getElementById('menu-icon'),ci=document.getElementById('close-icon');
if(mt&&mm)mt.addEventListener('click',()=>{const o=mm.classList.contains('open');mm.classList.toggle('open');mm.style.display=o?'none':'block';mi.style.display=o?'block':'none';ci.style.display=o?'none':'block';});

const tq=document.getElementById('tab-quote'),tc=document.getElementById('tab-call'),fq=document.getElementById('form-quote'),fc=document.getElementById('form-call');
if(tq&&tc&&fq&&fc){
  tq.addEventListener('click',()=>{tq.classList.add('active','orange');tc.classList.remove('active','emerald');fq.style.display='block';fc.style.display='none';});
  tc.addEventListener('click',()=>{tc.classList.add('active','emerald');tq.classList.remove('active','orange');fc.style.display='block';fq.style.display='none';});
}

const st=document.getElementById('stores-track');
if(st){let p=0,iv=true;
  new IntersectionObserver(e=>e.forEach(x=>iv=x.isIntersecting),{threshold:0.1}).observe(st);
  (function a(){if(iv){p+=0.5;if(p>=st.scrollWidth/2)p=0;st.scrollLeft=p;}requestAnimationFrame(a);})();
}
})();

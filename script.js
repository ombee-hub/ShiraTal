// header scroll effect
const header=document.getElementById('header');
if(header){window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30));}
// mobile menu
const menu=document.getElementById('menu'),burger=document.getElementById('hamburger');
if(burger){
  burger.addEventListener('click',()=>menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
}
// reveal on scroll
const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// contact form (demo)
function sendForm(e){e.preventDefault();alert('תודה! הפרטים נשלחו בהצלחה — נחזור אליכם בהקדם 🙂');e.target.reset();return false;}

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

/* ====== ACCESSIBILITY WIDGET ====== */
(function(){
  var KEY='shiratal-a11y';
  // filter:'...' marks features combined into a single CSS filter; the rest toggle a class on <html>
  var FEATURES=[
    {key:'bigtext',     ic:'🔠', label:'טקסט גדול'},
    {key:'contrast',    ic:'🌗', label:'ניגודיות', filter:'contrast(1.5)'},
    {key:'mono',        ic:'⚫', label:'מונוכרום', filter:'grayscale(1)'},
    {key:'calm',        ic:'🌿', label:'מצב רוגע', filter:'saturate(.4)'},
    {key:'links',       ic:'🔗', label:'הדגשת קישורים'},
    {key:'readable',    ic:'🔤', label:'גופן קריא'},
    {key:'dyslexia',    ic:'Df', label:'תמיכה בדיסלקציה'},
    {key:'spacing',     ic:'↔', label:'ריווח אותיות'},
    {key:'lineheight',  ic:'↕', label:'גובה שורה'},
    {key:'align',       ic:'≣', label:'יישור טקסט'},
    {key:'hideimg',     ic:'🖼', label:'הסתרת תמונות'},
    {key:'descriptions',ic:'💬', label:'תיאורים'},
    {key:'cursor',      ic:'🖱', label:'סמן גדול'},
    {key:'noanim',      ic:'⏸', label:'עצירת הנפשות'}
  ];
  var A11Y_ICON='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 5h-6v15h-2v-7h-2v7H9V7H3V5h18v2z"/></svg>';

  var state={};
  try{ state=JSON.parse(localStorage.getItem(KEY))||{}; }catch(e){ state={}; }

  function descriptionsApply(on){
    var imgs=document.querySelectorAll('img[alt]');
    imgs.forEach(function(img){
      if(img.closest('.foot-credit')||img.closest('.a11y-panel')) return;
      var parent=img.parentNode;
      var existing=parent.querySelector('.a11y-cap');
      if(on && img.getAttribute('alt') && img.getAttribute('alt').trim()){
        if(!existing){
          var cap=document.createElement('span');
          cap.className='a11y-cap'; cap.textContent=img.getAttribute('alt');
          if(getComputedStyle(parent).position==='static') parent.style.position='relative';
          parent.appendChild(cap);
        }
      } else if(existing){ existing.remove(); }
    });
  }

  function apply(){
    var root=document.documentElement, filters=[];
    FEATURES.forEach(function(f){
      var on=!!state[f.key];
      root.classList.toggle('a11y-'+f.key, on);
      if(f.filter && on) filters.push(f.filter);
    });
    root.style.setProperty('--a11y-filter', filters.length?filters.join(' '):'none');
    descriptionsApply(!!state.descriptions);
  }
  function save(){ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }

  // build widget
  var fab=document.createElement('button');
  fab.className='a11y-fab'; fab.setAttribute('aria-label','תפריט נגישות'); fab.setAttribute('aria-haspopup','dialog');
  fab.innerHTML=A11Y_ICON;

  var overlay=document.createElement('div'); overlay.className='a11y-overlay';

  var panel=document.createElement('div');
  panel.className='a11y-panel'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','הגדרות נגישות'); panel.setAttribute('aria-modal','true');

  var btns=FEATURES.map(function(f){
    return '<button class="a11y-btn" data-k="'+f.key+'" aria-pressed="false"><span class="ic">'+f.ic+'</span><span>'+f.label+'</span></button>';
  }).join('');

  panel.innerHTML=''+
    '<div class="a11y-head"><h2>'+A11Y_ICON+' נגישות</h2><button class="a11y-close" aria-label="סגירה">✕</button></div>'+
    '<div class="a11y-body">'+
      '<div class="a11y-grid">'+btns+'</div>'+
      '<button class="a11y-reset">🔄 איפוס כל ההגדרות</button>'+
      '<div class="a11y-foot">'+
        '<a href="accessibility.html">📄 הצהרת נגישות</a>'+
        '<a href="privacy.html">🔒 מדיניות פרטיות</a>'+
      '</div>'+
    '</div>';

  document.body.appendChild(fab);
  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  // size the header icon (keep small)
  var headSvg=panel.querySelector('.a11y-head svg');
  if(headSvg){ headSvg.setAttribute('width','22'); headSvg.setAttribute('height','22'); headSvg.style.fill='#fff'; }

  function refreshButtons(){
    panel.querySelectorAll('.a11y-btn').forEach(function(b){
      var on=!!state[b.getAttribute('data-k')];
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on?'true':'false');
    });
  }
  function open(){ overlay.classList.add('open'); panel.classList.add('open'); }
  function close(){ overlay.classList.remove('open'); panel.classList.remove('open'); }

  fab.addEventListener('click', open);
  overlay.addEventListener('click', close);
  panel.querySelector('.a11y-close').addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });

  panel.querySelectorAll('.a11y-btn').forEach(function(b){
    b.addEventListener('click', function(){
      var k=b.getAttribute('data-k');
      state[k]=!state[k];
      apply(); save(); refreshButtons();
    });
  });
  panel.querySelector('.a11y-reset').addEventListener('click', function(){
    state={}; apply(); save(); refreshButtons();
  });

  apply(); refreshButtons();
})();

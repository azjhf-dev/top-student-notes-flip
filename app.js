(function(){
const book=document.getElementById('book'),N=PAGES.length;
const NS='http://www.w3.org/2000/svg';
const pct=(v,t)=>(v/t*100).toFixed(3)+'%';
const svgWrap=(inner,vb,cls)=>`<svg viewBox="${vb}" preserveAspectRatio="none" class="${cls||''}">${inner}</svg>`;
const leaves=[];
PAGES.forEach((p,i)=>{
  const leaf=document.createElement('div');leaf.className='leaf';
  const notes=svgWrap((i===0?defs:'')+p.notes(),'0 0 300 430');
  let win='';
  if(p.win){const w=p.win,x1=w.x/300*100,x2=(w.x+w.w)/300*100,y1=w.y/430*100,y2=(w.y+w.h)/430*100;
    const rect=`left:${pct(w.x,300)};top:${pct(w.y,430)};width:${pct(w.w,300)};height:${pct(w.h,430)}`;
    win=`<div class="under" style="${rect}">${svgWrap(p.under,`0 0 ${w.w} ${w.h}`)}</div>
    <div class="sheet" style="clip-path:polygon(evenodd,0 0,100% 0,100% 100%,0 100%,0 0,${x1}% ${y1}%,${x1}% ${y2}%,${x2}% ${y2}%,${x2}% ${y1}%,${x1}% ${y1}%)">${notes}</div>
    <div class="flap" style="${rect}">${svgWrap(p.flap,`0 0 ${w.w} ${w.h}`)}</div>`;
  } else win=`<div class="sheet">${notes}</div>`;
  leaf.innerHTML=`<div class="face front"><div class="paper"></div>${win}<div class="holes"></div><div class="shade"></div></div>
  <div class="face back"><div class="paper"></div><div class="mirror">${notes}</div><div class="holes" style="right:auto;left:0"></div><div class="shade"></div></div>`;
  book.appendChild(leaf);
  leaves.push({el:leaf,p:0,front:leaf.querySelector('.front .shade'),back:leaf.querySelector('.back .shade'),flap:leaf.querySelector('.flap')});
});
// spiral rings
const sp=document.createElement('div');sp.className='spiral';for(let i=0;i<19;i++)sp.appendChild(document.createElement('i'));book.appendChild(sp);

function setP(i,p){const L=leaves[i];L.p=p;
  const s=Math.sin(Math.PI*p);
  L.el.style.transform=`translateZ(${(s*30).toFixed(1)}px) rotateY(${(-180*p).toFixed(2)}deg)`;
  L.el.style.zIndex=p<.5?100-i:i;
  L.el.style.visibility=p>=.995?'hidden':'visible';
  L.front.style.opacity=(p<.5?s*1.2:0).toFixed(3);L.back.style.opacity=(p>=.5?s*1.2:0).toFixed(3);
  L.el.firstElementChild.style.boxShadow=`0 ${10+s*18}px ${30+s*20}px rgba(0,0,0,${.45*(1-p*.6)})`;
}
leaves.forEach((_,i)=>setP(i,0));
let idx=0; // number of leaves flipped
const bar=document.getElementById('bar');
function prog(){bar.style.width=(idx/(N-1)*100)+'%'}
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function tween(i,to,ms,done){const from=leaves[i].p,t0=performance.now();
  (function step(t){const k=Math.min(1,(t-t0)/ms);setP(i,from+(to-from)*ease(k));if(k<1)requestAnimationFrame(step);else done&&done()})(t0)}
let busy=false;
function flip(dir){if(busy)return;
  if(dir>0&&idx<N-1){busy=true;const i=idx;closeFlap(i);idx++;prog();tween(i,1,1100,()=>busy=false)}
  else if(dir<0&&idx>0){busy=true;idx--;prog();tween(idx,0,1100,()=>busy=false)}
  else if(dir>0&&idx===N-1){busy=true;let c=0;for(let i=N-2;i>=0;i--){const j=i;setTimeout(()=>{leaves[j].el.style.visibility='visible';tween(j,0,700,()=>{if(++c===N-1){idx=0;prog();busy=false}})},(N-2-i)*140)}}
}
function closeFlap(i){const f=leaves[i].flap;f&&f.classList.remove('open')}
function toggleFlap(i){const f=leaves[i]&&leaves[i].flap;if(f)f.classList.toggle('open')}
// gestures
let drag=null;const W=()=>book.getBoundingClientRect().width;
book.addEventListener('pointerdown',e=>{if(busy)return;stopAuto();drag={x:e.clientX,y:e.clientY,t:performance.now(),moved:false,leaf:null,dir:0,target:e.target};book.setPointerCapture(e.pointerId)});
book.addEventListener('pointermove',e=>{
  const r=book.getBoundingClientRect();book.style.setProperty('--px',((e.clientX-r.left)/r.width-.5).toFixed(2));book.style.setProperty('--py',((e.clientY-r.top)/r.height-.5).toFixed(2));
  if(!drag)return;const dx=e.clientX-drag.x;
  if(!drag.moved&&Math.abs(dx)>8){drag.moved=true;drag.dir=dx<0?1:-1;
    if(drag.dir>0&&idx<N-1){drag.leaf=idx;closeFlap(idx)}else if(drag.dir<0&&idx>0){drag.leaf=idx-1;leaves[drag.leaf].el.style.visibility='visible'}}
  if(drag.moved&&drag.leaf!==null){const k=Math.max(-1,Math.min(1,dx/(W()*.95)));
    setP(drag.leaf,Math.max(0,Math.min(1,drag.dir>0?-k:1-k)));drag.last=e.clientX;drag.lt=performance.now()}});
function end(e){if(!drag)return;const d=drag;drag=null;
  if(!d.moved){const f=d.target.closest&&d.target.closest('.flap');
    if(f&&leaves[idx]&&leaves[idx].flap===f){toggleFlap(idx)}
    else{const r=book.getBoundingClientRect();flip(e.clientX<r.left+r.width*.3?-1:1)}return}
  if(d.leaf===null)return;const p=leaves[d.leaf].p;busy=true;
  const go=d.dir>0?p>.3:p>.7;
  if(go){tween(d.leaf,1,500*(1-p)+250,()=>busy=false);if(d.dir>0)idx=d.leaf+1}
  else{tween(d.leaf,0,500*p+250,()=>busy=false);if(d.dir<0)idx=d.leaf+1}
  prog()}
book.addEventListener('pointerup',end);book.addEventListener('pointercancel',end);
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')flip(1);if(e.key==='ArrowLeft')flip(-1);if(e.key===' ')toggleFlap(idx)});
document.getElementById('next').onclick=()=>{stopAuto();flip(1)};
document.getElementById('prev').onclick=()=>{stopAuto();flip(-1)};
// autoplay demo
const autoBtn=document.getElementById('auto');let timer=null,auto=false;
function tick(step){if(!auto)return;
  const seq=[()=>toggleFlap(idx),()=>{},()=>toggleFlap(idx),()=>flip(1)];
  if(idx>=N-1){timer=setTimeout(()=>{if(auto){flip(1);timer=setTimeout(()=>tick(0),2200)}},2400);return}
  seq[step]();timer=setTimeout(()=>tick((step+1)%4),step===3?1900:step===0?1800:1500)}
function startAuto(){auto=true;autoBtn.textContent='Pause';autoBtn.classList.add('on');clearTimeout(timer);timer=setTimeout(()=>tick(0),1200)}
function stopAuto(){auto=false;clearTimeout(timer);autoBtn.textContent='Play';autoBtn.classList.remove('on')}
autoBtn.onclick=()=>auto?stopAuto():startAuto();
const H=new URLSearchParams(location.hash.slice(1));
if(H.has('p')){stopAuto();const n=+H.get('p');for(let i=0;i<n;i++)setP(i,1);idx=n;prog();if(H.has('open'))leaves[n].flap.classList.add('open');if(H.has('mid')){setP(n,+H.get('mid'))}}
else if(!matchMedia('(prefers-reduced-motion: reduce)').matches)startAuto();else stopAuto();
setTimeout(()=>document.getElementById('hint').style.opacity=0,7000);
const cap=document.getElementById('caption');
function place(){const r=book.getBoundingClientRect();cap.style.left=(r.left+r.width*.04)+'px';cap.style.width=(r.width*.92)+'px';cap.style.top=(r.top+r.height*.02)+'px'}
place();addEventListener('resize',place);
window.__notes={flip,toggleFlap,get idx(){return idx},stopAuto};
})();

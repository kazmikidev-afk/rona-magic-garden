'use strict';
// Overhaul round 1 (5.11): reliable narration on first tap, visible "speaking" cue, safer touch behaviour.
(()=>{
 const a=document.querySelector('#voice');if(!a)return;
 const rep=()=>document.querySelector('#repeat');
 const mark=on=>{const r=rep();if(r)r.classList.toggle('speaking',on)};
 ['playing'].forEach(e=>a.addEventListener(e,()=>mark(true)));
 ['pause','ended','error','emptied'].forEach(e=>a.addEventListener(e,()=>mark(false)));
 // Browsers block audio before the first touch. Remember the blocked clip and play it on the first tap instead of staying silent.
 let blocked=false;
 const retry=()=>{if(!blocked)return;blocked=false;document.body.classList.remove('voice-blocked');try{if(typeof muted!=='undefined'&&muted)return;if(a.src&&a.paused)a.play().catch(()=>{})}catch(e){}};
 document.addEventListener('pointerdown',retry,true);
 if(typeof sayQueue==='function'){const orig=sayQueue;sayQueue=function(keys){orig(keys);setTimeout(()=>{try{if(typeof muted!=='undefined'&&muted)return;if(a.src&&a.paused&&!a.ended&&a.currentTime===0&&a.readyState>=0&&!blocked){const p=a.play();if(p&&p.catch)p.catch(err=>{if(err&&err.name==='NotAllowedError'){blocked=true;document.body.classList.add('voice-blocked')}})}}catch(e){}},350)}}
 // Keep the play screen from rubber-banding or zooming while a child taps fast.
 document.addEventListener('dblclick',e=>e.preventDefault(),{passive:false});
})();

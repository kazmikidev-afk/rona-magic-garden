'use strict';
// קוראים עם רונה - מסלול קריאה בהשראת "קוראים עם חמודים": שומעים ובוחרים.
// שלושה שלבים (אותיות, צירופים, מילים), בלי שעון ובלי "טעית", פרסים = חברים לגן.
// מצב "קוראים יחד" נפרד: תרגול משותף שלא משנה את מסלול ההתקדמות של רונה ולא כותב לאוסף המשותף.
// סדר היעדים מערבב בכל כניסה לשלב (לא קבוע), ובחירה שגויה מנגנת שוב את היעד ומסמנת את האפשרות השגויה.
// הפרס הוא סצנת גן חזותית (SVG מקורי), לא אימוג'י.
// כל ההקראה מקבצי האודיו המקומיים בלבד; קליפי ההדרכה (rd_intro, rd_syl_q) בקול הילה החינמי, כמו בגן הקשת.
(()=>{
const RD_KEY='rona-reading-v1';
const RD_STAGES=[
 {id:'letters',title:'אותיות',desc:'מקשיבים לאות ומוצאים אותה',icon:'א',friend:'ארנבונת',need:6},
 {id:'syllables',title:'צירופים',desc:'באיזה צליל מתחילה המילה?',icon:'בַּ',friend:'פרפרית',need:6},
 {id:'words',title:'מילים',desc:'מקשיבים ובוחרים את המילה',icon:'ים',friend:'חד־קרן',need:6}
];
// [כתיב מנוקד, מפתח אודיו, צליל פותח, מסיחים קלים (אות אחרת, אותו תנועה), מסיחים מאתגרים (אותה אות, תנועה אחרת)]
// כתיב מנוקד בצורה מלאה ועקבית: חולם תמיד עם ו"ו (רוֹ, נוֹ, לוֹ), שורוק תמיד וּ (סוּ, מוּ).
// כל המסיחים נבדקו: אין שתי אפשרויות באותה שאלה עם אותו צליל.
const RD_WORDS=[
 ['אַבָּא','heword_אבא','אַ',['מַ','בַּ','תַּ'],['אֵ','אִ','אוֹ']],
 ['אִמָּא','heword_אמא','אִ',['מִ','שִׁ','בִּ'],['אַ','אֵ','אוֹ']],
 ['רוֹנָה','heword_רונה','רוֹ',['מוֹ','נוֹ','לוֹ'],['רָ','רִ','רֵ']],
 ['בַּיִת','heword_בית','בַּ',['גַּ','מַ','לַ'],['בֵּ','בִּ','בּוֹ']],
 ['יָם','heword_ים','יָ',['מָ','דָּ','שָׁ'],['יֵ','יִ','יוֹ']],
 ['חָתוּל','heword_חתול','חָ',['תָּ','כָּ','מָ'],['חֵ','חִ','חוּ']],
 ['כֶּלֶב','heword_כלב','כֶּ',['לֶ','מֶ','שֶׁ'],['כַּ','כִּ','כּוּ']],
 ['פֶּרַח','heword_פרח','פֶּ',['רֶ','נֶ','לֶ'],['פַּ','פִּ','פּוּ']],
 ['לֵב','heword_לב','לֵ',['בֵּ','נֵ','מֵ'],['לַ','לִ','לוּ']],
 ['סוּס','heword_סוס','סוּ',['מוּ','שׁוּ','נוּ'],['סֵ','סִ','סָ']],
 ['דָּג','heword_דג','דָּ',['גָּ','תָּ','מָ'],['דֵּ','דִ','דּוּ']],
 ['שֶׁמֶשׁ','heword_שמש','שֶׁ',['מֶ','נֶ','כֶּ'],['שָׁ','שִׁ','שׁוּ']],
 ['מַיִם','heword_מים','מַ',['נַ','תַּ','בַּ'],['מֵ','מִ','מוּ']],
 ['עֵץ','heword_עץ','עֵ',['בֵּ','צֵ','נֵ'],['עַ','עִ','עוּ']],
 ['כּוֹס','heword_כוס','כּוֹ',['מוֹ','תּוֹ','סוֹ'],['כָּ','כִּ','כּוּ']],
 ['נֵר','heword_נר','נֵ',['מֵ','רֵ','שֵׁ'],['נַ','נִ','נוּ']],
 ['אוֹר','v2_word_light','אוֹ',['בּוֹ','מוֹ','רוֹ'],['אַ','אִ','אֵ']],
 ['שָׁלוֹם','v2_word_hello','שָׁ',['מָ','לָ','תָּ'],['שֶׁ','שִׁ','שׁוּ']]
];
let rdMode=null,rdStage=-1,rdProg=null,rdOrder=[],rdLast=-1,rdClip=null,rdPraise=0;
function rdLoad(){if(rdProg)return;rdProg={stars:[0,0,0],friends:[false,false,false]};try{let p=JSON.parse(localStorage.getItem(RD_KEY));if(p&&Array.isArray(p.stars)&&p.stars.length===3){rdProg.stars=p.stars.map(x=>+x||0);rdProg.friends=Array.isArray(p.friends)?p.friends.map(Boolean):[false,false,false];}}catch(e){}}
function rdSave(){try{localStorage.setItem(RD_KEY,JSON.stringify(rdProg));}catch(e){}}
// איור מקורי: חברי הגן כ-SVG (בלי תלות בגופן אימוג'י)
function rdFriendSVG(i,cls=''){const arts=[
 '<ellipse cx="21" cy="13" rx="5.5" ry="12" fill="#fff" stroke="#c9aecb" stroke-width="1.5"/><ellipse cx="39" cy="13" rx="5.5" ry="12" fill="#fff" stroke="#c9aecb" stroke-width="1.5"/><ellipse cx="21" cy="14" rx="2.5" ry="7" fill="#f7c8d8"/><ellipse cx="39" cy="14" rx="2.5" ry="7" fill="#f7c8d8"/><ellipse cx="30" cy="40" rx="17" ry="15.5" fill="#fff" stroke="#c9aecb" stroke-width="1.5"/><circle cx="23.5" cy="37" r="2.2" fill="#4a3a55"/><circle cx="36.5" cy="37" r="2.2" fill="#4a3a55"/><ellipse cx="30" cy="42" rx="2.6" ry="1.9" fill="#ef8fb4"/><path d="M27 45.5Q30 48 33 45.5" fill="none" stroke="#4a3a55" stroke-width="1.4" stroke-linecap="round"/><ellipse cx="17" cy="41" rx="3.4" ry="2.2" fill="#fbd0de"/><ellipse cx="43" cy="41" rx="3.4" ry="2.2" fill="#fbd0de"/>',
 '<ellipse cx="17" cy="25" rx="12" ry="9.5" fill="#c9a3e8" stroke="#a37fd1" stroke-width="1.5"/><ellipse cx="43" cy="25" rx="12" ry="9.5" fill="#c9a3e8" stroke="#a37fd1" stroke-width="1.5"/><ellipse cx="20" cy="40" rx="9" ry="7" fill="#f3b6d9" stroke="#e394c0" stroke-width="1.5"/><ellipse cx="40" cy="40" rx="9" ry="7" fill="#f3b6d9" stroke="#e394c0" stroke-width="1.5"/><circle cx="17" cy="25" r="3" fill="#fdf2f8"/><circle cx="43" cy="25" r="3" fill="#fdf2f8"/><rect x="27.6" y="17" width="4.8" height="30" rx="2.4" fill="#5d4a75"/><path d="M28 17Q24 10 21 9M32 17Q36 10 39 9" fill="none" stroke="#5d4a75" stroke-width="1.6" stroke-linecap="round"/><circle cx="21" cy="8.6" r="1.6" fill="#5d4a75"/><circle cx="39" cy="8.6" r="1.6" fill="#5d4a75"/>',
 '<path d="M30 4L26 20h8Z" fill="#f5c04e" stroke="#dfa92f" stroke-width="1.2"/><path d="M19 22L15 12l10 5Z" fill="#fff" stroke="#c9aecb" stroke-width="1.4"/><path d="M41 22L45 12l-10 5Z" fill="#fff" stroke="#c9aecb" stroke-width="1.4"/><circle cx="30" cy="35" r="16" fill="#fff" stroke="#c9aecb" stroke-width="1.5"/><path d="M17 24Q13 34 18 44Q14 32 22 22Z" fill="#e78ac0"/><path d="M43 24Q47 34 42 44Q46 32 38 22Z" fill="#b48ad6"/><ellipse cx="30" cy="41" rx="9" ry="6.5" fill="#fdeef5"/><circle cx="23.5" cy="33" r="2.2" fill="#4a3a55"/><circle cx="36.5" cy="33" r="2.2" fill="#4a3a55"/><circle cx="27" cy="41" r="1.2" fill="#c98ba4"/><circle cx="33" cy="41" r="1.2" fill="#c98ba4"/>'];
 return `<svg viewBox="0 0 60 60" class="rd-friend-svg ${cls}" role="img" aria-label="${RD_STAGES[i].friend}"><title>${RD_STAGES[i].friend}</title>${arts[i]}</svg>`;}
// סצנת הגן: שמיים, שמש, עננים, דשא ופרחים - והחברים שכבר נפתחו מופיעים בגן
function rdGardenSVG(){rdLoad();const fl=(x,y,c)=>`<g><line x1="${x}" y1="${y}" x2="${x}" y2="${y+16}" stroke="#5ea566" stroke-width="2.4"/><g fill="${c}"><circle cx="${x}" cy="${y-5}" r="4"/><circle cx="${x-4.5}" cy="${y}" r="4"/><circle cx="${x+4.5}" cy="${y}" r="4"/><circle cx="${x}" cy="${y+4.5}" r="4"/></g><circle cx="${x}" cy="${y}" r="2.6" fill="#ffd76e"/></g>`;
 const pos=[[92,88,0.62],[190,64,0.62],[288,84,0.68]];
 const fr=RD_STAGES.map((t,i)=>`<g transform="translate(${pos[i][0]},${pos[i][1]}) scale(${pos[i][2]}) translate(-30,-30)" class="${rdProg.friends[i]?'':'rd-off'}"><title>${t.friend}${rdProg.friends[i]?' - כבר בגן':' - ממתינה להצטרף'}</title>${rdFriendSVG(i).replace('<svg viewBox="0 0 60 60"','<svg width="60" height="60" viewBox="0 0 60 60"')}</g>`).join('');
 const names=RD_STAGES.map((t,i)=>t.friend+(rdProg.friends[i]?' בגן':' ממתינה')).join(', ');
 return `<svg viewBox="0 0 380 140" class="rd-garden" role="img" aria-label="גן החברים: ${names}"><defs><linearGradient id="rdSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cde8ff"/><stop offset="1" stop-color="#fdf2f8"/></linearGradient></defs><rect width="380" height="140" rx="16" fill="url(#rdSky)"/><circle cx="42" cy="30" r="15" fill="#ffd76e"/><g stroke="#ffd76e" stroke-width="3" stroke-linecap="round"><line x1="42" y1="6" x2="42" y2="12"/><line x1="42" y1="48" x2="42" y2="54"/><line x1="18" y1="30" x2="24" y2="30"/><line x1="60" y1="30" x2="66" y2="30"/><line x1="25" y1="13" x2="29" y2="17"/><line x1="55" y1="43" x2="59" y2="47"/><line x1="59" y1="13" x2="55" y2="17"/><line x1="29" y1="43" x2="25" y2="47"/></g><g fill="#ffffff" opacity=".92"><ellipse cx="130" cy="26" rx="20" ry="9"/><ellipse cx="146" cy="22" rx="14" ry="8"/><ellipse cx="252" cy="18" rx="17" ry="8"/><ellipse cx="265" cy="22" rx="12" ry="7"/></g><path d="M0 102Q95 84 190 97Q285 110 380 92L380 140L0 140Z" fill="#8fd49a"/><path d="M0 118Q120 104 230 114Q310 121 380 112L380 140L0 140Z" fill="#7cc788"/>${fl(52,108,'#f7a8c4')}${fl(140,120,'#c9a3e8')}${fl(238,110,'#f7a8c4')}${fl(330,118,'#c9a3e8')}${fl(355,103,'#f7a8c4')}${fr}</svg>`;}
const RD_LOCK='<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="3" fill="#b9a8c9"/><path d="M8 10V8a4 4 0 0 1 8 0v2" fill="none" stroke="#b9a8c9" stroke-width="2.6"/><circle cx="12" cy="15" r="1.8" fill="#fff"/></svg>';
// סדר יעדים מעורבב לכל כניסה לשלב; כשנגמר - ערבוב חדש בלי חזרה מיידית על אותו יעד
function rdShuffleBag(n){rdOrder=shuffle([...Array(n).keys()]);rdLast=-1;}
function rdNextTarget(){if(!rdOrder.length){let prev=rdLast;rdShuffleBag(rdPoolSize());if(rdOrder.length>1&&rdOrder[0]===prev)[rdOrder[0],rdOrder[1]]=[rdOrder[1],rdOrder[0]];}rdLast=rdOrder[0];return rdOrder.shift();}
function rdPoolSize(){return RD_STAGES[rdStage].id==='letters'?letters.length:RD_WORDS.length;}
// מסך בחירת מצב - מי קוראת עכשיו (מיועד גם להורה, כמו ב"קוראים עם חמודים")
function rdModeScreen(){rdLoad();rdMode=null;rdStage=-1;taskNarration=['rd_intro'];view(`<div class="rd-screen"><div class="eyebrow">מועדון המילים</div><h1>קוראים עם רונה</h1><section class="panel rd-panel"><p class="instruction">מי קוראת עכשיו?</p><div class="rd-modes"></div><p class="rd-parent-note">להורה: ב"קוראים יחד" אפשר לעזור בבחירה. התרגול המשותף לא משנה את מסלול הקריאה של רונה ולא את אוסף הגילויים. המשחק מתרגל הקשבה וזיהוי אותיות, צלילים ומילים - צעד בדרך לקריאה, לצד קריאה משותפת בספרים.</p><div class="tools" id="rdTools"></div></section></div>`);$('.rd-modes').append(btn('<span class="rd-mode-icon" aria-hidden="true">🌟</span><b>רונה קוראת לבד</b><small>המסלול מתקדם ונשמר</small>',()=>{rdMode='solo';rdMap();},'rd-mode'));$('.rd-modes').append(btn('<span class="rd-mode-icon" aria-hidden="true">💜</span><b>קוראים יחד</b><small>מתרגלים עם הורה, בלי לשנות את המסלול</small>',()=>{rdMode='together';rdMap();},'rd-mode'));$('#rdTools').append(btn('← כל המשחקים',()=>openWorld(world)));say('rd_intro');}
// מפת המסלול עם סצנת גן החברים
function rdMap(){rdLoad();let solo=rdMode==='solo';let unlocked=solo?(rdProg.friends[1]?2:rdProg.friends[0]?1:0):2;view(`<div class="rd-screen"><div class="eyebrow">מועדון המילים / קוראים עם רונה</div><div class="title-row"><h1>מסלול הקריאה</h1><span class="mission">${solo?'רונה קוראת לבד':'קוראים יחד'}</span></div><section class="panel rd-panel"><p class="instruction">${solo?'אוספים כוכבים. חברים חדשים מצטרפים לגן':'בוחרים שלב ומתרגלים יחד'}</p><div class="rd-stages"></div><div class="rd-garden-wrap"><p class="rd-garden-label">הגן שלי - כאן מצטרפים החברים</p>${rdGardenSVG()}</div><div class="tools" id="rdTools"></div></section></div>`);RD_STAGES.forEach((t,i)=>{let locked=i>unlocked;let stars=solo?Math.min(rdProg.stars[i],t.need):0;let b=btn(`<span class="rd-stage-icon">${locked?RD_LOCK:t.icon}</span><b>${t.title}</b><small>${t.desc}</small><span class="rd-stars">${solo?'⭐'.repeat(stars):''}${solo&&!locked?`<i>${stars}/${t.need}</i>`:''}</span>`,()=>{if(locked){previewClip('short_find');b.classList.add('wrong-pick');setTimeout(()=>b.classList.remove('wrong-pick'),450);return;}rdStage=i;rdShuffleBag(rdPoolSize());round=0;rdRound();},'rd-stage'+(locked?' rd-stage-locked':''));if(locked)b.setAttribute('aria-label',t.title+' נעול. קודם משלימים את השלב הקודם');$('.rd-stages').append(b);});$('#rdTools').append(btn('← מי קוראת?',()=>rdModeScreen()),btn('כל המשחקים',()=>openWorld(world),'soft'));taskNarration=['rd_intro'];}
// Reading targets must be heard even when a level-chip callback temporarily silences generic instructions.
// Use the existing queue so mute, cancellation and voiceGeneration remain unchanged; restore the caller's flag.
function rdNarrate(keys){const before=quietNarration;try{quietNarration=false;sayQueue(keys);}finally{quietNarration=before;}}
// סיבוב משחק - יעד אקראי מהתיק המעורבב
function rdRound(){let st=RD_STAGES[rdStage];let lv=sessionLevel;let idx=rdNextTarget();
 if(st.id==='letters'){let li=idx,optsN=[3,4,6][lv];rdClip='find_'+li;let pool=shuffle(letters.map((_,i)=>i).filter(i=>i!==li)).slice(0,optsN-1);shell('אותיות',rdClip,`<p class="instruction">הקשיבי ומצאי את האות</p><div class="choices rd-choices"></div><div class="tools" id="rdHear"></div>`);shuffle([li,...pool]).forEach(i=>{let b=btn(letters[i],()=>choose(i===li,b),'choice rd-letter');if(i===li)targetBtn=b;$('.choices').append(b);});$('#rdHear').append(btn(speaker+' לשמוע שוב',()=>previewClip(rdClip),'word-listen'));rdNarrate([rdClip]);}
 else{let [word,clip,syl,easy,hard]=RD_WORDS[idx];let isSyl=st.id==='syllables';let optsN=[2,3,4][lv];rdClip=clip;let answer=isSyl?syl:word;let pool;if(isSyl){pool=lv===0?shuffle(easy).slice(0,optsN-1):lv===1?shuffle([easy[Math.floor(Math.random()*easy.length)],hard[Math.floor(Math.random()*hard.length)]]):shuffle(hard).slice(0,optsN-1);}else{pool=shuffle(RD_WORDS.filter(w=>w[1]!==clip).map(w=>w[0])).slice(0,optsN-1);}let instr=isSyl?'הקשיבי למילה. איזה צליל מתחיל אותה?':'הקשיבי ובחרי את המילה ששמעת';shell(isSyl?'צירופים':'מילים',isSyl?'rd_syl_q':'short_english',`<p class="instruction">${instr}</p><div class="choices rd-choices ${isSyl?'rd-syl':'rd-word'}"></div><div class="tools" id="rdHear"></div>`);shuffle([answer,...pool]).forEach(opt=>{let b=btn(opt,()=>choose(opt===answer,b),'choice '+(isSyl?'rd-letter':'rd-wordcard'));if(opt===answer)targetBtn=b;$('.choices').append(b);});$('#rdHear').append(btn(speaker+' לשמוע את המילה',()=>previewClip(clip),'word-listen'));rdNarrate([isSyl?'rd_syl_q':'short_english',clip]);}
 $('#nextTools').append(btn('מסלול הקריאה',()=>rdMap(),'soft'));}
// משוב עצמאי למודול: פרסי הגן (כוכבים וחברים) בלבד. בלי מדליות/אוסף משותף, וב"קוראים יחד" בלי כל כתיבה.
const rdBaseFeedback=feedback;feedback=function(ok){
 if(activity!=='reading')return rdBaseFeedback(ok);
 if(roundWon)return;
 if(!ok){$('#feedback').innerHTML='☺ '+ENCOURAGE.reading;let wrong=$('.choices')?.querySelector('button.wrong-pick:not(:disabled)');if(wrong){wrong.disabled=true;wrong.classList.add('rd-gone');}sayQueue(['try',rdClip].filter(Boolean));return;}
 roundWon=true;$('.choices')?.querySelectorAll('button').forEach(b=>b.disabled=true);
 let solo=rdMode==='solo';let st=RD_STAGES[rdStage];
 let praise=PRAISE.reading[rdPraise++%PRAISE.reading.length];
 if(solo){flowers++;try{localStorage.setItem('rona-flowers',String(flowers));}catch(e){}$('.session-garden').innerHTML=symbol('🌼').repeat(Math.min(flowers,10));$('.session-garden').classList.add('celebrate');
  rdProg.stars[rdStage]=Math.min(rdProg.stars[rdStage]+1,st.need);rdSave();
  if(rdProg.stars[rdStage]>=st.need&&!rdProg.friends[rdStage]){rdProg.friends[rdStage]=true;rdSave();let done=rdProg.friends.every(Boolean);
   $('#feedback').innerHTML=`<div class="rd-celebrate"><span class="rd-friend-pop">${rdFriendSVG(rdStage)}</span><b>${st.friend} מצטרפת לגן!</b><small>${done?'כל החברים בגן! סיימת את כל שלבי ההקשבה והזיהוי. איזו אלופה!':'השלב הושלם. ממשיכים במסלול'}</small></div>`;
   $('#nextTools').replaceChildren(btn('למסלול הקריאה',()=>rdMap(),'primary'));say('good');return;}
  $('#feedback').innerHTML=`<span class="success-mark">✓</span> ${praise}<small class="reward-label">⭐ ${rdProg.stars[rdStage]} מתוך ${st.need} בשלב ${st.title}</small>`;
 }else{$('#feedback').innerHTML=`<span class="success-mark">✓</span> ${praise}<small class="reward-label">קראתם יחד! המסלול של רונה נשמר בלי שינוי</small>`;}
 say('good');
 $('#nextTools').replaceChildren(btn('עוד סיבוב',()=>{round++;renderActivity();},'primary'),btn('מסלול הקריאה',()=>rdMap(),'soft'));};
// שיבוץ במסלול המשחקים של מועדון המילים
if(typeof games!=='undefined'&&games.he&&!games.he.some(g=>g[0]==='reading'))games.he.push(['reading','קוראים עם רונה','מאזינים ומזהים אותיות, צלילים ומילים','09']);
if(typeof PRAISE!=='undefined')PRAISE.reading=['שמעת נכון! אוזן של בלשית.','זיהית את הצליל! כל הכבוד.','כל הכבוד! המילים נפתחות לך.'];
if(typeof ENCOURAGE!=='undefined')ENCOURAGE.reading='מקשיבים שוב לאט. בלי לחץ, אין טעויות כאן.';
const rdPrevClip=typeof clipFor==='function'?clipFor:null;clipFor=function(id){return id==='reading'?'rd_intro':(rdPrevClip?rdPrevClip(id):'menu_'+id);};
window.gameIcons=window.gameIcons||{};window.gameIcons.reading={bg:'#f3d9ec',svg:'<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 14Q20 8 32 14Q44 8 56 14V50Q44 44 32 50Q20 44 8 50Z" fill="#fff" stroke="#7a5a96" stroke-width="3"/><path d="M32 14V50" stroke="#7a5a96" stroke-width="3"/><text x="20" y="38" font-size="17" fill="#d6548f" text-anchor="middle">א</text><text x="45" y="38" font-size="17" fill="#d6548f" text-anchor="middle">ב</text></svg>'};
const rdPrevRender=renderActivity;renderActivity=function(){if(activity==='reading'){rdLoad();if(typeof worlds!=='undefined'&&!worlds[world])world='he';if(rdStage<0||!rdMode){rdMode?rdMap():rdModeScreen();}else rdRound();return;}rdPrevRender();};
})();

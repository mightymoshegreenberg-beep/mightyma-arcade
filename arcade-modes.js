// ── Retro Mode ────────────────────────────────────────────────────
function applyRetro(on){
  document.body.classList.toggle('retro-mode',on);
  var rt=document.getElementById('retroToggle');if(rt)rt.checked=on;
  var s=getSettings();s.retroMode=on;saveSettings(s);
}
function toggleRetro(){applyRetro(!document.body.classList.contains('retro-mode'));}

// ── Compact Mode ──────────────────────────────────────────────────
function applyCompact(on){
  document.body.classList.toggle('compact-mode',on);
  var ct=document.getElementById('compactToggle');if(ct)ct.checked=on;
  var s=getSettings();s.compactMode=on;saveSettings(s);
}
function toggleCompact(){applyCompact(!document.body.classList.contains('compact-mode'));}

// ── Among Us Mode ──────────────────────────────────────────────────
function applyAmongUs(on){
  if(on){document.body.classList.add('among-us-mode');document.body.classList.remove('goten-mode','goten-ssb-mode','goten-rose-mode','goten-gold-mode','goten-hakai-mode');var gt=document.getElementById('gotenToggle');if(gt)gt.checked=false;var gb=document.getElementById('gotenModeBtn');if(gb)gb.classList.remove('active');var sb=document.getElementById('ssbModeBtn');if(sb)sb.classList.remove('active');var rb=document.getElementById('roseModeBtn');if(rb)rb.classList.remove('active');}
  else{document.body.classList.remove('among-us-mode');}
  var at=document.getElementById('amongUsToggle');if(at)at.checked=on;
  var ab=document.getElementById('amongUsModeBtn');if(ab)ab.classList.toggle('active',on);
  var s=getSettings();s.amongUsMode=on;if(on){s.gotenMode=false;s.ssbMode=false;s.roseMode=false;s.goldMode=false;s.hakaiMode=false;}saveSettings(s);
  buildSpaceBg(on);
  if(on)unlockAchievement('ach-among-us');
  initGotenSkin();
}
function toggleAmongUs(){applyAmongUs(!document.body.classList.contains('among-us-mode'));}

// ── Goten Mode ──────────────────────────────────────────────────────
function applyGoten(on){
  if(on){document.body.classList.add('goten-mode');document.body.classList.remove('among-us-mode','goten-ssb-mode','goten-rose-mode','goten-gold-mode','goten-hakai-mode');var at=document.getElementById('amongUsToggle');if(at)at.checked=false;var ab=document.getElementById('amongUsModeBtn');if(ab)ab.classList.remove('active');var sb=document.getElementById('ssbModeBtn');if(sb)sb.classList.remove('active');var rb=document.getElementById('roseModeBtn');if(rb)rb.classList.remove('active');}
  else{document.body.classList.remove('goten-mode');}
  var gt=document.getElementById('gotenToggle');if(gt)gt.checked=on;
  var gb=document.getElementById('gotenModeBtn');if(gb)gb.classList.toggle('active',on);
  var s=getSettings();s.gotenMode=on;if(on){s.amongUsMode=false;s.ssbMode=false;s.roseMode=false;s.goldMode=false;s.hakaiMode=false;}saveSettings(s);
  if(!on)buildSpaceBg(false);
  if(on)unlockAchievement('ach-goten');
  initGotenSkin();
}
function toggleGoten(){applyGoten(!document.body.classList.contains('goten-mode'));}

// ── SSB Mode ─────────────────────────────────────────────────────────
function applySSB(on){
  if(on){
    document.body.classList.add('goten-ssb-mode');
    document.body.classList.remove('goten-mode','among-us-mode','goten-rose-mode','goten-gold-mode','goten-hakai-mode');
    var gt=document.getElementById('gotenToggle');if(gt)gt.checked=false;
    var at=document.getElementById('amongUsToggle');if(at)at.checked=false;
    var gb=document.getElementById('gotenModeBtn');if(gb)gb.classList.remove('active');
    var ab=document.getElementById('amongUsModeBtn');if(ab)ab.classList.remove('active');
    var rb=document.getElementById('roseModeBtn');if(rb)rb.classList.remove('active');
  } else {
    document.body.classList.remove('goten-ssb-mode');
  }
  var s=getSettings();s.ssbMode=on;if(on){s.gotenMode=false;s.amongUsMode=false;s.roseMode=false;s.goldMode=false;s.hakaiMode=false;s.gotenSkin='ssb';localStorage.setItem('mma_goten_skin','ssb');}saveSettings(s);
  var sb=document.getElementById('ssbModeBtn');if(sb)sb.classList.toggle('active',on);
  if(on)unlockAchievement('ach-goten-ssb');
  initGotenSkin();
}

// ── Rosé Mode ────────────────────────────────────────────────────────
function applyRose(on){
  if(on){
    document.body.classList.add('goten-rose-mode');
    document.body.classList.remove('goten-mode','among-us-mode','goten-ssb-mode','goten-gold-mode','goten-hakai-mode');
    var gt=document.getElementById('gotenToggle');if(gt)gt.checked=false;
    var at=document.getElementById('amongUsToggle');if(at)at.checked=false;
    var gb=document.getElementById('gotenModeBtn');if(gb)gb.classList.remove('active');
    var ab=document.getElementById('amongUsModeBtn');if(ab)ab.classList.remove('active');
    var sb=document.getElementById('ssbModeBtn');if(sb)sb.classList.remove('active');
  } else {
    document.body.classList.remove('goten-rose-mode');
  }
  var s=getSettings();s.roseMode=on;if(on){s.gotenMode=false;s.amongUsMode=false;s.ssbMode=false;s.goldMode=false;s.hakaiMode=false;s.gotenSkin='rose';localStorage.setItem('mma_goten_skin','rose');}saveSettings(s);
  var rb=document.getElementById('roseModeBtn');if(rb)rb.classList.toggle('active',on);
  initGotenSkin();
}

// ── Golden Gi Goten Mode ─────────────────────────────────────────────
function applyGold(on){
  if(on){
    document.body.classList.add('goten-gold-mode');
    document.body.classList.remove('goten-mode','among-us-mode','goten-ssb-mode','goten-rose-mode','goten-hakai-mode');
    var gt=document.getElementById('gotenToggle');if(gt)gt.checked=false;
    var at=document.getElementById('amongUsToggle');if(at)at.checked=false;
    var gb=document.getElementById('gotenModeBtn');if(gb)gb.classList.remove('active');
    var ab=document.getElementById('amongUsModeBtn');if(ab)ab.classList.remove('active');
    var sb=document.getElementById('ssbModeBtn');if(sb)sb.classList.remove('active');
    var rb=document.getElementById('roseModeBtn');if(rb)rb.classList.remove('active');
  } else {
    document.body.classList.remove('goten-gold-mode');
  }
  var s=getSettings();s.goldMode=on;if(on){s.gotenMode=false;s.amongUsMode=false;s.ssbMode=false;s.roseMode=false;s.hakaiMode=false;s.gotenSkin='gold';localStorage.setItem('mma_goten_skin','gold');}saveSettings(s);
  var gbn=document.getElementById('skinGold');if(gbn)gbn.classList.toggle('active',on);
  initGotenSkin();
}

// ── Hakai Mode ───────────────────────────────────────────────────────
function applyHakai(on){
  if(on){
    document.body.classList.add('goten-hakai-mode');
    document.body.classList.remove('goten-mode','among-us-mode','goten-ssb-mode','goten-rose-mode','goten-gold-mode');
    var gt=document.getElementById('gotenToggle');if(gt)gt.checked=false;
    var at=document.getElementById('amongUsToggle');if(at)at.checked=false;
    var gb=document.getElementById('gotenModeBtn');if(gb)gb.classList.remove('active');
    var ab=document.getElementById('amongUsModeBtn');if(ab)ab.classList.remove('active');
    var sb=document.getElementById('ssbModeBtn');if(sb)sb.classList.remove('active');
    var rb=document.getElementById('roseModeBtn');if(rb)rb.classList.remove('active');
  } else {
    document.body.classList.remove('goten-hakai-mode');
  }
  var s=getSettings();s.hakaiMode=on;if(on){s.gotenMode=false;s.amongUsMode=false;s.ssbMode=false;s.roseMode=false;s.goldMode=false;s.gotenSkin='hakai';localStorage.setItem('mma_goten_skin','hakai');}saveSettings(s);
  var hb=document.getElementById('skinHakai');if(hb)hb.classList.toggle('active',on);
  initGotenSkin();
}

// ── Goten Skin Selector ──────────────────────────────────────────────
function applyGotenSkin(skin){
  var s=getSettings();
  s.gotenSkin=skin;
  saveSettings(s);
  localStorage.setItem('mma_goten_skin',skin);
  ['base','ssj','ssb','rose','gold','hakai'].forEach(function(k){
    var btn=document.getElementById('skin'+k.charAt(0).toUpperCase()+k.slice(1));
    if(btn)btn.classList.toggle('active',k===skin);
  });
  if(skin==='ssb'){
    applyRose(false);
    applyGold(false);
    applyHakai(false);
    applySSB(true);
  } else if(skin==='rose'){
    applySSB(false);
    applyGold(false);
    applyHakai(false);
    applyRose(true);
  } else if(skin==='gold'){
    applyRose(false);
    applySSB(false);
    applyHakai(false);
    applyGold(true);
  } else if(skin==='hakai'){
    applyRose(false);
    applySSB(false);
    applyGold(false);
    applyHakai(true);
  } else if(skin==='ssj'){
    applyRose(false);
    applySSB(false);
    applyGold(false);
    applyHakai(false);
    applyGoten(true);
  } else {
    applyRose(false);
    applySSB(false);
    applyGold(false);
    applyHakai(false);
  }
  initGotenSkin();
}

function initGotenSkin(){
  var settings=getSettings();
  var skin=localStorage.getItem('mma_goten_skin')||settings.gotenSkin||'base';
  if((settings.goldMode||skin==='gold')&&!document.body.classList.contains('among-us-mode')&&!document.body.classList.contains('goten-mode')&&!document.body.classList.contains('goten-ssb-mode')&&!document.body.classList.contains('goten-rose-mode')&&!document.body.classList.contains('goten-hakai-mode')){
    document.body.classList.add('goten-gold-mode');
  }
  if((settings.roseMode||skin==='rose')&&!document.body.classList.contains('among-us-mode')&&!document.body.classList.contains('goten-mode')&&!document.body.classList.contains('goten-ssb-mode')&&!document.body.classList.contains('goten-gold-mode')&&!document.body.classList.contains('goten-hakai-mode')){
    document.body.classList.add('goten-rose-mode');
  }
  if((settings.hakaiMode||skin==='hakai')&&!document.body.classList.contains('among-us-mode')&&!document.body.classList.contains('goten-mode')&&!document.body.classList.contains('goten-ssb-mode')&&!document.body.classList.contains('goten-rose-mode')&&!document.body.classList.contains('goten-gold-mode')){
    document.body.classList.add('goten-hakai-mode');
  }
  if(settings.goldMode||skin==='gold')skin='gold';
  else if(settings.roseMode||skin==='rose')skin='rose';
  else if(settings.hakaiMode||skin==='hakai')skin='hakai';
  var showSection=document.body.classList.contains('goten-mode')||
    document.body.classList.contains('goten-ssb-mode')||
    document.body.classList.contains('goten-rose-mode')||
    document.body.classList.contains('goten-gold-mode')||
    document.body.classList.contains('goten-hakai-mode')||
    skin!=='base';
  var sec=document.getElementById('gotenSkinSection');
  if(sec)sec.style.display=showSection?'':'none';
  ['base','ssj','ssb','rose','gold','hakai'].forEach(function(k){
    var btn=document.getElementById('skin'+k.charAt(0).toUpperCase()+k.slice(1));
    if(btn)btn.classList.toggle('active',k===skin);
  });
}

// ── Activity Ticker ──────────────────────────────────────────────────
(async function initTicker(){
  var track=document.getElementById('tickerTrack');
  if(!track)return;
  var scores=[];
  try{
    var r=await fetch('https://raw.githubusercontent.com/mightymoshegreenberg-beep/mightyma-arcade/main/leaderboard.json?_='+Date.now(),{signal:AbortSignal.timeout(4000)});
    var d=await r.json();
    scores=d.scores||[];
  }catch(ex){}
  if(scores.length===0){
    scores=[
      {handle:'MightyMA',game:"Goten's Last Stand",score:'28,850',date:'Mar 25, 2026'},
      {handle:'MightyMA',game:"Goten's Last Stand",score:'17,150',date:'Mar 23, 2026'}
    ];
  }
  function esc(t){var d=document.createElement('div');d.textContent=String(t||'');return d.innerHTML;}
  function buildItems(arr){
    return arr.map(function(s){
      return '<span class="ticker-item">'
        +'<span>\uD83C\uDFC5</span>'
        +'<span class="ti-handle">'+esc(s.handle||'Anonymous')+'</span>'
        +'<span class="ti-score">'+esc(s.score)+'</span>'
        +'<span class="ti-game">'+esc(s.game)+'</span>'
        +'<span style="color:var(--muted);font-size:.68rem">'+esc(s.date)+'</span>'
        +'</span>';
    }).join('');
  }
  var expanded=scores;
  while(expanded.length<6)expanded=expanded.concat(scores);
  track.innerHTML=buildItems(expanded)+buildItems(expanded);
  track.classList.add('running');
})();

// ── Space Background Builder ─────────────────────────────────────────
function buildSpaceBg(intense){
  var layer=document.getElementById('spaceBgLayer');
  if(!layer)return;
  layer.innerHTML='';
  var count=intense?180:55;
  for(var i=0;i<count;i++){
    var s=document.createElement('div');
    s.className='space-star';
    var sz=Math.random()*2+0.5;
    s.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;opacity:'+(Math.random()*.5+.1)+';animation:twinkle '+(Math.random()*4+2)+'s '+(Math.random()*3)+'s ease-in-out infinite alternate;';
    layer.appendChild(s);
  }
  if(intense){
    var crews=['\uD83D\uDD34','\uD83D\uDD35','\uD83D\uDFE1','\uD83D\uDFE2','\u2B1B','\uD83D\uDFE3','\uD83D\uDFE0'];
    for(var j=0;j<7;j++){
      var c=document.createElement('div');
      c.className='crew-float';
      c.style.cssText='left:'+(Math.random()*88+1)+'%;top:'+(Math.random()*88+1)+'%;opacity:0.05;font-size:'+(1.2+Math.random()*1.8)+'rem;animation-delay:'+(Math.random()*9)+'s;animation-duration:'+(9+Math.random()*6)+'s;';
      c.textContent=crews[j%crews.length];
      layer.appendChild(c);
    }
  }
}

// ── Achievement System ───────────────────────────────────────────────
function unlockAchievement(id){
  var card=document.getElementById(id);
  if(!card||card.classList.contains('ach-unlocked'))return;
  card.classList.remove('ach-locked');
  card.classList.add('ach-unlocked');
  if(!card.querySelector('.ach-unlocked-badge')){
    var b=document.createElement('div');b.className='ach-unlocked-badge';b.textContent='\u2713 Unlocked';card.appendChild(b);
  }
  var ul=[];try{ul=JSON.parse(localStorage.getItem('mma_achievements')||'[]')}catch(e){}
  if(!ul.includes(id)){ul.push(id);localStorage.setItem('mma_achievements',JSON.stringify(ul));}
  updateAchCounter();
}
function updateAchCounter(){
  var el=document.getElementById('achCounter');if(!el)return;
  var ul=[];try{ul=JSON.parse(localStorage.getItem('mma_achievements')||'[]')}catch(e){}
  var total=document.querySelectorAll('.ach-card').length;
  el.innerHTML='\u2728 '+ul.length+' / '+total+' Achievements Unlocked';
}
function initAchievements(){
  var ul=[];try{ul=JSON.parse(localStorage.getItem('mma_achievements')||'[]')}catch(e){}
  document.querySelectorAll('.ach-card').forEach(function(c){
    if(ul.includes(c.id)){
      c.classList.remove('ach-locked');c.classList.add('ach-unlocked');
      if(!c.querySelector('.ach-unlocked-badge')){var b=document.createElement('div');b.className='ach-unlocked-badge';b.textContent='\u2713 Unlocked';c.appendChild(b);}
    } else {
      c.classList.add('ach-locked');
    }
  });
  updateAchCounter();
  initGotenSkin();
}

// ── YouTube Video Feed ──────────────────────────────────────────────
(async function loadYTFeed(){
  var grid=document.getElementById('ytFeedGrid');
  var status=document.getElementById('ytFeedStatus');
  if(!grid)return;
  function mkCard(id,title,date){
    return '<a class="yt-video-card" href="https://www.youtube.com/watch?v='+id+'" target="_blank" rel="noopener">'
      +'<div class="yt-thumb-wrap"><img src="https://i.ytimg.com/vi/'+id+'/mqdefault.jpg" alt="" loading="lazy" onerror="this.parentNode.innerHTML=\'<div class=&quot;yt-thumb-placeholder&quot;>&#127918;</div>\'"/>'
      +'<div class="yt-play-icon">&#9654;</div></div>'
      +'<div class="yt-card-body"><div class="yt-video-title">'+title+'</div>'
      +'<div class="yt-video-meta">&#128197; '+date+'</div></div></a>';
  }
  function renderCards(videos){
    grid.innerHTML=videos.map(function(v){return mkCard(v.id,v.title,v.date);}).join('')
      +'<a class="yt-video-card" href="https://www.youtube.com/@FortniteMostAmazing" target="_blank" rel="noopener" style="align-items:center;justify-content:center;background:rgba(255,0,0,.07);border-color:rgba(255,0,0,.2)">'
      +'<div style="display:flex;flex-direction:column;align-items:center;gap:.55rem;padding:1.5rem;text-align:center">'
      +'<div style="font-size:2rem">&#128250;</div><div style="font-size:.88rem;font-weight:800;color:#ff4444">All Videos</div>'
      +'<div style="font-size:.72rem;color:var(--muted)">@FortniteMostAmazing</div></div></a>';
  }
  var staticV=[{id:'8113Ee8A2K4',title:'Let me know!',date:'Apr 20, 2025'}];
  try{
    var CHANNEL_ID='UCFVkMbJe29q7GSwwPjxPWng';
    var rssUrl='https://www.youtube.com/feeds/videos.xml?channel_id='+CHANNEL_ID;
    var resp=await fetch('https://api.allorigins.win/get?url='+encodeURIComponent(rssUrl),{signal:AbortSignal.timeout(5000)});
    var data=await resp.json();
    var parser=new DOMParser();
    var doc=parser.parseFromString(data.contents,'application/xml');
    var entries=doc.querySelectorAll('entry');
    if(entries.length>0){
      var vids=[];
      entries.forEach(function(e,i){
        if(i>=5)return;
        var idEl=e.querySelector('videoId');var titleEl=e.querySelector('title');var pubEl=e.querySelector('published');
        if(idEl&&titleEl)vids.push({id:idEl.textContent,title:titleEl.textContent,
          date:pubEl?new Date(pubEl.textContent).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):''});
      });
      if(vids.length>0){renderCards(vids);if(status)status.textContent='\u2705 Feed loaded from YouTube RSS';return;}
    }
  }catch(ex){}
  renderCards(staticV);
  if(status)status.textContent='Stats as of Mar 22, 2026';
})();

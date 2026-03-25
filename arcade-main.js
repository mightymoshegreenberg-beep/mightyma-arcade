
// ── localStorage keys ──
var LS_ACCOUNT='mma_account';
var LS_SETTINGS='mma_settings';
var LS_SESSION='mma_session';
var _settingsAvatarB64=null;

// ── SHA-256 via Web Crypto (async) ──
async function sha256(str){
  var buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0')}).join('');
}

// ── Helpers ──
function getAccount(){try{return JSON.parse(localStorage.getItem(LS_ACCOUNT))||null}catch(e){return null}}
function getSettings(){try{return Object.assign({retroMode:false,compactMode:false},JSON.parse(localStorage.getItem(LS_SETTINGS))||{})}catch(e){return{retroMode:false,compactMode:false}}}
function saveSettings(s){localStorage.setItem(LS_SETTINGS,JSON.stringify(s))}
function isSessionActive(){try{return JSON.parse(sessionStorage.getItem(LS_SESSION))===true}catch(e){return false}}
function setSession(v){if(v)sessionStorage.setItem(LS_SESSION,'true');else sessionStorage.removeItem(LS_SESSION)}

// ── Password strength indicator ──
function updatePwStrength(){
  var pw=document.getElementById('settingsPw').value;
  var el=document.getElementById('pwStrength');
  if(!el)return;
  if(!pw){el.className='pw-strength';return;}
  var strong=pw.length>=10&&/[A-Z]/.test(pw)&&/[0-9]/.test(pw);
  var ok=pw.length>=6;
  el.className='pw-strength '+(strong?'strong':ok?'ok':'weak');
}

// ── Init on load ──
(function init(){
  var s=getSettings();
  if(s.retroMode){document.body.classList.add('retro-mode');document.getElementById('retroToggle').checked=true}
  if(s.compactMode){document.body.classList.add('compact-mode');document.getElementById('compactToggle').checked=true}
  if(s.amongUsMode){document.body.classList.add('among-us-mode');var at=document.getElementById('amongUsToggle');if(at)at.checked=true;var ab=document.getElementById('amongUsModeBtn');if(ab)ab.classList.add('active');buildSpaceBg(true);}
  if(s.gotenMode){document.body.classList.add('goten-mode');var gt=document.getElementById('gotenToggle');if(gt)gt.checked=true;var gb=document.getElementById('gotenModeBtn');if(gb)gb.classList.add('active');}
  if(s.ssbMode){document.body.classList.add('goten-ssb-mode');}
  initAchievements();
  updateAccountUI();
})();

// ── Account UI ──
function updateAccountUI(){
  var acc=getAccount();
  var sessionOk=isSessionActive();
  var pill=document.getElementById('accountPill');
  var pillName=document.getElementById('pillName');
  var pillAvatar=document.getElementById('pillAvatar');
  var profileCard=document.getElementById('profileCard');
  var signinForm=document.getElementById('signinForm');
  var cardName=document.getElementById('profileCardName');
  var cardAvatar=document.getElementById('profileCardAvatar');
  if(acc&&sessionOk){
    pill.classList.add('visible');
    pillName.textContent=acc.username;
    if(acc.avatar){pillAvatar.src=acc.avatar;pillAvatar.style.display=''}
    else{pillAvatar.style.display='none'}
    profileCard.classList.add('visible');
    signinForm.classList.add('hidden');
    cardName.textContent=acc.username;
    if(acc.avatar){cardAvatar.src=acc.avatar;cardAvatar.style.display=''}
    else{cardAvatar.style.display='none'}
  }else{
    pill.classList.remove('visible');
    profileCard.classList.remove('visible');
    signinForm.classList.remove('hidden');
    var modeLabel=document.getElementById('signinModeLabel');
    var modeDesc=document.getElementById('signinModeDesc');
    var confirmGrp=document.getElementById('confirmPwGroup');
    var avatarGrp=document.getElementById('avatarGroup');
    var btnText=document.getElementById('signinBtnText');
    var resetBtn=document.getElementById('resetBtn');
    if(acc){
      if(modeLabel)modeLabel.textContent='Welcome back, '+acc.username+'!';
      if(modeDesc)modeDesc.textContent='Enter your password to access your account.';
      if(confirmGrp)confirmGrp.style.display='none';
      if(avatarGrp)avatarGrp.style.display='none';
      if(btnText)btnText.textContent='\uD83C\uDFAE Sign In';
      if(resetBtn)resetBtn.style.display='block';
      document.getElementById('settingsUsername').value=acc.username;
      document.getElementById('settingsUsername').readOnly=true;
      document.getElementById('settingsUsername').style.opacity='.6';
    }else{
      if(modeLabel)modeLabel.textContent='Create Account';
      if(modeDesc)modeDesc.textContent='Set a username and password. Saved to your browser \u2014 auto-fills score submissions.';
      if(confirmGrp)confirmGrp.style.display='';
      if(avatarGrp)avatarGrp.style.display='';
      if(btnText)btnText.textContent='\uD83C\uDFAE Create Account';
      if(resetBtn)resetBtn.style.display='none';
      document.getElementById('settingsUsername').readOnly=false;
      document.getElementById('settingsUsername').style.opacity='';
    }
  }
}

function openSettings(){
  var acc=getAccount();var sessionOk=isSessionActive();
  _settingsAvatarB64=null;hideAuthMsg();
  var pwEl=document.getElementById('settingsPw');if(pwEl)pwEl.value='';
  var pwcEl=document.getElementById('settingsPwConfirm');if(pwcEl)pwcEl.value='';
  document.getElementById('pwStrength').className='pw-strength';
  if(acc&&sessionOk){var prevEl=document.getElementById('settingsAvatarPreview');if(acc.avatar)prevEl.innerHTML='<img src="'+acc.avatar+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>';else prevEl.innerHTML='?';}
  document.getElementById('settingsOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeSettings(){document.getElementById('settingsOverlay').classList.remove('open');document.body.style.overflow='';}
function overlayClick(e){if(e.target===document.getElementById('settingsOverlay'))closeSettings();}
function showAuthError(msg){var e=document.getElementById('authError');e.textContent=msg;e.style.display='block';document.getElementById('authSuccess').style.display='none';}
function showAuthSuccess(msg){var e=document.getElementById('authSuccess');e.textContent=msg;e.style.display='block';document.getElementById('authError').style.display='none';}
function hideAuthMsg(){var e=document.getElementById('authError');var s=document.getElementById('authSuccess');if(e)e.style.display='none';if(s)s.style.display='none';}

async function saveAccount(){
  hideAuthMsg();
  var acc=getAccount();
  var u=document.getElementById('settingsUsername').value.trim();
  var pw=document.getElementById('settingsPw').value;
  var btn=document.getElementById('signinBtnText');
  if(!pw){showAuthError('Password is required.');document.getElementById('settingsPw').focus();return;}
  if(!acc){
    if(!u){showAuthError('Username is required.');document.getElementById('settingsUsername').focus();return;}
    var pwc=document.getElementById('settingsPwConfirm').value;
    if(pw!==pwc){showAuthError('Passwords do\u2019t match.');return;}
    if(pw.length<4){showAuthError('Password must be at least 4 characters.');return;}
    btn.textContent='\u23f3 Creating\u2026';
    var hash=await sha256(pw);
    var newAcc={username:u,avatar:_settingsAvatarB64||null,passwordHash:hash};
    localStorage.setItem(LS_ACCOUNT,JSON.stringify(newAcc));
    setSession(true);showAuthSuccess('\u2705 Account created!');
    setTimeout(function(){closeSettings();updateAccountUI();},700);
  }else{
    btn.textContent='\u23f3 Checking\u2026';
    var hash=await sha256(pw);
    if(hash!==acc.passwordHash){btn.textContent='\uD83C\uDFAE Sign In';showAuthError('\u274C Wrong password. Try again.');document.getElementById('settingsPw').value='';document.getElementById('settingsPw').focus();return;}
    setSession(true);showAuthSuccess('\u2705 Signed in!');
    setTimeout(function(){closeSettings();updateAccountUI();},600);
  }
  btn.textContent='\uD83C\uDFAE Sign In';
}

function showEditForm(){
  if(!isSessionActive()){updateAccountUI();return;}
  var acc=getAccount()||{};
  _settingsAvatarB64=null;hideAuthMsg();
  document.getElementById('settingsUsername').value=acc.username||'';
  document.getElementById('settingsUsername').readOnly=false;
  document.getElementById('settingsUsername').style.opacity='';
  document.getElementById('settingsPw').value='';
  document.getElementById('settingsPwConfirm').value='';
  document.getElementById('pwStrength').className='pw-strength';
  var prevEl=document.getElementById('settingsAvatarPreview');
  if(acc.avatar)prevEl.innerHTML='<img src="'+acc.avatar+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>';else prevEl.innerHTML='?';
  var modeLabel=document.getElementById('signinModeLabel'),modeDesc=document.getElementById('signinModeDesc'),confirmGrp=document.getElementById('confirmPwGroup'),avatarGrp=document.getElementById('avatarGroup'),btnText=document.getElementById('signinBtnText'),resetBtn=document.getElementById('resetBtn');
  if(modeLabel)modeLabel.textContent='Edit Profile';
  if(modeDesc)modeDesc.textContent='Leave password blank to keep existing. Enter new password to change it.';
  if(confirmGrp)confirmGrp.style.display='';
  if(avatarGrp)avatarGrp.style.display='';
  if(btnText)btnText.textContent='\uD83D\uDCBE Save Changes';
  if(resetBtn)resetBtn.style.display='none';
  document.getElementById('profileCard').classList.remove('visible');
  document.getElementById('signinForm').classList.remove('hidden');
  document.getElementById('signinBtnText').parentElement.onclick=async function(){
    hideAuthMsg();
    var acc2=getAccount();
    var newU=document.getElementById('settingsUsername').value.trim()||acc2.username;
    var newPw=document.getElementById('settingsPw').value;
    var newPwc=document.getElementById('settingsPwConfirm').value;
    var finalAvatar=_settingsAvatarB64||(acc2?acc2.avatar:null);
    var newHash=acc2.passwordHash;
    if(newPw){
      if(newPw!==newPwc){showAuthError('Passwords don\u2019t match.');return;}
      if(newPw.length<4){showAuthError('Password must be at least 4 characters.');return;}
      newHash=await sha256(newPw);
    }
    var updated={username:newU,avatar:finalAvatar||null,passwordHash:newHash};
    localStorage.setItem(LS_ACCOUNT,JSON.stringify(updated));
    showAuthSuccess('\u2705 Profile updated!');
    setTimeout(function(){closeSettings();updateAccountUI();},600);
    document.getElementById('signinBtnText').parentElement.onclick=saveAccount;
  };
}

function signOut(){
  setSession(false);_settingsAvatarB64=null;
  document.getElementById('settingsPw').value='';
  var pwcEl=document.getElementById('settingsPwConfirm');if(pwcEl)pwcEl.value='';
  document.getElementById('pwStrength').className='pw-strength';
  document.getElementById('settingsAvatarPreview').innerHTML='?';
  var hint=document.getElementById('settingsAvatarHint');if(hint)hint.textContent='No photo selected';
  hideAuthMsg();updateAccountUI();
}

function resetAccount(){
  if(!confirm('This will permanently delete your account and all local data. Are you sure?'))return;
  localStorage.removeItem(LS_ACCOUNT);setSession(false);_settingsAvatarB64=null;
  document.getElementById('settingsPw').value='';
  var pwcEl=document.getElementById('settingsPwConfirm');if(pwcEl)pwcEl.value='';
  document.getElementById('settingsAvatarPreview').innerHTML='?';
  var hint=document.getElementById('settingsAvatarHint');if(hint)hint.textContent='No photo selected';
  hideAuthMsg();updateAccountUI();
}

function showScoreFields(){
  document.getElementById('scoreFields').style.cssText='display:flex;flex-direction:column;gap:.85rem';
  document.getElementById('messageLabel').textContent='Anything else? (optional)';
  document.getElementById('fbmsg').placeholder='Extra context, etc. (optional)';
  document.getElementById('fbmsg').style.minHeight='70px';
  var acc=getAccount();
  if(acc){
    if(acc.username&&!document.getElementById('fbhandle').value)document.getElementById('fbhandle').value=acc.username;
    if(acc.avatar&&!document.getElementById('fbavatar').value){
      document.getElementById('fbavatar').value=acc.avatar;
      var prev=document.getElementById('fbAvatarPreview');if(prev)prev.innerHTML='<img src="'+acc.avatar+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>';
      var hint=document.getElementById('fbAvatarHint');if(hint)hint.textContent='Using account photo';
    }
  }
}
function hideScoreFields(){document.getElementById('scoreFields').style.display='none';document.getElementById('messageLabel').textContent='Message';document.getElementById('fbmsg').placeholder="Tell us what's on your mind\u2026";document.getElementById('fbmsg').style.minHeight='';}
function handleTypeChange(){document.getElementById('fbtype').value==='High Score'?showScoreFields():hideScoreFields();}

var ssHidden=false;
function handleScreenshotFile(input){
  var file=input.files[0];var hint=document.getElementById('fbscreenshotHint');var preview=document.getElementById('fbscreenshotPreview');
  if(!file){hint.textContent='No screenshot selected';preview.style.display='none';preview.src='';return;}
  hint.textContent=file.name+' ('+Math.round(file.size/1024)+'KB)';
  var reader=new FileReader();reader.onload=function(e){preview.src=e.target.result;preview.style.display='block';};reader.readAsDataURL(file);
}
function getScreenshotThumbnail(){
  return new Promise(function(resolve){
    var input=document.getElementById('fbscreenshotFile');var file=input&&input.files&&input.files[0];
    if(!file){resolve(null);return;}
    var reader=new FileReader();
    reader.onload=function(e){var img=new Image();img.onload=function(){var c=document.createElement('canvas');var maxW=160,maxH=110,ratio=Math.min(maxW/img.width,maxH/img.height,1);c.width=Math.round(img.width*ratio);c.height=Math.round(img.height*ratio);c.getContext('2d').drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',0.55));};img.src=e.target.result;};
    reader.readAsDataURL(file);
  });
}
function toggleScreenshot(){var btn=document.getElementById('noScreenshotBtn');var grp=document.getElementById('screenshotGroup');var note=document.getElementById('unverifiedNote');ssHidden=!ssHidden;if(ssHidden){grp.style.display='none';note.style.display='block';btn.classList.add('active');btn.textContent="\uD83D\uDCF8 Actually, I'll add a screenshot";}else{grp.style.display='';note.style.display='none';btn.classList.remove('active');btn.textContent="\uD83D\uDCF5 I'd rather not upload a screenshot";}}

document.addEventListener('DOMContentLoaded',function(){
  var submitBtn=document.getElementById('fbsubmit');
  if(submitBtn)submitBtn.addEventListener('click',async function(){
    if(document.getElementById('hp_url').value!=='')return;
    var type=document.getElementById('fbtype').value;
    var msg=document.getElementById('fbmsg').value.trim();
    var ok=document.getElementById('fbsuccess');var err=document.getElementById('fberror');var btn=this;
    var payload={type:type,message:msg};
    if(type==='High Score'){
      var game=document.getElementById('fbgame').value.trim();var score=document.getElementById('fbscore').value.trim();
      var ssThumb=ssHidden?null:(await getScreenshotThumbnail());
      var avatar=document.getElementById('fbavatar').value.trim();var handle=document.getElementById('fbhandle').value.trim();
      if(!game||!score){document.getElementById('fbgame').focus();return;}
      payload.game=game;payload.score=score;payload.screenshot=ssThumb?'[screenshot attached]':null;payload.verified=!!ssThumb;
      if(ssThumb)payload.screenshotThumb=ssThumb;
      payload.avatar=avatar||null;payload.handle=handle||'Anonymous';
      if(!msg)payload.message='(no extra notes)';
    }else{if(!msg){document.getElementById('fbmsg').focus();return;}}
    btn.disabled=true;btn.textContent='Sending\u2026';
    ok.style.display='none';err.style.display='none';
    try{
      var r=await fetch('https://ntfy.sh/mma-fbk-7620d96e7fcbe322',{method:'POST',headers:{'Content-Type':'application/json','Title':'MightyMA Arcade Feedback'},body:JSON.stringify(payload)});
      if(r.ok){
        ok.style.display='block';document.getElementById('fbmsg').value='';
        if(type==='High Score'){
          document.getElementById('fbgame').value='';document.getElementById('fbscore').value='';document.getElementById('fbavatar').value='';document.getElementById('fbhandle').value='';
          var prev=document.getElementById('fbAvatarPreview');if(prev)prev.innerHTML='?';
          var hint=document.getElementById('fbAvatarHint');if(hint)hint.textContent='No photo \u00b7 will use account photo if signed in';
          if(!ssHidden){var fi=document.getElementById('fbscreenshotFile');if(fi)fi.value='';var sh=document.getElementById('fbscreenshotHint');if(sh)sh.textContent='No screenshot selected';var sp=document.getElementById('fbscreenshotPreview');if(sp){sp.style.display='none';sp.src='';}}
          ok.textContent=payload.verified?'\u2705 Score submitted with screenshot \u2014 will be reviewed for a \u2714 Verified badge!':'\u2705 Score submitted! Will be reviewed and posted as Unverified.';
        }else{ok.textContent='\u2705 Got it! The arcade team will see this shortly.';}
      }else{err.style.display='block';}
    }catch(e){err.style.display='block';}
    btn.textContent='Send Anonymously \u2192';btn.disabled=false;
  });
});

(function(){try{
  var ref=document.referrer?document.referrer.replace(/https?:\/\//,'').split('/')[0]:'direct';
  fetch('https://ntfy.sh/mma-visits-32471efb9cefb7a5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ts:Date.now(),ref:ref})});
}catch(e){}}());

var LUCKY_URLS=['https://www.crazygames.com/game/1v1-lol','https://slopegame.io','https://retrobowl.me','https://www.crazygames.com/game/run-3','https://www.crazygames.com/game/moto-x3m','https://www.crazygames.com/game/smash-karts','https://poki.com/en/g/stickman-hook','https://www.crazygames.com/game/time-shooter-3-swat','https://www.crazygames.com/game/getaway-shootout','https://orteil.dashnet.org/cookieclicker/','https://www.crazygames.com/game/basketball-legends','https://www.crazygames.com/game/worlds-hardest-game','https://www.crazygames.com/game/subway-surfers','https://poki.com/en/g/monkey-mart','https://agar.io'];
// FIX: Use window.open() directly — the old createElement+click approach was silently blocked by popup blockers
function feelingLucky(){var u=LUCKY_URLS[Math.floor(Math.random()*LUCKY_URLS.length)];window.open(u,'_blank','noopener,noreferrer');}

var WX_WMO={0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Foggy',48:'Icy fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',71:'Light snow',73:'Snow',75:'Heavy snow',80:'Rain showers',81:'Showers',82:'Heavy showers',95:'Thunderstorm',99:'Hail storm'};
var WX_ICON={0:'\u2600\ufe0f',1:'\uD83C\uDF24\ufe0f',2:'\u26c5',3:'\u2601\ufe0f',45:'\uD83C\uDF2B\ufe0f',48:'\uD83C\uDF2B\ufe0f',51:'\uD83C\uDF26\ufe0f',53:'\uD83C\uDF26\ufe0f',55:'\uD83C\uDF27\ufe0f',61:'\uD83C\uDF27\ufe0f',63:'\uD83C\uDF27\ufe0f',65:'\uD83C\uDF27\ufe0f',71:'\uD83C\uDF28\ufe0f',73:'\u2744\ufe0f',75:'\u2744\ufe0f',80:'\uD83C\uDF26\ufe0f',81:'\uD83C\uDF27\ufe0f',82:'\u26c8\ufe0f',95:'\u26c8\ufe0f',99:'\uD83C\uDF29\ufe0f'};

async function fetchWeather(lat,lon,cityLabel){
  var body=document.getElementById('weatherBody');
  body.innerHTML='<span class="weather-loading">\u231b Loading\u2026</span>';
  try{
    var res=await fetch('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m&wind_speed_unit=kmh&timezone=auto');
    var d=await res.json();var c=d.current;
    var code=c.weather_code;var icon=WX_ICON[code]||'\uD83C\uDF21\ufe0f';var desc=WX_WMO[code]||'Unknown';
    document.getElementById('weatherCityName').textContent=cityLabel;
    document.getElementById('radarBadge').innerHTML='&#127749; '+cityLabel.split(',')[0];
    document.getElementById('windyLink').href='https://www.windy.com/?'+lat+','+lon+',9';
    body.innerHTML='<div class="weather-icon">'+icon+'</div><div class="weather-main"><div class="weather-temp">'+Math.round(c.temperature_2m)+'&deg;C</div><div class="weather-desc">'+desc+'</div><div class="weather-meta"><span class="weather-pill">&#127777; Feels like '+Math.round(c.apparent_temperature)+'&deg;C</span><span class="weather-pill">&#128168; Wind '+Math.round(c.wind_speed_10m)+' km/h</span><span class="weather-pill">&#128167; Humidity '+c.relative_humidity_2m+'%</span><span class="weather-pill" style="font-size:.7rem;color:var(--muted)">'+lat.toFixed(3)+'&deg;N, '+lon.toFixed(3)+'&deg;E</span></div></div>';
  }catch(e){
    body.innerHTML='<span class="weather-loading">Could not load weather &mdash; <a href="https://ims.gov.il/en/weather-forecast/Modi_in" target="_blank" style="color:var(--accent2)">check IMS &#8594;</a></span>';
  }
}

async function searchCity(){
  var input=document.getElementById('cityInput');var btn=document.getElementById('citySearchBtn');var query=(input.value||'').trim();
  if(!query){fetchWeather(31.896,35.011,'Modi\u2019in, Israel');return;}
  btn.disabled=true;btn.textContent='\u23f3 Searching\u2026';
  try{
    var gr=await fetch('https://geocoding-api.open-meteo.com/v1/search?name='+encodeURIComponent(query)+'&count=1&language=en&format=json');
    var gd=await gr.json();
    if(!gd.results||!gd.results.length){document.getElementById('weatherBody').innerHTML='<span class="weather-loading">&#10060; City not found. Try a different spelling.</span>';btn.disabled=false;btn.textContent='\uD83D\uDD0D Search';return;}
    var loc=gd.results[0];var label=loc.name+(loc.country?', '+loc.country:'');
    await fetchWeather(loc.latitude,loc.longitude,label);
  }catch(e){document.getElementById('weatherBody').innerHTML='<span class="weather-loading">&#10060; Geocoding failed. Please try again.</span>';}
  btn.disabled=false;btn.textContent='\uD83D\uDD0D Search';
}

fetchWeather(31.896,35.011,'Modi\u2019in, Israel');

(async function loadLeaderboard(){
  var tbody=document.getElementById('globalLbBody');if(!tbody)return;
  try{
    var resp=await fetch('https://raw.githubusercontent.com/mightymoshegreenberg-beep/mightyma-arcade/main/leaderboard.json?_='+Date.now());
    var d=await resp.json();
    var RANK_MEDALS=['&#129351;','&#129352;','&#129353;'];
    var rows='';
    (d.scores||[]).forEach(function(s,i){
      var rankClass=i<3?'lb-rank-'+(i+1):'lb-rank-other';var rankText=i<3?RANK_MEDALS[i]:'#'+(i+1);
      function esc(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML;}
      var name=esc(s.handle||s.player||'Anonymous');var initials=name.slice(0,2).toUpperCase();
      var thumbSrc=s.screenshotThumb||s.avatar||'';
      var avatarHtml=thumbSrc?('<img src="'+thumbSrc+'" alt="" style="width:32px;height:32px;object-fit:cover;border-radius:4px"/>'):initials;
      var isVerified=!!(s.verified||s.screenshotThumb);
      var verBadge=isVerified?'<span class="lb-verified lb-v-yes">&#10003; Verified</span>':'<span class="lb-verified lb-v-no">Unverified</span>';
      rows+='<tr><td><span class="lb-rank-num '+rankClass+'">'+rankText+'</span></td><td><div class="lb-player"><div class="lb-avatar">'+avatarHtml+'</div><span class="lb-name">'+name+'</span></div></td><td><span class="lb-game-pill">'+esc(s.game||'')+'</span></td><td><span class="lb-score-val">'+esc(String(s.score||''))+'</span></td><td>'+verBadge+'</td><td style="color:var(--muted);font-size:.75rem">'+esc(s.date||'')+'</td></tr>';
    });
    tbody.innerHTML=rows||'<tr><td colspan="6" class="lb-loading">No scores yet \u2014 be the first!</td></tr>';
  }catch(e){
    tbody.innerHTML='<tr><td colspan="6" class="lb-loading">Could not load scores. <a href="#support" style="color:var(--accent2)">Submit yours \u2192</a></td></tr>';
  }
})();

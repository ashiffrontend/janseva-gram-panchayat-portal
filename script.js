'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const card=(h,ex='')=>`<article class="glass card reveal ${ex}">${h}</article>`;
const put=(id,h)=>{$(id).innerHTML=h};

/* ---------- Sample data (fictional) ---------- */
const stats=[['Population',6840],['Households',1260],['Schools',6],['Health Centers',2],['Self Help Groups',38],['Farmers',1420],['Schemes',11],['Emergency Contacts',10]];
const about=[['📜','Village History','Nawada Parsauni is a sample village whose story here is fictional, written for this demo.'],['🗺️','Geography','Flat Gangetic plain with fertile alluvial soil and seasonal ponds (sample).'],['🎭','Culture','Folk songs, community fairs and shared meals mark the village calendar (sample).'],['🎉','Festivals','Chhath, Eid, Holi, Diwali and Durga Puja are celebrated together.'],['🎓','Education','Primary and middle schools plus an Anganwadi centre (sample).'],['🌾','Agriculture','Paddy, wheat, maize and vegetables; many families keep dairy animals.'],['💼','Economy','Farming, small shops, tailoring and migrant remittances (sample).'],['🏗️','Development','Sample projects: paved lanes, solar street lights, tap water to homes.']];
const gp=[['Mukhiya','Smt. Sunita Devi (sample)'],['Ward Members','12 elected members, Ward 1–12'],['Panchayat Secretary','Sri R. K. Sinha (sample)'],['Committee Members','Education, Health, Water, Women & Child'],['Office Timings','Mon–Sat, 10:00–17:00'],['Meeting Schedule','Gram Sabha on the 2nd Saturday monthly'],['Office Location','Panchayat Bhawan, Nawada Parsauni']];
const schemes=[
['🏠','PM Awas Yojana','Support to build a pucca house.','Houseless or kutcha-house families on the sample SECC list.','Financial assistance in instalments for construction.','Aadhaar, bank passbook, land papers, photo'],
['🌾','PM Kisan','Income support for farmer families.','Landholding farmer families (sample rules).','₹6,000 per year in three instalments.','Aadhaar, land record, bank passbook'],
['🏥','Ayushman Bharat','Health cover for hospital care.','Families listed in the eligible database.','Cashless treatment cover up to ₹5 lakh per family.','Ration card, Aadhaar, family ID'],
['⛏️','MNREGA','Guaranteed wage work.','Adult rural household members willing to do manual work.','Up to 100 days of wage employment per year.','Job card, Aadhaar, bank passbook'],
['🚰','Jal Jeevan Mission','Tap water at home.','All rural households.','Functional household tap connection.','Aadhaar, address proof'],
['👵','Old Age Pension','Monthly pension for seniors.','Residents aged 60+ below poverty line.','Monthly pension to bank account.','Age proof, Aadhaar, income certificate'],
['🕊️','Widow Pension','Monthly support for widows.','Widows meeting income criteria.','Monthly pension to bank account.','Death certificate of spouse, Aadhaar'],
['🎓','Scholarships','Education support for students.','Students enrolled in recognised institutions.','Annual scholarship amount by category.','Marksheet, income and caste certificate'],
['🍚','Ration Card','Subsidised food grains.','Residents without an existing card.','Monthly food grain entitlement.','Aadhaar of all members, address proof'],
['🔥','Ujjwala Yojana','LPG connection for poor households.','Adult women of eligible households.','Free LPG connection.','Aadhaar, ration card, bank passbook'],
['🏦','Jan Dhan Yojana','Zero-balance bank account.','Any resident without an account.','Account, RuPay card, accident insurance.','Aadhaar or other valid ID']];
const certs=['Residence','Income','Caste','Birth','Death','Character','Migration','Bonafide'].map(c=>c+' Certificate');
const news=[['🗳️','Gram Sabha Meeting','Open meeting on Saturday at 11:00, Panchayat Bhawan.'],['💉','Vaccination Camp','Child immunisation camp at the Health Centre.'],['🏫','School Notice','Parent-teacher meeting this Friday.'],['🚧','Road Construction','Lane repair in Ward 4; use alternate route.'],['💧','Water Supply Notice','Supply paused 10:00–14:00 on Tuesday.'],['⚡','Electricity Maintenance','Planned shutdown Sunday morning.'],['🍚','Public Distribution','Ration distribution begins on the 1st.'],['🌱','Agriculture Training','Free workshop on soil health and seeds.'],['🎪','Village Events','Annual village fair preparations begin.']];
const deps=[['📚','Education','Sri A. Kumar','Schools, mid-day meal, enrolment'],['🩺','Health','Dr. S. Khatoon','Immunisation, health camps'],['🌾','Agriculture','Sri M. Prasad','Seeds, training, soil tests'],['🚰','Water Supply','Sri P. Singh','Tap water, handpump repair'],['⚡','Electricity','Sri N. Alam','Connections and outage reports'],['🛣️','Roads','Sri D. Yadav','Lanes, drains, culverts'],['👩','Women Empowerment','Smt. K. Devi','SHGs, training, welfare'],['⚽','Youth Welfare','Sri R. Raj','Sports, skill programmes'],['🐄','Animal Husbandry','Dr. T. Ahmad','Livestock care, vaccination']];
const dir=[['🏫','Schools'],['🧒','Anganwadi'],['🏥','Hospitals'],['⚕️','Primary Health Centre'],['🏦','Banks'],['📮','Post Office'],['🚓','Police Station'],['🕌','Mosques'],['🛕','Temples'],['🛒','Markets'],['🏪','Shops'],['🏛️','Community Hall']];
const emerg=[['Police','112'],['Ambulance','108'],['Fire Brigade','101'],['Electricity Office','00000 00001'],['Health Center','00000 00002'],['Block Office','00000 00003'],['District Office','00000 00004'],["Women's Helpline",'1091'],['Child Helpline','1098'],['Disaster Management','1078']];
const gal=[['Village Photos','#0F766E'],['Festivals','#F97316'],['Schools','#2563EB'],['Roads','#475569'],['Agriculture','#16A34A'],['Religious Places','#7c3aed'],['Historical Places','#b45309'],['Development Projects','#0891b2']];
const dl=['Government Forms','Village Map','Meeting Minutes','Beneficiary Lists','Public Notices'];
const faq=[['Certificates','How do I apply for a certificate?','On this demo, use the Certificates form. In a real portal you would submit documents and track status.'],['Schemes','Where can I check scheme eligibility?','Open a scheme card to see sample eligibility, benefits and documents.'],['Benefits','When are benefits paid?','Payment timing differs by scheme. These pages show sample information only.'],['Village Office','What are the office hours?','Monday to Saturday, 10:00 to 17:00 (sample).'],['Complaints','How do I raise a complaint?','Use the Contact form or visit the Panchayat office. Nothing is sent from this demo.'],['Downloads','Are the downloads real?','No. They are PDF placeholders for demonstration.']];

/* ---------- Render ---------- */
put('#stats',stats.map(([l,n])=>`<div class="glass stat reveal"><b data-count="${n}">0</b><span>${l}</span></div>`).join(''));
put('#aboutGrid',about.map(([i,t,d])=>card(`<div class="ic">${i}</div><h3>${t}</h3><p>${d}</p>`)).join(''));
put('#gpGrid',gp.map(([t,d])=>card(`<h3>${t}</h3><p>${d}</p>`)).join(''));
put('#schemeGrid',schemes.map((s,i)=>card(`<div class="ic">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p><button class="btn pri ripple" data-scheme="${i}">View details</button>`)).join(''));
put('#ctype',certs.map(c=>`<option>${c}</option>`).join(''));
put('#annGrid',news.map(([i,t,d])=>card(`<div class="ic">${i}</div><span class="tag">Sample</span><h3>${t}</h3><p>${d}</p>`)).join(''));
put('#depGrid',deps.map(([i,t,o,r])=>card(`<div class="ic">${i}</div><h3>${t}</h3><p><b>Officer:</b> ${o}</p><p><b>Duties:</b> ${r}</p><p><b>Contact:</b> 00000 0000${deps.findIndex(d=>d[1]===t)}</p>`)).join(''));
put('#dirGrid',dir.map(([i,t])=>card(`<div class="ic">${i}</div><h3>${t}</h3><p>Sample listing</p>`)).join(''));
put('#emGrid',emerg.map(([t,n])=>card(`<h3>${t}</h3><a href="tel:${n.replace(/\s/g,'')}">${n}</a>`,'em')).join(''));
put('#galGrid',gal.map(([t,c],i)=>`<button class="gal reveal" data-g="${i}" style="background:linear-gradient(135deg,${c},#111827)" aria-label="Open ${t}"><span>🖼️<br>${t}</span></button>`).join(''));
put('#dlGrid',dl.map(t=>card(`<div class="ic">📄</div><h3>${t}</h3><p>PDF placeholder</p><a class="btn gl" href="assets/contact-list.txt" download>Download</a>`)).join(''));
put('#faqList',faq.map(([c,q,a])=>`<details class="reveal"><summary>${q} <span class="tag">${c}</span></summary><p>${a}</p></details>`).join(''));
put('#ticker',[...news,...news].map(n=>`<span>${n[0]} <b>${n[1]}:</b> ${n[2]}</span>`).join(''));

/* ---------- Dialogs ---------- */
const modal=$('#modal'),lb=$('#lightbox');
const open=h=>{$('#modalBody').innerHTML=h;modal.showModal()};
$('#modalClose').onclick=()=>modal.close();$('#lbClose').onclick=()=>lb.close();
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-scheme]');
  if(b){const s=schemes[b.dataset.scheme];open(`<h3>${s[0]} ${s[1]}</h3><p>${s[2]}</p><p><b>Eligibility:</b> ${s[3]}</p><p><b>Benefits:</b> ${s[4]}</p><p><b>Documents:</b> ${s[5]}</p><p><button class="btn org" id="applyBtn">Apply (demo only)</button></p>`);$('#applyBtn').onclick=()=>{modal.close();open('<h3>✅ Demo only</h3><p>No application was sent. This is a frontend showcase.</p>')}}
  const g=e.target.closest('[data-g]');
  if(g){const [t,c]=gal[g.dataset.g];$('#lbBody').innerHTML=`<div class="gal" style="background:linear-gradient(135deg,${c},#111827)"><span>🖼️ ${t}<br>Sample image placeholder</span></div>`;lb.showModal()}
  const r=e.target.closest('.ripple');
  if(r){const d=document.createElement('i'),k=r.getBoundingClientRect(),z=Math.max(k.width,k.height);d.className='rip';d.style.cssText=`width:${z}px;height:${z}px;left:${e.clientX-k.left-z/2}px;top:${e.clientY-k.top-z/2}px`;r.appendChild(d);setTimeout(()=>d.remove(),600)}
});

/* ---------- Forms ---------- */
const rules={cname:[v=>v.trim().length>=3,'Enter your full name.'],cmob:[v=>/^[6-9]\d{9}$/.test(v),'Enter a valid 10-digit mobile number.'],cadd:[v=>v.trim().length>=8,'Enter your address.'],cpur:[v=>v.trim().length>=3,'Enter the purpose.'],kn:[v=>v.trim().length>=2,'Enter your name.'],ke:[v=>/^\S+@\S+\.\S+$/.test(v),'Enter a valid email.'],km:[v=>v.trim().length>=10,'Write at least 10 characters.'],ne:[v=>/^\S+@\S+\.\S+$/.test(v),'Enter a valid email.']};
function validate(form){let ok=true;$$('input[required],textarea[required]',form).forEach(f=>{const r=rules[f.id],good=!r||r[0](f.value),m=f.parentElement.querySelector('.err');f.classList.toggle('bad',!good);if(m)m.textContent=good?'':r[1];if(!good)ok=false});return ok}
[['#certForm',()=>`<h3>✅ Application received (demo)</h3><p>${esc($('#ctype').value)} for ${esc($('#cname').value)}. Nothing was sent; this is a frontend demo.</p>`],['#contactForm',()=>'<h3>✅ Message sent (demo)</h3><p>No data left your browser.</p>'],['#newsForm',()=>'<h3>✅ Subscribed (demo)</h3><p>No email was stored.</p>']].forEach(([s,m])=>$(s).addEventListener('submit',e=>{e.preventDefault();if(validate(e.target)){open(m());e.target.reset()}}));

/* ---------- Theme, language, menu ---------- */
const root=document.documentElement;
const setTheme=t=>{root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}};
try{setTheme(localStorage.getItem('theme')||'light')}catch(e){}
$('#theme').onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark');
const T={en:{},hi:{gov:'बिहार सरकार · पंचायती राज (नमूना)',n_home:'होम',n_about:'गाँव के बारे में',n_gp:'ग्राम पंचायत',n_sch:'योजनाएँ',n_cert:'प्रमाण पत्र',n_ann:'सूचनाएँ',n_dep:'विभाग',n_dir:'ग्राम निर्देशिका',n_em:'आपातकाल',n_gal:'गैलरी',n_dl:'डाउनलोड',n_con:'संपर्क',h1:'जनसेवा ग्राम पंचायत पोर्टल – नवादा परसौनी में आपका स्वागत है',sub:'डिजिटल शासन, सार्वजनिक सेवाओं, कल्याण योजनाओं और पारदर्शी प्रशासन के साथ नागरिकों का सशक्तिकरण।'},ur:{gov:'حکومتِ بہار · پنچایتی راج (نمونہ)',n_home:'ہوم',n_about:'گاؤں کے بارے میں',n_gp:'گرام پنچایت',n_sch:'اسکیمیں',n_cert:'سرٹیفکیٹ',n_ann:'اعلانات',n_dep:'محکمے',n_dir:'گاؤں کی ڈائرکٹری',n_em:'ہنگامی',n_gal:'گیلری',n_dl:'ڈاؤن لوڈ',n_con:'رابطہ',h1:'جن سیوا گرام پنچایت پورٹل – نوادہ پرسونی میں خوش آمدید',sub:'ڈیجیٹل گورننس، عوامی خدمات، فلاحی اسکیموں اور شفاف انتظامیہ کے ذریعے شہریوں کو بااختیار بنانا۔'}};
$$('[data-i18n]').forEach(e=>T.en[e.dataset.i18n]=e.textContent);
$('#lang').onchange=e=>{const l=e.target.value;root.lang=l;root.dir=l==='ur'?'rtl':'ltr';$$('[data-i18n]').forEach(n=>n.textContent=T[l][n.dataset.i18n]||T.en[n.dataset.i18n])};
$('#menuBtn').onclick=e=>{const o=$('#nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
$('#nav').onclick=()=>$('#nav').classList.remove('open');

/* ---------- Search ---------- */
$('#searchForm').addEventListener('submit',e=>e.preventDefault());
$('#search').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();let first=null;
  $$('.card,details').forEach(c=>{c.classList.remove('hit');const m=!q||c.textContent.toLowerCase().includes(q);c.classList.toggle('hide',!m);if(q&&m&&!first){first=c;c.classList.add('hit')}});
  if(first)first.scrollIntoView({behavior:'smooth',block:'center'})});

/* ---------- Scroll effects ---------- */
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
$$('.reveal').forEach(n=>io.observe(n));
const co=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;const el=x.target,end=+el.dataset.count,t0=performance.now();
  const step=t=>{const p=Math.min((t-t0)/1400,1);el.textContent=Math.floor(end*p).toLocaleString('en-IN')+(p<1?'':'+');if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step);co.unobserve(el)}),{threshold:.6});
$$('[data-count]').forEach(n=>co.observe(n));
const up=$('#toTop'),bar=$('#progress'),links=$$('#nav a'),secs=links.map(a=>$(a.getAttribute('href')));
addEventListener('scroll',()=>{const h=root.scrollHeight-innerHeight;bar.style.width=(scrollY/h*100)+'%';up.classList.toggle('show',scrollY>600);
  let cur=0;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<180)cur=i});links.forEach((a,i)=>a.classList.toggle('on',i===cur))},{passive:true});
up.onclick=()=>scrollTo({top:0,behavior:'smooth'});
addEventListener('load',()=>{setTimeout(()=>$('#loader').classList.add('hide'),400);
  /* Newsletter popup once per session */
  try{if(!sessionStorage.getItem('nl')){setTimeout(()=>{if(!document.querySelector('dialog[open]')){open('<h3>📬 Village newsletter</h3><p>Subscribe from the footer for sample updates. This is a demo; nothing is stored.</p>');sessionStorage.setItem('nl','1')}},12000)}}catch(e){}});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
(() => {
'use strict';
const all=window.PORTAL_CONTENT || [], intro=all[0], articles=all.slice(1), app=document.getElementById('app');
const project='Ocuvanje albanskog jezika i identiteta';
const groups=[['Tradicija i običaji',['narodna-nosnja','muzika','svadbeni-obicaji','kuhinja','praznici']],['Kultura i prostor',['umjetnost','ulcinj','simboli','malesija']],['Jezik i generacije',['porodica-i-skola','digitalno-nasljedje','mladi-i-jezik','jezik-i-azbuka']]];
const x=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const href=path=>'#'+path;
const a=(path,label,cls='')=>`<a class="${cls}" href="${href(path)}">${label}</a>`;
const firstPic=item=>item?.blocks.find(b=>b.type==='image')?.src || '';
const para=item=>item?.blocks.find(b=>b.type==='text'&&b.text.length>110)?.text || '';
const meta=item=>`<p class="date"><span aria-hidden="true">◷</span> Objavljeno: ${x(item.date)}</p>`;
const idx=item=>articles.indexOf(item)+1;
function header(){return `<header class="masthead"><div class="thinbar"><span>KULTURNA BAŠTINA · CRNA GORA</span><span>JEZIK / TRADICIJA / IDENTITET</span></div><div class="headmain"><a class="fund" href="https://www.fzm.me/" target="_blank" rel="noopener noreferrer" aria-label="Fond za zaštitu i ostvarivanje manjinskih prava Crne Gore (spoljni sajt)"><img src="media/logo-fonda.png" alt="Logo Fonda za zaštitu i ostvarivanje manjinskih prava Crne Gore"><span>FOND ZA ZAŠTITU<br>MANJINSKIH PRAVA <b>↗</b></span></a><a class="siteword" href="#/" aria-label="Početna stranica"><span>PROJEKAT / DIGITALNA ARHIVA</span><strong>${project}</strong></a><div class="headtools">${a('/pretraga','<span aria-hidden="true">⌕</span> Pretraga','searchlink')}<button class="menubutton" id="menu-toggle" aria-controls="site-nav" aria-expanded="false">☰ <span>Meni</span></button></div></div><nav id="site-nav" class="nav" aria-label="Glavna navigacija"><div class="navinner">${a('/','Početna')}${a('/teme','Sve teme')}${groups.map(([label,ids])=>`<div class="navgroup"><button type="button" class="groupbutton" aria-expanded="false">${x(label)} <span>⌄</span></button><div class="submenu" hidden>${ids.map(id=>{let it=articles.find(z=>z.id===id);return a('/clanak/'+id,x(it.label))}).join('')}</div></div>`).join('')}${a('/o-projektu','O projektu')}${a('/pretraga','Pretraži arhivu','lastnav')}</div></nav></header>`}
function footer(){
    return `<footer class="footer">
      <div class="footer-top">
        <div>
          <span class="kicker">O PROJEKTU</span>
          <h2>${project}</h2>
          <p>Platforma posvećena jeziku, tradiciji, kulturnom nasljeđu i identitetu Albanaca u Crnoj Gori.</p>
          <p class="footer-author">Autor projekta: <strong>Kristina Kaljaj</strong></p>
        </div>
        <div>
          <span class="kicker">SARADNICI</span>
          <dl>
            <div>
              <dt>Asistent projekta:</dt>
              <dd>Adnan Medđonaj</dd>
            </div>
            <div>
              <dt>Prikupljanje, obrada i selekcija sadržaja o albanskom jeziku i kulturi:</dt>
              <dd>Rdžep Hot</dd>
            </div>
            <div>
              <dt>Dizajn i tehnička izrada sajta:</dt>
              <dd>Klodjana Hot</dd>
            </div>
            <div>
              <dt>Objavljivanje sadržaja i aktivacija sajta:</dt>
              <dd>Klodjana Hot</dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="footer-disclaimer">
        <strong>Napomena:</strong> Svi stavovi, mišljenja i sadržaji objavljeni na ovom portalu predstavljaju isključivu odgovornost autora.
      </div>
      <div class="footend">
        <span>© 2026 · ${project}</span>
        ${a('/','Povratak na početnu ↑')}
      </div>
    </footer>`;
  }function category(item){return groups.find(g=>g[1].includes(item.id))?.[0] || 'Kulturno nasljeđe'}
function card(item){let im=firstPic(item);return `<a href="${href('/clanak/'+item.id)}" class="storycard"><div class="storyimg">${im?`<img loading="lazy" src="${x(im)}" alt="${x(item.label)}">`:'<span class="placeholder">KULTURA</span>'}<span class="number">${String(idx(item)).padStart(2,'0')}</span></div><div class="storybody"><span class="label">${x(category(item))}</span><h3>${x(item.title)}</h3><p>${x(para(item).slice(0,145))}…</p><span class="readmore">Pročitaj članak <span aria-hidden="true">↗</span></span>${meta(item)}</div></a>`}
function capture(blocks){let out='';for(let i=0;i<blocks.length;i++){let b=blocks[i];if(b.type==='image'){let next=blocks[i+1];let caption=next?.type==='text'&&next.text.length<190&&/(foto|preuzeto|www\.|shutterstock|izvor|slika|ilustracija|panorama)/i.test(next.text)?next.text:null;out+=`<figure><img loading="lazy" src="${x(b.src)}" alt="${x(caption||'Fotografija iz izvornog dokumenta')}"><figcaption>${caption?x(caption):'Fotografija iz izvornog dokumenta'}</figcaption></figure>`;if(caption)i++}else if(b.type==='text'){out+=`<p>${x(b.text)}</p>`}}return out}
function home(){let feature=articles[0],side=articles[1];return `<main id="main"><section class="cover"><div class="cover-copy"><span class="kicker">DIGITALNA ARHIVA · 2026.</span><div class="cover-rule"></div><h1>${project}</h1><p>Jezik, običaji i nasljeđe koje povezuje generacije. Otkrijte priče o kulturnom identitetu Albanaca u Crnoj Gori.</p><div class="cover-actions">${a('/teme','Istraži sve teme <span aria-hidden="true">↗</span>','btn btnwhite')}${a('/o-projektu','Upoznaj projekat','underlink')}</div>${meta(intro)}</div><div class="cover-photo"><img src="media/foto-04.jpeg" alt="Albanska nošnja i igra, svečanost u Tuzima, fotografija Kristina Kaljaj"><div class="photo-label"><span>FOTO ARHIVA</span><b>Tradicija koja živi</b><small>Svečanost u Tuzima · Kristina Kaljaj</small></div></div></section><section class="marquee" aria-label="Teme portala"><span>JEZIK</span><i>✳</i><span>IDENTITET</span><i>✳</i><span>TRADICIJA</span><i>✳</i><span>KULTURA</span><i>✳</i><span>NASLJEĐE</span></section><section class="welcome contentwrap"><div class="welcome-heading"><span class="kicker red">RIJEČ UREDNIŠTVA / UVOD</span><h2>Priče koje ne smijemo zaboraviti.</h2></div><div class="welcome-text"><p>${x(intro.blocks.find(b=>b.type==='text')?.text)}</p><p>${x(intro.blocks.filter(b=>b.type==='text')[2]?.text || intro.blocks.filter(b=>b.type==='text')[1]?.text)}</p>${a('/o-projektu','Pročitaj cijeli uvod ↗','arrowlink')}${meta(intro)}</div></section><section class="editorial contentwrap"><div class="sectionline"><div><span class="kicker red">IZDVOJENO IZ ARHIVE</span><h2>Nasljeđe u fokusu<span class="punct">.</span></h2></div>${a('/teme','Pogledaj sve teme ↗','arrowlink')}</div><div class="spotlight"><a class="spotimage" href="${href('/clanak/'+feature.id)}"><img src="${x(firstPic(feature))}" alt="${x(feature.label)}"><span>GLAVNA PRIČA / 01</span></a><div class="spotcopy"><span class="label">${x(category(feature))}</span><h3>${x(feature.title)}</h3><p>${x(para(feature).slice(0,430))}…</p>${a('/clanak/'+feature.id,'Nastavi čitanje ↗','arrowlink')}${meta(feature)}</div><a class="spotmini" href="${href('/clanak/'+side.id)}"><img src="${x(firstPic(side))}" alt="${x(side.label)}"><span class="label">${x(category(side))}</span><h3>${x(side.title)}</h3>${meta(side)}</a></div></section><section class="story-section contentwrap"><div class="sectionline"><div><span class="kicker red">TEMATSKE CJELINE</span><h2>Istražite portal<span class="punct">.</span></h2></div><span class="count">13 ČLANAKA</span></div><div class="storygrid">${articles.slice(2,8).map(card).join('')}</div><div class="morebar">${a('/teme','Sve tematske cjeline <span aria-hidden="true">→</span>','btn btnred')}</div></section><section class="quote-band"><div class="contentwrap"><span class="kicker">NASLJEĐE I BUDUĆNOST</span><h2>Očuvanje jezika znači očuvanje sjećanja, priča i pripadnosti.</h2>${a('/clanak/mladi-i-jezik','Mladi i albanski jezik ↗','btn btnwhite')}${meta(articles.find(q=>q.id==='mladi-i-jezik'))}</div></section><section class="story-section contentwrap"><div class="sectionline"><div><span class="kicker red">JOŠ ZA ČITANJE</span><h2>Iz digitalne biblioteke<span class="punct">.</span></h2></div></div><div class="storygrid">${articles.slice(8).map(card).join('')}</div></section></main>`}
function pagehead(tag,title,sub='',item=null){return `<section class="pagehead"><div class="contentwrap"><span class="kicker red">${x(tag)}</span><h1>${title}</h1>${sub?`<p>${x(sub)}</p>`:''}${item?meta(item):''}</div></section>`}
function topics(){return `<main id="main">${pagehead('KOMPLETNA BIBLIOTEKA','Sve teme', 'Trinaest izvornih članaka organizovanih prema oblastima.',intro)}<div class="contentwrap allgroups">${groups.map(([label,ids])=>`<section><div class="sectionline"><div><span class="kicker red">TEMATSKA KOLEKCIJA</span><h2>${x(label)}<span class="punct">.</span></h2></div></div><div class="storygrid">${ids.map(id=>card(articles.find(a=>a.id===id))).join('')}</div></section>`).join('')}</div></main>`}
function articlePage(id){const item=articles.find(t=>t.id===id);if(!item)return missing();const n=idx(item);return `<main id="main">${pagehead(`ARHIVA / ${String(n).padStart(2,'0')} / ${category(item)}`,x(item.title),para(item).slice(0,220)+'…',item)}<div class="reading contentwrap"><aside class="toc"><span class="kicker red">TEME PORTALA</span>${articles.map(t=>a('/clanak/'+t.id,x(t.label),t.id===id?'selected':'')).join('')}${a('/pretraga','⌕ Pretraži arhivu','toc-search')}</aside><article class="article"><div class="article-content">${capture(item.blocks)}</div><div class="article-end">${meta(item)}<p>Tekst preuzet iz dokumenta projekta „Očuvanje albanskog jezika i identiteta“.</p></div><div class="nextprev">${n>1?a('/clanak/'+articles[n-2].id,'← Prethodni članak<br><strong>'+x(articles[n-2].label)+'</strong>'):''}${n<articles.length?a('/clanak/'+articles[n].id,'Sljedeći članak →<br><strong>'+x(articles[n].label)+'</strong>'):''}</div></article></div></main>`}
function about(){return `<main id="main">${pagehead('INFORMACIJE O PROJEKTU',project,'Uvodne informacije i izvorna napomena o projektu.',intro)}<section class="reading contentwrap"><aside class="toc"><span class="kicker red">ISTRAŽITE</span>${a('/teme','Sve tematske cjeline')}${a('/pretraga','Pretraži sadržaj')}</aside><article class="article"><div class="article-content">${capture(intro.blocks)}</div><div class="article-end">${meta(intro)}</div></article></section></main>`}
function search(){return `<main id="main">${pagehead('DIGITALNA ARHIVA','Pretraga portala','Pretražite pune tekstove svih 13 članaka.')}<section class="searcharea contentwrap"><label for="search">Unesite pojam koji tražite</label><div class="searchbox"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="Na primjer: jezik, nošnja, Ulcinj..." autocomplete="off"></div><p id="result-num" aria-live="polite"></p><div id="results"></div></section></main>`}
function updateResults(){let field=document.getElementById('search');if(!field)return;let q=field.value.trim().toLocaleLowerCase('sr'),matches=articles.filter(t=>(t.title+' '+t.blocks.map(b=>b.text||'').join(' ')).toLocaleLowerCase('sr').includes(q));document.getElementById('result-num').textContent=`${matches.length} rezultata${q?' za „'+field.value+'”':''}`;document.getElementById('results').innerHTML=matches.length?matches.map(t=>`<a href="${href('/clanak/'+t.id)}"><span class="label">${x(category(t))}</span><h2>${x(t.title)}</h2><p>${x(para(t).slice(0,220))}…</p>${meta(t)}<span class="result-arrow">↗</span></a>`).join(''):`<div class="noresults"><h2>Nema rezultata za ovaj pojam.</h2><p>Pokušajte sa drugom riječju ili otvorite sve teme.</p>${a('/teme','Sve teme ↗','btn btnred')}</div>`}
function missing(){return `<main id="main"><div class="missing contentwrap"><span>404</span><h1>Stranica nije pronađena.</h1><p>Adresa nije ispravna ili stranica ne postoji.</p>${a('/','Nazad na početnu →','btn btnred')}</div></main>`}
function render(){const path=(location.hash.substring(1)||'/').split('?')[0];let page=path==='/'?home():path==='/teme'?topics():path==='/o-projektu'?about():path==='/pretraga'?search():path.startsWith('/clanak/')?articlePage(path.slice(8)):missing();app.innerHTML=header()+page+footer();let article=articles.find(t=>path==='/clanak/'+t.id);document.title=(article?article.title+' | ':'')+project;let toggle=document.getElementById('menu-toggle'),nav=document.getElementById('site-nav');toggle.addEventListener('click',()=>{const on=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(on));toggle.innerHTML=on?'✕ <span>Zatvori</span>':'☰ <span>Meni</span>'});document.querySelectorAll('.groupbutton').forEach(btn=>btn.addEventListener('click',()=>{let sub=btn.nextElementSibling;sub.hidden=!sub.hidden;btn.setAttribute('aria-expanded',String(!sub.hidden))}));let s=document.getElementById('search');if(s){s.addEventListener('input',updateResults);updateResults()}window.scrollTo(0,0)}
window.addEventListener('hashchange',render);render();
})();

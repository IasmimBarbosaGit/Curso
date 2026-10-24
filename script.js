<script>
  const DATA = {"aminoacidos": ["Histidina", "Isoleucina", "Leucina", "Lisina", "Metionina", "Fenilalanina", "Treonina", "Triptofano", "Valina"], "alimentos": [{"nome": "Milho comum", "emoji": "🌽", "prot": 3.4, "aa": {"Histidina": "média", "Isoleucina": "média", "Leucina": "alta", "Lisina": "baixa", "Metionina": "média", "Fenilalanina": "média", "Treonina": "média", "Triptofano": "baixa", "Valina": "média"}, "vb": 44, "obs": "Clássico aminoácido limitante do milho comum: baixa lisina e triptofano."}, {"nome": "Milho QPM", "emoji": "🌽", "prot": 3.8, "aa": {"Histidina": "média", "Isoleucina": "média", "Leucina": "média", "Lisina": "alta", "Metionina": "média", "Fenilalanina": "média", "Treonina": "média", "Triptofano": "alta", "Valina": "média"}, "vb": 80, "obs": "Variedade de Evangelina Villegas: mais lisina e triptofano, valor biológico bem mais alto que o milho comum."}, {"nome": "Feijão", "emoji": "🫘", "prot": 8.7, "aa": {"Histidina": "média", "Isoleucina": "média", "Leucina": "média", "Lisina": "alta", "Metionina": "baixa", "Fenilalanina": "média", "Treonina": "média", "Triptofano": "média", "Valina": "média"}, "vb": 49, "obs": "Rico em lisina, mas limitado em metionina — por isso combina tão bem com cereais (arroz com feijão)."}, {"nome": "Ovo", "emoji": "🥚", "prot": 13, "aa": {"Histidina": "alta", "Isoleucina": "alta", "Leucina": "alta", "Lisina": "alta", "Metionina": "alta", "Fenilalanina": "alta", "Treonina": "alta", "Triptofano": "alta", "Valina": "alta"}, "vb": 100, "obs": "Proteína de referência clássica — usada como padrão de comparação (valor biológico = 100)."}, {"nome": "Leite", "emoji": "🥛", "prot": 3.2, "aa": {"Histidina": "alta", "Isoleucina": "alta", "Leucina": "alta", "Lisina": "alta", "Metionina": "média", "Fenilalanina": "média", "Treonina": "alta", "Triptofano": "média", "Valina": "alta"}, "vb": 91, "obs": "Proteína animal de alta qualidade, levemente abaixo do ovo em aminoácidos sulfurados."}, {"nome": "Soja", "emoji": "🌱", "prot": 15, "aa": {"Histidina": "média", "Isoleucina": "alta", "Leucina": "alta", "Lisina": "alta", "Metionina": "baixa", "Fenilalanina": "média", "Treonina": "média", "Triptofano": "média", "Valina": "média"}, "vb": 74, "obs": "Boa fonte de lisina entre as proteínas vegetais; mais limitada em metionina."}, {"nome": "Aveia", "emoji": "🌾", "prot": 13, "aa": {"Histidina": "média", "Isoleucina": "média", "Leucina": "média", "Lisina": "média", "Metionina": "média", "Fenilalanina": "média", "Treonina": "média", "Triptofano": "média", "Valina": "média"}, "vb": 65, "obs": "Perfil de cereal mais equilibrado que o milho e o arroz."}, {"nome": "Arroz", "emoji": "🍚", "prot": 2.5, "aa": {"Histidina": "média", "Isoleucina": "média", "Leucina": "média", "Lisina": "baixa", "Metionina": "média", "Fenilalanina": "média", "Treonina": "média", "Triptofano": "baixa", "Valina": "média"}, "vb": 59, "obs": "Padrão de cereal: baixa lisina e triptofano, como o milho comum."}], "meta_rafael": 60, "refeicoes": [{"refeicao": "Café da manhã", "alimento": "Leite", "gramas": 200}, {"refeicao": "Café da manhã", "alimento": "Aveia", "gramas": 30}, {"refeicao": "Almoço", "alimento": "Feijão", "gramas": 150}, {"refeicao": "Almoço", "alimento": "Milho QPM", "gramas": 200}, {"refeicao": "Almoço", "alimento": "Soja", "gramas": 100}, {"refeicao": "Lanche", "alimento": "Ovo", "gramas": 50}, {"refeicao": "Jantar", "alimento": "Soja", "gramas": 100}, {"refeicao": "Jantar", "alimento": "Feijão", "gramas": 150}, {"refeicao": "Ceia", "alimento": "Ovo", "gramas": 150}]};
  const AA = DATA.aminoacidos;
  const $ = s => document.querySelector(s);
  const fmt = n => n.toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:1});
  const food = nome => DATA.alimentos.find(a => a.nome === nome);
  const LV = {alta:2,média:1,baixa:0};
  const vbColor = v => v>=80 ? '#2e9e5b' : v>=60 ? '#f2a516' : '#e5533d';

  /* Grãos de milho do desenho */
  (function(){
    const g = document.getElementById('kernels'); let s='';
    for(let r=0;r<11;r++){ for(let c=0;c<6;c++){
      const x = 160 + c*16 + (r%2?8:0), y = 70 + r*22;
      const w = 1 - Math.abs((y-200)/190)*.35;
      if(Math.abs(x-200) < 38*w+6) s += `<ellipse cx="${x}" cy="${y}" rx="7" ry="9.5"/>`;
    }} g.innerHTML = s;
  })();

  /* ---------- Simulador ---------- */
  let current = 'Milho comum';
  const foodsEl = $('#foods');
  DATA.alimentos.forEach(a=>{
    const b = document.createElement('button');
    b.className='food'; b.dataset.nome=a.nome;
    b.innerHTML = `<span class="em">${a.emoji}</span>${a.nome}`;
    b.onclick = ()=>{ current=a.nome; render(); };
    foodsEl.appendChild(b);
  });
  AA.forEach(n=>{ const d=document.createElement('div'); d.className='aa-item'; d.dataset.aa=n; $('#aaGrid').appendChild(d); });

  const gramsEl = $('#grams'), rangeEl = $('#range'), weightEl = $('#weight');
  const MAX_PROT = 250;                       // limite de proteína (g) no simulador
  const maxGrams = a => Math.floor(MAX_PROT / a.prot * 100 * 10) / 10;  // gramas do alimento que dão no máximo 250 g de proteína
  let capped = false;
  function getGrams(a){
    let v = parseFloat(String(gramsEl.value).replace(',','.'));
    v = (isFinite(v) && v>0) ? v : 0;
    const mx = maxGrams(a);
    gramsEl.max = mx;
    capped = v >= mx;
    if(v > mx){ v = mx; gramsEl.value = mx; }
    return v;
  }

  /* Quantidade diária a partir do peso */
  const cap250 = n => Math.min(n, MAX_PROT);
  function weightKg(){ const w = parseFloat(String(weightEl.value).replace(',','.')); return (isFinite(w) && w>=10 && w<=300) ? w : null; }
  function renderWeight(){
    const w = weightKg(), box = $('#wRes');
    if(!weightEl.value.trim()){ box.innerHTML = `<p class="wmsg">Digite seu peso para ver quanta proteína você pode consumir por dia.</p>`; return; }
    if(w===null){ box.innerHTML = `<p class="wmsg err">Informe um peso entre 10 e 300 kg.</p>`; return; }
    const base = cap250(w*0.8), lo = cap250(w*1.2), hi = cap250(w*2.0);
    const faixa = lo===hi ? `${fmt(lo)} g` : `${fmt(lo)} a ${fmt(hi)} g`;
    box.innerHTML = `<div class="wcards">
        <div class="wcard"><small>Recomendação básica (0,8 g por kg)</small><b>${fmt(base)} g</b><span>por dia</span></div>
        <div class="wcard"><small>Com atividade física (1,2 a 2,0 g por kg)</small><b>${faixa}</b><span>por dia</span></div>
      </div>
      <p class="wmsg" style="margin-top:10px">Limite máximo do simulador: ${MAX_PROT} g de proteína por dia. Valores de referência educativos; não substituem a orientação de um nutricionista.</p>`;
  }

  async function proteinOf(a,g){
    // tenta usar a API do servidor Python; se não existir (arquivo aberto direto), calcula no navegador
    try{
      if(!location.protocol.startsWith('http')) throw 0;
      const r = await fetch(`/api/calcular?alimento=${encodeURIComponent(a.nome)}&gramas=${g}`);
      if(r.ok){ return (await r.json()).proteina; }
    }catch(e){}
    return Math.round(a.prot*g/100*10)/10;
  }
  let renderToken=0;
  async function render(){
    const a = food(current), g = getGrams(a), hit = capped, tk = ++renderToken;
    rangeEl.value = Math.min(g,500);
    document.querySelectorAll('.food').forEach(b=>b.classList.toggle('sel', b.dataset.nome===current));
    const mx = maxGrams(a), cm = $('#capMsg');
    cm.className = 'capmsg' + (hit ? ' hit' : '');
    cm.textContent = hit
      ? `Limite atingido: ${fmt(mx)} g de ${a.nome} já são ${MAX_PROT} g de proteína. Não dá para adicionar mais.`
      : `Limite: no máximo ${MAX_PROT} g de proteína. Para ${a.nome}, isso é até ${fmt(mx)} g.`;
    const p = await proteinOf(a,g); if(tk!==renderToken) return;
    const w = weightKg(), base = w ? cap250(w*0.8) : 0;
    $('#rDaily').textContent = w ? `Essa porção cobre ${Math.round(p/base*100)}% da sua recomendação básica diária (${fmt(base)} g).` : '';
    $('#rName').textContent = `${a.emoji} ${a.nome} · ${fmt(g)} g`;
    $('#rProt').textContent = fmt(p);
    $('#rPer100').textContent = `${fmt(a.prot)} g de proteína a cada 100 g`;
    $('#rVB').textContent = a.vb; $('#rVBbar').style.width = a.vb+'%';
    $('#rVBtxt').textContent = a.vb>=80 ? 'Qualidade proteica muito alta' : a.vb>=60 ? 'Qualidade proteica intermediária' : 'Qualidade proteica mais baixa';
    const lim=[];
    document.querySelectorAll('.aa-item').forEach(el=>{
      const nivel = a.aa[el.dataset.aa]; el.className='aa-item '+nivel;
      el.innerHTML = `<b>${el.dataset.aa}</b><span>${nivel}</span>`;
      if(nivel==='baixa') lim.push(el.dataset.aa);
    });
    $('#rLimit').innerHTML = lim.length
      ? `🔎 <b>Aminoácido(s) limitante(s):</b> ${lim.join(', ')}. Combinar com outros alimentos ajuda a completar o perfil.`
      : `✅ Nenhum aminoácido essencial em nível baixo neste alimento.`;
    $('#rObs').textContent = a.obs;
  }
  gramsEl.addEventListener('input',render);
  rangeEl.addEventListener('input',()=>{ gramsEl.value=rangeEl.value; render(); });
  weightEl.addEventListener('input',()=>{
    const v = parseFloat(String(weightEl.value).replace(',','.'));
    const over = isFinite(v) && v > 300;
    if(over) weightEl.value = 300;          // não deixa escrever mais de 300 kg
    renderWeight();
    if(over) $('#wRes').insertAdjacentHTML('afterbegin','<p class="wmsg err">O peso máximo é 300 kg.</p>');
    render();
  });
  document.querySelectorAll('.presets button').forEach(b=>b.onclick=()=>{ gramsEl.value=b.dataset.g; rangeEl.value=Math.min(+b.dataset.g,500); render(); });

  /* ---------- Adicionar alimento (nome + foto) ---------- */
  (function(){
    const nameEl=$('#afName'), video=$('#camVideo'), prev=$('#afPreview'), ph=$('#camPh'), msg=$('#afMsg'), list=$('#afList');
    const KEY = 'proteinacao_alimentos:convidado';   // mesma chave de antes, para não perder o que já foi salvo
    const bCam=$('#afCam'), bGal=$('#afGal'), bShot=$('#afShot'), bCancel=$('#afCancel'), bClear=$('#afClear'), bSave=$('#afSave');
    const fCam=$('#afFileCam'), fGal=$('#afFileGal');
    let stream=null, photo=null, items=[];

    function load(){
      items=[];
      try{
        items = JSON.parse(localStorage.getItem(KEY)||'[]')
          .filter(i=>i && typeof i.nome==='string' && (!i.foto || String(i.foto).startsWith('data:image/')));
      }catch(e){ items=[]; }
    }
    function persist(){
      try{ localStorage.setItem(KEY,JSON.stringify(items)); return true; }catch(e){ return false; }
    }
    function say(t,cls){ msg.textContent=t||''; msg.className='af-msg'+(cls?' '+cls:''); }
    function ui(){
      const live=!!stream;
      video.hidden=!live; prev.hidden=live||!photo; ph.hidden=live||!!photo;
      bShot.hidden=!live; bCancel.hidden=!live; bClear.hidden=live||!photo;
      bCam.hidden=live; bGal.hidden=live;
    }
    function stopCam(){
      if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; }
      video.srcObject=null; ui();
    }
    function shrink(src,w,h){               // reduz a foto para caber no armazenamento do aparelho
      const k=Math.min(1,480/Math.max(w,h)), c=document.createElement('canvas');
      c.width=Math.round(w*k); c.height=Math.round(h*k);
      c.getContext('2d').drawImage(src,0,0,c.width,c.height);
      return c.toDataURL('image/jpeg',.78);
    }
    function setPhoto(url){ photo=url; if(url) prev.src=url; ui(); }
    function fromFile(file){
      if(!file) return;
      if(!file.type.startsWith('image/')){ say('Escolha um arquivo de imagem.','err'); return; }
      const url=URL.createObjectURL(file), img=new Image();
      img.onload=()=>{ setPhoto(shrink(img,img.naturalWidth,img.naturalHeight)); URL.revokeObjectURL(url); say(''); };
      img.onerror=()=>{ URL.revokeObjectURL(url); say('Não foi possível ler essa imagem. Tente outra.','err'); };
      img.src=url;
    }
    async function startCam(){
      say('');
      if(!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)){ fCam.click(); return; }
      try{
        stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});
        video.srcObject = stream; await video.play(); ui();
      }catch(e){
        stopCam(); say('Não deu para abrir a câmera. Tire ou escolha a foto pelo seletor.','err'); fCam.click();
      }
    }
    function renderList(){
      list.textContent='';
      if(!items.length){
        const p=document.createElement('p'); p.className='af-empty';
        p.textContent = 'Nenhum alimento adicionado ainda. Escreva um nome e toque em “Adicionar alimento”.';
        list.appendChild(p); return;
      }
      items.forEach(it=>{
        const card=document.createElement('div'); card.className='af-item';
        if(it.foto){ const im=document.createElement('img'); im.src=it.foto; im.alt='Foto de '+it.nome; card.appendChild(im); }
        else{ const d=document.createElement('div'); d.className='ph'; d.textContent='🍽️'; card.appendChild(d); }
        const nm=document.createElement('div'); nm.className='nm'; nm.textContent=it.nome; card.appendChild(nm);
        const rm=document.createElement('button'); rm.type='button'; rm.textContent='✕'; rm.setAttribute('aria-label','Remover '+it.nome);
        rm.onclick=()=>{ items=items.filter(x=>x.id!==it.id); persist(); renderList(); };
        card.appendChild(rm); list.appendChild(card);
      });
    }
    function save(){
      const nome=nameEl.value.trim().replace(/\s+/g,' ');
      if(!nome){ say('Escreva o nome do alimento.','err'); nameEl.focus(); return; }
      stopCam();
      items.unshift({id:Date.now(), nome:nome.slice(0,40), foto:photo});
      const ok=persist();
      renderList(); nameEl.value=''; setPhoto(null);
      say(ok ? 'Alimento adicionado.' : 'Alimento adicionado, mas não coube na memória do aparelho e some ao recarregar a página.', ok?'ok':'err');
    }
    bCam.onclick=startCam;
    bGal.onclick=()=>fGal.click();
    bShot.onclick=()=>{ if(!stream || !video.videoWidth) return; setPhoto(shrink(video,video.videoWidth,video.videoHeight)); stopCam(); };
    bCancel.onclick=stopCam;
    bClear.onclick=()=>{ setPhoto(null); say(''); };
    fCam.onchange=()=>{ fromFile(fCam.files[0]); fCam.value=''; };
    fGal.onchange=()=>{ fromFile(fGal.files[0]); fGal.value=''; };
    bSave.onclick=save;
    nameEl.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); save(); } });
    window.addEventListener('pagehide',stopCam);
    ui(); load(); renderList();
  })();

  /* ---------- Seja Evangelina ---------- */
  (function(){
    const c = food('Milho comum'), q = food('Milho QPM');
    const metric = (lbl,v,max,col)=>`<div class="metric"><div class="lbl"><span>${lbl}</span><span>${v}</span></div><div class="trk"><div class="f" style="width:${max}%;background:${col}"></div></div></div>`;
    const card = (a,id)=>`<button class="corn-card" data-id="${id}">
        <div class="em">🌽</div><h3>${a.nome}</h3>
        ${metric('Proteína total /100 g', fmt(a.prot)+' g', a.prot/15*100,'#c78a00')}
        ${metric('Lisina', a.aa['Lisina'], (LV[a.aa['Lisina']]+1)/3*100, vbColor(LV[a.aa['Lisina']]*50))}
        ${metric('Triptofano', a.aa['Triptofano'], (LV[a.aa['Triptofano']]+1)/3*100, vbColor(LV[a.aa['Triptofano']]*50))}
        ${metric('Valor biológico', a.vb, a.vb, vbColor(a.vb))}
      </button>`;
    $('#vs').innerHTML = card(c,'comum') + '<div class="vsb">VS</div>' + card(q,'qpm');
    const fb = $('#fb');
    document.querySelectorAll('.corn-card').forEach(b=>b.onclick=()=>{
      const ok = b.dataset.id==='qpm';
      document.querySelectorAll('.corn-card').forEach(x=>x.classList.remove('ok','no'));
      b.classList.add(ok?'ok':'no');
      fb.className='feedback show '+(ok?'good':'bad');
      fb.innerHTML = ok
        ? `<b>🎉 Isso! Milho QPM.</b> A proteína total é parecida com a do milho comum, mas a qualidade (lisina e triptofano, e o valor biológico) é bem maior. Foi exatamente essa diferença que Evangelina Villegas pesquisou.`
        : `<b>Quase!</b> O milho comum tem quantidade de proteína parecida, mas pouca lisina e triptofano. Olhe o valor biológico: a melhor escolha para melhorar a <i>qualidade</i> é o <b>milho QPM</b>.`;
    });
  })();

  /* ---------- Um dia do Rafael ---------- */
  const META = DATA.meta_rafael;
  let added = new Set();
  $('#meta').textContent = META;
  function renderMeals(){
    $('#meals').innerHTML = DATA.refeicoes.map((m,i)=>{
      const a = food(m.alimento), p = a.prot*m.gramas/100, on = added.has(i);
      return `<div class="meal"><div class="em">${a.emoji}</div>
        <div><b>${m.refeicao}</b><small>${m.alimento} · ${m.gramas} g</small></div>
        <div class="p">${fmt(p)} g</div>
        <button class="btn sm ${on?'':'corn'}" data-i="${i}" ${on?'disabled':''}>${on?'Adicionado ✓':'+ Adicionar'}</button></div>`;
    }).join('');
    document.querySelectorAll('#meals button').forEach(b=>b.onclick=()=>{ added.add(+b.dataset.i); renderMeals(); renderBar(); });
    const all = DATA.refeicoes.reduce((t,m)=>t+food(m.alimento).prot*m.gramas/100,0);
    $('#allTotal').textContent = `Somando todas as refeições do dia: ${fmt(all)} g de proteína (a meta é ${META} g).`;
  }
  function renderBar(){
    let total=0; added.forEach(i=>{ const m=DATA.refeicoes[i]; total += food(m.alimento).prot*m.gramas/100; });
    const pct = Math.min(total/META,1), left = Math.max(META-total,0);
    $('#pFill').style.width = (pct*100)+'%';
    $('#pFill').textContent = pct>0.08 ? Math.round(pct*100)+'%' : '';
    $('#pTotal').textContent = `${fmt(total)} g / ${META} g`;
    $('#pLeft').textContent = `Faltam ${fmt(left)} g para a meta do Rafael`;
    $('#congrats').classList.toggle('show', total>=META);
  }
  $('#reset').onclick=()=>{ added.clear(); renderMeals(); renderBar(); };

  /* ---------- Tabela ---------- */
  (function(){
    let h = `<thead><tr><th>Alimento</th><th>Prot./100 g</th>${AA.map(n=>`<th>${n}</th>`).join('')}<th>Valor biol.</th></tr></thead><tbody>`;
    DATA.alimentos.forEach(a=>{
      h += `<tr><td><b>${a.emoji} ${a.nome}</b></td><td>${fmt(a.prot)} g</td>` +
        AA.map(n=>`<td><span class="dot ${a.aa[n]}">${a.aa[n]}</span></td>`).join('') +
        `<td><span class="vbc" style="background:${vbColor(a.vb)}">${a.vb}</span></td></tr>`;
    });
    $('#tbl').innerHTML = h+'</tbody>';
  })();

  /* ---------- 9 aminoácidos: contas coloridas (cores do infográfico) ---------- */
  (function(){
    const CONTAS = [
      {n:'Lisina',       cor:'vermelho',       hex:'#e53935'},
      {n:'Triptofano',   cor:'amarelo',        hex:'#fbc02d'},
      {n:'Metionina',    cor:'laranja',        hex:'#f57c00'},
      {n:'Isoleucina',   cor:'verde-claro',    hex:'#8bc34a'},
      {n:'Leucina',      cor:'verde-escuro',   hex:'#1b7a34'},
      {n:'Fenilalanina', cor:'azul-claro',     hex:'#64b5f6'},
      {n:'Treonina',     cor:'azul-royal',     hex:'#1e40af'},
      {n:'Histidina',    cor:'roxo / lilás',   hex:'#7e3fb5'},
      {n:'Valina',       cor:'rosa ou pérola', hex:'#f48fb1'}
    ];
    const box = $('#aa9Beads'), cap = $('#aa9Cap'), padrao = cap.textContent;
    const show = c => { cap.innerHTML = c ? `<i style="background:${c.hex}"></i><strong>${c.n}</strong> · ${c.cor}` : padrao; };
    CONTAS.forEach(c=>{
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'bead';
      b.style.setProperty('--c', c.hex);
      b.title = `${c.n} — ${c.cor}`;
      b.setAttribute('aria-label', `${c.n}: ${c.cor}`);
      ['mouseenter','focus','click'].forEach(ev=>b.addEventListener(ev,()=>show(c)));
      ['mouseleave','blur'].forEach(ev=>b.addEventListener(ev,()=>show(null)));
      box.appendChild(b);
    });
  })();

  /* ---------- Extras ---------- */
  $('#st1').textContent = DATA.alimentos.length;
  $('#diarioLink').addEventListener('click',e=>{ if(e.target.getAttribute('href')==='#') e.preventDefault(); });
  const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  const links=[...document.querySelectorAll('nav ul a')];
  const so = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) links.forEach(l=>l.classList.toggle('on', l.getAttribute('href')==='#'+e.target.id)); }),{rootMargin:'-45% 0px -50% 0px'});
  links.forEach(l=>{ const s=document.querySelector(l.getAttribute('href')); if(s) so.observe(s); });
  links.forEach(l=>l.addEventListener('click',()=>document.querySelector('nav ul').classList.remove('open')));

  renderWeight(); render(); renderMeals(); renderBar();
  </script>
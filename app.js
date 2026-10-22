const athletes = [
  { id: 1, name: "Ana Clara Souza", campus: "Campus Camboriú", modality: "Vôlei", position: "Ponteira", age: 17, height: "1,72 m", goals: 8, assists: 12, medal: "Ouro", rating: "9,2", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", marks: "Salto: 2,84 m · Saque: 82 km/h" },
  { id: 2, name: "Lucas Martins", campus: "Campus Concórdia", modality: "Futsal", position: "Atacante", age: 18, height: "1,80 m", goals: 14, assists: 6, medal: "Ouro", rating: "9,5", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80", marks: "Velocidade: 29 km/h · 14 gols" },
  { id: 3, name: "Mariana Oliveira", campus: "Campus Rio do Sul", modality: "Atletismo", position: "Meio-fundo", age: 16, height: "1,65 m", goals: 0, assists: 0, medal: "Prata", rating: "9,0", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80", marks: "800 m: 2min18s · 1.500 m: 4min52s" },
  { id: 4, name: "Pedro Henrique Lima", campus: "Campus Blumenau", modality: "Basquete", position: "Armador", age: 17, height: "1,83 m", goals: 18, assists: 9, medal: "Bronze", rating: "8,7", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80", marks: "18 pontos · 9 assistências" },
  { id: 5, name: "Beatriz Fernandes", campus: "Campus Araquari", modality: "Atletismo", position: "Velocista", age: 16, height: "1,68 m", goals: 0, assists: 0, medal: "Ouro", rating: "9,4", photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80", marks: "100 m rasos: 12,16 s · 200 m rasos: 25,84 s" },
  { id: 6, name: "Rafael Costa", campus: "Campus São Bento do Sul", modality: "Futsal", position: "Goleiro", age: 18, height: "1,87 m", goals: 1, assists: 3, medal: "Prata", rating: "8,9", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", marks: "12 defesas · 1 gol" }
];

const medals = [
  { name: "Campus Camboriú", code: "CA", gold: 12, silver: 8, bronze: 5 },
  { name: "Campus Concórdia", code: "CO", gold: 10, silver: 9, bronze: 7 },
  { name: "Campus Rio do Sul", code: "RS", gold: 8, silver: 10, bronze: 6 },
  { name: "Campus Blumenau", code: "BL", gold: 7, silver: 5, bronze: 9 },
  { name: "Campus Araquari", code: "AR", gold: 6, silver: 7, bronze: 5 }
];

const modalities = [
  { name: "Atletismo", icon: "↗", desc: "Velocidade, resistência e superação em cada passo.", athletes: 124, campus: 12, next: "Hoje · 14:00" },
  { name: "Basquete", icon: "◉", desc: "Jogo coletivo, estratégia e muita energia em quadra.", athletes: 96, campus: 10, next: "Hoje · 16:30" },
  { name: "Futsal", icon: "◌", desc: "Habilidade, velocidade e paixão por cada gol.", athletes: 184, campus: 12, next: "Hoje · 13:45" },
  { name: "Handebol", icon: "◍", desc: "Potência e precisão no esporte de equipe.", athletes: 88, campus: 9, next: "Amanhã · 09:00" },
  { name: "Vôlei", icon: "◈", desc: "Trabalho em equipe que transforma cada ponto.", athletes: 112, campus: 11, next: "Hoje · 15:00" },
  { name: "Tênis de mesa", icon: "⊙", desc: "Reflexo e estratégia em partidas eletrizantes.", athletes: 48, campus: 8, next: "Amanhã · 13:00" },
  { name: "Xadrez", icon: "♟", desc: "Pensamento estratégico em cada movimento.", athletes: 36, campus: 7, next: "Hoje · 14:30" }
];

const campuses = [
  { name: "Camboriú", code: "CA", desc: "Entre a natureza e a inovação, nosso campus joga junto e acolhe talentos.", students: "3.240", medals: 25, image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=700&q=75" },
  { name: "Concórdia", code: "CO", desc: "Tradição, dedicação e espírito de equipe que fazem história nos jogos.", students: "2.890", medals: 26, image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=700&q=75" },
  { name: "Rio do Sul", code: "RS", desc: "Formando atletas e cidadãos com orgulho e paixão pelo esporte.", students: "2.610", medals: 24, image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=700&q=75" },
  { name: "Blumenau", code: "BL", desc: "Energia, diversidade e muita garra dentro e fora das quadras.", students: "2.370", medals: 21, image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=75" },
  { name: "Araquari", code: "AR", desc: "Uma comunidade que cresce, compete e celebra cada conquista.", students: "1.840", medals: 18, image: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?auto=format&fit=crop&w=700&q=75" },
  { name: "São Bento do Sul", code: "SB", desc: "Trabalho em equipe e tradição esportiva na Serra Catarinense.", students: "1.730", medals: 14, image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=75" }
];

const fixtures = [
  { day: "17", month: "OUT", title: "Camboriú × Concórdia", meta: "Futsal · Ginásio principal", tag: "13:45" },
  { day: "17", month: "OUT", title: "Rio do Sul × Blumenau", meta: "Vôlei · Quadra 2", tag: "15:00" },
  { day: "17", month: "OUT", title: "Séries 100 m rasos", meta: "Atletismo · Pista central", tag: "16:30" }
];

const athleticsEvents = [
  { name: "100 m rasos", category: "Pista · velocidade" },
  { name: "200 m rasos", category: "Pista · velocidade" },
  { name: "1.500 m", category: "Pista · meio-fundo" },
  { name: "3.000 m", category: "Pista · fundo" },
  { name: "Revezamento 4 × 100 m", category: "Pista · revezamento" },
  { name: "Revezamento 4 × 400 m", category: "Pista · revezamento" },
  { name: "Salto em altura", category: "Campo · salto" },
  { name: "Salto em distância", category: "Campo · salto" },
  { name: "Salto triplo", category: "Campo · salto" },
  { name: "Lançamento do disco", category: "Campo · lançamento" },
  { name: "Lançamento do dardo", category: "Campo · lançamento" },
  { name: "Arremesso de peso", category: "Campo · arremesso" }
];

const tournamentGroups = [
  { name: "Grupo A", teams: ["Camboriú", "Araquari", "Videira", "Brusque"] },
  { name: "Grupo B", teams: ["Concórdia", "Ibirama", "Luzerna", "Fraiburgo"] },
  { name: "Grupo C", teams: ["Blumenau", "Sombrio", "Abelardo Luz", "Santa Rosa do Sul"] },
  { name: "Grupo D", teams: ["Rio do Sul", "São Bento do Sul", "São Francisco do Sul"] }
];

const pageNames = { inicio: "Visão geral", calendario: "Calendário", atletismo: "Atletismo", podios: "Pódios", atletas: "Atletas", campus: "Campus", modalidades: "Modalidades", "detalhes-modalidade": "Detalhes da modalidade" };
const pageContent = document.getElementById("page-content");
let selectedModality = null;
let activeRole = null;
let editorSection = "athletes";
let selectedAthleteId = athletes[0].id;
let selectedAdminAthleteIndex = 0;
let selectedFixtureIndex = 0;
let selectedEventIndex = 0;
let selectedModalityIndex = 0;
let selectedMedalIndex = 0;
let selectedCampusIndex = 0;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function loadEditorData() {
  try {
    const saved = JSON.parse(localStorage.getItem("ifc-editor-data") || "{}");
    if (Array.isArray(saved.athletes)) athletes.splice(0, athletes.length, ...saved.athletes);
    if (Array.isArray(saved.medals)) medals.splice(0, medals.length, ...saved.medals);
    if (Array.isArray(saved.modalities)) {
      const restoredModalities = saved.modalities.map(modality => ({
        ...modality,
        next: String(modality.next).replace(/^Ao vivo\s*[·-]\s*/i, "Hoje · ")
      }));
      modalities.splice(0, modalities.length, ...restoredModalities);
    }
    if (Array.isArray(saved.campuses)) campuses.splice(0, campuses.length, ...saved.campuses);
    if (Array.isArray(saved.fixtures)) {
      const restoredFixtures = saved.fixtures.map(game => {
        const hadLiveStatus = game.live || String(game.tag).toLocaleUpperCase("pt-BR") === "AO VIVO";
        const restoredGame = { ...game, tag: hadLiveStatus ? "A definir" : game.tag };
        delete restoredGame.live;
        if (hadLiveStatus) delete restoredGame.score;
        return restoredGame;
      });
      fixtures.splice(0, fixtures.length, ...restoredFixtures);
    }
    if (Array.isArray(saved.athleticsEvents)) athleticsEvents.splice(0, athleticsEvents.length, ...saved.athleticsEvents);
  } catch (error) {
    showToast("Os dados demonstrativos salvos não puderam ser carregados.", true);
  }
}

function saveEditorData() {
  try {
    localStorage.setItem("ifc-editor-data", JSON.stringify({ athletes, medals, modalities, campuses, fixtures, athleticsEvents }));
    return true;
  } catch (error) {
    showToast("As alterações foram aplicadas nesta sessão, mas não puderam ser salvas neste navegador.", true);
    return false;
  }
}

loadEditorData();

function rankedMedals() {
  return [...medals].sort((left, right) =>
    Number(right.gold) - Number(left.gold)
    || Number(right.silver) - Number(left.silver)
    || Number(right.bronze) - Number(left.bronze)
  );
}

function medalRows() {
  return rankedMedals().map((campus, i) => `<tr><td><span class="rank">${String(i + 1).padStart(2, "0")}</span></td><td><span class="campus-cell"><span class="campus-mark">${escapeHtml(campus.code)}</span><span class="campus-name">${escapeHtml(campus.name)}</span></span></td><td class="gold-medal">${escapeHtml(campus.gold)}</td><td class="silver-medal">${escapeHtml(campus.silver)}</td><td class="bronze-medal">${escapeHtml(campus.bronze)}</td><td><strong>${Number(campus.gold) + Number(campus.silver) + Number(campus.bronze)}</strong></td></tr>`).join("");
}

function normalizeCampusName(name) {
  return String(name).replace(/^Campus\s+/i, "").trim();
}

function medalTotalForCampus(campus) {
  const medalRecord = medals.find(item => normalizeCampusName(item.name) === normalizeCampusName(campus.name));
  return medalRecord ? Number(medalRecord.gold) + Number(medalRecord.silver) + Number(medalRecord.bronze) : Number(campus.medals || 0);
}

function syncCampusName(oldName, newName, code) {
  const oldNormalizedName = normalizeCampusName(oldName);
  const newNormalizedName = normalizeCampusName(newName);
  const campus = campuses.find(item => normalizeCampusName(item.name) === oldNormalizedName);
  const medalRecord = medals.find(item => normalizeCampusName(item.name) === oldNormalizedName)
    || medals.find(item => normalizeCampusName(item.name) === newNormalizedName);

  if (campus) {
    campus.name = newNormalizedName;
    if (code) campus.code = code;
    if (medalRecord) campus.medals = Number(medalRecord.gold) + Number(medalRecord.silver) + Number(medalRecord.bronze);
  }
  if (medalRecord) {
    medalRecord.name = `Campus ${newNormalizedName}`;
    if (code) medalRecord.code = code;
  }
  athletes.forEach(athlete => {
    if (normalizeCampusName(athlete.campus) === oldNormalizedName) athlete.campus = `Campus ${newNormalizedName}`;
  });
}

function fixtureRows() {
  return fixtures.map((game) => `<div class="fixture"><div class="fixture-date"><strong>${escapeHtml(game.day)}</strong><small>${escapeHtml(game.month)}</small></div><div class="fixture-info"><strong>${escapeHtml(game.title)}</strong><small>${escapeHtml(game.meta)}${game.score ? ` · ${escapeHtml(game.score)}` : ""}</small></div><span class="fixture-tag">${escapeHtml(game.tag)}</span></div>`).join("");
}

function renderHome() {
  pageContent.innerHTML = `
    <section class="hero">
      <div class="hero-copy"><p class="eyebrow">17 — 19 DE OUTUBRO · SANTA CATARINA</p><h1>O esporte nos une.<br /><span>A torcida também.</span></h1><p class="page-subtitle">Acompanhe de perto os Jogos do IFC 2025. Três dias de talento, encontros e histórias para celebrar.</p><div class="hero-actions"><button class="primary-button" data-page="calendario">Explorar calendário <span>→</span></button><button class="secondary-button" data-page="modalidades">Conheça as modalidades <span>↗</span></button></div></div>
      <div class="hero-scene"><div class="hero-upcoming"><strong>Jogos ao vivo em breve</strong><small>As transmissões serão anunciadas por aqui.</small></div></div>
    </section>
    <div class="stats-grid">
      <article class="stat-card"><div class="stat-top">Atletas inscritos <span class="stat-icon">♙</span></div><div class="stat-value">760<span class="stat-foot">+12% vs. 2024</span></div></article>
      <article class="stat-card"><div class="stat-top">Campus participantes <span class="stat-icon">⌖</span></div><div class="stat-value">15<span class="stat-foot">de todo o IFC</span></div></article>
      <article class="stat-card"><div class="stat-top">Modalidades <span class="stat-icon">◈</span></div><div class="stat-value">8<span class="stat-foot">esportes em disputa</span></div></article>
      <article class="stat-card"><div class="stat-top">Jogos programados <span class="stat-icon">▦</span></div><div class="stat-value">124<span class="stat-foot">durante a edição</span></div></article>
    </div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-title-row"><div><h3>Quadro de medalhas</h3><p>Classificação geral · JIFC 2025</p></div><button data-page="podios">Ver classificação →</button></div><table class="medal-table"><thead><tr><th>#</th><th>CAMPUS</th><th>OURO</th><th>PRATA</th><th>BRONZE</th><th>TOTAL</th></tr></thead><tbody>${medalRows()}</tbody></table></section>
      <section class="panel"><div class="panel-title-row"><div><h3>Agenda de hoje</h3><p>Sexta-feira, 17 de outubro</p></div><button data-page="calendario">Ver agenda →</button></div><div class="fixture-list">${fixtureRows()}</div></section>
    </div>
    <div class="home-bottom">
      <section class="panel"><div class="panel-title-row"><div><h3>Atletas em destaque</h3><p>Quem está fazendo história nos jogos</p></div><button data-page="atletas">Ver atletas →</button></div><div class="athlete-mini-list">${athletes.slice(0, 4).map(a => `<div class="athlete-mini" data-athlete="${escapeHtml(a.id)}"><img src="${escapeHtml(a.photo)}" alt="" /><span><strong>${escapeHtml(a.name)}</strong><small>${escapeHtml(a.modality)} · ${escapeHtml(a.campus.replace("Campus ", ""))}</small></span></div>`).join("")}</div></section>
      <section class="panel"><div class="panel-title-row"><div><h3>Próximas disputas</h3><p>Confira os jogos e horários programados.</p></div><button data-page="calendario">Ver agenda →</button></div><div class="fixture-list">${fixtureRows()}</div></section>
    </div>`;
}

function athleteCard(a) {
  return `<article class="athlete-card" data-athlete="${escapeHtml(a.id)}" tabindex="0"><img class="athlete-photo" src="${escapeHtml(a.photo)}" alt="Foto de ${escapeHtml(a.name)}" /><div class="athlete-card-body"><div class="athlete-title-row"><div><h3>${escapeHtml(a.name)}</h3><p>${escapeHtml(a.campus)}</p></div><span class="position-pill">${escapeHtml(a.modality)}</span></div><div class="athlete-metrics"><span><strong>${escapeHtml(a.age)} anos</strong>Idade</span><span><strong>${escapeHtml(a.height)}</strong>Altura</span><span><strong>${escapeHtml(a.rating)}</strong>Última nota</span></div></div></article>`;
}

function renderAthletes() {
  pageContent.innerHTML = `<p class="eyebrow">TALENTO EM CADA CAMPUS</p><h1>Atletas</h1><p class="page-subtitle">Conheça quem faz os jogos acontecerem. Cada história merece torcida.</p><div class="list-toolbar"><label class="search-box"><span>⌕</span><input id="athlete-search" type="search" placeholder="Buscar por atleta, campus ou modalidade..." aria-label="Buscar atletas" /></label><select class="select-box" id="athlete-filter" aria-label="Filtrar modalidade"><option value="">Todas as modalidades</option>${modalities.map(m => `<option>${escapeHtml(m.name)}</option>`).join("")}</select></div><div class="card-grid" id="athlete-grid">${athletes.map(athleteCard).join("")}</div>`;
  document.getElementById("athlete-search").addEventListener("input", filterAthletes);
  document.getElementById("athlete-filter").addEventListener("change", filterAthletes);
}

function filterAthletes() {
  const query = document.getElementById("athlete-search").value.toLocaleLowerCase("pt-BR");
  const modality = document.getElementById("athlete-filter").value;
  const filtered = athletes.filter(a => `${a.name} ${a.campus} ${a.modality}`.toLocaleLowerCase("pt-BR").includes(query) && (!modality || a.modality === modality));
  document.getElementById("athlete-grid").innerHTML = filtered.length ? filtered.map(athleteCard).join("") : `<div class="empty-state">Nenhum atleta encontrado. Tente outro nome ou modalidade.</div>`;
}

function renderModalities() {
  pageContent.innerHTML = `<p class="eyebrow">ESPORTE PARA TODO MUNDO</p><h1>Modalidades</h1><p class="page-subtitle">Descubra os esportes, acompanhe as disputas e encontre sua próxima torcida.</p><div class="list-toolbar"><label class="search-box"><span>⌕</span><input id="modality-search" type="search" placeholder="Buscar modalidade..." aria-label="Buscar modalidades" /></label></div><div class="card-grid" id="modality-grid">${modalityCards(modalities)}</div>`;
  document.getElementById("modality-search").addEventListener("input", (event) => {
    const query = event.target.value.toLocaleLowerCase("pt-BR");
    const filtered = modalities.filter(m => `${m.name} ${m.desc}`.toLocaleLowerCase("pt-BR").includes(query));
    document.getElementById("modality-grid").innerHTML = filtered.length ? modalityCards(filtered) : `<div class="empty-state">Nenhuma modalidade encontrada.</div>`;
  });
}

function modalityCards(list) {
  return list.map((m) => `<article class="modality-card"><div class="modality-top"><span class="modality-icon">${escapeHtml(m.icon)}</span><span class="position-pill">JIFC 2025</span></div><h3>${escapeHtml(m.name)}</h3><p>${escapeHtml(m.desc)}</p><div class="modality-foot"><span>${escapeHtml(m.athletes)} atletas · ${escapeHtml(m.campus)} campus</span><button data-modality="${escapeHtml(m.name)}">Detalhes ↗</button></div></article>`).join("");
}

function renderPodios() {
  const podiumAthletes = [athletes[2], athletes[4], athletes[0]];
  const podiumMarkup = podiumAthletes.map((a, index) => `<div class="podium-place ${["second", "first", "third"][index]}"><img src="${escapeHtml(a.photo)}" alt="Foto de ${escapeHtml(a.name)}" /><strong>${escapeHtml(a.name)}</strong><small>${escapeHtml(a.campus.replace("Campus ", ""))} · ${["12,48 s", "12,16 s", "12,71 s"][index]}</small><div class="podium-step">${[2, 1, 3][index]}${index === 0 ? `<span class="podium-number"></span>` : ""}</div></div>`).join("");
  pageContent.innerHTML = `<p class="eyebrow">CADA CONQUISTA TEM UMA HISTÓRIA</p><h1>Pódios & resultados</h1><p class="page-subtitle">Celebre os destaques da edição e acompanhe o quadro geral de medalhas.</p><div class="list-toolbar"><select class="select-box" id="podium-filter" aria-label="Filtrar modalidade"><option value="">Todas as modalidades</option>${modalities.map(m => `<option>${escapeHtml(m.name)}</option>`).join("")}</select><select class="select-box" id="podium-type" aria-label="Tipo de resultado"><option value="">Todos os pódios</option><option>Ouro</option><option>Prata</option><option>Bronze</option></select></div><section class="panel"><div class="panel-title-row"><div><h3>Destaque do atletismo · 100 m rasos</h3><p>Final feminina · Pista central</p></div><span class="status-pill">FINALIZADO</span></div><div class="podium-wrap">${podiumMarkup}</div></section><section class="panel" style="margin-top:17px"><div class="panel-title-row"><div><h3>Quadro de medalhas</h3><p>Classificação geral · JIFC 2025</p></div></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>POSIÇÃO</th><th>CAMPUS</th><th>OURO</th><th>PRATA</th><th>BRONZE</th><th>TOTAL</th></tr></thead><tbody>${rankedMedals().map((m,i) => `<tr><td>${String(i+1).padStart(2,"0")}</td><td>${escapeHtml(m.name)}</td><td class="gold-medal">${escapeHtml(m.gold)}</td><td class="silver-medal">${escapeHtml(m.silver)}</td><td class="bronze-medal">${escapeHtml(m.bronze)}</td><td><strong>${Number(m.gold)+Number(m.silver)+Number(m.bronze)}</strong></td></tr>`).join("")}</tbody></table></div></section>`;
}

function renderCalendar() {
  pageContent.innerHTML = `<p class="eyebrow">17 — 19 DE OUTUBRO · EDIÇÃO 2025</p><h1>Calendário</h1><p class="page-subtitle">Toda a programação dos Jogos IFC em um só lugar.</p><div class="list-toolbar"><select class="select-box" id="calendar-filter" aria-label="Filtrar modalidade"><option value="">Todas as modalidades</option>${modalities.map(m=>`<option>${escapeHtml(m.name)}</option>`).join("")}</select><select class="select-box" aria-label="Selecionar dia"><option>Sexta-feira · 17 out</option><option>Sábado · 18 out</option><option>Domingo · 19 out</option></select></div><section class="panel"><div class="panel-title-row"><div><h3>Sexta-feira, 17 de outubro</h3><p>Jogos e provas de hoje</p></div><span class="status-pill">${fixtures.length} atividades</span></div><div id="calendar-events">${calendarRows(fixtures)}</div></section><section class="panel" style="margin-top:15px"><div class="panel-title-row"><div><h3>Em breve</h3><p>Próximas disputas da programação</p></div></div>${calendarRows([{day:"18",month:"OUT",title:"Final feminina · Vôlei",meta:"Quadra central · Semifinais",tag:"09:00"},{day:"19",month:"OUT",title:"Cerimônia de encerramento",meta:"Ginásio principal · Premiação",tag:"16:00"}])}</section>`;
  document.getElementById("calendar-filter").addEventListener("change", e => {
    const filtered = e.target.value ? fixtures.filter(f => f.meta.includes(e.target.value)) : fixtures;
    document.getElementById("calendar-events").innerHTML = filtered.length ? calendarRows(filtered) : `<div class="empty-state">Nenhum jogo desta modalidade está na programação de hoje.</div>`;
  });
}

function calendarRows(items) {
  return items.map(g=>`<article class="event-card"><div class="event-row"><div class="event-day"><strong>${escapeHtml(g.day)}</strong><small>${escapeHtml(g.month)}</small></div><div class="event-detail"><strong>${escapeHtml(g.title)}</strong><p>${escapeHtml(g.meta)}${g.score ? ` · Placar ${escapeHtml(g.score)}` : ""}</p></div><span class="fixture-tag">${escapeHtml(g.tag)}</span></div></article>`).join("");
}

function renderAthletics() {
  pageContent.innerHTML = `<p class="eyebrow">VELOCIDADE, TÉCNICA E SUPERAÇÃO</p><h1>Atletismo</h1><p class="page-subtitle">Cada centésimo conta. Acompanhe as provas e marcas que inspiram.</p><section class="detail-hero"><p class="eyebrow">PROGRAMAÇÃO DE HOJE</p><h2>Na pista, todo mundo faz história.</h2><p>Provas de pista e campo reúnem atletas de todo o IFC. Confira as modalidades e os próximos desafios.</p><div class="detail-stats"><span><strong>124</strong><small>ATLETAS</small></span><span><strong>12</strong><small>CAMPUS</small></span><span><strong>${athleticsEvents.length}</strong><small>PROVAS</small></span></div></section><section class="panel"><div class="panel-title-row"><div><h3>Provas do atletismo</h3><p>Provas previstas para esta edição · JIFC 2025</p></div><span class="status-pill">PISTA E CAMPO</span></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>#</th><th>PROVA</th><th>CATEGORIA</th><th>RESULTADO</th></tr></thead><tbody>${athleticsEvents.map((event, index) => `<tr><td>${String(index + 1).padStart(2, "0")}</td><td>${escapeHtml(event.name)}</td><td>${escapeHtml(event.category)}</td><td><span class="status-pill scheduled">Programação em atualização</span></td></tr>`).join("")}</tbody></table></div></section><div class="section-heading" style="margin-top:25px"><div><h2>Atletas da pista</h2><p>Destaques do atletismo nesta edição</p></div><button class="section-link" data-page="atletas">Ver todos →</button></div><div class="card-grid">${athletes.filter(a=>a.modality==="Atletismo").map(athleteCard).join("")}</div>`;
}

function renderModalityDetails() {
  const m = selectedModality;
  if (!m) {
    renderPage("modalidades");
    return;
  }
  if (m.name === "Atletismo") {
    pageContent.innerHTML = `<button class="section-link back-link" data-page="modalidades">← Voltar para modalidades</button><p class="eyebrow">MODALIDADE · JIFC 2025</p><h1>${escapeHtml(m.name)}</h1><p class="page-subtitle">${escapeHtml(m.desc)} Confira as provas previstas para a competição.</p><section class="detail-hero"><p class="eyebrow">PISTA E CAMPO</p><h2>Provas de atletismo</h2><p>A programação e os resultados oficiais serão publicados pela organização. A lista abaixo mostra as provas previstas.</p><div class="detail-stats"><span><strong>${escapeHtml(m.athletes)}</strong><small>ATLETAS</small></span><span><strong>${escapeHtml(m.campus)}</strong><small>CAMPUS</small></span><span><strong>${athleticsEvents.length}</strong><small>PROVAS</small></span></div></section><section class="panel"><div class="panel-title-row"><div><h3>Tabela de provas</h3><p>Disputas individuais e revezamentos</p></div><span class="status-pill scheduled">RESULTADOS A PUBLICAR</span></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>#</th><th>PROVA</th><th>TIPO</th><th>FASE / RESULTADO</th></tr></thead><tbody>${athleticsEvents.map((event, index) => `<tr><td>${String(index + 1).padStart(2, "0")}</td><td>${escapeHtml(event.name)}</td><td>${escapeHtml(event.category)}</td><td><span class="status-pill scheduled">Programação em atualização</span></td></tr>`).join("")}</tbody></table></div></section><div class="form-note">As provas e os resultados são demonstrativos até a publicação da programação oficial do JIFC.</div>`;
    return;
  }

  const related = athletes.filter(a => a.modality === m.name);
  const campusAbbr = { "Camboriú": "CAM", "Araquari": "ARA", "Videira": "VID", "Brusque": "BRU", "Concórdia": "CON", "Ibirama": "IBI", "Luzerna": "LUZ", "Fraiburgo": "FRA", "Blumenau": "BLU", "Sombrio": "SOM", "Abelardo Luz": "ABL", "Santa Rosa do Sul": "SRS", "Rio do Sul": "RIO", "São Bento do Sul": "SBS", "São Francisco do Sul": "SFS" };
  const groupMarkup = tournamentGroups.map(group => `<section class="group-card"><h3>${group.name}</h3><table class="group-table"><thead><tr><th>#</th><th>CAMPUS</th><th>J</th><th>V</th><th>PTS</th></tr></thead><tbody>${group.teams.map((team,index)=>`<tr><td>${index+1}</td><td><span class="group-team"><span class="campus-mark">${campusAbbr[team] || "IFC"}</span>${team}</span></td><td>—</td><td>—</td><td>—</td></tr>`).join("")}</tbody></table><p class="group-note">Classificação a definir</p></section>`).join("");
  const quarterfinals = ["1º Grupo A × 2º Grupo B", "1º Grupo C × 2º Grupo D", "1º Grupo B × 2º Grupo A", "1º Grupo D × 2º Grupo C"];
  const bracket = (title, items) => `<section class="bracket-round"><h3>${title}</h3>${items.map((label,index)=>`<article class="bracket-match"><span class="bracket-number">${String(index+1).padStart(2,"0")}</span><div><strong>${label}</strong><small>A definir após a fase anterior</small></div><span class="bracket-score">—</span></article>`).join("")}</section>`;
  pageContent.innerHTML = `<button class="section-link back-link" data-page="modalidades">← Voltar para modalidades</button><p class="eyebrow">MODALIDADE · JIFC 2025</p><h1>${escapeHtml(m.name)}</h1><p class="page-subtitle">${escapeHtml(m.desc)}</p><section class="detail-hero"><p class="eyebrow">FASE DE GRUPOS · ELIMINATÓRIAS</p><h2>O caminho até a final.</h2><p>Veja a composição demonstrativa dos grupos e o formato previsto para as quartas de final, semifinais e final.</p><div class="detail-stats"><span><strong>${escapeHtml(m.athletes)}</strong><small>ATLETAS</small></span><span><strong>${escapeHtml(m.campus)}</strong><small>CAMPUS</small></span><span><strong>${escapeHtml(m.next)}</strong><small>PRÓXIMA DISPUTA</small></span></div></section><div class="form-note">Chaveamento ilustrativo para demonstrar o formato da competição. Grupos, confrontos, horários e resultados oficiais ainda precisam ser confirmados pela organização.</div><section class="panel tournament-section"><div class="panel-title-row"><div><h3>Fase de grupos</h3><p>Classificam-se os dois primeiros colocados de cada grupo.</p></div><span class="status-pill scheduled">GRUPOS ILUSTRATIVOS</span></div><div class="group-grid">${groupMarkup}</div></section><section class="panel tournament-section"><div class="panel-title-row"><div><h3>Eliminatórias</h3><p>Confrontos previstos após a fase de grupos.</p></div></div><div class="bracket-grid">${bracket("Quartas de final", quarterfinals)}${bracket("Semifinais", ["Vencedor QF 1 × Vencedor QF 2", "Vencedor QF 3 × Vencedor QF 4"])}${bracket("Final", ["Vencedor semifinal 1 × Vencedor semifinal 2"])}</div></section><section class="panel tournament-section"><div class="panel-title-row"><div><h3>Atletas em destaque</h3><p>Perfis associados a esta modalidade</p></div></div>${related.length ? `<div class="athlete-mini-list">${related.map(a=>`<div class="athlete-mini" data-athlete="${escapeHtml(a.id)}"><img src="${escapeHtml(a.photo)}" alt="" /><span><strong>${escapeHtml(a.name)}</strong><small>${escapeHtml(a.campus)}</small></span></div>`).join("")}</div>` : `<p class="page-subtitle">Os destaques serão publicados conforme os resultados oficiais.</p>`}</section>`;
}

function renderCampuses() {
  pageContent.innerHTML = `<p class="eyebrow">15 CAMPI · UMA SÓ TORCIDA</p><h1>Nossos campus</h1><p class="page-subtitle">Conheça as comunidades, histórias e conquistas que fazem parte dos Jogos IFC.</p><div class="campus-banner"><div><p class="eyebrow">ORGULHO DE PERTENCER</p><h2>Um IFC. Muitas histórias.</h2><p>Cada campus traz sua energia. Juntos, fazemos os jogos acontecerem.</p></div><button class="primary-button" data-open-auth="login">Área do administrador ↗</button></div><div class="card-grid">${campuses.map(c => `<article class="campus-card"><img class="campus-cover" src="${escapeHtml(c.image)}" alt="Campus ${escapeHtml(c.name)}" /><div class="campus-card-body"><h3>Campus ${escapeHtml(c.name)}</h3><p>${escapeHtml(c.desc)}</p><div class="campus-facts"><span><strong>${escapeHtml(c.students)}</strong>estudantes</span><span><strong>${escapeHtml(medalTotalForCampus(c))}</strong>medalhas</span><span><strong>${escapeHtml(c.code)}</strong>sigla</span></div></div></article>`).join("")}</div>`;
}

function renderPage(page) {
  const name = page === "detalhes-modalidade" && selectedModality ? selectedModality.name : pageNames[page] || pageNames.inicio;
  document.getElementById("breadcrumb-current").textContent = name;
  document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.page === page));
  if (page === "detalhes-modalidade") document.querySelector('.nav-link[data-page="modalidades"]').classList.add("active");
  const renderers = { inicio: renderHome, calendario: renderCalendar, atletismo: renderAthletics, podios: renderPodios, atletas: renderAthletes, campus: renderCampuses, modalidades: renderModalities, "detalhes-modalidade": renderModalityDetails };
  (renderers[page] || renderHome)();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModal(content) {
  document.getElementById("modal-root").innerHTML = `<div class="modal-backdrop" data-backdrop><section class="modal" role="dialog" aria-modal="true">${content}</section></div>`;
  document.querySelector(".modal-close").addEventListener("click", closeModal);
  document.querySelector("[data-backdrop]").addEventListener("click", event => { if (event.target.hasAttribute("data-backdrop")) closeModal(); });
  document.addEventListener("keydown", handleEscape, { once: true });
}

function handleEscape(event) {
  if (event.key === "Escape") closeModal();
  else document.addEventListener("keydown", handleEscape, { once: true });
}

function closeModal() {
  document.getElementById("modal-root").innerHTML = "";
}

function openAuth(mode) {
  if (activeRole) {
    renderEditor();
    return;
  }
  const credentials = {
    server: { email: "servidor@ifc.edu.br", password: "servidor2025" },
    admin: { email: "admin@ifc.edu.br", password: "admin2025" }
  };
  openModal(`<button class="modal-close" type="button" aria-label="Fechar">×</button><p class="eyebrow">JOGOS IFC · ÁREA RESTRITA</p><h2>Acesso para edição</h2><p class="modal-intro">Escolha um perfil demonstrativo para preencher os dados de acesso.</p><div class="demo-access-list"><button class="secondary-button" type="button" data-demo-login="server"><strong>Servidor</strong><span>Preencher acesso de edição de atletas</span></button><button class="secondary-button" type="button" data-demo-login="admin"><strong>Administrador</strong><span>Preencher acesso de edição completa</span></button></div><form id="auth-form"><div class="form-grid"><div class="form-field full"><label for="login-email">E-mail de demonstração</label><input id="login-email" name="email" type="email" required autocomplete="username" value="${credentials.server.email}" /></div><div class="form-field full"><label for="login-password">Senha</label><input id="login-password" name="password" type="password" required autocomplete="current-password" value="${credentials.server.password}" /></div></div><div class="form-note">Protótipo local: a autenticação e as permissões são demonstrativas, não substituem um serviço seguro de login.</div><button class="primary-button form-submit" type="submit">Entrar <span>→</span></button></form>`);
  document.getElementById("auth-form").addEventListener("submit", event => {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim().toLocaleLowerCase("pt-BR");
    const password = document.getElementById("login-password").value;
    const role = Object.entries(credentials).find(([, account]) => account.email === email && account.password === password)?.[0];
    if (!role) {
      showToast("E-mail ou senha demonstrativa incorretos.", true);
      return;
    }
    activeRole = role;
    editorSection = "athletes";
    closeModal();
    renderEditor();
  });
  document.querySelectorAll("[data-demo-login]").forEach(button => {
    button.addEventListener("click", () => {
      const account = credentials[button.dataset.demoLogin];
      document.getElementById("login-email").value = account.email;
      document.getElementById("login-password").value = account.password;
    });
  });
}

function editorField(label, key, value, type = "text", extra = "") {
  return `<div class="form-field"><label for="edit-${key}">${escapeHtml(label)}</label><input id="edit-${key}" name="${key}" type="${type}" value="${escapeHtml(value)}" ${extra} /></div>`;
}

function editorSelect(label, key, value, options) {
  return `<div class="form-field"><label for="edit-${key}">${escapeHtml(label)}</label><select id="edit-${key}" name="${key}">${options.map(option => `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select></div>`;
}

function renderServerEditor() {
  const athlete = athletes.find(item => item.id === Number(selectedAthleteId)) || athletes[0];
  if (!athlete) {
    pageContent.innerHTML = `<section class="panel"><h2>Nenhum atleta cadastrado</h2><p class="page-subtitle">Peça ao administrador para cadastrar atletas.</p></section>`;
    return;
  }
  pageContent.innerHTML = `<div class="editor-session-row"><span>Perfil: servidor</span><button type="button" class="secondary-button" data-editor-logout>Sair</button></div><p class="eyebrow">ÁREA RESTRITA · SERVIDOR</p><h1>Edição de atleta</h1><p class="page-subtitle">Este perfil pode atualizar somente a foto, a altura e a idade dos atletas.</p><section class="panel editor-panel"><div class="panel-title-row"><div><h3>Selecione o atleta</h3><p>Os demais dados permanecem bloqueados para este perfil.</p></div><span class="status-pill">SERVIDOR</span></div><div class="form-field"><label for="server-athlete">Atleta</label><select id="server-athlete">${athletes.map(item => `<option value="${escapeHtml(item.id)}" ${item.id === athlete.id ? "selected" : ""}>${escapeHtml(item.name)} · ${escapeHtml(item.campus)}</option>`).join("")}</select></div><form id="server-athlete-form" data-editor-form="server-athlete"><div class="editor-form-grid">${editorField("Idade", "age", athlete.age, "number", 'min="10" max="100" required')}${editorField("Altura", "height", athlete.height, "text", 'required placeholder="Ex.: 1,72 m"')}${editorField("Foto (URL)", "photo", athlete.photo, "url", 'placeholder="https://..."')}</div><div class="form-field editor-upload"><label for="server-photo-file">Ou envie uma imagem do dispositivo</label><input id="server-photo-file" type="file" accept="image/*" /><input id="server-photo-data" type="hidden" name="photoData" /></div><div class="editor-actions"><button class="primary-button" type="submit">Salvar dados do atleta <span>→</span></button></div></form></section><div class="form-note">Alterações são guardadas neste navegador para demonstração.</div>`;
  document.getElementById("server-athlete").addEventListener("change", event => {
    selectedAthleteId = Number(event.target.value);
    renderServerEditor();
  });
  document.getElementById("server-photo-file").addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Selecione um arquivo de imagem.", true);
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      document.getElementById("server-photo-data").value = reader.result;
    });
    reader.addEventListener("error", () => showToast("Não foi possível ler a imagem selecionada.", true));
    reader.readAsDataURL(file);
  });
}

function renderAdminEditor() {
  const sections = [
    ["athletes", "Atletas"], ["schedule", "Horários"], ["modalities", "Modalidades"],
    ["medals", "Estatísticas"], ["campuses", "Campus"], ["events", "Provas"]
  ];
  const tabs = sections.map(([key, label]) => `<button type="button" class="editor-tab${editorSection === key ? " active" : ""}" data-editor-section="${key}">${label}</button>`).join("");
  let content = "";
  if (editorSection === "athletes") {
    const a = athletes[selectedAdminAthleteIndex] || athletes[0];
    content = a ? `<div class="form-field"><label for="admin-athlete">Atleta</label><select id="admin-athlete">${athletes.map((item, index) => `<option value="${index}" ${index === selectedAdminAthleteIndex ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}</select></div><form data-editor-form="admin-athlete"><div class="editor-form-grid">${editorField("Nome", "name", a.name)}${editorField("Campus", "campus", a.campus)}${editorSelect("Modalidade", "modality", a.modality, modalities.map(item => item.name))}${editorField("Posição", "position", a.position)}${editorField("Idade", "age", a.age, "number", 'min="10" max="100" required')}${editorField("Altura", "height", a.height)}${editorSelect("Medalha", "medal", a.medal, ["Ouro", "Prata", "Bronze", "Sem medalha"])}${editorField("Marcas e resultados", "marks", a.marks)}${editorField("Foto (URL)", "photo", a.photo, "url")}</div><p class="form-note">Gols/pontos, assistências e nota são apenas visuais nesta versão.</p><div class="editor-actions"><button class="primary-button" type="submit">Salvar atleta <span>→</span></button></div></form>` : `<div class="empty-state">Nenhum atleta cadastrado.</div>`;
  } else if (editorSection === "schedule") {
    const game = fixtures[selectedFixtureIndex] || fixtures[0];
    content = game ? `<div class="form-field"><label for="admin-fixture">Evento</label><select id="admin-fixture">${fixtures.map((item, index) => `<option value="${index}" ${index === selectedFixtureIndex ? "selected" : ""}>${escapeHtml(item.title)}</option>`).join("")}</select></div><form data-editor-form="admin-fixture"><div class="editor-form-grid">${editorField("Dia", "day", game.day, "number", 'min="1" max="31"')}${editorField("Mês", "month", game.month)}${editorField("Confronto / evento", "title", game.title)}${editorField("Modalidade e local", "meta", game.meta)}${editorField("Horário / situação", "tag", game.tag)}${editorField("Placar / resultado", "score", game.score || "")}</div><div class="editor-actions"><button class="primary-button" type="submit">Salvar programação <span>→</span></button></div></form>` : `<div class="empty-state">Nenhum horário cadastrado.</div>`;
  } else if (editorSection === "modalities") {
    const m = modalities[selectedModalityIndex] || modalities[0];
    content = m ? `<div class="form-field"><label for="admin-modality">Modalidade</label><select id="admin-modality">${modalities.map((item, index) => `<option value="${index}" ${index === selectedModalityIndex ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}</select></div><form data-editor-form="admin-modality"><div class="editor-form-grid">${editorField("Nome", "name", m.name)}${editorField("Ícone", "icon", m.icon)}${editorField("Descrição", "desc", m.desc)}${editorField("Quantidade de atletas", "athletes", m.athletes, "number", 'min="0"')}${editorField("Quantidade de campus", "campus", m.campus, "number", 'min="0"')}${editorField("Próxima disputa", "next", m.next)}</div><div class="editor-actions"><button class="primary-button" type="submit">Salvar modalidade <span>→</span></button></div></form>` : `<div class="empty-state">Nenhuma modalidade cadastrada.</div>`;
  } else if (editorSection === "medals") {
    const item = medals[selectedMedalIndex] || medals[0];
    content = item ? `<div class="form-field"><label for="admin-medal">Campus</label><select id="admin-medal">${medals.map((row, index) => `<option value="${index}" ${index === selectedMedalIndex ? "selected" : ""}>${escapeHtml(row.name)}</option>`).join("")}</select></div><form data-editor-form="admin-medal"><div class="editor-form-grid">${editorField("Campus", "name", item.name)}${editorField("Sigla", "code", item.code)}${editorField("Medalhas de ouro", "gold", item.gold, "number", 'min="0"')}${editorField("Medalhas de prata", "silver", item.silver, "number", 'min="0"')}${editorField("Medalhas de bronze", "bronze", item.bronze, "number", 'min="0"')}</div><p class="form-note">Selecione um campus existente e edite seus totais; não é necessário cadastrar o campus novamente.</p><div class="editor-actions"><button class="primary-button" type="submit">Salvar estatísticas <span>→</span></button></div></form>` : `<div class="empty-state">Nenhuma estatística cadastrada.</div>`;
  } else if (editorSection === "campuses") {
    const campus = campuses[selectedCampusIndex] || campuses[0];
    content = campus ? `<div class="form-field"><label for="admin-campus">Campus</label><select id="admin-campus">${campuses.map((item, index) => `<option value="${index}" ${index === selectedCampusIndex ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}</select></div><form data-editor-form="admin-campus"><div class="editor-form-grid">${editorField("Nome", "name", campus.name)}${editorField("Sigla", "code", campus.code)}${editorField("Descrição", "desc", campus.desc)}${editorField("Quantidade de estudantes", "students", campus.students)}${editorField("Imagem (URL)", "image", campus.image, "url")}</div><p class="form-note">As medalhas deste campus são editadas na aba Estatísticas.</p><div class="editor-actions"><button class="primary-button" type="submit">Salvar campus <span>→</span></button></div></form>` : `<div class="empty-state">Nenhum campus cadastrado.</div>`;
  } else {
    const event = athleticsEvents[selectedEventIndex] || athleticsEvents[0];
    content = event ? `<div class="form-field"><label for="admin-event">Prova de atletismo</label><select id="admin-event">${athleticsEvents.map((item, index) => `<option value="${index}" ${index === selectedEventIndex ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}</select></div><form data-editor-form="admin-event"><div class="editor-form-grid">${editorField("Nome da prova", "name", event.name)}${editorField("Categoria", "category", event.category)}</div><div class="editor-actions"><button class="primary-button" type="submit">Salvar prova <span>→</span></button></div></form>` : `<div class="empty-state">Nenhuma prova cadastrada.</div>`;
  }
  pageContent.innerHTML = `<div class="editor-session-row"><span>Perfil: administrador</span><button type="button" class="secondary-button" data-editor-logout>Sair</button></div><p class="eyebrow">ÁREA RESTRITA · ADMINISTRADOR</p><h1>Painel de edição</h1><p class="page-subtitle">Edite atletas, resultados, modalidades, agenda e informações dos campus.</p><div class="editor-tabs" role="tablist">${tabs}</div><section class="panel editor-panel"><div class="panel-title-row"><div><h3>${sections.find(([key]) => key === editorSection)?.[1] || "Edição"}</h3><p>As alterações atualizam as telas públicas deste protótipo.</p></div><span class="status-pill">ADMINISTRADOR</span></div>${content}</section><div class="form-note">Alterações são guardadas neste navegador para demonstração.</div>`;
  const selectors = [
    ["admin-athlete", value => { selectedAdminAthleteIndex = Number(value); }],
    ["admin-fixture", value => { selectedFixtureIndex = Number(value); }],
    ["admin-modality", value => { selectedModalityIndex = Number(value); }],
    ["admin-medal", value => { selectedMedalIndex = Number(value); }],
    ["admin-campus", value => { selectedCampusIndex = Number(value); }],
    ["admin-event", value => { selectedEventIndex = Number(value); }]
  ];
  selectors.forEach(([id, update]) => {
    const select = document.getElementById(id);
    if (select) select.addEventListener("change", event => { update(event.target.value); renderAdminEditor(); });
  });
}

function renderEditor() {
  if (!activeRole) {
    openAuth("login");
    return;
  }
  document.getElementById("breadcrumb-current").textContent = activeRole === "admin" ? "Painel de edição" : "Edição de atleta";
  document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
  if (activeRole === "admin") renderAdminEditor();
  else renderServerEditor();
  updateEditorRoleControls();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function submitEditorForm(form) {
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());
  const numericFields = ["age", "goals", "assists", "athletes", "campus", "gold", "silver", "bronze", "medals", "day"];
  numericFields.forEach(key => {
    if (key in values && values[key] !== "") values[key] = Number(values[key]);
  });
  const type = form.dataset.editorForm;
  if (type === "server-athlete") {
    const athlete = athletes.find(item => item.id === Number(selectedAthleteId));
    if (!athlete) return;
    if (!values.photoData && !values.photo.trim()) {
      showToast("Informe uma URL de foto ou envie uma imagem.", true);
      return;
    }
    athlete.age = values.age;
    athlete.height = values.height.trim();
    athlete.photo = values.photoData || values.photo.trim();
  } else if (type === "admin-athlete") Object.assign(athletes[selectedAdminAthleteIndex], values);
  else if (type === "admin-fixture") Object.assign(fixtures[selectedFixtureIndex], values);
  else if (type === "admin-modality") Object.assign(modalities[selectedModalityIndex], values);
  else if (type === "admin-medal") {
    const item = medals[selectedMedalIndex];
    const oldName = item.name;
    Object.assign(item, values);
    item.name = `Campus ${normalizeCampusName(item.name)}`;
    syncCampusName(oldName, item.name, item.code);
  } else if (type === "admin-campus") {
    const campus = campuses[selectedCampusIndex];
    const oldName = campus.name;
    Object.assign(campus, values);
    syncCampusName(oldName, campus.name, campus.code);
  }
  else if (type === "admin-event") Object.assign(athleticsEvents[selectedEventIndex], values);
  if (saveEditorData()) showToast("Alterações salvas.");
  renderEditor();
}

document.addEventListener("submit", event => {
  const form = event.target.closest("[data-editor-form]");
  if (!form) return;
  event.preventDefault();
  submitEditorForm(form);
});

document.addEventListener("click", event => {
  const tab = event.target.closest("[data-editor-section]");
  if (tab && activeRole === "admin") {
    editorSection = tab.dataset.editorSection;
    if (editorSection === "events") selectedEventIndex = 0;
    renderAdminEditor();
    return;
  }
  if (event.target.closest("[data-editor-logout]")) {
    event.preventDefault();
    event.stopImmediatePropagation();
    activeRole = null;
    renderPage("inicio");
    updateEditorRoleControls();
    showToast("Você saiu da área restrita.");
  }
});

document.addEventListener("click", event => {
  const fileInput = event.target.closest("#server-photo-file");
  if (fileInput) document.getElementById("server-photo-data").value = "";
});

function updateEditorRoleControls() {
  const nav = document.querySelector(".main-nav");
  let accessLink = nav.querySelector("[data-editor-link]");
  if (activeRole && !accessLink) {
    accessLink = document.createElement("button");
    accessLink.type = "button";
    accessLink.className = "nav-link";
    accessLink.dataset.editorLink = "true";
    accessLink.innerHTML = `<span class="nav-icon">✎</span>Minha área`;
    nav.appendChild(accessLink);
    accessLink.addEventListener("click", renderEditor);
  } else if (!activeRole && accessLink) accessLink.remove();
  if (accessLink) accessLink.classList.toggle("active", Boolean(activeRole));
  document.querySelector(".top-avatar").setAttribute("aria-label", activeRole
    ? `Área do ${activeRole === "admin" ? "administrador" : "servidor"}`
    : "Acesso restrito");
  document.querySelector(".profile-label").innerHTML = activeRole
    ? `<strong>${activeRole === "admin" ? "Administrador" : "Servidor"}</strong><small><span data-editor-logout class="logout-link">Sair da área</span></small>`
    : `<strong>Área de edição</strong><small>Servidor e administrador</small>`;
}

function openAthlete(id) {
  const a = athletes.find(item => item.id === Number(id));
  if (!a) return;
  openModal(`<button class="modal-close" type="button" aria-label="Fechar">×</button><img class="modal-photo" src="${escapeHtml(a.photo)}" alt="Foto de ${escapeHtml(a.name)}" /><div class="detail-athlete-head"><img src="${escapeHtml(a.photo)}" alt="" /><div><h2>${escapeHtml(a.name)}</h2><p>${escapeHtml(a.campus)} · ${escapeHtml(a.modality)} · ${escapeHtml(a.position)}</p></div></div><div class="athlete-stat-grid"><div class="athlete-stat"><strong>${escapeHtml(a.goals)}</strong><small>GOLS / PONTOS</small></div><div class="athlete-stat"><strong>${escapeHtml(a.assists)}</strong><small>ASSISTÊNCIAS</small></div><div class="athlete-stat"><strong>${escapeHtml(a.medal)}</strong><small>PÓDIO JIFC</small></div><div class="athlete-stat"><strong>${escapeHtml(a.age)} anos</strong><small>IDADE</small></div><div class="athlete-stat"><strong>${escapeHtml(a.height)}</strong><small>ALTURA</small></div><div class="athlete-stat"><strong>${escapeHtml(a.rating)}</strong><small>NOTA DA PARTIDA</small></div></div><p class="detail-copy"><strong>Marcas:</strong> ${escapeHtml(a.marks)}<br /><strong>Modalidades:</strong> ${escapeHtml(a.modality)}<br /><strong>Última partida:</strong> Destaque na competição · Nota ${escapeHtml(a.rating)}</p><button class="primary-button form-submit" data-open-auth="login">Área do servidor · editar atleta ↗</button>`);
}

function openModality(name) {
  selectedModality = modalities.find(item => item.name === name) || null;
  if (selectedModality) renderPage("detalhes-modalidade");
}

function showToast(message, error = false) {
  const root = document.getElementById("toast-root");
  const toast = document.createElement("div");
  toast.className = `toast${error ? " error" : ""}`;
  toast.textContent = message;
  root.appendChild(toast);
  window.setTimeout(() => toast.remove(), 4500);
}

function setTheme(theme, persist = true) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  const toggle = document.getElementById("theme-toggle");
  toggle.setAttribute("aria-pressed", String(dark));
  toggle.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
  toggle.title = dark ? "Ativar modo claro" : "Ativar modo escuro";
  toggle.querySelector(".theme-label").textContent = dark ? "Modo claro" : "Modo escuro";
  toggle.querySelector("[aria-hidden]").textContent = dark ? "☀" : "☾";
  if (persist) {
    try {
      localStorage.setItem("ifc-theme", dark ? "dark" : "light");
    } catch (error) {
      showToast("O tema foi alterado, mas não pôde ser salvo neste navegador.", true);
    }
  }
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

try {
  setTheme(localStorage.getItem("ifc-theme") === "dark" ? "dark" : "light", false);
} catch (error) {
  setTheme("light", false);
  showToast("A preferência de tema não pôde ser carregada neste navegador.", true);
}

document.addEventListener("click", event => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    event.preventDefault();
    renderPage(pageButton.dataset.page);
    return;
  }
  const authButton = event.target.closest("[data-open-auth]");
  if (authButton) {
    openAuth(authButton.dataset.openAuth);
    return;
  }
  const athlete = event.target.closest("[data-athlete]");
  if (athlete) {
    openAthlete(athlete.dataset.athlete);
    return;
  }
  const modality = event.target.closest("[data-modality]");
  if (modality) openModality(modality.dataset.modality);
});

document.addEventListener("keydown", event => {
  const card = event.target.closest && event.target.closest(".athlete-card");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openAthlete(card.dataset.athlete);
  }
});

renderPage("inicio");

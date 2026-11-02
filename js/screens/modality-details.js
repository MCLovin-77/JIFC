const campusAbbreviations = {
  Camboriú: "CAM",
  Araquari: "ARA",
  Videira: "VID",
  Brusque: "BRU",
  Concórdia: "CON",
  Ibirama: "IBI",
  Luzerna: "LUZ",
  Fraiburgo: "FRA",
  Blumenau: "BLU",
  Sombrio: "SOM",
  "Abelardo Luz": "ABL",
  "Santa Rosa do Sul": "SRS",
  "Rio do Sul": "RIO",
  "São Bento do Sul": "SBS",
  "São Francisco do Sul": "SFS"
};

function renderModalityDetails() {
  const modality = selectedModality;

  if (!modality) {
    renderPage("modalidades");
    return;
  }

  if (modality.name === "Atletismo") {
    pageContent.innerHTML = renderAthleticsModality(modality);
    return;
  }

  const relatedAthletes = athletes.filter(
    athlete => athlete.modality === modality.name
  );
  if (modality.name === "Tênis de mesa") {
    pageContent.innerHTML = renderTableTennisDetails(
      modality,
      relatedAthletes
    );
    return;
  }
  if (modality.category === "individual") {
    pageContent.innerHTML = renderIndividualModalityDetails(
      modality,
      relatedAthletes
    );
    return;
  }

  const groupCards = tournamentGroups.map(renderTournamentGroup).join("");
  const bracket = renderTournamentBracket;

  pageContent.innerHTML = `
    <button class="section-link back-link" data-page="modalidades">
      ${MEDIA.icons.leftArrow} Voltar para modalidades
    </button>
    <p class="eyebrow">MODALIDADE · JIFC 2025</p>
    <h1>${escapeHtml(modality.name)}</h1>
    <p class="page-subtitle">${escapeHtml(modality.desc)}</p>
    ${modalitySummary(modality)}

    <section class="detail-hero">
      <p class="eyebrow">FASE DE GRUPOS · ELIMINATÓRIAS</p>
      <h2>O caminho até a final.</h2>
      <p>
        Veja a composição demonstrativa dos grupos e o formato previsto
        para as quartas de final, semifinais e final.
      </p>
      <div class="detail-stats">
        <span>
          <strong>${escapeHtml(modality.athletes)}</strong>
          <small>ATLETAS</small>
        </span>
        <span>
          <strong>${escapeHtml(modality.campus)}</strong>
          <small>CAMPUS</small>
        </span>
        <span>
          <strong>${escapeHtml(modality.next)}</strong>
          <small>PRÓXIMA DISPUTA</small>
        </span>
      </div>
    </section>

    <div class="form-note">
      Chaveamento ilustrativo para demonstrar o formato da competição.
      Grupos, confrontos, horários e resultados oficiais ainda precisam
      ser confirmados pela organização.
    </div>

    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h3>Fase de grupos</h3>
          <p>Classificam-se os dois primeiros colocados de cada grupo.</p>
        </div>
        <span class="status-pill scheduled">GRUPOS ILUSTRATIVOS</span>
      </div>
      <div class="group-grid">${groupCards}</div>
    </section>

    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h3>Eliminatórias</h3>
          <p>Confrontos previstos após a fase de grupos.</p>
        </div>
      </div>
      <div class="bracket-grid">
        ${bracket("Quartas de final", [
          "1º Grupo A × 2º Grupo B",
          "1º Grupo C × 2º Grupo D",
          "1º Grupo B × 2º Grupo A",
          "1º Grupo D × 2º Grupo C"
        ])}
        ${bracket("Semifinais", [
          "Vencedor QF 1 × Vencedor QF 2",
          "Vencedor QF 3 × Vencedor QF 4"
        ])}
        ${bracket("Final", [
          "Vencedor semifinal 1 × Vencedor semifinal 2"
        ])}
      </div>
    </section>

    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h3>Atletas em destaque</h3>
          <p>Perfis associados a esta modalidade</p>
        </div>
      </div>
      ${
        relatedAthletes.length
          ? `<div class="athlete-mini-list">
              ${relatedAthletes.map(athleteMiniCard).join("")}
            </div>`
          : `<p class="page-subtitle">
              Os destaques serão publicados conforme os resultados oficiais.
            </p>`
      }
    </section>`;
}

function modalitySummary(modality) {
  return `
    <p class="page-subtitle">
      <strong>Categoria:</strong>
      ${escapeHtml(modalityCategoryLabel(modality))} ·
      <strong>Naipe:</strong>
      ${escapeHtml(modalityNaipeLabel(modality))} ·
      <strong>Status:</strong>
      ${escapeHtml(modalityStatusLabel(modality.status))}
    </p>`;
}

function renderTableTennisDetails(modality, relatedAthletes) {
  const submodalityRows = (modality.submodalities || [])
    .map(
      (submodality, index) => `
        <tr>
          <td>${String(index + 1).padStart(2, "0")}</td>
          <td>${escapeHtml(submodality.name)}</td>
          <td>${escapeHtml((submodality.naipes || []).join(" e "))}</td>
          <td>${escapeHtml(modalityStatusLabel(submodality.status))}</td>
        </tr>`
    )
    .join("");

  return `
    <button class="section-link back-link" data-page="modalidades">
      ${MEDIA.icons.leftArrow} Voltar para modalidades
    </button>
    <p class="eyebrow">MODALIDADE · JIFC 2025</p>
    <h1>${escapeHtml(modality.name)}</h1>
    <p class="page-subtitle">${escapeHtml(modality.desc)}</p>
    ${modalitySummary(modality)}

    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h3>Disputas</h3>
          <p>Submodalidades e naipes cadastrados</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>SUBMODALIDADE</th>
              <th>NAIPE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>${submodalityRows}</tbody>
        </table>
      </div>
    </section>
    ${renderModalityAthletes(relatedAthletes)}`;
}

function renderIndividualModalityDetails(modality, relatedAthletes) {
  return `
    <button class="section-link back-link" data-page="modalidades">
      ${MEDIA.icons.leftArrow} Voltar para modalidades
    </button>
    <p class="eyebrow">MODALIDADE · JIFC 2025</p>
    <h1>${escapeHtml(modality.name)}</h1>
    <p class="page-subtitle">${escapeHtml(modality.desc)}</p>
    ${modalitySummary(modality)}
    <section class="detail-hero">
      <p class="eyebrow">DISPUTAS INDIVIDUAIS</p>
      <h2>Modalidade individual</h2>
      <p>
        As disputas seguem os naipes e o status cadastrados para esta
        modalidade.
      </p>
    </section>
    ${renderModalityAthletes(relatedAthletes)}`;
}

function renderModalityAthletes(relatedAthletes) {
  return `
    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h3>Atletas em destaque</h3>
          <p>Perfis associados a esta modalidade</p>
        </div>
      </div>
      ${
        relatedAthletes.length
          ? `<div class="athlete-mini-list">
              ${relatedAthletes.map(athleteMiniCard).join("")}
            </div>`
          : `<p class="page-subtitle">
              Os destaques serão publicados conforme os resultados oficiais.
            </p>`
      }
    </section>`;
}

function renderAthleticsModality(modality) {
  const eventRows = athleticsEvents
    .map(
      (event, index) => `
        <tr>
          <td>${String(index + 1).padStart(2, "0")}</td>
          <td>${escapeHtml(event.name)}</td>
          <td>${escapeHtml(event.category)}</td>
          <td>${escapeHtml((event.naipes || []).join(" e "))}</td>
          <td>
            <span
              class="status-pill${
                event.status === "ativa" ? " scheduled" : ""
              }"
            >
              ${escapeHtml(modalityStatusLabel(event.status))}
            </span>
          </td>
        </tr>`
    )
    .join("");

  return `
    <button class="section-link back-link" data-page="modalidades">
      ${MEDIA.icons.leftArrow} Voltar para modalidades
    </button>
    <p class="eyebrow">MODALIDADE · JIFC 2025</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}
    <p class="page-subtitle">
      ${escapeHtml(modality.desc)}
      Confira as provas previstas para a competição.
    </p>

    <section class="detail-hero">
      <p class="eyebrow">PISTA E CAMPO</p>
      <h2>Provas de atletismo</h2>
      <p>
        A programação e os resultados oficiais serão publicados
        pela organização. A lista abaixo mostra as provas previstas.
      </p>
      <div class="detail-stats">
        <span>
          <strong>${escapeHtml(modality.athletes)}</strong>
          <small>ATLETAS</small>
        </span>
        <span>
          <strong>${escapeHtml(modality.campus)}</strong>
          <small>CAMPUS</small>
        </span>
        <span>
          <strong>${athleticsEvents.length}</strong>
          <small>PROVAS</small>
        </span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-title-row">
        <div>
          <h3>Tabela de provas</h3>
          <p>Disputas individuais e revezamentos</p>
        </div>
        <span class="status-pill scheduled">RESULTADOS A PUBLICAR</span>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>PROVA</th>
              <th>TIPO</th>
              <th>NAIPE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>${eventRows}</tbody>
        </table>
      </div>
    </section>

    <div class="form-note">
      As provas e os resultados são demonstrativos até a publicação
      da programação oficial do JIFC.
    </div>`;
}

function renderTournamentGroup(group) {
  const teams = group.teams
    .map(
      (team, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>
            <span class="group-team">
              <span class="campus-mark">
                ${campusAbbreviations[team] || "IFC"}
              </span>
              ${escapeHtml(team)}
            </span>
          </td>
          <td>—</td>
          <td>—</td>
          <td>—</td>
        </tr>`
    )
    .join("");

  return `
    <section class="group-card">
      <h3>${escapeHtml(group.name)}</h3>
      <table class="group-table">
        <thead>
          <tr>
            <th>#</th>
            <th>CAMPUS</th>
            <th>J</th>
            <th>V</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>${teams}</tbody>
      </table>
      <p class="group-note">Classificação a definir</p>
    </section>`;
}

function renderTournamentBracket(title, matches) {
  const matchCards = matches
    .map(
      (label, index) => `
        <article class="bracket-match">
          <span class="bracket-number">
            ${String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <strong>${escapeHtml(label)}</strong>
            <small>A definir após a fase anterior</small>
          </div>
          <span class="bracket-score">—</span>
        </article>`
    )
    .join("");

  return `
    <section class="bracket-round">
      <h3>${escapeHtml(title)}</h3>
      ${matchCards}
    </section>`;
}

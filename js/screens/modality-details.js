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

  const relatedAthletes = athletes.filter(
    athlete =>
      athlete.modality === modality.name &&
      athlete.naipe === selectedNaipe
  );
  let content;

  if (modality.name === "Atletismo") {
    content = renderAthleticsModality(modality, relatedAthletes);
  } else if (modality.name === "Tênis de mesa") {
    content = renderTableTennisDetails(
      modality,
      relatedAthletes
    );
  } else if (modality.category === "individual") {
    content = renderIndividualModalityDetails(
      modality,
      relatedAthletes
    );
  } else {
    content = renderTeamModalityDetails(modality, relatedAthletes);
  }

  pageContent.innerHTML = content;
  bindNaipeSelector();
}

function renderTeamModalityDetails(modality, relatedAthletes) {
  const groupCards = tournamentGroups[selectedNaipe]
    .map(renderTournamentGroup)
    .join("");
  const bracket = renderTournamentBracket;

  return `
    <button class="section-link back-link" data-page="modalidades">
      ${MEDIA.icons.leftArrow} Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
    <p class="eyebrow">MODALIDADE · JIFC 2025</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}

    <section class="detail-hero">
      <h2 class="eyebrow">FASE DE GRUPOS · ELIMINATÓRIAS</h2>
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

    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h2 style="margin-bottom: 10px;">Fase de grupos</h2>
          <p>Classificam-se os dois primeiros colocados de cada grupo.</p>
        </div>
      </div>
      <div class="group-grid">${groupCards}</div>
    </section>

    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h2 style="margin-bottom: 10px;">Eliminatórias</h2>
          <p>Confrontos previstos após a fase de grupos.</p>
        </div>
      </div>
      <div class="bracket-scroll">
        <div class="bracket-grid">
        ${bracket("Quartas de final", [
          "1º Grupo A × 2º Grupo B",
          "1º Grupo C × 2º Grupo D",
          "1º Grupo B × 2º Grupo A",
          "1º Grupo D × 2º Grupo C"
        ], "quarterfinals")}
        ${bracket("Semifinais", [
          "Vencedor QF 1 × Vencedor QF 2",
          "Vencedor QF 3 × Vencedor QF 4"
        ], "semifinals")}
        ${bracket("Final", [
          "Vencedor semifinal 1 × Vencedor semifinal 2"
        ], "final")}
        </div>
      </div>
    </section>

    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h2 style="margin-bottom: 10px;">Atletas em destaque</h2>
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

function renderNaipeSelector() {
  return `
    <div class="naipe-selector" role="group" aria-label="Selecionar naipe">
      ${["Masculino", "Feminino"]
        .map(
          naipe => `
            <button
              type="button"
              class="naipe-option${selectedNaipe === naipe ? " active" : ""}"
              data-modality-naipe="${naipe}"
              aria-pressed="${selectedNaipe === naipe}"
            >
              ${naipe}
            </button>`
        )
        .join("")}
    </div>`;
}

function bindNaipeSelector() {
  pageContent.querySelectorAll("[data-modality-naipe]").forEach(button => {
    button.addEventListener("click", () => {
      if (selectedNaipe === button.dataset.modalityNaipe) return;
      selectedNaipe = button.dataset.modalityNaipe;
      renderModalityDetails();
    });
  });
}

function modalitySummary(modality) {
  return `
    <p class="page-subtitle">
      <strong>Categoria:</strong>
      ${escapeHtml(modalityCategoryLabel(modality))} ·
      <strong>Naipe:</strong>
      ${escapeHtml(selectedNaipe)} ·
      <strong>Status:</strong>
      ${escapeHtml(modalityStatusLabel(modality.status))}
    </p>`;
}

function renderTableTennisDetails(modality, relatedAthletes) {
  const submodalityRows = (modality.submodalities || [])
    .filter(submodality => (submodality.naipes || []).includes(selectedNaipe))
    .map(
      (submodality, index) => `
        <tr>
          <td>${String(index + 1).padStart(2, "0")}</td>
          <td>${escapeHtml(submodality.name)}</td>
          <td>${escapeHtml(selectedNaipe)}</td>
          <td>${escapeHtml(modalityStatusLabel(submodality.status))}</td>
        </tr>`
    )
    .join("");

  return `
    <button class="section-link back-link" data-page="modalidades">
      ${MEDIA.icons.leftArrow} Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
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
    ${renderNaipeSelector()}
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

function renderAthleticsModality(modality, relatedAthletes) {
  const eventRows = athleticsEvents
    .filter(event => (event.naipes || []).includes(selectedNaipe))
    .map(
      (event, index) => `
        <tr>
          <td>${String(index + 1).padStart(2, "0")}</td>
          <td>${escapeHtml(event.name)}</td>
          <td>${escapeHtml(event.category)}</td>
          <td>${escapeHtml(selectedNaipe)}</td>
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
    ${renderNaipeSelector()}
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
    </div>
    ${renderModalityAthletes(relatedAthletes)}`;
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

function renderTournamentBracket(title, matches, round) {
  const matchRows = {
    quarterfinals: [1, 3, 5, 7],
    semifinals: [2, 6],
    final: [4]
  }[round];
  const matchCards = matches
    .map(
      (label, index) => `
        <article class="bracket-match" style="grid-row: ${matchRows[index]}">
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
      <div class="bracket-match-grid">${matchCards}</div>
    </section>`;
}

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
  } else if (modality.name === "Xadrez") {
    content = renderChessDetails(modality, relatedAthletes);
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
      Voltar para modalidades
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
      Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
    <p class="eyebrow">MODALIDADE · JIFC 2025</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}

    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h2 class="disputes-heading">Disputas</h2>
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
    ${renderTableTennisGroups("Individual", [
      "Camboriú",
      "Concórdia",
      "Blumenau",
      "Araquari",
      "Rio do Sul",
      "São Bento do Sul",
      "Brusque",
      "Videira"
    ])}
    ${renderSemifinalFinalBracket(`Individual · ${selectedNaipe}`, [
      "1º Grupo A × 2º Grupo B",
      "1º Grupo B × 2º Grupo A"
    ])}
    ${renderTableTennisGroups("Duplas", [
      "Dupla do Campus Camboriú",
      "Dupla do Campus Concórdia",
      "Dupla do Campus Blumenau",
      "Dupla do Campus Araquari",
      "Dupla do Campus Rio do Sul",
      "Dupla do Campus São Bento do Sul",
      "Dupla do Campus Brusque",
      "Dupla do Campus Videira"
    ])}
    ${renderSemifinalFinalBracket(`Duplas · ${selectedNaipe}`, [
      "1º Grupo A × 2º Grupo B",
      "1º Grupo B × 2º Grupo A"
    ])}
    ${renderModalityAthletes(relatedAthletes)}`;
}

function renderChessDetails(modality, relatedAthletes) {
  return `
    <button class="section-link back-link" data-page="modalidades">
      Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
    <p class="eyebrow">MODALIDADE · JIFC 2025</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}
    ${renderChessStandings()}
    ${renderModalityAthletes(relatedAthletes)}`;
}

function renderChessStandings() {
  const standings = [
    { athlete: 1, rounds: [1, 1, 1, 1, 0.5, 1], points: 5.5 },
    { athlete: 2, rounds: [1, 0.5, 1, 1, 1, 0.5], points: 5 },
    { athlete: 3, rounds: [0, 1, 1, 1, 1, 0.5], points: 4.5 },
    { athlete: 4, rounds: [1, 1, 0, 1, 1, 0], points: 4 },
    { athlete: 5, rounds: [0.5, 1, 1, 0, 1, 0], points: 3.5 },
    { athlete: 6, rounds: [1, 0, 1, 0, 0, 1], points: 3 },
    { athlete: 7, rounds: [0, 0.5, 1, 0, 1, 0], points: 2.5 },
    { athlete: 8, rounds: [1, 0, 0, 0, 0, 1], points: 2 }
  ];
  const rows = standings
    .map(
      ({ athlete, rounds, points }, index) => `
        <tr class="${index < 5 ? "chess-qualified" : ""}">
          <td>${index + 1}º</td>
          <td>Atleta ${athlete}</td>
          ${rounds
            .map(
              score =>
                `<td>${score.toLocaleString("pt-BR", {
                  maximumFractionDigits: 1
                })}</td>`
            )
            .join("")}
          <td><strong>${points.toLocaleString("pt-BR", {
            maximumFractionDigits: 1
          })}</strong></td>
          <td>${index < 5 ? "Classificado" : "—"}</td>
        </tr>`
    )
    .join("");

  return `
    <section class="panel tournament-section chess-standings">
      <p class="chess-scoring-legend">
        Vitória: 1 ponto · Empate: 0,5 ponto · Derrota ou W x O: 0 ponto
      </p>
      <div class="data-table-wrap">
        <table class="data-table" aria-label="Classificação demonstrativa do xadrez">
          <thead>
            <tr>
              <th>POSIÇÃO</th>
              <th>ATLETA</th>
              <th>RODADA 1</th>
              <th>RODADA 2</th>
              <th>RODADA 3</th>
              <th>RODADA 4</th>
              <th>RODADA 5</th>
              <th>RODADA 6</th>
              <th>PONTOS</th>
              <th>SITUAÇÃO</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>`;
}

function renderIndividualModalityDetails(modality, relatedAthletes) {
  return `
    <button class="section-link back-link" data-page="modalidades">
      Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
    <p class="eyebrow">MODALIDADE · JIFC 2025</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}
    <section class="detail-hero">
      <p class="eyebrow disputes-individual-heading">DISPUTAS INDIVIDUAIS</p>
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
    .map((event, index) => {
      const detailsRow = [
        "100 m rasos",
        "200 m rasos",
        "400 m rasos",
        "800 m rasos",
        "1.500 m rasos",
        "3.000 m rasos",
        "5.000 m rasos"
      ].includes(event.name)
        ? `<tr class="athletics-event-detail-row">
            <td colspan="5">
              <details class="athletics-event-details">
                <summary>Detalhes</summary>
                ${renderAthleticsHeats(event)}
              </details>
            </td>
          </tr>`
        : "";

      return `
        <tr>
          <td>${String(index + 1).padStart(2, "0")}</td>
          <td>${escapeHtml(event.name)}</td>
          <td>${escapeHtml(event.category.split(" · ")[0])}</td>
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
        </tr>
        ${detailsRow}`;
    })
    .join("");

  return `
    <button class="section-link back-link" data-page="modalidades">
      Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
    <p class="eyebrow">MODALIDADE · JIFC 2025</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}

    <section class="detail-hero">
      <h2>Provas de atletismo</h2>
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
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
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

    ${renderModalityAthletes(relatedAthletes)}`;
}

function renderAthleticsHeats(event) {
  const isSprint = [
    "100 m rasos",
    "200 m rasos",
    "400 m rasos"
  ].includes(event.name);
  const heatNumbers = isSprint ? [1, 2] : [1];
  const heats = heatNumbers
    .map(heat => {
      const participants = Array.from(
        { length: isSprint ? 8 : 7 },
        (_, index) => `Participante ${index + 1}`
      ).join(", ");

      return `
        <article class="athletics-heat">
          <strong>Bateria ${heat}</strong>
          <span>${participants}</span>
        </article>`;
    })
    .join("");
  const final = isSprint
    ? `<article class="athletics-heat athletics-final-heat">
        <strong>Bateria final</strong>
        <span>
          1º ao 4º lugar da Bateria 1 e 1º ao 4º lugar da Bateria 2
        </span>
      </article>`
    : "";
  const participantNote = isSprint
    ? ""
    : "Bateria única com todos os participantes (6 a 7 atletas).";

  return `
    <div class="athletics-heats">
      <h3>${escapeHtml(event.name)} · ${escapeHtml(selectedNaipe)}</h3>
      <p>${participantNote}</p>
      <div class="athletics-heats-grid">${heats}${final}</div>
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

function renderTableTennisGroups(title, participants) {
  const groups = [
    { name: "Grupo A", participants: participants.slice(0, 4) },
    { name: "Grupo B", participants: participants.slice(4, 8) }
  ];
  const groupCards = groups
    .map(
      group => `
        <section class="group-card">
          <h3>${escapeHtml(group.name)}</h3>
          <table class="group-table">
            <thead>
              <tr>
                <th>PARTICIPANTE</th>
                <th>J</th>
                <th>V</th>
                <th>PTS</th>
              </tr>
            </thead>
            <tbody>
              ${group.participants
                .map(
                  participant => `
                    <tr>
                      <td>${escapeHtml(participant)}</td>
                      <td>—</td>
                      <td>—</td>
                      <td>—</td>
                    </tr>`
                )
                .join("")}
            </tbody>
          </table>
          <p class="group-note">Classificação a definir</p>
        </section>`
    )
    .join("");

  return `
    <section class="panel tournament-section">
      <div class="panel-title-row">
        <h2>Fase de grupos · ${escapeHtml(title)} · ${escapeHtml(selectedNaipe)}</h2>
      </div>
      <p class="table-tennis-group-note">
        Os dois primeiros colocados de cada grupo avançam às eliminatórias.
      </p>
      <div class="group-grid">${groupCards}</div>
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

function renderSemifinalFinalBracket(title, semifinalMatches) {
  return `
    <section class="panel tournament-section">
      <div class="panel-title-row">
        <h2>${escapeHtml(title)}</h2>
      </div>
      <div class="bracket-scroll">
        <div class="bracket-grid">
          ${renderTournamentBracket(
            "Semifinais",
            semifinalMatches,
            "semifinals"
          )}
          ${renderTournamentBracket("Final", [
            "Vencedor semifinal 1 × Vencedor semifinal 2"
          ], "final")}
        </div>
      </div>
    </section>`;
}

function renderModalityDetails() {
  const modality = selectedModality;

  if (!modality) {
    renderPage("modalidades");
    return;
  }

  const relatedAthletes = athletes.filter(
    athlete =>
      athleteHasModality(athlete, modality.name) &&
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
  if (modality.name === "Basquetebol") {
    return renderBasketballDetails(modality, relatedAthletes);
  }

  return `
    <button class="section-link back-link" data-page="modalidades">
      Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
    <p class="eyebrow">MODALIDADE · JIFC 2026</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}

    ${renderScheduledGames(modality.name)}

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

function renderBasketballDetails(modality, relatedAthletes) {
  const groups = (tournamentGroups[selectedNaipe] || [])
    .map(renderTournamentGroup)
    .join("");
  const scheduledGames = fixtures.filter(
    fixture =>
      fixture.modality === modality.name && fixture.naipe === selectedNaipe
  );

  return `
    <button class="section-link back-link" data-page="modalidades">
      Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
    <p class="eyebrow">MODALIDADE · JIFC 2026</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}

    <section class="detail-hero">
      <h2 class="eyebrow">FASE DE GRUPOS · ELIMINATÓRIAS</h2>
      <div class="detail-stats">
        <span><strong>${(tournamentGroups[selectedNaipe] || []).length}</strong><small>GRUPOS</small></span>
        <span><strong>${scheduledGames.length}</strong><small>JOGOS NA AGENDA</small></span>
        <span><strong>60</strong><small>VAGAS MÁX. POR CAMPUS</small></span>
      </div>
    </section>

    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h2>Fase de grupos</h2>
          <p>Classificam-se os dois primeiros colocados de cada grupo.</p>
        </div>
      </div>
      <div class="group-grid">${groups}</div>
    </section>

    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h2>Eliminatórias</h2>
          <p>Chave mata-mata após a fase de grupos.</p>
        </div>
      </div>
      <div class="bracket-scroll">
        <div class="bracket-grid">
          ${renderTournamentBracket("Quartas de final", [
            "1º Grupo A × 2º Grupo B",
            "1º Grupo C × 2º Grupo D",
            "1º Grupo B × 2º Grupo A",
            "1º Grupo D × 2º Grupo C"
          ], "quarterfinals")}
          ${renderTournamentBracket("Semifinais", [
            "Vencedor QF 1 × Vencedor QF 2",
            "Vencedor QF 3 × Vencedor QF 4"
          ], "semifinals")}
          ${renderTournamentBracket("Final", [
            "Vencedor semifinal 1 × Vencedor semifinal 2"
          ], "final")}
        </div>
      </div>
    </section>

    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h2>Jogos cadastrados</h2>
          <p>Confrontos demonstrativos da modalidade</p>
        </div>
      </div>
      ${
        scheduledGames.length
          ? calendarRows(scheduledGames)
          : `<div class="empty-state">Nenhum jogo cadastrado.</div>`
      }
    </section>
    ${renderModalityAthletes(relatedAthletes)}`;
}

function renderScheduledGames(modalityName) {
  const scheduledGames = fixtures.filter(
    fixture =>
      fixture.modality === modalityName && fixture.naipe === selectedNaipe
  );

  return `
    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h2>Jogos e eventos</h2>
          <p>Programação demonstrativa para ${escapeHtml(selectedNaipe.toLowerCase())}</p>
        </div>
      </div>
      ${
        scheduledGames.length
          ? calendarRows(scheduledGames)
          : `<div class="empty-state">Nenhum jogo cadastrado para esta modalidade.</div>`
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
    <p class="eyebrow">MODALIDADE · JIFC 2026</p>
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
    <section class="panel empty-state">
      Nenhuma disputa cadastrada para esta modalidade.
    </section>
    ${renderScheduledGames(modality.name)}
    ${renderModalityAthletes(relatedAthletes)}`;
}

function renderChessDetails(modality, relatedAthletes) {
  const rounds = chessRounds.filter(round => round.naipe === selectedNaipe);
  const matches = rounds.flatMap(round =>
    round.matches.map(match => ({ ...match, round: round.round }))
  );
  const standings = chessStandings(matches);

  return `
    <button class="section-link back-link" data-page="modalidades">
      Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
    <p class="eyebrow">MODALIDADE · JIFC 2026</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}
    <section class="detail-hero">
      <h2 class="eyebrow">FORMATO SUÍÇO</h2>
      <p>Emparceiramento por pontuação acumulada a cada rodada.</p>
      <div class="detail-stats">
        <span><strong>${rounds.length}</strong><small>RODADAS CADASTRADAS</small></span>
        <span><strong>${standings.length}</strong><small>CAMPUS NA CLASSIFICAÇÃO</small></span>
      </div>
    </section>
    <section class="panel tournament-section">
      <div class="panel-title-row">
        <div>
          <h2>Classificação suíça</h2>
          <p>Os representantes dos campus serão vinculados ao cadastrar atletas.</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table chess-standings">
          <thead><tr><th>POSIÇÃO</th><th>CAMPUS</th><th>PARTIDAS</th><th>PONTOS</th></tr></thead>
          <tbody>
            ${standings.map((standing, index) => `
              <tr>
                <td>${String(index + 1).padStart(2, "0")}</td>
                <td>${escapeHtml(standing.campus)}</td>
                <td>${standing.played}</td>
                <td><strong>${standing.points.toLocaleString("pt-BR")}</strong></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </section>
    ${rounds.map(round => `
      <section class="panel tournament-section">
        <div class="panel-title-row">
          <div>
            <h2>Rodada ${round.round}</h2>
            <p>Emparceiramentos por sistema suíço · resultados demonstrativos</p>
          </div>
        </div>
        <div class="data-table-wrap">
          <table class="data-table">
            <thead><tr><th>MESA</th><th>BRANCAS</th><th>RESULTADO</th><th>PRETAS</th></tr></thead>
            <tbody>${round.matches.map((match, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>Representante · ${escapeHtml(match.white)}</td>
                <td><strong>${escapeHtml(match.result)}</strong></td>
                <td>Representante · ${escapeHtml(match.black)}</td>
              </tr>`).join("")}</tbody>
          </table>
        </div>
      </section>`).join("")}
    ${renderScheduledGames(modality.name)}
    <section class="panel tournament-section">
      <h2>Atletas em destaque</h2>
      ${
        relatedAthletes.length
          ? `<div class="athlete-mini-list">${relatedAthletes.map(athleteMiniCard).join("")}</div>`
          : `<div class="empty-state">Nenhum atleta cadastrado.</div>`
      }
    </section>`;
}

function chessStandings(matches) {
  const totals = new Map();
  const addPoints = (campus, points) => {
    const standing = totals.get(campus) || { campus, played: 0, points: 0 };
    standing.played += 1;
    standing.points += points;
    totals.set(campus, standing);
  };

  matches.forEach(match => {
    const [whiteScore, blackScore] = match.result
      .split("–")
      .map(score => score === "½" ? 0.5 : Number(score));
    addPoints(match.white, whiteScore);
    addPoints(match.black, blackScore);
  });

  return [...totals.values()].sort(
    (left, right) =>
      right.points - left.points || left.campus.localeCompare(right.campus)
  );
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
                ${escapeHtml(campuses.find(campus => campus.name === team)?.code || "IFC")}
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
        <thead><tr><th>#</th><th>CAMPUS</th><th>J</th><th>V</th><th>PTS</th></tr></thead>
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
          <span class="bracket-number">${String(index + 1).padStart(2, "0")}</span>
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

function renderIndividualModalityDetails(modality, relatedAthletes) {
  return `
    <button class="section-link back-link" data-page="modalidades">
      Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
    <p class="eyebrow">MODALIDADE · JIFC 2026</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}
    <section class="detail-hero">
      <p class="eyebrow disputes-individual-heading">DISPUTAS INDIVIDUAIS</p>
      <p>
        As disputas seguem os naipes e o status cadastrados para esta
        modalidade.
      </p>
    </section>
    ${renderScheduledGames(modality.name)}
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
      return `
        <tr>
          <td>${String(index + 1).padStart(2, "0")}</td>
          <td>${escapeHtml(event.name)}</td>
          <td>${escapeHtml(event.category.split(" · ")[0])}</td>
          <td>${escapeHtml(selectedNaipe)}</td>
          <td>${renderAthleticsBatteries(event, selectedNaipe)}</td>
          <td>
            <span
              class="status-pill${
                event.status === "ativa" ? " scheduled" : ""
              }"
            >
                ${escapeHtml(modalityStatusLabel(event.status))}
              </span>
            </td>
        </tr>`;
    })
    .join("");

  return `
    <button class="section-link back-link" data-page="modalidades">
      Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
    <p class="eyebrow">MODALIDADE · JIFC 2026</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}

    <section class="detail-hero">
      <h2>Provas de atletismo</h2>
      <div class="detail-stats">
        <span>
          <strong>${relatedAthletes.length}</strong>
          <small>ATLETAS</small>
        </span>
        <span>
          <strong>${new Set(relatedAthletes.map(athlete => athlete.campus)).size}</strong>
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
              <th>BATERIAS</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>${eventRows}</tbody>
        </table>
      </div>
    </section>

    ${renderScheduledGames(modality.name)}
    ${renderModalityAthletes(relatedAthletes)}`;
}

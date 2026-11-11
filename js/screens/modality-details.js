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
  return `
    <button class="section-link back-link" data-page="modalidades">
      Voltar para modalidades
    </button>
    ${renderNaipeSelector()}
    <p class="eyebrow">MODALIDADE · JIFC 2025</p>
    <h1>${escapeHtml(modality.name)}</h1>
    ${modalitySummary(modality)}

    <section class="panel tournament-section">
      <div class="empty-state">Nenhum jogo cadastrado para esta modalidade.</div>
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
    <section class="panel empty-state">
      Nenhuma disputa cadastrada para esta modalidade.
    </section>
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
    <section class="panel empty-state">
      Nenhum resultado cadastrado para esta modalidade.
    </section>
    ${renderModalityAthletes(relatedAthletes)}`;
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
        </tr>`;
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
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>${eventRows}</tbody>
        </table>
      </div>
    </section>

    ${renderModalityAthletes(relatedAthletes)}`;
}

function renderAthletics() {
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
  const featuredAthletes = athletes
    .filter(athlete => athlete.modality === "Atletismo")
    .map(athleteCard)
    .join("");

  pageContent.innerHTML = `
    <p class="eyebrow">VELOCIDADE, TÉCNICA E SUPERAÇÃO</p>
    <h1>Atletismo</h1>
    <p class="page-subtitle">
      Cada centésimo conta. Acompanhe as provas e marcas que inspiram.
    </p>

    <section class="detail-hero">
      <p class="eyebrow">PROGRAMAÇÃO DE HOJE</p>
      <h2>Na pista, todo mundo faz história.</h2>
      <p>
        Provas de pista e campo reúnem atletas de todo o IFC.
        Confira as modalidades e os próximos desafios.
      </p>
      <div class="detail-stats">
        <span><strong>124</strong><small>ATLETAS</small></span>
        <span><strong>12</strong><small>CAMPUS</small></span>
        <span>
          <strong>${athleticsEvents.length}</strong>
          <small>PROVAS</small>
        </span>
      </div>
    </section>

    <section class="panel">
      <div class="panel-title-row">
        <div>
          <h3>Provas do atletismo</h3>
          <p>Provas previstas para esta edição · JIFC 2025</p>
        </div>
        <span class="status-pill">PISTA E CAMPO</span>
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

    <div class="section-heading athletics-athletes-heading">
      <div>
        <h2>Atletas da pista</h2>
        <p>Destaques do atletismo nesta edição</p>
      </div>
      <button class="section-link" data-page="atletas">
        Ver todos ${MEDIA.icons.rightArrow}
      </button>
    </div>
    <div class="card-grid">${featuredAthletes}</div>`;
}

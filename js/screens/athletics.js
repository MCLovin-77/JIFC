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
    <h1>Atletismo</h1>

    <section class="detail-hero">
      <p class="eyebrow">PROGRAMAÇÃO</p>
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
          <h2>Provas do atletismo</h2>
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
        <h2>Destaques do atletismo nesta edição</h2>
      </div>
      <button class="section-link" data-page="atletas">
        Ver todos ${MEDIA.icons.rightArrow}
      </button>
    </div>
    <div class="card-grid">${featuredAthletes}</div>`;
}

function renderAthletics() {
  const eventRows = athleticsEvents
    .map(
      (event, index) => `
        <tr>
          <td>${String(index + 1).padStart(2, "0")}</td>
          <td>${escapeHtml(event.name)}</td>
          <td>${escapeHtml(event.category)}</td>
          <td>${escapeHtml((event.naipes || []).join(" e "))}</td>
          <td>${renderAthleticsBatteries(event)}</td>
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
    .filter(athlete => athleteHasModality(athlete, "Atletismo"))
    .map(athleteCard)
    .join("");
  const athleticsAthletes = athletes.filter(athlete =>
    athleteHasModality(athlete, "Atletismo")
  );

  pageContent.innerHTML = `
    <h1>Atletismo</h1>

    <section class="detail-hero">
      <p class="eyebrow" style="font-size: 20px">PROGRAMAÇÃO</p>
      <div class="detail-stats">
        <span><strong>${athleticsAthletes.length}</strong><small>ATLETAS</small></span>
        <span><strong>${new Set(athleticsAthletes.map(athlete => athlete.campus)).size}</strong><small>CAMPUS</small></span>
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
              <th>BATERIAS</th>
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
        Ver todos
      </button>
    </div>
    <div class="card-grid">${featuredAthletes}</div>`;
}

function renderAthleticsBatteries(event, naipe) {
  const batteries = (event.batteries || []).filter(
    battery => !naipe || (battery.naipes || []).includes(naipe)
  );

  if (!batteries.length) {
    return `<span class="group-note">A definir</span>`;
  }

  return `
    <details class="athletics-event-details">
      <summary>${batteries.length} ${
        batteries.length === 1 ? "bateria" : "baterias"
      }</summary>
      <div class="athletics-heats">
        <div class="athletics-heats-grid">
          ${batteries
            .map(
              battery => `
                <div class="athletics-heat">
                  <strong>${escapeHtml(battery.name)}</strong>
                  <span>${escapeHtml((battery.campuses || []).join(", "))}</span>
                </div>`
            )
            .join("")}
        </div>
      </div>
    </details>`;
}

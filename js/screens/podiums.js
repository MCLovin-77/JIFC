function renderPodios() {
  const podiumAthletes = [athletes[2], athletes[4], athletes[0]];
  const podiumMarkup = podiumAthletes
    .map((athlete, index) => {
      const places = ["second", "first", "third"];
      const times = ["12,48 s", "12,16 s", "12,71 s"];
      const positions = [2, 1, 3];

      return `
        <div class="podium-place ${places[index]}">
          <img
            src="${escapeHtml(athlete.photo)}"
            alt="Foto de ${escapeHtml(athlete.name)}"
          />
          <strong>${escapeHtml(athlete.name)}</strong>
          <small>
            ${escapeHtml(athlete.campus.replace("Campus ", ""))} ·
            ${times[index]}
          </small>
          <div class="podium-step">
            ${positions[index]}
            ${index === 0 ? `<span class="podium-number"></span>` : ""}
          </div>
        </div>`;
    })
    .join("");
  const campusRows = rankedMedals()
    .map((campus, index) => {
      const total =
        Number(campus.gold) +
        Number(campus.silver) +
        Number(campus.bronze);

      return `
        <tr>
          <td>${String(index + 1).padStart(2, "0")}</td>
          <td>${escapeHtml(campus.name)}</td>
          <td class="gold-medal">${escapeHtml(campus.gold)}</td>
          <td class="silver-medal">${escapeHtml(campus.silver)}</td>
          <td class="bronze-medal">${escapeHtml(campus.bronze)}</td>
          <td><strong>${total}</strong></td>
        </tr>`;
    })
    .join("");

  pageContent.innerHTML = `
    <h1>Pódios e resultados</h1>

    <div class="list-toolbar">
      <select
        class="select-box"
        id="podium-filter"
        aria-label="Filtrar modalidade"
      >
        <option value="">Todas as modalidades</option>
        ${modalities.map(modalityOption).join("")}
      </select>
    </div>

    <section class="panel">
      <div class="panel-title-row">
        <div>
          <h3>Destaque do atletismo · 100 m rasos</h3>
          <p>Final feminina · Pista central</p>
        </div>
        <span class="status-pill">FINALIZADO</span>
      </div>
      <div class="podium-wrap">${podiumMarkup}</div>
    </section>

    <section class="panel podium-table-panel">
      <div class="panel-title-row">
        <div>
          <h2>Quadro de medalhas</h2>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>POSIÇÃO</th>
              <th>CAMPUS</th>
              <th>OURO</th>
              <th>PRATA</th>
              <th>BRONZE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>${campusRows}</tbody>
        </table>
      </div>
    </section>`;
}

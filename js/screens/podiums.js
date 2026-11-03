function renderPodios() {
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

    <div id="podium-event"></div>

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

  const filter = document.getElementById("podium-filter");
  filter.addEventListener("change", () => {
    renderPodiumEvent(filter.value);
  });
  renderPodiumEvent(filter.value);
}

function renderPodiumEvent(modalityName) {
  const events = [
    {
      modality: "Atletismo",
      title: "Pódio do atletismo",
      campuses: ["Rio do Sul", "Sombrio", "Camboriú"],
      results: ["", "", ""]
    },
    {
      modality: "Basquetebol",
      title: "Pódio de basquetebol",
      campuses: ["Camboriú", "Sombrio", "Concórdia"],
      results: ["", "", ""]
    },
    {
      modality: "Handebol",
      title: "Pódio de handebol",
      campuses: ["Brusque", "Sombrio", "Camboriú"],
      results: ["", "", ""]
    }
  ];
  const selectedEvents = modalityName
    ? events.filter(event => event.modality === modalityName)
    : events;
  const root = document.getElementById("podium-event");

  if (!selectedEvents.length) {
    root.innerHTML = `<section class="panel empty-state">
      Não há pódio cadastrado para esta modalidade.
    </section>`;
    return;
  }

  const places = ["second", "first", "third"];
  const positions = [2, 1, 3];
  root.innerHTML = selectedEvents
    .map(event => {
      const podiumMarkup = event.campuses
        .map(
          (campus, index) => `
            <div class="podium-place ${places[index]}">
              <strong>Campus ${escapeHtml(campus)}</strong>
              ${
                event.results[index]
                  ? `<small>${escapeHtml(event.results[index])}</small>`
                  : ""
              }
              <div class="podium-step">${positions[index]}</div>
            </div>`
        )
        .join("");
      const headingTag =
        event.modality === "Basquetebol" || event.modality === "Handebol" || event.modality === "Atletismo"
          ? "h2"
          : "h3";

      return `
        <section class="panel">
          <div class="panel-title-row">
            <div>
              <${headingTag}>${escapeHtml(event.title)}</${headingTag}>
              <p>${escapeHtml(event.modality)}</p>
            </div>
          </div>
          <div class="podium-wrap">${podiumMarkup}</div>
        </section>`;
    })
    .join("");
}

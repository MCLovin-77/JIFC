function renderPodios() {
  const rows = medalRows();
  const podiumCards = podiums
    .map(podium => {
      const placements = [
        { place: "second", position: 2, name: podium.second },
        { place: "first", position: 1, name: podium.first },
        { place: "third", position: 3, name: podium.third }
      ];
      const places = placements
        .map(
          item => `
            <div class="podium-place ${item.place}">
              <strong>${escapeHtml(item.name)}</strong>
              <div class="podium-step">${item.position}</div>
            </div>`
        )
        .join("");

      return `
        <section class="panel">
          <div class="panel-title-row">
            <div>
              <h2>${escapeHtml(podium.title)}</h2>
              <p>${escapeHtml(podium.modality)}</p>
            </div>
          </div>
          <div class="podium-wrap">${places}</div>
        </section>`;
    })
    .join("");

  pageContent.innerHTML = `
    <h1>Pódios e resultados</h1>

    ${podiumCards || `
      <section class="panel empty-state">
        Nenhum pódio cadastrado.
      </section>`}

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
          <tbody>
            ${rows || `
              <tr>
                <td colspan="6">
                  <div class="empty-state">Nenhuma medalha cadastrada.</div>
                </td>
              </tr>`}
          </tbody>
        </table>
      </div>
    </section>`;
}

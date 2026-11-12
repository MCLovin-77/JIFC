function renderCampuses() {
  const campusCards = campuses
    .map(campus => {
      return `
        <article class="campus-card">
          <div class="campus-card-body">
            <h3>Campus ${escapeHtml(campus.name)}</h3>
            <div class="campus-facts">
              <span>
                <strong>${escapeHtml(campus.athletes)}</strong>
                participantes
              </span>
              <span>
                <strong>${escapeHtml(medalTotalForCampus(campus))}</strong>
                medalhas
              </span>
              <span>
                <strong>${escapeHtml(campus.code)}</strong>
                sigla
              </span>
            </div>
          </div>
        </article>`;
    })
    .join("");

  pageContent.innerHTML = `
    <h1>Todos os campus</h1>

    <div class="card-grid">
      ${campusCards || `<div class="empty-state">Nenhum campus cadastrado.</div>`}
    </div>`;
}

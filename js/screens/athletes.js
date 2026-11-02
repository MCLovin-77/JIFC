function renderAthletes() {
  pageContent.innerHTML = `
    <h1>Atletas</h1>

    <div class="list-toolbar">
      <label class="search-box">
        <span aria-hidden="true">${MEDIA.icons.search}</span>
        <input
          id="athlete-search"
          type="search"
          placeholder="Buscar por atleta, campus ou modalidade..."
          aria-label="Buscar atletas"
        />
      </label>
      <select
        class="select-box"
        id="athlete-filter"
        aria-label="Filtrar modalidade"
      >
        <option value="">Todas as modalidades</option>
        ${modalities.map(modalityOption).join("")}
      </select>
    </div>

    <div class="card-grid" id="athlete-grid">
      ${athletes.map(athleteCard).join("")}
    </div>`;

  document
    .getElementById("athlete-search")
    .addEventListener("input", filterAthletes);
  document
    .getElementById("athlete-filter")
    .addEventListener("change", filterAthletes);
}

function athleteCard(athlete) {
  return `
    <article
      class="athlete-card"
      data-athlete="${escapeHtml(athlete.id)}"
      tabindex="0"
    >
      <img
        class="athlete-photo"
        src="${escapeHtml(athlete.photo)}"
        alt="Foto de ${escapeHtml(athlete.name)}"
      />
      <div class="athlete-card-body">
        <div class="athlete-title-row">
          <div>
            <h3>${escapeHtml(athlete.name)}</h3>
            <p>${escapeHtml(athlete.campus)}</p>
          </div>
          <span class="position-pill">
            ${escapeHtml(athlete.modality)} ·
            ${escapeHtml(athlete.position)}
          </span>
        </div>
        <div class="athlete-metrics">
          <span>
            <strong>${escapeHtml(athlete.age)} anos</strong>
            Idade
          </span>
          <span>
            <strong>${escapeHtml(athlete.height)}</strong>
            Altura
          </span>
        </div>
      </div>
    </article>`;
}

function filterAthletes() {
  const query = document
    .getElementById("athlete-search")
    .value.toLocaleLowerCase("pt-BR");
  const selectedModality = document.getElementById("athlete-filter").value;
  const filteredAthletes = athletes.filter(athlete => {
    const searchableText =
      `${athlete.name} ${athlete.campus} ${athlete.modality}`
        .toLocaleLowerCase("pt-BR");
    const matchesQuery = searchableText.includes(query);
    const matchesModality =
      !selectedModality || athlete.modality === selectedModality;

    return matchesQuery && matchesModality;
  });

  document.getElementById("athlete-grid").innerHTML = filteredAthletes.length
    ? filteredAthletes.map(athleteCard).join("")
    : `<div class="empty-state">
        Nenhum atleta encontrado. Tente outro nome ou modalidade.
      </div>`;
}

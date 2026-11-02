function renderModalities() {
  pageContent.innerHTML = `
    <p class="eyebrow">ESPORTE PARA TODO MUNDO</p>
    <h1>Modalidades</h1>
    <p class="page-subtitle">
      Descubra os esportes, acompanhe as disputas e encontre sua próxima torcida.
    </p>

    <div class="list-toolbar">
      <label class="search-box">
        <span aria-hidden="true">${MEDIA.icons.search}</span>
        <input
          id="modality-search"
          type="search"
          placeholder="Buscar modalidade..."
          aria-label="Buscar modalidades"
        />
      </label>
    </div>

    <div class="card-grid" id="modality-grid">
      ${modalityCards(modalities)}
    </div>`;

  document
    .getElementById("modality-search")
    .addEventListener("input", event => {
      const query = event.target.value.toLocaleLowerCase("pt-BR");
      const filteredModalities = modalities.filter(modality => {
        const searchableText =
          `${modality.name} ${modality.desc}`.toLocaleLowerCase("pt-BR");

        return searchableText.includes(query);
      });

      document.getElementById("modality-grid").innerHTML =
        filteredModalities.length
          ? modalityCards(filteredModalities)
          : `<div class="empty-state">Nenhuma modalidade encontrada.</div>`;
    });
}

function modalityCards(items) {
  return items
    .map(
      modality => `
        <article class="modality-card">
          <div class="modality-top">
            <span class="modality-icon">
              ${escapeHtml(modality.icon)}
            </span>
            <span class="position-pill">JIFC 2025</span>
          </div>
          <h3>${escapeHtml(modality.name)}</h3>
          <p>${escapeHtml(modality.desc)}</p>
          <p>
            ${escapeHtml(modalityCategoryLabel(modality))} ·
            ${escapeHtml(modalityNaipeLabel(modality))} ·
            ${escapeHtml(modalityStatusLabel(modality.status))}
          </p>
          ${
            modality.submodalities?.length
              ? `<p>${modality.submodalities.length} submodalidades cadastradas</p>`
              : ""
          }
          <div class="modality-foot">
            <span>
              ${escapeHtml(modality.athletes)} atletas ·
              ${escapeHtml(modality.campus)} campus
            </span>
            <button data-modality="${escapeHtml(modality.name)}">
              Detalhes ${MEDIA.icons.arrow}
            </button>
          </div>
        </article>`
    )
    .join("");
}

function renderModalities() {
  pageContent.innerHTML = `
    <h1 style="margin-bottom: 40px;">Modalidades</h1>

    <div class="card-grid" id="modality-grid">
      ${modalityCards(modalities)}
    </div>`;
}

function modalityCards(items) {
  return items
    .map(
      modality => `
        <article class="modality-card">
          <div class="modality-top">
            <span class="position-pill">JIFC 2025</span>
          </div>
          <h3>${escapeHtml(modality.name)}</h3>
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
              Detalhes
            </button>
          </div>
        </article>`
    )
    .join("");
}

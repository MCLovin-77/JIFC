function renderCampuses() {
  const campusCards = campuses
    .map(
      campus => `
        <article class="campus-card">
          <img
            class="campus-cover"
            src="${escapeHtml(campus.image)}"
            alt="Campus ${escapeHtml(campus.name)}"
          />
          <div class="campus-card-body">
            <h3>Campus ${escapeHtml(campus.name)}</h3>
            <p>${escapeHtml(campus.desc)}</p>
            <div class="campus-facts">
              <span>
                <strong>${escapeHtml(campus.students)}</strong>
                estudantes
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
        </article>`
    )
    .join("");

  pageContent.innerHTML = `
    <p class="eyebrow">
      ${campuses.length} CAMPI · UMA SÓ TORCIDA
    </p>
    <h1>Nossos campus</h1>
    <p class="page-subtitle">
      Conheça as comunidades, histórias e conquistas que fazem parte do JIFC.
    </p>

    <div class="campus-banner">
      <div>
        <p class="eyebrow">ORGULHO DE PERTENCER</p>
        <h2>Um IFC. Muitas histórias.</h2>
        <p>
          Cada campus traz sua energia. Juntos, fazemos os jogos acontecerem.
        </p>
      </div>
      <button class="primary-button" data-open-auth="login">
        Área do administrador ${MEDIA.icons.arrow}
      </button>
    </div>

    <div class="card-grid">${campusCards}</div>`;
}

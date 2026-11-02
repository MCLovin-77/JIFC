function renderHome() {
  pageContent.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">
          ${scheduleDateRangeLabel} · SANTA CATARINA
        </p>
        <h1 style="margin-top: 30px;">
          JIFC 2025
        </h1>

        <div class="hero-actions" style="margin-top: 50px;">
          <button class="primary-button" data-page="calendario">
            Explorar calendário
            <span>${MEDIA.icons.rightArrow}</span>
          </button>
          <button class="secondary-button" data-page="modalidades">
            Conheça as modalidades
            <span>${MEDIA.icons.arrow}</span>
          </button>
        </div>
      </div>
      <div class="hero-scene">
        <div class="hero-upcoming">
          <strong>Jogos ao vivo em breve</strong>
          <small>As transmissões serão anunciadas por aqui.</small>
        </div>
      </div>
    </section>

    <div class="stats-grid">
      <article class="stat-card">
        <div class="stat-top">
          Atletas inscritos
          <span class="stat-icon">${MEDIA.icons.athlete}</span>
        </div>
        <div class="stat-value">
        900
        </div>
      </article>
      <article class="stat-card">
        <div class="stat-top">
          Campus participantes
          <span class="stat-icon">${MEDIA.icons.campus}</span>
        </div>
        <div class="stat-value">
          ${campuses.length}
        </div>
      </article>
      <article class="stat-card">
        <div class="stat-top">
          Modalidades
          <span class="stat-icon">${MEDIA.icons.modalities}</span>
        </div>
        <div class="stat-value">
          ${modalities.length}
        </div>
      </article>
      <article class="stat-card">
        <div class="stat-top">
          Jogos programados
          <span class="stat-icon">${MEDIA.icons.calendar}</span>
        </div>
        <div class="stat-value">
          ${fixtures.length}
        </div>
      </article>
    </div>

    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-title-row">
          <div>
            <h2>Quadro de medalhas</h2>
            <p>Classificação geral · JIFC 2025</p>
          </div>
          <button data-page="podios">
            Ver classificação ${MEDIA.icons.rightArrow}
          </button>
        </div>
        <table class="medal-table">
          <thead>
            <tr>
              <th>CAMPUS</th>
              <th>OURO</th>
              <th>PRATA</th>
              <th>BRONZE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>${medalRows()}</tbody>
        </table>
      </section>

      <section class="panel">
        <div class="panel-title-row">
          <div>
            <h2>Agenda de hoje</h2>
            <p style="margin-bottom: 10px;">
              ${scheduleDays[0].label}
            </p>
          </div>
          <button data-page="calendario">
            Ver agenda ${MEDIA.icons.rightArrow}
          </button>
        </div>
        <div class="fixture-list">
          ${fixtureRows(
            fixtures
              .filter(game => String(game.day) === "25")
              .slice(0, 4)
          )}
        </div>
      </section>
    </div>

    <div class="home-bottom">
      <section class="panel">
        <div class="panel-title-row">
          <div>
            <h2>Atletas em destaque</h2>
          </div>
          <button data-page="atletas">
            Ver atletas ${MEDIA.icons.rightArrow}
          </button>
        </div>
        <div class="athlete-mini-list">
          ${athletes.slice(0, 4).map(athleteMiniCard).join("")}
        </div>
      </section>

      <section class="panel">
        <div class="panel-title-row">
          <div>
            <h2>Próximas disputas</h2>
          </div>
          <button data-page="calendario">
            Ver agenda ${MEDIA.icons.rightArrow}
          </button>
        </div>
        <div class="fixture-list">
          ${fixtureRows(
            fixtures
              .filter(game => String(game.day) === "26")
              .slice(0, 4)
          )}
        </div>
      </section>
    </div>`;
}

function athleteMiniCard(athlete) {
  const campusName = athlete.campus.replace("Campus ", "");

  return `
    <div class="athlete-mini" data-athlete="${escapeHtml(athlete.id)}">
      <img src="${escapeHtml(athlete.photo)}" alt="" />
      <span>
        <strong>${escapeHtml(athlete.name)}</strong>
        <small>
          ${escapeHtml(athlete.modality)} · ${escapeHtml(campusName)}
        </small>
      </span>
    </div>`;
}

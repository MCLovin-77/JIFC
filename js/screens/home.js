function renderHome() {
  const upcomingFixtures = fixtures.slice(4, 8);

  pageContent.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">
          JOGOS DO INSTITUTO FEDERAL CATARINENSE
        </p>
        <h1 style="margin-top: 30px;">
          JIFC 2025
        </h1>

        <div class="hero-actions" style="margin-top: 50px;">
          <button class="primary-button" data-page="calendario">
            Explorar calendário
          </button>
          <button class="secondary-button" data-page="modalidades">
            Conheça as modalidades
          </button>
        </div>
      </div>
      <div class="hero-scene">
        <div class="hero-upcoming">
          <strong>Jogos e disputas a cadastrar</strong>
          <small>Cadastre a programação pelo painel do JIFC.</small>
        </div>
      </div>
    </section>

    <div class="stats-grid">
      <article class="stat-card">
        <div class="stat-top">
          Atletas inscritos
        </div>
        <div class="stat-value">
        ${athletes.length}
        </div>
      </article>
      <article class="stat-card">
        <div class="stat-top">
          Campus participantes
        </div>
        <div class="stat-value">
          ${campuses.length}
        </div>
      </article>
      <article class="stat-card">
        <div class="stat-top">
          Modalidades
        </div>
        <div class="stat-value">
          ${modalities.length}
        </div>
      </article>
      <article class="stat-card">
        <div class="stat-top">
          Jogos programados
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
            Ver classificação
          </button>
        </div>
        <table class="medal-table">
          <thead>
            <tr>
              <th>#</th>
              <th>CAMPUS</th>
              <th>OURO</th>
              <th>PRATA</th>
              <th>BRONZE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${medalRows(5) || `
              <tr>
                <td colspan="6">
                  <div class="empty-state">Nenhuma medalha cadastrada.</div>
                </td>
              </tr>`}
          </tbody>
        </table>
      </section>

      <section class="panel">
        <div class="panel-title-row">
          <div>
            <h2>Programação</h2>
            <p style="margin-bottom: 10px;">Jogos cadastrados</p>
          </div>
          <button data-page="calendario">
            Ver agenda
          </button>
        </div>
        <div class="fixture-list">
          ${fixtures.length
            ? fixtureRows(fixtures.slice(0, 4))
            : `<div class="empty-state">Nenhum jogo cadastrado.</div>`}
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
            Ver atletas
          </button>
        </div>
        <div class="athlete-mini-list">
          ${athletes.length
            ? athletes.slice(0, 4).map(athleteMiniCard).join("")
            : `<div class="empty-state">Nenhum atleta cadastrado.</div>`}
        </div>
      </section>

      <section class="panel">
        <div class="panel-title-row">
          <div>
            <h2>Jogos</h2>
          </div>
          <button data-page="calendario">
            Ver agenda
          </button>
        </div>
        <div class="fixture-list">
          ${upcomingFixtures.length
            ? fixtureRows(upcomingFixtures)
            : `<div class="empty-state">Nenhum outro jogo cadastrado.</div>`}
        </div>
      </section>
    </div>`;
}

function athleteMiniCard(athlete) {
  const campusName = String(athlete.campus || "").replace("Campus ", "");

  return `
    <div class="athlete-mini" data-athlete="${escapeHtml(athlete.id)}">
      <img src="${escapeHtml(athlete.photo)}" alt="" />
      <span>
        <strong>${escapeHtml(athlete.name)}</strong>
        <small>
          ${escapeHtml(athleteModalities(athlete).join(", "))} · ${escapeHtml(campusName)}
        </small>
      </span>
    </div>`;
}

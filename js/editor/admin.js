// Tela de administração e formulários de cada seção editável.
const adminSections = [
  ["athletes", "Atletas"],
  ["schedule", "Horários"],
  ["modalities", "Modalidades"],
  ["medals", "Estatísticas"],
  ["campuses", "Campus"],
  ["events", "Provas"]
];

function renderAdminEditor() {
  const tabs = adminSections
    .map(
      ([key, label]) => `
        <button
          type="button"
          class="editor-tab${editorSection === key ? " active" : ""}"
          data-editor-section="${key}"
        >${label}</button>`
    )
    .join("");
  const selectedSection = adminSections.find(
    ([key]) => key === editorSection
  );
  const sectionLabel = selectedSection?.[1] || "Edição";
  const content = renderAdminSection(editorSection);

  pageContent.innerHTML = `
    <div class="editor-session-row">
      <span>Perfil: administrador</span>
      <button
        type="button"
        class="secondary-button"
        data-editor-logout
      >Sair</button>
    </div>
    <p class="eyebrow">ÁREA RESTRITA · ADMINISTRADOR</p>
    <h1>Painel de edição</h1>
    <p class="page-subtitle">
      Edite atletas, resultados, modalidades, agenda e informações dos campus.
    </p>

    <div class="editor-tabs" role="tablist">${tabs}</div>
    <section class="panel editor-panel">
      <div class="panel-title-row">
        <div>
          <h3>${escapeHtml(sectionLabel)}</h3>
          <p>As alterações atualizam as telas públicas deste protótipo.</p>
        </div>
        <span class="status-pill">ADMINISTRADOR</span>
      </div>
      ${content}
    </section>
    <div class="form-note">
      Alterações são guardadas neste navegador para demonstração.
    </div>`;

  bindAdminSelectors();
}

function renderAdminSection(section) {
  const renderers = {
    athletes: renderAdminAthleteForm,
    schedule: renderAdminScheduleForm,
    modalities: renderAdminModalityForm,
    medals: renderAdminMedalForm,
    campuses: renderAdminCampusForm,
    events: renderAdminEventForm
  };
  const renderSection = renderers[section];

  return renderSection
    ? renderSection()
    : `<div class="empty-state">Seção de edição não encontrada.</div>`;
}

function renderAdminAthleteForm() {
  const athlete = athletes[selectedAdminAthleteIndex] || athletes[0];
  if (!athlete) {
    return `<div class="empty-state">Nenhum atleta cadastrado.</div>`;
  }

  return `
    ${editorPicker(
      "admin-athlete",
      "Atleta",
      athletes,
      selectedAdminAthleteIndex,
      item => item.name
    )}
    <form data-editor-form="admin-athlete">
      ${editorGrid([
        editorField("Nome", "name", athlete.name),
        editorField("Campus", "campus", athlete.campus),
        editorSelect(
          "Modalidade",
          "modality",
          athlete.modality,
          modalities.map(item => item.name)
        ),
        editorSelect(
          "Posição",
          "position",
          athlete.position,
          modalityRules[athlete.modality]?.positions || []
        ),
        editorField(
          "Idade",
          "age",
          athlete.age,
          "number",
          'min="10" max="100" required'
        ),
        editorField("Altura", "height", athlete.height),
        editorSelect(
          "Medalha",
          "medal",
          athlete.medal,
          ["Ouro", "Prata", "Bronze", "Sem medalha"]
        ),
        editorField("Marcas e resultados", "marks", athlete.marks),
        editorField("Foto (URL)", "photo", athlete.photo, "url")
      ])}
      <div id="admin-athlete-stats">
        ${renderAthleteStatisticsFields(athlete)}
      </div>
      <p class="form-note">
        Posições e estatísticas disponíveis variam conforme a modalidade.
      </p>
      ${editorSubmitButton("Salvar atleta")}
    </form>`;
}

function renderAthleteStatisticsFields(athlete) {
  const statistics = modalityRules[athlete.modality]?.statistics || [];

  if (!statistics.length) {
    return `<p class="form-note">
      Esta modalidade registra marcas e resultados no campo correspondente.
    </p>`;
  }

  return editorGrid(
    statistics.map(statistic =>
      editorField(
        statistic.label,
        `stat_${statistic.key}`,
        athlete.stats?.[statistic.key] ?? 0,
        "number",
        'min="0"'
      )
    )
  );
}

function renderAdminScheduleForm() {
  const fixture = fixtures[selectedFixtureIndex] || fixtures[0];
  if (!fixture) {
    return `<div class="empty-state">Nenhum horário cadastrado.</div>`;
  }

  return `
    ${editorPicker(
      "admin-fixture",
      "Evento",
      fixtures,
      selectedFixtureIndex,
      item => item.title
    )}
    <form data-editor-form="admin-fixture">
      ${editorGrid([
        editorField("Dia", "day", fixture.day, "number", "readonly"),
        editorField("Mês", "month", fixture.month),
        editorField("Confronto / evento", "title", fixture.title),
        editorField("Modalidade e local", "meta", fixture.meta),
        editorField("Horário / situação", "tag", fixture.tag),
        editorField("Placar / resultado", "score", fixture.score || "")
      ])}
      <p class="form-note">
        O dia é fixo para manter duas disputas por modalidade em cada data.
      </p>
      ${editorSubmitButton("Salvar programação")}
    </form>`;
}

function renderAdminModalityForm() {
  const modality = modalities[selectedModalityIndex] || modalities[0];
  if (!modality) {
    return `<div class="empty-state">Nenhuma modalidade cadastrada.</div>`;
  }

  return `
    ${editorPicker(
      "admin-modality",
      "Modalidade",
      modalities,
      selectedModalityIndex,
      item => item.name
    )}
    <form data-editor-form="admin-modality">
      ${editorGrid([
        editorField("Nome", "name", modality.name),
        editorSelect(
          "Categoria",
          "category",
          modality.category,
          ["individual", "coletiva"]
        ),
        editorCheckboxes(
          "Naipes",
          "naipes",
          ["Masculino", "Feminino"],
          modality.naipes
        ),
        editorSelect(
          "Status",
          "status",
          modality.status,
          ["ativa", "inativa"]
        ),
        editorField("Ícone", "icon", modality.icon),
        editorField("Descrição", "desc", modality.desc),
        editorField(
          "Quantidade de atletas",
          "athletes",
          modality.athletes,
          "number",
          'min="0"'
        ),
        editorField(
          "Quantidade de campus",
          "campus",
          modality.campus,
          "number",
          'min="0"'
        ),
        editorField("Próxima disputa", "next", modality.next)
      ])}
      ${editorSubmitButton("Salvar modalidade")}
    </form>`;
}

function renderAdminMedalForm() {
  const medal = medals[selectedMedalIndex] || medals[0];
  if (!medal) {
    return `<div class="empty-state">Nenhuma estatística cadastrada.</div>`;
  }

  return `
    ${editorPicker(
      "admin-medal",
      "Campus",
      medals,
      selectedMedalIndex,
      item => item.name
    )}
    <form data-editor-form="admin-medal">
      ${editorGrid([
        editorField("Campus", "name", medal.name),
        editorField("Sigla", "code", medal.code),
        editorField("Medalhas de ouro", "gold", medal.gold, "number", 'min="0"'),
        editorField(
          "Medalhas de prata",
          "silver",
          medal.silver,
          "number",
          'min="0"'
        ),
        editorField(
          "Medalhas de bronze",
          "bronze",
          medal.bronze,
          "number",
          'min="0"'
        )
      ])}
      <p class="form-note">
        Selecione um campus existente e edite seus totais;
        não é necessário cadastrar o campus novamente.
      </p>
      ${editorSubmitButton("Salvar estatísticas")}
    </form>`;
}

function renderAdminCampusForm() {
  const campus = campuses[selectedCampusIndex] || campuses[0];
  if (!campus) {
    return `<div class="empty-state">Nenhum campus cadastrado.</div>`;
  }

  return `
    ${editorPicker(
      "admin-campus",
      "Campus",
      campuses,
      selectedCampusIndex,
      item => item.name
    )}
    <form data-editor-form="admin-campus">
      ${editorGrid([
        editorField("Nome", "name", campus.name),
        editorField("Sigla", "code", campus.code),
        editorField("Descrição", "desc", campus.desc),
        editorField(
          "Quantidade de estudantes",
          "students",
          campus.students
        ),
        editorField("Imagem (URL)", "image", campus.image, "url")
      ])}
      <p class="form-note">
        As medalhas deste campus são editadas na aba Estatísticas.
      </p>
      ${editorSubmitButton("Salvar campus")}
    </form>`;
}

function renderAdminEventForm() {
  const event = athleticsEvents[selectedEventIndex] || athleticsEvents[0];
  if (!event) {
    return `<div class="empty-state">Nenhuma prova cadastrada.</div>`;
  }

  return `
    ${editorPicker(
      "admin-event",
      "Prova de atletismo",
      athleticsEvents,
      selectedEventIndex,
      item => item.name
    )}
    <form data-editor-form="admin-event">
      ${editorGrid([
        editorField("Nome da prova", "name", event.name),
        editorField("Tipo de prova", "category", event.category),
        editorCheckboxes(
          "Naipes",
          "naipes",
          ["Masculino", "Feminino"],
          event.naipes
        ),
        editorSelect(
          "Status",
          "status",
          event.status,
          ["ativa", "inativa"]
        )
      ])}
      ${editorSubmitButton("Salvar prova")}
    </form>`;
}

function editorSubmitButton(label) {
  return `
    <div class="editor-actions">
      <button class="primary-button" type="submit">
        ${escapeHtml(label)}
        <span>${MEDIA.icons.rightArrow}</span>
      </button>
    </div>`;
}

function bindAdminSelectors() {
  const selectors = [
    ["admin-athlete", value => {
      selectedAdminAthleteIndex = Number(value);
    }],
    ["admin-fixture", value => {
      selectedFixtureIndex = Number(value);
    }],
    ["admin-modality", value => {
      selectedModalityIndex = Number(value);
    }],
    ["admin-medal", value => {
      selectedMedalIndex = Number(value);
    }],
    ["admin-campus", value => {
      selectedCampusIndex = Number(value);
    }],
    ["admin-event", value => {
      selectedEventIndex = Number(value);
    }]
  ];

  selectors.forEach(([id, update]) => {
    const select = document.getElementById(id);
    if (!select) return;

    select.addEventListener("change", event => {
      update(event.target.value);
      renderAdminEditor();
    });
  });

  const modalitySelect = document.getElementById("edit-modality");
  if (modalitySelect) {
    modalitySelect.addEventListener("change", event => {
      const rule = modalityRules[event.target.value];
      const positionSelect = document.getElementById("edit-position");
      const statsContainer = document.getElementById("admin-athlete-stats");

      positionSelect.innerHTML = rule.positions
        .map(
          position =>
            `<option value="${escapeHtml(position)}">${escapeHtml(position)}</option>`
        )
        .join("");
      statsContainer.innerHTML = renderAthleteStatisticsFields({
        modality: event.target.value,
        stats: {}
      });
    });
  }
}

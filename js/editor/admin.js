// Tela de administração e formulários de cada seção editável.
const adminSections = [
  ["athletes", "Atletas"],
  ["schedule", "Horários"],
  ["modalities", "Modalidades"],
  ["medals", "Medalhas"],
  ["podiums", "Pódios"],
  ["campuses", "Campus"],
  ["events", "Provas"],
  ["accesses", "Solicitações"]
];

function renderAdminEditor() {
  const visibleSections =
    activeRole === "admin"
      ? adminSections
      : adminSections.filter(([key]) => isEditorSectionAllowed(key));
  if (!visibleSections.some(([key]) => key === editorSection)) {
    editorSection = visibleSections[0]?.[0] || "schedule";
  }
  const tabs = visibleSections
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
  const roleLabel = activeRole === "admin" ? "Admin" : "Servidor";

  pageContent.innerHTML = `
    <div class="editor-session-row">
      <button
        type="button"
        class="secondary-button"
        data-editor-logout
      >Sair</button>
    </div>
    <h1>Painel ${roleLabel.toLowerCase()}</h1>

    <div class="editor-tabs" role="tablist">${tabs}</div>
    <section class="panel editor-panel">
      <div class="panel-title-row">
        <div>
          <h3>${escapeHtml(sectionLabel)}</h3>
        </div>
        <span class="status-pill">EDIÇÃO</span>
      </div>
      ${content}
    </section>
    `;

  bindAdminSelectors();
}

function renderAdminSection(section) {
  const renderers = {
    athletes: renderAdminAthleteForm,
    schedule: renderAdminScheduleForm,
    modalities: renderAdminModalityForm,
    medals: renderAdminMedalForm,
    podiums: renderAdminPodiumForm,
    campuses: renderAdminCampusForm,
    events: renderAdminEventForm,
    accesses: renderAccessRequests
  };
  const renderSection = renderers[section];

  return renderSection
    ? renderSection()
    : `<div class="empty-state">Seção de edição não encontrada.</div>`;
}

function renderAccessRequests() {
  if (!accessRequests.length) {
    return `<div class="empty-state">
      Nenhuma solicitação recebida. Os pedidos enviados pela tela de acesso
      aparecerão aqui para análise.
    </div>`;
  }

  const statusLabels = {
    pending: "Pendente",
    approved: "Aprovada",
    rejected: "Recusada"
  };
  return `
    <div class="access-request-list">
      ${accessRequests
        .map(request => {
          const date = request.createdAt
            ? new Date(request.createdAt).toLocaleDateString("pt-BR")
            : "—";
          return `
            <article class="access-request-card">
              <div class="access-request-heading">
                <div>
                  <h4>${escapeHtml(request.name)}</h4>
                  <span>${escapeHtml(statusLabels[request.status] || "Pendente")}</span>
                </div>
                <span class="status-pill ${
                  request.status === "approved"
                    ? ""
                    : request.status === "rejected"
                      ? "rejected"
                      : "scheduled"
                }">${escapeHtml(request.status)}</span>
              </div>
              <dl class="access-request-details">
                <div><dt>E-mail institucional</dt><dd>${escapeHtml(request.email)}</dd></div>
                <div><dt>Campus</dt><dd>${escapeHtml(request.campus)}</dd></div>
                <div><dt>Atuação</dt><dd>${escapeHtml(request.position)}</dd></div>
                <div><dt>Solicitado em</dt><dd>${escapeHtml(date)}</dd></div>
              </dl>
              <div class="editor-actions">
                ${
                  request.status === "pending"
                    ? `<button
                        type="button"
                        class="primary-button"
                        data-access-request-action="approve"
                        data-request-id="${escapeHtml(request.id)}"
                      >Aprovar acesso</button>
                      <button
                        type="button"
                        class="secondary-button"
                        data-access-request-action="reject"
                        data-request-id="${escapeHtml(request.id)}"
                      >Recusar</button>`
                    : ""
                }
              </div>
            </article>`;
        })
        .join("")}
    </div>`;
}

function renderAdminAthleteForm() {
  const isServer = activeRole === "server";
  if (isServer && !isServerAccessApproved()) {
    return `<div class="empty-state">A solicitação de acesso não está aprovada.</div>`;
  }

  const serverAthleteIndexes = isServer ? getServerAthleteIndexes() : [];
  if (isServer && !serverAthleteIndexes.length) {
    return `<div class="empty-state">
      Nenhum atleta deste campus está cadastrado. O admin precisa cadastrar
      atletas vinculados ao campus antes que possam ser atualizados.
    </div>`;
  }

  if (
    isServer &&
    !serverAthleteIndexes.includes(selectedAdminAthleteIndex)
  ) {
    selectedAdminAthleteIndex = serverAthleteIndexes[0];
  }
  const isNew = !athletes[selectedAdminAthleteIndex];
  const athlete =
    athletes[selectedAdminAthleteIndex] || {
      name: "",
      campus: "",
      modality: modalities[0]?.name || "",
      naipe: "Masculino",
      position: modalityRules[modalities[0]?.name]?.positions[0] || "",
      age: "",
      height: "",
      medal: "Sem medalha",
      marks: "",
      photo: "",
      stats: {}
    };
  return `
    ${
      isServer
        ? `<div class="form-field">
            <label for="admin-athlete">Atleta do campus</label>
            <select id="admin-athlete">
              ${serverAthleteIndexes
                .map(index => `
                  <option value="${index}" ${
                    index === selectedAdminAthleteIndex ? "selected" : ""
                  }>${escapeHtml(athletes[index].name)}</option>`)
                .join("")}
            </select>
          </div>`
        : athletes.length && !isNew
          ? editorPicker(
              "admin-athlete",
              "Atleta",
              athletes,
              selectedAdminAthleteIndex,
              item => item.name
            )
          : ""
    }
    ${
      isServer
        ? ""
        : editorNewButton(
            isNew && athletes.length ? "cancel-athlete" : "athlete",
            isNew && athletes.length ? "Cancelar novo atleta" : "Novo atleta"
          )
    }
    <form data-editor-form="admin-athlete">
      ${editorGrid([
        editorField("Nome", "name", athlete.name, "text", "required"),
        isServer
          ? `<div class="form-field">
              <label for="edit-campus-readonly">Campus vinculado</label>
              <input
                id="edit-campus-readonly"
                type="text"
                value="${escapeHtml(athlete.campus)}"
                disabled
              />
            </div>`
          : editorField("Campus", "campus", athlete.campus, "text", "required"),
        editorSelect(
          "Modalidade",
          "modality",
          athlete.modality,
          modalities.map(item => item.name)
        ),
        editorSelect(
          "Naipe",
          "naipe",
          athlete.naipe || "Masculino",
          ["Masculino", "Feminino"]
        ),
        editorSelect(
          "Posição / tipo",
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
      ])}
      ${editorImageUpload("Foto do atleta", "photo", athlete.photo)}
      <div id="admin-athlete-stats">
        ${renderAthleteStatisticsFields(athlete)}
      </div>
      <div id="admin-athlete-athletics-submodalities">
        ${renderAthleticsSubmodalityFields(
          [athlete.modality],
          athlete.athleticsSubmodalities || []
        )}
      </div>
      ${editorSubmitButton("Salvar atleta")}
    </form>`;
}

function renderAthleticsSubmodalityFields(selectedModalities, selectedEvents) {
  if (!selectedModalities.includes("Atletismo")) return "";

  return `
    <div class="athletics-submodality-fields">
      ${editorCheckboxes(
        "Provas do Atletismo (máximo de 3)",
        "athleticsSubmodalities",
        athleticsEvents.map(event => event.name),
        selectedEvents
      )}
    </div>`;
}

function renderAthleteStatisticsFields(athlete) {
  const statistics = modalityRules[athlete.modality]?.statistics || [];

  if (!statistics.length) {
    return "";
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
  const isNew = !fixtures[selectedFixtureIndex];
  const fixture = fixtures[selectedFixtureIndex] || {
    date: "",
    title: "",
    meta: "",
    modality: modalities[0]?.name || "",
    tag: "",
    score: "",
    phase: "",
    naipe: "Masculino",
    campuses: []
  };

  return `
    ${fixtures.length && !isNew
      ? editorPicker(
          "admin-fixture",
          "Evento",
          fixtures,
          selectedFixtureIndex,
          item => item.title
        )
      : ""}
    ${editorNewButton(
      isNew && fixtures.length ? "cancel-fixture" : "fixture",
      isNew && fixtures.length ? "Cancelar novo jogo" : "Novo jogo"
    )}
    <form data-editor-form="admin-fixture">
      ${editorGrid([
        editorField("Data", "date", fixture.date, "date", "required"),
        editorField("Confronto / evento", "title", fixture.title, "text", "required"),
        editorSelect(
          "Modalidade",
          "modality",
          fixture.modality,
          modalities.map(item => item.name)
        ),
        editorSelect(
          "Naipe",
          "naipe",
          fixture.naipe || "Masculino",
          ["Masculino", "Feminino"]
        ),
        editorField("Fase / grupo", "phase", fixture.phase || ""),
        editorField("Modalidade e local", "meta", fixture.meta),
        editorField("Horário / situação", "tag", fixture.tag),
        editorField("Placar / resultado", "score", fixture.score || ""),
        editorCheckboxes(
          "Campus participantes (selecione ao menos dois)",
          "campuses",
          campuses.map(item => item.name),
          fixture.campuses || [],
          "campus-participants"
        )
      ])}
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
  const isNew = !medals[selectedMedalIndex];
  const medal = medals[selectedMedalIndex] || {
    name: "",
    code: "",
    gold: 0,
    silver: 0,
    bronze: 0
  };

  return `
    ${medals.length && !isNew
      ? editorPicker(
          "admin-medal",
          "Campus",
          medals,
          selectedMedalIndex,
          item => item.name
        )
      : ""}
    ${editorNewButton(
      isNew && medals.length ? "cancel-medal" : "medal",
      isNew && medals.length ? "Cancelar novo quadro" : "Novo quadro de medalhas"
    )}
    <form data-editor-form="admin-medal">
      ${editorGrid([
        editorField("Campus", "name", medal.name, "text", "required"),
        editorField("Sigla", "code", medal.code, "text", "required"),
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
      ${editorSubmitButton("Salvar estatísticas")}
    </form>`;
}

function renderAdminCampusForm() {
  const isNew = !campuses[selectedCampusIndex];
  const campus = campuses[selectedCampusIndex] || {
    name: "",
    code: "",
    medals: 0,
    athletes: 0,
    minimumAthletes: 0,
    maximumAthletes: 60
  };

  return `
    ${campuses.length && !isNew
      ? editorPicker(
          "admin-campus",
          "Campus",
          campuses,
          selectedCampusIndex,
          item => item.name
        )
      : ""}
    ${editorNewButton(
      isNew && campuses.length ? "cancel-campus" : "campus",
      isNew && campuses.length ? "Cancelar novo campus" : "Novo campus"
    )}
    <form data-editor-form="admin-campus">
      ${editorGrid([
        editorField("Nome", "name", campus.name, "text", "required"),
        editorField(
          "Sigla (2 letras)",
          "code",
          campus.code,
          "text",
          'minlength="2" maxlength="2" pattern="[A-Za-z]{2}" required'
        ),
        editorField(
          "Número de medalhas",
          "medals",
          medalTotalForCampus(campus),
          "number",
          'min="0"'
        ),
        editorField(
          "Participantes inscritos",
          "athletes",
          campus.athletes,
          "number",
          'min="48" max="60" required'
        ),
        editorField(
          "Mínimo de participantes",
          "minimumAthletes",
          campus.minimumAthletes ?? 0,
          "number",
          'min="0" max="60" required'
        ),
        editorField(
          "Máximo de participantes",
          "maximumAthletes",
          campus.maximumAthletes ?? 60,
          "number",
          'min="0" max="60" required'
        )
      ])}
      ${editorSubmitButton("Salvar campus")}
    </form>`;
}

function renderAdminPodiumForm() {
  const isNew = !podiums[selectedPodiumIndex];
  const podium = podiums[selectedPodiumIndex] || {
    title: "",
    modality: modalities[0]?.name || "",
    first: "",
    second: "",
    third: ""
  };

  return `
    ${podiums.length && !isNew
      ? editorPicker(
          "admin-podium",
          "Pódio",
          podiums,
          selectedPodiumIndex,
          item => item.title
        )
      : ""}
    ${editorNewButton(
      isNew && podiums.length ? "cancel-podium" : "podium",
      isNew && podiums.length ? "Cancelar novo pódio" : "Novo pódio"
    )}
    <form data-editor-form="admin-podium">
      ${editorGrid([
        editorField("Título do resultado", "title", podium.title, "text", "required"),
        editorSelect(
          "Modalidade",
          "modality",
          podium.modality,
          modalities.map(item => item.name)
        ),
        editorField("1º lugar", "first", podium.first, "text", "required"),
        editorField("2º lugar", "second", podium.second, "text", "required"),
        editorField("3º lugar", "third", podium.third, "text", "required")
      ])}
      ${editorSubmitButton("Salvar pódio")}
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
      </button>
    </div>`;
}

function editorNewButton(type, label) {
  return `
    <div class="editor-actions">
      <button
        class="secondary-button"
        type="button"
        data-editor-new="${type}"
      >${escapeHtml(label)}</button>
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
    ["admin-podium", value => {
      selectedPodiumIndex = Number(value);
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

      if (!positionSelect || !statsContainer) return;

      positionSelect.innerHTML = (rule?.positions || [])
        .map(
          position =>
            `<option value="${escapeHtml(position)}">${escapeHtml(position)}</option>`
        )
        .join("");
      statsContainer.innerHTML = renderAthleteStatisticsFields({
        modality: event.target.value,
        stats: {}
      });
      updateAthleticsSubmodalityFields();
    });
  }

  const athleteForm = document.querySelector(
    '[data-editor-form="admin-athlete"]'
  );
  if (athleteForm) {
    const modalitySelect = athleteForm.querySelector('[name="modality"]');
    athleteForm.addEventListener("change", event => {
      if (event.target === modalitySelect) {
        updateAthletePositionAndStats();
      }

      if (event.target.name === "athleticsSubmodalities" && event.target.checked) {
        const selected = [
          ...athleteForm.querySelectorAll(
            'input[name="athleticsSubmodalities"]:checked'
          )
        ];
        if (selected.length > 3) {
          event.target.checked = false;
          showToast("Selecione no máximo 3 provas de Atletismo.", true);
        }
      }
    });
  }
}

function updateAthleticsSubmodalityFields() {
  const form = document.querySelector('[data-editor-form="admin-athlete"]');
  const container = document.getElementById("admin-athlete-athletics-submodalities");
  if (!form || !container) return;

  const selectedEvents = [
    ...form.querySelectorAll(
      'input[name="athleticsSubmodalities"]:checked'
    )
  ].map(input => input.value);
  container.innerHTML = renderAthleticsSubmodalityFields(
    [form.querySelector('[name="modality"]').value],
    selectedEvents
  );
}

function updateAthletePositionAndStats() {
  const form = document.querySelector('[data-editor-form="admin-athlete"]');
  if (!form) return;

  const modality = form.querySelector('[name="modality"]').value;
  const rule = modalityRules[modality];
  const positionSelect = form.querySelector('[name="position"]');
  const statsContainer = document.getElementById("admin-athlete-stats");
  if (positionSelect) {
    positionSelect.innerHTML = (rule?.positions || [])
      .map(
        position =>
          `<option value="${escapeHtml(position)}">${escapeHtml(position)}</option>`
      )
      .join("");
  }
  if (statsContainer) {
    statsContainer.innerHTML = renderAthleteStatisticsFields({
      modality,
      stats: {}
    });
  }
  updateAthleticsSubmodalityFields();
}

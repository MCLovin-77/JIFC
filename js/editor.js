// Coordena estado, salvamento e eventos da área de edição.
function renderEditor() {
  if (!activeRole) {
    renderAccessPortal();
    return;
  }

  document.getElementById("breadcrumb-current").textContent =
    "Painel de cadastro";
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
  });

  renderAdminEditor();

  updateEditorRoleControls();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function submitEditorForm(form) {
  if (!isEditorFormAllowed(form.dataset.editorForm)) {
    showToast("Esta área não está disponível para o perfil de servidor.", true);
    return;
  }

  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());
  if (
    form.dataset.editorForm === "admin-modality" ||
    form.dataset.editorForm === "admin-event"
  ) {
    values.naipes = formData.getAll("naipes");

    if (!values.naipes.length) {
      showToast("Selecione ao menos um naipe.", true);
      return;
    }
  }
  const formType = form.dataset.editorForm;
  if (formType === "admin-athlete") {
    const selectedAthleticsEvents = formData.getAll(
      "athleticsSubmodalities"
    );

    if (selectedAthleticsEvents.length > 3) {
      showToast("Selecione no máximo 3 provas de Atletismo.", true);
      return;
    }

    values.athleticsSubmodalities = values.modality === "Atletismo"
      ? normalizeAthleticsSelections(selectedAthleticsEvents)
      : [];
    values.stats = Object.fromEntries(
      Object.entries(values)
        .filter(([key]) => key.startsWith("stat_"))
        .map(([key, value]) => [key.slice(5), Number(value)])
    );
    Object.keys(values)
      .filter(key => key.startsWith("stat_"))
      .forEach(key => delete values[key]);
  }
  const numericFields = [
    "age",
    "athletes",
    "gold",
    "silver",
    "bronze",
    "medals",
    "day"
  ];
  if (formType === "admin-modality") {
    numericFields.push("campus");
  }

  numericFields.forEach(key => {
    if (key in values && values[key] !== "") {
      values[key] = Number(values[key]);
    }
  });

  if (formType === "admin-athlete") {
    if (activeRole === "server") {
      const athlete = athletes[selectedAdminAthleteIndex];
      if (
        !athlete ||
        !isServerAccessApproved() ||
        !getServerAthleteIndexes().includes(selectedAdminAthleteIndex)
      ) {
        showToast("Não há atleta disponível para atualizar.", true);
        return;
      }

      const editableFields = [
        "name",
        "modality",
        "athleticsSubmodalities",
        "naipe",
        "position",
        "age",
        "height",
        "medal",
        "marks",
        "photo",
        "stats"
      ];
      editableFields.forEach(key => {
        if (key in values) {
          athlete[key] = values[key];
        }
      });
      delete athlete.modalities;
      if (saveEditorData()) {
        showToast("Dados do atleta atualizados.");
      }
      renderEditor();
      return;
    }

    const athlete = athletes[selectedAdminAthleteIndex];
    if (athlete) {
      Object.assign(athlete, values);
      delete athlete.modalities;
    } else {
      values.id = Date.now();
      athletes.push(values);
      selectedAdminAthleteIndex = athletes.length - 1;
    }
  } else if (formType === "admin-fixture") {
    const fixture = fixtures[selectedFixtureIndex];
    if (fixture) {
      Object.assign(fixture, values);
    } else {
      fixtures.push(values);
      selectedFixtureIndex = fixtures.length - 1;
    }
  } else if (formType === "admin-modality") {
    Object.assign(modalities[selectedModalityIndex], values);
  } else if (formType === "admin-medal") {
    const medal = medals[selectedMedalIndex];
    if (medal) {
      const oldName = medal.name;

      Object.assign(medal, values);
      medal.name = `Campus ${normalizeCampusName(medal.name)}`;
      syncCampusName(oldName, medal.name, medal.code);
    } else {
      values.name = `Campus ${normalizeCampusName(values.name)}`;
      medals.push(values);
      selectedMedalIndex = medals.length - 1;
    }
  } else if (formType === "admin-podium") {
    const podium = podiums[selectedPodiumIndex];
    if (podium) {
      Object.assign(podium, values);
    } else {
      podiums.push(values);
      selectedPodiumIndex = podiums.length - 1;
    }
  } else if (formType === "admin-campus") {
    const campus = campuses[selectedCampusIndex];
    if (campus) {
      const oldName = campus.name;

      Object.assign(campus, values);
      syncCampusName(oldName, campus.name, campus.code);
    } else {
      campuses.push({ ...values, medals: 0 });
      selectedCampusIndex = campuses.length - 1;
    }
  } else if (formType === "admin-event") {
    Object.assign(athleticsEvents[selectedEventIndex], values);
  }

  if (saveEditorData()) {
    showToast("Alterações salvas.");
  }

  renderEditor();
}

document.addEventListener("submit", event => {
  const loginForm = event.target.closest("[data-access-login-form]");
  if (loginForm) {
    event.preventDefault();
    submitAccessLogin(loginForm);
    return;
  }

  const accessForm = event.target.closest("[data-access-request-form]");
  if (accessForm) {
    event.preventDefault();
    submitAccessRequest(accessForm);
    return;
  }

  const form = event.target.closest("[data-editor-form]");
  if (!form) return;

  event.preventDefault();
  submitEditorForm(form);
});

document.addEventListener("click", event => {
  const accessView = event.target.closest("[data-access-view]");
  if (accessView) {
    renderAccessPortal(accessView.dataset.accessView);
    return;
  }

  const accessAction = event.target.closest("[data-access-request-action]");
  if (accessAction) {
    updateAccessRequest(
      accessAction.dataset.requestId,
      accessAction.dataset.accessRequestAction
    );
    return;
  }

  const newRecord = event.target.closest("[data-editor-new]");
  if (newRecord) {
    if (activeRole !== "admin") {
      showToast("Esta ação está disponível somente para o admin.", true);
      return;
    }
    if (newRecord.dataset.editorNew === "athlete") {
      selectedAdminAthleteIndex = -1;
    } else if (newRecord.dataset.editorNew === "cancel-athlete") {
      selectedAdminAthleteIndex = 0;
    } else if (newRecord.dataset.editorNew === "fixture") {
      selectedFixtureIndex = -1;
    } else if (newRecord.dataset.editorNew === "cancel-fixture") {
      selectedFixtureIndex = 0;
    } else if (newRecord.dataset.editorNew === "medal") {
      selectedMedalIndex = -1;
    } else if (newRecord.dataset.editorNew === "cancel-medal") {
      selectedMedalIndex = 0;
    } else if (newRecord.dataset.editorNew === "podium") {
      selectedPodiumIndex = -1;
    } else if (newRecord.dataset.editorNew === "cancel-podium") {
      selectedPodiumIndex = 0;
    } else if (newRecord.dataset.editorNew === "campus") {
      selectedCampusIndex = -1;
    } else if (newRecord.dataset.editorNew === "cancel-campus") {
      selectedCampusIndex = 0;
    } else {
      return;
    }

    renderAdminEditor();
    return;
  }

  const tab = event.target.closest("[data-editor-section]");

  if (tab && isEditorSectionAllowed(tab.dataset.editorSection)) {
    editorSection = tab.dataset.editorSection;

    if (editorSection === "events") {
      selectedEventIndex = 0;
    }

    renderAdminEditor();
    return;
  }

  if (!event.target.closest("[data-editor-logout]")) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  activeRole = null;
  activeServerRequestId = null;
  renderPage("inicio");
  updateEditorRoleControls();
  showToast("Você voltou à visão geral.");
});

function updateEditorRoleControls() {
  const nav = document.querySelector(".main-nav");
  let accessLink = nav.querySelector("[data-editor-link]");

  if (activeRole && !accessLink) {
    accessLink = document.createElement("button");
    accessLink.type = "button";
    accessLink.className = "nav-link";
    accessLink.dataset.editorLink = "true";
    accessLink.textContent = "Minha área";
    nav.appendChild(accessLink);
    accessLink.addEventListener("click", renderEditor);
  } else if (!activeRole && accessLink) {
    accessLink.remove();
  }

  if (accessLink) {
    accessLink.classList.toggle("active", Boolean(activeRole));
  }

  const profileLabel = document.querySelector(".profile-label");

  document
    .querySelector(".top-avatar")
    .setAttribute(
      "aria-label",
      activeRole
        ? "Painel demonstrativo"
        : "Abrir demonstração de acesso"
    );

  profileLabel.innerHTML = activeRole
    ? `<strong>Painel ${activeRole === "admin" ? "admin" : "servidor"}</strong>
       <small>
         <span data-editor-logout class="logout-link">Voltar ao início</span>
       </small>`
    : `<strong>Área de cadastro</strong>
       <small>Admin e servidor</small>`;
}

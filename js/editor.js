// Coordena estado, salvamento e eventos da área de edição.
function renderEditor() {
  if (!activeRole) {
    openAuth();
    return;
  }

  const title =
    activeRole === "admin" ? "Painel de edição" : "Edição de atleta";

  document.getElementById("breadcrumb-current").textContent = title;
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
  });

  if (activeRole === "admin") {
    renderAdminEditor();
  } else {
    renderServerEditor();
  }

  updateEditorRoleControls();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function submitEditorForm(form) {
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
  const numericFields = [
    "age",
    "athletes",
    "campus",
    "gold",
    "silver",
    "bronze",
    "medals",
    "day"
  ];

  numericFields.forEach(key => {
    if (key in values && values[key] !== "") {
      values[key] = Number(values[key]);
    }
  });

  const formType = form.dataset.editorForm;

  if (formType === "server-athlete") {
    const athlete = athletes.find(
      item => item.id === Number(selectedAthleteId)
    );

    if (!athlete) return;

    if (!values.photoData && !values.photo.trim()) {
      showToast("Informe uma URL de foto ou envie uma imagem.", true);
      return;
    }

    athlete.age = values.age;
    athlete.height = values.height.trim();
    athlete.photo = values.photoData || values.photo.trim();
  } else if (formType === "admin-athlete") {
    values.stats = Object.fromEntries(
      Object.entries(values)
        .filter(([key]) => key.startsWith("stat_"))
        .map(([key, value]) => [key.slice(5), Number(value)])
    );
    Object.keys(values)
      .filter(key => key.startsWith("stat_"))
      .forEach(key => delete values[key]);
    Object.assign(athletes[selectedAdminAthleteIndex], values);
  } else if (formType === "admin-fixture") {
    Object.assign(fixtures[selectedFixtureIndex], values);
  } else if (formType === "admin-modality") {
    Object.assign(modalities[selectedModalityIndex], values);
  } else if (formType === "admin-medal") {
    const medal = medals[selectedMedalIndex];
    const oldName = medal.name;

    Object.assign(medal, values);
    medal.name = `Campus ${normalizeCampusName(medal.name)}`;
    syncCampusName(oldName, medal.name, medal.code);
  } else if (formType === "admin-campus") {
    const campus = campuses[selectedCampusIndex];
    const oldName = campus.name;

    Object.assign(campus, values);
    syncCampusName(oldName, campus.name, campus.code);
  } else if (formType === "admin-event") {
    Object.assign(athleticsEvents[selectedEventIndex], values);
  }

  if (saveEditorData()) {
    showToast("Alterações salvas.");
  }

  renderEditor();
}

document.addEventListener("submit", event => {
  const form = event.target.closest("[data-editor-form]");
  if (!form) return;

  event.preventDefault();
  submitEditorForm(form);
});

document.addEventListener("click", event => {
  const tab = event.target.closest("[data-editor-section]");

  if (tab && activeRole === "admin") {
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
  renderPage("inicio");
  updateEditorRoleControls();
  showToast("Você saiu da área restrita.");
});

document.addEventListener("click", event => {
  const fileInput = event.target.closest("#server-photo-file");
  if (!fileInput) return;

  document.getElementById("server-photo-data").value = "";
});

function updateEditorRoleControls() {
  const nav = document.querySelector(".main-nav");
  let accessLink = nav.querySelector("[data-editor-link]");

  if (activeRole && !accessLink) {
    accessLink = document.createElement("button");
    accessLink.type = "button";
    accessLink.className = "nav-link";
    accessLink.dataset.editorLink = "true";
    accessLink.innerHTML = `
      Minha área`;
    nav.appendChild(accessLink);
    accessLink.addEventListener("click", renderEditor);
  } else if (!activeRole && accessLink) {
    accessLink.remove();
  }

  if (accessLink) {
    accessLink.classList.toggle("active", Boolean(activeRole));
  }

  const roleName =
    activeRole === "admin" ? "Administrador" : "Servidor";
  const profileLabel = document.querySelector(".profile-label");

  document
    .querySelector(".top-avatar")
    .setAttribute(
      "aria-label",
      activeRole
        ? `Área do ${activeRole === "admin" ? "administrador" : "servidor"}`
        : "Acesso restrito"
    );

  profileLabel.innerHTML = activeRole
    ? `<strong>${roleName}</strong>
       <small>
         <span data-editor-logout class="logout-link">Sair da área</span>
       </small>`
    : `<strong>Área de edição</strong>
       <small>Servidor e administrador</small>`;
}

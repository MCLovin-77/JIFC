// Demonstração de acesso e detalhes de atletas/modalidades.
function openModal(content) {
  const modalRoot = document.getElementById("modal-root");

  modalRoot.innerHTML = `
    <div class="modal-backdrop" data-backdrop>
      <section class="modal" role="dialog" aria-modal="true">
        ${content}
      </section>
    </div>`;

  document
    .querySelector(".modal-close")
    .addEventListener("click", closeModal);
  document
    .querySelector("[data-backdrop]")
    .addEventListener("click", event => {
      if (event.target.hasAttribute("data-backdrop")) {
        closeModal();
      }
    });
  document.addEventListener("keydown", handleEscape, { once: true });
}

function handleEscape(event) {
  if (event.key === "Escape") {
    closeModal();
    return;
  }

  document.addEventListener("keydown", handleEscape, { once: true });
}

function closeModal() {
  document.getElementById("modal-root").innerHTML = "";
}

function openEditor() {
  renderAccessPortal();
}

const demoAdminCredentials = {
  email: "admin@jifc.demo",
  password: "jifc-demo-admin"
};

function isServerAccessApproved() {
  return (
    activeRole === "server" &&
    accessRequests.some(
      request =>
        request.id === activeServerRequestId &&
        request.status === "approved"
    )
  );
}

function getServerAthleteIndexes() {
  const request = accessRequests.find(
    item => item.id === activeServerRequestId && item.status === "approved"
  );
  if (!request) return [];

  const campusName = request.campus.trim().toLocaleLowerCase("pt-BR");
  return athletes.reduce((indexes, athlete, index) => {
    if (String(athlete.campus || "").trim().toLocaleLowerCase("pt-BR") === campusName) {
      indexes.push(index);
    }
    return indexes;
  }, []);
}

function isEditorSectionAllowed(section) {
  if (activeRole === "admin") return true;
  return isServerAccessApproved() && section === "athletes";
}

function isEditorFormAllowed(formType) {
  if (activeRole === "admin") return true;
  return isServerAccessApproved() && formType === "admin-athlete";
}

function startAccessDemo(role, requestId = null) {
  if (role !== "admin" && role !== "server") return;
  if (
    role === "server" &&
    !accessRequests.some(
      request => request.id === requestId && request.status === "approved"
    )
  ) {
    showToast("A solicitação precisa ser aprovada pelo admin.", true);
    return;
  }

  activeServerRequestId = role === "server" ? requestId : null;
  editorSection = "athletes";
  if (role === "server") {
    selectedAdminAthleteIndex = getServerAthleteIndexes()[0] ?? -1;
  }
  activeRole = role;
  renderEditor();
}

function renderAccessPortal(view = "login", statusRequestId = lastAccessRequestId) {
  activeRole = null;
  activeServerRequestId = null;
  document.getElementById("breadcrumb-current").textContent =
    "Acesso demonstrativo";
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
  });
  updateEditorRoleControls();

  const request = accessRequests.find(item => item.id === statusRequestId);
  const statusLabels = {
    pending: "Aguardando validação do admin",
    approved: "Acesso aprovado",
    rejected: "Solicitação não aprovada"
  };
  const requestStatus = request
    ? `<div class="access-status ${escapeHtml(request.status)}" role="status">
        <strong>${escapeHtml(statusLabels[request.status])}</strong>
        <span>${escapeHtml(request.email)} · ${escapeHtml(request.campus)}</span>
      </div>`
    : "";

  pageContent.innerHTML = `
    <section class="access-portal">
      <div class="panel access-card access-card-centered">
      ${
        view === "request"
          ? `<h1>Solicitar acesso</h1>
            ${requestStatus}
            <form data-access-request-form>
              <div class="access-form-fields">
                ${editorField("Nome completo", "name", "", "text", "required")}
                ${editorField(
                  "E-mail institucional (@ifc.edu.br)",
                  "email",
                  "",
                  "email",
                  "required"
                )}
                ${editorField("Campus", "campus", "", "text", "required")}
                ${editorSelect(
                  "Atuação no campus",
                  "position",
                  "Treinador(a)",
                  [
                    "Treinador(a)",
                    "Coordenador(a)",
                    "Professor(a)",
                    "Técnico(a)-administrativo(a)",
                    "Outro(a)"
                  ]
                )}
              </div>
              <button type="submit" class="primary-button form-submit">
                Enviar solicitação
              </button>
            </form>
            <button type="button" class="text-button access-back" data-access-view="login">
              Voltar para entrar
            </button>`
          : `<h1>Já tem conta?</h1>
            ${requestStatus}
            <form data-access-login-form>
              <div class="access-form-fields">
                ${editorField("E-mail", "email", "", "email", "required")}
                ${editorField("Senha", "password", "", "password", "required")}
              </div>
              <button type="submit" class="primary-button form-submit">
                Entrar
              </button>
            </form>
            <button type="button" class="text-button access-request-link" data-access-view="request">
              Ainda não tem conta? Solicitar acesso
            </button>`
      }
      </div>
    </section>`;
}

function submitAccessLogin(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const email = String(values.email || "").trim().toLowerCase();
  const password = String(values.password || "");

  if (
    email === demoAdminCredentials.email &&
    password === demoAdminCredentials.password
  ) {
    startAccessDemo("admin");
    return;
  }

  const approvedRequest = accessRequests.find(
    request => request.email.toLowerCase() === email && request.status === "approved"
  );
  if (approvedRequest && password) {
    startAccessDemo("server", approvedRequest.id);
    return;
  }

  const pendingRequest = accessRequests.find(
    request => request.email.toLowerCase() === email && request.status === "pending"
  );
  if (pendingRequest) {
    lastAccessRequestId = pendingRequest.id;
    showToast("Seu pedido ainda aguarda aprovação do admin.", true);
    renderAccessPortal("login", pendingRequest.id);
    return;
  }

  showToast("E-mail ou senha inválidos para esta demonstração.", true);
}

function submitAccessRequest(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const email = String(values.email || "").trim().toLowerCase();
  if (!/@(?:[a-z0-9-]+\.)*ifc\.edu\.br$/i.test(email)) {
    showToast("Use um e-mail institucional terminado em ifc.edu.br.", true);
    return;
  }

  const existingRequest = accessRequests.find(
    request =>
      request.email.toLowerCase() === email &&
      ["pending", "approved"].includes(request.status)
  );
  if (existingRequest) {
    lastAccessRequestId = existingRequest.id;
    showToast("Já existe um pedido ativo para este e-mail.", true);
    renderAccessPortal();
    return;
  }

  const request = {
    id: String(Date.now()),
    name: String(values.name).trim(),
    email,
    campus: String(values.campus).trim(),
    position: String(values.position),
    status: "pending",
    createdAt: new Date().toISOString()
  };
  accessRequests.push(request);
  lastAccessRequestId = request.id;
  if (saveEditorData()) {
    showToast("Pedido enviado para análise do admin.");
  }
  renderAccessPortal("login", request.id);
}

function updateAccessRequest(requestId, action) {
  const request = accessRequests.find(item => item.id === requestId);
  if (!request) {
    showToast("Solicitação não encontrada.", true);
    return;
  }

  if (activeRole !== "admin" || !["approve", "reject"].includes(action)) {
    showToast("Somente o admin da demonstração pode analisar pedidos.", true);
    return;
  }

  request.status = action === "approve" ? "approved" : "rejected";
  if (saveEditorData()) {
    showToast(
      action === "approve"
        ? "Acesso aprovado na demonstração."
        : "Solicitação recusada na demonstração."
    );
  }
  renderEditor();
}

function openAthlete(id) {
  const athlete = athletes.find(item => item.id === Number(id));
  if (!athlete) return;

  openModal(`
    <button
      class="modal-close"
      type="button"
      aria-label="Fechar"
    >Fechar</button>
    <img
      class="modal-photo"
      src="${escapeHtml(athlete.photo)}"
      alt="Foto de ${escapeHtml(athlete.name)}"
    />

    <div class="detail-athlete-head">
      <img src="${escapeHtml(athlete.photo)}" alt="" />
      <div>
        <h2>${escapeHtml(athlete.name)}</h2>
        <p>
          ${escapeHtml(athlete.campus)} ·
          ${escapeHtml(athleteModalities(athlete).join(", "))} ·
          ${escapeHtml(athlete.position)}
        </p>
      </div>
    </div>

    <div class="athlete-stat-grid">
      ${athleteStatistics(athlete)
        .map(
          statistic => `
            <div class="athlete-stat">
              <strong>${escapeHtml(statistic.value)}</strong>
              <small>${escapeHtml(statistic.label)}</small>
            </div>`
        )
        .join("")}
      <div class="athlete-stat">
        <strong>${escapeHtml(athlete.medal || "—")}</strong>
        <small>PÓDIO JIFC</small>
      </div>
      <div class="athlete-stat">
        <strong>${escapeHtml(athlete.age)} anos</strong>
        <small>IDADE</small>
      </div>
      <div class="athlete-stat">
        <strong>${escapeHtml(athlete.height)}</strong>
        <small>ALTURA</small>
      </div>
    </div>

    ${
      athlete.modality === "Atletismo" && athlete.marks
        ? `<p class="detail-copy">
            <strong>Marcas e resultados:</strong>
            ${escapeHtml(athlete.marks)}
          </p>`
        : ""
    }
    <button class="primary-button form-submit" data-open-editor>
      Abrir painel de cadastro
    </button>`);
}

function openModality(name) {
  selectedModality = modalities.find(item => item.name === name) || null;

  if (selectedModality) {
    renderPage("detalhes-modalidade");
  }
}

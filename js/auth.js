// Modais, autenticação demonstrativa e detalhes de atletas/modalidades.
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

function openAuth() {
  if (activeRole) {
    renderEditor();
    return;
  }

  const credentials = {
    server: {
      email: "servidor@ifc.edu.br",
      password: "servidor2025"
    },
    admin: {
      email: "admin@ifc.edu.br",
      password: "admin2025"
    }
  };

  openModal(`
    <button
      class="modal-close"
      type="button"
      aria-label="Fechar"
    >${MEDIA.icons.close}</button>
    <p class="eyebrow">JOGOS IFC · ÁREA RESTRITA</p>
    <h2>Acesso para edição</h2>
    <p class="modal-intro">
      Escolha um perfil demonstrativo para preencher os dados de acesso.
    </p>

    <div class="demo-access-list">
      <button
        class="secondary-button"
        type="button"
        data-demo-login="server"
      >
        <strong>Servidor</strong>
        <span>Preencher acesso de edição de atletas</span>
      </button>
      <button
        class="secondary-button"
        type="button"
        data-demo-login="admin"
      >
        <strong>Administrador</strong>
        <span>Preencher acesso de edição completa</span>
      </button>
    </div>

    <form id="auth-form">
      <div class="form-grid">
        <div class="form-field full">
          <label for="login-email">E-mail de demonstração</label>
          <input
            id="login-email"
            name="email"
            type="email"
            required
            autocomplete="username"
            value="${credentials.server.email}"
          />
        </div>
        <div class="form-field full">
          <label for="login-password">Senha</label>
          <input
            id="login-password"
            name="password"
            type="password"
            required
            autocomplete="current-password"
            value="${credentials.server.password}"
          />
        </div>
      </div>

      <div class="form-note">
        Protótipo local: a autenticação e as permissões são demonstrativas,
        não substituem um serviço seguro de login.
      </div>
      <button class="primary-button form-submit" type="submit">
        Entrar <span>${MEDIA.icons.rightArrow}</span>
      </button>
    </form>`);

  document
    .getElementById("auth-form")
    .addEventListener("submit", event => {
      event.preventDefault();

      const email = document
        .getElementById("login-email")
        .value.trim()
        .toLocaleLowerCase("pt-BR");
      const password = document.getElementById("login-password").value;
      const role = Object.entries(credentials).find(
        ([, account]) =>
          account.email === email && account.password === password
      )?.[0];

      if (!role) {
        showToast("E-mail ou senha demonstrativa incorretos.", true);
        return;
      }

      activeRole = role;
      editorSection = "athletes";
      closeModal();
      renderEditor();
    });

  document.querySelectorAll("[data-demo-login]").forEach(button => {
    button.addEventListener("click", () => {
      const account = credentials[button.dataset.demoLogin];

      document.getElementById("login-email").value = account.email;
      document.getElementById("login-password").value = account.password;
    });
  });
}

function openAthlete(id) {
  const athlete = athletes.find(item => item.id === Number(id));
  if (!athlete) return;

  openModal(`
    <button
      class="modal-close"
      type="button"
      aria-label="Fechar"
    >${MEDIA.icons.close}</button>
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
          ${escapeHtml(athlete.modality)} ·
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
    <button class="primary-button form-submit" data-open-auth="login">
      Área do servidor · editar atleta ${MEDIA.icons.arrow}
    </button>`);
}

function openModality(name) {
  selectedModality = modalities.find(item => item.name === name) || null;

  if (selectedModality) {
    renderPage("detalhes-modalidade");
  }
}

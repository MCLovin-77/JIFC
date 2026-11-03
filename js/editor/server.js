// Tela de edição de atleta disponível ao perfil de servidor.
function renderServerEditor() {
  const athlete =
    athletes.find(item => item.id === Number(selectedAthleteId)) ||
    athletes[0];

  if (!athlete) {
    pageContent.innerHTML = `
      <section class="panel">
        <h2>Nenhum atleta cadastrado</h2>
        <p class="page-subtitle">
          Peça ao administrador para cadastrar atletas.
        </p>
      </section>`;
    return;
  }

  const athleteOptions = athletes
    .map(
      item => `
        <option
          value="${escapeHtml(item.id)}"
          ${item.id === athlete.id ? "selected" : ""}
        >
          ${escapeHtml(item.name)} · ${escapeHtml(item.campus)}
        </option>`
    )
    .join("");

  pageContent.innerHTML = `
    <div class="editor-session-row">
      <span>Perfil: servidor</span>
      <button
        type="button"
        class="secondary-button"
        data-editor-logout
      >Sair</button>
    </div>
    <p class="eyebrow">ÁREA RESTRITA · SERVIDOR</p>
    <h1>Edição de atleta</h1>
    <p class="page-subtitle">
      Este perfil pode atualizar somente a foto, a altura e a idade dos atletas.
    </p>

    <section class="panel editor-panel">
      <div class="panel-title-row">
        <div>
          <h3>Selecione o atleta</h3>
          <p>Os demais dados permanecem bloqueados para este perfil.</p>
        </div>
        <span class="status-pill">SERVIDOR</span>
      </div>

      <div class="form-field">
        <label for="server-athlete">Atleta</label>
        <select id="server-athlete">${athleteOptions}</select>
      </div>

      <form id="server-athlete-form" data-editor-form="server-athlete">
        ${editorGrid([
          editorField(
            "Idade",
            "age",
            athlete.age,
            "number",
            'min="10" max="100" required'
          ),
          editorField(
            "Altura",
            "height",
            athlete.height,
            "text",
            'required placeholder="Ex.: 1,72 m"'
          ),
          editorField(
            "Foto (URL)",
            "photo",
            athlete.photo,
            "url",
            'placeholder="https://..."'
          )
        ])}

        <div class="form-field editor-upload">
          <label for="server-photo-file">
            Ou envie uma imagem do dispositivo
          </label>
          <input
            id="server-photo-file"
            type="file"
            accept="image/*"
          />
          <input
            id="server-photo-data"
            type="hidden"
            name="photoData"
          />
        </div>

        <div class="editor-actions">
          <button class="primary-button" type="submit">
            Salvar dados do atleta
          </button>
        </div>
      </form>
    </section>

    <div class="form-note">
      Alterações são guardadas neste navegador para demonstração.
    </div>`;

  document
    .getElementById("server-athlete")
    .addEventListener("change", event => {
      selectedAthleteId = Number(event.target.value);
      renderServerEditor();
    });

  document
    .getElementById("server-photo-file")
    .addEventListener("change", event => {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        showToast("Selecione um arquivo de imagem.", true);
        event.target.value = "";
        return;
      }

      const reader = new FileReader();

      reader.addEventListener("load", () => {
        document.getElementById("server-photo-data").value = reader.result;
      });
      reader.addEventListener("error", () => {
        showToast("Não foi possível ler a imagem selecionada.", true);
      });
      reader.readAsDataURL(file);
    });
}

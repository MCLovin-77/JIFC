// Construtores compartilhados de campos para os formulários de edição.
function editorField(label, key, value, type = "text", extra = "") {
  return `
    <div class="form-field">
      <label for="edit-${key}">${escapeHtml(label)}</label>
      <input
        id="edit-${key}"
        name="${key}"
        type="${type}"
        value="${escapeHtml(value)}"
        ${extra}
      />
    </div>`;
}

function editorSelect(label, key, value, options) {
  const optionMarkup = options
    .map(
      option => `
        <option
          value="${escapeHtml(option)}"
          ${option === value ? "selected" : ""}
        >${escapeHtml(option)}</option>`
    )
    .join("");

  return `
    <div class="form-field">
      <label for="edit-${key}">${escapeHtml(label)}</label>
      <select id="edit-${key}" name="${key}">
        ${optionMarkup}
      </select>
    </div>`;
}

function editorCheckboxes(
  label,
  key,
  values,
  selectedValues = [],
  className = ""
) {
    const checkboxes = values
      .map(
        value => `
          <label class="editor-checkbox-option">
            <input
              type="checkbox"
              name="${key}"
              value="${escapeHtml(value)}"
              ${selectedValues.includes(value) ? "checked" : ""}
            />
            ${escapeHtml(value)}
          </label>`
      )
      .join("");

    return `
      <fieldset class="form-field editor-checkboxes ${escapeHtml(className)}">
        <legend>${escapeHtml(label)}</legend>
        ${checkboxes}
      </fieldset>`;
}

function editorImageUpload(label, key, currentImage = "") {
  return `
    <div class="form-field editor-upload">
      <label for="edit-${key}">${escapeHtml(label)}</label>
      <input
        id="edit-${key}"
        name="${key}Upload"
        type="file"
        accept="image/*"
      />
      <small>Envie uma imagem de até 2 MB. Deixe vazio para manter a imagem atual.</small>
      ${
        currentImage
          ? `<img class="editor-image-preview" src="${escapeHtml(currentImage)}" alt="Imagem atual do atleta" />`
          : ""
      }
    </div>`;
}

function editorGrid(fields) {
  return `
    <div class="editor-form-grid">
      ${fields.join("\n")}
    </div>`;
}

function editorPicker(id, label, items, selectedIndex, getLabel) {
  const options = items
    .map(
      (item, index) => `
        <option
          value="${index}"
          ${index === selectedIndex ? "selected" : ""}
        >${escapeHtml(getLabel(item))}</option>`
    )
    .join("");

  return `
    <div class="form-field">
      <label for="${id}">${escapeHtml(label)}</label>
      <select id="${id}">
        ${options}
      </select>
    </div>`;
}

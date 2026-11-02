function renderCalendar() {
  pageContent.innerHTML = `
    <p class="eyebrow">${scheduleDateRangeLabel} · EDIÇÃO 2025</p>
    <h1 style="margin-bottom: 20px;">Calendário</h1>

    <div class="list-toolbar">
      <select
        class="select-box"
        id="calendar-filter"
        aria-label="Filtrar modalidade"
      >
        <option value="">Todas as modalidades</option>
        ${modalities.map(modalityOption).join("")}
      </select>
      <select
        class="select-box"
        id="calendar-day-filter"
        aria-label="Selecionar dia"
      >
        ${scheduleDays
          .map(
            scheduleDay => `
              <option value="${scheduleDay.day}">
                ${escapeHtml(scheduleDay.label)}
              </option>`
          )
          .join("")}
      </select>
    </div>

    <section class="panel">
      <div class="panel-title-row">
        <div>
          <h3 id="calendar-day-title"></h3>
          <p style="padding-top: 10px;">Jogos e provas programados</p>
        </div>
        <span class="status-pill" id="calendar-event-count"></span>
      </div>
      <div id="calendar-events"></div>
    </section>
  `;

  document
    .getElementById("calendar-filter")
    .addEventListener("change", updateCalendar);
  document
    .getElementById("calendar-day-filter")
    .addEventListener("change", updateCalendar);
  updateCalendar();
}

function updateCalendar() {
  const selectedDay = document.getElementById("calendar-day-filter").value;
  const selectedModality = document.getElementById("calendar-filter").value;
  const scheduleDay = scheduleDays.find(
    item => String(item.day) === selectedDay
  );
  const filteredFixtures = fixtures.filter(
    fixture =>
      String(fixture.day) === selectedDay &&
      (!selectedModality || fixture.modality === selectedModality)
  );

  document.getElementById("calendar-day-title").textContent =
    scheduleDay?.label || "Programação";
  document.getElementById("calendar-event-count").textContent =
    `${filteredFixtures.length} atividades`;

  const eventList = document.getElementById("calendar-events");
  eventList.innerHTML = filteredFixtures.length
    ? calendarRows(filteredFixtures)
    : `<div class="empty-state">
        Nenhum jogo desta modalidade está na programação deste dia.
      </div>`;
}

function calendarRows(items) {
  return items
    .map(
      fixture => `
        <article class="event-card">
          <div class="event-row">
            <div class="event-day">
              <strong>${escapeHtml(fixture.day)}</strong>
              <small>${escapeHtml(fixture.month)}</small>
            </div>
            <div class="event-detail">
              <strong>${escapeHtml(fixture.title)}</strong>
              <p>
                ${escapeHtml(fixture.meta)}
                ${
                  fixture.score
                    ? ` · Placar ${escapeHtml(fixture.score)}`
                    : ""
                }
              </p>
            </div>
            <span class="fixture-tag">${escapeHtml(fixture.tag)}</span>
          </div>
        </article>`
    )
    .join("");
}

function renderCalendar() {
  const fixtureDays = [
    ...new Map(
      fixtures.map(fixture => [
        String(fixture.day),
        {
          day: String(fixture.day),
          label: fixture.dayLabel || `${fixture.day} ${fixture.month || ""}`
        }
      ])
    ).values()
  ];

  pageContent.innerHTML = `
    <p class="eyebrow">PROGRAMAÇÃO DO JIFC</p>
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
        <option value="">Todos os dias</option>
        ${fixtureDays
          .map(
            fixtureDay => `
              <option value="${escapeHtml(fixtureDay.day)}">
                ${escapeHtml(fixtureDay.label)}
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
  const scheduleDay = selectedDay
    ? fixtures.find(fixture => String(fixture.day) === selectedDay)
    : null;
  const filteredFixtures = fixtures.filter(
    fixture =>
      (!selectedDay || String(fixture.day) === selectedDay) &&
      (!selectedModality || fixture.modality === selectedModality)
  );

  document.getElementById("calendar-day-title").textContent =
    scheduleDay?.dayLabel ||
    (scheduleDay ? `${scheduleDay.day} ${scheduleDay.month || ""}` : "Programação");
  document.getElementById("calendar-event-count").textContent =
    `${filteredFixtures.length} atividades`;

  const eventList = document.getElementById("calendar-events");
  eventList.innerHTML = filteredFixtures.length
    ? calendarRows(filteredFixtures)
    : `<div class="empty-state">
        Nenhum jogo cadastrado.
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

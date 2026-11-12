function renderCalendar() {
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
      <input
        class="select-box"
        id="calendar-day-filter"
        type="date"
        aria-label="Selecionar data"
        title="Selecionar data"
      />
    </div>

    <section class="panel">
      <div class="panel-title-row">
        <div>
          <h3 id="calendar-day-title"></h3>
          <p style="padding-top: 10px;">Jogos e provas programados · dados demonstrativos</p>
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
  const filteredFixtures = fixtures.filter(
    fixture =>
      (!selectedDay || fixture.date === selectedDay) &&
      (!selectedModality || fixture.modality === selectedModality)
  );

  document.getElementById("calendar-day-title").textContent =
    selectedDay ? formatFixtureDate(selectedDay) : "Programação";
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
              <strong>${escapeHtml(fixtureDateDay(fixture.date))}</strong>
              <small>${escapeHtml(fixtureDateMonth(fixture.date))}</small>
            </div>
            <div class="event-detail">
              <strong>${escapeHtml(fixture.title)}</strong>
              <p>
                ${escapeHtml(fixture.modality)} · ${escapeHtml(fixture.meta)}
                ${fixture.phase ? ` · ${escapeHtml(fixture.phase)}` : ""}
                ${
                  fixture.campuses?.length
                    ? ` · Campus: ${escapeHtml(fixture.campuses.join(", "))}`
                    : ""
                }
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

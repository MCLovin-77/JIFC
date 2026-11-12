// Persistência local, escape de conteúdo e utilitários compartilhados.
function escapeHtml(value) {
  const escapedCharacters = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  return String(value ?? "").replace(
    /[&<>"']/g,
    character => escapedCharacters[character]
  );
}

function normalizeAthlete(athlete) {
  const migratedAthlete = { ...athlete };
  migratedAthlete.campus = migratedAthlete.campus || "";
  const defaultAthlete = athletes.find(item => item.id === athlete.id);
  const femininePositionForms = {
    Armador: "Armadora",
    "Ala-armador": "Ala-armadora",
    Fixo: "Fixa",
    Goleiro: "Goleira",
    "Armador central": "Armadora central",
    "Armador esquerdo": "Armadora esquerda",
    "Armador direito": "Armadora direita",
    Levantador: "Levantadora",
    Ponteiro: "Ponteira",
    Oposto: "Oposta",
    Bloqueador: "Bloqueadora",
    Defensor: "Defensora",
    Saltador: "Saltadora",
    Lançador: "Lançadora"
  };
  const masculinePositionForms = Object.fromEntries(
    Object.entries(femininePositionForms).map(([masculine, feminine]) => [
      feminine,
      masculine
    ])
  );

  if (!["Masculino", "Feminino"].includes(migratedAthlete.naipe)) {
    migratedAthlete.naipe = defaultAthlete?.naipe || "Masculino";
  }
  const positionForms =
    migratedAthlete.naipe === "Feminino"
      ? femininePositionForms
      : masculinePositionForms;
  migratedAthlete.position =
    positionForms[migratedAthlete.position] || migratedAthlete.position;
  migratedAthlete.modality =
    modalityNameAliases[migratedAthlete.modality] ||
    migratedAthlete.modality;
  delete migratedAthlete.modalities;
  const athleticsEventNames = new Set(athleticsEvents.map(event => event.name));
  const selectedAthleticsEvents = Array.isArray(
    migratedAthlete.athleticsSubmodalities
  )
    ? [...new Set(migratedAthlete.athleticsSubmodalities)].filter(name =>
        athleticsEventNames.has(name)
      )
    : [];
  migratedAthlete.athleticsSubmodalities = normalizeAthleticsSelections(
    selectedAthleticsEvents
  );
  const rule = modalityRules[migratedAthlete.modality];
  const previousStats =
    migratedAthlete.stats && typeof migratedAthlete.stats === "object"
      ? migratedAthlete.stats
      : {};

  if (rule) {
    migratedAthlete.stats = Object.fromEntries(
      rule.statistics
        .map(({ key }) => {
          const legacyValue =
            key === "points"
              ? migratedAthlete.points ?? migratedAthlete.goals
              : migratedAthlete[key];
          const value = previousStats[key] ?? legacyValue;

          return [key, value];
        })
        .filter(([, value]) => value !== undefined && value !== null)
    );

    if (!rule.positions.includes(migratedAthlete.position)) {
      migratedAthlete.position = rule.positions[0];
    }
  }

  delete migratedAthlete.rating;
  delete migratedAthlete.goals;
  delete migratedAthlete.assists;
  delete migratedAthlete.points;
  delete migratedAthlete.wins;

  return migratedAthlete;
}

function athleteModalities(athlete) {
  const modality = modalityNameAliases[athlete.modality] || athlete.modality;
  return modality ? [modality] : [];
}

function athleteHasModality(athlete, modalityName) {
  return athleteModalities(athlete).includes(modalityName);
}

function normalizeAthleticsSelections(selectedNames) {
  const selected = new Set(selectedNames);
  return athleticsEvents
    .filter(event => selected.has(event.name))
    .slice(0, 3)
    .map(event => event.name);
}

function normalizeModality(modality) {
  const name = modalityNameAliases[modality.name] || modality.name;
  const defaults = modalities.find(item => item.name === name);

  if (!defaults) {
    return { ...modality, name };
  }

  return {
    ...defaults,
    ...modality,
    name,
    category:
      ["individual", "coletiva"].includes(modality.category)
        ? modality.category
        : defaults.category,
    naipes:
      Array.isArray(modality.naipes) && modality.naipes.length
        ? modality.naipes
        : defaults.naipes,
    status: ["ativa", "inativa"].includes(modality.status)
      ? modality.status
      : defaults.status,
    submodalities:
      name === "Atletismo"
        ? athleticsEvents
        : Array.isArray(modality.submodalities)
          ? modality.submodalities
          : defaults.submodalities
  };
}

function normalizeAthleticsEvent(event) {
  const eventNameAliases = {
    "1.500 m": "1.500 m rasos",
    "3.000 m": "3.000 m rasos",
    "Lançamento do disco": "Lançamento de disco",
    "Lançamento do dardo": "Lançamento de dardo"
  };
  const name = eventNameAliases[event.name] || event.name;
  const defaults = athleticsEvents.find(item => item.name === name);

  return {
    ...defaults,
    ...event,
    name,
    naipes:
      Array.isArray(event.naipes) && event.naipes.length
        ? event.naipes
        : defaults?.naipes || [],
    status: event.status || defaults?.status || "ativa"
  };
}

function normalizeFixture(fixture) {
  const monthNumbers = {
    JAN: "01",
    FEV: "02",
    MAR: "03",
    ABR: "04",
    MAI: "05",
    JUN: "06",
    JUL: "07",
    AGO: "08",
    SET: "09",
    OUT: "10",
    NOV: "11",
    DEZ: "12"
  };
  let date = fixture.date || "";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) && fixture.day && fixture.month) {
    const month = monthNumbers[String(fixture.month).slice(0, 3).toUpperCase()];
    if (month) {
      date = `2025-${month}-${String(fixture.day).padStart(2, "0")}`;
    }
  }

  const defaultFixture = fixtures.find(
    item =>
      item.modality === fixture.modality &&
      item.title === fixture.title &&
      item.date.slice(5) === date.slice(5)
  );
  if (defaultFixture) {
    date = defaultFixture.date;
  }

  return {
    ...fixture,
    date,
    naipe: fixture.naipe || "Masculino",
    campuses: Array.isArray(fixture.campuses) ? fixture.campuses : []
  };
}

function campusCodeForName(name) {
  const normalizedName = normalizeCampusName(name).toLocaleLowerCase("pt-BR");
  return campuses.find(
    campus =>
      normalizeCampusName(campus.name).toLocaleLowerCase("pt-BR") ===
      normalizedName
  )?.code;
}

function fixtureKey(fixture) {
  return `${fixture.modality}|${fixture.title}`;
}

function mergeSeededRecords(defaultRecords, savedRecords, getKey) {
  const savedByKey = new Map(
    savedRecords.map(record => [getKey(record), record])
  );
  const defaultKeys = new Set(defaultRecords.map(getKey));

  return [
    ...defaultRecords.map(
      record => savedByKey.get(getKey(record)) || record
    ),
    ...savedRecords.filter(record => !defaultKeys.has(getKey(record)))
  ];
}

function loadEditorData() {
  try {
    const saved = JSON.parse(localStorage.getItem("ifc-editor-data") || "{}");
    const hasLegacyRecords =
      saved.version !== 2 &&
      ["athletes", "medals", "campuses", "fixtures"].some(
        key => Array.isArray(saved[key]) && saved[key].length > 0
      );
    let requiresMigration =
      hasLegacyRecords ||
      (saved.version !== undefined && saved.version !== 2);

    if (!hasLegacyRecords) {
      if (Array.isArray(saved.athletes)) {
        athletes.splice(
          0,
          athletes.length,
          ...mergeSeededRecords(
            athletes,
            saved.athletes.map(normalizeAthlete),
            athlete => athlete.id
          )
        );
      }
      if (Array.isArray(saved.medals)) {
        const restoredMedals = saved.medals.map(medal => ({
          ...medal,
          code: campusCodeForName(medal.name) || medal.code
        }));
        medals.splice(
          0,
          medals.length,
          ...mergeSeededRecords(
            medals,
            restoredMedals,
            medal => normalizeCampusName(medal.name)
          )
        );
      }
      if (Array.isArray(saved.campuses)) {
        const restoredCampuses = saved.campuses.map(campus => {
          const defaults =
            campuses.find(item => item.code === campus.code) ||
            campuses.find(
              item =>
                normalizeCampusName(item.name).toLocaleLowerCase("pt-BR") ===
                normalizeCampusName(campus.name).toLocaleLowerCase("pt-BR")
            );
          const participantCount = Number(campus.athletes);
          return defaults
            ? {
                ...defaults,
                ...campus,
                code: defaults.code,
                athletes:
                participantCount >= 48 && participantCount <= 60
                  ? participantCount
                  : defaults.athletes
              }
            : campus;
        });
        const restoredCampusCodes = new Set(
          restoredCampuses.map(campus => campus.code)
        );
        requiresMigration =
          requiresMigration ||
          campuses.some(campus => !restoredCampusCodes.has(campus.code));
        campuses.splice(
          0,
          campuses.length,
          ...mergeSeededRecords(
            campuses,
            restoredCampuses,
            campus => campus.code
          )
        );
      }
      if (Array.isArray(saved.fixtures)) {
        const restoredFixtures = saved.fixtures.map(normalizeFixture);
        fixtures.splice(
          0,
          fixtures.length,
          ...mergeSeededRecords(fixtures, restoredFixtures, fixtureKey)
        );
      }
    }

    if (Array.isArray(saved.modalities)) {
      const restoredModalities = saved.modalities.map(modality => {
        const normalizedModality = normalizeModality(modality);
        return {
          ...normalizedModality,
          athletes: hasLegacyRecords ? 0 : normalizedModality.athletes,
          campus: hasLegacyRecords ? 0 : normalizedModality.campus,
          next: hasLegacyRecords
            ? "A definir"
            : String(normalizedModality.next).replace(
                /^Ao vivo\s*[·-]\s*/i,
                "Hoje · "
              )
        };
      });
      const savedModalityNames = new Set(
        restoredModalities.map(modality => modality.name)
      );
      requiresMigration =
        requiresMigration ||
        modalities.some(modality => !savedModalityNames.has(modality.name)) ||
        restoredModalities.some(
          (modality, index) => modality.name !== saved.modalities[index].name
        ) ||
        saved.modalities.some(
          modality =>
            !modality.category ||
            !Array.isArray(modality.naipes) ||
            !modality.status ||
            (hasLegacyRecords &&
              (Number(modality.athletes) !== 0 ||
                Number(modality.campus) !== 0 ||
                modality.next !== "A definir"))
        );
      const mergedModalities = mergeSeededRecords(
        modalities,
        restoredModalities,
        modality => modality.name
      );

      modalities.splice(0, modalities.length, ...mergedModalities);
    }

    if (Array.isArray(saved.podiums)) {
      podiums.splice(
        0,
        podiums.length,
        ...mergeSeededRecords(
          podiums,
          saved.podiums,
          podium => podium.title
        )
      );
    }

    if (Array.isArray(saved.accessRequests)) {
      accessRequests.splice(
        0,
        accessRequests.length,
        ...saved.accessRequests.filter(
          request =>
            request &&
            ["pending", "approved", "rejected"].includes(request.status) &&
            typeof request.email === "string" &&
            typeof request.name === "string" &&
            typeof request.campus === "string" &&
            typeof request.position === "string"
        )
      );
    }

    if (Array.isArray(saved.athleticsEvents)) {
      const restoredEvents = saved.athleticsEvents.map(
        normalizeAthleticsEvent
      );
      const savedEventNames = new Set(
        restoredEvents.map(event => event.name)
      );
      requiresMigration =
        requiresMigration ||
        athleticsEvents.some(event => !savedEventNames.has(event.name)) ||
        saved.athleticsEvents.some(
          event => !event.status || !Array.isArray(event.naipes)
        );
      const mergedEvents = mergeSeededRecords(
        athleticsEvents,
        restoredEvents,
        event => event.name
      );
      athleticsEvents.splice(0, athleticsEvents.length, ...mergedEvents);
    }

    const athleticsModality = modalities.find(
      modality => modality.name === "Atletismo"
    );
    if (athleticsModality) {
      athleticsModality.submodalities = athleticsEvents;
    }

    selectedAdminAthleteIndex = athletes.length ? 0 : -1;
    selectedFixtureIndex = fixtures.length ? 0 : -1;
    selectedMedalIndex = medals.length ? 0 : -1;
    selectedCampusIndex = campuses.length ? 0 : -1;
    selectedPodiumIndex = podiums.length ? 0 : -1;

    if (requiresMigration) {
      saveEditorData();
    }
  } catch (error) {
    showToast("Os dados demonstrativos salvos não puderam ser carregados.", true);
  }
}

function saveEditorData() {
  try {
    const data = {
      version: 2,
      athletes,
      medals,
      podiums,
      accessRequests,
      modalities,
      campuses,
      fixtures,
      athleticsEvents
    };

    localStorage.setItem("ifc-editor-data", JSON.stringify(data));
    return true;
  } catch (error) {
    showToast(
      "As alterações foram aplicadas nesta sessão, mas não puderam ser salvas neste navegador.",
      true
    );
    return false;
  }
}

loadEditorData();

function rankedMedals() {
  return [...medals].sort(
    (left, right) =>
      Number(right.gold) - Number(left.gold) ||
      Number(right.silver) - Number(left.silver) ||
      Number(right.bronze) - Number(left.bronze)
  );
}

function medalRows(limit = medals.length, includeAllCampuses = false) {
  const medalRecords = includeAllCampuses
    ? campuses.map(campus => {
        const existingRecord = medals.find(
          medal =>
            normalizeCampusName(medal.name).toLocaleLowerCase("pt-BR") ===
            normalizeCampusName(campus.name).toLocaleLowerCase("pt-BR")
        );
        return (
          existingRecord || {
            name: `Campus ${normalizeCampusName(campus.name)}`,
            code: campus.code,
            gold: 0,
            silver: 0,
            bronze: 0
          }
        );
      })
    : [...medals];

  if (includeAllCampuses) {
    const listedNames = new Set(
      medalRecords.map(medal =>
        normalizeCampusName(medal.name).toLocaleLowerCase("pt-BR")
      )
    );
    medalRecords.push(
      ...medals.filter(
        medal =>
          !listedNames.has(
            normalizeCampusName(medal.name).toLocaleLowerCase("pt-BR")
          )
      )
    );
  }

  return medalRecords
    .sort(
      (left, right) =>
        Number(right.gold) - Number(left.gold) ||
        Number(right.silver) - Number(left.silver) ||
        Number(right.bronze) - Number(left.bronze)
    )
    .slice(0, limit)
    .map((campus, index) => {
      const total =
        Number(campus.gold) +
        Number(campus.silver) +
        Number(campus.bronze);

      return `
        <tr>
          <td>
            <span class="rank">
              ${String(index + 1).padStart(2, "0")}
            </span>
          </td>
          <td>
            <span class="campus-cell">
              <span class="campus-mark">${escapeHtml(campus.code)}</span>
              <span class="campus-name">${escapeHtml(campus.name)}</span>
            </span>
          </td>
          <td class="gold-medal">${escapeHtml(campus.gold)}</td>
          <td class="silver-medal">${escapeHtml(campus.silver)}</td>
          <td class="bronze-medal">${escapeHtml(campus.bronze)}</td>
          <td><strong>${total}</strong></td>
        </tr>`;
    })
    .join("");
}

function normalizeCampusName(name) {
  return String(name).replace(/^Campus\s+/i, "").trim();
}

function medalTotalForCampus(campus) {
  const medalRecord = medals.find(
    item =>
      normalizeCampusName(item.name) ===
      normalizeCampusName(campus.name)
  );

  if (!medalRecord) {
    return Number(campus.medals || 0);
  }

  return (
    Number(medalRecord.gold) +
    Number(medalRecord.silver) +
    Number(medalRecord.bronze)
  );
}

function syncCampusName(oldName, newName, code) {
  const oldNormalizedName = normalizeCampusName(oldName);
  const newNormalizedName = normalizeCampusName(newName);
  const campus = campuses.find(
    item => normalizeCampusName(item.name) === oldNormalizedName
  );
  const medalRecord =
    medals.find(
      item => normalizeCampusName(item.name) === oldNormalizedName
    ) ||
    medals.find(
      item => normalizeCampusName(item.name) === newNormalizedName
    );

  if (campus) {
    campus.name = newNormalizedName;
    if (code) campus.code = code;

    if (medalRecord) {
      campus.medals =
        Number(medalRecord.gold) +
        Number(medalRecord.silver) +
        Number(medalRecord.bronze);
    }
  }

  if (medalRecord) {
    medalRecord.name = `Campus ${newNormalizedName}`;
    if (code) medalRecord.code = code;
  }

  athletes.forEach(athlete => {
    if (normalizeCampusName(athlete.campus) === oldNormalizedName) {
      athlete.campus = `Campus ${newNormalizedName}`;
    }
  });
}

function fixtureRows(items = fixtures) {
  return items
    .map(
      game => `
        <div class="fixture">
          <div class="fixture-date">
            <strong>${escapeHtml(fixtureDateDay(game.date))}</strong>
            <small>${escapeHtml(fixtureDateMonth(game.date))}</small>
          </div>
          <div class="fixture-info">
            <strong>${escapeHtml(game.title)}</strong>
            <small>
              ${escapeHtml(game.modality)} · ${escapeHtml(game.meta)}
              ${game.score ? ` · ${escapeHtml(game.score)}` : ""}
            </small>
          </div>
          <span class="fixture-tag">${escapeHtml(game.tag)}</span>
        </div>`
    )
    .join("");
}

function fixtureDateDay(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.slice(8, 10) : "—";
}

function fixtureDateMonth(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "A definir";
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
    month: "short"
  }).replace(".", "").toUpperCase();
}

function formatFixtureDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "Data a definir";
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function athleteStatistics(athlete) {
  const rule = modalityRules[athlete.modality];

  return (rule?.statistics || []).map(({ key, label }) => ({
    label,
    value: athlete.stats?.[key] ?? 0
  }));
}

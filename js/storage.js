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
          ...saved.athletes.map(normalizeAthlete)
        );
      }
      if (Array.isArray(saved.medals)) {
        medals.splice(0, medals.length, ...saved.medals);
      }
      if (Array.isArray(saved.campuses)) {
        const restoredCampuses = saved.campuses.map(campus => {
          const defaults = campuses.find(item => item.code === campus.code);
          return defaults ? { ...defaults, ...campus } : campus;
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
        fixtures.splice(0, fixtures.length, ...saved.fixtures);
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
      podiums.splice(0, podiums.length, ...saved.podiums);
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

function medalRows(limit = medals.length) {
  return rankedMedals()
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
            <strong>${escapeHtml(game.day)}</strong>
            <small>${escapeHtml(game.month)}</small>
          </div>
          <div class="fixture-info">
            <strong>${escapeHtml(game.title)}</strong>
            <small>
              ${escapeHtml(game.meta)}
              ${game.score ? ` · ${escapeHtml(game.score)}` : ""}
            </small>
          </div>
          <span class="fixture-tag">${escapeHtml(game.tag)}</span>
        </div>`
    )
    .join("");
}

function athleteStatistics(athlete) {
  const rule = modalityRules[athlete.modality];

  return (rule?.statistics || []).map(({ key, label }) => ({
    label,
    value: athlete.stats?.[key] ?? 0
  }));
}

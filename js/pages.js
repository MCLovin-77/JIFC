// Funções compartilhadas e roteador das telas públicas.
function modalityOption(modality) {
  return `<option>${escapeHtml(modality.name)}</option>`;
}

function modalityCategoryLabel(modality) {
  return modality.category === "individual" ? "Individual" : "Coletiva";
}

function modalityNaipeLabel(modality) {
  return (modality.naipes || []).join(" e ");
}

function modalityStatusLabel(status) {
  return status === "ativa" ? "Ativa" : "Inativa";
}

function renderPage(page) {
  const pageTitle =
    page === "detalhes-modalidade" && selectedModality
      ? selectedModality.name
      : pageNames[page] || pageNames.inicio;
  const screenRenderers = {
    inicio: renderHome,
    calendario: renderCalendar,
    atletismo: renderAthletics,
    podios: renderPodios,
    atletas: renderAthletes,
    campus: renderCampuses,
    modalidades: renderModalities,
    "detalhes-modalidade": renderModalityDetails
  };
  const renderScreen = screenRenderers[page] || renderHome;

  document.getElementById("breadcrumb-current").textContent = pageTitle;
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  if (page === "detalhes-modalidade") {
    document
      .querySelector('.nav-link[data-page="modalidades"]')
      .classList.add("active");
  }

  renderScreen();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

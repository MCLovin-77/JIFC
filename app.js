// Inicialização da interface, tema e eventos globais.
applyMediaAssets();

function showToast(message, error = false) {
  const root = document.getElementById("toast-root");
  const toast = document.createElement("div");
  toast.className = `toast${error ? " error" : ""}`;
  toast.textContent = message;
  root.appendChild(toast);
  window.setTimeout(() => toast.remove(), 4500);
}

function setTheme(theme, persist = true) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  const toggle = document.getElementById("theme-toggle");

  toggle.setAttribute("aria-pressed", String(dark));
  toggle.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
  toggle.title = dark ? "Ativar modo claro" : "Ativar modo escuro";
  toggle.querySelector(".theme-label").textContent = dark ? "Modo claro" : "Modo escuro";
  toggle.querySelector("[aria-hidden]").textContent = dark ? MEDIA.icons.sun : MEDIA.icons.moon;
  if (persist) {
    try {
      localStorage.setItem("ifc-theme", dark ? "dark" : "light");
    } catch (error) {
      showToast("O tema foi alterado, mas não pôde ser salvo neste navegador.", true);
    }
  }
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

try {
  setTheme(localStorage.getItem("ifc-theme") === "dark" ? "dark" : "light", false);
} catch (error) {
  setTheme("light", false);
  showToast("A preferência de tema não pôde ser carregada neste navegador.", true);
}

document.addEventListener("click", event => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    event.preventDefault();
    renderPage(pageButton.dataset.page);
    return;
  }
  const authButton = event.target.closest("[data-open-auth]");
  if (authButton) {
    openAuth();
    return;
  }
  const athlete = event.target.closest("[data-athlete]");
  if (athlete) {
    openAthlete(athlete.dataset.athlete);
    return;
  }
  const modality = event.target.closest("[data-modality]");
  if (modality) {
    openModality(modality.dataset.modality);
  }
});

document.addEventListener("keydown", event => {
  const card = event.target.closest && event.target.closest(".athlete-card");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openAthlete(card.dataset.athlete);
  }
});

renderPage("inicio");

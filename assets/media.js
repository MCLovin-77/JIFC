function unsplashImage(photoId, width, quality) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

const MEDIA = Object.freeze({
  images: {
    athletes: {
      anaClara: unsplashImage("photo-1534528741775-53994a69daeb", 600, 80),
      lucas: unsplashImage("photo-1500648767791-00dcc994a43e", 600, 80),
      mariana: unsplashImage("photo-1531123897727-8f129e1688ce", 600, 80),
      pedro: unsplashImage("photo-1506794778202-cad84cf45f1d", 600, 80),
      beatriz: unsplashImage("photo-1524504388940-b1c1722653e1", 600, 80),
      rafael: unsplashImage("photo-1507003211169-0a1dd7228f2d", 600, 80)
    },
    campuses: {
      camboriu: unsplashImage("photo-1562774053-701939374585", 700, 75),
      concordia: unsplashImage("photo-1498243691581-b145c3f54a5a", 700, 75),
      rioDoSul: unsplashImage("photo-1564981797816-1043664bf78d", 700, 75),
      blumenau: unsplashImage("photo-1580582932707-520aed937b7b", 700, 75),
      araquari: unsplashImage("photo-1568792923760-d70635a89fdc", 700, 75),
      saoBentoDoSul: unsplashImage("photo-1509062522246-3755977927d7", 700, 75)
    },
    campusBanner: unsplashImage("photo-1562774053-701939374585", 1400, 85),
    modalityDetails: unsplashImage("photo-1461896836934-ffe607ba8211", 1200, 80)
  },
  icons: {
    home: "⌂",
    calendar: "▦",
    athletics: "↗",
    podium: "♜",
    athlete: "♙",
    campus: "⌖",
    modalities: "◈",
    spark: "✳",
    arrow: "↗",
    rightArrow: "→",
    leftArrow: "←",
    close: "×",
    edit: "✎",
    moon: "☾",
    sun: "☀",
    notifications: "♧",
    search: "⌕",
    basketball: "◉",
    futsal: "◌",
    handball: "◍",
    volleyball: "◈",
    tableTennis: "⊙",
    chess: "♟"
  }
});

function applyMediaAssets() {
  document.documentElement.style.setProperty(
    "--campus-banner-image",
    `url("${MEDIA.images.campusBanner}")`
  );
  document.documentElement.style.setProperty(
    "--modality-details-image",
    `url("${MEDIA.images.modalityDetails}")`
  );
  document.querySelectorAll("[data-icon]").forEach(element => {
    const icon = MEDIA.icons[element.dataset.icon];
    if (!icon) {
      throw new Error(`Ícone não cadastrado: ${element.dataset.icon}`);
    }
    element.textContent = icon;
  });
}

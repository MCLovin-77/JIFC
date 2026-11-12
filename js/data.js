// Conteúdo demonstrativo e estado compartilhado pela interface.
const athletes = [
  {
    id: 1,
    name: "Ana Clara Souza",
    campus: "Campus Camboriú",
    modality: "Voleibol",
    naipe: "Feminino",
    position: "Ponteira",
    age: 17,
    height: "1,72 m",
    stats: { points: 28 },
    medal: "Ouro",
    photo: MEDIA.images.athletes.anaClara,
    marks: "Salto: 2,84 m · Saque: 82 km/h"
  },
  {
    id: 2,
    name: "Lucas Martins",
    campus: "Campus Concórdia",
    modality: "Futsal",
    naipe: "Masculino",
    position: "Pivô",
    age: 18,
    height: "1,80 m",
    stats: { goals: 14, assists: 6 },
    medal: "Ouro",
    photo: MEDIA.images.athletes.lucas,
    marks: "Velocidade: 29 km/h · 14 gols"
  },
  {
    id: 3,
    name: "Mariana Oliveira",
    campus: "Campus Rio do Sul",
    modality: "Atletismo",
    naipe: "Feminino",
    position: "Meio-fundista",
    age: 16,
    height: "1,65 m",
    stats: {},
    medal: "Prata",
    photo: MEDIA.images.athletes.mariana,
    marks: "800 m: 2min18s · 1.500 m: 4min52s"
  },
  {
    id: 4,
    name: "Pedro Henrique Lima",
    campus: "Campus Blumenau",
    modality: "Basquetebol",
    naipe: "Masculino",
    position: "Armador",
    age: 17,
    height: "1,83 m",
    stats: { points: 18, assists: 9 },
    medal: "Bronze",
    photo: MEDIA.images.athletes.pedro,
    marks: "18 pontos · 9 assistências"
  },
  {
    id: 5,
    name: "Beatriz Fernandes",
    campus: "Campus Araquari",
    modality: "Atletismo",
    naipe: "Feminino",
    position: "Velocista",
    age: 16,
    height: "1,68 m",
    stats: {},
    medal: "Ouro",
    photo: MEDIA.images.athletes.beatriz,
    marks: "100 m rasos: 12,16 s · 200 m rasos: 25,84 s"
  },
  {
    id: 6,
    name: "Rafael Costa",
    campus: "Campus São Bento do Sul",
    modality: "Futsal",
    naipe: "Masculino",
    position: "Goleiro",
    age: 18,
    height: "1,87 m",
    stats: { goals: 1, assists: 3 },
    medal: "Prata",
    photo: MEDIA.images.athletes.rafael,
    marks: "12 defesas · 1 gol"
  }
];

const modalityRules = {
  Atletismo: {
    positions: [
      "Velocista",
      "Meio-fundista",
      "Fundista",
      "Saltador",
      "Saltadora",
      "Lançador",
      "Lançadora"
    ],
    statistics: []
  },
  Basquetebol: {
    positions: [
      "Armador",
      "Armadora",
      "Ala-armador",
      "Ala-armadora",
      "Ala",
      "Ala-pivô",
      "Pivô"
    ],
    statistics: [
      { key: "points", label: "Pontos" },
      { key: "assists", label: "Assistências" }
    ]
  },
  Futsal: {
    positions: [
      "Pivô",
      "Ala direita",
      "Ala esquerda",
      "Fixo",
      "Fixa",
      "Goleiro",
      "Goleira"
    ],
    statistics: [
      { key: "goals", label: "Gols" },
      { key: "assists", label: "Assistências" }
    ]
  },
  Handebol: {
    positions: [
      "Goleiro",
      "Goleira",
      "Ponta esquerda",
      "Ponta direita",
      "Armador central",
      "Armadora central",
      "Armador esquerdo",
      "Armadora esquerda",
      "Armador direito",
      "Armadora direita",
      "Pivô"
    ],
    statistics: [
      { key: "goals", label: "Gols" },
      { key: "assists", label: "Assistências" }
    ]
  },
  Voleibol: {
    positions: [
      "Levantador",
      "Levantadora",
      "Ponteiro",
      "Ponteira",
      "Oposto",
      "Oposta",
      "Central",
      "Líbero"
    ],
    statistics: [{ key: "points", label: "Pontos" }]
  },
  "Vôlei de praia": {
    positions: [
      "Bloqueador",
      "Bloqueadora",
      "Defensor",
      "Defensora"
    ],
    statistics: [{ key: "points", label: "Pontos" }]
  },
  "Tênis de mesa": {
    positions: ["Individual", "Duplas"],
    statistics: [{ key: "wins", label: "Vitórias" }]
  },
  Xadrez: {
    positions: ["Individual"],
    statistics: [{ key: "wins", label: "Vitórias" }]
  }
};

const modalityNameAliases = {
  Basquete: "Basquetebol",
  "Vôlei": "Voleibol"
};

const athleticsEvents = [
  {
    name: "100 m rasos",
    category: "Pista · velocidade",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    batteries: [
      {
        name: "Bateria 1",
        naipes: ["Masculino"],
        campuses: ["Camboriú", "Concórdia", "Blumenau", "Araquari"]
      },
      {
        name: "Bateria 2",
        naipes: ["Masculino"],
        campuses: ["Rio do Sul", "São Bento do Sul", "Brusque", "Videira"]
      },
      {
        name: "Bateria 1",
        naipes: ["Feminino"],
        campuses: ["Ibirama", "Luzerna", "Fraiburgo", "Sombrio"]
      },
      {
        name: "Bateria 2",
        naipes: ["Feminino"],
        campuses: ["Abelardo Luz", "Santa Rosa do Sul", "São Francisco do Sul"]
      }
    ]
  },
  {
    name: "200 m rasos",
    category: "Pista · velocidade",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    batteries: [
      {
        name: "Bateria 1",
        naipes: ["Masculino", "Feminino"],
        campuses: ["Camboriú", "Concórdia", "Rio do Sul", "Blumenau"]
      },
      {
        name: "Bateria 2",
        naipes: ["Masculino", "Feminino"],
        campuses: ["Araquari", "São Bento do Sul", "Ibirama", "Videira"]
      }
    ]
  },
  {
    name: "400 m rasos",
    category: "Pista · velocidade",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    batteries: [
      {
        name: "Bateria 1",
        naipes: ["Masculino"],
        campuses: ["Camboriú", "Concórdia", "Rio do Sul", "Blumenau"]
      },
      {
        name: "Bateria 2",
        naipes: ["Feminino"],
        campuses: ["Araquari", "São Bento do Sul", "Ibirama", "Videira"]
      }
    ]
  },
  {
    name: "800 m rasos",
    category: "Pista · meio-fundo",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    batteries: [
      { name: "Bateria 1", naipes: ["Masculino", "Feminino"], campuses: ["Camboriú", "Concórdia", "Blumenau", "Araquari"] },
      { name: "Bateria 2", naipes: ["Masculino", "Feminino"], campuses: ["Rio do Sul", "São Bento do Sul", "Ibirama", "Videira"] }
    ]
  },
  {
    name: "1.500 m rasos",
    category: "Pista · meio-fundo",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    batteries: [
      { name: "Bateria 1", naipes: ["Masculino", "Feminino"], campuses: ["Concórdia", "Rio do Sul", "Blumenau", "Brusque"] },
      { name: "Bateria 2", naipes: ["Masculino", "Feminino"], campuses: ["Araquari", "Ibirama", "Luzerna", "Videira"] }
    ]
  },
  {
    name: "3.000 m rasos",
    category: "Pista · fundo",
    naipes: ["Feminino"],
    status: "ativa",
    batteries: [
      { name: "Bateria 1", naipes: ["Feminino"], campuses: ["Camboriú", "Concórdia", "Blumenau", "Araquari"] },
      { name: "Bateria 2", naipes: ["Feminino"], campuses: ["Rio do Sul", "Ibirama", "Luzerna", "Videira"] }
    ]
  },
  {
    name: "5.000 m rasos",
    category: "Pista · fundo",
    naipes: ["Masculino"],
    status: "ativa",
    batteries: [
      { name: "Bateria 1", naipes: ["Masculino"], campuses: ["Camboriú", "Concórdia", "Blumenau", "Araquari"] },
      { name: "Bateria 2", naipes: ["Masculino"], campuses: ["Rio do Sul", "São Bento do Sul", "Ibirama", "Videira"] }
    ]
  },
  {
    name: "Revezamento 4 × 100 m",
    category: "Pista · revezamento",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    batteries: [
      { name: "Bateria 1", naipes: ["Masculino", "Feminino"], campuses: ["Camboriú", "Concórdia", "Rio do Sul", "Blumenau"] },
      { name: "Bateria 2", naipes: ["Masculino", "Feminino"], campuses: ["Araquari", "São Bento do Sul", "Ibirama", "Videira"] }
    ]
  },
  {
    name: "Revezamento 4 × 400 m",
    category: "Pista · revezamento",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    batteries: [
      { name: "Bateria 1", naipes: ["Masculino", "Feminino"], campuses: ["Camboriú", "Concórdia", "Blumenau", "Brusque"] },
      { name: "Bateria 2", naipes: ["Masculino", "Feminino"], campuses: ["Rio do Sul", "Araquari", "Ibirama", "Videira"] }
    ]
  },
  {
    name: "Arremesso de peso",
    category: "Campo · arremesso",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  },
  {
    name: "Lançamento de disco",
    category: "Campo · lançamento",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  },
  {
    name: "Lançamento de dardo",
    category: "Campo · lançamento",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  },
  {
    name: "Salto em altura",
    category: "Campo · salto",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  },
  {
    name: "Salto triplo",
    category: "Campo · salto",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  },
  {
    name: "Salto em distância",
    category: "Campo · salto",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  }
];

const modalities = [
  {
    name: "Atletismo",
    category: "individual",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    submodalities: athleticsEvents,
    athletes: 0,
    campus: 0,
    next: "A definir"
  },
  {
    name: "Basquetebol",
    category: "coletiva",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    tournamentFormat: "groups-knockout",
    athletes: 0,
    campus: 0,
    next: "A definir"
  },
  {
    name: "Futsal",
    category: "coletiva",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    athletes: 0,
    campus: 0,
    next: "A definir"
  },
  {
    name: "Handebol",
    category: "coletiva",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    athletes: 0,
    campus: 0,
    next: "A definir"
  },
  {
    name: "Vôlei de praia",
    category: "coletiva",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    athletes: 0,
    campus: 0,
    next: "A definir"
  },
  {
    name: "Voleibol",
    category: "coletiva",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    athletes: 0,
    campus: 0,
    next: "A definir"
  },
  {
    name: "Tênis de mesa",
    category: "individual",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    submodalities: [
      {
        name: "Individual",
        naipes: ["Masculino", "Feminino"],
        status: "ativa"
      },
      {
        name: "Duplas",
        naipes: ["Masculino", "Feminino"],
        status: "ativa"
      }
    ],
    athletes: 0,
    campus: 0,
    next: "A definir"
  },
  {
    name: "Xadrez",
    category: "individual",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    athletes: 0,
    campus: 0,
    next: "A definir"
  }
];

const campuses = [
  { name: "Abelardo Luz", code: "AL", medals: 0, athletes: 48, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Araquari", code: "AR", medals: 0, athletes: 50, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Blumenau", code: "BL", medals: 0, athletes: 52, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Brusque", code: "BR", medals: 0, athletes: 60, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Camboriú", code: "CA", medals: 0, athletes: 55, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Concórdia", code: "CO", medals: 0, athletes: 49, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Fraiburgo", code: "FR", medals: 0, athletes: 58, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Ibirama", code: "IB", medals: 0, athletes: 51, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Luzerna", code: "LU", medals: 0, athletes: 53, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Rio do Sul", code: "RS", medals: 0, athletes: 57, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Santa Rosa do Sul", code: "SR", medals: 0, athletes: 48, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "São Bento do Sul", code: "SB", medals: 0, athletes: 54, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "São Francisco do Sul", code: "SF", medals: 0, athletes: 59, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Sombrio", code: "SO", medals: 0, athletes: 50, minimumAthletes: 0, maximumAthletes: 60 },
  { name: "Videira", code: "VI", medals: 0, athletes: 56, minimumAthletes: 0, maximumAthletes: 60 }
];

const medals = [
  { name: "Campus Concórdia", code: "CO", gold: 4, silver: 3, bronze: 2 },
  { name: "Campus Camboriú", code: "CA", gold: 3, silver: 2, bronze: 3 },
  { name: "Campus Rio do Sul", code: "RS", gold: 2, silver: 3, bronze: 1 },
  { name: "Campus Blumenau", code: "BL", gold: 2, silver: 1, bronze: 2 },
  { name: "Campus Araquari", code: "AR", gold: 1, silver: 2, bronze: 1 }
];

const podiums = [
  {
    title: "Basquetebol · Masculino",
    modality: "Basquetebol",
    first: "Campus Concórdia",
    second: "Campus Camboriú",
    third: "Campus Blumenau"
  },
  {
    title: "Futsal · Feminino",
    modality: "Futsal",
    first: "Campus Rio do Sul",
    second: "Campus Araquari",
    third: "Campus Ibirama"
  },
  {
    title: "Voleibol · Masculino",
    modality: "Voleibol",
    first: "Campus Blumenau",
    second: "Campus Concórdia",
    third: "Campus Camboriú"
  }
];

const fixtures = [
  { date: "2026-06-25", modality: "Atletismo", naipe: "Masculino", title: "100 m rasos · eliminatórias", meta: "Pista central", tag: "08:00", campuses: ["Camboriú", "Concórdia"] },
  { date: "2026-06-26", modality: "Atletismo", naipe: "Feminino", title: "200 m rasos · eliminatórias", meta: "Pista central", tag: "10:00", campuses: ["Blumenau", "Araquari"] },
  { date: "2026-06-25", modality: "Basquetebol", naipe: "Masculino", phase: "Fase de grupos · Grupo A", title: "Camboriú × Concórdia", meta: "Ginásio 1", tag: "09:00", campuses: ["Camboriú", "Concórdia"] },
  { date: "2026-06-27", modality: "Basquetebol", naipe: "Feminino", phase: "Quartas de final", title: "Rio do Sul × Blumenau", meta: "Ginásio 1", tag: "15:00", campuses: ["Rio do Sul", "Blumenau"] },
  { date: "2026-06-25", modality: "Futsal", naipe: "Masculino", phase: "Fase de grupos", title: "Araquari × São Bento do Sul", meta: "Ginásio 2", tag: "10:00", campuses: ["Araquari", "São Bento do Sul"] },
  { date: "2026-06-26", modality: "Futsal", naipe: "Feminino", phase: "Fase de grupos", title: "Concórdia × Rio do Sul", meta: "Ginásio 2", tag: "13:00", campuses: ["Concórdia", "Rio do Sul"] },
  { date: "2026-06-25", modality: "Handebol", naipe: "Masculino", phase: "Fase de grupos", title: "Camboriú × Blumenau", meta: "Quadra de handebol", tag: "11:00", campuses: ["Camboriú", "Blumenau"] },
  { date: "2026-06-27", modality: "Handebol", naipe: "Feminino", phase: "Semifinal", title: "Araquari × Videira", meta: "Quadra de handebol", tag: "14:00", campuses: ["Araquari", "Videira"] },
  { date: "2026-06-25", modality: "Vôlei de praia", naipe: "Masculino", phase: "Fase de grupos", title: "Brusque × Sombrio", meta: "Arena de areia", tag: "12:00", campuses: ["Brusque", "Sombrio"] },
  { date: "2026-06-26", modality: "Vôlei de praia", naipe: "Feminino", phase: "Semifinal", title: "Ibirama × Luzerna", meta: "Arena de areia", tag: "15:00", campuses: ["Ibirama", "Luzerna"] },
  { date: "2026-06-25", modality: "Voleibol", naipe: "Masculino", phase: "Fase de grupos", title: "Rio do Sul × São Bento do Sul", meta: "Ginásio 3", tag: "13:00", campuses: ["Rio do Sul", "São Bento do Sul"] },
  { date: "2026-06-27", modality: "Voleibol", naipe: "Feminino", phase: "Final", title: "Blumenau × Concórdia", meta: "Ginásio 3", tag: "16:00", campuses: ["Blumenau", "Concórdia"] },
  { date: "2026-06-25", modality: "Tênis de mesa", naipe: "Masculino", phase: "Individual · fase classificatória", title: "Mesa 1 · rodada classificatória", meta: "Ginásio de raquetes", tag: "14:00", campuses: ["Fraiburgo", "Videira"] },
  { date: "2026-06-26", modality: "Tênis de mesa", naipe: "Feminino", phase: "Duplas · semifinal", title: "Mesa 2 · semifinal de duplas", meta: "Ginásio de raquetes", tag: "09:00", campuses: ["Santa Rosa do Sul", "São Francisco do Sul"] },
  { date: "2026-06-25", modality: "Xadrez", naipe: "Masculino", phase: "Suíço · rodada 1", title: "Camboriú × Concórdia", meta: "Sala de xadrez", tag: "14:30", campuses: ["Camboriú", "Concórdia"] },
  { date: "2026-06-26", modality: "Xadrez", naipe: "Feminino", phase: "Suíço · rodada 2", title: "Rio do Sul × Blumenau", meta: "Sala de xadrez", tag: "14:30", campuses: ["Rio do Sul", "Blumenau"] }
];

const tournamentGroups = {
  Masculino: [
    { name: "Grupo A", teams: ["Camboriú", "Videira", "Sombrio", "Luzerna"] },
    { name: "Grupo B", teams: ["Concórdia", "Brusque", "São Francisco do Sul"] },
    { name: "Grupo C", teams: ["Rio do Sul", "Araquari", "Fraiburgo", "Santa Rosa do Sul"] },
    { name: "Grupo D", teams: ["Blumenau", "São Bento do Sul", "Ibirama", "Abelardo Luz"] }
  ],
  Feminino: [
    { name: "Grupo A", teams: ["Camboriú", "Concórdia", "Ibirama", "Fraiburgo"] },
    { name: "Grupo B", teams: ["Blumenau", "Brusque", "Videira", "São Bento do Sul"] },
    { name: "Grupo C", teams: ["Rio do Sul", "Luzerna", "Abelardo Luz", "São Francisco do Sul"] },
    { name: "Grupo D", teams: ["Araquari", "Sombrio", "Santa Rosa do Sul"] }
  ]
};

const chessRounds = [
  {
    naipe: "Masculino",
    round: 1,
    matches: [
      { white: "Camboriú", black: "Concórdia", result: "1–0" },
      { white: "Rio do Sul", black: "Blumenau", result: "½–½" }
    ]
  },
  {
    naipe: "Masculino",
    round: 2,
    matches: [
      { white: "Camboriú", black: "Rio do Sul", result: "½–½" },
      { white: "Concórdia", black: "Blumenau", result: "1–0" }
    ]
  },
  {
    naipe: "Feminino",
    round: 1,
    matches: [
      { white: "Blumenau", black: "Araquari", result: "1–0" },
      { white: "Ibirama", black: "Videira", result: "½–½" }
    ]
  },
  {
    naipe: "Feminino",
    round: 2,
    matches: [
      { white: "Blumenau", black: "Ibirama", result: "½–½" },
      { white: "Araquari", black: "Videira", result: "1–0" }
    ]
  }
];

const accessRequests = [];

const pageNames = {
  inicio: "Visão geral",
  calendario: "Calendário",
  atletismo: "Atletismo",
  podios: "Pódios",
  atletas: "Atletas",
  campus: "Campus",
  modalidades: "Modalidades",
  "detalhes-modalidade": "Detalhes da modalidade"
};

const pageContent = document.getElementById("page-content");

let selectedModality = null;
let selectedNaipe = "Masculino";
let activeRole = null;
let activeServerRequestId = null;
let lastAccessRequestId = null;
let editorSection = "athletes";
let selectedAdminAthleteIndex = athletes.length ? 0 : -1;
let selectedFixtureIndex = fixtures.length ? 0 : -1;
let selectedEventIndex = 0;
let selectedModalityIndex = 0;
let selectedMedalIndex = medals.length ? 0 : -1;
let selectedCampusIndex = campuses.length ? 0 : -1;
let selectedPodiumIndex = podiums.length ? 0 : -1;

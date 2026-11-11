// Conteúdo demonstrativo e estado compartilhado pela interface.
const athletes = [];

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

const medals = [];
const podiums = [];

const athleticsEvents = [
  {
    name: "100 m rasos",
    category: "Pista · velocidade",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  },
  {
    name: "200 m rasos",
    category: "Pista · velocidade",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  },
  {
    name: "400 m rasos",
    category: "Pista · velocidade",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  },
  {
    name: "800 m rasos",
    category: "Pista · meio-fundo",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  },
  {
    name: "1.500 m rasos",
    category: "Pista · meio-fundo",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  },
  {
    name: "3.000 m rasos",
    category: "Pista · fundo",
    naipes: ["Feminino"],
    status: "ativa"
  },
  {
    name: "5.000 m rasos",
    category: "Pista · fundo",
    naipes: ["Masculino"],
    status: "ativa"
  },
  {
    name: "Revezamento 4 × 100 m",
    category: "Pista · revezamento",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
  },
  {
    name: "Revezamento 4 × 400 m",
    category: "Pista · revezamento",
    naipes: ["Masculino", "Feminino"],
    status: "ativa"
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
  { name: "Abelardo Luz", code: "CAAL", medals: 0, athletes: 0 },
  { name: "Araquari", code: "CAA", medals: 0, athletes: 0 },
  { name: "Blumenau", code: "CBLU", medals: 0, athletes: 0 },
  { name: "Brusque", code: "CBRU", medals: 0, athletes: 0 },
  { name: "Camboriú", code: "CCAM", medals: 0, athletes: 0 },
  { name: "Concórdia", code: "CCO", medals: 0, athletes: 0 },
  { name: "Fraiburgo", code: "CFRA", medals: 0, athletes: 0 },
  { name: "Ibirama", code: "CIBI", medals: 0, athletes: 0 },
  { name: "Luzerna", code: "CLUZ", medals: 0, athletes: 0 },
  { name: "Rio do Sul", code: "CRS", medals: 0, athletes: 0 },
  { name: "Santa Rosa do Sul", code: "CSRS", medals: 0, athletes: 0 },
  { name: "São Bento do Sul", code: "CSBS", medals: 0, athletes: 0 },
  { name: "São Francisco do Sul", code: "CSFS", medals: 0, athletes: 0 },
  { name: "Sombrio", code: "CSOM", medals: 0, athletes: 0 },
  { name: "Videira", code: "CVID", medals: 0, athletes: 0 }
];

const fixtures = [];
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

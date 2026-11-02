// Conteúdo demonstrativo e estado compartilhado pela interface.
const athletes = [
  {
    id: 1,
    name: "Ana Clara Souza",
    campus: "Campus Camboriú",
    modality: "Voleibol",
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
    position: "Goleiro",
    age: 18,
    height: "1,87 m",
    stats: { goals: 1, assists: 3 },
    medal: "Prata",
    photo: MEDIA.images.athletes.rafael,
    marks: "12 defesas · 1 gol"
  },
  {
    id: 7,
    name: "Camila Rocha",
    campus: "Campus Brusque",
    modality: "Handebol",
    position: "Ponta esquerda",
    age: 17,
    height: "1,66 m",
    stats: { goals: 8, assists: 4 },
    medal: "Sem medalha",
    photo: MEDIA.images.athletes.beatriz,
    marks: "Destaque nas partidas do campus"
  },
  {
    id: 8,
    name: "João Pedro Alves",
    campus: "Campus Videira",
    modality: "Tênis de mesa",
    position: "Individual",
    age: 16,
    height: "1,70 m",
    stats: { wins: 3 },
    medal: "Sem medalha",
    photo: MEDIA.images.athletes.pedro,
    marks: "Participação na categoria individual"
  },
  {
    id: 9,
    name: "Isabela Mendes",
    campus: "Campus Ibirama",
    modality: "Xadrez",
    position: "Individual",
    age: 17,
    height: "1,64 m",
    stats: { wins: 2 },
    medal: "Sem medalha",
    photo: MEDIA.images.athletes.mariana,
    marks: "Participação na categoria individual"
  },
  {
    id: 10,
    name: "Matheus Ribeiro",
    campus: "Campus Luzerna",
    modality: "Basquetebol",
    position: "Ala",
    age: 18,
    height: "1,79 m",
    stats: { points: 12, assists: 5 },
    medal: "Sem medalha",
    photo: MEDIA.images.athletes.lucas,
    marks: "12 pontos · 5 assistências"
  },
  {
    id: 11,
    name: "Luana Martins",
    campus: "Campus Fraiburgo",
    modality: "Voleibol",
    position: "Central",
    age: 16,
    height: "1,75 m",
    stats: { points: 16 },
    medal: "Sem medalha",
    photo: MEDIA.images.athletes.anaClara,
    marks: "Destaque em bloqueios e ataques"
  },
  {
    id: 12,
    name: "Gabriel Nunes",
    campus: "Campus Sombrio",
    modality: "Atletismo",
    position: "Fundista",
    age: 17,
    height: "1,73 m",
    stats: {},
    medal: "Sem medalha",
    photo: MEDIA.images.athletes.rafael,
    marks: "Participação nas provas de fundo"
  },
  {
    id: 13,
    name: "Marina Duarte",
    campus: "Campus Abelardo Luz",
    modality: "Futsal",
    position: "Fixo",
    age: 18,
    height: "1,69 m",
    stats: { goals: 3, assists: 5 },
    medal: "Sem medalha",
    photo: MEDIA.images.athletes.beatriz,
    marks: "3 gols · 5 assistências"
  },
  {
    id: 14,
    name: "Enzo Carvalho",
    campus: "Campus Santa Rosa do Sul",
    modality: "Handebol",
    position: "Goleiro",
    age: 17,
    height: "1,82 m",
    stats: { goals: 1, assists: 2 },
    medal: "Sem medalha",
    photo: MEDIA.images.athletes.lucas,
    marks: "Participação na equipe de handebol"
  },
  {
    id: 15,
    name: "Sofia Teixeira",
    campus: "Campus São Francisco do Sul",
    modality: "Tênis de mesa",
    position: "Duplas",
    age: 16,
    height: "1,62 m",
    stats: { wins: 2 },
    medal: "Sem medalha",
    photo: MEDIA.images.athletes.mariana,
    marks: "Participação na categoria de duplas"
  }
];

const modalityRules = {
  Atletismo: {
    positions: [
      "Velocista",
      "Meio-fundista",
      "Fundista",
      "Saltador(a)",
      "Lançador(a)"
    ],
    statistics: []
  },
  Basquetebol: {
    positions: [
      "Armador",
      "Ala-armador",
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
      "Goleiro"
    ],
    statistics: [
      { key: "goals", label: "Gols" },
      { key: "assists", label: "Assistências" }
    ]
  },
  Handebol: {
    positions: [
      "Goleiro",
      "Ponta esquerda",
      "Ponta direita",
      "Armador central",
      "Armador esquerdo",
      "Armador direito",
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
      "Ponteiro",
      "Oposto",
      "Central",
      "Líbero"
    ],
    statistics: [{ key: "points", label: "Pontos" }]
  },
  "Vôlei de praia": {
    positions: ["Bloqueador", "Defensor"],
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

const medals = [
  { name: "Campus Camboriú", code: "CA", gold: 12, silver: 8, bronze: 5 },
  { name: "Campus Concórdia", code: "CO", gold: 10, silver: 9, bronze: 7 },
  { name: "Campus Rio do Sul", code: "RS", gold: 8, silver: 10, bronze: 6 },
  { name: "Campus Blumenau", code: "BL", gold: 7, silver: 5, bronze: 9 },
  { name: "Campus Araquari", code: "AR", gold: 6, silver: 7, bronze: 5 },
  { name: "Campus São Bento do Sul", code: "SB", gold: 0, silver: 0, bronze: 0 },
  { name: "Campus Brusque", code: "BR", gold: 0, silver: 0, bronze: 0 },
  { name: "Campus Videira", code: "VI", gold: 0, silver: 0, bronze: 0 },
  { name: "Campus Ibirama", code: "IB", gold: 0, silver: 0, bronze: 0 },
  { name: "Campus Luzerna", code: "LU", gold: 0, silver: 0, bronze: 0 },
  { name: "Campus Fraiburgo", code: "FR", gold: 0, silver: 0, bronze: 0 },
  { name: "Campus Sombrio", code: "SO", gold: 0, silver: 0, bronze: 0 },
  { name: "Campus Abelardo Luz", code: "AL", gold: 0, silver: 0, bronze: 0 },
  { name: "Campus Santa Rosa do Sul", code: "SR", gold: 0, silver: 0, bronze: 0 },
  {
    name: "Campus São Francisco do Sul",
    code: "SF",
    gold: 0,
    silver: 0,
    bronze: 0
  }
];

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
    icon: MEDIA.icons.athletics,
    desc: "Velocidade, resistência e superação em cada passo.",
    athletes: 124,
    campus: 12,
    next: "Hoje · 14:00"
  },
  {
    name: "Basquetebol",
    category: "coletiva",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    icon: MEDIA.icons.basketball,
    desc: "Jogo coletivo, estratégia e muita energia em quadra.",
    athletes: 96,
    campus: 10,
    next: "Hoje · 16:30"
  },
  {
    name: "Futsal",
    category: "coletiva",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    icon: MEDIA.icons.futsal,
    desc: "Habilidade, velocidade e paixão por cada gol.",
    athletes: 184,
    campus: 12,
    next: "Hoje · 13:45"
  },
  {
    name: "Handebol",
    category: "coletiva",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    icon: MEDIA.icons.handball,
    desc: "Potência e precisão no esporte de equipe.",
    athletes: 88,
    campus: 9,
    next: "Amanhã · 09:00"
  },
  {
    name: "Vôlei de praia",
    category: "coletiva",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    icon: MEDIA.icons.volleyball,
    desc: "Agilidade, estratégia e trabalho em equipe na areia.",
    athletes: 0,
    campus: 0,
    next: "Hoje · 15:00"
  },
  {
    name: "Voleibol",
    category: "coletiva",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    icon: MEDIA.icons.volleyball,
    desc: "Trabalho em equipe que transforma cada ponto.",
    athletes: 112,
    campus: 11,
    next: "Hoje · 15:00"
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
    icon: MEDIA.icons.tableTennis,
    desc: "Reflexo e estratégia em partidas eletrizantes.",
    athletes: 48,
    campus: 8,
    next: "Amanhã · 13:00"
  },
  {
    name: "Xadrez",
    category: "individual",
    naipes: ["Masculino", "Feminino"],
    status: "ativa",
    icon: MEDIA.icons.chess,
    desc: "Pensamento estratégico em cada movimento.",
    athletes: 36,
    campus: 7,
    next: "Hoje · 14:30"
  }
];

const campuses = [
  {
    name: "Camboriú",
    code: "CA",
    desc: "Entre a natureza e a inovação, nosso campus joga junto e acolhe talentos.",
    students: "3.240",
    medals: 25,
    image: MEDIA.images.campuses.camboriu
  },
  {
    name: "Concórdia",
    code: "CO",
    desc: "Tradição, dedicação e espírito de equipe que fazem história nos jogos.",
    students: "2.890",
    medals: 26,
    image: MEDIA.images.campuses.concordia
  },
  {
    name: "Rio do Sul",
    code: "RS",
    desc: "Formando atletas e cidadãos com orgulho e paixão pelo esporte.",
    students: "2.610",
    medals: 24,
    image: MEDIA.images.campuses.rioDoSul
  },
  {
    name: "Blumenau",
    code: "BL",
    desc: "Energia, diversidade e muita garra dentro e fora das quadras.",
    students: "2.370",
    medals: 21,
    image: MEDIA.images.campuses.blumenau
  },
  {
    name: "Araquari",
    code: "AR",
    desc: "Uma comunidade que cresce, compete e celebra cada conquista.",
    students: "1.840",
    medals: 18,
    image: MEDIA.images.campuses.araquari
  },
  {
    name: "São Bento do Sul",
    code: "SB",
    desc: "Trabalho em equipe e tradição esportiva na Serra Catarinense.",
    students: "1.730",
    medals: 14,
    image: MEDIA.images.campuses.saoBentoDoSul
  },
  {
    name: "Brusque",
    code: "BR",
    desc: "Campus participante do JIFC.",
    students: "—",
    medals: 0,
    image: MEDIA.images.campuses.blumenau
  },
  {
    name: "Videira",
    code: "VI",
    desc: "Campus participante do JIFC.",
    students: "—",
    medals: 0,
    image: MEDIA.images.campuses.concordia
  },
  {
    name: "Ibirama",
    code: "IB",
    desc: "Campus participante do JIFC.",
    students: "—",
    medals: 0,
    image: MEDIA.images.campuses.rioDoSul
  },
  {
    name: "Luzerna",
    code: "LU",
    desc: "Campus participante do JIFC.",
    students: "—",
    medals: 0,
    image: MEDIA.images.campuses.araquari
  },
  {
    name: "Fraiburgo",
    code: "FR",
    desc: "Campus participante do JIFC.",
    students: "—",
    medals: 0,
    image: MEDIA.images.campuses.saoBentoDoSul
  },
  {
    name: "Sombrio",
    code: "SO",
    desc: "Campus participante do JIFC.",
    students: "—",
    medals: 0,
    image: MEDIA.images.campuses.blumenau
  },
  {
    name: "Abelardo Luz",
    code: "AL",
    desc: "Campus participante do JIFC.",
    students: "—",
    medals: 0,
    image: MEDIA.images.campuses.camboriu
  },
  {
    name: "Santa Rosa do Sul",
    code: "SR",
    desc: "Campus participante do JIFC.",
    students: "—",
    medals: 0,
    image: MEDIA.images.campuses.concordia
  },
  {
    name: "São Francisco do Sul",
    code: "SF",
    desc: "Campus participante do JIFC.",
    students: "—",
    medals: 0,
    image: MEDIA.images.campuses.rioDoSul
  }
];

const scheduleDays = [
  { day: 25, month: "JUN", label: "Quarta-feira, 25 de junho" },
  { day: 26, month: "JUN", label: "Quinta-feira, 26 de junho" },
  { day: 27, month: "JUN", label: "Sexta-feira, 27 de junho" }
];
const scheduleDateRangeLabel =
  `${scheduleDays[0].day} — ` +
  `${scheduleDays[scheduleDays.length - 1].day} DE JUNHO`;

const scheduleEventsByModality = {
  Atletismo: {
    location: "Pista central",
    titles: [
      "100 m rasos · eliminatórias",
      "Salto em distância · qualificatória",
      "200 m rasos · eliminatórias",
      "Arremesso de peso · qualificatória",
      "Revezamento 4 × 100 m · eliminatórias",
      "1.500 m · final"
    ]
  },
  Basquetebol: {
    location: "Ginásio 1",
    titles: [
      "Camboriú × Concórdia",
      "Blumenau × Araquari",
      "Rio do Sul × São Bento do Sul",
      "Concórdia × Blumenau",
      "Araquari × Rio do Sul",
      "São Bento do Sul × Camboriú"
    ]
  },
  Futsal: {
    location: "Ginásio 2",
    titles: [
      "Camboriú × Concórdia",
      "Rio do Sul × Blumenau",
      "Araquari × São Bento do Sul",
      "Concórdia × Rio do Sul",
      "Blumenau × Araquari",
      "São Bento do Sul × Camboriú"
    ]
  },
  Handebol: {
    location: "Quadra de handebol",
    titles: [
      "Camboriú × Blumenau",
      "Concórdia × Araquari",
      "Rio do Sul × São Bento do Sul",
      "Blumenau × Concórdia",
      "Araquari × Rio do Sul",
      "São Bento do Sul × Camboriú"
    ]
  },
  Voleibol: {
    location: "Ginásio de voleibol",
    titles: [
      "Camboriú × Rio do Sul",
      "Concórdia × Blumenau",
      "Araquari × São Bento do Sul",
      "Rio do Sul × Concórdia",
      "Blumenau × Araquari",
      "São Bento do Sul × Camboriú"
    ]
  },
  "Vôlei de praia": {
    location: "Quadra de areia",
    titles: [
      "Camboriú × Rio do Sul",
      "Concórdia × Blumenau",
      "Araquari × São Bento do Sul",
      "Rio do Sul × Concórdia",
      "Blumenau × Araquari",
      "São Bento do Sul × Camboriú"
    ]
  },
  "Tênis de mesa": {
    location: "Salão de jogos · Mesa 1",
    titles: [
      "Camboriú × Concórdia",
      "Blumenau × Araquari",
      "Rio do Sul × São Bento do Sul",
      "Concórdia × Blumenau",
      "Araquari × Rio do Sul",
      "São Bento do Sul × Camboriú"
    ]
  },
  Xadrez: {
    location: "Salão de jogos · Mesa 2",
    titles: [
      "Camboriú × Concórdia",
      "Blumenau × Araquari",
      "Rio do Sul × São Bento do Sul",
      "Concórdia × Blumenau",
      "Araquari × Rio do Sul",
      "São Bento do Sul × Camboriú"
    ]
  }
};

function createDefaultFixtures() {
  const startTimes = ["08:00", "10:00"];

  return scheduleDays.flatMap((scheduleDay, dayIndex) =>
    modalities.flatMap(modality => {
      const eventSchedule = scheduleEventsByModality[modality.name];

      return eventSchedule.titles
        .slice(dayIndex * 2, dayIndex * 2 + 2)
        .map((title, gameIndex) => ({
          day: String(scheduleDay.day),
          month: scheduleDay.month,
          dayLabel: scheduleDay.label,
          modality: modality.name,
          title,
          meta: `${modality.name} · ${eventSchedule.location}`,
          tag: startTimes[gameIndex]
        }));
    })
  );
}

const fixtures = createDefaultFixtures();

const tournamentGroups = [
  {
    name: "Grupo A",
    teams: ["Camboriú", "Araquari", "Videira", "Brusque"]
  },
  {
    name: "Grupo B",
    teams: ["Concórdia", "Ibirama", "Luzerna", "Fraiburgo"]
  },
  {
    name: "Grupo C",
    teams: ["Blumenau", "Sombrio", "Abelardo Luz", "Santa Rosa do Sul"]
  },
  {
    name: "Grupo D",
    teams: ["Rio do Sul", "São Bento do Sul", "São Francisco do Sul"]
  }
];

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
let activeRole = null;
let editorSection = "athletes";
let selectedAthleteId = athletes[0].id;
let selectedAdminAthleteIndex = 0;
let selectedFixtureIndex = 0;
let selectedEventIndex = 0;
let selectedModalityIndex = 0;
let selectedMedalIndex = 0;
let selectedCampusIndex = 0;

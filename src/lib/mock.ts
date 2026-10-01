import type {
  Offer,
  WalletPosition,
  Transaction,
  Notification,
  EarningsReport,
  MediaItem,
  Review,
} from "./types";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
const thumb = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=240&q=70`;

const sampleVideo =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const buildMedia = (imgIds: string[], videoTitle: string): MediaItem[] => [
  {
    id: "vid",
    type: "video",
    url: sampleVideo,
    thumb: thumb(imgIds[0]),
    title: videoTitle,
  },
  ...imgIds.map((id, i) => ({
    id: `img-${i}`,
    type: "image" as const,
    url: img(id),
    thumb: thumb(id),
    title: `Foto ${i + 1}`,
  })),
];

const sampleReviews = (names: string[]): Review[] =>
  names.map((n, i) => ({
    id: `r${i}`,
    author: n,
    rating: 5 - (i % 2),
    date: ["2026-09-12", "2026-08-30", "2026-08-05"][i] ?? "2026-07-20",
    comment: [
      "Empresa sólida, acompanhamento transparente e retorno dentro do esperado. Recomendo!",
      "Processo de investimento super simples e a equipe da empresa responde rápido às dúvidas.",
      "Diversifiquei minha carteira com essa oferta e estou satisfeito com os resultados até agora.",
    ][i] ?? "Ótima oportunidade.",
  }));

export const user = {
  name: "Marina Alves",
  email: "marina.alves@email.com",
  memberSince: "2023-04-12",
  type: "Investidor Qualificado",
  cpf: "123.456.789-00",
  avatarColor: "#296e8f",
  balance: 18450.72,
  invested: 142000,
  currentValue: 168930.4,
};

export const offers: Offer[] = [
  {
    id: "1",
    slug: "verdi-agtech",
    company: "Verdi AgTech",
    tagline: "Sensoriamento inteligente para o agro brasileiro",
    category: "AgTech",
    sector: "Tecnologia Agrícola",
    cover: "linear-gradient(135deg, #168a55 0%, #42b6ba 100%)",
    logoColor: "#168a55",
    status: "encerrando",
    risk: "Moderado",
    minTicket: 1000,
    targetAmount: 3500000,
    raisedAmount: 3010000,
    investors: 842,
    expectedReturn: 22.5,
    termMonths: 36,
    deadline: "2026-10-18",
    modality: "CRA",
    highlights: ["Receita +180% a/a", "Contratos com 3 cooperativas", "Break-even em 14 meses"],
    description:
      "A Verdi AgTech desenvolve sensores IoT e uma plataforma de dados que aumentam a produtividade de lavouras em até 30%. Com tração comercial comprovada e margem crescente, a rodada financia a expansão nacional da operação.",
    rating: 4.8,
    media: buildMedia(
      ["photo-1560493676-04071c5f467b", "photo-1625246333195-78d9c38ad449", "photo-1500937386664-56d1dfef3854", "photo-1574943320219-553eb213f72d"],
      "Conheça a Verdi AgTech em 90 segundos"
    ),
    reviews: sampleReviews(["Carlos M.", "Fernanda L.", "Rodrigo S."]),
  },
  {
    id: "2",
    slug: "nimbus-health",
    company: "Nimbus Health",
    tagline: "Telemedicina acessível para o interior do país",
    category: "HealthTech",
    sector: "Saúde Digital",
    cover: "linear-gradient(135deg, #296e8f 0%, #6ec1e4 100%)",
    logoColor: "#296e8f",
    status: "aberta",
    risk: "Alto",
    minTicket: 500,
    targetAmount: 2000000,
    raisedAmount: 720000,
    investors: 318,
    expectedReturn: 34,
    termMonths: 48,
    deadline: "2026-11-30",
    modality: "Equity",
    highlights: ["120 mil consultas realizadas", "Parceria com redes de farmácia", "NPS 82"],
    description:
      "A Nimbus Health conecta pacientes de regiões remotas a médicos por vídeo, com entrega de medicamentos. A rodada acelera a cobertura para mais 5 estados e o desenvolvimento do módulo de exames.",
    rating: 4.6,
    media: buildMedia(
      ["photo-1576091160399-112ba8d25d1d", "photo-1584982751601-97dcc096659c", "photo-1631217868264-e5b90bb7e133", "photo-1579684385127-1ef15d508118"],
      "Nimbus Health: saúde acessível para todos"
    ),
    reviews: sampleReviews(["Juliana P.", "Marcos T.", "Beatriz A."]),
  },
  {
    id: "3",
    slug: "solaris-energia",
    company: "Solaris Energia",
    tagline: "Geração solar compartilhada por assinatura",
    category: "CleanTech",
    sector: "Energia Renovável",
    cover: "linear-gradient(135deg, #f99c00 0%, #edb200 100%)",
    logoColor: "#f99c00",
    status: "aberta",
    risk: "Baixo",
    minTicket: 2000,
    targetAmount: 5000000,
    raisedAmount: 2650000,
    investors: 1204,
    expectedReturn: 16.8,
    termMonths: 60,
    deadline: "2026-12-20",
    modality: "CRI",
    highlights: ["Ativos lastreados em usinas", "Fluxo de caixa recorrente", "Contratos de 10 anos"],
    description:
      "A Solaris constrói usinas solares e vende energia por assinatura com desconto na conta de luz. O investimento é lastreado em ativos físicos e contratos de longo prazo, oferecendo previsibilidade de retorno.",
    rating: 4.9,
    media: buildMedia(
      ["photo-1509391366360-2e959784a276", "photo-1466611653911-95081537e5b7", "photo-1508514177221-188b1cf16e9d", "photo-1497435334941-8c899ee9e8e9"],
      "Solaris Energia: energia limpa que rende"
    ),
    reviews: sampleReviews(["André V.", "Camila R.", "Paulo H."]),
  },
  {
    id: "4",
    slug: "cargo-flow",
    company: "CargoFlow",
    tagline: "Logística fracionada para e-commerces",
    category: "LogTech",
    sector: "Logística",
    cover: "linear-gradient(135deg, #1e5570 0%, #42b6ba 100%)",
    logoColor: "#1e5570",
    status: "aberta",
    risk: "Moderado",
    minTicket: 1000,
    targetAmount: 1800000,
    raisedAmount: 990000,
    investors: 455,
    expectedReturn: 25.2,
    termMonths: 30,
    deadline: "2026-11-10",
    modality: "Debênture",
    highlights: ["+2.500 lojistas ativos", "Malha em 12 estados", "Margem bruta 41%"],
    description:
      "A CargoFlow otimiza entregas para pequenos e médios e-commerces com roteirização inteligente e frete compartilhado. A rodada financia novos hubs logísticos e tecnologia de rastreamento.",
    rating: 4.5,
    media: buildMedia(
      ["photo-1586528116311-ad8dd3c8310d", "photo-1553413077-190dd305871c", "photo-1601584115197-04ecc0da31d7", "photo-1591768793355-74d04bb6608f"],
      "CargoFlow: logística inteligente na prática"
    ),
    reviews: sampleReviews(["Renata G.", "Thiago B.", "Larissa M."]),
  },
  {
    id: "5",
    slug: "bloom-foods",
    company: "Bloom Foods",
    tagline: "Alimentos plant-based para food service",
    category: "FoodTech",
    sector: "Alimentos",
    cover: "linear-gradient(135deg, #168a55 0%, #edb200 100%)",
    logoColor: "#168a55",
    status: "em_breve",
    risk: "Alto",
    minTicket: 1500,
    targetAmount: 2500000,
    raisedAmount: 0,
    investors: 0,
    expectedReturn: 38,
    termMonths: 42,
    deadline: "2026-12-05",
    modality: "Equity",
    highlights: ["Produção própria", "Listado em 4 redes", "Pré-reserva aberta"],
    description:
      "A Bloom Foods produz substitutos de carne à base de plantas para restaurantes e redes. A oferta abre em breve; registre seu interesse para ter prioridade na alocação.",
    rating: 4.7,
    media: buildMedia(
      ["photo-1512621776951-a57141f2eefd", "photo-1540189549336-e6e99c3679fe", "photo-1476224203421-9ac39bcb3327", "photo-1490645935967-10de6ba17061"],
      "Bloom Foods: sabor plant-based"
    ),
    reviews: sampleReviews(["Gustavo N.", "Aline C.", "Diego F."]),
  },
  {
    id: "6",
    slug: "urban-mobility",
    company: "Urban Mobility",
    tagline: "Micromobilidade elétrica corporativa",
    category: "MobilityTech",
    sector: "Mobilidade",
    cover: "linear-gradient(135deg, #296e8f 0%, #163f55 100%)",
    logoColor: "#296e8f",
    status: "captada",
    risk: "Moderado",
    minTicket: 1000,
    targetAmount: 1500000,
    raisedAmount: 1500000,
    investors: 690,
    expectedReturn: 20,
    termMonths: 36,
    deadline: "2026-08-01",
    modality: "CR",
    highlights: ["Rodada 100% captada", "Frota em 8 empresas", "Expansão confirmada"],
    description:
      "A Urban Mobility oferece frotas de patinetes e bikes elétricas para condomínios empresariais. Rodada totalmente captada — acompanhe os resultados e futuras oportunidades.",
    rating: 4.4,
    media: buildMedia(
      ["photo-1558981403-c5f9899a28bc", "photo-1571068316344-75bc76f77890", "photo-1519003722824-194d4455a60c", "photo-1556122071-e404eaedb77f"],
      "Urban Mobility: mobilidade elétrica corporativa"
    ),
    reviews: sampleReviews(["Sofia L.", "Bruno K.", "Marina Q."]),
  },
];

export const walletPositions: WalletPosition[] = [
  {
    id: "w1",
    offerId: "3",
    company: "Solaris Energia",
    category: "CleanTech",
    logoColor: "#f99c00",
    invested: 40000,
    currentValue: 46720,
    returnPct: 16.8,
    date: "2024-02-10",
    status: "ativo",
    modality: "CRI",
  },
  {
    id: "w2",
    offerId: "1",
    company: "Verdi AgTech",
    category: "AgTech",
    logoColor: "#168a55",
    invested: 35000,
    currentValue: 42875,
    returnPct: 22.5,
    date: "2023-11-22",
    status: "ativo",
    modality: "CRA",
  },
  {
    id: "w3",
    offerId: "4",
    company: "CargoFlow",
    category: "LogTech",
    logoColor: "#1e5570",
    invested: 25000,
    currentValue: 31300,
    returnPct: 25.2,
    date: "2024-05-03",
    status: "ativo",
    modality: "Debênture",
  },
  {
    id: "w4",
    offerId: "6",
    company: "Urban Mobility",
    category: "MobilityTech",
    logoColor: "#296e8f",
    invested: 30000,
    currentValue: 36000,
    returnPct: 20,
    date: "2023-07-15",
    status: "liquidado",
    modality: "CR",
  },
  {
    id: "w5",
    offerId: "2",
    company: "Nimbus Health",
    category: "HealthTech",
    logoColor: "#296e8f",
    invested: 12000,
    currentValue: 12000,
    returnPct: 0,
    date: "2026-09-28",
    status: "aguardando_pagamento",
    modality: "Equity",
  },
];

export const transactions: Transaction[] = [
  { id: "t1", type: "aporte", company: "Nimbus Health", amount: 12000, date: "2026-09-28", status: "pendente", method: "Pix" },
  { id: "t2", type: "rendimento", company: "Solaris Energia", amount: 1120, date: "2026-09-15", status: "concluido" },
  { id: "t3", type: "rendimento", company: "Verdi AgTech", amount: 980, date: "2026-09-10", status: "concluido" },
  { id: "t4", type: "aporte", company: "CargoFlow", amount: 25000, date: "2024-05-03", status: "concluido", method: "TED" },
  { id: "t5", type: "resgate", company: "Urban Mobility", amount: 36000, date: "2026-08-01", status: "concluido", method: "Pix" },
  { id: "t6", type: "taxa", company: "Taxa de custódia", amount: 45, date: "2026-09-01", status: "concluido" },
];

export const notifications: Notification[] = [
  { id: "n1", kind: "investimento", title: "Pagamento pendente", message: "Seu aporte em Nimbus Health aguarda pagamento via Pix. Conclua em até 24h.", date: "2026-09-28T10:20:00", read: false },
  { id: "n2", kind: "rendimento", title: "Rendimento creditado", message: "R$ 1.120,00 de rendimento da Solaris Energia foram creditados na sua carteira.", date: "2026-09-15T08:00:00", read: false },
  { id: "n3", kind: "oferta", title: "Nova oferta disponível", message: "Bloom Foods abrirá captação em breve. Garanta prioridade na alocação.", date: "2026-09-12T14:30:00", read: false },
  { id: "n4", kind: "oferta", title: "Oferta encerrando", message: "Verdi AgTech está a 86% da meta e encerra em breve.", date: "2026-09-08T09:15:00", read: true },
  { id: "n5", kind: "cadastro", title: "Cadastro aprovado", message: "Seu perfil de Investidor Qualificado foi validado com sucesso.", date: "2026-09-01T11:00:00", read: true },
];

export const earningsReports: EarningsReport[] = [
  {
    year: 2025,
    totalInvested: 142000,
    totalEarnings: 26930.4,
    irWithheld: 3970.2,
    positions: [
      { company: "Solaris Energia", cnpj: "34.221.908/0001-55", invested: 40000, earnings: 6720, ir: 1008 },
      { company: "Verdi AgTech", cnpj: "22.109.334/0001-10", invested: 35000, earnings: 7875, ir: 1181.25 },
      { company: "CargoFlow", cnpj: "18.774.221/0001-98", invested: 25000, earnings: 6300, ir: 945 },
      { company: "Urban Mobility", cnpj: "41.882.019/0001-33", invested: 30000, earnings: 6000, ir: 835.95 },
    ],
  },
  {
    year: 2024,
    totalInvested: 105000,
    totalEarnings: 14210,
    irWithheld: 2131.5,
    positions: [
      { company: "Solaris Energia", cnpj: "34.221.908/0001-55", invested: 40000, earnings: 5600, ir: 840 },
      { company: "Verdi AgTech", cnpj: "22.109.334/0001-10", invested: 35000, earnings: 4610, ir: 691.5 },
      { company: "Urban Mobility", cnpj: "41.882.019/0001-33", invested: 30000, earnings: 4000, ir: 600 },
    ],
  },
];

export const portfolioHistory = [
  { month: "Jan", value: 118000 },
  { month: "Fev", value: 124500 },
  { month: "Mar", value: 129800 },
  { month: "Abr", value: 133200 },
  { month: "Mai", value: 141000 },
  { month: "Jun", value: 148600 },
  { month: "Jul", value: 152900 },
  { month: "Ago", value: 159400 },
  { month: "Set", value: 168930 },
];

export const allocationData = [
  { name: "CleanTech", value: 46720, color: "#f99c00" },
  { name: "AgTech", value: 42875, color: "#168a55" },
  { name: "LogTech", value: 31300, color: "#1e5570" },
  { name: "MobilityTech", value: 36000, color: "#296e8f" },
  { name: "HealthTech", value: 12000, color: "#6ec1e4" },
];

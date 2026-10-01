export type OfferStatus = "aberta" | "encerrando" | "captada" | "em_breve";
export type RiskLevel = "Baixo" | "Moderado" | "Alto";

export type MediaType = "image" | "video";

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumb?: string;
  title?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Offer {
  id: string;
  slug: string;
  company: string;
  tagline: string;
  category: string;
  sector: string;
  cover: string;
  logoColor: string;
  status: OfferStatus;
  risk: RiskLevel;
  minTicket: number;
  targetAmount: number;
  raisedAmount: number;
  investors: number;
  expectedReturn: number;
  termMonths: number;
  deadline: string;
  modality: string;
  highlights: string[];
  description: string;
  media: MediaItem[];
  rating?: number;
  reviews?: Review[];
}

export interface WalletPosition {
  id: string;
  offerId: string;
  company: string;
  category: string;
  logoColor: string;
  invested: number;
  currentValue: number;
  returnPct: number;
  date: string;
  status: "ativo" | "liquidado" | "aguardando_pagamento";
  modality: string;
}

export interface Transaction {
  id: string;
  type: "aporte" | "rendimento" | "resgate" | "taxa";
  company: string;
  amount: number;
  date: string;
  status: "concluido" | "pendente" | "processando";
  method?: string;
}

export interface Notification {
  id: string;
  kind: "investimento" | "oferta" | "cadastro" | "rendimento";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface EarningsReport {
  year: number;
  totalInvested: number;
  totalEarnings: number;
  irWithheld: number;
  positions: {
    company: string;
    cnpj: string;
    invested: number;
    earnings: number;
    ir: number;
  }[];
}

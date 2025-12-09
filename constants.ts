import { KpiData, RankItem, Convenio, ChartData } from './types';

export const KPIS: KpiData[] = [
  { label: "Total Contas", value: 457, sub: "Universo de contas revisadas", icon: "FileText" },
  { label: "% Com Erro", value: "93%", sub: "425 contas com apontamentos", icon: "AlertTriangle" },
  { label: "Tempo Admissão", value: "10,6d", sub: "Internação → Auditoria", icon: "Clock" },
  { label: "Auditoria → Fat", value: "0d", sub: "Agilidade no repasse", icon: "ArrowRight" },
  { label: "Média Internação", value: "1.7d", sub: "Alta rotatividade", icon: "Bed" },
];

export const REVENUE_LEAKS: KpiData[] = [
  { label: "Material s/ Cobrança", value: 364, sub: "Itens utilizados não cobrados", icon: "Box" },
  { label: "Medicação s/ Cobrança", value: 334, sub: "Doses administradas s/ lançamento", icon: "Pill" },
  { label: "Taxas Diversas", value: 74, sub: "Alimentação e administrativos", icon: "Utensils" },
  { label: "Intensificador Imagem", value: 18, sub: "Taxa de CC (C-Arm) não lançada", icon: "Aperture" },
];

export const WEEKLY_FLOW_DATA: ChartData[] = [
  { name: 'Seg', Auditoria: 72, Faturamento: 74 },
  { name: 'Ter', Auditoria: 60, Faturamento: 65 },
  { name: 'Qua', Auditoria: 125, Faturamento: 128 },
  { name: 'Qui', Auditoria: 80, Faturamento: 70 },
  { name: 'Sex', Auditoria: 112, Faturamento: 118 },
  { name: 'Sáb', Auditoria: 5, Faturamento: 8 },
  { name: 'Dom', Auditoria: 1, Faturamento: 1 },
];

export const ERROR_BY_SECTOR: ChartData[] = [
  { name: 'Faturamento', value: 1093, fill: '#3b82f6' },
  { name: 'Enfermagem', value: 300, fill: '#22c55e' },
  { name: 'Médico', value: 103, fill: '#f97316' },
  { name: 'Recepção', value: 33, fill: '#f43f5e' },
];

export const ERROR_CATEGORIES: ChartData[] = [
  { name: 'Enfermagem', value: 42, fill: '#3b82f6' },
  { name: 'Médico', value: 31, fill: '#ea580c' },
  { name: 'Faturamento', value: 14, fill: '#10b981' },
  { name: 'Admin', value: 6, fill: '#a855f7' },
];

export const TOP_ERRORS: RankItem[] = [
  { pos: 1, name: "Material não cobrado", value: 364, tag: "Perda Direta", tagType: "danger" },
  { pos: 2, name: "Medicação não cobrada", value: 334, tag: "Perda + Risco", tagType: "danger" },
  { pos: 3, name: "Cobrança indevida", value: 170, tag: "Glosa", tagType: "warning" },
  { pos: 4, name: "Falta relat. enfermagem", value: 146, tag: "Documental", tagType: "warning" },
  { pos: 5, name: "Falta evolução médica", value: 102, tag: "Documental", tagType: "warning" },
  { pos: 6, name: "Falta relat. centro cirúrgico", value: 89, tag: "Risco Glosa Total", tagType: "warning" },
  { pos: 7, name: "Taxa de alimentação", value: 74, tag: "Perda Direta", tagType: "danger" },
  { pos: 8, name: "Guia sem assinatura", value: 24, tag: "Jurídico", tagType: "warning" },
  { pos: 9, name: "Intensificador de imagem", value: 18, tag: "Perda Alto Custo", tagType: "danger" },
  { pos: 10, name: "Diárias não cobradas", value: 17, tag: "Perda Permanência", tagType: "danger" },
];

export const CONVENIOS: Convenio[] = [
  { name: "Unimed", errors: 1104, pct: "68.0%", logoPlaceholder: "UNI", logoUrl: "unimed.png" },
  { name: "Unimed Intercâmbio", errors: 175, pct: "10.8%", logoPlaceholder: "INT", logoUrl: "unimed_intercambio.png" },
  { name: "Mais Saúde", errors: 122, pct: "7.5%", logoPlaceholder: "MAS", logoUrl: "mais_saude.png" },
  { name: "CASSI", errors: 47, pct: "2.9%", logoPlaceholder: "CAS", logoUrl: "cassi.png" },
  { name: "SulAmérica", errors: 41, pct: "2.5%", logoPlaceholder: "SUL", logoUrl: "sulamerica.png" },
  { name: "AFFEGO", errors: 39, pct: "2.4%", logoPlaceholder: "AFF", logoUrl: "affego.png" },
  { name: "Bradesco", errors: 22, pct: "1.4%", logoPlaceholder: "BRA", logoUrl: "bradesco.png" },
  { name: "Vivacom", errors: 18, pct: "1.1%", logoPlaceholder: "VIV", logoUrl: "vivacom.png" },
  { name: "Saúde Caixa", errors: 10, pct: "0.6%", logoPlaceholder: "CAI", logoUrl: "saude_caixa.png" },
  { name: "FUSEX", errors: 7, pct: "0.4%", logoPlaceholder: "FUS", logoUrl: "fusex.png" },
  { name: "SAMP", errors: 5, pct: "0.3%", logoPlaceholder: "SAM", logoUrl: "samp.png" },
];

export const PROFESSIONALS: RankItem[] = [
  { pos: 1, name: "Bruno Tavares", details: "Gestor Faturamento", value: 854, tag: "Alta Produtividade", tagType: 'info' },
  { pos: 2, name: "Sabryna Gabriella", details: "Ger. Enfermagem", value: 674, tag: "Alta Produtividade", tagType: 'info' },
  { pos: 3, name: "Kátia Alves", details: "Faturista", value: 571, tag: "Alta Produtividade", tagType: 'info' },
  { pos: 4, name: "Dr. Ledismar", details: "Médico CC", value: 313, tag: "Centro Cirúrgico", tagType: 'warning' },
  { pos: 5, name: "Warley", details: "Gestor Recepção", value: 175, tag: "Recepção", tagType: 'info' },
];
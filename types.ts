export interface KpiData {
  label: string;
  value: string | number;
  sub: string;
  icon: string;
}

export interface ChartData {
  name: string;
  value?: number;
  [key: string]: string | number | undefined;
}

export interface RankItem {
  pos: number;
  name: string;
  value: string | number;
  tag: string;
  tagType?: 'danger' | 'warning' | 'info';
  details?: string; // For professionals slide (function) or extra info
}

export interface Convenio {
  name: string;
  errors: number;
  pct: string;
  logoPlaceholder: string;
  logoUrl?: string;
}
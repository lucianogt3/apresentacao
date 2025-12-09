import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  FileText, AlertTriangle, Clock, ArrowRight, Bed, 
  Box, Pill, Utensils, Aperture, CheckCircle, TrendingUp, ShieldAlert,
  Calendar, User
} from 'lucide-react';
import { KPIS, REVENUE_LEAKS, WEEKLY_FLOW_DATA, ERROR_BY_SECTOR, TOP_ERRORS, CONVENIOS, PROFESSIONALS, ERROR_CATEGORIES } from '../constants';
import { SectionTitle } from './ui/SectionTitle';
import { CustomTooltip } from './CustomTooltip';

/* 
  PROPS INTERFACE
  All slides accept isPrinting to switch chart colors dynamically
*/
interface SlideProps {
  isPrinting?: boolean;
}

// Helper for Chart Colors
const getChartColors = (isPrinting: boolean = false) => ({
  text: isPrinting ? '#000000' : '#f8fafc', // Print: Black, Screen: Very Bright White
  grid: isPrinting ? '#94a3b8' : '#334155', // Print: Visible Grey, Screen: Subtle Grey
  // Line colors optimized for printing on white paper
  lineAud: isPrinting ? '#d97706' : '#eab308', // Print: Darker Amber, Screen: Bright Yellow
  lineFat: isPrinting ? '#1e40af' : '#3b82f6', // Print: Darker Blue, Screen: Bright Blue
});

/* --- SLIDE 0: Cover --- */
export const SlideCover: React.FC<SlideProps> = () => (
  <div className="flex flex-col justify-center h-full gap-6 md:gap-8 my-auto">
    <div>
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 leading-tight print:text-black print:bg-none" style={{ color: 'inherit' }}>
        Relatório Executivo<br />
        <span className="text-blue-500 print:text-black">Auditoria Hospitalar</span>
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-slate-400 font-light max-w-3xl leading-relaxed print:text-black">
        Visão estratégica da produção, riscos de perda de receita e oportunidades de melhoria assistencial e financeira no Hospital Unique.
      </p>
    </div>

    <div className="flex flex-wrap gap-4 mt-4 md:mt-8">
      <div className="flex items-center gap-3 px-4 py-2 md:px-6 md:py-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-semibold backdrop-blur-sm text-sm md:text-base print:border-black print:text-black">
        <Calendar size={18} />
        <span>01/10/2025 a 30/11/2025</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-2 md:px-6 md:py-3 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium text-sm md:text-base print:border-black print:text-black">
        <User size={18} />
        <span>Resp: Enf. Jeiza da Silva Santos</span>
      </div>
    </div>

    <div className="mt-8 md:mt-12 p-4 md:p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 print:border-black print:bg-white">
      <ul className="space-y-3 md:space-y-4 text-base md:text-lg text-slate-300 print:text-black">
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0 print:bg-black"></div>
          <span>Baseado em <strong className="text-emerald-400 print:text-black font-bold">457 contas auditadas</strong> e <strong className="text-emerald-400 print:text-black font-bold">1.529 erros</strong>.</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0 print:bg-black"></div>
          <span>Foco na proteção da <strong className="text-white print:text-black">saúde financeira</strong> do Hospital.</span>
        </li>
      </ul>
    </div>
  </div>
);

/* --- SLIDE 1: General KPIs --- */
export const SlideKPIs: React.FC<SlideProps> = () => {
  const icons: any = { FileText, AlertTriangle, Clock, ArrowRight, Bed };
  
  return (
    <>
      <SectionTitle 
        title="Visão Geral dos Indicadores" 
        subtitle="Volume de trabalho da auditoria e impacto potencial na receita."
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4">
        {KPIS.map((kpi, idx) => {
          const Icon = icons[kpi.icon];
          return (
            <div key={idx} className="bg-slate-800/50 p-4 md:p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all shadow-lg print:border-black print:shadow-none print:bg-white">
              <div className="flex items-center gap-3 text-slate-400 mb-2 md:mb-3 font-semibold uppercase text-xs md:text-sm tracking-wider print:text-black">
                <Icon size={18} className="text-blue-500 print:text-black" />
                {kpi.label}
              </div>
              <div className="text-3xl md:text-5xl font-bold text-slate-100 mb-2 md:mb-3 print:text-black">{kpi.value}</div>
              <div className="text-xs md:text-sm text-slate-400 font-light leading-snug print:text-black">{kpi.sub}</div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 md:mt-8 bg-blue-900/20 border border-blue-800/30 p-4 md:p-5 rounded-xl flex gap-4 print:border-black print:bg-transparent">
        <AlertTriangle className="text-blue-400 shrink-0 print:text-black" size={24} />
        <p className="text-blue-100 text-sm md:text-lg print:text-black">
          A alta taxa de erro (93%) combinada com o fluxo rápido para o faturamento (0 dias) demonstra que a auditoria está atuando como uma barreira crítica contra perdas financeiras imediatas.
        </p>
      </div>
    </>
  );
};

/* --- SLIDE 2: Revenue Leaks --- */
export const SlideRevenueLeaks: React.FC<SlideProps> = () => {
  const icons: any = { Box, Pill, Utensils, Aperture };

  return (
    <>
      <SectionTitle 
        title="Principais Ralos de Receita" 
        subtitle="Causas que representam perda direta de faturamento."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {REVENUE_LEAKS.map((item, idx) => {
          const Icon = icons[item.icon];
          return (
            <div key={idx} className="group bg-gradient-to-br from-slate-800 to-slate-900 p-4 md:p-6 rounded-2xl border border-slate-700 relative overflow-hidden print:border-black print:bg-none print:bg-white">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 print:bg-black"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-950 rounded-lg text-slate-300 group-hover:text-red-400 transition-colors print:text-black print:bg-transparent print:border print:border-black">
                  <Icon size={24} />
                </div>
                <span className="text-3xl md:text-4xl font-bold text-slate-100 print:text-black">{item.value}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-200 mb-2 print:text-black">{item.label}</h3>
              <p className="text-xs md:text-sm text-slate-400 print:text-black">{item.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-slate-800/30 p-4 md:p-6 rounded-xl border border-slate-700 print:border-black print:bg-white">
           <h4 className="text-base md:text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2 print:text-black">
             <TrendingUp size={20} /> Impacto Estratégico
           </h4>
           <p className="text-sm md:text-base text-slate-300 print:text-black">
             Materiais e medicações não cobrados são "ralos silenciosos". Só aparecem quando a auditoria confronta prontuário, enfermagem e conta. A correção aqui é lucro líquido direto.
           </p>
        </div>
        <div className="bg-slate-800/30 p-4 md:p-6 rounded-xl border border-slate-700 print:border-black print:bg-white">
           <h4 className="text-base md:text-lg font-bold text-blue-400 mb-3 flex items-center gap-2 print:text-black">
             <ShieldAlert size={20} /> Ação Recomendada
           </h4>
           <p className="text-sm md:text-base text-slate-300 print:text-black">
             Revisão dos kits cirúrgicos e protocolos de dispensação de farmácia para garantir que o físico (entregue) bata com o sistêmico (cobrado) antes da auditoria.
           </p>
        </div>
      </div>
    </>
  );
};

/* --- SLIDE 3: Weekly Flow Chart --- */
export const SlideWeeklyFlow: React.FC<SlideProps> = ({ isPrinting = false }) => {
  const colors = getChartColors(isPrinting);

  return (
    <>
      <SectionTitle 
        title="Fluxo de Contas por Dia" 
        subtitle="Volume de contas entregues à auditoria vs. enviadas ao faturamento."
      />
      <div className="bg-slate-800/50 p-4 md:p-6 rounded-2xl border border-slate-700 h-[300px] md:h-[450px] print:border-black print:h-[350px] print:bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={WEEKLY_FLOW_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke={colors.text} 
              tick={{fontSize: 12, fill: colors.text, fontWeight: isPrinting ? 600 : 400}} 
              axisLine={{stroke: colors.text}} 
              tickLine={false} 
            />
            <YAxis 
              stroke={colors.text} 
              tick={{fontSize: 12, fill: colors.text, fontWeight: isPrinting ? 600 : 400}} 
              axisLine={{stroke: colors.text}} 
              tickLine={false} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: isPrinting ? '#f0f0f0' : 'rgba(255,255,255,0.05)'}} />
            <Legend wrapperStyle={{ paddingTop: '20px', color: colors.text }} />
            <Bar dataKey="Auditoria" fill={colors.lineAud} radius={[4, 4, 0, 0]} name="Entrada (Auditoria)" isAnimationActive={!isPrinting} />
            <Bar dataKey="Faturamento" fill={colors.lineFat} radius={[4, 4, 0, 0]} name="Saída (Faturamento)" isAnimationActive={!isPrinting} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center text-slate-400 text-xs md:text-sm print:text-black">
        Picos em Quarta e Sexta exigem escala reforçada para evitar gargalos.
      </div>
    </>
  );
};

/* --- SLIDE 4: Audit vs Billing Lines --- */
export const SlideAuditVsBilling: React.FC<SlideProps> = ({ isPrinting = false }) => {
  const colors = getChartColors(isPrinting);
  
  return (
    <>
      <SectionTitle 
        title="Equilíbrio: Entrada vs Saída" 
        subtitle="Análise comparativa das curvas de trabalho."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 h-auto md:h-[400px]">
        <div className="bg-slate-800/50 p-4 md:p-6 rounded-2xl border border-slate-700 flex flex-col h-[300px] md:h-auto print:border-black print:bg-white">
          <h3 className="text-base md:text-lg font-bold text-slate-200 mb-4 text-center print:text-black">Entregues para Auditoria</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_FLOW_DATA} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                <XAxis dataKey="name" stroke={colors.text} tick={{fontSize: 12, fill: colors.text}} axisLine={{stroke: colors.text}} />
                <YAxis stroke={colors.text} tick={{fontSize: 12, fill: colors.text}} axisLine={{stroke: colors.text}} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="Auditoria" 
                  stroke={colors.lineAud} 
                  strokeWidth={3} 
                  dot={{r: 4, fill: colors.lineAud}} 
                  activeDot={{r: 6}} 
                  isAnimationActive={!isPrinting} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-800/50 p-4 md:p-6 rounded-2xl border border-slate-700 flex flex-col h-[300px] md:h-auto print:border-black print:bg-white">
          <h3 className="text-base md:text-lg font-bold text-slate-200 mb-4 text-center print:text-black">Enviadas ao Faturamento</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_FLOW_DATA} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                <XAxis dataKey="name" stroke={colors.text} tick={{fontSize: 12, fill: colors.text}} axisLine={{stroke: colors.text}} />
                <YAxis stroke={colors.text} tick={{fontSize: 12, fill: colors.text}} axisLine={{stroke: colors.text}} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="Faturamento" 
                  stroke={colors.lineFat} 
                  strokeWidth={3} 
                  dot={{r: 4, fill: colors.lineFat}} 
                  activeDot={{r: 6}} 
                  isAnimationActive={!isPrinting} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

/* --- SLIDE 5: Errors by Sector --- */
export const SlideErrorDistribution: React.FC<SlideProps> = ({ isPrinting = false }) => {
  const colors = getChartColors(isPrinting);
  
  return (
    <>
      <SectionTitle 
        title="Origem dos Erros" 
        subtitle="Distribuição dos apontamentos por setor responsável."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center h-full">
        <div className="md:col-span-2 bg-slate-800/50 p-4 md:p-6 rounded-2xl border border-slate-700 h-[300px] md:h-[400px] print:border-black print:bg-white">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ERROR_BY_SECTOR} layout="vertical" margin={{left: 0, right: 20}}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} horizontal={false} />
              <XAxis type="number" stroke={colors.text} tick={{fill: colors.text}} axisLine={{stroke: colors.text}} />
              <YAxis dataKey="name" type="category" stroke={colors.text} width={100} tick={{fontSize: 12, fontWeight: 600, fill: colors.text}} axisLine={{stroke: colors.text}} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: isPrinting ? '#f0f0f0' : 'rgba(255,255,255,0.05)'}} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40} isAnimationActive={!isPrinting}>
                {ERROR_BY_SECTOR.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill as string} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3 md:space-y-4">
          <div className="bg-slate-800 p-3 md:p-4 rounded-lg border-l-4 border-blue-500 print:bg-white print:border print:border-black">
            <strong className="block text-blue-400 text-base md:text-lg print:text-black">Faturamento (1093)</strong>
            <span className="text-slate-400 text-xs md:text-sm print:text-black">Maior volume. Necessidade de protocolos claros de conferência.</span>
          </div>
          <div className="bg-slate-800 p-3 md:p-4 rounded-lg border-l-4 border-green-500 print:bg-white print:border print:border-black">
            <strong className="block text-green-400 text-base md:text-lg print:text-black">Enfermagem (300)</strong>
            <span className="text-slate-400 text-xs md:text-sm print:text-black">Impacta rastreabilidade. Falta de checagem.</span>
          </div>
          <div className="bg-slate-800 p-3 md:p-4 rounded-lg border-l-4 border-orange-500 print:bg-white print:border print:border-black">
            <strong className="block text-orange-400 text-base md:text-lg print:text-black">Médico (103)</strong>
            <span className="text-slate-400 text-xs md:text-sm print:text-black">Sustentação documental. Evoluções e descrições.</span>
          </div>
        </div>
      </div>
    </>
  );
};

/* --- SLIDE 6: Item Ranking --- */
export const SlideItemRanking: React.FC<SlideProps> = () => (
  <>
    <SectionTitle 
      title="Ranking de Ocorrências" 
      subtitle="Itens com maior volume absoluto de registros na auditoria."
    />
    <div className="overflow-hidden rounded-xl border border-slate-700 shadow-2xl print:shadow-none print:border-black">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px] text-sm md:text-base">
          <thead className="bg-slate-800 text-slate-200 print:bg-gray-200 print:text-black">
            <tr>
              <th className="p-2 md:p-3 font-bold border-b border-slate-700 w-12 md:w-16 text-center print:border-black">#</th>
              <th className="p-2 md:p-3 font-bold border-b border-slate-700 print:border-black">Item / Causa</th>
              <th className="p-2 md:p-3 font-bold border-b border-slate-700 text-right print:border-black">Qtd</th>
              <th className="p-2 md:p-3 font-bold border-b border-slate-700 print:border-black">Impacto</th>
            </tr>
          </thead>
          <tbody className="bg-slate-900/50 print:bg-white">
            {TOP_ERRORS.map((item) => (
              <tr key={item.pos} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors print:border-black">
                <td className="p-2 md:p-3 text-center font-bold text-slate-500 print:text-black">{item.pos}º</td>
                <td className="p-2 md:p-3 text-slate-200 font-medium print:text-black">{item.name}</td>
                <td className="p-2 md:p-3 text-right font-bold text-slate-100 print:text-black">{item.value}</td>
                <td className="p-2 md:p-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap
                    ${item.tagType === 'danger' ? 'bg-red-900/30 text-red-400 border border-red-900/50 print:border-black print:text-red-700 print:bg-transparent' : 
                      item.tagType === 'warning' ? 'bg-amber-900/30 text-amber-400 border border-amber-900/50 print:border-black print:text-amber-700 print:bg-transparent' : 
                      'bg-blue-900/30 text-blue-400 border border-blue-900/50 print:border-black print:text-blue-700 print:bg-transparent'}`}>
                    {item.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

/* --- SLIDE 7: Insurance (Convenios) --- */
interface ConvCardProps {
  name: string;
  errors: number;
  pct: string;
  logoUrl?: string;
  placeholder: string;
  colorIdx: number;
}

const FALLBACK_COLORS = [
  'bg-emerald-600', 'bg-emerald-700', // Unimed shades
  'bg-blue-600', 'bg-blue-700', // Mais Saude/Cassi
  'bg-orange-600', // Sulamerica
  'bg-red-600', // Bradesco
  'bg-purple-600', 'bg-indigo-600',
  'bg-teal-600', 'bg-cyan-600'
];

const ConvCard: React.FC<ConvCardProps> = ({ name, errors, pct, logoUrl, placeholder, colorIdx }) => {
  const [imgError, setImgError] = useState(false);
  const bgColor = FALLBACK_COLORS[colorIdx % FALLBACK_COLORS.length];

  return (
    <div className="bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center gap-3 hover:border-blue-500 transition-colors group h-full print:border-black print:bg-white">
      <div className="w-24 h-16 rounded-lg bg-slate-200 flex items-center justify-center p-2 group-hover:bg-white transition-colors overflow-hidden shadow-inner relative print:border print:border-black print:bg-white">
        {!imgError && logoUrl ? (
          <img 
            src={`logos/${logoUrl}`} 
            alt={name} 
            className="max-w-full max-h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center text-white font-black text-xl tracking-wider ${bgColor} shadow-inner print:bg-transparent print:text-black`}>
            {placeholder}
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between w-full">
        <div>
          <div className="font-bold text-base md:text-lg text-slate-200 leading-tight line-clamp-2 min-h-[2.5em] flex items-center justify-center print:text-black">{name}</div>
          <div className="text-xs md:text-sm text-slate-500 mt-1 print:text-black">{pct} do total</div>
        </div>
        <div className="mt-3 px-3 py-1 bg-amber-900/20 text-amber-500 rounded-full text-xs md:text-sm font-bold border border-amber-900/30 print:border-black print:text-black print:bg-transparent">
          {errors} Erros
        </div>
      </div>
    </div>
  );
};

export const SlideInsurance: React.FC<SlideProps> = () => (
  <>
    <SectionTitle 
      title="Erros por Convênio" 
      subtitle="Onde estão concentradas as divergências e riscos de glosa."
    />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {CONVENIOS.map((conv, idx) => (
        <ConvCard 
          key={idx}
          name={conv.name}
          errors={conv.errors}
          pct={conv.pct}
          logoUrl={conv.logoUrl}
          placeholder={conv.logoPlaceholder}
          colorIdx={idx}
        />
      ))}
    </div>
    <div className="mt-6 md:mt-8 p-4 bg-slate-800/30 border border-slate-700 rounded-xl print:border-black print:bg-white">
       <p className="text-sm md:text-base text-slate-300 print:text-black">
         <strong className="text-white print:text-black">Análise:</strong> A concentração na Unimed (Local + Intercâmbio) reflete o volume de atendimento, mas também a complexidade das regras de negócio.
       </p>
    </div>
  </>
);

/* --- SLIDE 8: Professionals --- */
export const SlideProfessionals: React.FC<SlideProps> = () => (
  <>
    <SectionTitle 
      title="Produtividade & Ocorrências" 
      subtitle="Volume de erros identificados por profissional responsável."
    />
    <div className="overflow-hidden rounded-xl border border-slate-700 shadow-2xl print:shadow-none print:border-black">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm md:text-base min-w-[600px]">
          <thead className="bg-slate-800 text-slate-200 print:bg-gray-200 print:text-black">
            <tr>
              <th className="p-3 md:p-4 border-b border-slate-700 w-12 md:w-16 text-center print:border-black">#</th>
              <th className="p-3 md:p-4 border-b border-slate-700 print:border-black">Profissional</th>
              <th className="p-3 md:p-4 border-b border-slate-700 print:border-black">Setor/Função</th>
              <th className="p-3 md:p-4 border-b border-slate-700 text-right print:border-black">Erros Reg.</th>
              <th className="p-3 md:p-4 border-b border-slate-700 print:border-black">Contexto</th>
            </tr>
          </thead>
          <tbody className="bg-slate-900/50 print:bg-white">
            {PROFESSIONALS.map((p) => (
              <tr key={p.pos} className="border-b border-slate-800/50 print:border-black">
                <td className="p-3 md:p-4 text-center font-bold text-slate-500 print:text-black">{p.pos}º</td>
                <td className="p-3 md:p-4 font-semibold text-slate-200 print:text-black">{p.name}</td>
                <td className="p-3 md:p-4 text-slate-400 print:text-black">{p.details}</td>
                <td className="p-3 md:p-4 text-right font-bold text-slate-100 print:text-black">{p.value}</td>
                <td className="p-3 md:p-4">
                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${p.tagType === 'info' ? 'bg-blue-900/30 text-blue-400 print:text-blue-700 print:border print:border-black print:bg-transparent' : 'bg-amber-900/30 text-amber-400 print:text-amber-700 print:border print:border-black print:bg-transparent'}`}>
                    {p.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="mt-4 flex items-start gap-2 text-xs md:text-sm text-slate-400 bg-slate-800 p-3 rounded-lg print:border print:border-black print:bg-white">
      <AlertTriangle size={16} className="mt-0.5 text-yellow-500 shrink-0" />
      <p className="print:text-black">
        <strong>Interpretação:</strong> Alto volume nestes casos indica <span className="text-white print:text-black">alta produtividade de auditoria</span>. 
        Bruno e Kátia, por exemplo, são os que mais auditam.
      </p>
    </div>
  </>
);

/* --- SLIDE 9: Error Categories --- */
export const SlideErrorCategories: React.FC<SlideProps> = ({ isPrinting = false }) => {
  const colors = getChartColors(isPrinting);

  return (
    <>
      <SectionTitle 
        title="Categorias Críticas" 
        subtitle="Ranking por tipo macro de erro."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div className="h-[300px] md:h-[350px] bg-slate-800/50 rounded-2xl p-4 border border-slate-700 print:border-black print:bg-white">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={ERROR_CATEGORIES} margin={{top:20, bottom: 20}}>
               <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
               <XAxis 
                dataKey="name" 
                stroke={colors.text} 
                tick={{fontSize: 12, fill: colors.text}} 
                axisLine={{stroke: colors.text}} 
                tickLine={false} 
              />
               <YAxis 
                stroke={colors.text} 
                axisLine={{stroke: colors.text}} 
                tickLine={false} 
                tick={{fill: colors.text}} 
              />
               <Tooltip content={<CustomTooltip />} />
               <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50} isAnimationActive={!isPrinting}>
                 {ERROR_CATEGORIES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill as string} />
                 ))}
               </Bar>
             </BarChart>
           </ResponsiveContainer>
        </div>
        <div>
          <ul className="space-y-4 md:space-y-6">
            <li className="relative pl-4 md:pl-6 border-l-2 border-blue-500">
              <h4 className="font-bold text-lg md:text-xl text-slate-100 print:text-black">Erro de Enfermagem</h4>
              <p className="text-sm md:text-base text-slate-400 mt-1 print:text-black">
                Falta de relatórios e evoluções não anexadas. Itens assistenciais realizados mas não registrados (checagem).
              </p>
            </li>
            <li className="relative pl-4 md:pl-6 border-l-2 border-orange-500">
              <h4 className="font-bold text-lg md:text-xl text-slate-100 print:text-black">Erro Médico</h4>
              <p className="text-sm md:text-base text-slate-400 mt-1 print:text-black">
                Falta de evolução diária. Compromete a validação técnica da cobrança de diárias e procedimentos.
              </p>
            </li>
            <li className="relative pl-4 md:pl-6 border-l-2 border-green-500">
              <h4 className="font-bold text-lg md:text-xl text-slate-100 print:text-black">Erro de Faturamento</h4>
              <p className="text-sm md:text-base text-slate-400 mt-1 print:text-black">
                Materiais não lançados no sistema. Taxas administrativas esquecidas.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

/* --- SLIDE 10: Strategy --- */
export const SlideStrategy: React.FC<SlideProps> = () => (
  <div className="h-full flex flex-col justify-center">
    <SectionTitle 
      title="Papel Estratégico" 
      subtitle="Última linha de defesa da receita e termômetro da qualidade."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-4 md:mt-6">
      <div className="bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-700 shadow-xl print:border-black print:shadow-none print:bg-white">
        <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-4 print:text-black">Cenário Atual (Reativo)</h3>
        <ul className="space-y-3 md:space-y-4 text-slate-300 text-sm md:text-base">
          <li className="flex gap-3">
             <AlertTriangle className="shrink-0 text-red-500 print:text-black" />
             <span className="print:text-black">Atuação predominantemente pós-faturamento.</span>
          </li>
          <li className="flex gap-3">
             <AlertTriangle className="shrink-0 text-red-500 print:text-black" />
             <span className="print:text-black">Correção de contas já prestes a serem enviadas.</span>
          </li>
          <li className="flex gap-3">
             <CheckCircle className="shrink-0 text-slate-500 print:text-black" />
             <span className="print:text-black">Mesmo assim, evita perdas massivas de materiais e taxas.</span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 p-6 md:p-8 rounded-3xl border border-blue-500/30 shadow-xl relative overflow-hidden print:border-black print:bg-none print:shadow-none print:bg-white">
        <h3 className="text-xl md:text-2xl font-bold text-blue-400 mb-4 print:text-black">Visão Futura (Híbrido)</h3>
        <ul className="space-y-3 md:space-y-4 text-slate-200 text-sm md:text-base">
          <li className="flex gap-3">
             <TrendingUp className="shrink-0 text-blue-400 print:text-black" />
             <span className="print:text-black">Modelo Pré + Pós faturamento.</span>
          </li>
          <li className="flex gap-3">
             <TrendingUp className="shrink-0 text-blue-400 print:text-black" />
             <span className="print:text-black">Foco em prevenção na fonte (educação continuada).</span>
          </li>
          <li className="flex gap-3">
             <TrendingUp className="shrink-0 text-blue-400 print:text-black" />
             <span className="print:text-black">Auditoria como consultoria interna de qualidade.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

/* --- SLIDE 11: Next Steps --- */
export const SlideNextSteps: React.FC<SlideProps> = () => (
  <div className="h-full flex flex-col justify-center">
    <SectionTitle 
      title="Próximos Passos" 
      subtitle="Consolidando a auditoria como instrumento permanente de gestão."
    />
    <div className="space-y-4 md:space-y-6 mt-4">
      <div className="flex gap-4 md:gap-6 items-start p-4 md:p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors print:border-black print:bg-white">
        <div className="bg-blue-500/20 p-3 md:p-4 rounded-xl text-blue-400 shrink-0 print:border print:border-black print:bg-white print:text-black">
          <FileText size={24} className="md:w-8 md:h-8" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-1 md:mb-2 print:text-black">Relatório Executivo Mensal</h3>
          <p className="text-sm md:text-base text-slate-400 print:text-black">Padronização institucional para apresentação em reuniões de resultado. Arquivamento organizado para acreditações.</p>
        </div>
      </div>

      <div className="flex gap-4 md:gap-6 items-start p-4 md:p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors print:border-black print:bg-white">
        <div className="bg-emerald-500/20 p-3 md:p-4 rounded-xl text-emerald-400 shrink-0 print:border print:border-black print:bg-white print:text-black">
          <Aperture size={24} className="md:w-8 md:h-8" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-1 md:mb-2 print:text-black">Dashboard Integrado</h3>
          <p className="text-sm md:text-base text-slate-400 print:text-black">Indicadores em tempo real integrados ao NurseAuditoria. Visão rápida para coordenação e diretoria.</p>
        </div>
      </div>

      <div className="flex gap-4 md:gap-6 items-start p-4 md:p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors print:border-black print:bg-white">
        <div className="bg-purple-500/20 p-3 md:p-4 rounded-xl text-purple-400 shrink-0 print:border print:border-black print:bg-white print:text-black">
          <ArrowRight size={24} className="md:w-8 md:h-8" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-1 md:mb-2 print:text-black">Automação de Envio</h3>
          <p className="text-sm md:text-base text-slate-400 print:text-black">Script para leitura de banco de dados e geração automática de PDF, permitindo comparação histórica de evolução.</p>
        </div>
      </div>
    </div>
  </div>
);

/* --- SLIDE 12: Closing --- */
export const SlideClosing: React.FC<SlideProps> = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-6 md:space-y-8">
    <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-900/50 mb-2 md:mb-4 animate-bounce print:border print:border-black print:bg-white print:text-black print:shadow-none">
      <CheckCircle size={40} className="md:w-12 md:h-12 text-white print:text-black" />
    </div>
    
    <h2 className="text-3xl md:text-5xl font-bold text-slate-100 print:text-black">
      Encerramento
    </h2>
    
    <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed px-4 print:text-black">
      A auditoria demonstrou sua capacidade de proteger receita e gerar informação qualificada. 
      Com pequenos ajustes, é possível migrar para um modelo preventivo, com <strong className="text-blue-400 print:text-black">menos retrabalho</strong> e <strong className="text-blue-400 print:text-black">mais previsibilidade</strong>.
    </p>

    <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-slate-800 w-full max-w-2xl print:border-black">
      <p className="text-slate-500 text-xs md:text-sm uppercase tracking-widest mb-2 print:text-black">Relatório Desenvolvido Por</p>
      <p className="text-xl md:text-2xl font-bold text-slate-200 print:text-black">Enf. Jeiza da Silva Santos</p>
      <p className="text-sm md:text-base text-slate-400 print:text-black">COREN-GO 488.254 • Hospital Unique</p>
    </div>
  </div>
);

import React from 'react';
import { Paper } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ExternalLink, Users, Calendar, BookOpen, Quote, ShieldCheck } from 'lucide-react';

interface PaperCardProps {
  paper: Paper;
  index: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg text-[11px] max-w-[220px]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.fill }}></div>
          <p className="font-bold text-slate-900">{data.name}: {data.value}%</p>
        </div>
        <p className="text-slate-600 leading-normal italic">"{data.context}"</p>
      </div>
    );
  }
  return null;
};

const PaperCard: React.FC<PaperCardProps> = ({ paper, index }) => {
  const chartData = [
    { 
      name: 'Agree', 
      value: paper.agreementPercentage, 
      context: paper.consensusStatements.agree,
      fill: '#10b981'
    },
    { 
      name: 'Disagree', 
      value: paper.disagreementPercentage, 
      context: paper.consensusStatements.disagree,
      fill: '#ef4444'
    },
    { 
      name: 'Mixed', 
      value: Math.max(0, 100 - (paper.agreementPercentage + paper.disagreementPercentage)), 
      context: paper.consensusStatements.mixed,
      fill: '#cbd5e1'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6 transition-all hover:shadow-md relative overflow-hidden">
      {index < 3 && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 uppercase tracking-tighter shadow-sm">
            <ShieldCheck size={12} /> High Influence
          </div>
        </div>
      )}
      
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">
            Paper Rank #{index + 1}
          </span>
          <a 
            href={paper.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 text-xs font-medium"
          >
            Source <ExternalLink size={14} />
          </a>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
          {paper.title}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-slate-400" />
            <span className="truncate max-w-[200px]">{paper.authors}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-slate-400" />
            <span className="truncate">{paper.journal}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <span>{paper.pubDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Quote size={16} className="text-blue-500" />
            <span className="font-bold text-slate-900">{paper.citations.toLocaleString()} Citations</span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <p className="text-sm italic text-slate-700 leading-relaxed">
            <span className="font-semibold text-slate-900 not-italic mr-2">Key Finding:</span>
            {paper.keyFinding}
          </p>
        </div>
      </div>

      <div className="w-full md:w-48 lg:w-64 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6">
        <div className="text-center mb-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Scientific Consensus</span>
          <span className="text-lg font-black text-slate-800">{paper.agreementPercentage}% Agree</span>
        </div>
        
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={30}
                outerRadius={45}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[9px] font-bold uppercase mt-1">
          <span className="text-emerald-600 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Agree
          </span>
          <span className="text-red-500 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Disagree
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Mixed
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaperCard;

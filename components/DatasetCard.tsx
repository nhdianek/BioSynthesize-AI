
import React from 'react';
import { Dataset } from '../types';
import { Database, Link2, Tag, Calendar, User } from 'lucide-react';

interface DatasetCardProps {
  dataset: Dataset;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all hover:border-blue-200 group flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Database size={20} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 line-clamp-1">{dataset.title}</h4>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{dataset.source} • {dataset.id}</span>
          </div>
        </div>
        <a 
          href={dataset.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all flex-shrink-0"
        >
          <Link2 size={20} />
        </a>
      </div>

      <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
        {dataset.description}
      </p>

      <div className="mt-auto pt-4 border-t border-slate-50 space-y-3">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <User size={14} className="text-slate-400" />
            <span className="truncate max-w-[120px]">{dataset.organism}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-slate-400" />
            <span>{dataset.pubDate}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {dataset.keywords.slice(0, 3).map((kw, i) => (
            <span 
              key={i} 
              className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-md flex items-center gap-1"
            >
              <Tag size={10} />
              {kw}
            </span>
          ))}
          {dataset.keywords.length > 3 && (
            <span className="text-[10px] font-bold text-slate-400 px-1">+{dataset.keywords.length - 3} more</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;

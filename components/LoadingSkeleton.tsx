
import React, { useState, useEffect } from 'react';
import { Loader2, Search, FileText, Database, BarChart3 } from 'lucide-react';

const LoadingSkeleton: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "Initializing research agents...",
    "Crawling PubMed for relevant literature...",
    "Filtering top 1000 publications...",
    "Calculating citation influence indices...",
    "Analyzing consensus patterns across studies...",
    "Querying GEO, SRA, and CellxGene databases...",
    "Synthesizing findings into executive report..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Deep Dive in Progress</h2>
        <p className="text-slate-500 mb-12 max-w-md">
          Our agents are scanning global medical archives and genomic repositories to validate your hypothesis.
        </p>

        <div className="w-full space-y-4">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center gap-4 transition-all duration-500">
            <div className={`p-3 rounded-full ${step >= 1 ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
              <Search size={24} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-slate-900">{steps[step]}</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-600 h-full animate-[loading-bar_4s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-slate-100 p-4 rounded-xl animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-slate-100 rounded w-full mb-2"></div>
                <div className="h-3 bg-slate-100 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSkeleton;

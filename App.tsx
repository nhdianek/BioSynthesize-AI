
import React, { useState } from 'react';
import { AppState, ResearchReport as ResearchReportType } from './types';
import { analyzeHypothesis } from './services/geminiService';
import PaperCard from './components/PaperCard';
import DatasetCard from './components/DatasetCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import { 
  FlaskConical, 
  Search, 
  ChevronRight, 
  FileText, 
  Database, 
  TrendingUp, 
  AlertCircle,
  Zap,
  Info,
  Microscope,
  Cpu,
  CheckCircle2
} from 'lucide-react';

const App: React.FC = () => {
  const [hypothesis, setHypothesis] = useState('');
  const [state, setState] = useState<AppState>('IDLE');
  const [report, setReport] = useState<ResearchReportType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hypothesis.trim()) return;

    setState('SEARCHING');
    setError(null);
    try {
      const data = await analyzeHypothesis(hypothesis);
      setReport(data);
      setState('RESULT');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during analysis.');
      setState('ERROR');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <nav className="sticky top-0 z-50 glass-card border-b border-slate-200 py-4 px-6 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setState('IDLE'); setReport(null); }}>
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Microscope size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">BioSynthesize <span className="text-blue-600">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="hover:text-blue-600 cursor-pointer">Literature Dive</span>
            <span className="hover:text-blue-600 cursor-pointer">Dataset Discovery</span>
            <span className="hover:text-blue-600 cursor-pointer">Consensus Tracking</span>
            <div className="h-4 w-px bg-slate-200"></div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors">
              Premium Access
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6">
        {state === 'IDLE' && (
          <div className="max-w-3xl mx-auto pt-12 md:pt-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
              <Zap size={14} /> Intelligence for Life Sciences
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Validate your <span className="gradient-text">Research Hypotheses</span> in seconds.
            </h1>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              BioSynthesize agents crawl PubMed, GEO, SRA, and CellxGene to provide comprehensive literature meta-analysis and relevant dataset recommendations.
            </p>

            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-2xl p-2 shadow-xl border border-slate-100 flex items-center gap-2">
                <div className="pl-4 text-slate-400">
                  <FlaskConical size={24} />
                </div>
                <input 
                  type="text"
                  placeholder="Enter a research hypothesis (e.g., TGF-beta signaling in lung cancer metastasis)..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 font-medium py-4"
                  value={hypothesis}
                  onChange={(e) => setHypothesis(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={!hypothesis.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-200"
                >
                  Analyze <ChevronRight size={20} />
                </button>
              </div>
            </form>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "1,000+", sub: "Papers Scanned", icon: <FileText className="text-blue-500" /> },
                { label: "Real-time", sub: "Grounding", icon: <Search className="text-indigo-500" /> },
                { label: "3+", sub: "Major DBs", icon: <Database className="text-emerald-500" /> },
                { label: "98%", sub: "Agent Precision", icon: <Cpu className="text-purple-500" /> },
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-left">
                  <div className="mb-2">{stat.icon}</div>
                  <div className="text-lg font-bold text-slate-900">{stat.label}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {state === 'SEARCHING' && <LoadingSkeleton />}

        {state === 'ERROR' && (
          <div className="max-w-2xl mx-auto py-12 text-center">
            <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 inline-block">
              <AlertCircle size={48} className="mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Research Interrupted</h2>
              <p className="text-red-500 font-medium mb-6">{error}</p>
              <button 
                onClick={() => setState('IDLE')}
                className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors"
              >
                Try Another Hypothesis
              </button>
            </div>
          </div>
        )}

        {state === 'RESULT' && report && (
          <div className="space-y-12">
            {/* Report Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
              <div className="max-w-3xl">
                <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 block">Synthesis Report</span>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{hypothesis}</h1>
                <p className="text-slate-500 font-medium flex items-center gap-2">
                  <Info size={16} /> Analysis generated by BioSynthesize AI agent based on PubMed and Multi-Omics databases.
                </p>
              </div>
              <button 
                onClick={() => window.print()}
                className="px-6 py-3 border border-slate-200 bg-white rounded-xl text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm"
              >
                Export PDF
              </button>
            </div>

            {/* Executive Summary */}
            <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-600 pointer-events-none">
                <TrendingUp size={120} />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <Zap size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Executive Summary</h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-700">
                <ul className="space-y-4 m-0 p-0">
                  {report.executiveSummary.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-4 list-none m-0 p-0">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 size={18} className="text-blue-500" />
                      </div>
                      <p className="text-slate-600 leading-relaxed font-medium">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Literature Dive */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-600 text-white rounded-lg">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Literature Dive</h2>
                  <p className="text-sm text-slate-500 font-medium">Top 10 Influential Papers (Sampled from 1,000+ publications, ranked by citations)</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {report.topPapers.map((paper, idx) => (
                  <PaperCard key={idx} paper={paper} index={idx} />
                ))}
              </div>
            </section>

            {/* Relevant Datasets */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-600 text-white rounded-lg">
                  <Database size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Data Repositories</h2>
                  <p className="text-sm text-slate-500 font-medium">Relevant Multi-Omic Datasets (Ordered by most recent)</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {report.relevantDatasets.map((dataset, idx) => (
                  <DatasetCard key={idx} dataset={dataset} />
                ))}
              </div>
            </section>

            {/* Footer / Reset */}
            <div className="text-center py-12 border-t border-slate-100">
              <button 
                onClick={() => { setState('IDLE'); setReport(null); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl"
              >
                Start New Analysis
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

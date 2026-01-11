
export interface Paper {
  title: string;
  authors: string;
  citations: number;
  pubDate: string;
  journal: string;
  link: string;
  agreementPercentage: number; // 0 to 100
  disagreementPercentage: number; // 0 to 100
  keyFinding: string;
  consensusStatements: {
    agree: string;
    disagree: string;
    mixed: string;
  };
}

export interface Dataset {
  id: string;
  title: string;
  source: 'GEO' | 'SRA' | 'CellxGene';
  keywords: string[];
  link: string;
  description: string;
  organism: string;
  pubDate: string;
}

export interface ResearchReport {
  executiveSummary: string[];
  topPapers: Paper[];
  relevantDatasets: Dataset[];
}

export type AppState = 'IDLE' | 'SEARCHING' | 'RESULT' | 'ERROR';

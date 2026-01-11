# BioSynthesize AI 🧬

BioSynthesize AI is a high-performance, agentic research tool designed for life sciences and healthcare professionals. It empowers researchers to validate complex hypotheses by autonomously crawling global scientific literature and multi-omics databases.

## 🚀 Key Features

- **Automated Literature Meta-Analysis**: Scans through the top 1000 relevant papers from PubMed, Nature, Science, and Cell to identify the most influential publications.
- **Weighted Influence Ranking**: Papers are ranked using a proprietary weighted combination of:
    - **Citation Count** (Primary weight)
    - **Scientific Consensus** (Secondary weight)
    - **Recency** (Tertiary weight)
- **Interactive Scientific Consensus**: Each paper includes a visual consensus analysis (Pie Chart) showing the percentage of the 1000-paper corpus that agrees, disagrees, or remains inconclusive regarding the key finding.
- **Dataset Discovery**: Targeted keyword generation to search through GEO (Gene Expression Omnibus), SRA (Sequence Read Archive), and CellxGene repositories.
- **Executive Synthesis**: A bulleted, high-level summary that captures the current scientific landscape, consensus trends, and data availability.
- **Export Ready**: Clean, professional UI optimized for generating research reports and PDF exports.

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI Engine**: Google Gemini API (`gemini-3-pro-preview`)
- **Data Visualization**: Recharts (Interactive Consensus Charts)
- **Icons**: Lucide React
- **Environment**: ESM-based architecture for high-performance module loading

## 📖 How It Works

1.  **Pose a Hypothesis**: Enter a scientific question or hypothesis (e.g., "TGF-beta signaling promotes EMT in lung adenocarcinoma").
2.  **Agent Search**: BioSynthesize agents utilize Google Search Grounding to verify recent publication data and simulate a deep dive into medical archives.
3.  **Synthesis**: The model parses citations and consensus patterns to build a report.
4.  **Dataset Mapping**: The tool extracts core biological entities from your prompt to find relevant multi-omics datasets for follow-up validation.

## ⚙️ Setup & Installation

The application requires a valid Google Gemini API Key.

1.  Clone the repository.
2.  Ensure your environment has the `API_KEY` variable configured.
3.  Open `index.html` via a modern web server or development environment supporting ES modules.

## 📜 License

This project is intended for research and educational purposes. Data generated should be verified against original sources for clinical or laboratory applications.

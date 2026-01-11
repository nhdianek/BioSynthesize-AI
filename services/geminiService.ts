
import { GoogleGenAI, Type } from "@google/genai";
import { ResearchReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeHypothesis(hypothesis: string): Promise<ResearchReport> {
  const model = "gemini-3-pro-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: `
      Conduct a comprehensive research analysis for the following hypothesis/question: "${hypothesis}".
      
      Requirements:
      1. Literature Dive (PubMed/Nature/Science/Cell): Simulate a scan of the top 1000 relevant papers related to the hypothesis.
      2. Identify and rank the 10 most influential papers. 
         - CRITICAL: The final list must be STRICTLY ORDERED by the number of citations in descending order (highest citation count first).
      
      3. For each of the top 10 papers, provide:
         - Title, Abbreviated Authors, Citation Count, Publication Date, Journal.
         - A direct link (URL) to the source.
         - A key finding snippet.
         - Consensus Analysis: The percentage of papers (from the 1000-paper corpus) that agree vs. disagree with this specific paper's key finding.
         - Specific Consensus Statements: Provide 3 distinct strings describing the actual scientific context for the consensus:
           * agree: A quick line explaining what exactly is being corroborated regarding the finding.
           * disagree: A quick line explaining what exactly is being refuted or contradicted.
           * mixed: A quick line explaining why the literature is debated or inconclusive regarding this finding.
      
      4. Dataset Search (GEO, SRA, CellxGene):
         - Generate a list of targeted keywords from the original hypothesis.
         - Identify 5 highly relevant datasets.
         - CRITICAL: The final list must be STRICTLY ORDERED from the most recent publication date to the oldest.
         - For each dataset, provide: Title, Source Database (GEO/SRA/CellxGene), ID, Publication Date (Mandatory), Keywords, Link, Brief Description, and Organism.
      
      5. Executive Summary: Provide a succinct synthesis of the research landscape as a list of 4-6 high-impact bullet points. Each point should capture a core finding, consensus trend, or data availability insight.

      Ensure all data points—especially citations, agreement percentages, and publication dates—are realistic and grounded in existing scientific literature.
    `,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          executiveSummary: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "A list of bullet points synthesizing the research."
          },
          topPapers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                authors: { type: Type.STRING },
                citations: { type: Type.NUMBER },
                pubDate: { type: Type.STRING },
                journal: { type: Type.STRING },
                link: { type: Type.STRING },
                agreementPercentage: { type: Type.NUMBER },
                disagreementPercentage: { type: Type.NUMBER },
                keyFinding: { type: Type.STRING },
                consensusStatements: {
                  type: Type.OBJECT,
                  properties: {
                    agree: { type: Type.STRING },
                    disagree: { type: Type.STRING },
                    mixed: { type: Type.STRING }
                  },
                  required: ["agree", "disagree", "mixed"]
                }
              },
              required: ["title", "authors", "citations", "pubDate", "journal", "link", "agreementPercentage", "disagreementPercentage", "keyFinding", "consensusStatements"]
            }
          },
          relevantDatasets: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                source: { type: Type.STRING },
                pubDate: { type: Type.STRING },
                keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                link: { type: Type.STRING },
                description: { type: Type.STRING },
                organism: { type: Type.STRING }
              },
              required: ["id", "title", "source", "pubDate", "keywords", "link", "description", "organism"]
            }
          }
        },
        required: ["executiveSummary", "topPapers", "relevantDatasets"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI agent.");
  
  return JSON.parse(text) as ResearchReport;
}

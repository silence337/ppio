export interface PortfolioItem {
  id: number;
  title: string;
  thum: string;
  year: string;
  description: string[];
  tools: string;
  link: string;
  copy: string;
}

export interface HistoryWorkItem {
  subj: string;
  text: string[];
}

export interface HistoryItem {
  id: number;
  year: string;
  type: string;
  work: HistoryWorkItem[];
}

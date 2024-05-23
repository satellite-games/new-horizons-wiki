export interface WikiBookHeader {
  id: string;
  title: Record<string, string>;
  icon: string;
  default: {
    chapter: string;
    article: string;
  };
}

export interface WikiBookToc extends WikiBookHeader {
  chapters?: {
    id: string;
    title: Record<string, string>;
    articles?: {
      id: string;
      title: Record<string, string>;
    }[];
  }[];
}

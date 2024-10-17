export interface FireCrawlResult {
  success: boolean;
  data: {
    markdown: string;
    metadata: {
      title: string;
      description: string;
      language: string;
      robots: string;
      ogTitle: string;
      ogDescription: string;
      ogUrl: string;
      ogImage: string;
      ogLocaleAlternate: string[];
      sourceURL: string;
      statusCode: number;
    };
    scrape_id: string;
  };
}
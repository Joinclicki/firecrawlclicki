import React, { useState } from 'react';
import { Search } from 'lucide-react';
import UrlForm from './components/UrlForm';
import ResultDisplay from './components/ResultDisplay';
import { FireCrawlResult } from './types';

function App() {
  const [result, setResult] = useState<FireCrawlResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    setProgress(0);
    setResult(null);

    const simulateProgress = () => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          return prevProgress;
        }
        return prevProgress + Math.random() * 10;
      });
    };

    const progressInterval = setInterval(simulateProgress, 500);

    try {
      const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer fc-8ed153c0d7cb4fd395b49079bea1179f',
        },
        body: JSON.stringify({
          url,
          formats: ['markdown'],
        }),
      });
      const data = await response.json();
      setResult(data);
      setProgress(100);
    } catch (error) {
      console.error('Error analyzing URL:', error);
      alert('An error occurred while analyzing the URL. Please try again.');
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Fire Crawl Analyzer</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <UrlForm onAnalyze={handleAnalyze} loading={loading} progress={progress} />
        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  );
}

export default App;
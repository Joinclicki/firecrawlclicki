import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ProgressLoader from './ProgressLoader';

interface UrlFormProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
  progress: number;
}

const UrlForm: React.FC<UrlFormProps> = ({ onAnalyze, loading, progress }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onAnalyze(url);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center mb-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          disabled={loading}
        >
          {loading ? (
            'Analyzing...'
          ) : (
            <>
              <Search className="mr-2" size={18} />
              Analyze
            </>
          )}
        </button>
      </form>
      {loading && (
        <div className="flex flex-col items-center justify-center mt-8">
          <ProgressLoader progress={progress} />
          <p className="mt-4 text-lg font-semibold text-gray-700">Analyzing website...</p>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
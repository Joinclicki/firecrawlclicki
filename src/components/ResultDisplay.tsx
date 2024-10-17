import React, { useState } from 'react';
import { FireCrawlResult } from '../types';
import { extractImages } from '../utils/analysis';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface ResultDisplayProps {
  result: FireCrawlResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [showRawData, setShowRawData] = useState(false);
  const markdownImages = result?.data?.markdown ? extractImages(result.data.markdown) : [];
  const metadataImages = result?.data?.metadata?.ogImage ? [result.data.metadata.ogImage] : [];
  const allImages = [...new Set([...markdownImages, ...metadataImages])];

  if (!result || !result.data) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Images Found ({allImages.length})</h3>
        {allImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allImages.map((image, index) => (
              <div key={index} className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={image} 
                    alt={`Image ${index + 1}`} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center"
                  >
                    <ExternalLink size={24} className="mr-2" />
                    View Full Size
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No images found</p>
        )}
      </div>

      <div className="mt-8">
        <button
          onClick={() => setShowRawData(!showRawData)}
          className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="font-semibold">Raw FireCrawl Response</span>
          {showRawData ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {showRawData && (
          <pre className="mt-2 p-4 bg-gray-50 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
import React from 'react';
import { BookOpen, ChevronRight, ExternalLink } from 'lucide-react';

interface SourcePanelProps {
  isMinimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
}

const sources = [
  {
    title: 'Understanding AI Models',
    url: 'https://example.com/ai-models',
    relevance: 0.95,
    excerpt: 'A comprehensive guide to modern AI language models and their applications...'
  },
  {
    title: 'Latest Research in NLP',
    url: 'https://example.com/nlp-research',
    relevance: 0.88,
    excerpt: 'Recent developments in natural language processing and their impact...'
  },
  {
    title: 'AI Ethics Guidelines',
    url: 'https://example.com/ai-ethics',
    relevance: 0.82,
    excerpt: 'Ethical considerations and best practices in AI development...'
  }
];

export default function SourcePanel({ isMinimized, onMinimize, onClose }: SourcePanelProps) {
  return (
    <div className={`h-full transition-all duration-300 ease-in-out ${
      isMinimized ? 'w-12' : 'w-80'
    }`}>
      <div className="flex items-center p-4">
        <button
          onClick={onMinimize}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-transform duration-300"
        >
          <ChevronRight 
            className={`w-5 h-5 transition-transform duration-300 text-gray-700 dark:text-gray-200 ${
              isMinimized ? 'rotate-180' : ''
            }`} 
          />
        </button>
        {!isMinimized && (
          <>
            <h2 className="text-lg font-semibold flex items-center gap-2 ml-2 flex-1 text-gray-900 dark:text-white">
              <BookOpen className="w-5 h-5" />
              Sources
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              ×
            </button>
          </>
        )}
      </div>

      {!isMinimized && (
        <div className="space-y-4 p-4 pt-0">
          {sources.map((source, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-gray-900 dark:text-white flex-1">
                  {source.title}
                </h3>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {source.excerpt}
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Relevance: {(source.relevance * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
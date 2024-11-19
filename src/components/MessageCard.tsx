import React from 'react';
import { BarChart2, BookOpen } from 'lucide-react';

interface MessageCardProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    id: string;
  };
  onMetricsToggle: () => void;
  onSourcesToggle: () => void;
  activePanel: 'metrics' | 'sources' | null;
}

export default function MessageCard({ message, onMetricsToggle, onSourcesToggle, activePanel }: MessageCardProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`flex ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-6 relative group ${
          isAssistant
            ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
            : 'bg-blue-500 text-white'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        {isAssistant && (
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 flex gap-3">
            <button
              onClick={onMetricsToggle}
              className={`p-2.5 rounded-full transition-all duration-200 ${
                activePanel === 'metrics'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
              }`}
              title="Toggle evaluation metrics"
            >
              <BarChart2 className="w-5 h-5" />
            </button>
            <button
              onClick={onSourcesToggle}
              className={`p-2.5 rounded-full transition-all duration-200 ${
                activePanel === 'sources'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
              }`}
              title="Toggle sources"
            >
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
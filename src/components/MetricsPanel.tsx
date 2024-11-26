// import React from 'react';
// import { BarChart2, ChevronRight } from 'lucide-react';
import MetricCard from './MetricsCard';

interface MetricsPanelProps {
  isMinimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
  metrics: {
    bleu_score: number;
    bert_score: number;
    fuzzy_match_score: number;
    f1_score: number;
    rouge_score: number;
  } | null;
}

const maxValues = {
  bleu_score: 1,
  bert_score: 1,
  fuzzy_match_score: 1,
  f1_score: 1,
  rouge_score: 1
};

const MetricsPanel: React.FC<MetricsPanelProps> = ({
  isMinimized,
  onMinimize,
  onClose,
  metrics
}) => {
  return (
    <div className={`h-full transition-all duration-300 ease-in-out ${
      isMinimized ? 'w-12' : 'w-80'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className={`font-semibold text-gray-900 dark:text-gray-100 ${isMinimized ? 'hidden' : 'block'}`}>
          Evaluation Metrics
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-200"
          >
            {isMinimized ? '>' : '<'}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-200"
          >
            ×
          </button>
        </div>
      </div>

      {!isMinimized && metrics && (
        <div className="space-y-4 p-4 pt-0">
          {Object.entries(metrics).map(([key, value]) => (
            <MetricCard
              key={key}
              label={key}
              value={value}
              max={maxValues[key as keyof typeof maxValues]}
            />
          ))}
        </div>
      )}

      {!isMinimized && !metrics && (
        <div className="p-4 pt-0 text-gray-500 dark:text-gray-400">
          No metrics available for this response.
        </div>
      )}
    </div>
  );
};

export default MetricsPanel;
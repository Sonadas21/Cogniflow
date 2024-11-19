import React from 'react';
import { BarChart2, ChevronRight } from 'lucide-react';

interface MetricsPanelProps {
  isMinimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
}

const metrics = {
  accuracy: 0.95,
  latency: 120,
  tokenCount: 256,
  confidence: 0.89,
  perplexity: 3.2
};

const MetricCard = ({ label, value, max }: { label: string; value: number; max: number }) => {
  const percentage = (value / max) * 100;
  const formattedValue = label === 'latency' ? `${value}ms` : 
    label === 'tokenCount' ? value.toString() :
    `${(value * 100).toFixed(1)}%`;

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-600 dark:text-gray-300 capitalize">{label}</div>
        <div className="text-sm font-semibold text-gray-900 dark:text-white">
          {formattedValue}
        </div>
      </div>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div
              style={{ width: `${Math.min(percentage, 100)}%` }}
              className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MetricsPanel({ isMinimized, onMinimize, onClose }: MetricsPanelProps) {
  const maxValues = {
    accuracy: 1,
    latency: 500,
    tokenCount: 1000,
    confidence: 1,
    perplexity: 10
  };

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
              <BarChart2 className="w-5 h-5" />
              Metrics
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
    </div>
  );
}
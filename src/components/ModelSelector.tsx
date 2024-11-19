import React from 'react';

interface ModelSelectorProps {
  model: string;
  onChange: (model: string) => void;
}

export default function ModelSelector({ model, onChange }: ModelSelectorProps) {
  return (
    <select
      value={model}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
    >
      <option value="gpt-4">GPT-4</option>
      <option value="gpt-3.5">GPT-3.5</option>
      <option value="claude">Claude 2</option>
      <option value="palm">PaLM</option>
    </select>
  );
}
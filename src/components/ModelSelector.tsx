import React from 'react';

const ModelSelector: React.FC<{
  model: string;
  onChange: (model: string) => void;
}> = ({ model, onChange }) => {
  const models = [
    { id: 'mistral', name: 'Mistral', available: true },
    { id: 'phi3.5', name: 'Phi3.5', available: false },
    { id: 'llama2', name: 'LLaMA 2', available: false },
    { id: 'llava', name: 'LLaVA', available: false }
  ];

  return (
    <select
      value={model}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1 text-sm border rounded-md w-36 bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
    >
      {models.map((model) => (
        <option 
          key={model.id} 
          value={model.id}
          disabled={!model.available}
          className="text-gray-900 dark:text-white"
        >
          {model.name} {!model.available && '(Coming Soon)'}
        </option>
      ))}
    </select>
  );
};

export default ModelSelector;
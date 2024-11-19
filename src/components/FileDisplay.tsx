import React from 'react';
import { X } from 'lucide-react';

interface FileDisplayProps {
  fileName: string;
  onRemove: () => void;
}

export default function FileDisplay({ fileName, onRemove }: FileDisplayProps) {
  const extension = fileName.split('.').pop()?.toUpperCase() || '';
  const nameWithoutExt = fileName.replace(`.${extension.toLowerCase()}`, '');

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
      <span className="font-medium text-blue-600 dark:text-blue-400">{extension}</span>
      <span className="text-gray-700 dark:text-gray-300">{nameWithoutExt}</span>
      <button
        onClick={onRemove}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        title="Remove file"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
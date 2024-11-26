interface MetricCardProps {
    label: string;
    value: number;
    max: number;
  }
  
  const MetricCard: React.FC<MetricCardProps> = ({ label, value, max }) => {
    return (
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
        <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {(value * 100).toFixed(2)}%
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${(value / max) * 100}%` }}
          />
        </div>
      </div>
    );
  };
  
  export default MetricCard; 
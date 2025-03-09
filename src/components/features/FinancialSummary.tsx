interface FinancialSummaryProps {
  title: string;
  subtitle: string;
  percentage: number;
  color: string;
  count: string;
}

export default function FinancialSummary({ title, subtitle, percentage, color, count }: FinancialSummaryProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-500 text-sm">In this month</p>
        <div className={`${color} font-medium`}>{percentage}%</div>
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center">
            <span className="text-xs">A</span>
          </div>
          <span className="text-sm text-gray-600">{subtitle}</span>
        </div>
        <div className="bg-gray-200 px-2 py-0.5 rounded text-xs">{count}</div>
      </div>
      <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div className={`h-full ${color.replace("text-", "bg-")}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { FinancialData } from "../../types";

const dataList: FinancialData[] = [
  { name: "JAN", value: 30000000 },
  { name: "FEB", value: 45000000 },
  { name: "MAR", value: 40000000 },
  { name: "APR", value: 30000000 },
  { name: "MAY", value: 45000000 },
  { name: "JUN", value: 55000000 },
  { name: "JUL", value: 40000000 },
  { name: "AUG", value: 50000000 },
];

function FinancialChart() {
  const formatYAxis = (value: number): string => {
    if (value === 0) return "0";
    if (value === 10000000) return "10 000 so'm";
    if (value === 20000000) return "20 000 so'm";
    if (value === 30000000) return "30 000 so'm";
    if (value === 40000000) return "40 000 so'm";
    if (value === 50000000) return "50 000 so'm";
    if (value === 60000000) return "60 000 so'm";
    return "";
  };

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataList} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatYAxis} domain={[0, 60000000]} ticks={[0, 10000000, 20000000, 30000000, 40000000, 50000000, 60000000]} />
          <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FinancialChart;
